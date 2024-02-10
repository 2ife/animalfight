import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { Achivement, AnimalsInfo, User, sequelize } from "../models";
import { errorObj, ReqError, updateDailyWeeklyAchivement } from "./common";
import { Op } from "sequelize";
const startBattle: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    if (
      user.arrangement ===
      "0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0"
    ) {
      const errorObj: errorObj = {
        place: "controllers-battle-startBattle",
        content: `no animals!`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const { currentBattleGradeGroupIndex, currentDetailGrade } = req.body;
    if (
      !Number.isInteger(currentBattleGradeGroupIndex) ||
      currentBattleGradeGroupIndex <= 0
    ) {
      const errorObj: errorObj = {
        place: "controllers-battle-startBattle",
        content: `invalid currentBattleGradeGroupIndex! currentBattleGradeGroupIndex: ${currentBattleGradeGroupIndex}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (!Number.isInteger(currentDetailGrade) || currentDetailGrade <= 0) {
      const errorObj: errorObj = {
        place: "controllers-battle-startBattle",
        content: `invalid currentDetailGrade! currentDetailGrade: ${currentDetailGrade}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const currentGrade =
      (currentBattleGradeGroupIndex - 1) * 100 + currentDetailGrade;
    if (currentGrade > user.highestBattleGrade + 1) {
      const errorObj: errorObj = {
        place: "controllers-battle-startBattle",
        content: `invalid currentGrade! currentGrade: ${currentGrade} / highestBattleGrade: ${user.highestBattleGrade}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const neededScrolls = (Math.ceil(currentGrade / 20) + 1) * 5;
    if (user.scroll < neededScrolls) {
      const errorObj: errorObj = {
        place: "controllers-battle-startBattle",
        content: `neededScrolls shortage! neededScrolls: ${neededScrolls} / current scroll: ${user.scroll}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    res.json({ answer: "startBattle success" });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-battle-startBattle";
      err.content = "startBattleError";
      err.user = null;
    }
    next(err);
  }
};
const checkBeforeBattle: RequestHandler = async (req, res, next) => {
  try {
    let { loginCode } = req.body;
    loginCode = `${loginCode}`;
    const user = await User.findOne({ where: { loginCode } });
    if (!user) {
      return res.json({ answer: "no user" });
    }
    if (user.currentBattleOrNot) {
      const errorObj: errorObj = {
        place: "controllers-battle-checkBeforeBattle",
        content: `current battle! user id: ${user.id}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const { battleGrade } = req.body;
    if (!Number.isInteger(battleGrade) || battleGrade <= 0) {
      const errorObj: errorObj = {
        place: "controllers-battle-checkBeforeBattle",
        content: `invalid battleGrade! battleGrade: ${battleGrade}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (battleGrade > user.highestBattleGrade + 1) {
      const errorObj: errorObj = {
        place: "controllers-battle-checkBeforeBattle",
        content: `impossible battleGrade! battleGrade: ${battleGrade} / highestBattleGrade: ${user.highestBattleGrade}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const neededScrolls = (Math.ceil(battleGrade / 20) + 1) * 5;
    if (user.scroll < neededScrolls) {
      const errorObj: errorObj = {
        place: "controllers-battle-checkBeforeBattle",
        content: `neededScrolls shortage! neededScrolls: ${neededScrolls} / current scroll: ${user.scroll}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const newLoginCode = await bcrypt.hash(`${user.id}${Date.now()}`, 2);
    user.loginCode = newLoginCode;
    user.currentBattleOrNot = true;
    const animalsInfo = await user.getAnimalsInfo();
    const { arrangement } = user;
    const { gradeUpgrade, mysteriousCreatureEachUpgrade, monarchEachUpgrade } =
      animalsInfo;
    const transaction = await sequelize.transaction();
    try {
      await user.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-battle-checkBeforeBattle",
        content: `checkBeforeBattle transaction error`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({
      newLoginCode,
      arrangement,
      animalsUpgradeInfo: {
        gradeUpgrade,
        mysteriousCreatureEachUpgrade,
        monarchEachUpgrade,
      },
    });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-battle-checkBeforeBattle";
      err.content = "checkBeforeBattleError";
      err.user = null;
    }
    next(err);
  }
};
const giveUpBattle: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    user.currentBattleOrNot = false;
    const transaction = await sequelize.transaction();
    try {
      await user.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-battle-giveUpBattle",
        content: `giveUpBattle transaction error`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ answer: "giveUpBattle success" });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-battle-giveUpBattle";
      err.content = "giveUpBattleError";
      err.user = null;
    }
    next(err);
  }
};
const winBattle: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    user.currentBattleOrNot = false;
    await user.save();
    const { battleGrade, moveLog, star } = req.body;
    if (!Number.isInteger(battleGrade) || battleGrade <= 0) {
      const errorObj: errorObj = {
        place: "controllers-battle-winBattle",
        content: `invalid battleGrade! battleGrade: ${battleGrade}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const { highestBattleGrade } = user;
    if (battleGrade > highestBattleGrade + 1) {
      const errorObj: errorObj = {
        place: "controllers-battle-winBattle",
        content: `impossible battleGrade! battleGrade: ${battleGrade} / highestBattleGrade: ${highestBattleGrade}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const neededScrolls = (Math.ceil(battleGrade / 20) + 1) * 5;
    if (user.scroll < neededScrolls) {
      const errorObj: errorObj = {
        place: "controllers-battle-winBattle",
        content: `neededScrolls shortage! neededScrolls: ${neededScrolls} / current scroll: ${user.scroll}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (!Array.isArray(moveLog)) {
      const errorObj: errorObj = {
        place: "controllers-battle-winBattle",
        content: `invalid moveLog!`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    for (const moveInfo of moveLog) {
      const firstDividerIndex = moveInfo.indexOf("_");
      const secondDividerIndex = moveInfo.indexOf("-");
      const proceedTick = Number(moveInfo.slice(0, firstDividerIndex));
      const originZoneNumber = Number(
        moveInfo.slice(firstDividerIndex + 1, secondDividerIndex)
      );
      const targetZoneNumber = Number(moveInfo.slice(secondDividerIndex + 1));
      if (
        !Number.isInteger(proceedTick) ||
        proceedTick < 1 ||
        proceedTick > 3600
      ) {
        const errorObj: errorObj = {
          place: "controllers-battle-winBattle",
          content: `invalid moveLog!`,
          user: user.loginId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
      const validZoneNumberList = [
        11, 12, 14, 15, 17, 18, 21, 22, 24, 25, 27, 28, 41, 42, 44, 45, 47, 48,
        51, 52, 54, 55, 57, 58, 71, 72, 74, 75, 77, 78, 81, 82, 84, 85, 87, 88,
      ];
      if (
        !validZoneNumberList.includes(originZoneNumber) ||
        !validZoneNumberList.includes(targetZoneNumber)
      ) {
        const errorObj: errorObj = {
          place: "controllers-battle-winBattle",
          content: `invalid moveLog!`,
          user: user.loginId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
    }
    if (![1, 2, 3].includes(star)) {
      const errorObj: errorObj = {
        place: "controllers-battle-winBattle",
        content: `invalid star! star: ${star}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const { arrangement } = user;
    const animalsInfo = await user.getAnimalsInfo();
    const { gradeUpgrade, mysteriousCreatureEachUpgrade, monarchEachUpgrade } =
      animalsInfo;
    const getZoneNumberByAnimalIndex = (imgIndex: number) => {
      const zoneNumber =
        [1, 2, 4, 5, 7, 8][Math.floor(imgIndex / 6)] * 10 +
        [1, 2, 4, 5, 7, 8][imgIndex % 6];
      return zoneNumber;
    };
    class Battle {
      declare grade: number;
      declare life: number;
      declare enemiesArr: Enemy[];
      declare animalsArr: Animal[];
      declare attackObjectsArr: AttackObject[];
      declare tick: number;
      declare jadeIncrease: number;
      declare goldIncrease: number;
      declare star: 0 | 1 | 2 | 3;
      constructor(grade: number) {
        this.grade = grade;
        this.life = 60;
        this.enemiesArr = [];
        this.animalsArr = [];
        this.attackObjectsArr = [];
        this.tick = 0;
        this.jadeIncrease = 0;
        this.goldIncrease = 0;
        this.star = 0;
      }
      startBattle(
        arrangement: string,
        animalsUpgradeInfo: {
          gradeUpgrade: string;
          mysteriousCreatureEachUpgrade: string;
          monarchEachUpgrade: string;
        }
      ) {
        const {
          gradeUpgrade,
          mysteriousCreatureEachUpgrade,
          monarchEachUpgrade,
        } = animalsUpgradeInfo;
        const arrangementInfoArr = arrangement.split("/");
        arrangementInfoArr.forEach((arrangementInfo, index) => {
          if (arrangementInfo === "0") {
            return;
          }
          const dividerIndex = arrangementInfo.indexOf("_");
          const grade = Number(arrangementInfo.slice(0, dividerIndex));
          const typeNumber = Number(arrangementInfo.slice(dividerIndex + 1));
          const targetGradeUpgrade = Number(gradeUpgrade.split("/")[grade]);
          const targetEachUpgrade =
            grade < 3
              ? 0
              : grade === 3
              ? Number(mysteriousCreatureEachUpgrade.split("/")[typeNumber])
              : Number(monarchEachUpgrade.split("/")[typeNumber]);
          const newAnimal = new Animal(
            this,
            this.animalsArr.length,
            grade,
            typeNumber,
            targetGradeUpgrade,
            targetEachUpgrade,
            getZoneNumberByAnimalIndex(index)
          );
          this.animalsArr.push(newAnimal);
        });
        this.proceedBattle();
      }
      moveEnemies() {
        this.enemiesArr.forEach((enemy) => {
          if (!enemy.dead) {
            enemy.updateDebuffArr();
            const moveSpeed = enemy.getSpeed();
            enemy.move(moveSpeed);
            enemy.getNewSlowDebuff();
          }
        });
      }
      createEnemy() {
        const enemyIndex = this.tick / 20;
        const enemy = new Enemy(this, enemyIndex);
        this.enemiesArr.push(enemy);
        enemy.getNewSlowDebuff();
      }
      attackEnemies() {
        this.animalsArr.forEach((animal) => {
          animal.updateBuff();
          animal.attackEnemy();
        });
        this.attackObjectsArr = this.attackObjectsArr.filter((attackObject) => {
          return !attackObject.end;
        });
        this.attackObjectsArr.forEach((attackObject) => {
          attackObject.moveObject();
        });
      }
      winBattle() {
        this.star = this.life === 60 ? 3 : this.life >= 40 ? 2 : 1;
        if (star > this.star) {
          const errorObj: errorObj = {
            place: "controllers-battle-winBattle",
            content: `invalid star! star by simulation: ${this.star} / received star: ${star}`,
            user: user.loginId,
          };
          throw new ReqError(errorObj, errorObj.content);
        }
      }
      loseBattle() {
        const errorObj: errorObj = {
          place: "controllers-battle-winBattle",
          content: `lose Battle!`,
          user: user.loginId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
      loseLife(life: number) {
        this.life -= life;
        if (this.life <= 0) {
          this.loseBattle();
        }
      }
      proceedBattle() {
        while (this.tick <= 3600) {
          for (let i = 0; i < moveLog.length; i++) {
            const moveInfo = moveLog[i];
            const firstDividerIndex = moveInfo.indexOf("_");
            const proceedTick = Number(moveInfo.slice(0, firstDividerIndex));
            if (proceedTick !== this.tick) {
              continue;
            }
            const secondDividerIndex = moveInfo.indexOf("-");
            const originZoneNumber = Number(
              moveInfo.slice(firstDividerIndex + 1, secondDividerIndex)
            );
            const originAnimal = this.animalsArr.find((animal) => {
              return animal.zoneNumber === originZoneNumber;
            });
            if (!originAnimal) {
              break;
            }
            const targetZoneNumber = Number(
              moveInfo.slice(secondDividerIndex + 1)
            );
            originAnimal.moveAnimal(targetZoneNumber);
          }
          if (this.tick === 3600) {
            const boss = this.enemiesArr[119];
            if (boss.dead) {
              const livingEnemies = this.enemiesArr.filter((enemy) => {
                return (
                  !enemy.dead &&
                  (enemy.path !== 20 ||
                    (enemy.path === 20 && enemy.coordY > 50))
                );
              });
              const livingEnemiesAmounts = livingEnemies.length;
              this.loseLife(livingEnemiesAmounts);
              if (this.life > 0) {
                this.winBattle();
              }
              break;
            } else {
              this.loseBattle();
              break;
            }
          }

          this.moveEnemies();
          if (
            this.tick >= 0 &&
            Math.floor(this.tick / 20) === this.tick / 20 &&
            this.tick <= 2400
          ) {
            this.createEnemy();
          }
          this.attackEnemies();
          this.tick++;
        }
      }
    }
    const rightDirectionPathList = [1, 3, 5, 9, 17];
    const leftDirectionPathList = [7, 11, 13, 15, 19];
    const downDirectionPathList = [2, 6, 8, 10, 14];
    const upDirectionPathList = [4, 12, 16, 18, 20];
    class Enemy {
      declare battle: Battle;
      declare index: number;
      declare dead: boolean;
      declare path: number;
      declare zoneNumber: number;
      declare coordX: number;
      declare coordY: number;
      declare hp: number;
      declare debuffArr: {
        speedDecrease: number;
        area: {
          leftX: number;
          rightX: number;
          topY: number;
          bottomY: number;
        } | null;
        endTick: number | null;
        subjectIndex: number;
      }[];
      constructor(battle: Battle, index: number) {
        this.battle = battle;
        this.dead = false;
        this.index = index;
        this.zoneNumber = 0;
        this.path = 1;
        this.coordX = 50;
        this.coordY = 50;
        this.hp =
          Math.ceil(battle.grade / 10) *
          battle.grade *
          (index === 60 ? 2500 : 200);
        this.debuffArr = [];
      }
      getNewSlowDebuff() {
        const existDebuffSubjectIndexArr: number[] = [];
        this.debuffArr.forEach((debuff) => {
          existDebuffSubjectIndexArr.push(debuff.subjectIndex);
        });
        const goats = this.battle.animalsArr.filter((animal) => {
          return animal.typeNumber === 6 && animal.grade >= 1;
        });
        goats.forEach((goat) => {
          if (existDebuffSubjectIndexArr.includes(goat.index)) {
            return;
          }
          const { leftX, rightX, topY, bottomY, index } = goat;
          if (
            this.coordX >= leftX &&
            this.coordX <= rightX &&
            this.coordY >= topY &&
            this.coordY <= bottomY
          ) {
            this.debuffArr.push({
              speedDecrease:
                0.125 * skillCoefficientArr[goat.grade] +
                0.001 * goat.eachUpgrade +
                (goat.grade === 4 ? 0.2 : 0),
              area: { leftX, rightX, topY, bottomY },
              endTick: null,
              subjectIndex: index,
            });
          }
        });
      }
      updateDebuffArr() {
        this.debuffArr = this.debuffArr.filter((debuff, index, arr) => {
          const { endTick, area } = debuff;
          return (
            (endTick && endTick > this.battle.tick) ||
            (area &&
              this.coordX >= area.leftX &&
              this.coordX <= area.rightX &&
              this.coordY >= area.topY &&
              this.coordY <= area.bottomY)
          );
        });
      }
      getSpeed() {
        const basisSpeed = 5;
        let speed = basisSpeed;
        let highestSpeedDecrease = 0;
        for (const debuff of this.debuffArr) {
          const { speedDecrease } = debuff;
          if (speedDecrease === 1) {
            highestSpeedDecrease = 1;
            break;
          }
          highestSpeedDecrease =
            highestSpeedDecrease < speedDecrease
              ? speedDecrease
              : highestSpeedDecrease;
        }
        if (highestSpeedDecrease === 1) {
          speed = 0;
        } else if (this.index !== 60) {
          speed *= 1 - highestSpeedDecrease;
        } else if (highestSpeedDecrease > 0.7) {
          speed *= 1 - highestSpeedDecrease;
        } else {
          speed *= 1 - highestSpeedDecrease / 2;
        }
        return speed;
      }
      move(speed: number) {
        if (this.path === 20) {
          this.coordY -= speed;
          if (this.coordY <= 50) {
            this.dead = true;
            this.battle.loseLife(1);
            if (this.index === 60) {
              this.battle.loseBattle();
            }
          }
          return;
        }
        if (rightDirectionPathList.includes(this.path)) {
          this.coordX += speed;
          if (
            ([1, 17].includes(this.path) && this.coordX >= 350) ||
            ([5, 9].includes(this.path) && this.coordX >= 950) ||
            (this.path === 3 && this.coordX >= 650)
          ) {
            this.path++;
            this.move(0);
          }
        } else if (leftDirectionPathList.includes(this.path)) {
          this.coordX -= speed;
          if (
            ([7, 11].includes(this.path) && this.coordX <= 650) ||
            ([15, 19].includes(this.path) && this.coordX <= 50) ||
            (this.path === 13 && this.coordX <= 350)
          ) {
            this.path++;
            this.move(0);
          }
        } else if (downDirectionPathList.includes(this.path)) {
          this.coordY += speed;
          if (
            ([2, 6].includes(this.path) && this.coordY >= 350) ||
            ([10, 14].includes(this.path) && this.coordY >= 950) ||
            (this.path === 8 && this.coordY >= 650)
          ) {
            this.path++;
            this.move(0);
          }
        } else if (upDirectionPathList.includes(this.path)) {
          this.coordY -= speed;
          if (
            (this.path === 4 && this.coordY <= 50) ||
            ([12, 16].includes(this.path) && this.coordY <= 650) ||
            (this.path === 18 && this.coordY <= 350)
          ) {
            this.path++;
            this.move(0);
          }
        }
        this.zoneNumber =
          Math.floor(this.coordY / 100) * 10 + Math.floor(this.coordX / 100);
      }
      getDamage(dmg: number) {
        this.hp -= dmg;
        if (this.hp <= 0) {
          this.dead = true;
          if (this.battle.tick > 2400) {
            const livingEnemies = this.battle.enemiesArr.filter((enemy) => {
              return !enemy.dead;
            });
            const livingEnemiesAmounts = livingEnemies.length;
            if (livingEnemiesAmounts === 0) {
              this.battle.winBattle();
            }
          }
        }
      }
    }
    class AttackObject {
      declare battle: Battle;
      declare coordX: number;
      declare coordY: number;
      declare target: Enemy;
      declare damage: number;
      declare end: boolean;
      constructor(
        battle: Battle,
        coordX: number,
        coordY: number,
        target: Enemy,
        damage: number
      ) {
        this.battle = battle;
        this.coordX = coordX;
        this.coordY = coordY;
        this.target = target;
        this.damage = damage;
        this.end = false;
      }
      moveObject() {
        if (this.target.dead) {
          this.end = true;
          return;
        }
        const coordXDif = this.target.coordX - this.coordX;
        const coordYDif = this.target.coordY - this.coordY;
        const length = Math.sqrt(coordXDif ** 2 + coordYDif ** 2);
        const speed = 17.5;
        if (length <= speed) {
          this.target.getDamage(this.damage);
          this.end = true;
          return;
        }
        this.coordX = this.coordX + speed * (coordXDif / length);
        this.coordY = this.coordY + speed * (coordYDif / length);
      }
    }
    const basisDPSArr = [60, 600, 6000, 60000, 600000];
    const attackSpeedBasicNumberArr = [2, 9, 6, 1, 5, 8, 7, 4, 0, 3, 10];
    const attackSpeedArr = [1, 1.25, 1.875, 3, 6];
    const skillCoefficientArr = [0, 0.5, 1, 2, 4];
    class Animal {
      declare battle: Battle;
      declare index: number;
      declare grade: number;
      declare typeNumber: number;
      declare eachUpgrade: number;
      declare firstAttackDamage: number;
      declare attackDamage: number;
      declare firstAttackSpeed: number;
      declare attackSpeed: number;
      declare lastAttackTick: number;
      declare totalAttackNumbers: number;
      declare attackDamageBuffArr: {
        attackDamageIncrease: number;
        subjectIndex: number;
        endTick: number;
      }[];
      declare attackSpeedBuffArr: {
        attackSpeedIncrease: number;
        subjectIndex: number;
        endTick: number;
      }[];
      declare zoneNumber: number;
      declare coordX: number;
      declare coordY: number;
      declare leftX: number;
      declare rightX: number;
      declare topY: number;
      declare bottomY: number;
      constructor(
        battle: Battle,
        index: number,
        grade: number,
        typeNumber: number,
        gradeUpGrade: number,
        eachUpgrade: number,
        zoneNumber: number
      ) {
        this.battle = battle;
        this.index = index;
        this.grade = grade;
        this.typeNumber = typeNumber;
        this.eachUpgrade = eachUpgrade;
        const basisDPS = basisDPSArr[grade];
        this.firstAttackSpeed =
          attackSpeedArr[grade] *
          (1 - attackSpeedBasicNumberArr[typeNumber] / 20);
        const basisAttackDamage = basisDPS / this.firstAttackSpeed;
        if (grade >= 3 && typeNumber === 3) {
          this.firstAttackSpeed += eachUpgrade * (grade === 3 ? 0.02 : 0.04);
        }
        this.attackSpeed = this.firstAttackSpeed;
        this.firstAttackDamage = Math.round(
          basisAttackDamage *
            (1 +
              0.05 * gradeUpGrade +
              (grade < 3 || typeNumber === 3 ? 0 : grade === 3 ? 0.1 : 0.2) *
                eachUpgrade)
        );
        this.attackDamage = this.firstAttackDamage;
        this.lastAttackTick = -100;
        this.totalAttackNumbers = 0;
        this.attackDamageBuffArr = [];
        this.attackSpeedBuffArr = [];
        this.zoneNumber = zoneNumber;
        this.coordX = Number(zoneNumber.toString()[1]) * 100 + 50;
        this.coordY = Number(zoneNumber.toString()[0]) * 100 + 50;
        this.leftX = this.coordX - 250;
        this.rightX = this.coordX + 250;
        this.topY = this.coordY - 250;
        this.bottomY = this.coordY + 250;
      }
      setCoord(zoneNumber: number) {
        this.zoneNumber = zoneNumber;
        this.coordX = Number(zoneNumber.toString()[1]) * 100 + 50;
        this.coordY = Number(zoneNumber.toString()[0]) * 100 + 50;
        this.leftX = this.coordX - 250;
        this.rightX = this.coordX + 250;
        this.topY = this.coordY - 250;
        this.bottomY = this.coordY + 250;
      }
      updateBuff() {
        this.attackDamageBuffArr = this.attackDamageBuffArr.filter((buff) => {
          return buff.endTick > this.battle.tick;
        });
        this.attackSpeedBuffArr = this.attackSpeedBuffArr.filter((buff) => {
          return buff.endTick > this.battle.tick;
        });
        let highestAttackDamageIncrease = 0;
        let highestAttackSpeedIncrease = 0;
        for (const buff of this.attackDamageBuffArr) {
          highestAttackDamageIncrease =
            highestAttackDamageIncrease > buff.attackDamageIncrease
              ? highestAttackDamageIncrease
              : buff.attackDamageIncrease;
        }
        for (const buff of this.attackSpeedBuffArr) {
          highestAttackSpeedIncrease =
            highestAttackSpeedIncrease > buff.attackSpeedIncrease
              ? highestAttackSpeedIncrease
              : buff.attackSpeedIncrease;
        }
        this.attackDamage =
          this.firstAttackDamage + highestAttackDamageIncrease;
        this.attackSpeed = this.firstAttackSpeed + highestAttackSpeedIncrease;
      }
      checkAttackOrNot() {
        return this.lastAttackTick + 20 / this.attackSpeed <= this.battle.tick;
      }
      findTarget() {
        let target: Enemy | null = null;
        for (let i = 0; i < this.battle.enemiesArr.length; i++) {
          const enemy = this.battle.enemiesArr[i];
          if (
            enemy.index * 20 < this.battle.tick &&
            !enemy.dead &&
            enemy.coordX >= this.leftX &&
            enemy.coordX <= this.rightX &&
            enemy.coordY >= this.topY &&
            enemy.coordY <= this.bottomY
          ) {
            target = enemy;
            break;
          }
        }
        return target;
      }
      moveAnimalWithUpdatingSlowDebuff(animal: Animal, newZoneNumber: number) {
        animal.battle.enemiesArr.forEach((enemy) => {
          if (enemy.dead) {
            return;
          }
          enemy.debuffArr = enemy.debuffArr.filter((debuff) => {
            return debuff.subjectIndex !== animal.index;
          });
        });
        animal.setCoord(newZoneNumber);
        const { leftX, rightX, topY, bottomY } = animal;
        animal.battle.enemiesArr.forEach((enemy) => {
          if (
            enemy.dead ||
            enemy.coordX < leftX ||
            enemy.coordX > rightX ||
            enemy.coordY < topY ||
            enemy.coordY > bottomY
          ) {
            return;
          }
          enemy.debuffArr.push({
            speedDecrease:
              0.125 * skillCoefficientArr[animal.grade] +
              animal.eachUpgrade * 0.001 +
              (animal.grade === 4 ? 0.2 : 0),
            area: { leftX, rightX, topY, bottomY },
            endTick: null,
            subjectIndex: animal.index,
          });
        });
      }
      moveAnimal(zoneNumber: number) {
        const existAnimal = this.battle.animalsArr.find((animal) => {
          return animal.zoneNumber === zoneNumber;
        });
        if (existAnimal) {
          if (existAnimal.typeNumber !== 6 || existAnimal.grade < 1) {
            existAnimal.setCoord(this.zoneNumber);
          } else {
            this.moveAnimalWithUpdatingSlowDebuff(existAnimal, this.zoneNumber);
          }
        }
        if (this.typeNumber !== 6 || this.grade < 1) {
          this.setCoord(zoneNumber);
          return;
        }
        this.moveAnimalWithUpdatingSlowDebuff(this, zoneNumber);
      }
      getTargetConditionArr(zoneNumber: number) {
        return [
          zoneNumber,
          zoneNumber + 1,
          zoneNumber - 1,
          zoneNumber + 9,
          zoneNumber - 9,
          zoneNumber + 10,
          zoneNumber - 10,
          zoneNumber + 11,
          zoneNumber - 11,
        ];
      }
      attackEnemy() {
        const attackOrNot = this.checkAttackOrNot();
        if (!attackOrNot) return;
        const target = this.findTarget();
        if (!target) return;
        this.totalAttackNumbers++;
        const attackObject = new AttackObject(
          this.battle,
          this.coordX,
          this.coordY,
          target,
          this.attackDamage
        );
        this.battle.attackObjectsArr.push(attackObject);
        this.lastAttackTick = this.battle.tick;
        if (this.typeNumber === 6 || this.grade < 1) return;
        if ([0, 5].includes(this.typeNumber)) {
          let skillTargetEnemies = this.battle.enemiesArr.filter((enemy) => {
            return !enemy.dead && enemy.zoneNumber === target.zoneNumber;
          });
          skillTargetEnemies.forEach((skillTarget) => {
            skillTarget.getDamage(
              this.typeNumber === 0
                ? Math.round(
                    (((this.totalAttackNumbers % 20) + 1) / 10) *
                      skillCoefficientArr[this.grade] *
                      this.attackDamage *
                      0.2
                  )
                : Math.round(
                    skillCoefficientArr[this.grade] * this.attackDamage * 0.2
                  )
            );
          });
          if (this.grade < 4) return;
          if (
            (this.typeNumber === 0 && this.totalAttackNumbers % 100 !== 0) ||
            (this.typeNumber === 5 && this.totalAttackNumbers % 20 !== 0)
          )
            return;
          skillTargetEnemies
            .filter((skillTarget) => {
              return !skillTarget.dead;
            })
            .forEach((skillTarget) => {
              skillTarget.getDamage(
                this.typeNumber === 0
                  ? 20 * this.attackDamage
                  : 4 * this.attackDamage
              );
            });
        } else if ([1, 3].includes(this.typeNumber)) {
          if (this.totalAttackNumbers % 10 !== 0) return;
          const targetConditionArr = this.getTargetConditionArr(
            this.zoneNumber
          );
          const skillTargetAnimals = this.battle.animalsArr.filter((animal) => {
            return targetConditionArr.includes(animal.zoneNumber);
          });
          skillTargetAnimals.forEach((animal) => {
            if (this.typeNumber === 1) {
              animal.attackDamageBuffArr.push({
                attackDamageIncrease: Math.round(
                  0.1 * skillCoefficientArr[this.grade] * this.attackDamage
                ),
                subjectIndex: this.index,
                endTick: this.battle.tick + 100,
              });
            } else {
              animal.attackSpeedBuffArr.push({
                attackSpeedIncrease:
                  0.1 * skillCoefficientArr[this.grade] * this.attackSpeed,
                subjectIndex: this.index,
                endTick: this.battle.tick + 100,
              });
            }
          });
          if (this.grade < 4) return;
          if (this.totalAttackNumbers % 100 !== 0) return;
          this.battle.animalsArr.forEach((animal) => {
            if (skillTargetAnimals.includes(animal)) return;
            if (this.typeNumber === 1) {
              animal.attackDamageBuffArr.push({
                attackDamageIncrease: Math.round(
                  0.1 * skillCoefficientArr[this.grade] * this.attackDamage
                ),
                subjectIndex: this.index,
                endTick: this.battle.tick + 100,
              });
            } else {
              animal.attackSpeedBuffArr.push({
                attackSpeedIncrease:
                  0.1 * skillCoefficientArr[this.grade] * this.attackSpeed,
                subjectIndex: this.index,
                endTick: this.battle.tick + 100,
              });
            }
          });
        } else if ([2, 4, 7].includes(this.typeNumber)) {
          if (this.totalAttackNumbers % 10 !== 0) return;
          const targetConditionArr = this.getTargetConditionArr(
            target.zoneNumber
          );
          let skillTargetEnemies = this.battle.enemiesArr.filter((enemy) => {
            return !enemy.dead && targetConditionArr.includes(enemy.zoneNumber);
          });
          skillTargetEnemies.forEach((enemy) => {
            enemy.getDamage(
              Math.round(
                (this.typeNumber === 2
                  ? 0.4
                  : this.typeNumber === 4
                  ? 0.5
                  : 0.1) *
                  skillCoefficientArr[this.grade] *
                  this.attackDamage
              )
            );
          });
          skillTargetEnemies = skillTargetEnemies.filter((enemy) => {
            return !enemy.dead;
          });
          if ([2, 7].includes(this.typeNumber)) {
            const stunTime =
              (this.typeNumber === 2 ? 2 : 8) * skillCoefficientArr[this.grade];
            skillTargetEnemies.forEach((enemy) => {
              enemy.debuffArr.push({
                speedDecrease: 1,
                area: null,
                endTick:
                  this.battle.tick +
                  (enemy.index === 60 ? stunTime / 2 : stunTime),
                subjectIndex: this.index,
              });
            });
          }
          if (this.grade < 4) return;
          if (this.totalAttackNumbers % 100 !== 0) return;
          skillTargetEnemies.forEach((enemy) => {
            enemy.getDamage(
              Math.round(
                (this.typeNumber === 2 ? 14 : this.typeNumber === 4 ? 20 : 8) *
                  this.attackDamage
              )
            );
          });
          skillTargetEnemies = skillTargetEnemies.filter((enemy) => {
            return !enemy.dead;
          });
          if ([2, 7].includes(this.typeNumber)) {
            const extraStunTime = this.typeNumber === 2 ? 20 : 40;
            skillTargetEnemies.forEach((enemy) => {
              const newDebuff = enemy.debuffArr[enemy.debuffArr.length - 1] as {
                speedDecrease: number;
                area: null;
                endTick: number;
                subjectIndex: number;
              };
              newDebuff.endTick += extraStunTime;
            });
          }
        } else if ([8, 9].includes(this.typeNumber)) {
          if (this.totalAttackNumbers % 10 !== 0) return;
          target.getDamage(
            Math.round(
              (this.typeNumber === 8 ? 3.25 : 3.5) *
                skillCoefficientArr[this.grade] *
                this.attackDamage
            )
          );
          let stunTime = 0;
          if (!target.dead) {
            stunTime =
              (this.typeNumber === 8 ? 15 : 10) *
              skillCoefficientArr[this.grade];
            target.debuffArr.push({
              speedDecrease: 1,
              area: null,
              endTick:
                this.battle.tick +
                (target.index === 60 ? stunTime / 2 : stunTime),
              subjectIndex: this.index,
            });
          }

          if (this.grade < 4) return;
          if (this.typeNumber === 8) {
            if (this.totalAttackNumbers % 20 !== 0) return;
            target.getDamage(16 * this.attackDamage);
          } else if (target.index === 60) {
            if (this.totalAttackNumbers % 10 === 0) {
              target.debuffArr[target.debuffArr.length - 1].endTick! +=
                2 / stunTime;
            }
            target.getDamage(2 * this.attackDamage);
          }
        } else if (this.typeNumber === 10) {
          if (this.totalAttackNumbers % 3 !== 0) return;
          this.battle.goldIncrease += 2 * skillCoefficientArr[this.grade];
          if (
            this.totalAttackNumbers %
              (300 - (this.grade >= 3 ? this.eachUpgrade : 0)) !==
            0
          )
            return;
          this.battle.jadeIncrease += 2 * skillCoefficientArr[this.grade];
        }
      }
    }
    user.scroll -= neededScrolls;
    const battle = new Battle(battleGrade);
    battle.startBattle(arrangement, {
      gradeUpgrade,
      mysteriousCreatureEachUpgrade,
      monarchEachUpgrade,
    });
    const { goldIncrease, jadeIncrease } = battle;
    user.gold += goldIncrease;
    user.jade += jadeIncrease;
    const greeds = battle.animalsArr.filter((animal) => {
      return animal.grade === 5 && animal.typeNumber === 10;
    });
    const greedsTotalAttackNumbers = greeds.reduce((acc, greed) => {
      return acc + greed.totalAttackNumbers;
    }, 0);
    const randomForSpirit = Math.random() * 10000;
    if (randomForSpirit < greedsTotalAttackNumbers) {
      user.spirit += 1;
    }
    user.gold += battleGrade * 3;
    user.exp += battleGrade * 20;
    const tryLevelUp = (
      level: number,
      exp: number
    ): { level: number; exp: number } => {
      if (exp >= 2 ** (Math.ceil(level / 10) - 1) * level * 100) {
        user.spirit++;
        return tryLevelUp(
          level + 1,
          exp - 2 ** (Math.ceil(level / 10) - 1) * level * 100
        );
      } else {
        return { level, exp };
      }
    };
    const LevelExp = tryLevelUp(user.level, user.exp)!;
    user.level = LevelExp.level;
    user.exp = LevelExp.exp;
    const { battleInfo } = user;
    const achivement = await user.getAchivement();
    const battleGradeGroupIndex = Math.floor((battleGrade + 99) / 100);
    const highestBattleGradeGroupIndex = Math.floor(
      (highestBattleGrade + 99) / 100
    );
    if (
      battleGrade < highestBattleGrade &&
      battleGradeGroupIndex === highestBattleGradeGroupIndex &&
      battleGradeGroupIndex > achivement.permanentBattlePerfectWin
    ) {
      const gradeIndex = battleGrade - (1 % 100);
      if (Number(battleInfo[gradeIndex]) < star) {
        user.battleInfo = `${battleInfo.slice(
          0,
          gradeIndex
        )}${star}${battleInfo.slice(gradeIndex + 1)}`;
      }
    } else if (battleGrade === highestBattleGrade) {
      const gradeIndex = battleGrade - (1 % 100);
      const currentStar = Number(battleInfo[gradeIndex]);
      if (currentStar < star) {
        user.jade += star === 2 ? 2 : currentStar === 2 ? 3 : 5;
        user.battleInfo = `${battleInfo.slice(0, -1)}${star}`;
      }
    } else if (battleGrade === highestBattleGrade + 1) {
      user.highestBattleGrade++;
      user.jade += star === 3 ? 6 : star === 2 ? 3 : 1;
      if (battleGradeGroupIndex > highestBattleGradeGroupIndex) {
        user.battleInfo = "3";
      } else {
        user.battleInfo = `${battleInfo}${star}`;
        if (user.battleInfo.length === 100) {
          achivement.permanentBattleWin++;
        }
      }
    }
    if (user.battleInfo === "3".repeat(100)) {
      achivement.permanentBattlePerfectWin++;
      user.battleInfo = "";
    }
    updateDailyWeeklyAchivement(achivement);
    const {
      dailyBattleWinRewardOrNot,
      dailyBattleWinCounter,
      weeklyBattleWinRewardOrNot,
      weeklyBattleWinCounter,
    } = achivement;
    if (!dailyBattleWinRewardOrNot && dailyBattleWinCounter < 3) {
      achivement.dailyBattleWinCounter++;
    }
    if (!weeklyBattleWinRewardOrNot && weeklyBattleWinCounter < 15) {
      achivement.weeklyBattleWinCounter++;
    }
    const transaction = await sequelize.transaction();
    try {
      await user.save({ transaction });
      await achivement.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-battle-winBattle",
        content: `winBattle transaction error`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ answer: "winBattle success" });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-battle-winBattle";
      err.content = "winBattleError";
      err.user = null;
    }
    next(err);
  }
};
const sweep: RequestHandler = async (req, res, next) => {
  try {
    const user = res.locals.user as User;
    const { currentBattleGradeGroupIndex, currentDetailGrade } = req.body;
    if (
      !Number.isInteger(currentBattleGradeGroupIndex) ||
      currentBattleGradeGroupIndex <= 0
    ) {
      const errorObj: errorObj = {
        place: "controllers-battle-sweep",
        content: `invalid currentBattleGradeGroupIndex! currentBattleGradeGroupIndex: ${currentBattleGradeGroupIndex}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    if (!Number.isInteger(currentDetailGrade) || currentDetailGrade <= 0) {
      const errorObj: errorObj = {
        place: "controllers-battle-sweep",
        content: `invalid currentDetailGrade! currentDetailGrade: ${currentDetailGrade}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const currentGrade =
      (currentBattleGradeGroupIndex - 1) * 100 + currentDetailGrade;
    if (currentGrade > user.highestBattleGrade) {
      const errorObj: errorObj = {
        place: "controllers-battle-sweep",
        content: `sweep impossible! currentGrade: ${currentGrade} / highestBattleGrade: ${user.highestBattleGrade}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    const achivement = await user.getAchivement();
    if (
      currentBattleGradeGroupIndex ===
      achivement.permanentBattlePerfectWin + 1
    ) {
      const currentGradeStar = Number(user.battleInfo[currentDetailGrade - 1]);
      if (currentGradeStar < 3) {
        const errorObj: errorObj = {
          place: "controllers-battle-sweep",
          content: `sweep impossible! currentGradeStar: ${currentGradeStar}`,
          user: user.loginId,
        };
        throw new ReqError(errorObj, errorObj.content);
      }
    }
    const neededScrolls = (Math.ceil(currentGrade / 20) + 1) * 5;
    if (user.scroll < neededScrolls) {
      const errorObj: errorObj = {
        place: "controllers-battle-sweep",
        content: `neededScrolls shortage! neededScrolls: ${neededScrolls} / current scroll: ${user.scroll}`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, errorObj.content);
    }
    user.scroll -= neededScrolls;
    user.gold += 3 * currentGrade;
    user.exp += 20 * currentGrade;
    const tryLevelUp = (
      level: number,
      exp: number
    ): { level: number; exp: number } => {
      if (exp >= 2 ** (Math.ceil(level / 10) - 1) * level * 100) {
        user.spirit++;
        return tryLevelUp(
          level + 1,
          exp - 2 ** (Math.ceil(level / 10) - 1) * level * 100
        );
      } else {
        return { level, exp };
      }
    };
    const LevelExp = tryLevelUp(user.level, user.exp)!;
    user.level = LevelExp.level;
    user.exp = LevelExp.exp;
    updateDailyWeeklyAchivement(achivement);
    const {
      dailyBattleWinRewardOrNot,
      dailyBattleWinCounter,
      weeklyBattleWinRewardOrNot,
      weeklyBattleWinCounter,
    } = achivement;
    if (!dailyBattleWinRewardOrNot && dailyBattleWinCounter < 3) {
      achivement.dailyBattleWinCounter++;
    }
    if (!weeklyBattleWinRewardOrNot && weeklyBattleWinCounter < 15) {
      achivement.weeklyBattleWinCounter++;
    }
    const userData = {
      level: user.level,
      exp: user.exp,
      gold: user.gold,
      jade: user.jade,
      scroll: user.scroll,
      spirit: user.spirit,
    };
    const achivementData = {
      dailyBattleWinCounter,
      dailyBattleWinRewardOrNot,
      dailyTargetTime: achivement.dailyTargetTime,
      weeklyBattleWinCounter,
      weeklyBattleWinRewardOrNot,
      weeklyTargetTime: achivement.weeklyTargetTime,
    };
    const transaction = await sequelize.transaction();
    try {
      await user.save({ transaction });
      await achivement.save({ transaction });
      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      const errorObj: errorObj = {
        place: "controllers-battle-sweep",
        content: `sweep transaction error`,
        user: user.loginId,
      };
      throw new ReqError(errorObj, err.message);
    }
    res.json({ userData, achivementData });
  } catch (err: any) {
    if (!err.place) {
      err.place = "controllers-battle-sweep";
      err.content = "sweepError";
      err.user = null;
    }
    next(err);
  }
};

export { startBattle, checkBeforeBattle, giveUpBattle, winBattle, sweep };
