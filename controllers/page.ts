import { User, sequelize } from "../models";
import { RequestHandler } from "express";
import { ReqError } from "./common";
const renderBasicPage: RequestHandler = (req, res, next) => {
  res.render("basic");
};
const renderLogin: RequestHandler = (req, res, next) => {
  res.render("login");
};
const renderHome: RequestHandler = (req, res, next) => {
  res.render("home");
};
const renderBattle: RequestHandler = (req, res, next) => {
  res.render("battle");
};
const renderTutorial: RequestHandler = (req, res, next) => {
  res.render("tutorial");
};
const renderAdminLogin: RequestHandler = (req, res, next) => {
  res.render("adminLogin");
};
const renderAdminHome: RequestHandler = (req, res, next) => {
  res.render("admin");
};
export {
  renderBasicPage,
  renderLogin,
  renderHome,
  renderBattle,
  renderTutorial,
  renderAdminLogin,
  renderAdminHome,
};
