import { RequestHandler } from "express";
import { Pass, User, sequelize } from "../models";
import { errorObj, ReqError } from "./common";

const getMailInfo: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    let mails = await user.getMails();
    const currentTime = Date.now();
    const transaction = await sequelize.transaction();
    try {
      for(const mail of mails){
        if (mail.expire <= currentTime) {
            await mail.destroy({ transaction });
        }
    }
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-mail-getMailInfo",
        content: `getMailInfo transaction error`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    mails = mails.filter((mail) => {
      return mail.expire > currentTime;
    });
    const mailData = mails.map((mail) => {
      const { id, content, expire, giftInfo } = mail;
      return {
        id,
        content,
        expire,
        giftInfo,
      };
    });
    res.json({ mailData });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-mail-getMailInfo";
      err.content = "getMailInfoError";
      err.user = null;
    }
    next(err);
  }
};
const checkAndReceiveMail: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    const mails = await user.getMails();
    if (mails.length === 0) {
      return res.json({
        answer: "date changed",
      });
    }
    const { mailId } = req.body;
    if (!Number.isInteger(mailId) || mailId < 0) {
      const errorObj: errorObj = {
        place: "controllers-mail-checkAndReceiveMail",
        content: `invalid mailId! mailId: ${mailId}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const targetMail = mails.find((mail) => {
      return mail.id === mailId;
    });
    if (!targetMail) {
      return res.json({
        answer: "date changed",
      });
    }
    const currentTime = Date.now();
    if (targetMail.expire <= currentTime) {
      return res.json({
        answer: "date changed",
      });
    }
    const { giftInfo } = targetMail;
    const giftInfoArr = giftInfo.split("/");
    giftInfoArr.forEach((giftAmountStr, index) => {
      if (giftAmountStr === "0") return;
      const giftAmounts = Number(giftAmountStr);
      switch (index) {
        case 0: {
          user.gold += giftAmounts;
          break;
        }
        case 1: {
          user.jade += giftAmounts;
          break;
        }
        case 2: {
          user.scroll += giftAmounts
          break;
        }
        case 3: {
          user.spirit += giftAmounts;
          break;
        }
      }
    });
    const transaction = await sequelize.transaction();
    try {
      await user.save({transaction})
      await targetMail.destroy({transaction})
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-mail-checkAndReceiveMail",
        content: `checkAndReceiveMail transaction error`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({answer:'checkAndReceiveMail success'});
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-mail-checkAndReceiveMail";
      err.content = "checkAndReceiveMailError";
      err.user = null;
    }
    next(err);
  }
};
export { getMailInfo, checkAndReceiveMail };
