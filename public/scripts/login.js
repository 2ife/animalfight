"use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const axios = __importDefault(require("axios"));
const modeChangeBtns = document.querySelectorAll(".modeChangeBtn");
const loginForm = document.querySelector("#loginForm");
const loginIdContainer = document.querySelector("#login_id");
const loginPasswordContainer = document.querySelector("#login_password");
const loginBtn = document.querySelector("#loginBtn");
const joinForm = document.querySelector("#joinForm");
const joinIdContainer = document.querySelector("#join_id");
const joinNickContainer = document.querySelector("#join_nick");
const joinPasswordContainer = document.querySelector("#join_password");
const joinPasswordCheckContainer = document.querySelector("#join_passwordCheck");
const nickOverlapChecker = document.querySelector("#nickOverlapChecker");
const idOverlapChecker = document.querySelector("#idOverlapChecker");
const joinBtn = document.querySelector("#joinBtn");
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
const changeMode = (event) => {
    event.preventDefault();
    if (loadInterval) {
        return;
    }
    const btn = event.currentTarget;
    if (btn.innerText === "회원가입") {
        loginForm.style.display = "none";
        joinForm.style.display = "flex";
    }
    else {
        loginForm.style.display = "flex";
        joinForm.style.display = "none";
    }
};
modeChangeBtns.forEach((btn) => {
    btn.addEventListener("click", changeMode);
});
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
        const res = await axios.default.post("/auth/login", { id, password });
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
        else if (answer === "lock") {
            reload = true;
            alertByModal("정지된 ID입니다!");
        }
        if (loginCode) {
            localStorage.setItem('LOGIN_CODE', loginCode);
            location.href = '/home';
        }
    }
    catch (err) {
        reload = true;
        alertByModal("오류가 발생하여 재접속합니다.");
    }
};
const resetJoinFormInput = () => {
    joinNickContainer.value = "";
    joinIdContainer.value = "";
    joinPasswordContainer.value = "";
    joinPasswordCheckContainer.value = "";
};
const join = async () => {
    if (loadInterval) {
        return;
    }
    const nick = joinNickContainer.value;
    const id = joinIdContainer.value;
    const password = joinPasswordContainer.value;
    const passwordCheck = joinPasswordCheckContainer.value;
    if (!nick || !id || !password || !passwordCheck) {
        resetJoinFormInput();
        return alertByModal("닉네임, 아이디, 비밀번호, 비밀번호 확인 칸을 모두 작성하세요.");
    }
    if (password !== passwordCheck) {
        resetJoinFormInput();
        return alertByModal("비밀번호가 일치하지 않습니다.");
    }
    const nickTest = testLoginInfo("nick", nick);
    const idTest = testLoginInfo("id", id);
    const passwordTest = testLoginInfo("password", password);
    if (!nickTest || !idTest || !passwordTest) {
        resetJoinFormInput();
        return alertByModal("닉네임, 아이디, 비밀번호를 형식에 맞게 작성하세요.");
    }
    showLoading();
    try {
        const res = await axios.default.post("/auth/join", {
            nick,
            id,
            password,
            passwordCheck,
        });
        const { data } = res;
        const { answer } = data;
        if (answer === "join success") {
            return location.reload();
        }
        const { error, nickExist, idExist } = data;
        if (error) {
            throw new Error();
        }
        if (nickExist || idExist) {
            resetJoinFormInput();
            return alertByModal(`해당 ${nickExist && idExist
                ? "닉네임과 아이디가"
                : nickExist
                    ? "닉네임이"
                    : "아이디가"} 존재합니다`);
        }
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 재접속합니다.");
    }
};
const checkNickOverlap = async (event) => {
    event.preventDefault();
    if (loadInterval) {
        return;
    }
    const nick = joinNickContainer.value;
    const nickTest = testLoginInfo("nick", nick);
    if (!nickTest) {
        joinNickContainer.value = "";
        return alertByModal("유효하지 않은 닉네임입니다!");
    }
    showLoading();
    try {
        const res = await axios.default.post("/auth/checkNick", { nick });
        const { data } = res;
        const { nickExist, error } = data;
        if (error) {
            throw new Error();
        }
        if (nickExist) {
            joinNickContainer.value = "";
            alertByModal("이미 존재하는 닉네임입니다.");
        }
        else {
            alertByModal("해당 닉네임 사용 가능.");
        }
        stopLoading();
    }
    catch (err) {
        reload = true;
        alertByModal("오류가 발생하여 재접속합니다.");
    }
};
const checkIdOverlap = async (event) => {
    event.preventDefault();
    if (loadInterval) {
        return;
    }
    showLoading();
    const id = joinIdContainer.value;
    const idTest = testLoginInfo("id", id);
    if (!idTest) {
        joinIdContainer.value = "";
        return alertByModal("유효하지 않은 아이디입니다!");
    }
    try {
        const res = await axios.default.post("/auth/checkId", { id });
        const { data } = res;
        const { idExist, fatal } = data;
        if (fatal) {
            throw new Error("fatal error");
        }
        else if (fatal === false) {
            throw new Error("error");
        }
        if (idExist) {
            joinIdContainer.value = "";
            alertByModal("이미 존재하는 아이디입니다.");
        }
        else {
            alertByModal("해당 아이디 사용 가능.");
        }
        stopLoading();
    }
    catch (err) {
        reload = true;
        alertByModal("오류가 발생하여 재접속합니다.");
    }
};
loginBtn.addEventListener("click", login);
joinBtn.addEventListener("click", join);
nickOverlapChecker.addEventListener("click", checkNickOverlap);
idOverlapChecker.addEventListener("click", checkIdOverlap);
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
