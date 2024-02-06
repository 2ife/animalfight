"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderAdminHome = exports.renderAdminLogin = exports.renderTutorial = exports.renderBattle = exports.renderHome = exports.renderLogin = exports.renderBasicPage = void 0;
const renderBasicPage = (req, res, next) => {
    res.render("basic");
};
exports.renderBasicPage = renderBasicPage;
const renderLogin = (req, res, next) => {
    res.render("login");
};
exports.renderLogin = renderLogin;
const renderHome = (req, res, next) => {
    res.render("home");
};
exports.renderHome = renderHome;
const renderBattle = (req, res, next) => {
    res.render("battle");
};
exports.renderBattle = renderBattle;
const renderTutorial = (req, res, next) => {
    res.render("tutorial");
};
exports.renderTutorial = renderTutorial;
const renderAdminLogin = (req, res, next) => {
    res.render("adminLogin");
};
exports.renderAdminLogin = renderAdminLogin;
const renderAdminHome = (req, res, next) => {
    res.render("admin");
};
exports.renderAdminHome = renderAdminHome;
