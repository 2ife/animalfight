"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = exports.Pass = exports.Mail = exports.Achivement = exports.AnimalsInfo = exports.User = exports.sequelize = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const config_1 = __importDefault(require("../config/config"));
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const animalsInfo_1 = __importDefault(require("./animalsInfo"));
exports.AnimalsInfo = animalsInfo_1.default;
const achivement_1 = __importDefault(require("./achivement"));
exports.Achivement = achivement_1.default;
const mail_1 = __importDefault(require("./mail"));
exports.Mail = mail_1.default;
const pass_1 = __importDefault(require("./pass"));
exports.Pass = pass_1.default;
const error_1 = __importDefault(require("./error"));
exports.Error = error_1.default;
const env = process.env.NODE_ENV || "development";
const config = config_1.default[env];
exports.sequelize = new sequelize_1.default.Sequelize(config.database, config.username, config.password, config);
user_1.default.initiate(exports.sequelize);
animalsInfo_1.default.initiate(exports.sequelize);
achivement_1.default.initiate(exports.sequelize);
mail_1.default.initiate(exports.sequelize);
pass_1.default.initiate(exports.sequelize);
error_1.default.initiate(exports.sequelize);
user_1.default.associate();
animalsInfo_1.default.associate();
achivement_1.default.associate();
mail_1.default.associate();
pass_1.default.associate();
error_1.default.associate();