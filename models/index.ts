import Sequelize from "sequelize";
import configObj from "../config/config";
import User from "./user";
import AnimalsInfo from "./animalsInfo";
import Achivement from "./achivement";
import Mail from "./mail";
import Pass from "./pass";
import Error from "./error";

const env = (process.env.NODE_ENV as "production" | "test") || "development";
const config = configObj[env];

export const sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

User.initiate(sequelize);
AnimalsInfo.initiate(sequelize);
Achivement.initiate(sequelize);
Mail.initiate(sequelize);
Pass.initiate(sequelize);
Error.initiate(sequelize);

User.associate();
AnimalsInfo.associate();
Achivement.associate();
Mail.associate();
Pass.associate();
Error.associate();

export { User, AnimalsInfo, Achivement, Mail, Pass,Error };
