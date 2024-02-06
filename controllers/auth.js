"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.changeNick = exports.leave = exports.logout = exports.login = exports.checkId = exports.checkNick = exports.join = exports.checkLoginCode = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../models");
const common_1 = require("./common");
const testLoginInfo = (category, text) => {
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
const checkLoginCode = async (req, res, next) => {
    try {
        let { path, loginCode } = req.body;
        path = `${path}`;
        loginCode = `${loginCode}`;
        if (!["basic", "home"].includes(path)) {
            const errorObj = {
                place: "controllers-auth-checkLoginCode",
                content: `banned path! path:${path}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const user = await models_1.User.findOne({ where: { loginCode } });
        if (!user) {
            return res.json({ answer: "no user" });
        }
        if (user.lockMemo) {
            const errorObj = {
                place: "controllers-auth-checkLoginCode",
                content: `user locked!`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        if (path === "basic") {
            return res.json({ answer: "login success" });
        }
        const newLoginCode = await bcrypt_1.default.hash(`${user.id}${Date.now()}`, 2);
        user.loginCode = newLoginCode;
        user.currentBattleOrNot = false;
        const animalsInfo = await user.getAnimalsInfo();
        const achivement = await user.getAchivement();
        let passes = await user.getPasses();
        (0, common_1.updateDailyWeeklyAchivement)(achivement);
        const userData = JSON.parse(JSON.stringify(user));
        delete userData.loginCode;
        delete userData.id;
        delete userData.password;
        delete userData.lockMemo;
        delete userData.battleCode;
        delete userData.createdAt;
        delete userData.updatedAt;
        delete userData.deletedAt;
        const animalsInfoData = JSON.parse(JSON.stringify(animalsInfo));
        delete animalsInfoData.id;
        delete animalsInfoData.createdAt;
        delete animalsInfoData.updatedAt;
        delete animalsInfoData.deletedAt;
        delete animalsInfoData.UserId;
        const achivementData = JSON.parse(JSON.stringify(achivement));
        delete achivementData.id;
        delete achivementData.createdAt;
        delete achivementData.updatedAt;
        delete achivementData.deletedAt;
        delete achivementData.UserId;
        const transaction = await models_1.sequelize.transaction();
        try {
            await user.save({ transaction });
            await achivement.save({ transaction });
            passes.forEach(async (pass) => {
                if (pass.endTime && pass.endTime <= Date.now()) {
                    await pass.destroy({ transaction });
                }
            });
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                place: "controllers-auth-checkLoginCode",
                content: "checkLoginCode transaction error",
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        passes = passes.filter((pass) => {
            return !pass.endTime || pass.endTime > Date.now();
        });
        res.json({
            newLoginCode,
            userData,
            animalsInfoData,
            achivementData,
            passData: passes.map((pass) => {
                const { type, endTime, lastSpiritRewardTime, lastScrollRewardTime } = pass;
                return { type, endTime, lastSpiritRewardTime, lastScrollRewardTime };
            }),
        });
    }
    catch (err) {
        if (!err.place) {
            err.place = "controllers-auth-checkLoginCode";
            err.content = "checkLoginCodeError";
            err.user = null;
        }
        next(err);
    }
};
exports.checkLoginCode = checkLoginCode;
const join = async (req, res, next) => {
    try {
        const { nick, id, password, passwordCheck } = req.body;
        const nickTest = testLoginInfo("nick", nick);
        const idTest = testLoginInfo("id", id);
        const passwordTest = testLoginInfo("password", password);
        if (!nick ||
            !id ||
            !password ||
            !passwordCheck ||
            password !== passwordCheck ||
            !nickTest ||
            !idTest ||
            !passwordTest) {
            const errorObj = {
                place: "controllers-auth-join",
                content: `banned join! nick:${nick} / id:${id} / password:${password} / passwordTest:${passwordTest}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const exNick = await models_1.User.findOne({ where: { nick } });
        const exId = await models_1.User.findOne({ where: { loginId: id } });
        if (exNick || exId) {
            return res.json({
                nickExist: exNick === null ? false : true,
                idExist: exId === null ? false : true,
            });
        }
        const hash = await bcrypt_1.default.hash(password, 12);
        const transaction = await models_1.sequelize.transaction();
        try {
            const user = await models_1.User.create({
                nick,
                loginId: id,
                password: hash,
            }, { transaction });
            await user.createAnimalsInfo({}, { transaction });
            await user.createAchivement({}, { transaction });
            await user.createPass({}, { transaction });
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                place: "controllers-auth-join",
                content: "join transaction error",
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        return res.json({ answer: "join success" });
    }
    catch (err) {
        if (!err.place) {
            err.place = "controllers-auth-join";
            err.content = "joinError";
            err.user = null;
        }
        next(err);
    }
};
exports.join = join;
const checkNick = async (req, res, next) => {
    try {
        const { nick } = req.body;
        const nickTest = testLoginInfo("nick", nick);
        if (!nickTest) {
            const errorObj = {
                place: "controllers-auth-checkNick",
                content: `nickTest fail! nick: ${nick}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const exUser = await models_1.User.findOne({
            where: { nick },
        });
        if (exUser) {
            res.json({ nickExist: true });
        }
        else {
            res.json({ nickExist: false });
        }
    }
    catch (err) {
        if (!err.place) {
            err.place = "controllers-auth-checkNick";
            err.content = "checkNickError";
            err.user = null;
        }
        next(err);
    }
};
exports.checkNick = checkNick;
const checkId = async (req, res, next) => {
    try {
        const { id } = req.body;
        const idTest = testLoginInfo("id", id);
        if (!idTest) {
            const errorObj = {
                place: "controllers-auth-checkId",
                content: `idTest fail! id: ${id}`,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const exUser = await models_1.User.findOne({
            where: { loginId: id },
        });
        if (exUser) {
            res.json({ idExist: true });
        }
        else {
            res.json({ idExist: false });
        }
    }
    catch (err) {
        if (!err.place) {
            err.place = "controllers-auth-checkId";
            err.content = "checkIdError";
            err.user = null;
        }
        next(err);
    }
};
exports.checkId = checkId;
const login = async (req, res, next) => {
    try {
        let { id, password } = req.body;
        id = `${id}`;
        password = `${password}`;
        const user = await models_1.User.findOne({ where: { loginId: id } });
        if (!user) {
            return res.json({ answer: "no user" });
        }
        const result = await bcrypt_1.default.compare(password, user.password);
        if (!result) {
            return res.json({ answer: "no user" });
        }
        if (user.lockMemo) {
            return res.json({ answer: "lock" });
        }
        const loginCode = await bcrypt_1.default.hash(`${id}${Date.now()}`, 2);
        user.loginCode = loginCode;
        await user.save();
        res.json({ loginCode });
    }
    catch (err) {
        if (!err.place) {
            err.place = "controllers-auth-login";
            err.content = "loginError";
            err.user = null;
        }
        next(err);
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    try {
        let { loginCode } = req.body;
        loginCode = `${loginCode}`;
        const user = await models_1.User.findOne({ where: { loginCode } });
        if (!user) {
            return res.redirect("/login");
        }
        user.loginCode = null;
        await user.save();
        res.redirect("/login");
    }
    catch (err) {
        if (!err.place) {
            err.place = "controllers-auth-logout";
            err.content = "logoutError";
            err.user = null;
        }
        next(err);
    }
};
exports.logout = logout;
const leave = async (req, res, next) => { };
exports.leave = leave;
const changeNick = async (req, res, next) => {
    try {
        const user = res.locals.user;
        const { newNick } = req.body;
        const nickTester = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
        if (!nickTester.test(newNick)) {
            const errorObj = {
                place: "controllers-auth-changeNick",
                content: `invalid newNick! newNick: ${newNick}`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const nickExist = await models_1.User.findOne({ where: { nick: newNick } });
        if (nickExist) {
            return res.json({ answer: "nick exist" });
        }
        user.nick = newNick;
        const transaction = await models_1.sequelize.transaction();
        try {
            await user.save({ transaction });
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                place: "controllers-auth-changeNick",
                content: `changeNick transaction error`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.json({ answer: "changeNick success" });
    }
    catch (err) {
        if (!err.place) {
            err.place = "controllers-auth-changeNick";
            err.content = "changeNickError";
            err.user = null;
        }
        next(err);
    }
};
exports.changeNick = changeNick;
const changePassword = async (req, res, next) => {
    try {
        const user = res.locals.user;
        const { newPassword } = req.body;
        const passwordTester = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
        if (!passwordTester.test(newPassword)) {
            const errorObj = {
                place: "controllers-auth-changePassword",
                content: `invalid newPassword! newPassword: ${newPassword}`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, errorObj.content);
        }
        const hash = await bcrypt_1.default.hash(newPassword, 12);
        user.password = hash;
        const transaction = await models_1.sequelize.transaction();
        try {
            await user.save({ transaction });
            await transaction.commit();
        }
        catch (err) {
            await transaction.rollback();
            const errorObj = {
                place: "controllers-auth-changePassword",
                content: `changePassword transaction error`,
                user: user.loginId,
            };
            throw new common_1.ReqError(errorObj, err.message);
        }
        res.json({ answer: "changePassword success" });
    }
    catch (err) {
        if (!err.place) {
            err.place = "controllers-auth-changePassword";
            err.content = "changePasswordError";
            err.user = null;
        }
        next(err);
    }
};
exports.changePassword = changePassword;
