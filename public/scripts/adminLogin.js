"use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const axios = __importDefault(require("axios"));
const loginIdContainer = document.querySelector("#login_id");
const loginPasswordContainer = document.querySelector("#login_password");
const loginBtn = document.querySelector("#loginBtn");
const alertModal = document.querySelector(".alertModal");
const OutOfAlertModal = document.querySelector(".OutOfAlertModal");
const loadingShower = document.querySelector(".loadingShower");
const outOfLoadingShower = document.querySelector(".outOfLoadingShower");
let loadInterval = null;
let reload = false;
const testLoginInfo = (category, text) => {
    let tester = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
    switch (category) {
        case "id": {
            tester = /^(?=.*[a-z0-9])[a-z0-9]{6,16}$/;
            break;
        }
        case "password": {
            tester = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
            break;
        }
    }
    return tester.test(text);
};
const alertByModal = (msg) => {
    alertModal.innerText = msg;
    alertModal.style.display = "flex";
    OutOfAlertModal.style.display = "flex";
};
const showLoading = () => {
    loadingShower.style.display = "flex";
    outOfLoadingShower.style.display = "flex";
    loadInterval = setInterval(() => {
        loadingShower.innerText =
            loadingShower.innerText === "로딩 중..."
                ? "로딩 중."
                : loadingShower.innerText + ".";
    }, 100);
};
const stopLoading = () => {
    loadingShower.style.display = "none";
    outOfLoadingShower.style.display = "none";
    clearInterval(loadInterval);
    loadInterval = null;
};
const login = async () => {
    if (loadInterval) {
        return;
    }
    const loginFailMessage = "해당 아이디가 존재하지 않거나, 비밀번호가 일치하지 않습니다.";
    const id = loginIdContainer.value;
    const password = loginPasswordContainer.value;
    const idTest = testLoginInfo("id", id);
    const passwordTest = testLoginInfo("password", password);
    if (!idTest || !passwordTest) {
        loginIdContainer.value = "";
        loginPasswordContainer.value = "";
        return alertByModal(loginFailMessage);
    }
    showLoading();
    try {
        const res = await axios.default.post("/admin/login", { id, password });
        const { data } = res;
        const { answer, loginCode } = data;
        if (answer === 'error') {
            throw new Error();
        }
        stopLoading();
        if (answer === "no user") {
            reload = true;
            alertByModal(loginFailMessage);
        }
        else if (answer === "not admin") {
            location.href = '/login';
            return;
        }
        else if (answer === "lock") {
            reload = true;
            alertByModal("정지된 ID입니다!");
        }
        if (loginCode) {
            localStorage.setItem('LOGIN_CODE', loginCode);
            location.href = '/admin/home';
        }
    }
    catch (err) {
        reload = true;
        alertByModal("오류가 발생하여 재접속합니다.");
    }
};
loginBtn.addEventListener("click", login);
alertModal.addEventListener("click", () => {
    alertModal.style.display = "none";
    OutOfAlertModal.style.display = "none";
});
document.addEventListener("click", () => {
    if (reload) {
        return location.reload();
    }
});
window.addEventListener("keydown", () => {
    if (reload) {
        return location.reload();
    }
});
