import { RequestHandler } from "express";
import { AnimalsInfo, User, sequelize } from "../models";
import { errorObj, ReqError, updateDailyWeeklyAchivement } from "./common";

const putAnimalAmountsFromArrangementToAnimalsInfo = (
  arrangement: string,
  animals: {
    babies: string;
    smalls: string;
    beasts: string;
    mysteriousCreatures: string;
    monarchs: string;
  }
) => {
  try {
    for (let i = 0; i < 5; i++) {
      const targetGradeAnimals = [
        animals.babies,
        animals.smalls,
        animals.beasts,
        animals.mysteriousCreatures,
        animals.monarchs,
      ][i];
      const targetGradeAnimalsInfoArr = targetGradeAnimals.split("/");
      for (const animalsInfo of targetGradeAnimalsInfoArr) {
        const eachAnimalNumber = Number(animalsInfo);
        if (!Number.isInteger(eachAnimalNumber) || eachAnimalNumber < 0) {
          throw new Error();
        }
      }
    }
    const animalsObj = {
      babies: animals.babies,
      smalls: animals.smalls,
      beasts: animals.beasts,
      mysteriousCreatures: animals.mysteriousCreatures,
      monarchs: animals.monarchs,
    };
    const arrangmentInfoArr = arrangement.split("/");
    arrangmentInfoArr.forEach((arrangmentInfo) => {
      if (arrangmentInfo === "0") return;
      const dividerIndex = arrangmentInfo.indexOf("_");
      const grade = Number(arrangmentInfo.slice(0, dividerIndex));
      const typeNumber = Number(arrangmentInfo.slice(dividerIndex + 1));
      let targetGradeAnimals =
        grade === 0
          ? animalsObj.babies
          : grade === 1
          ? animalsObj.smalls
          : grade === 2
          ? animalsObj.beasts
          : grade === 3
          ? animalsObj.mysteriousCreatures
          : animalsObj.monarchs;
      const targetGradeAmountArr = targetGradeAnimals.split("/");
      targetGradeAmountArr[typeNumber] = `${
        Number(targetGradeAmountArr[typeNumber]) + 1
      }`;
      targetGradeAnimals = targetGradeAmountArr.join("/");

      switch (grade) {
        case 0: {
          animalsObj.babies = targetGradeAnimals;
          break;
        }
        case 1: {
          animalsObj.smalls = targetGradeAnimals;
          break;
        }
        case 2: {
          animalsObj.beasts = targetGradeAnimals;
          break;
        }
        case 3: {
          animalsObj.mysteriousCreatures = targetGradeAnimals;
          break;
        }
        case 4: {
          animalsObj.monarchs = targetGradeAnimals;
          break;
        }
      }
    });
    return animalsObj;
  } catch (err: any) {
    return "error";
  }
};
const getAnimalCombineInfoList = (
  grade: number,
  typeNumber: number,
  animalsInfo: AnimalsInfo
) => {
  const animalCombineInfoList = [];
  const { babies, smalls, beasts, mysteriousCreatures } = animalsInfo;
  const targetGradeAnimalAmountList = [
    babies,
    smalls,
    beasts,
    mysteriousCreatures,
  ][grade].split("/");
  for (let i = 0; i < 4; i++) {
    const ingredientTypeNumber = [
      [0, 3, 4, 6],
      [1, 0, 2, 10],
      [2, 1, 7, 9],
      [3, 4, 5, 7],
      [4, 6, 8, 10],
      [5, 1, 4, 8],
      [6, 2, 5, 9],
      [7, 0, 6, 8],
      [8, 3, 5, 10],
      [9, 1, 2, 3],
      [10, 0, 7, 9],
    ][typeNumber][i];
    const amounts = Number(targetGradeAnimalAmountList[ingredientTypeNumber]);
    animalCombineInfoList.push({
      grade,
      typeNumber: ingredientTypeNumber,
      amounts,
      neededAmounts: i === 0 ? 3 : 1,
    });
  }
  return animalCombineInfoList;
};
const saveArrangement: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    let { arrangement } = req.body;
    arrangement = `${arrangement}`;
    const { animals } = req.body as {
      arrangement: string;
      animals: {
        babies: string;
        smalls: string;
        beasts: string;
        mysteriousCreatures: string;
        monarchs: string;
        [animalGrade: string]: string;
      };
    };
    const newAnimals = putAnimalAmountsFromArrangementToAnimalsInfo(
      arrangement,
      animals
    );
    if (newAnimals === "error") {
      const errorObj: errorObj = {
        place: "controllers-animal-saveArrangement",
        content: `invalid newAnimals! arrangement: ${arrangement} / animals: ${animals}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const originalArrangement = user.arrangement;
    const userAnimalsInfo = await user.getAnimalsInfo();
    const { babies, smalls, beasts, mysteriousCreatures, monarchs } =
      userAnimalsInfo;
    const originalAnimals = putAnimalAmountsFromArrangementToAnimalsInfo(
      originalArrangement,
      { babies, smalls, beasts, mysteriousCreatures, monarchs }
    );
    if (originalAnimals === "error") {
      const errorObj: errorObj = {
        place: "controllers-animal-saveArrangement",
        content: `invalid originalAnimals! arrangement: ${originalArrangement} / animals: ${{
          babies,
          smalls,
          beasts,
          mysteriousCreatures,
          monarchs,
        }}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    for (let i = 0; i < 5; i++) {
      let newAnimalsByGrade = newAnimals.babies;
      let originalAnimalsByGrade = originalAnimals.babies;
      if (i === 0) {
      } else if (i === 1) {
        newAnimalsByGrade = newAnimals.smalls;
        originalAnimalsByGrade = originalAnimals.smalls;
      } else if (i === 2) {
        newAnimalsByGrade = newAnimals.beasts;
        originalAnimalsByGrade = originalAnimals.beasts;
      } else if (i === 3) {
        newAnimalsByGrade = newAnimals.mysteriousCreatures;
        originalAnimalsByGrade = originalAnimals.mysteriousCreatures;
      } else if (i === 4) {
        newAnimalsByGrade = newAnimals.monarchs;
        originalAnimalsByGrade = originalAnimals.monarchs;
      }

      if (newAnimalsByGrade !== originalAnimalsByGrade) {
        const errorObj: errorObj = {
          place: "controllers-animal-saveArrangement",
          content: `animals amounts doesn't match`,
          user: user.loginId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
    }
    user.arrangement = arrangement;
    userAnimalsInfo.babies = animals.babies;
    userAnimalsInfo.smalls = animals.smalls;
    userAnimalsInfo.beasts = animals.beasts;
    userAnimalsInfo.mysteriousCreatures = animals.mysteriousCreatures;
    userAnimalsInfo.monarchs = animals.monarchs;
    const transaction = await sequelize.transaction();
    try {
      await user.save({ transaction });
      await userAnimalsInfo.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-animal-saveArrangement",
        content: `saveArrangement transaction error`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ answer: "saveArrangement success" });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-animal-saveArrangement";
      err.content = "saveArrangementError";
      err.user = null;
    }
    next(err);
  }
};
const summonAnimal: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    const { summonAmounts } = req.body;
    if (![1, 10].includes(summonAmounts)) {
      const errorObj: errorObj = {
        place: "controllers-animal-summonAnimal",
        content: `invalid summonAmounts: ${summonAmounts}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (user.spirit < summonAmounts) {
      const errorObj: errorObj = {
        place: "controllers-animal-summonAnimal",
        content: `spirit shortage! spirit: ${user.spirit} / summonAmounts: ${summonAmounts}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    user.spirit -= summonAmounts;
    const newAnimals: { [animalIndex: number]: number } = {};
    for (let i = 0; i < summonAmounts; i++) {
      const randomTypeNumber = Math.floor(Math.random() * 11);
      if (newAnimals[randomTypeNumber]) {
        newAnimals[randomTypeNumber]++;
      } else {
        newAnimals[randomTypeNumber] = 1;
      }
    }
    const animalsInfo = await user.getAnimalsInfo();
    const achivement = await user.getAchivement();
    updateDailyWeeklyAchivement(achivement);
    const { babies } = animalsInfo;
    const babiesInfoArr = babies.split("/");
    const { allBabiesGetOrNot, allAnimalsRewardOrNot } = achivement;
    const { dailyAnimalSummonCounter, weeklyAnimalSummonCounter } = achivement;
    if (dailyAnimalSummonCounter < 8) {
      let newCounter = dailyAnimalSummonCounter + summonAmounts;
      newCounter = newCounter > 8 ? 8 : newCounter;
      achivement.dailyAnimalSummonCounter = newCounter;
    }
    if (weeklyAnimalSummonCounter < 40) {
      let newCounter = weeklyAnimalSummonCounter + summonAmounts;
      newCounter = newCounter > 40 ? 40 : newCounter;
      achivement.weeklyAnimalSummonCounter = newCounter;
    }
    const allBabiesGetOrNotInfoArr = allBabiesGetOrNot.split("/");
    const allAnimalsRewardOrNotInfoArr = allAnimalsRewardOrNot.split("/");
    const allBabiesRewardOrNot = Boolean(
      Number(allAnimalsRewardOrNotInfoArr[0])
    );
    let allBabiesGetOrNotChanged = false;
    for (const animalTypeNumber in newAnimals) {
      const animalAmounts = newAnimals[animalTypeNumber];
      babiesInfoArr[animalTypeNumber] = `${
        Number(babiesInfoArr[animalTypeNumber]) + animalAmounts
      }`;
      if (!allBabiesRewardOrNot) {
        const targetBabyGetOrNot = Boolean(
          Number(allBabiesGetOrNotInfoArr[animalTypeNumber])
        );
        if (!targetBabyGetOrNot) {
          allBabiesGetOrNotInfoArr[animalTypeNumber] = "1";
          allBabiesGetOrNotChanged = true;
        }
      }
    }
    animalsInfo.babies = babiesInfoArr.join("/");
    if (allBabiesGetOrNotChanged) {
      achivement.allBabiesGetOrNot = allBabiesGetOrNotInfoArr.join("/");
    }
    const transaction = await sequelize.transaction();
    try {
      await user.save({ transaction });
      await animalsInfo.save({ transaction });
      await achivement.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-animal-summonAnimal",
        content: `summonAnimal transaction error`,
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
    res.json({ newAnimals, achivementData });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-animal-summonAnimal";
      err.content = "summonAnimalError";
      err.user = null;
    }
    next(err);
  }
};
const combineAnimal: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    const { targetAnimalGrade, targetAnimalTypeNumber } = req.body;
    if (![0, 1, 2, 3].includes(targetAnimalGrade)) {
      const errorObj: errorObj = {
        place: "controllers-animal-combineAnimal",
        content: `invalid targetAnimalGrade: ${targetAnimalGrade}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(targetAnimalTypeNumber)) {
      const errorObj: errorObj = {
        place: "controllers-animal-combineAnimal",
        content: `invalid targetAnimalTypeNumber: ${targetAnimalTypeNumber}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const animalsInfo = await user.getAnimalsInfo();
    const achivement = await user.getAchivement();
    const {
      allSmallsGetOrNot,
      allBeastsGetOrNot,
      allMysteriousCreaturesGetOrNot,
      allMonarchsGetOrNot,
      allAnimalsRewardOrNot,
    } = achivement;
    const combineInfoList = getAnimalCombineInfoList(
      targetAnimalGrade,
      targetAnimalTypeNumber,
      animalsInfo
    );
    for (const combineInfo of combineInfoList) {
      const { neededAmounts, amounts } = combineInfo;
      if (amounts < neededAmounts) {
        const errorObj: errorObj = {
          place: "controllers-animal-combineAnimal",
          content: `animals shortage! amounts: ${amounts} / neededAmounts: ${neededAmounts}`,
          user: user.loginId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
    }
    for (const combineInfo of combineInfoList) {
      const { grade, typeNumber, neededAmounts } = combineInfo;
      const { babies, smalls, beasts, mysteriousCreatures } = animalsInfo;
      const targetGradeAnimalAmountList = [
        babies,
        smalls,
        beasts,
        mysteriousCreatures,
      ][grade].split("/");
      targetGradeAnimalAmountList[typeNumber] = `${
        Number(targetGradeAnimalAmountList[typeNumber]) - neededAmounts
      }`;
      switch (grade) {
        case 0: {
          animalsInfo.babies = targetGradeAnimalAmountList.join("/");
          break;
        }
        case 1: {
          animalsInfo.smalls = targetGradeAnimalAmountList.join("/");
          break;
        }
        case 2: {
          animalsInfo.beasts = targetGradeAnimalAmountList.join("/");
          break;
        }
        case 3: {
          animalsInfo.mysteriousCreatures =
            targetGradeAnimalAmountList.join("/");
          break;
        }
      }
    }
    const newAnimalGrade = targetAnimalGrade + 1;
    const { smalls, beasts, mysteriousCreatures, monarchs } = animalsInfo;
    const newAnimalGradeAnimalAmountList = [
      smalls,
      beasts,
      mysteriousCreatures,
      monarchs,
    ][newAnimalGrade - 1].split("/");
    newAnimalGradeAnimalAmountList[targetAnimalTypeNumber] = `${
      Number(newAnimalGradeAnimalAmountList[targetAnimalTypeNumber]) + 1
    }`;

    switch (newAnimalGrade) {
      case 1: {
        animalsInfo.smalls = newAnimalGradeAnimalAmountList.join("/");
        break;
      }
      case 2: {
        animalsInfo.beasts = newAnimalGradeAnimalAmountList.join("/");
        break;
      }
      case 3: {
        animalsInfo.mysteriousCreatures =
          newAnimalGradeAnimalAmountList.join("/");
        break;
      }
      case 4: {
        animalsInfo.monarchs = newAnimalGradeAnimalAmountList.join("/");
        break;
      }
    }
    const allAnimalsRewardOrNotInfoArr = allAnimalsRewardOrNot.split("/");
    const targetGradeAllAnimalsRewardOrNot = Boolean(
      Number(allAnimalsRewardOrNotInfoArr[newAnimalGrade])
    );
    let targetGradeAllAnimalsGetOrNotChanged = false;
    if (!targetGradeAllAnimalsRewardOrNot) {
      const targetGradeAllAnimalsGetOrNot = [
        allSmallsGetOrNot,
        allBeastsGetOrNot,
        allMysteriousCreaturesGetOrNot,
        allMonarchsGetOrNot,
      ][newAnimalGrade - 1];
      const targetGradeAllAnimalsGetOrNotInfoArr =
        targetGradeAllAnimalsGetOrNot.split("/");
      const targetAnimalGetOrNot = Boolean(
        Number(targetGradeAllAnimalsGetOrNotInfoArr[targetAnimalTypeNumber])
      );
      if (!targetAnimalGetOrNot) {
        targetGradeAllAnimalsGetOrNotInfoArr[targetAnimalTypeNumber] = "1";
        targetGradeAllAnimalsGetOrNotChanged = true;
      }
      if (targetGradeAllAnimalsGetOrNotChanged) {
        switch (newAnimalGrade) {
          case 1: {
            achivement.allSmallsGetOrNot =
              targetGradeAllAnimalsGetOrNotInfoArr.join("/");
            break;
          }
          case 2: {
            achivement.allBeastsGetOrNot =
              targetGradeAllAnimalsGetOrNotInfoArr.join("/");
            break;
          }
          case 3: {
            achivement.allMysteriousCreaturesGetOrNot =
              targetGradeAllAnimalsGetOrNotInfoArr.join("/");
            break;
          }
          case 4: {
            achivement.allMonarchsGetOrNot =
              targetGradeAllAnimalsGetOrNotInfoArr.join("/");
            break;
          }
        }
      }
    }
    const transaction = await sequelize.transaction();
    try {
      await animalsInfo.save({ transaction });
      await achivement.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-animal-combineAnimal",
        content: `combineAnimal transaction error`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
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
    res.json({ animalsInfoData, achivementData });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-animal-combineAnimal";
      err.content = "combineAnimalError";
      err.user = null;
    }
    next(err);
  }
};
const upgradeAnimal: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    const { upgradePart, upgradeIndex } = req.body;
    if (!["grade", "mysteriousCreature", "monarch"].includes(upgradePart)) {
      const errorObj: errorObj = {
        place: "controllers-animal-upgradeAnimal",
        content: `invalid upgradePart! upgradePart: ${upgradePart}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (
      (upgradePart === "grade" && ![0, 1, 2, 3, 4].includes(upgradeIndex)) ||
      (["mysteriousCreature", "monarch"].includes(upgradePart) &&
        ![0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].includes(upgradeIndex))
    ) {
      const errorObj: errorObj = {
        place: "controllers-animal-upgradeAnimal",
        content: `invalid upgradeIndex! upgradePart: ${upgradePart} / upgradeIndex: ${upgradeIndex}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const animalsInfo = await user.getAnimalsInfo();
    const { gradeUpgrade, mysteriousCreatureEachUpgrade, monarchEachUpgrade } =
      animalsInfo;
    const targetUpgrade =
      upgradePart === "grade"
        ? gradeUpgrade
        : upgradePart === "mysteriousCreature"
        ? mysteriousCreatureEachUpgrade
        : monarchEachUpgrade;
    const targetUpgradeInfoArr = targetUpgrade.split("/");
    const targetUpgradeCurrentValue = Number(
      targetUpgradeInfoArr[upgradeIndex]
    );
    const targetUpgradeMaxValue =
      upgradePart === "grade"
        ? 2 ** upgradeIndex * 20
        : upgradePart === "mysteriousCreature"
        ? 25
        : 50;
    if (
      ((upgradePart === "grade" && upgradeIndex < 4) ||
        upgradePart !== "grade") &&
      targetUpgradeCurrentValue === targetUpgradeMaxValue
    ) {
      const errorObj: errorObj = {
        place: "controllers-animal-upgradeAnimal",
        content: `already full upgrade!`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const neededGold =
      upgradePart === "grade"
        ? (targetUpgradeCurrentValue + 1) * 10 ** upgradeIndex
        : upgradePart === "mysteriousCreature"
        ? (targetUpgradeCurrentValue + 1) * 1000
        : (targetUpgradeCurrentValue + 1) * 10000;
    if (user.gold < neededGold) {
      const errorObj: errorObj = {
        place: "controllers-animal-upgradeAnimal",
        content: `money shortage! gold: ${user.gold} / neededGold: ${neededGold}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    user.gold -= neededGold;
    targetUpgradeInfoArr[upgradeIndex] = `${targetUpgradeCurrentValue + 1}`;
    switch (upgradePart) {
      case "grade": {
        animalsInfo.gradeUpgrade = targetUpgradeInfoArr.join("/");
        break;
      }
      case "mysteriousCreature": {
        animalsInfo.mysteriousCreatureEachUpgrade =
          targetUpgradeInfoArr.join("/");
        break;
      }
      case "monarch": {
        animalsInfo.monarchEachUpgrade = targetUpgradeInfoArr.join("/");
        break;
      }
    }
    const transaction = await sequelize.transaction();
    try {
      await user.save({ transaction });
      await animalsInfo.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-animal-upgradeAnimal",
        content: `upgradeAnimal transaction error`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const animalsInfoData = JSON.parse(JSON.stringify(animalsInfo));
    delete animalsInfoData.id;
    delete animalsInfoData.createdAt;
    delete animalsInfoData.updatedAt;
    delete animalsInfoData.deletedAt;
    delete animalsInfoData.UserId;
    res.json({ animalsInfoData });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-animal-upgradeAnimal";
      err.content = "upgradeAnimalError";
      err.user = null;
    }
    next(err);
  }
};
export { saveArrangement, summonAnimal, combineAnimal, upgradeAnimal };
