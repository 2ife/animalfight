import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey
} from "sequelize";

import User from "./user";

const currentDate = new Date();
const UTCYear = currentDate.getUTCFullYear();
const UTCMonth = currentDate.getUTCMonth();
const UTCDate = currentDate.getUTCDate();
const todayStartTime = Date.UTC(UTCYear, UTCMonth, UTCDate, 0, 0, 0, 0);

class Pass extends Model<InferAttributes<Pass>, InferCreationAttributes<Pass>> {
  declare id: CreationOptional<number>;
  declare type: CreationOptional<
    "basic" | "beast" | "mysteriousCreature" | "monarch"
  >;
  declare endTime: number | null; // new Date(new Date().toLocaleDateString()).getTime() + 86400000 * 30
  declare lastSpiritRewardTime: CreationOptional<number>; // lastRewardTime < new Date(new Date().toLocaleDateString()).getTime() (>=?already reward) / first value=0
  declare lastScrollRewardTime: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
  declare UserId: ForeignKey<User["id"]>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Pass.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        type: {
          type: Sequelize.STRING(20),
          allowNull: false,
          defaultValue: "basic",
        },
        endTime: { type: Sequelize.BIGINT, allowNull: true },
        lastSpiritRewardTime: {
          type: Sequelize.BIGINT,
          allowNull: false,
          defaultValue: todayStartTime - 100000,
        },
        lastScrollRewardTime: {
          type: Sequelize.BIGINT,
          allowNull: false,
          defaultValue: todayStartTime - 100000,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Pass",
        tableName: "passes",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate() {
    Pass.belongsTo(User);
  }
}
export default Pass;
