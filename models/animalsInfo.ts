import Sequelize, {
  Model,
  ForeignKey,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

import User from "./user";
class AnimalsInfo extends Model<
  InferAttributes<AnimalsInfo>,
  InferCreationAttributes<AnimalsInfo>
> {
  declare id: CreationOptional<number>;
  declare babies: CreationOptional<string>; // 32/41/10/... (새끼 쥐:32, 송아지:41, 새끼호랑이:10, ...)
  declare smalls: CreationOptional<string>;
  declare beasts: CreationOptional<string>;
  declare mysteriousCreatures: CreationOptional<string>;
  declare monarchs: CreationOptional<string>;
  declare gradeUpgrade: CreationOptional<string>; // 12/20/10/... (새끼 육성: 12, 미물 육성: 20, 야수 육성: 10, ...)
  declare mysteriousCreatureEachUpgrade: CreationOptional<string>; // 1/3/0/... (꾼 육성: 1, 불사 육성: 3, 대호: 0, ...)
  declare monarchEachUpgrade: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
  declare UserId: ForeignKey<User["id"]>;
  static initiate(sequelize: Sequelize.Sequelize) {
    AnimalsInfo.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        babies: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
        },
        smalls: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
        },
        beasts: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
        },
        mysteriousCreatures: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
        },
        monarchs: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
        },
        gradeUpgrade: {
          type: Sequelize.STRING(30),
          allowNull: false,
          defaultValue: "0/0/0/0/0",
        },
        mysteriousCreatureEachUpgrade: {
          type: Sequelize.STRING(50),
          allowNull: false,
          defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
        },
        monarchEachUpgrade: {
          type: Sequelize.STRING(50),
          allowNull: false,
          defaultValue: "0/0/0/0/0/0/0/0/0/0/0",
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "AnimalsInfo",
        tableName: "animalsInfos",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate() {
    AnimalsInfo.belongsTo(User);
  }
}
export default AnimalsInfo;
