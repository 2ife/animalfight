import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  HasOneCreateAssociationMixin,
  HasManyCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasManyGetAssociationsMixin,
} from "sequelize";
import AnimalsInfo from "./animalsInfo";
import Achivement from "./achivement";
import Pass from "./pass";
import Mail from "./mail";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare nick: string;
  declare loginId: string;
  declare password: string;
  declare loginCode: string | null;
  declare profileAnimal: CreationOptional<string>;
  declare level: CreationOptional<number>;
  declare exp: CreationOptional<number>;
  declare gold: CreationOptional<number>;
  declare jade: CreationOptional<number>;
  declare scroll: CreationOptional<number>;
  declare spirit: CreationOptional<number>;
  declare fewScrollPurchaseTime: CreationOptional<number>;
  declare manyScrollPurchaseTime: CreationOptional<number>;
  declare fewSpiritPurchaseTime: CreationOptional<number>;
  declare manySpiritPurchaseTime: CreationOptional<number>;
  declare cashCode: string | null;
  declare chargeCash: CreationOptional<number>;
  declare chargeTime: number | null;
  declare lockMemo: string | null;
  declare arrangement: CreationOptional<string>; // long string -> animalGrade_animalType/.... (10의 자리, 1의 자리 순서대로 1,2,4,5,7,8)
  declare highestBattleGrade: CreationOptional<number>;
  declare battleInfo: CreationOptional<string>; // long string -> 3213332212311(highestBattleGrade 모두 3성)
  declare currentBattleOrNot: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;

  declare createAnimalsInfo: HasOneCreateAssociationMixin<AnimalsInfo>;
  declare createAchivement: HasOneCreateAssociationMixin<Achivement>;
  declare createPass: HasManyCreateAssociationMixin<Pass>;

  declare getAnimalsInfo: HasOneGetAssociationMixin<AnimalsInfo>;
  declare getAchivement: HasOneGetAssociationMixin<Achivement>;
  declare getPasses: HasManyGetAssociationsMixin<Pass>;
  declare getMails: HasManyGetAssociationsMixin<Mail>;

  static initiate(sequelize: Sequelize.Sequelize) {
    User.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nick: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        loginId: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        loginCode: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        profileAnimal: {
          type: Sequelize.STRING(30),
          allowNull: true,
          defaultValue: "babyRat",
        },
        level: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 1,
        },
        exp: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        gold: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        jade: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        scroll: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 40,
        },
        spirit: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 36,
        },
        fewScrollPurchaseTime: {
          type: Sequelize.BIGINT,
          allowNull: false,
          defaultValue: 0,
        },
        manyScrollPurchaseTime: {
          type: Sequelize.BIGINT,
          allowNull: false,
          defaultValue: 0,
        },
        fewSpiritPurchaseTime: {
          type: Sequelize.BIGINT,
          allowNull: false,
          defaultValue: 0,
        },
        manySpiritPurchaseTime: {
          type: Sequelize.BIGINT,
          allowNull: false,
          defaultValue: 0,
        },
        cashCode: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        chargeCash: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        chargeTime: {
          type: Sequelize.BIGINT,
          allowNull: true,
        },
        lockMemo: {
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        arrangement: {
          type: Sequelize.STRING(400),
          allowNull: false,
          defaultValue:
            "0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0",
        },
        highestBattleGrade: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          defaultValue: 0,
        },
        battleInfo: {
          type: Sequelize.STRING(400),
          allowNull: false,
          defaultValue: "",
        },
        currentBattleOrNot: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate() {
    User.hasOne(AnimalsInfo);
    User.hasOne(Achivement);
    User.hasMany(Pass);
    User.hasMany(Mail);
  }
}
export default User;
