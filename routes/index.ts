import express from "express";
import {
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  permitWhenBattle,
  isNotLoggedIn,
  isAdminLoggedIn,
} from "../middlewares";
import {
  renderBasicPage,
  renderLogin,
  renderHome,
  renderBattle,
  renderTutorial,
  renderAdminLogin,
  renderAdminHome,
} from "../controllers/page";
import {
  checkLoginCode,
  login,
  join,
  checkNick,
  checkId,
  changeNick,
  changePassword,
} from "../controllers/auth";
import {
  receiveAchivementReward,
  receivePassReward,
  getRankInfo,
  changeProfileImg,
} from "../controllers/user";
import {
  saveArrangement,
  summonAnimal,
  combineAnimal,
  upgradeAnimal,
} from "../controllers/animal";
import { getMailInfo, checkAndReceiveMail } from "../controllers/mail";
import { purchasePass, purchaseGoods, chargeJade,collectJade } from "../controllers/shop";
import {
  startBattle,
  checkBeforeBattle,
  giveUpBattle,
  winBattle,
  sweep,
} from "../controllers/battle";
import {
  adminLogin,
  checkAdminLoginCode,
  searchUser,
  searchError,
  deleteError,
  deleteCashCode,
  changeNickInAdmin,
  changePasswordInAdmin,
  lockUser,
  unlockUser,
  deleteUser,
  sendMail,
} from "../controllers/admin";
const router = express.Router();

/* pageRouter */
router.get("/", apiLimiter, renderBasicPage);
router.get("/login", apiLimiter, renderLogin);
router.get("/home", apiLimiter, renderHome);
router.get("/battle/:grade", apiLimiter, renderBattle);
router.get("/tutorial", apiLimiter, renderTutorial);
router.get("/admin/login", apiLimiter, renderAdminLogin);
router.get("/admin/home", apiLimiter, renderAdminHome);

/* authRouter */
router.post("/auth/checkLoginCode", apiLimiter, checkLoginCode);
router.post("/auth/login", apiLimiter, isNotLoggedIn, login);
router.post("/auth/join", apiLimiter, isNotLoggedIn, join);
router.post("/auth/checkNick", apiLimiter, isNotLoggedIn, checkNick);
router.post("/auth/checkId", apiLimiter, isNotLoggedIn, checkId);
router.post(
  "/auth/changeNick",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  changeNick
);
router.post(
  "/auth/changePassword",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  changePassword
);

/* userRouter */
router.post(
  "/user/receiveAchivementReward",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  receiveAchivementReward
);
router.post(
  "/user/receivePassReward",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  receivePassReward
);
router.post(
  "/user/getRankInfo",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  getRankInfo
);
router.post(
  "/user/changeProfileImg",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  changeProfileImg
);

/* animalRouter */
router.post(
  "/animal/saveArrangement",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  saveArrangement
);
router.post(
  "/animal/summonAnimal",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  summonAnimal
);
router.post(
  "/animal/combineAnimal",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  combineAnimal
);
router.post(
  "/animal/upgradeAnimal",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  upgradeAnimal
);

/* mailRouter */
router.post(
  "/mail/getMailInfo",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  getMailInfo
);
router.post(
  "/mail/checkAndReceiveMail",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  checkAndReceiveMail
);

/* shopRouter */
router.post(
  "/shop/purchasePass",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  purchasePass
);
router.post(
  "/shop/purchaseGoods",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  purchaseGoods
);
router.post(
  "/shop/chargeJade",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  chargeJade
);
router.post(
  "/shop/collectJade",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  collectJade
);

/* battleRouter */
router.post(
  "/battle/startBattle",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  startBattle
);
router.post(
  "/battle/checkBeforeBattle",
  apiLimiter,
  isLoggedIn,
  blockWhenBattle,
  checkBeforeBattle
);
router.post(
  "/battle/giveUpBattle",
  apiLimiter,
  isLoggedIn,
  permitWhenBattle,
  giveUpBattle
);
router.post(
  "/battle/winBattle",
  apiLimiter,
  isLoggedIn,
  permitWhenBattle,
  winBattle
);
router.post("/battle/sweep", apiLimiter, isLoggedIn, blockWhenBattle, sweep);

/* adminRouter */
router.post("/admin/login", apiLimiter, isNotLoggedIn, adminLogin);
router.post("/admin/checkLoginCode", apiLimiter, checkAdminLoginCode);
router.post(
  "/admin/searchUser",
  apiLimiter,
  isAdminLoggedIn,
  blockWhenBattle,
  searchUser
);
router.post(
  "/admin/searchError",
  apiLimiter,
  isAdminLoggedIn,
  blockWhenBattle,
  searchError
);
router.post(
  "/admin/deleteError",
  apiLimiter,
  isAdminLoggedIn,
  blockWhenBattle,
  deleteError
);
router.post(
  "/admin/deleteCashCode",
  apiLimiter,
  isAdminLoggedIn,
  blockWhenBattle,
  deleteCashCode
);
router.post(
  "/admin/changeNick",
  apiLimiter,
  isAdminLoggedIn,
  blockWhenBattle,
  changeNickInAdmin
);
router.post(
  "/admin/changePassword",
  apiLimiter,
  isAdminLoggedIn,
  blockWhenBattle,
  changePasswordInAdmin
);
router.post(
  "/admin/lockUser",
  apiLimiter,
  isAdminLoggedIn,
  blockWhenBattle,
  lockUser
);
router.post(
  "/admin/unlockUser",
  apiLimiter,
  isAdminLoggedIn,
  blockWhenBattle,
  unlockUser
);
router.post(
  "/admin/deleteUser",
  apiLimiter,
  isAdminLoggedIn,
  blockWhenBattle,
  deleteUser
);
router.post(
  "/admin/sendMail",
  apiLimiter,
  isAdminLoggedIn,
  blockWhenBattle,
  sendMail
);
export default router;
