import Sequelize, {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey
} from "sequelize";

import User from "./user";
class Mail extends Model<InferAttributes<Mail>, InferCreationAttributes<Mail>> {
  declare id: CreationOptional<number>;
  declare content: string;
  declare expire: number;
  declare giftInfo: CreationOptional<string>; // gold/jade/scroll/spirit
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
  declare UserId: ForeignKey<User["id"]>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Mail.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        content: { type: Sequelize.STRING(400), allowNull: false },
        expire: { type: Sequelize.BIGINT, allowNull: false },
        giftInfo: {
          type: Sequelize.STRING(100),
          allowNull: false,
          defaultValue: "0/0/0/0",
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
        deletedAt: Sequelize.DATE,
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Mail",
        tableName: "mails",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate() {
    Mail.belongsTo(User);
  }
}
export default Mail;
