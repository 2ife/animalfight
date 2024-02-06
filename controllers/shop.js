"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chargeJade = exports.purchaseGoods = exports.purchasePass = void 0;
const models_1 = require("../models");
const common_1 = require("./common");
const purchasePass = async (req, res, next) => {
    try {
        const user = res.locals.user;
        const { passIndex } = req.body;
        if (![0, 1, 2].includes(passIndex)) {
            const errorObj = {
                place: "controllers-shop-purchasePass",
                content: `invalid passIndex! passIndex: ${passIndex}`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const passes = await user.getPasses();
        const targetPass = passes.find((pass) => {
            return (pass.type === ["beast", "mysteriousCreature", "monarch"][passIndex]);
        });
        const currentDate = new Date();
        const currentTime = currentDate.getTime();
        if (targetPass && targetPass.endTime > currentTime + 86400000 * 10) {
            return res.json({ answer: "date changed" });
        }
        const neededJade = [400, 1200, 3600][passIndex];
        if (user.jade < neededJade) {
            const errorObj = {
                place: "controllers-shop-purchasePass",
                content: `jade shortage! jade: ${user.jade} / neededJade: ${neededJade}`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        user.jade -= neededJade;
        if (targetPass) {
            targetPass.endTime = targetPass.endTime + 2592000000;
        }
        const UTCYear = currentDate.getUTCFullYear();
        const UTCMonth = currentDate.getUTCMonth();
        const UTCDate = currentDate.getUTCDate();
        const todayStartTime = Date.UTC(UTCYear, UTCMonth, UTCDate, 0, 0, 0, 0);
        const transaction = await models_1.sequelize.transaction();
        try {
            await user.save({ transaction });
            if (targetPass) {
                await targetPass.save({ transaction });
            }
            else {
                await user.createPass({
                    type: ["beast", "mysteriousCreature", "monarch"][passIndex],
                    endTime: todayStartTime + 86400000 * 31 - 1,
                    lastScrollRewardTime: todayStartTime - 1,
                    lastSpiritRewardTime: todayStartTime - 1,
                }, { transaction });
            }
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                place: "controllers-shop-purchasePass",
                content: `purchasePass transaction error`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.json({ newPassCurrentTime: targetPass ? null : currentTime });
    }
    catch (err) {
        if (!err.place) {
            err.place = "controllers-shop-purchasePass";
            err.content = "purchasePassError";
            err.user = null;
        }
        next(err);
    }
};
exports.purchasePass = purchasePass;
const purchaseGoods = async (req, res, next) => {
    try {
        const user = res.locals.user;
        const { targetGoodsIndex } = req.body;
        if (![0, 1, 2, 3].includes(targetGoodsIndex)) {
            const errorObj = {
                place: "controllers-shop-purchaseGoods",
                content: `invalid targetGoodsIndex! targetGoodsIndex: ${targetGoodsIndex}`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const currentDate = new Date();
        const UTCYear = currentDate.getUTCFullYear();
        const UTCMonth = currentDate.getUTCMonth();
        const UTCDate = currentDate.getUTCDate();
        const todayStartTime = Date.UTC(UTCYear, UTCMonth, UTCDate, 0, 0, 0, 0);
        const currentTime = currentDate.getTime();
        const { fewScrollPurchaseTime, manyScrollPurchaseTime, fewSpiritPurchaseTime, manySpiritPurchaseTime, } = user;
        const targetPurchaseTime = [
            fewScrollPurchaseTime,
            manyScrollPurchaseTime,
            fewSpiritPurchaseTime,
            manySpiritPurchaseTime,
        ][targetGoodsIndex];
        if (targetPurchaseTime > todayStartTime) {
            return res.json({ answer: "date changed" });
        }
        const neededJade = [10, 20, 40, 100][targetGoodsIndex];
        if (user.jade < neededJade) {
            const errorObj = {
                place: "controllers-shop-purchaseGoods",
                content: `jade shortage! jade: ${user.jade} / neededJade: ${neededJade}`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
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
                user.spirit += 1;
                break;
            }
            case 3: {
                user.manySpiritPurchaseTime = currentTime;
                user.spirit += 4;
                break;
            }
        }
        const transaction = await models_1.sequelize.transaction();
        try {
            await user.save({ transaction });
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                place: "controllers-shop-purchaseGoods",
                content: `purchaseGoods transaction error`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.json({ goodsPurchaseCurrentTime: currentTime });
    }
    catch (err) {
        if (!err.place) {
            err.place = "controllers-shop-purchaseGoods";
            err.content = "purchaseGoodsError";
            err.user = null;
        }
        next(err);
    }
};
exports.purchaseGoods = purchaseGoods;
const chargeJade = async (req, res, next) => {
    try {
        const user = res.locals.user;
        const { currentJadeChargeValue } = req.body;
        if (!Number.isInteger(currentJadeChargeValue) ||
            currentJadeChargeValue <= 0 ||
            currentJadeChargeValue > 10000) {
            const errorObj = {
                place: "controllers-shop-chargeJade",
                content: `invalid currentJadeChargeValue! currentJadeChargeValue: ${currentJadeChargeValue}`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (user.cashCode) {
            const errorObj = {
                place: "controllers-shop-chargeJade",
                content: `doesn't deposited yet!`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        let newCashCode = (user.id % 78364164096).toString(36);
        newCashCode = `${"0".repeat(7 - newCashCode.length)}${newCashCode}`;
        user.jade += currentJadeChargeValue;
        user.cashCode = newCashCode;
        user.chargeCash = currentJadeChargeValue * 10;
        user.chargeTime = Date.now();
        const transaction = await models_1.sequelize.transaction();
        try {
            await user.save({ transaction });
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                place: "controllers-shop-chargeJade",
                content: `chargeJade transaction error`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.json({ newCashCode });
    }
    catch (err) {
        if (!err.place) {
            err.place = "controllers-shop-chargeJade";
            err.content = "chargeJadeError";
            err.user = null;
        }
        next(err);
    }
};
exports.chargeJade = chargeJade;
