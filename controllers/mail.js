"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndReceiveMail = exports.getMailInfo = void 0;
const models_1 = require("../models");
const common_1 = require("./common");
const getMailInfo = async (req, res, next) => {
    try {
        const user = res.locals.user;
        let mails = await user.getMails();
        const currentTime = Date.now();
        const transaction = await models_1.sequelize.transaction();
        try {
            for (const mail of mails) {
                if (mail.expire <= currentTime) {
                    await mail.destroy({ transaction });
                }
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                place: "controllers-mail-getMailInfo",
                content: `getMailInfo transaction error`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, err.message);
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
    }
    catch (err) {
        if (!err.place) {
            err.place = "controllers-mail-getMailInfo";
            err.content = "getMailInfoError";
            err.user = null;
        }
        next(err);
    }
};
exports.getMailInfo = getMailInfo;
const checkAndReceiveMail = async (req, res, next) => {
    try {
        const user = res.locals.user;
        const mails = await user.getMails();
        if (mails.length === 0) {
            return res.json({
                answer: "date changed",
            });
        }
        const { mailId } = req.body;
        if (!Number.isInteger(mailId) || mailId < 0) {
            const errorObj = {
                place: "controllers-mail-checkAndReceiveMail",
                content: `invalid mailId! mailId: ${mailId}`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
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
            if (giftAmountStr === "0")
                return;
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
                    user.scroll += giftAmounts;
                    break;
                }
                case 3: {
                    user.spirit += giftAmounts;
                    break;
                }
            }
        });
        const transaction = await models_1.sequelize.transaction();
        try {
            await user.save({ transaction });
            await targetMail.destroy({ transaction });
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                place: "controllers-mail-checkAndReceiveMail",
                content: `checkAndReceiveMail transaction error`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.json({ answer: 'checkAndReceiveMail success' });
    }
    catch (err) {
        if (!err.place) {
            err.place = "controllers-mail-checkAndReceiveMail";
            err.content = "checkAndReceiveMailError";
            err.user = null;
        }
        next(err);
    }
};
exports.checkAndReceiveMail = checkAndReceiveMail;
