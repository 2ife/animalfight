import { Achivement } from "../models";
import dotenv from "dotenv";

dotenv.config();

type errorObj = {
  place: string;
  content: string;
  user?: string;
};
class ReqError extends Error {
  declare place: string;
  declare content: string;
  declare user: string | null;
  constructor(obj: errorObj, msg: any) {
    super(msg);
    this.place = obj.place;
    this.content = obj.content;
    this.user = obj.user ? obj.user : null;
  }
}

const updateDailyWeeklyAchivement = (achivement: Achivement) => {
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
  return achivement
};

const getAdminIdArr=()=>{
  let adminIdArrStr = process.env.ADMIN_ID!;
  adminIdArrStr = adminIdArrStr.replace(/[\[\]]/g, ""); // 대괄호 제거
  const adminIdArr = adminIdArrStr.split(",").map((adminId) => {
    return adminId.trim();
  });
  return adminIdArr
}

export { errorObj, ReqError,updateDailyWeeklyAchivement,getAdminIdArr };
