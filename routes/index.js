"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const page_1 = require("../controllers/page");
const auth_1 = require("../controllers/auth");
const user_1 = require("../controllers/user");
const animal_1 = require("../controllers/animal");
const mail_1 = require("../controllers/mail");
const shop_1 = require("../controllers/shop");
const battle_1 = require("../controllers/battle");
const admin_1 = require("../controllers/admin");
const router = express_1.default.Router();
/* pageRouter */
router.get("/", middlewares_1.apiLimiter, page_1.renderBasicPage);
router.get("/login", middlewares_1.apiLimiter, page_1.renderLogin);
router.get("/home", middlewares_1.apiLimiter, page_1.renderHome);
router.get("/battle/:grade", middlewares_1.apiLimiter, page_1.renderBattle);
router.get("/tutorial", middlewares_1.apiLimiter, page_1.renderTutorial);
router.get("/admin/login", middlewares_1.apiLimiter, page_1.renderAdminLogin);
router.get("/admin/home", middlewares_1.apiLimiter, page_1.renderAdminHome);
/* authRouter */
router.post("/auth/checkLoginCode", middlewares_1.apiLimiter, auth_1.checkLoginCode);
router.post("/auth/login", middlewares_1.apiLimiter, middlewares_1.isNotLoggedIn, auth_1.login);
router.post("/auth/join", middlewares_1.apiLimiter, middlewares_1.isNotLoggedIn, auth_1.join);
router.post("/auth/checkNick", middlewares_1.apiLimiter, middlewares_1.isNotLoggedIn, auth_1.checkNick);
router.post("/auth/checkId", middlewares_1.apiLimiter, middlewares_1.isNotLoggedIn, auth_1.checkId);
router.post("/auth/changeNick", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, auth_1.changeNick);
router.post("/auth/changePassword", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, auth_1.changePassword);
/* userRouter */
router.post("/user/receiveAchivementReward", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, user_1.receiveAchivementReward);
router.post("/user/receivePassReward", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, user_1.receivePassReward);
router.post("/user/getRankInfo", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, user_1.getRankInfo);
router.post("/user/changeProfileImg", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, user_1.changeProfileImg);
/* animalRouter */
router.post("/animal/saveArrangement", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, animal_1.saveArrangement);
router.post("/animal/summonAnimal", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, animal_1.summonAnimal);
router.post("/animal/combineAnimal", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, animal_1.combineAnimal);
router.post("/animal/upgradeAnimal", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, animal_1.upgradeAnimal);
/* mailRouter */
router.post("/mail/getMailInfo", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, mail_1.getMailInfo);
router.post("/mail/checkAndReceiveMail", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, mail_1.checkAndReceiveMail);
/* shopRouter */
router.post("/shop/purchasePass", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, shop_1.purchasePass);
router.post("/shop/purchaseGoods", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, shop_1.purchaseGoods);
router.post("/shop/chargeJade", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, shop_1.chargeJade);
/* battleRouter */
router.post("/battle/startBattle", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, battle_1.startBattle);
router.post("/battle/checkBeforeBattle", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, battle_1.checkBeforeBattle);
router.post("/battle/giveUpBattle", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.permitWhenBattle, battle_1.giveUpBattle);
router.post("/battle/winBattle", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.permitWhenBattle, battle_1.winBattle);
router.post("/battle/sweep", middlewares_1.apiLimiter, middlewares_1.isLoggedIn, middlewares_1.blockWhenBattle, battle_1.sweep);
/* adminRouter */
router.post("/admin/login", middlewares_1.apiLimiter, middlewares_1.isNotLoggedIn, admin_1.adminLogin);
router.post("/admin/checkLoginCode", middlewares_1.apiLimiter, admin_1.checkAdminLoginCode);
router.post("/admin/searchUser", middlewares_1.apiLimiter, middlewares_1.isAdminLoggedIn, middlewares_1.blockWhenBattle, admin_1.searchUser);
router.post("/admin/searchError", middlewares_1.apiLimiter, middlewares_1.isAdminLoggedIn, middlewares_1.blockWhenBattle, admin_1.searchError);
router.post("/admin/deleteError", middlewares_1.apiLimiter, middlewares_1.isAdminLoggedIn, middlewares_1.blockWhenBattle, admin_1.deleteError);
router.post("/admin/deleteCashCode", middlewares_1.apiLimiter, middlewares_1.isAdminLoggedIn, middlewares_1.blockWhenBattle, admin_1.deleteCashCode);
router.post("/admin/changeNick", middlewares_1.apiLimiter, middlewares_1.isAdminLoggedIn, middlewares_1.blockWhenBattle, admin_1.changeNickInAdmin);
router.post("/admin/changePassword", middlewares_1.apiLimiter, middlewares_1.isAdminLoggedIn, middlewares_1.blockWhenBattle, admin_1.changePasswordInAdmin);
router.post("/admin/lockUser", middlewares_1.apiLimiter, middlewares_1.isAdminLoggedIn, middlewares_1.blockWhenBattle, admin_1.lockUser);
router.post("/admin/unlockUser", middlewares_1.apiLimiter, middlewares_1.isAdminLoggedIn, middlewares_1.blockWhenBattle, admin_1.unlockUser);
router.post("/admin/deleteUser", middlewares_1.apiLimiter, middlewares_1.isAdminLoggedIn, middlewares_1.blockWhenBattle, admin_1.deleteUser);
router.post("/admin/sendMail", middlewares_1.apiLimiter, middlewares_1.isAdminLoggedIn, middlewares_1.blockWhenBattle, admin_1.sendMail);
exports.default = router;
