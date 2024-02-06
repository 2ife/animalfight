"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importStar(require("sequelize"));
const user_1 = __importDefault(require("./user"));
const currentDate = new Date();
const UTCYear = currentDate.getUTCFullYear();
const UTCMonth = currentDate.getUTCMonth();
const UTCDate = currentDate.getUTCDate();
const todayStartTime = Date.UTC(UTCYear, UTCMonth, UTCDate, 0, 0, 0, 0);
const currentUTCDay = currentDate.getUTCDay();
class Achivement extends sequelize_1.Model {
    static initiate(sequelize) {
        Achivement.init({
            id: {
                type: sequelize_1.default.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            dailyBattleWinCounter: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            dailyBattleWinRewardOrNot: {
                type: sequelize_1.default.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            dailyAnimalSummonCounter: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            dailyAnimalSummonRewardOrNot: {
                type: sequelize_1.default.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            dailyTargetTime: {
                type: sequelize_1.default.BIGINT,
                allowNull: false,
                defaultValue: todayStartTime,
            },
            weeklyBattleWinCounter: {
                type: sequelize_1.default.BIGINT,
                allowNull: false,
                defaultValue: 0,
            },
            weeklyBattleWinRewardOrNot: {
                type: sequelize_1.default.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            weeklyAnimalSummonCounter: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            weeklyAnimalSummonRewardOrNot: {
                type: sequelize_1.default.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            weeklyTargetTime: {
                type: sequelize_1.default.BIGINT,
                allowNull: false,
                defaultValue: todayStartTime - currentUTCDay * 86400000,
            },
            gradeUpgradeRewardOrNot: {
                type: sequelize_1.default.STRING(20),
                allowNull: false,
                defaultValue: "0/0/0/0/0",
            },
            mysteriousCreatureEachUpgradeRewardOrNot: {
                type: sequelize_1.default.STRING(40),
                allowNull: false,
                defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
            },
            monarchEachUpgradeRewardOrNot: {
                type: sequelize_1.default.STRING(40),
                allowNull: false,
                defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
            },
            allBabiesGetOrNot: {
                type: sequelize_1.default.STRING(30),
                allowNull: false,
                defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
            },
            allSmallsGetOrNot: {
                type: sequelize_1.default.STRING(30),
                allowNull: false,
                defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
            },
            allBeastsGetOrNot: {
                type: sequelize_1.default.STRING(30),
                allowNull: false,
                defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
            },
            allMysteriousCreaturesGetOrNot: {
                type: sequelize_1.default.STRING(30),
                allowNull: false,
                defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
            },
            allMonarchsGetOrNot: {
                type: sequelize_1.default.STRING(30),
                allowNull: false,
                defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
            },
            allAnimalsRewardOrNot: {
                type: sequelize_1.default.STRING(20),
                allowNull: false,
                defaultValue: "0/0/0/0/0",
            },
            permanentBattleWin: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            permanentBattleWinReward: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            permanentBattlePerfectWin: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            permanentBattlePerfectWinReward: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            createdAt: sequelize_1.default.DATE,
            updatedAt: sequelize_1.default.DATE,
            deletedAt: sequelize_1.default.DATE,
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "Achivement",
            tableName: "achivements",
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate() {
        Achivement.belongsTo(user_1.default);
    }
}
exports.default = Achivement;
