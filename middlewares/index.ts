import dotenv from "dotenv";
import { RequestHandler } from "express";
import { errorObj, getAdminIdArr, ReqError } from "../controllers/common";
import { User } from "../models/index";
import { rateLimit } from "express-rate-limit";
import { logger } from "../logger";

dotenv.config();
const getIp = (req: any): string => {
  return req.headers["x-forwarded-for"]
    ? `${req.headers["x-forwarded-for"].split(",")[0]}`
    : "Math.random()";
};
const apiLimiter = rateLimit({
  keyGenerator: getIp,
  windowMs: 60000,
  max: 600,
  handler(req, res) {
    logger.info(`rateLimit over (ip:${getIp})`);
    res.send("단기간 내 너무 많은 데이터를 요청하여 1분 이후에 접속 바랍니다.");
  },
});

const isLoggedIn: RequestHandler = async (req, res, next) => {
  try {
    const { loginCode } = req.body;
    if (!loginCode) {
      const errorObj = {
        place: "middlewares-isLoggedIn",
        content: "no loginCode!",
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const user = await User.findOne({ where: { loginCode } });
    if (!user) {
      const errorObj = {
        place: "middlewares-isLoggedIn",
        content: "no user!",
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (user.lockMemo) {
      const errorObj = {
        place: "middlewares-isLoggedIn",
        content: "user locked!",
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    res.locals.user = user;
    next();
  } catch (err: any) {
    next(err);
  }
};

const blockWhenBattle: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    if (user.currentBattleOrNot) {
      user.currentBattleOrNot = false;
      await user.save();
      const errorObj = {
        place: "middlewares-blockWhenBattle",
        content: `current battle!`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    res.locals.user = user;
    next();
  } catch (err: any) {
    next(err);
  }
};
const permitWhenBattle: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    if (!user.currentBattleOrNot) {
      const errorObj = {
        place: "middlewares-permitWhenBattle",
        content: `not current battle!`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    res.locals.user = user;
    next();
  } catch (err: any) {
    next(err);
  }
};

const isNotLoggedIn: RequestHandler = async (req, res, next) => {
  try {
    const { loginCode } = req.body;
    if (loginCode) {
      const user = await User.findOne({ where: { loginCode } });
      if (user) {
        const errorObj = {
          place: "middlewares-isNotLoggedIn",
          content: `already loggedIn! user id: ${user.id}`,
          user: user.loginId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
    }
    next();
  } catch (err: any) {
    next(err);
  }
};

const isAdminLoggedIn: RequestHandler = async (req, res, next) => {
  try {
    const { loginCode } = req.body;
    if (!loginCode) {
      const errorObj = {
        place: "middlewares-isAdminLoggedIn",
        content: "no loginCode!",
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const user = await User.findOne({ where: { loginCode } });
    if (!user) {
      const errorObj = {
        place: "middlewares-isAdminLoggedIn",
        content: "no user!",
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const adminIdArr = getAdminIdArr();
    if (!adminIdArr.includes(user.loginId)) {
      const errorObj = {
        place: "middlewares-isAdminLoggedIn",
        content: "not admin!",
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (user.lockMemo) {
      const errorObj = {
        place: "middlewares-isAdminLoggedIn",
        content: "user locked!",
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    res.locals.user = user;
    next();
  } catch (err: any) {
    next(err);
  }
};
export {
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  permitWhenBattle,
  isNotLoggedIn,
  isAdminLoggedIn,
};
