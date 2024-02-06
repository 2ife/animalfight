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
const animalsInfo_1 = __importDefault(require("./animalsInfo"));
const achivement_1 = __importDefault(require("./achivement"));
const pass_1 = __importDefault(require("./pass"));
const mail_1 = __importDefault(require("./mail"));
class User extends sequelize_1.Model {
    static initiate(sequelize) {
        User.init({
            id: {
                type: sequelize_1.default.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nick: {
                type: sequelize_1.default.STRING(20),
                allowNull: false,
            },
            loginId: {
                type: sequelize_1.default.STRING(20),
                allowNull: false,
            },
            password: {
                type: sequelize_1.default.STRING(100),
                allowNull: false,
            },
            loginCode: {
                type: sequelize_1.default.STRING(100),
                allowNull: true,
            },
            profileAnimal: {
                type: sequelize_1.default.STRING(30),
                allowNull: true,
                defaultValue: "babyRat",
            },
            level: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 1,
            },
            exp: {
                type: sequelize_1.default.BIGINT.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            gold: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            jade: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            scroll: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 40,
            },
            spirit: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 36,
            },
            fewScrollPurchaseTime: {
                type: sequelize_1.default.BIGINT,
                allowNull: false,
                defaultValue: 0,
            },
            manyScrollPurchaseTime: {
                type: sequelize_1.default.BIGINT,
                allowNull: false,
                defaultValue: 0,
            },
            fewSpiritPurchaseTime: {
                type: sequelize_1.default.BIGINT,
                allowNull: false,
                defaultValue: 0,
            },
            manySpiritPurchaseTime: {
                type: sequelize_1.default.BIGINT,
                allowNull: false,
                defaultValue: 0,
            },
            cashCode: {
                type: sequelize_1.default.STRING(100),
                allowNull: true,
            },
            chargeCash: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            chargeTime: {
                type: sequelize_1.default.BIGINT,
                allowNull: true,
            },
            lockMemo: {
                type: sequelize_1.default.STRING(100),
                allowNull: true,
            },
            arrangement: {
                type: sequelize_1.default.STRING(400),
                allowNull: false,
                defaultValue: "0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0",
            },
            highestBattleGrade: {
                type: sequelize_1.default.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
            battleInfo: {
                type: sequelize_1.default.STRING(400),
                allowNull: false,
                defaultValue: "",
            },
            currentBattleOrNot: {
                type: sequelize_1.default.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            createdAt: sequelize_1.default.DATE,
            updatedAt: sequelize_1.default.DATE,
            deletedAt: sequelize_1.default.DATE,
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "User",
            tableName: "users",
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate() {
        User.hasOne(animalsInfo_1.default);
        User.hasOne(achivement_1.default);
        User.hasMany(pass_1.default);
        User.hasMany(mail_1.default);
    }
}
exports.default = User;
