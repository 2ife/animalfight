import express, { ErrorRequestHandler } from "express";
import morgan from "morgan";
import path from "path";
import nunjucks from "nunjucks";
import dotenv from "dotenv";

import router from "./routes";
import { sequelize, User, Error as MyError } from "./models";
import { errorObj, ReqError } from "./controllers/common";
import { logger } from "./logger";
import helmet from "helmet";
import hpp from "hpp";

dotenv.config();
const app = express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err: any) => {
    console.error(err);
  });

if (process.env.NODE_ENV === "production") {
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
  app.use(hpp());
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}
app.use(express.static(path.join(__dirname, "public"), { maxAge: 2592000000 }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

const firstErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  try {
    const { place, content, user } = err;
    logger.error(err.message);
    const userFiltered = user === undefined ? null : user;
    await MyError.create({
      place,
      content,
      user: userFiltered,
    });
    if (user) {
      const targetUser = await User.findOne({ where: { loginId: user } });
      if (!targetUser) {
        await MyError.create({
          place: "app-firstErrorHandler",
          content: `no user! loginId: ${user}`,
          user,
        });
        return res.json({ answer: "error" });
      }
      targetUser.loginCode = null;
      await targetUser.save();
    }
    res.json({ answer: "error" });
  } catch (err: any) {
    logger.error(err.message);
    res.json({ answer: "error" });
  }
};

const lastErrorHandler: ErrorRequestHandler = async (err, req, res, next) => {
  try {
    const { place, content } = err;
    logger.error(err.message);
    await MyError.create({
      place,
      content,
      user: null,
    });
    res.json({ answer: "error" });
  } catch (err: any) {
    logger.error(err.message);
    res.json({ answer: "error" });
  }
};

app.use(firstErrorHandler);
app.use((req, res, next) => {
  const errorObj: errorObj = {
    place: "app-noRouterPart",
    content: `no router: ${req.method} ${req.url}`,
  };
  const error = new ReqError(errorObj, errorObj.content);
  next(error);
});
app.use(lastErrorHandler);

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
