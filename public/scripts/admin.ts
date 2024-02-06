import axios from "axios";

// html
const header = document.querySelector("#header") as HTMLDivElement;
const partChangeBtn = header.querySelector(
  "#partChangeBtn"
) as HTMLButtonElement;
const userSearchConditionList = header.querySelector(
  "#userSearchConditionList"
) as HTMLDivElement;
const userLockCheckbox = header.querySelector(
  "#userLockCheckbox"
) as HTMLInputElement;
const userChargeCheckbox = header.querySelector(
  "#userChargeCheckbox"
) as HTMLInputElement;
const userErrorCheckbox = header.querySelector(
  "#userErrorCheckbox"
) as HTMLInputElement;
const userSearchTargetBtn = header.querySelector(
  "#userSearchTargetBtn"
) as HTMLButtonElement;
const searchTextInput = header.querySelector(
  "#searchTextInput"
) as HTMLInputElement;
const searchBtn = header.querySelector("#searchBtn") as HTMLButtonElement;

const executer = document.querySelector("#executer") as HTMLDivElement;
const errorDeleteBtn = executer.querySelector(
  "#errorDeleteBtn"
) as HTMLButtonElement;
const cashCodeDeleteBtn = executer.querySelector(
  "#cashCodeDeleteBtn"
) as HTMLButtonElement;
const checkNeededUpdateBtnContainer = executer.querySelector(
  "#checkNeededUpdateBtnContainer"
) as HTMLDivElement;
const updateChecker = executer.querySelector(
  "#updateChecker"
) as HTMLInputElement;
const nickChangeBtn = executer.querySelector(
  "#nickChangeBtn"
) as HTMLButtonElement;
const passwordChangeBtn = executer.querySelector(
  "#passwordChangeBtn"
) as HTMLButtonElement;
const userLockOrUnlockBtn = executer.querySelector(
  "#userLockOrUnlockBtn"
) as HTMLButtonElement;
const userDeleteBtn = executer.querySelector(
  "#userDeleteBtn"
) as HTMLButtonElement;
const mailSender = executer.querySelector("#mailSender") as HTMLDivElement;
const mailContentInput = executer.querySelector(
  "#mailContentInput"
) as HTMLInputElement;
const mailExpireInput = executer.querySelector(
  "#mailExpireInput"
) as HTMLInputElement;
const mailGoldInput = executer.querySelector(
  "#mailGoldInput"
) as HTMLInputElement;
const mailJadeInput = executer.querySelector(
  "#mailJadeInput"
) as HTMLInputElement;
const mailScrollInput = executer.querySelector(
  "#mailScrollInput"
) as HTMLInputElement;
const mailSpiritInput = executer.querySelector(
  "#mailSpiritInput"
) as HTMLInputElement;
const mailAllTargetCheckbox = executer.querySelector(
  "#mailAllTargetCheckbox"
) as HTMLInputElement;
const mailSendBtn = executer.querySelector("#mailSendBtn") as HTMLButtonElement;

const dataTable = document.querySelector("#dataTable") as HTMLTableElement;
const userTableHead = dataTable.querySelector(
  "#userTableHead"
) as HTMLTableSectionElement;
const userTableHeadCheckbox = userTableHead.querySelector(
  "#userTableHeadCheckbox"
) as HTMLInputElement;
const userTableBody = dataTable.querySelector(
  "#userTableBody"
) as HTMLTableSectionElement;
const userTableBodyRows = userTableBody.querySelectorAll(
  ".dataTableBodyRow"
) as NodeListOf<HTMLTableRowElement>;
const userTableBodyCheckboxes = userTableBody.querySelectorAll(
  ".userTableBodyCheckbox"
) as NodeListOf<HTMLInputElement>;
const errorTableHead = dataTable.querySelector(
  "#errorTableHead"
) as HTMLTableSectionElement;
const errorTableHeadCheckbox = errorTableHead.querySelector(
  "#errorTableHeadCheckbox"
) as HTMLInputElement;
const errorTableBody = dataTable.querySelector(
  "#errorTableBody"
) as HTMLTableSectionElement;
const errorTableBodyRows = errorTableBody.querySelectorAll(
  ".dataTableBodyRow"
) as NodeListOf<HTMLTableRowElement>;
const errorTableBodyCheckboxes = errorTableBody.querySelectorAll(
  ".errorTableBodyCheckbox"
) as NodeListOf<HTMLInputElement>;

const pageController = document.querySelector(
  "#pageController"
) as HTMLDivElement;
const leftEndBtn = pageController.querySelector(
  "#leftEndBtn"
) as HTMLButtonElement;
const leftBtn = pageController.querySelector("#leftBtn") as HTMLButtonElement;
const currentPageShower = pageController.querySelector(
  "#currentPageShower"
) as HTMLDivElement;
const lastPageShower = pageController.querySelector(
  "#lastPageShower"
) as HTMLDivElement;
const rightBtn = pageController.querySelector("#rightBtn") as HTMLButtonElement;
const rightEndBtn = pageController.querySelector(
  "#rightEndBtn"
) as HTMLButtonElement;

const alertModal = document.querySelector(".alertModal") as HTMLDivElement;
const OutOfAlertModal = document.querySelector(
  ".OutOfAlertModal"
) as HTMLDivElement;
const loadingShower = document.querySelector(
  ".loadingShower"
) as HTMLDivElement;
const outOfLoadingShower = document.querySelector(
  ".outOfLoadingShower"
) as HTMLDivElement;

// common
let loadInterval: any = null;
let reload: boolean = false;
let searchTarget: "user" | "error" = "user";
let userSearchTarget: "nick" | "loginId" | "cashCode" = "nick";
let targetUsers: {
  loginId: string;
  nick: string;
  lockMemo: string | null;
  cashCode: string | null;
  chargeCash: number;
  chargeTime: number | null;
  error: boolean;
}[] = [];
let targetErrors: {
  userId: string | null;
  id: number;
  place: string;
  content: string;
}[] = [];
// common func
const checkLoginCode = async () => {
  try {
    const loginCode = localStorage.getItem("LOGIN_CODE");
    if (!loginCode) {
      location.href = "/admin/login";
      return;
    }
    showLoading();
    const res = await axios.post("/admin/checkLoginCode", {
      loginCode,
    });
    stopLoading();
    const { data } = res;
    const { answer } = data;
    if (answer === "error") {
      throw new Error();
    }
    if (answer === "no user") {
      localStorage.removeItem("loginCode");
      location.href = "/admin/login";
    } else if (answer === "not admin") {
      location.href = "/login";
      return;
    }
    const { newLoginCode } = data;
    localStorage.setItem("LOGIN_CODE", newLoginCode);
  } catch (err) {
    console.log(err);
  }
};
const testSearchText = (
  category: "nick" | "loginId" | "cashCode",
  text: string
) => {
  let tester = /^(.*[a-z0-9가-힣]*)[a-z0-9가-힣]*$/;
  switch (category) {
    case "loginId": {
      tester = /^(.*[a-z0-9]*)[a-z0-9]*$/;
      break;
    }
    case "cashCode": {
      tester = /^[a-z0-9]*$/;
      break;
    }
  }
  return tester.test(text);
};
const testLoginInfo = (category: "nick" | "password", text: string) => {
  let tester = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
  if (category === "password") {
    tester = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
  }
  return tester.test(text);
};
// html func
const resetDataTable = (part: "user" | "error") => {
  const targetHeadCheckbox =
    part === "user" ? userTableHeadCheckbox : errorTableHeadCheckbox;
  const targetBodyCheckboxes =
    part === "user" ? userTableBodyCheckboxes : errorTableBodyCheckboxes;
  const targetBodyRows =
    part === "user" ? userTableBodyRows : errorTableBodyRows;
  targetHeadCheckbox.checked = false;
  targetBodyCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  targetBodyRows.forEach((bodyRow) => {
    const targetCells = Array.from(bodyRow.children) as HTMLTableCellElement[];
    targetCells.shift();
    targetCells.forEach((cell) => {
      cell.innerText = "";
    });
  });
};
const clickPartChangeBtn = () => {
  if (loadInterval) return;
  switch (searchTarget) {
    case "user": {
      searchTarget = "error";
      targetErrors = [];
      partChangeBtn.innerText = "에러";
      userSearchConditionList.style.display = "none";
      userSearchTargetBtn.style.display = "none";
      cashCodeDeleteBtn.style.display = "none";
      checkNeededUpdateBtnContainer.style.display = "none";
      mailSender.style.display = "none";
      resetDataTable("error");
      userTableHead.style.display = "none";
      userTableBody.style.display = "none";
      errorTableHead.style.display = "table-header-group";
      errorTableBody.style.display = "table-row-group";
      break;
    }
    case "error": {
      searchTarget = "user";
      targetUsers = [];
      partChangeBtn.innerText = "유저";
      userSearchConditionList.style.display = "flex";
      userSearchTargetBtn.style.display = "block";
      cashCodeDeleteBtn.style.display = "block";
      checkNeededUpdateBtnContainer.style.display = "flex";
      updateChecker.value = "";
      mailSender.style.display = "flex";
      mailContentInput.value = "";
      mailExpireInput.value = "";
      mailGoldInput.value = "";
      mailJadeInput.value = "";
      mailScrollInput.value = "";
      mailSpiritInput.value = "";
      mailAllTargetCheckbox.checked = false;
      resetDataTable("user");
      errorTableHead.style.display = "none";
      errorTableBody.style.display = "none";
      userTableHead.style.display = "table-header-group";
      userTableBody.style.display = "table-row-group";
      break;
    }
  }
  searchTextInput.value = "";
  currentPageShower.innerText = "";
  lastPageShower.innerText = "";
};
const clickUserSearchTargetBtn = () => {
  switch (userSearchTarget) {
    case "nick": {
      userSearchTarget = "loginId";
      userSearchTargetBtn.innerText = "ID";
      break;
    }
    case "loginId": {
      userSearchTarget = "cashCode";
      userSearchTargetBtn.innerText = "캐시코드";
      break;
    }
    case "cashCode": {
      userSearchTarget = "nick";
      userSearchTargetBtn.innerText = "닉네임";
      break;
    }
  }
};
const renderUserTable = (page: number) => {
  for (let i = (page - 1) * 10; i < page * 10; i++) {
    const targetUser = targetUsers[i];
    if (!targetUser) {
      break;
    }
    const rowIndex = i - (page - 1) * 10;
    const { loginId, nick, lockMemo, cashCode, chargeCash, chargeTime, error } =
      targetUser;
    const targetRow = userTableBodyRows[rowIndex];
    const userLoginIdCell = targetRow.querySelector(
      ".userLoginIdCell"
    ) as HTMLTableCellElement;
    const userNickCell = targetRow.querySelector(
      ".userNickCell"
    ) as HTMLTableCellElement;
    const userLockMemoCell = targetRow.querySelector(
      ".userLockMemoCell"
    ) as HTMLTableCellElement;
    const userCashCodeCell = targetRow.querySelector(
      ".userCashCodeCell"
    ) as HTMLTableCellElement;
    const userChargeCashCell = targetRow.querySelector(
      ".userChargeCashCell"
    ) as HTMLTableCellElement;
    const userChargeTimeCell = targetRow.querySelector(
      ".userChargeTimeCell"
    ) as HTMLTableCellElement;
    const userErrorCell = targetRow.querySelector(
      ".userErrorCell"
    ) as HTMLTableCellElement;
    userLoginIdCell.innerText = loginId;
    userNickCell.innerText = nick;
    userLockMemoCell.innerText = lockMemo ? lockMemo : "";
    userCashCodeCell.innerText = cashCode ? cashCode : "";
    userChargeCashCell.innerText = chargeCash.toLocaleString("KO-KR");
    userChargeTimeCell.innerText = chargeTime
      ? `${new Date(chargeTime).toLocaleDateString()}`
      : "";
    userErrorCell.innerText = `${error ? "O" : "X"}`;
  }
};
const renderErrorTable = (page: number) => {
  for (let i = (page - 1) * 10; i < page * 10; i++) {
    const targetError = targetErrors[i];
    if (!targetError) {
      break;
    }
    const rowIndex = i - (page - 1) * 10;
    const { userId, id, place, content } = targetError;
    const targetRow = errorTableBodyRows[rowIndex];
    const userIdCell = targetRow.querySelector(
      ".userIdCell"
    ) as HTMLTableCellElement;
    const errorIdCell = targetRow.querySelector(
      ".errorIdCell"
    ) as HTMLTableCellElement;
    const errorPlaceCell = targetRow.querySelector(
      ".errorPlaceCell"
    ) as HTMLTableCellElement;
    const errorContentCell = targetRow.querySelector(
      ".errorContentCell"
    ) as HTMLTableCellElement;
    userIdCell.innerText = userId ? userId : "";
    errorIdCell.innerText = `${id}`;
    errorPlaceCell.innerText = place;
    errorContentCell.innerText = content;
  }
};
const clickSearchBtn = async () => {
  if (loadInterval) return;
  try {
    let testCategory: "nick" | "loginId" | "cashCode" = "loginId";
    if (searchTarget === "user") {
      resetDataTable("user");
      if (userSearchTarget === "nick") {
        testCategory = "nick";
      } else if (userSearchTarget === "cashCode") {
        testCategory = "cashCode";
      }
      currentPageShower.innerText = "";
      lastPageShower.innerText = "";
    } else {
      resetDataTable("error");
    }
    const searchText = searchTextInput.value;
    const textTest = testSearchText(testCategory, searchText);
    if (!textTest) {
      alertByModal("입력 형식이 맞지 않습니다!");
      return;
    }
    if (
      searchTarget === "user" &&
      userSearchTarget === "cashCode" &&
      !userChargeCheckbox.checked
    ) {
      alertByModal("캐시코드 입력 시, 충전 항목을 체크히세요!");
      return;
    }
    showLoading();
    const loginCode = localStorage.getItem("LOGIN_CODE");
    switch (searchTarget) {
      case "user": {
        const res = await axios.post("/admin/searchUser", {
          loginCode,
          userSearchTarget,
          searchText,
          userLocked: userLockCheckbox.checked,
          userCharged: userChargeCheckbox.checked,
          userError: userErrorCheckbox.checked,
        });
        stopLoading();
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
          throw new Error();
        }
        const { users } = data;
        targetUsers = users;
        const usersLength = targetUsers.length;
        if (usersLength === 0) {
          alertByModal("해당 조건에 부합하는 유저가 없습니다!");
          return;
        }
        currentPageShower.innerText = "1";
        lastPageShower.innerText = `${Math.ceil(usersLength / 10)}`;
        renderUserTable(1);
        break;
      }
      case "error": {
        const res = await axios.post("/admin/searchError", {
          loginCode,
          searchText,
        });
        stopLoading();
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
          throw new Error();
        }
        const { errors } = data;
        targetErrors = errors;
        const errorsLength = targetErrors.length;
        if (errorsLength === 0) {
          alertByModal("해당 조건에 부합하는 에러가 없습니다!");
          return;
        }
        currentPageShower.innerText = "1";
        lastPageShower.innerText = `${Math.ceil(errorsLength / 10)}`;
        renderErrorTable(1);
        break;
      }
    }
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal("오류가 발생하여 재접속합니다!");
  }
};
const clickErrorDeleteBtn = async () => {
  if (loadInterval || searchTarget === "user") return;
  try {
    const targetCheckboxes = Array.from(errorTableBodyCheckboxes);
    const checkedCheckboxes = targetCheckboxes.filter((checkbox) => {
      return checkbox.checked;
    });
    const checkedCheckBoxIndexList = checkedCheckboxes.map((checkbox) => {
      return targetCheckboxes.indexOf(checkbox);
    });
    const targetErrorIdList = checkedCheckBoxIndexList.map((index) => {
      const targetRow = errorTableBodyRows[index];
      const targetErrorIdCell = targetRow.querySelector(
        ".errorIdCell"
      ) as HTMLTableCellElement;
      const targetErrorId = Number(targetErrorIdCell.innerText);
      return targetErrorId;
    });
    if (targetErrorIdList.includes(0)) {
      alertByModal("에러 선택이 잘못되었습니다!");
      return;
    }
    showLoading();
    const loginCode = localStorage.getItem("LOGIN_CODE");
    const res = await axios.post("/admin/deleteError", {
      loginCode,
      targetErrorIdList,
    });
    stopLoading();
    const { data } = res;
    const { answer } = data;
    if (answer === "error") {
      throw new Error();
    }
    targetErrors = targetErrors.filter((error) => {
      return !targetErrorIdList.includes(error.id);
    });
    resetDataTable("error");
    if (targetErrors.length === 0) {
      currentPageShower.innerText = "";
      lastPageShower.innerText = "";
    } else {
      lastPageShower.innerText = `${Math.ceil(targetErrors.length / 10)}`;
      renderErrorTable(1);
    }
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal("오류가 발생하여 재접속합니다!");
  }
};
const getTargetUserInfoList = () => {
  const targetCheckboxes = Array.from(userTableBodyCheckboxes);
  const checkedCheckboxes = targetCheckboxes.filter((checkbox) => {
    return checkbox.checked;
  });
  const checkedCheckBoxIndexList = checkedCheckboxes.map((checkbox) => {
    return targetCheckboxes.indexOf(checkbox);
  });
  const targetUserLoginIdList = checkedCheckBoxIndexList.map((index) => {
    const targetRow = userTableBodyRows[index];
    const targetUserLoginIdCell = targetRow.querySelector(
      ".userLoginIdCell"
    ) as HTMLTableCellElement;
    const targetUserLoginId = targetUserLoginIdCell.innerText;
    return targetUserLoginId;
  });
  if (targetUserLoginIdList.includes("")) {
    return "error";
  }
  if (targetUserLoginIdList.length === 0) {
    return "error";
  }
  return { checkedCheckBoxIndexList, targetUserLoginIdList };
};
const clickCashCodeDeleteBtn = async () => {
  if (loadInterval || searchTarget === "error") return;
  try {
    const userInfoList = getTargetUserInfoList();
    if (userInfoList === "error") {
      alertByModal("유저 선택이 잘못되었습니다!");
      return;
    }
    const { checkedCheckBoxIndexList, targetUserLoginIdList } = userInfoList;
    for (const index of checkedCheckBoxIndexList) {
      const targetRow = userTableBodyRows[index];
      const targetUserCashCodeCell = targetRow.querySelector(
        ".userCashCodeCell"
      ) as HTMLTableCellElement;
      if (targetUserCashCodeCell.innerText === "") {
        alertByModal("유저 선택이 잘못되었습니다!");
        return;
      }
    }
    if (targetUserLoginIdList.includes("")) {
      alertByModal("유저 선택이 잘못되었습니다!");
      return;
    }
    showLoading();
    const loginCode = localStorage.getItem("LOGIN_CODE");
    const res = await axios.post("/admin/deleteCashCode", {
      loginCode,
      targetUserLoginIdList,
    });
    stopLoading();
    const { data } = res;
    const { answer } = data;
    if (answer === "error") {
      throw new Error();
    }
    targetUsers.forEach((user) => {
      if (targetUserLoginIdList.includes(user.loginId)) {
        user.cashCode = null;
        user.chargeTime = null;
        user.chargeCash = 0;
      }
    });
    checkedCheckBoxIndexList.forEach((index) => {
      const targetRow = userTableBodyRows[index];
      const targetUserCashCodeCell = targetRow.querySelector(
        ".userCashCodeCell"
      ) as HTMLTableCellElement;
      const targetUserChargeCashCell = targetRow.querySelector(
        ".userChargeCashCell"
      ) as HTMLTableCellElement;
      const targetUserChargeTimeCell = targetRow.querySelector(
        ".userChargeTimeCell"
      ) as HTMLTableCellElement;
      targetUserCashCodeCell.innerText = "";
      targetUserChargeCashCell.innerText = "";
      targetUserChargeTimeCell.innerText = "";
    });
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal("오류가 발생하여 재접속합니다!");
  }
};
const clickNickChangeBtn = async () => {
  if (loadInterval || searchTarget === "error") return;
  try {
    const userInfoList = getTargetUserInfoList();
    if (userInfoList === "error") {
      alertByModal("유저 선택이 잘못되었습니다!");
      return;
    }
    const { checkedCheckBoxIndexList, targetUserLoginIdList } = userInfoList;
    if (
      checkedCheckBoxIndexList.length !== 1 ||
      targetUserLoginIdList.length !== 1
    ) {
      alertByModal("유저 한 명만 선택히세요!");
      return;
    }
    const targetUserLoginId = targetUserLoginIdList[0];
    const newNick = updateChecker.value;
    const nickTest = testLoginInfo("nick", newNick);
    if (!nickTest) {
      alertByModal("해당 닉네임으로 변경이 불가합니다!");
      return;
    }
    showLoading();
    const loginCode = localStorage.getItem("LOGIN_CODE");
    const res = await axios.post("/admin/changeNick", {
      loginCode,
      targetUserLoginId,
      newNick,
    });
    stopLoading();
    const { data } = res;
    const { answer } = data;
    if (answer === "error") {
      throw new Error();
    }
    if (answer === "nick exist") {
      alertByModal("이미 존재하는 닉네임입니다!");
      return;
    }
    const checkedCheckBoxIndex = checkedCheckBoxIndexList[0];
    const targetRow = userTableBodyRows[checkedCheckBoxIndex];
    const targetUserNickCell = targetRow.querySelector(
      ".userNickCell"
    ) as HTMLTableCellElement;
    targetUserNickCell.innerText = newNick;
    for (const user of targetUsers) {
      if (user.loginId === targetUserLoginId) {
        user.nick = newNick;
        break;
      }
    }
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal("오류가 발생하여 재접속합니다!");
  }
};
const clickPasswordChangeBtn = async () => {
  if (loadInterval || searchTarget === "error") return;
  try {
    const userInfoList = getTargetUserInfoList();
    if (userInfoList === "error") {
      alertByModal("유저 선택이 잘못되었습니다!");
      return;
    }
    const { checkedCheckBoxIndexList, targetUserLoginIdList } = userInfoList;
    if (
      checkedCheckBoxIndexList.length !== 1 ||
      targetUserLoginIdList.length !== 1
    ) {
      alertByModal("유저 한 명만 선택히세요!");
      return;
    }
    const targetUserLoginId = targetUserLoginIdList[0];
    const newPassword = updateChecker.value;
    const passwordTest = testLoginInfo("password", newPassword);
    if (!passwordTest) {
      alertByModal("해당 비밀번호로 변경이 불가합니다!");
      return;
    }
    showLoading();
    const loginCode = localStorage.getItem("LOGIN_CODE");
    const res = await axios.post("/admin/changePassword", {
      loginCode,
      targetUserLoginId,
      newPassword,
    });
    stopLoading();
    const { data } = res;
    const { answer } = data;
    if (answer === "error") {
      throw new Error();
    }
    alertByModal("비밀번호가 변경되었습니다!");
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal("오류가 발생하여 재접속합니다!");
  }
};
const clickUserLockOrUnlockBtn = async () => {
  if (loadInterval || searchTarget === "error") return;
  try {
    const userInfoList = getTargetUserInfoList();
    if (userInfoList === "error") {
      alertByModal("유저 선택이 잘못되었습니다!");
      return;
    }
    const { checkedCheckBoxIndexList, targetUserLoginIdList } = userInfoList;
    if (
      checkedCheckBoxIndexList.length !== 1 ||
      targetUserLoginIdList.length !== 1
    ) {
      alertByModal("유저 한 명만 선택히세요!");
      return;
    }
    const checkedCheckBoxIndex = checkedCheckBoxIndexList[0];
    const targetRow = userTableBodyRows[checkedCheckBoxIndex];
    const targetUserLockMemoCell = targetRow.querySelector(
      ".userLockMemoCell"
    ) as HTMLTableCellElement;
    const targetUserLockMemo = targetUserLockMemoCell.innerText;
    const targetUserLoginId = targetUserLoginIdList[0];
    const newLockMemo = updateChecker.value;
    if (targetUserLockMemo === "" && newLockMemo === "") {
      alertByModal("정지메모를 입력하세요!");
      return;
    }
    showLoading();
    const loginCode = localStorage.getItem("LOGIN_CODE");
    let res = null;
    if (targetUserLockMemo === "") {
      res = await axios.post("/admin/lockUser", {
        loginCode,
        targetUserLoginId,
        newLockMemo,
      });
    } else {
      res = await axios.post("/admin/unlockUser", {
        loginCode,
        targetUserLoginId,
      });
    }
    stopLoading();
    const { data } = res;
    const { answer } = data;
    if (answer === "error") {
      throw new Error();
    }

    if (targetUserLockMemo === "") {
      targetUserLockMemoCell.innerText = newLockMemo;
      for (const user of targetUsers) {
        if (user.loginId === targetUserLoginId) {
          user.lockMemo = newLockMemo;
          break;
        }
      }
    } else {
      targetUserLockMemoCell.innerText = "";
      for (const user of targetUsers) {
        if (user.loginId === targetUserLoginId) {
          user.lockMemo = "";
          break;
        }
      }
    }
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal("오류가 발생하여 재접속합니다!");
  }
};
const clickUserDeleteBtn = async () => {
  if (loadInterval || searchTarget === "error") return;
  try {
    const userInfoList = getTargetUserInfoList();
    if (userInfoList === "error") {
      alertByModal("유저 선택이 잘못되었습니다!");
      return;
    }
    const { checkedCheckBoxIndexList, targetUserLoginIdList } = userInfoList;
    if (
      checkedCheckBoxIndexList.length !== 1 ||
      targetUserLoginIdList.length !== 1
    ) {
      alertByModal("유저 한 명만 선택히세요!");
      return;
    }
    const targetUserLoginId = targetUserLoginIdList[0];
    const deleteCheckText = updateChecker.value;
    if (deleteCheckText !== targetUserLoginId) {
      alertByModal("대상 유저의 ID가 잘못되었습니다!");
      return;
    }
    showLoading();
    const loginCode = localStorage.getItem("LOGIN_CODE");
    let res = null;
    res = await axios.post("/admin/deleteUser", {
      loginCode,
      targetUserLoginId,
    });
    stopLoading();
    const { data } = res;
    const { answer } = data;
    if (answer === "error") {
      throw new Error();
    }
    targetUsers = targetUsers.filter((user) => {
      return user.loginId !== targetUserLoginId;
    });
    if (targetUsers.length === 0) {
      resetDataTable("user");
      currentPageShower.innerText = "";
      lastPageShower.innerText = "";
    } else {
      lastPageShower.innerText = `${Math.ceil(targetUsers.length / 10)}`;
      leftEndBtn.click();
    }
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal("오류가 발생하여 재접속합니다!");
  }
};
const clickMailSendBtn = async () => {
  if (loadInterval || searchTarget === "error") return;
  try {
    const content = mailContentInput.value;
    if (content === "") {
      alertByModal("메일 내용을 입력하세요!");
      return;
    }
    if (mailExpireInput.value === "") {
      alertByModal("메일 유효기간을 설정하세요!");
      return;
    }
    const expire = new Date(mailExpireInput.value).getTime();
    const currentTime = Date.now();
    if (expire <= currentTime) {
      alertByModal("메일 유효기간을 설정하세요!");
      return;
    }
    const gold = Number(mailGoldInput.value);
    if (!Number.isInteger(gold) || gold < 0) {
      alertByModal("골드를 올바로 설정하세요!");
      return;
    }
    const jade = Number(mailJadeInput.value);
    if (!Number.isInteger(jade) || jade < 0) {
      alertByModal("옥 올바로 설정하세요!");
      return;
    }
    const scroll = Number(mailScrollInput.value);
    if (!Number.isInteger(scroll) || scroll < 0 || scroll > 100) {
      alertByModal("두루마리를 올바로 설정하세요!");
      return;
    }
    const spirit = Number(mailSpiritInput.value);
    if (!Number.isInteger(spirit) || spirit < 0) {
      alertByModal("영혼을 올바로 설정하세요!");
      return;
    }
    const allTarget = mailAllTargetCheckbox.checked;
    let loginIdList: string[] = [];
    if (!allTarget) {
      const userInfoList = getTargetUserInfoList();
      if (userInfoList === "error") {
        alertByModal("유저 선택이 잘못되었습니다!");
        return;
      }
      const { targetUserLoginIdList } = userInfoList;
      loginIdList = targetUserLoginIdList;
    }
    showLoading();
    const loginCode = localStorage.getItem("LOGIN_CODE");
    const res = await axios.post("/admin/sendMail", {
      loginCode,
      allTarget,
      content,
      expire,
      gold,
      jade,
      scroll,
      spirit,
      targetUserLoginIdList: loginIdList,
    });
    stopLoading();
    const { data } = res;
    const { answer } = data;
    if (answer === "error") {
      throw new Error();
    }
    alertByModal("메일이 성공적으로 발송되었습니다!");
  } catch (err: any) {
    stopLoading();
    reload = true;
    alertByModal("오류가 발생하여 재접속합니다!");
  }
};
const clickHeadCheckbox = (part: "user" | "error") => () => {
  const targetHeadCheckbox =
    part === "user" ? userTableHeadCheckbox : errorTableHeadCheckbox;
  const targetBodyCheckboxes =
    part === "user" ? userTableBodyCheckboxes : errorTableBodyCheckboxes;
  targetBodyCheckboxes.forEach((checkbox) => {
    checkbox.checked = targetHeadCheckbox.checked;
  });
};
const clickPageControlBtn =
  (direction: "leftEnd" | "left" | "right" | "rightEnd") => () => {
    if (loadInterval) return;
    const lastPage = Number(lastPageShower.innerText);
    if (lastPage === 0 || lastPage === 1) {
      return;
    }
    const currentPage = Number(currentPageShower.innerText);
    if (
      (currentPage === 1 &&
        (direction === "leftEnd" || direction === "left")) ||
      (currentPage === lastPage &&
        (direction === "rightEnd" || direction === "right"))
    ) {
      return;
    }
    const targetPage =
      direction === "leftEnd"
        ? 1
        : direction === "left"
        ? currentPage - 1
        : direction === "right"
        ? currentPage + 1
        : lastPage;
    currentPageShower.innerText = `${targetPage}`;
    switch (searchTarget) {
      case "user": {
        resetDataTable("user");
        renderUserTable(targetPage);
        break;
      }
      case "error": {
        resetDataTable("error");
        renderErrorTable(targetPage);
        break;
      }
    }
  };

const alertByModal = (msg: string) => {
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

partChangeBtn.addEventListener("click", clickPartChangeBtn);
userSearchTargetBtn.addEventListener("click", clickUserSearchTargetBtn);
searchBtn.addEventListener("click", clickSearchBtn);
errorDeleteBtn.addEventListener("click", clickErrorDeleteBtn);
cashCodeDeleteBtn.addEventListener("click", clickCashCodeDeleteBtn);
nickChangeBtn.addEventListener("click", clickNickChangeBtn);
passwordChangeBtn.addEventListener("click", clickPasswordChangeBtn);
userLockOrUnlockBtn.addEventListener("click", clickUserLockOrUnlockBtn);
userDeleteBtn.addEventListener("click", clickUserDeleteBtn);
mailSendBtn.addEventListener("click", clickMailSendBtn);
userTableHeadCheckbox.addEventListener("click", clickHeadCheckbox("user"));
errorTableHeadCheckbox.addEventListener("click", clickHeadCheckbox("error"));
leftEndBtn.addEventListener("click", clickPageControlBtn("leftEnd"));
leftBtn.addEventListener("click", clickPageControlBtn("left"));
rightBtn.addEventListener("click", clickPageControlBtn("right"));
rightEndBtn.addEventListener("click", clickPageControlBtn("rightEnd"));
alertModal.addEventListener("click", () => {
  alertModal.style.display = "none";
  OutOfAlertModal.style.display = "none";
});
document.addEventListener("click", () => {
  if (reload) {
    location.href = "/admin/login";
    return;
  }
});
window.addEventListener("keydown", () => {
  if (reload) {
    location.href = "/admin/login";
    return;
  }
});

checkLoginCode();
