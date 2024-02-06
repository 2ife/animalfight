"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminIdArr = exports.updateDailyWeeklyAchivement = exports.ReqError = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class ReqError extends Error {
    constructor(obj, msg) {
        super(msg);
        this.place = obj.place;
        this.content = obj.content;
        this.user = obj.user ? obj.user : null;
    }
}
exports.ReqError = ReqError;
const updateDailyWeeklyAchivement = (achivement) => {
    const { dailyTargetTime, weeklyTargetTime } = achivement;
    const currentDate = new Date();
    const UTCYear = currentDate.getUTCFullYear();
    const UTCMonth = currentDate.getUTCMonth();
    const UTCDate = currentDate.getUTCDate();
    const todayStartTime = Date.UTC(UTCYear, UTCMonth, UTCDate, 0, 0, 0, 0);
    const currentUTCDay = currentDate.getUTCDay();
    const currentTime = currentDate.getTime();
    if (currentTime >= dailyTargetTime + 86400000) {
        achivement.dailyBattleWinCounter = 0;
        achivement.dailyAnimalSummonCounter = 0;
        achivement.dailyBattleWinRewardOrNot = false;
        achivement.dailyAnimalSummonRewardOrNot = false;
        achivement.dailyTargetTime = todayStartTime;
    }
    if (currentTime >= weeklyTargetTime + 604800000) {
        achivement.weeklyBattleWinCounter = 0;
        achivement.weeklyAnimalSummonCounter = 0;
        achivement.weeklyBattleWinRewardOrNot = false;
        achivement.weeklyAnimalSummonRewardOrNot = false;
        achivement.weeklyTargetTime = todayStartTime - currentUTCDay * 86400000;
    }
    return achivement;
};
exports.updateDailyWeeklyAchivement = updateDailyWeeklyAchivement;
const getAdminIdArr = () => {
    let adminIdArrStr = process.env.ADMIN_ID;
    adminIdArrStr = adminIdArrStr.replace(/[\[\]]/g, ""); // 대괄호 제거
    const adminIdArr = adminIdArrStr.split(",").map((adminId) => {
        return adminId.trim();
    });
    return adminIdArr;
};
exports.getAdminIdArr = getAdminIdArr;
