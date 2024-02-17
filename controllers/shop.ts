import { RequestHandler } from "express";
import { Pass, User, sequelize } from "../models";
import { errorObj, ReqError } from "./common";
const purchasePass: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    const { passIndex } = req.body;
    if (![0, 1, 2].includes(passIndex)) {
      const errorObj: errorObj = {
        place: "controllers-shop-purchasePass",
        content: `invalid passIndex! passIndex: ${passIndex}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const passes = await user.getPasses();
    const targetPass = passes.find((pass) => {
      return (
        pass.type === ["beast", "mysteriousCreature", "monarch"][passIndex]
      );
    });
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    if (targetPass && targetPass.endTime! > currentTime + 86400000 * 10) {
      return res.json({ answer: "date changed" });
    }
    const neededJade = [400, 1200, 3600][passIndex];
    if (user.jade < neededJade) {
      const errorObj: errorObj = {
        place: "controllers-shop-purchasePass",
        content: `jade shortage! jade: ${user.jade} / neededJade: ${neededJade}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    user.jade -= neededJade;
    if (targetPass) {
      targetPass.endTime = targetPass.endTime! + 2592000000;
    }
    const UTCYear = currentDate.getUTCFullYear();
    const UTCMonth = currentDate.getUTCMonth();
    const UTCDate = currentDate.getUTCDate();
    const todayStartTime = Date.UTC(UTCYear, UTCMonth, UTCDate, 0, 0, 0, 0);
    const transaction = await sequelize.transaction();
    try {
      await user.save({ transaction });
      if (targetPass) {
        await targetPass.save({ transaction });
      } else {
        await user.createPass(
          {
            type: ["beast", "mysteriousCreature", "monarch"][passIndex] as
              | "beast"
              | "mysteriousCreature"
              | "monarch",
            endTime: todayStartTime + 86400000 * 31 - 1,
            lastScrollRewardTime: todayStartTime - 1,
            lastSpiritRewardTime: todayStartTime - 1,
          },
          { transaction }
        );
      }
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-shop-purchasePass",
        content: `purchasePass transaction error`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ newPassCurrentTime: targetPass ? null : currentTime });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-shop-purchasePass";
      err.content = "purchasePassError";
      err.user = null;
    }
    next(err);
  }
};
const purchaseGoods: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    const { targetGoodsIndex } = req.body;
    if (![0, 1, 2, 3].includes(targetGoodsIndex)) {
      const errorObj: errorObj = {
        place: "controllers-shop-purchaseGoods",
        content: `invalid targetGoodsIndex! targetGoodsIndex: ${targetGoodsIndex}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const currentDate = new Date();
    const UTCYear = currentDate.getUTCFullYear();
    const UTCMonth = currentDate.getUTCMonth();
    const UTCDate = currentDate.getUTCDate();
    const todayStartTime = Date.UTC(UTCYear, UTCMonth, UTCDate, 0, 0, 0, 0);
    const currentTime = currentDate.getTime();
    const {
      fewScrollPurchaseTime,
      manyScrollPurchaseTime,
      fewSpiritPurchaseTime,
      manySpiritPurchaseTime,
    } = user;
    const targetPurchaseTime = [
      fewScrollPurchaseTime,
      manyScrollPurchaseTime,
      fewSpiritPurchaseTime,
      manySpiritPurchaseTime,
    ][targetGoodsIndex];
    if (targetPurchaseTime > todayStartTime) {
      return res.json({ answer: "date changed" });
    }
    const neededJade = [10, 20, 100, 200][targetGoodsIndex];
    if (user.jade < neededJade) {
      const errorObj: errorObj = {
        place: "controllers-shop-purchaseGoods",
        content: `jade shortage! jade: ${user.jade} / neededJade: ${neededJade}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    user.jade -= neededJade;
    switch (targetGoodsIndex) {
      case 0: {
        user.fewScrollPurchaseTime = currentTime;
        user.scroll += 5 * user.level + 15;
        break;
      }
      case 1: {
        user.manyScrollPurchaseTime = currentTime;
        user.scroll += 10 * user.level + 30;
        break;
      }
      case 2: {
        user.fewSpiritPurchaseTime = currentTime;
        user.spirit += 5;
        break;
      }
      case 3: {
        user.manySpiritPurchaseTime = currentTime;
        user.spirit += 10;
        break;
      }
    }
    const transaction = await sequelize.transaction();
    try {
      await user.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-shop-purchaseGoods",
        content: `purchaseGoods transaction error`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ goodsPurchaseCurrentTime: currentTime });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-shop-purchaseGoods";
      err.content = "purchaseGoodsError";
      err.user = null;
    }
    next(err);
  }
};
const chargeJade: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    const { currentJadeChargeValue } = req.body;
    if (
      !Number.isInteger(currentJadeChargeValue) ||
      currentJadeChargeValue <= 0 ||
      currentJadeChargeValue > 10000
    ) {
      const errorObj: errorObj = {
        place: "controllers-shop-chargeJade",
        content: `invalid currentJadeChargeValue! currentJadeChargeValue: ${currentJadeChargeValue}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (user.cashCode) {
      const errorObj: errorObj = {
        place: "controllers-shop-chargeJade",
        content: `doesn't deposited yet!`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    let newCashCode = (user.id % 78364164096).toString(36);
    newCashCode = `${"0".repeat(7 - newCashCode.length)}${newCashCode}`;
    user.jade += currentJadeChargeValue;
    user.cashCode = newCashCode;
    user.chargeCash = currentJadeChargeValue * 10;
    user.chargeTime = Date.now();
    const transaction = await sequelize.transaction();
    try {
      await user.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-shop-chargeJade",
        content: `chargeJade transaction error`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ newCashCode });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-shop-chargeJade";
      err.content = "chargeJadeError";
      err.user = null;
    }
    next(err);
  }
};
export { purchasePass, purchaseGoods, chargeJade };
