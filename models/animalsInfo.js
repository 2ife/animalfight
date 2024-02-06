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
class AnimalsInfo extends sequelize_1.Model {
    static initiate(sequelize) {
        AnimalsInfo.init({
            id: {
                type: sequelize_1.default.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            babies: {
                type: sequelize_1.default.STRING(100),
                allowNull: false,
                defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
            },
            smalls: {
                type: sequelize_1.default.STRING(100),
                allowNull: false,
                defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
            },
            beasts: {
                type: sequelize_1.default.STRING(100),
                allowNull: false,
                defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
            },
            mysteriousCreatures: {
                type: sequelize_1.default.STRING(100),
                allowNull: false,
                defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
            },
            monarchs: {
                type: sequelize_1.default.STRING(100),
                allowNull: false,
                defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
            },
            gradeUpgrade: {
                type: sequelize_1.default.STRING(30),
                allowNull: false,
                defaultValue: "0/0/0/0/0",
            },
            mysteriousCreatureEachUpgrade: {
                type: sequelize_1.default.STRING(50),
                allowNull: false,
                defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
            },
            monarchEachUpgrade: {
                type: sequelize_1.default.STRING(50),
                allowNull: false,
                defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
            },
            createdAt: sequelize_1.default.DATE,
            updatedAt: sequelize_1.default.DATE,
            deletedAt: sequelize_1.default.DATE,
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "AnimalsInfo",
            tableName: "animalsInfos",
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        });
    }
    static associate() {
        AnimalsInfo.belongsTo(user_1.default);
    }
}
exports.default = AnimalsInfo;
