import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { User, Error as MyError, sequelize, Mail } from "../models";
import { ReqError, updateDailyWeeklyAchivement, getAdminIdArr } from "./common";
import { Op } from "sequelize";
const testSearchText = (
  category: "nick" | "loginId" | "cashCode",
  text: string
) => {
  let tester = /^(.*[a-z0-9가-힣]*)[a-z0-9가-힣]*$/;
  switch (category) {
    case "loginId": {
      tester = /^(.*[a-z0-9]*)[a-z0-9]*$/;
      break;
    }
    case "cashCode": {
      tester = /^[a-z0-9]*$/;
      break;
    }
  }
  return tester.test(text);
};
const testLoginInfo = (category: "nick" | "id" | "password", text: string) => {
  let tester = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
  switch (category) {
    case "id": {
      tester = /^(?=.*[a-z0-9])[a-z0-9]{6,16}$/;
      break;
    }
    case "password": {
      tester = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
      break;
    }
  }
  return tester.test(text);
};
const adminLogin: RequestHandler = async (req, res, next) => {
  try {
    let { id, password } = req.body;
    id = `${id}`;
    password = `${password}`;
    const user = await User.findOne({ where: { loginId: id } });
    if (!user) {
      return res.json({ answer: "no user" });
    }
    const adminIdArr = getAdminIdArr();
    if (!adminIdArr.includes(user.loginId)) {
      return res.json({ answer: "not admin" });
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.json({ answer: "no user" });
    }
    if (user.lockMemo) {
      return res.json({ answer: "lock" });
    }
    const loginCode = await bcrypt.hash(`${id}${Date.now()}`, 2);
    user.loginCode = loginCode;
    await user.save();
    res.json({ loginCode });
  } catch (err: any) {
    err.place = "controllers-admin-login";
    err.content = "adminLoginError";
    err.user = null;
    next(err);
  }
};

const checkAdminLoginCode: RequestHandler = async (req, res, next) => {
  try {
    let { loginCode } = req.body;
    loginCode = `${loginCode}`;
    const user = await User.findOne({ where: { loginCode } });
    if (!user) {
      return res.json({ answer: "no user" });
    }
    const adminIdArr = getAdminIdArr();
    if (!adminIdArr.includes(user.loginId)) {
      return res.json({ answer: "not admin" });
    }
    const newLoginCode = await bcrypt.hash(`${user.id}${Date.now()}`, 2);
    user.loginCode = newLoginCode;
    user.currentBattleOrNot = false;
    const transaction = await sequelize.transaction();
    try {
      await user.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        place: "controllers-admin-checkLoginCode",
        content: "checkLoginCode transaction error",
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({
      newLoginCode,
    });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-admin-checkLoginCode";
      err.content = "checkLoginCodeError";
      err.user = null;
    }
    next(err);
  }
};
const searchUser: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    const { userLocked, userCharged, userError } = req.body;
    let { searchText, userSearchTarget } = req.body;
    searchText = `${searchText}`;
    userSearchTarget = `${userSearchTarget}`;
    if (!["nick", "loginId", "cashCode"].includes(userSearchTarget)) {
      const errorObj = {
        place: "controllers-admin-searchUser",
        content: `invalid userSearchTarget! userSearchTarget: ${userSearchTarget}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const textTest = testSearchText(userSearchTarget, searchText);
    if (!textTest) {
      const errorObj = {
        place: "controllers-admin-searchUser",
        content: `invalid textTest! userSearchTarget: ${userSearchTarget} / searchText: ${searchText}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (![true, false].includes(userLocked)) {
      const errorObj = {
        place: "controllers-admin-searchUser",
        content: `invalid userLocked! userLocked: ${userLocked}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (
      ![true, false].includes(userCharged) ||
      (userCharged === false && userSearchTarget === "cashCode")
    ) {
      const errorObj = {
        place: "controllers-admin-searchUser",
        content: `invalid userCharged! userCharged: ${userCharged} (userSearchTarget: ${userSearchTarget})`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (![true, false].includes(userError)) {
      const errorObj = {
        place: "controllers-admin-searchUser",
        content: `invalid userError! userError: ${userError}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    let targetUsers: User[] = [];
    switch (userSearchTarget) {
      case "nick": {
        if (userLocked && userCharged && searchText === "") {
          targetUsers = await User.findAll({
            where: {
              lockMemo: { [Op.not]: null },
              cashCode: { [Op.not]: null },
            },
            order:[['chargeTime','ASC']]
          });
        } else if (userLocked && userCharged) {
          targetUsers = await User.findAll({
            where: {
              nick: { [Op.like]: `%${searchText}%` },
              lockMemo: { [Op.not]: null },
              cashCode: { [Op.not]: null },
            },
            order:[['chargeTime','ASC']]
          });
        } else if (userLocked && !userCharged && searchText === "") {
          targetUsers = await User.findAll({
            where: {
              lockMemo: { [Op.not]: null },
              cashCode: null,
            },
          });
        } else if (userLocked && !userCharged) {
          targetUsers = await User.findAll({
            where: {
              nick: { [Op.like]: `%${searchText}%` },
              lockMemo: { [Op.not]: null },
              cashCode: null,
            },
          });
        } else if (!userLocked && userCharged && searchText === "") {
          targetUsers = await User.findAll({
            where: {
              lockMemo: null,
              cashCode: { [Op.not]: null },
            },
            order:[['chargeTime','ASC']]
          });
        } else if (!userLocked && userCharged) {
          targetUsers = await User.findAll({
            where: {
              nick: { [Op.like]: `%${searchText}%` },
              lockMemo: null,
              cashCode: { [Op.not]: null },
            },
            order:[['chargeTime','ASC']]
          });
        } else if (!userLocked && !userCharged && searchText === "") {
          targetUsers = await User.findAll({
            where: {
              lockMemo: null,
              cashCode: null,
            },
          });
        } else if (!userLocked && !userCharged) {
          targetUsers = await User.findAll({
            where: {
              nick: { [Op.like]: `%${searchText}%` },
              lockMemo: null,
              cashCode: null,
            },
          });
        }
        break;
      }
      case "loginId": {
        if (userLocked && userCharged && searchText === "") {
          targetUsers = await User.findAll({
            where: {
              lockMemo: { [Op.not]: null },
              cashCode: { [Op.not]: null },
            },
            order:[['chargeTime','ASC']]
          });
        } else if (userLocked && userCharged) {
          targetUsers = await User.findAll({
            where: {
              loginId: { [Op.like]: `%${searchText}%` },
              lockMemo: { [Op.not]: null },
              cashCode: { [Op.not]: null },
            },
            order:[['chargeTime','ASC']]
          });
        } else if (userLocked && !userCharged && searchText === "") {
          targetUsers = await User.findAll({
            where: {
              lockMemo: { [Op.not]: null },
              cashCode: null,
            },
          });
        } else if (userLocked && !userCharged) {
          targetUsers = await User.findAll({
            where: {
              loginId: { [Op.like]: `%${searchText}%` },
              lockMemo: { [Op.not]: null },
              cashCode: null,
            },
          });
        } else if (!userLocked && userCharged && searchText === "") {
          targetUsers = await User.findAll({
            where: {
              lockMemo: null,
              cashCode: { [Op.not]: null },
            },
          });
        } else if (!userLocked && userCharged) {
          targetUsers = await User.findAll({
            where: {
              loginId: { [Op.like]: `%${searchText}%` },
              lockMemo: null,
              cashCode: { [Op.not]: null },
            },
            order:[['chargeTime','ASC']]
          });
        } else if (!userLocked && !userCharged && searchText === "") {
          targetUsers = await User.findAll({
            where: {
              lockMemo: null,
              cashCode: null,
            },
          });
        } else if (!userLocked && !userCharged) {
          targetUsers = await User.findAll({
            where: {
              loginId: { [Op.like]: `%${searchText}%` },
              lockMemo: null,
              cashCode: null,
            },
          });
        }
        break;
      }
      case "cashCode": {
        if (userLocked && searchText === "") {
          targetUsers = await User.findAll({
            where: {
              cashCode: { [Op.not]: null },
              lockMemo: { [Op.not]: null },
            },
            order:[['chargeTime','ASC']]
          });
        } else if (userLocked) {
          targetUsers = await User.findAll({
            where: {
              cashCode: { [Op.like]: `%${searchText}%` },
              lockMemo: { [Op.not]: null },
            },
            order:[['chargeTime','ASC']]
          });
        } else if (!userLocked && searchText === "") {
          targetUsers = await User.findAll({
            where: {
              cashCode: { [Op.not]: null },
              lockMemo: null,
            },
            order:[['chargeTime','ASC']]
          });
        } else if (!userLocked) {
          targetUsers = await User.findAll({
            where: {
              cashCode: { [Op.like]: `%${searchText}%` },
              lockMemo: null,
            },
            order:[['chargeTime','ASC']]
          });
        }
        break;
      }
    }
    const targetUsersData: {
      loginId: string;
      nick: string;
      lockMemo: string | null;
      cashCode: string | null;
      chargeCash: number | null;
      chargeTime: number | null;
      error: boolean;
    }[] = [];
    for (const user of targetUsers) {
      const { loginId, nick, lockMemo, cashCode, chargeCash, chargeTime } =
        user;
      const targetUserError = await MyError.findOne({
        where: { user: loginId },
      });
      const error = targetUserError ? true : false;
      if ((userError && error) || (!userError && !error)) {
        targetUsersData.push({
          loginId,
          nick,
          lockMemo,
          cashCode,
          chargeCash,
          chargeTime,
          error,
        });
      }
    }
    res.json({ users: targetUsersData });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-admin-searchUser";
      err.content = "searchUserError";
      err.user = null;
    }
    next(err);
  }
};
const searchError: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    let { searchText } = req.body;
    searchText = `${searchText}`;
    if (searchText !== "") {
      const textTest = testSearchText("loginId", searchText);
      if (!textTest) {
        const errorObj = {
          place: "controllers-admin-searchError",
          content: `invalid searchText! searchText: ${searchText}`,
          user: user.loginId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
    }
    let targetErrors: MyError[] = [];
    if (searchText !== "") {
      targetErrors = await MyError.findAll({
        where: { user: { [Op.like]: `%${searchText}%` } },
      });
    } else {
      targetErrors = await MyError.findAll({
        where: { user: null },
      });
    }
    const targetErrorsData: {
      userId: string | null;
      id: number;
      place: string;
      content: string;
    }[] = [];
    for (const error of targetErrors) {
      const { user, id, place, content } = error;
      targetErrorsData.push({
        userId: user,
        id,
        place,
        content,
      });
    }
    // const transaction = await sequelize.transaction();
    // try {
    //   await user.save({ transaction });
    //   await transaction.commit();
    // } catch (err: any) {
    //   await transaction.rollback();
    //   const errorObj = {
    //     place: "controllers-admin-searchError",
    //     content: "searchError transaction error",
    //     user: user.loginId,
    //   };
    //   throw new ReqError(errorObj, err.message);
    // }
    res.json({ errors: targetErrorsData });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-admin-searchError";
      err.content = "searchErrorError";
      err.user = null;
    }
    next(err);
  }
};
const deleteError: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    const { targetErrorIdList } = req.body;
    if (!Array.isArray(targetErrorIdList)) {
      const errorObj = {
        place: "controllers-admin-deleteError",
        content: `invalid targetErrorIdList! targetErrorIdList: ${targetErrorIdList}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    let targetErrors: MyError[] = [];
    for (const id of targetErrorIdList) {
      if (!Number.isInteger(id) || id <= 0) {
        const errorObj = {
          place: "controllers-admin-deleteError",
          content: `invalid targetErrorIdList! targetErrorIdList: ${targetErrorIdList}`,
          user: user.loginId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
      const targetError = await MyError.findOne({ where: { id } });
      if (!targetError) {
        const errorObj = {
          place: "controllers-admin-deleteError",
          content: `no targetError!`,
          user: user.loginId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
      targetErrors.push(targetError);
    }
    const transaction = await sequelize.transaction();
    try {
      for (const error of targetErrors) {
        await error.destroy({ transaction });
      }
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        place: "controllers-admin-deleteError",
        content: "deleteError transaction error",
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ answer: "deleteError success" });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-admin-deleteError";
      err.content = "deleteErrorError";
      err.user = null;
    }
    next(err);
  }
};
const deleteCashCode: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    const { targetUserLoginIdList } = req.body;
    if (!Array.isArray(targetUserLoginIdList)) {
      const errorObj = {
        place: "controllers-admin-deleteCashCode",
        content: `invalid targetUserLoginIdList! targetUserLoginIdList: ${targetUserLoginIdList}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    let targetUsers: User[] = [];
    for (const loginId of targetUserLoginIdList) {
      const loginIdTest = testLoginInfo("id", loginId);
      if (!loginIdTest) {
        const errorObj = {
          place: "controllers-admin-deleteCashCode",
          content: `invalid targetUserLoginIdList! targetUserLoginIdList: ${targetUserLoginIdList}`,
          user: user.loginId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
      const targetUser = await User.findOne({ where: { loginId } });
      if (!targetUser) {
        const errorObj = {
          place: "controllers-admin-deleteCashCode",
          content: `no targetUser!`,
          user: user.loginId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
      if (!targetUser.cashCode) {
        const errorObj = {
          place: "controllers-admin-deleteCashCode",
          content: `no cashCode! loginId: ${loginId}`,
          user: user.loginId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
      targetUser.cashCode = null;
      targetUser.chargeCash = 0;
      targetUser.chargeTime = null;
      targetUsers.push(targetUser);
    }
    const transaction = await sequelize.transaction();
    try {
      for (const user of targetUsers) {
        await user.save({ transaction });
      }
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        place: "controllers-admin-deleteCashCode",
        content: "deleteCashCode transaction error",
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ answer: "deleteCashCode success" });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-admin-deleteCashCode";
      err.content = "deleteCashCodeError";
      err.user = null;
    }
    next(err);
  }
};
const changeNickInAdmin: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    let { targetUserLoginId, newNick } = req.body;
    targetUserLoginId = `${targetUserLoginId}`;
    newNick = `${newNick}`;
    const loginIdTest = testLoginInfo("id", targetUserLoginId);
    if (!loginIdTest) {
      const errorObj = {
        place: "controllers-admin-changeNickInAdmin",
        content: `invalid targetUserLoginId! targetUserLoginId: ${targetUserLoginId}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const nickTest = testLoginInfo("nick", newNick);
    if (!nickTest) {
      const errorObj = {
        place: "controllers-admin-changeNickInAdmin",
        content: `invalid newNick! newNick: ${newNick}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const targetUser = await User.findOne({
      where: { loginId: targetUserLoginId },
    });
    if (!targetUser) {
      const errorObj = {
        place: "controllers-admin-changeNickInAdmin",
        content: `no user! loginId: ${targetUserLoginId}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const existUser = await User.findOne({ where: { nick: newNick } });
    if (existUser) {
      return res.json({ answer: "nick exist" });
    }
    targetUser.nick = newNick;
    const transaction = await sequelize.transaction();
    try {
      await targetUser.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        place: "controllers-admin-changeNickInAdmin",
        content: "changeNickInAdmin transaction error",
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ answer: "changeNickInAdmin success" });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-admin-changeNickInAdmin";
      err.content = "changeNickInAdminError";
      err.user = null;
    }
    next(err);
  }
};
const changePasswordInAdmin: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    let { targetUserLoginId, newPassword } = req.body;
    targetUserLoginId = `${targetUserLoginId}`;
    newPassword = `${newPassword}`;
    const loginIdTest = testLoginInfo("id", targetUserLoginId);
    if (!loginIdTest) {
      const errorObj = {
        place: "controllers-admin-changePasswordInAdmin",
        content: `invalid targetUserLoginId! targetUserLoginId: ${targetUserLoginId}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const passwordTest = testLoginInfo("password", newPassword);
    if (!passwordTest) {
      const errorObj = {
        place: "controllers-admin-changePasswordInAdmin",
        content: `invalid newPassword! newPassword: ${newPassword}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const targetUser = await User.findOne({
      where: { loginId: targetUserLoginId },
    });
    if (!targetUser) {
      const errorObj = {
        place: "controllers-admin-changePasswordInAdmin",
        content: `no user! loginId: ${targetUserLoginId}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const hash = await bcrypt.hash(newPassword, 12);
    targetUser.password = hash;
    const transaction = await sequelize.transaction();
    try {
      await targetUser.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        place: "controllers-admin-changePasswordInAdmin",
        content: "changePasswordInAdmin transaction error",
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ answer: "changePasswordInAdmin success" });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-admin-changePasswordInAdmin";
      err.content = "changePasswordInAdminError";
      err.user = null;
    }
    next(err);
  }
};
const lockUser: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    let { targetUserLoginId, newLockMemo } = req.body;
    targetUserLoginId = `${targetUserLoginId}`;
    newLockMemo = `${newLockMemo}`;
    const loginIdTest = testLoginInfo("id", targetUserLoginId);
    if (!loginIdTest) {
      const errorObj = {
        place: "controllers-admin-lockUser",
        content: `invalid targetUserLoginId! targetUserLoginId: ${targetUserLoginId}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const targetUser = await User.findOne({
      where: { loginId: targetUserLoginId },
    });
    if (!targetUser) {
      const errorObj = {
        place: "controllers-admin-lockUser",
        content: `no user! loginId: ${targetUserLoginId}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (targetUser.lockMemo) {
      const errorObj = {
        place: "controllers-admin-lockUser",
        content: `already locked! loginId: ${targetUserLoginId}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    targetUser.lockMemo = newLockMemo;
    const transaction = await sequelize.transaction();
    try {
      await targetUser.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        place: "controllers-admin-lockUser",
        content: "lockUser transaction error",
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ answer: "lockUser success" });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-admin-lockUser";
      err.content = "lockUserError";
      err.user = null;
    }
    next(err);
  }
};
const unlockUser: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    let { targetUserLoginId } = req.body;
    targetUserLoginId = `${targetUserLoginId}`;
    const loginIdTest = testLoginInfo("id", targetUserLoginId);
    if (!loginIdTest) {
      const errorObj = {
        place: "controllers-admin-unlockUser",
        content: `invalid targetUserLoginId! targetUserLoginId: ${targetUserLoginId}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const targetUser = await User.findOne({
      where: { loginId: targetUserLoginId },
    });
    if (!targetUser) {
      const errorObj = {
        place: "controllers-admin-unlockUser",
        content: `no user! loginId: ${targetUserLoginId}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (!targetUser.lockMemo) {
      const errorObj = {
        place: "controllers-admin-unlockUser",
        content: `already unlocked! loginId: ${targetUserLoginId}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    targetUser.lockMemo = null;
    const transaction = await sequelize.transaction();
    try {
      await targetUser.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        place: "controllers-admin-unlockUser",
        content: "unlockUser transaction error",
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ answer: "unlockUser success" });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-admin-unlockUser";
      err.content = "unlockUserError";
      err.user = null;
    }
    next(err);
  }
};
const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    let { targetUserLoginId } = req.body;
    targetUserLoginId = `${targetUserLoginId}`;
    const loginIdTest = testLoginInfo("id", targetUserLoginId);
    if (!loginIdTest) {
      const errorObj = {
        place: "controllers-admin-deleteUser",
        content: `invalid targetUserLoginId! targetUserLoginId: ${targetUserLoginId}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const targetUser = await User.findOne({
      where: { loginId: targetUserLoginId },
    });
    if (!targetUser) {
      const errorObj = {
        place: "controllers-admin-deleteUser",
        content: `no user! loginId: ${targetUserLoginId}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const transaction = await sequelize.transaction();
    try {
      await targetUser.destroy({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        place: "controllers-admin-deleteUser",
        content: "deleteUser transaction error",
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ answer: "deleteUser success" });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-admin-deleteUser";
      err.content = "deleteUserError";
      err.user = null;
    }
    next(err);
  }
};
const sendMail: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    const {
      allTarget,
      expire,
      gold,
      jade,
      scroll,
      spirit,
      targetUserLoginIdList,
    } = req.body;
    let { content } = req.body;
    content = `${content}`;
    if (![true, false].includes(allTarget)) {
      const errorObj = {
        place: "controllers-admin-sendMail",
        content: `invalid allTarget! allTarget: ${allTarget}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (!Number.isInteger(expire) || expire <= Date.now()) {
      const errorObj = {
        place: "controllers-admin-sendMail",
        content: `invalid expire! expire: ${expire}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (!Number.isInteger(gold) || gold < 0) {
      const errorObj = {
        place: "controllers-admin-sendMail",
        content: `invalid gold! gold: ${gold}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (!Number.isInteger(jade) || jade < 0) {
      const errorObj = {
        place: "controllers-admin-sendMail",
        content: `invalid jade! jade: ${jade}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (!Number.isInteger(scroll) || scroll < 0 || scroll > 100) {
      const errorObj = {
        place: "controllers-admin-sendMail",
        content: `invalid scroll! scroll: ${scroll}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (!Number.isInteger(spirit) || spirit < 0) {
      const errorObj = {
        place: "controllers-admin-sendMail",
        content: `invalid spirit! spirit: ${spirit}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    let targetUsers: User[] = [];
    if (allTarget) {
      targetUsers = await User.findAll({ where: { lockMemo: null } });
    } else {
      if (!Array.isArray(targetUserLoginIdList)) {
        const errorObj = {
          place: "controllers-admin-sendMail",
          content: `invalid targetUserLoginIdList! targetUserLoginIdList: ${targetUserLoginIdList}`,
          user: user.loginId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
      for (const loginId of targetUserLoginIdList) {
        const loginIdTest = testLoginInfo("id", loginId);
        if (!loginIdTest) {
          const errorObj = {
            place: "controllers-admin-sendMail",
            content: `invalid loginId! targetUserLoginIdList: ${targetUserLoginIdList}`,
            user: user.loginId,
          };
          throw new ReqError(errorObj, errorObj.content);
        }
        const targetUser = await User.findOne({ where: { loginId } });
        if (!targetUser) {
          const errorObj = {
            place: "controllers-admin-sendMail",
            content: `no user! loginId: ${loginId}`,
            user: user.loginId,
          };
          throw new ReqError(errorObj, errorObj.content);
        }
        targetUsers.push(targetUser);
      }
    }

    const transaction = await sequelize.transaction();
    try {
      for (const user of targetUsers) {
        await Mail.create({
          content,
          expire,
          giftInfo: `${gold}/${jade}/${Math.round(
            ((3 + user.level) / 10) * scroll
          )}/${spirit}`,
          UserId: user.id,
        });
      }
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj = {
        place: "controllers-admin-sendMail",
        content: "sendMail transaction error",
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ answer: "sendMail success" });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-admin-sendMail";
      err.content = "sendMailError";
      err.user = null;
    }
    next(err);
  }
};
export {
  adminLogin,
  checkAdminLoginCode,
  searchUser,
  searchError,
  deleteError,
  deleteCashCode,
  changeNickInAdmin,
  changePasswordInAdmin,
  lockUser,
  unlockUser,
  deleteUser,
  sendMail,
};
