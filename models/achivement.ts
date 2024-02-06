import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";

import User from "./user";

const currentDate = new Date();
const UTCYear = currentDate.getUTCFullYear();
const UTCMonth = currentDate.getUTCMonth();
const UTCDate = currentDate.getUTCDate();
const todayStartTime = Date.UTC(UTCYear, UTCMonth, UTCDate, 0, 0, 0, 0);
const currentUTCDay = currentDate.getUTCDay();

class Achivement extends Model<
  InferAttributes<Achivement>,
  InferCreationAttributes<Achivement>
> {
  declare id: CreationOptional<number>;
  // daily
  declare dailyBattleWinCounter: CreationOptional<number>;
  declare dailyBattleWinRewardOrNot: CreationOptional<boolean>;
  declare dailyAnimalSummonCounter: CreationOptional<number>;
  declare dailyAnimalSummonRewardOrNot: CreationOptional<boolean>;
  declare dailyTargetTime: CreationOptional<number>;
  // weekly
  declare weeklyBattleWinCounter: CreationOptional<number>;
  declare weeklyBattleWinRewardOrNot: CreationOptional<boolean>;
  declare weeklyAnimalSummonCounter: CreationOptional<number>;
  declare weeklyAnimalSummonRewardOrNot: CreationOptional<boolean>;
  declare weeklyTargetTime: CreationOptional<number>;
  // permanent
  declare gradeUpgradeRewardOrNot: CreationOptional<string>; // 1/1/1/1/0
  declare mysteriousCreatureEachUpgradeRewardOrNot: CreationOptional<string>; // 1/1/0/...
  declare monarchEachUpgradeRewardOrNot: CreationOptional<string>;
  declare allBabiesGetOrNot: CreationOptional<string>; // 0/0/1/1/... =? 1/1/1/1/1/1/.. -getReward-> 11111111112
  declare allSmallsGetOrNot: CreationOptional<string>;
  declare allBeastsGetOrNot: CreationOptional<string>;
  declare allMysteriousCreaturesGetOrNot: CreationOptional<string>;
  declare allMonarchsGetOrNot: CreationOptional<string>;
  declare allAnimalsRewardOrNot: CreationOptional<string>; // 1/1/0/0/0
  declare permanentBattleWin: CreationOptional<number>; // 0, 1, 2 (100단위)
  declare permanentBattleWinReward: CreationOptional<number>; // 0, 1, 2 (100단위)
  declare permanentBattlePerfectWin: CreationOptional<number>;
  declare permanentBattlePerfectWinReward: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
  declare UserId: ForeignKey<User["id"]>;
  static initiate(sequelize: Sequelize.Sequelize) {
    Achivement.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        dailyBattleWinCounter: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        dailyBattleWinRewardOrNot: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        dailyAnimalSummonCounter: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        dailyAnimalSummonRewardOrNot: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        dailyTargetTime: {
          type: Sequelize.BIGINT,
          allowNull: false,
          defaultValue: todayStartTime,
        },
        weeklyBattleWinCounter: {
          type: Sequelize.BIGINT,
          allowNull: false,
          defaultValue: 0,
        },
        weeklyBattleWinRewardOrNot: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        weeklyAnimalSummonCounter: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        weeklyAnimalSummonRewardOrNot: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        weeklyTargetTime: {
          type: Sequelize.BIGINT,
          allowNull: false,
          defaultValue: todayStartTime - currentUTCDay * 86400000,
        },
        gradeUpgradeRewardOrNot: {
          type: Sequelize.STRING(20),
          allowNull: false,
          defaultValue: "0/0/0/0/0",
        },
        mysteriousCreatureEachUpgradeRewardOrNot: {
          type: Sequelize.STRING(40),
          allowNull: false,
          defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
        },
        monarchEachUpgradeRewardOrNot: {
          type: Sequelize.STRING(40),
          allowNull: false,
          defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
        },
        allBabiesGetOrNot: {
          type: Sequelize.STRING(30),
          allowNull: false,
          defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
        },
        allSmallsGetOrNot: {
          type: Sequelize.STRING(30),
          allowNull: false,
          defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
        },
        allBeastsGetOrNot: {
          type: Sequelize.STRING(30),
          allowNull: false,
          defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
        },
        allMysteriousCreaturesGetOrNot: {
          type: Sequelize.STRING(30),
          allowNull: false,
          defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
        },
        allMonarchsGetOrNot: {
          type: Sequelize.STRING(30),
          allowNull: false,
          defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
        },
        allAnimalsRewardOrNot: {
          type: Sequelize.STRING(20),
          allowNull: false,
          defaultValue: "0/0/0/0/0",
        },
        permanentBattleWin: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        permanentBattleWinReward: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        permanentBattlePerfectWin: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        permanentBattlePerfectWinReward: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Achivement",
        tableName: "achivements",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate() {
    Achivement.belongsTo(User);
  }
}
export default Achivement;
