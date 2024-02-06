import { RequestHandler } from "express";
import { Achivement, AnimalsInfo, User, sequelize } from "../models";
import {
  errorObj,
  ReqError,
  updateDailyWeeklyAchivement,
  getAdminIdArr,
} from "./common";
import { Op } from "sequelize";

const checkTargetAchivementRewardOrNot = (
  achivement: Achivement,
  achivementIndex: number
) => {
  const {
    dailyBattleWinRewardOrNot,
    dailyAnimalSummonRewardOrNot,
    weeklyBattleWinRewardOrNot,
    weeklyAnimalSummonRewardOrNot,
    allAnimalsRewardOrNot,
    gradeUpgradeRewardOrNot,
    mysteriousCreatureEachUpgradeRewardOrNot,
    monarchEachUpgradeRewardOrNot,
  } = achivement;
  const targetAchivementRewardOrNot =
    achivementIndex < 4
      ? [
          dailyBattleWinRewardOrNot,
          dailyAnimalSummonRewardOrNot,
          weeklyBattleWinRewardOrNot,
          weeklyAnimalSummonRewardOrNot,
        ][achivementIndex]
      : achivementIndex < 9
      ? Boolean(Number(allAnimalsRewardOrNot.split("/")[achivementIndex - 4]))
      : achivementIndex < 14
      ? Boolean(Number(gradeUpgradeRewardOrNot.split("/")[achivementIndex - 9]))
      : achivementIndex < 25
      ? Boolean(
          Number(
            mysteriousCreatureEachUpgradeRewardOrNot.split("/")[
              achivementIndex - 14
            ]
          )
        )
      : Boolean(
          Number(monarchEachUpgradeRewardOrNot.split("/")[achivementIndex - 25])
        );
  return targetAchivementRewardOrNot;
};
const checkTargetAchivementCounter = (
  achivement: Achivement,
  animalsInfo: AnimalsInfo,
  achivementIndex: number
) => {
  const {
    dailyBattleWinCounter,
    dailyAnimalSummonCounter,
    weeklyBattleWinCounter,
    weeklyAnimalSummonCounter,
    allBabiesGetOrNot,
    allSmallsGetOrNot,
    allBeastsGetOrNot,
    allMysteriousCreaturesGetOrNot,
    allMonarchsGetOrNot,
  } = achivement;
  const { gradeUpgrade, mysteriousCreatureEachUpgrade, monarchEachUpgrade } =
    animalsInfo;
  const targetAchivementCounter =
    achivementIndex < 4
      ? [
          dailyBattleWinCounter,
          dailyAnimalSummonCounter,
          weeklyBattleWinCounter,
          weeklyAnimalSummonCounter,
        ][achivementIndex]
      : achivementIndex < 9
      ? [
          allBabiesGetOrNot,
          allSmallsGetOrNot,
          allBeastsGetOrNot,
          allMysteriousCreaturesGetOrNot,
          allMonarchsGetOrNot,
        ][achivementIndex - 4]
      : achivementIndex < 14
      ? Number(gradeUpgrade.split("/")[achivementIndex - 9])
      : achivementIndex < 25
      ? Number(mysteriousCreatureEachUpgrade.split("/")[achivementIndex - 14])
      : Number(monarchEachUpgrade.split("/")[achivementIndex - 25]);
  if (achivementIndex < 4) {
    if (targetAchivementCounter === [3, 4, 15, 20][achivementIndex]) {
      return true;
    }
  } else if (achivementIndex < 9) {
    if (targetAchivementCounter === "1/1/1/1/1/1/1/1/1/1/1") {
      return true;
    }
  } else if (achivementIndex < 14) {
    if (targetAchivementCounter === 2 ** (achivementIndex - 9) * 20) {
      return true;
    }
  } else if (achivementIndex < 25) {
    if (targetAchivementCounter === 25) {
      return true;
    }
  } else {
    if (targetAchivementCounter === 50) {
      return true;
    }
  }
  return false;
};
const receiveAchivementReward: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    const { achivementIndex } = req.body;
    if (
      !Number.isInteger(achivementIndex) ||
      achivementIndex < 0 ||
      achivementIndex >= 38
    ) {
      const errorObj: errorObj = {
        place: "controllers-user-receiveAchivementReward",
        content: `invalid achivementIndex! achivementIndex: ${achivementIndex}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const achivement = await user.getAchivement();
    const originDailyTargetTime = achivement.dailyTargetTime;
    updateDailyWeeklyAchivement(achivement);
    if (
      achivementIndex < 4 &&
      originDailyTargetTime !== achivement.dailyTargetTime
    ) {
      return res.json({ answer: "date changed" });
    }
    const {
      permanentBattleWin,
      permanentBattleWinReward,
      permanentBattlePerfectWin,
      permanentBattlePerfectWinReward,
    } = achivement;
    if (achivementIndex < 36) {
      const targetAchivementRewardOrNot = checkTargetAchivementRewardOrNot(
        achivement,
        achivementIndex
      );
      if (targetAchivementRewardOrNot) {
        const errorObj: errorObj = {
          place: "controllers-user-receiveAchivementReward",
          content: `already receive reward! achivementIndex: ${achivementIndex}`,
          user: user.loginId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
    } else if (
      (achivementIndex === 36 &&
        permanentBattleWin === permanentBattleWinReward) ||
      (achivementIndex === 37 &&
        permanentBattlePerfectWin === permanentBattlePerfectWinReward)
    ) {
      const errorObj: errorObj = {
        place: "controllers-user-receiveAchivementReward",
        content: `already receive reward! achivementIndex: ${achivementIndex}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const animalsInfo = await user.getAnimalsInfo();
    let rewardConditionFullFill = true;
    if (achivementIndex < 36) {
      rewardConditionFullFill = checkTargetAchivementCounter(
        achivement,
        animalsInfo,
        achivementIndex
      );
    }
    if (!rewardConditionFullFill) {
      const errorObj: errorObj = {
        place: "controllers-user-receiveAchivementReward",
        content: `reward condition doesn't fullfilled! achivementIndex: ${achivementIndex}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (achivementIndex === 0) {
      achivement.dailyBattleWinRewardOrNot = true;
      user.spirit += 1;
    } else if (achivementIndex === 1) {
      achivement.dailyAnimalSummonRewardOrNot = true;
      user.jade += 50;
    } else if (achivementIndex === 2) {
      achivement.weeklyBattleWinRewardOrNot = true;
      user.spirit += 6;
    } else if (achivementIndex === 3) {
      achivement.weeklyAnimalSummonRewardOrNot = true;
      user.jade += 300;
    } else if (achivementIndex < 9) {
      achivement.allAnimalsRewardOrNot = achivement.allAnimalsRewardOrNot
        .split("/")
        .map((targetGradeAllAnimals, index) => {
          if (index === achivementIndex - 4) {
            return "1";
          } else {
            return targetGradeAllAnimals;
          }
        })
        .join("/");
      user.spirit += 5 ** (achivementIndex - 4) * 2;
    } else if (achivementIndex < 14) {
      achivement.gradeUpgradeRewardOrNot = achivement.gradeUpgradeRewardOrNot
        .split("/")
        .map((targetUpgradeValue, index) => {
          if (index === achivementIndex - 9) {
            return "1";
          } else {
            return targetUpgradeValue;
          }
        })
        .join("/");
      user.gold += 40 ** (achivementIndex - 9) * 400;
    } else if (achivementIndex < 25) {
      achivement.mysteriousCreatureEachUpgradeRewardOrNot =
        achivement.mysteriousCreatureEachUpgradeRewardOrNot
          .split("/")
          .map((targetUpgradeValue, index) => {
            if (index === achivementIndex - 14) {
              return "1";
            } else {
              return targetUpgradeValue;
            }
          })
          .join("/");
      user.gold += 600000;
    } else if (achivementIndex < 36) {
      achivement.monarchEachUpgradeRewardOrNot =
        achivement.monarchEachUpgradeRewardOrNot
          .split("/")
          .map((targetUpgradeValue, index) => {
            if (index === achivementIndex - 25) {
              return "1";
            } else {
              return targetUpgradeValue;
            }
          })
          .join("/");
      user.gold += 20000000;
    } else if (achivementIndex === 36) {
      achivement.permanentBattleWinReward++;
      user.jade += 1000;
    } else if (achivementIndex === 37) {
      achivement.permanentBattlePerfectWinReward++;
      user.jade += 2000;
    }
    const transaction = await sequelize.transaction();
    try {
      await user.save({ transaction });
      await achivement.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-user-receiveAchivementReward",
        content: `receiveAchivementReward transaction error`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    const achivementData = JSON.parse(JSON.stringify(achivement));
    delete achivementData.id;
    delete achivementData.createdAt;
    delete achivementData.updatedAt;
    delete achivementData.deletedAt;
    delete achivementData.UserId;
    res.json({ achivementData });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-user-receiveAchivementReward";
      err.content = "receiveAchivementRewardError";
      err.user = null;
    }
    next(err);
  }
};

const receivePassReward: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    const { passIndex, rewardIndex } = req.body;
    if (![0, 1, 2, 3].includes(passIndex)) {
      const errorObj: errorObj = {
        place: "controllers-user-receivePassReward",
        content: `invalid passIndex! passIndex: ${passIndex}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (![0, 1].includes(rewardIndex)) {
      const errorObj: errorObj = {
        place: "controllers-user-receivePassReward",
        content: `invalid rewardIndex! rewardIndex: ${rewardIndex}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const passes = await user.getPasses();
    const currentDate = new Date();
    const currentTime = currentDate.getTime();
    for (const pass of passes) {
      if (pass.endTime && pass.endTime <= currentTime) {
        return res.json({ answer: "date changed" });
      }
    }
    const targetPass = passes.find((pass) => {
      return (
        pass.type ===
        ["basic", "beast", "mysteriousCreature", "monarch"][passIndex]
      );
    });
    if (!targetPass) {
      const errorObj: errorObj = {
        place: "controllers-user-receivePassReward",
        content: `target pass doesn't exist! passIndex: ${passIndex}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const { lastSpiritRewardTime, lastScrollRewardTime } = targetPass;
    const lastTargetRewardTime = [lastSpiritRewardTime, lastScrollRewardTime][
      rewardIndex
    ];
    const UTCYear = currentDate.getUTCFullYear();
    const UTCMonth = currentDate.getUTCMonth();
    const UTCDate = currentDate.getUTCDate();
    const todayStartTime = Date.UTC(UTCYear, UTCMonth, UTCDate, 0, 0, 0, 0);
    if (lastTargetRewardTime >= todayStartTime) {
      const errorObj: errorObj = {
        place: "controllers-user-receivePassReward",
        content: `already receive reward! passIndex: ${passIndex} / rewardIndex: ${rewardIndex}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    switch (rewardIndex) {
      case 0: {
        user.spirit += [3, 1, 2, 3][passIndex];
        targetPass.lastSpiritRewardTime = currentTime;
        break;
      }
      case 1: {
        user.scroll += [10, 3, 6, 9][passIndex] * (3 + user.level);
        targetPass.lastScrollRewardTime = currentTime;
        break;
      }
    }

    const transaction = await sequelize.transaction();
    try {
      await user.save({ transaction });
      await targetPass.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-user-receivePassReward",
        content: `receivePassReward transaction error`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({
      lastTargetRewardTime: currentTime,
    });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-user-receivePassReward";
      err.content = "receivePassRewardError";
      err.user = null;
    }
    next(err);
  }
};
const getRankInfo: RequestHandler = async (req, res, next) => {
  try {
    const adminIdArr = getAdminIdArr();
    const topUsers = await User.findAll({
      where: { loginId: { [Op.notIn]: adminIdArr } },
      order: [["highestBattleGrade", "DESC"]],
      limit: 100,
    });
    const rankerData = topUsers.map((ranker) => {
      const { nick, profileAnimal, level, highestBattleGrade, arrangement } =
        ranker;
      return { nick, profileAnimal, level, highestBattleGrade, arrangement };
    });
    res.json({ rankerData });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-user-getRankInfo";
      err.content = "getRankInfoError";
      err.user = null;
    }
    next(err);
  }
};
const changeProfileImg: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    const { animalGrade, animalTypeNumber } = req.body;
    if (![0, 1, 2, 3, 4].includes(animalGrade)) {
      const errorObj: errorObj = {
        place: "controllers-user-changeProfileImg",
        content: `invalid animalGrade! animalGrade: ${animalGrade}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(animalTypeNumber)) {
      const errorObj: errorObj = {
        place: "controllers-user-changeProfileImg",
        content: `invalid animalTypeNumber! animalTypeNumber: ${animalTypeNumber}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const animalNameList = [
      [
        "babyRat",
        "calf",
        "babyTiger",
        "babyRabbit",
        "babySnake",
        "foal",
        "kid",
        "babyMonkey",
        "chick",
        "pup",
        "piglet",
      ],
      [
        "rat",
        "cow",
        "tiger",
        "rabbit",
        "snake",
        "horse",
        "goat",
        "monkey",
        "chicken",
        "dog",
        "pig",
      ],
      [
        "trick",
        "madCow",
        "sahobum",
        "sinmyo",
        "bigSnake",
        "redClayHorse",
        "choa",
        "sahonab",
        "fightChicken",
        "wolf",
        "boar",
      ],
      [
        "brain",
        "unDead",
        "bigTiger",
        "doky",
        "imoogi",
        "skyHorse",
        "suho",
        "sahonabHead",
        "phoenix",
        "wolfHead",
        "boarHead",
      ],
      [
        "blackDragon",
        "first",
        "whiteTiger",
        "moonRabbit",
        "hyeonmu",
        "blueDragon",
        "blackTiger",
        "wukong",
        "jujak",
        "corruption",
        "greed",
      ],
    ];
    const newProfileAnimal = animalNameList[animalGrade][animalTypeNumber];
    user.profileAnimal = newProfileAnimal;
    const transaction = await sequelize.transaction();
    try {
      await user.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-user-changeProfileImg",
        content: `changeProfileImg transaction error`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ answer: "changeProfileImg success" });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-user-changeProfileImg";
      err.content = "changeProfileImgError";
      err.user = null;
    }
    next(err);
  }
};
export {
  receiveAchivementReward,
  receivePassReward,
  getRankInfo,
  changeProfileImg,
};
