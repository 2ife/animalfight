"use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const axios = __importDefault(require("axios"));
// html
const battleZone = document.querySelector(".battleZone");
const battleZoneAnimalImgs = battleZone.querySelectorAll(".battleZone_animalImg");
const battleZoneWrapper = document.querySelector(".battleZoneWrapper");
const mainParts = document.querySelectorAll(".mainPart");
const homePart = document.querySelector("#homePart");
const profileImg = homePart.querySelector(".profileContainer_profileImg");
const userNameContainer = homePart.querySelector(".profileContainer_userNameContainer");
const profileManageBtn = homePart.querySelector(".profileContainer_profileManageBtn");
const levelContainer = homePart.querySelector(".levelContainer");
const expBar = homePart.querySelector(".expContainer_expBar");
const expInfoContainer = homePart.querySelector(".expContainer_expInfoContainer");
const battleGradeLeftEndMoveBtn = homePart.querySelector("#battleGradeLeftEndMoveBtn");
const battleGradeLeftMoveBtn = homePart.querySelector("#battleGradeLeftMoveBtn");
const battleGradeRightMoveBtn = homePart.querySelector("#battleGradeRightMoveBtn");
const battleGradeRightEndMoveBtn = homePart.querySelector("#battleGradeRightEndMoveBtn");
const battleGradeTotalInfoContainer = homePart.querySelector(".battleGradeTotalInfoContainer");
const battleGradeListWrapper = homePart.querySelector(".battleGradeListWrapper");
const battleGradeList = homePart.querySelector(".battleGradeList");
const battleGrades = homePart.querySelectorAll(".battleGradeList_battleGrade");
const battleGradeStarContainers = homePart.querySelectorAll(".battleGrade_starContainer");
const battleEnemyImg = homePart.querySelector(".battleEnemyInfoContainer_enemyImg");
const battleEnemyInfo = homePart.querySelector(".battleEnemyInfoContainer_enemyInfo");
const battleBossImg = homePart.querySelector(".battleEnemyInfoContainer_bossImg");
const battleBossInfo = homePart.querySelector(".battleEnemyInfoContainer_bossInfo");
const battleRewardContainers = homePart.querySelectorAll(".battleRewardContainer");
const battleRewardAmountContainers = homePart.querySelectorAll(".battleRewardContainer_rewardAmountContainer");
const consumeScrollValueContainer = homePart.querySelector(".scrollContainer_scrollValueContainer");
const battleBtn = homePart.querySelector(".battleProceedBtnContainer_battleBtn");
const sweepBtn = homePart.querySelector(".battleProceedBtnContainer_sweepBtn");
const animalPart = document.querySelector("#animalPart");
const animalComprehensivePart = animalPart.querySelector(".animalComprehensivePart");
const animalListWrapper = document.querySelector(".animalComprehensivePart_animalListWrapper");
const animalPartAnimalImgContainers = animalComprehensivePart.querySelectorAll(".animalList_animalImgContainer");
const animalPartAnimalAmountContainers = animalComprehensivePart.querySelectorAll(".animalList_animalAmountContainer");
const animaPartModeChangeBtn = animalComprehensivePart.querySelector("#animalComprehensivePart_modeChangeBtn");
const animalSummonBtn = animalComprehensivePart.querySelector("#animalComprehensivePart_summonBtn");
const animalSummonTenBtn = animalComprehensivePart.querySelector("#animalComprehensivePart_summonTenBtn");
const animalSpecificPart = animalPart.querySelector(".animalSpecificPart");
const animalSpecificPartCloseBtn = animalSpecificPart.querySelector(".animalSpecificPart_closeBtn");
const animalSpecificPartAnimalImg = animalSpecificPart.querySelector(".profileContainer_animalImg");
const animalSpecificPartAnimalGrade = animalSpecificPart.querySelector(".animalNameContainer_animalGrade");
const animalSpecificPartAnimalName = animalSpecificPart.querySelector(".animalNameContainer_animalName");
const animalSpecificPartAnimalAmountContainer = animalSpecificPart.querySelector(".animalBasicInfoContainer_animalAmountContainer");
const animalSpecificPartSpecContainer = animalSpecificPart.querySelector(".profileContainer_specContainer");
const animalSpecificPartSkillInfoContainer = animalSpecificPart.querySelector(".animalSpecificPart_skillInfoContainer");
const combineInfoContainer = animalSpecificPart.querySelector(".animalSpecificPart_combineInfoContainer");
const combineInfoContainerTargetImg = animalSpecificPart.querySelector(".combineInfoContainer_targetImg");
const combineInfoContainer_ingredientImgs = animalSpecificPart.querySelectorAll(".combineInfoContainer_ingredientImg");
const ingredientImgContainer_ingredientAmountContainers = animalSpecificPart.querySelectorAll(".ingredientImgContainer_ingredientAmountContainer");
const upgradePart = document.querySelector("#upgradePart");
const upgradeValueSpans = upgradePart.querySelectorAll(".upgradeValueSpan");
const upgradeExecuters = upgradePart.querySelectorAll(".upgradeInfoContainer_upgradeExecuter");
const upgradeExecuterGoldValueContainers = upgradePart.querySelectorAll(".goldContainer_goldValueContainer");
const achivementPart = document.querySelector("#achivementPart");
const achivementProgressBars = achivementPart.querySelectorAll(".progressContainer_progressBar");
const achivementProgressInfoContainers = achivementPart.querySelectorAll(".progressContainer_progressInfoContainer");
const achivementRewardImgContainers = achivementPart.querySelectorAll(".achivementContainer_rewardImgContainer");
const achivementRewardCompletedImgs = achivementPart.querySelectorAll(".rewardImgContainer_rewardCompletedImg");
const permanentBattleWinAchivementName = achivementPart.querySelector("#permanentBattleWinAchivementName");
const permanentBattlePerfectWinAchivementName = achivementPart.querySelector("#permanentBattlePerfectWinAchivementName");
const passPart = document.querySelector("#passPart");
const passPartPassNames = passPart.querySelectorAll(".passNameContainer_passName");
const passPartRewardImgContainers = passPart.querySelectorAll(".passContainer_rewardImgContainer");
const passScrollRewardAmountContainers = passPart.querySelectorAll(".passPart_scrollRewardAmountContainer");
const shopPart = document.querySelector("#shopPart");
const shopPartPassContainers = shopPart.querySelectorAll(".passShopContainer_passContainer");
const shopPartGoodsImgContainers = shopPart.querySelectorAll(".goodsShopContainer_goodsImgContainer");
const shopPartGoodsAmountsContainers = shopPart.querySelectorAll(".goodsImgContainer_amountsContainer");
const shopPartGoodsPurchaseCompletedImgs = shopPart.querySelectorAll(".goodsShopContainer_purchaseCompletedImg");
const jadeChargeExecuterJadeDownBtn = shopPart.querySelector("#jadeChargeExecuter_jadeDownBtn");
const jadeChargeExecuterJadeValueContainer = shopPart.querySelector(".jadeChargeExecuter_jadeValueContainer");
const jadeChargeExecuterJadeUpBtn = shopPart.querySelector("#jadeChargeExecuter_jadeUpBtn");
const jadeChargeBtn = shopPart.querySelector(".jadeChargeExecuter_chargeBtn");
const jadeChargePriceContainer = shopPart.querySelector(".jadeChargeExecuter_chargePriceContainer");
const mailPart = document.querySelector("#mailPart");
const mailList = mailPart.querySelector(".mailList");
const rankPart = document.querySelector("#rankPart");
const rankList = rankPart.querySelector(".rankList");
const rankContainers = rankList.querySelectorAll(".rankContainer");
const rankerWatchBtns = rankList.querySelectorAll(".rankContainer_watchBtn");
const myRankContainer = rankPart.querySelector("#myRankContainer");
const myProfileImgInRankPart = myRankContainer.querySelector(".rankContainer_profileImg");
const myNameContainerInRankPart = myRankContainer.querySelector(".rankerInfoContainer_nameContainer");
const myLevelContainerInRankPart = myRankContainer.querySelector(".rankerInfoContainer_levelContainer");
const myHightestBattleGradeContainerInRankPart = myRankContainer.querySelector(".rankerInfoContainer_battleGradeContainer");
const goodsContainer = document.querySelector(".goodsContainer");
const myGoldValueContainer = goodsContainer.querySelector(".goldContainer_goldValueContainer");
const myJadeValueContainer = goodsContainer.querySelector(".jadeContainer_jadeValueContainer");
const myScrollValueContainer = goodsContainer.querySelector(".scrollContainer_scrollValueContainer");
const mySpiritValueContainer = goodsContainer.querySelector(".spiritContainer_spiritValueContainer");
const menuBtnContainer = document.querySelector(".menuBtnContainer");
const menuBtns = menuBtnContainer.querySelectorAll(".menuBtn");
// profileModal
const outOfProfileModal = document.querySelector("#outOfProfileModal");
const profileModal = document.querySelector("#profileModal");
const profileModalCloseBtn = profileModal.querySelector(".modal_closeBtn");
const profileImgListWrapper = profileModal.querySelector(".profileImgListWrapper");
const profileModalAnimalImgs = profileImgListWrapper.querySelectorAll(".profileImgList_profileImg");
const profileImgSetBtn = profileModal.querySelector(".profileImgSetter_setBtn");
const profileModalUserNameContainer = profileModal.querySelector("#profileSetter_userNameContainer");
const nickChangeBtn = profileModal.querySelector("#nickChangeBtn");
const profileModalIdContainer = profileModal.querySelector("#profileSetter_idContainer");
const profileModalPasswordContainer = profileModal.querySelector("#profileSetter_passwordContainer");
const passwordChangeBtn = profileModal.querySelector("#passwordChangeBtn");
const profileModalCashCodeContainer = profileModal.querySelector("#profileSetter_cashCodeContainer");
// loadModal, alertModal
const alertModal = document.querySelector(".alertModal");
const OutOfAlertModal = document.querySelector(".OutOfAlertModal");
const loadingShower = document.querySelector(".loadingShower");
const outOfLoadingShower = document.querySelector(".outOfLoadingShower");
// common
const animalsTypeList = [
    "rat",
    "cow",
    "tiger",
    "rabbit",
    "snake",
    "horse",
    "goat",
    "monkey",
    "chicken",
    "dog",
    "pig",
];
const animalNameList = [
    [
        "babyRat",
        "calf",
        "babyTiger",
        "babyRabbit",
        "babySnake",
        "foal",
        "kid",
        "babyMonkey",
        "chick",
        "pup",
        "piglet",
    ],
    animalsTypeList,
    [
        "trick",
        "madCow",
        "sahobum",
        "sinmyo",
        "bigSnake",
        "redClayHorse",
        "choa",
        "sahonab",
        "fightChicken",
        "wolf",
        "boar",
    ],
    [
        "brain",
        "unDead",
        "bigTiger",
        "doky",
        "imoogi",
        "skyHorse",
        "suho",
        "sahonabHead",
        "phoenix",
        "wolfHead",
        "boarHead",
    ],
    [
        "blackDragon",
        "first",
        "whiteTiger",
        "moonRabbit",
        "hyeonmu",
        "blueDragon",
        "blackTiger",
        "wukong",
        "jujak",
        "corruption",
        "greed",
    ],
];
const animalKorNameList = [
    [
        "새끼 쥐",
        "송아지",
        "새끼 호랑이",
        "새끼 토끼",
        "새끼 뱀",
        "망아지",
        "새끼 염소",
        "새끼 원숭이",
        "병아리",
        "강아지",
        "새끼 돼지",
    ],
    [
        "쥐",
        "소",
        "호랑이",
        "토끼",
        "뱀",
        "말",
        "염소",
        "원숭이",
        "닭",
        "개",
        "돼지",
    ],
    [
        "꾀",
        "광우",
        "사호범",
        "신묘",
        "구렁이",
        "적마",
        "초아",
        "사호납",
        "투계",
        "늑대",
        "멧돼지",
    ],
    [
        "꾼",
        "불사",
        "대호",
        "도끼",
        "이무기",
        "천마",
        "수호",
        "대장 사호납",
        "봉황",
        "대장 늑대",
        "대장 멧돼지",
    ],
    [
        "흑룡",
        "처손",
        "백호",
        "달토끼",
        "현무",
        "청룡",
        "흑호",
        "제천대성",
        "주작",
        "타락",
        "탐욕",
    ],
];
const animalGradeNameList = [
    "baby",
    "small",
    "beast",
    "mysteriousCreature",
    "monarch",
];
const animalGradeKorNameList = ["새끼", "미물", "야수", "영물", "군주"];
const animalSkillInfoList = [
    "공격 대상 기준 좁은 범위 내에 있는 모든 적들에게 (공격력 * ([2] ~ [40])%) 피해를 준다.",
    "10번째 공격마다 5초동안 주위 아군들의 공격력을 (공격력 * [10]%) 증가시킨다.",
    "10번째 공격마다 공격 대상 기준 넓은 범위 내에 있는 모든 적들에게 (공격력 * [40]%) 피해를 주고, [0.1]초동안 기절시킨다",
    "10번째 공격마다 5초동안 주위 아군들의 공격속도를 (공격속도 * [10]%) 증가시킨다.",
    "10번째 공격마다 공격 대상 기준 넓은 범위 내에 있는 모든 적들에게 (공격력 * [50]%) 피해를 준다.",
    "공격 대상 기준 좁은 범위 내에 있는 모든 적들에게 (공격력 * [20]%) 피해를 준다.",
    "주위 적들의 이동속도를 [12.5]% 감소시킨다. (영물 이상 등급: 이동속도 감소 효과 개별 육성 * 0.1% 만큼 추가)",
    "10번째 공격마다 공격 대상 기준 넓은 범위 내에 있는 모든 적들에게 (공격력 * [10]%) 피해를 주고, [0.4]초동안 기절시킨다",
    "10번째 공격마다 공격 대상에게 (공격력 * [325]%) 피해를 주고, [0.75]초동안 기절시킨다.",
    "10번째 공격마다 공격 대상에게 (공격력 * [350]%) 피해를 주고, [0.5]초동안 기절시킨다.",
    "3번째 공격마다 [2] 골드를 얻고, 300번째 공격마다 옥 [2]개를 얻는다. (전투 승리 한정 수령 / 영물 이상 등급: 옥 획득 필요 공격 개별 육성 * 1만큼 감소)",
];
const monarchAnimalExtraSkillInfoList = [
    "해당 스킬 100번째 발동마다 (공격력 * 4,000%) 추가 피해를 준다.",
    "해당 스킬 10번째 발동마다 모든 아군을 대상으로 한다.",
    "해당 스킬 10번째 발동마다 기절 지속시간을 1초 증가시키고, (공격력 * 1400%) 추가 피해를 준다.",
    "해당 스킬 10번째 발동마다 모든 아군을 대상으로 한다.",
    "해당 스킬 10번째 발동마다 (공격력 * 2,000%) 추가 피해를 준다.",
    "해당 스킬 20번째 발동마다 (공격력 * 800%) 추가 피해를 준다.",
    "주위 적들의 이동 속도를 20% 추가 감소시킨다. (보스 저항 무시)",
    "해당 스킬 10번째 발동마다 기절 지속시간을 2초 증가시키고, (공격력 * 800%) 추가 피해를 준다.",
    "해당 스킬 2번째 발동마다 (공격력 * 1600%) 추가 피해를 준다.",
    "보스 공격 시마다 (공격력 * 200%) 추가 피해를 준다. (보스 저항 무시)",
    "(총 공격횟수 * 0.01)% 확률로 영혼 1개를 얻는다. (전투 승리 한정 수령)",
];
let myUserData = {
    nick: "",
    loginId: "",
    profileAnimal: "",
    level: 0,
    exp: 0,
    gold: 0,
    jade: 0,
    spirit: 0,
    scroll: 0,
    arrangement: "",
    highestBattleGrade: 0,
    battleInfo: "",
    cashCode: null,
    chargeCash: 0,
    chargeTime: 0,
    fewScrollPurchaseTime: 0,
    manyScrollPurchaseTime: 0,
    fewSpiritPurchaseTime: 0,
    manySpiritPurchaseTime: 0,
};
let myAnimalsInfoData = {
    babies: "",
    smalls: "",
    beasts: "",
    mysteriousCreatures: "",
    monarchs: "",
    gradeUpgrade: "",
    mysteriousCreatureEachUpgrade: "",
    monarchEachUpgrade: "",
};
let myAchivementData = {
    dailyBattleWinCounter: 0,
    dailyBattleWinRewardOrNot: false,
    dailyAnimalSummonCounter: 0,
    dailyAnimalSummonRewardOrNot: false,
    dailyTargetTime: 0,
    weeklyBattleWinCounter: 0,
    weeklyBattleWinRewardOrNot: false,
    weeklyAnimalSummonCounter: 0,
    weeklyAnimalSummonRewardOrNot: false,
    weeklyTargetTime: 0,
    gradeUpgradeRewardOrNot: "",
    mysteriousCreatureEachUpgradeRewardOrNot: "",
    monarchEachUpgradeRewardOrNot: "",
    allBabiesGetOrNot: "",
    allSmallsGetOrNot: "",
    allBeastsGetOrNot: "",
    allMysteriousCreaturesGetOrNot: "",
    allMonarchsGetOrNot: "",
    allAnimalsRewardOrNot: "",
    permanentBattleWin: 0,
    permanentBattleWinReward: 0,
    permanentBattlePerfectWin: 0,
    permanentBattlePerfectWinReward: 0,
};
let myPassData = [];
let myMailData = [];
let rankerArr = [];
let loadInterval = null;
let reload = false;
let currentBattleGradeGroupIndex = 1;
let animalPartMode = "normal";
let temporaryArrangement = "";
let temporaryBabies = "";
let temporarySmalls = "";
let temporaryBeasts = "";
let temporaryMysteriousCreatures = "";
let temporaryMonarchs = "";
let savedAnimal = "";
let clickInterval = null;
// common func
const alertChargeInfo = () => {
    const { chargeCash, chargeTime } = myUserData;
    const chargeDate = new Date(chargeTime);
    const collectDate = chargeDate.getUTCDay() === 6
        ? new Date(chargeTime + 86400000 * 9)
        : chargeDate.getUTCDay() === 0
            ? new Date(chargeTime + 86400000 * 8)
            : new Date(chargeTime + 86400000 * 7);
    const UTCYear = collectDate.getUTCFullYear();
    const UTCMonth = collectDate.getUTCMonth() + 1;
    const UTCDate = collectDate.getUTCDate();
    alertByModal(`이전 옥 충전의 회수 작업이 아직 진행되지 않았습니다! ${UTCYear}. ${UTCMonth}. ${UTCDate}. 오후 1-3시에 ${(chargeCash / 10).toLocaleString("ko-KR")} 옥 회수할 예정으로, 옥 회수가 아닌 입금으로 진행하고 싶은 경우, 오후 1시 이전에 입금 부탁드립니다. 아직 입금을 진행하지 않은 경우, 문의메뉴에 있는 계좌로 ${chargeCash.toLocaleString("ko-KR")}원 입금 부탁드립니다. 입금하실 때, '홈-프로필 관리'의 캐시코드를 '받는 분 표시'란에 꼭 입력하셔야 합니다.`);
};
const checkLoginCode = async () => {
    try {
        const loginCode = localStorage.getItem("LOGIN_CODE");
        if (!loginCode) {
            location.href = "/login";
            return;
        }
        showLoading();
        const res = await axios.default.post("/auth/checkLoginCode", {
            path: "home",
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
            location.href = "/login";
        }
        const { newLoginCode, userData, animalsInfoData, achivementData, passData, } = data;
        localStorage.setItem("LOGIN_CODE", newLoginCode);
        myUserData = userData;
        myAnimalsInfoData = animalsInfoData;
        myAchivementData = achivementData;
        myPassData = passData;
        // start func
        putAnimalsInBattleZone(myUserData.arrangement);
        putMyUserData();
        putMyAnimalsInAnimalPart();
        putMyAnimalUpgradeInfo();
        putMyAchivementInfo();
        putMyPassInfo();
        putMyShopInfo();
        putMyGoods();
        menuBtns[0].style.fontWeight = "900";
        if (myUserData.cashCode) {
            alertChargeInfo();
        }
        putMyMails();
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 재접속합니다!");
    }
};
const formatNumber = (num) => {
    if (num >= 1e12) {
        return (Math.floor(num / 1e11) / 10).toFixed(1) + "t";
    }
    if (num >= 1e9) {
        return (Math.floor(num / 1e8) / 10).toFixed(1) + "b";
    }
    if (num >= 1e6) {
        return (Math.floor(num / 1e5) / 10).toFixed(1) + "m";
    }
    if (num >= 1e3) {
        return (Math.floor(num / 1e2) / 10).toFixed(1) + "k";
    }
    return num.toString();
};
const getAttackSpeedBasicNumber = (num) => {
    return [2, 9, 6, 1, 5, 8, 7, 4, 0, 3, 10][num];
};
const getAnimalCombineInfoList = (grade, typeNumber) => {
    const animalCombineInfoList = [];
    const { babies, smalls, beasts, mysteriousCreatures } = myAnimalsInfoData;
    const targetGradeAnimalAmountList = [
        babies,
        smalls,
        beasts,
        mysteriousCreatures,
    ][grade].split("/");
    for (let i = 0; i < 4; i++) {
        const ingredientTypeNumber = [
            [0, 3, 4, 6],
            [1, 0, 2, 10],
            [2, 1, 7, 9],
            [3, 4, 5, 7],
            [4, 6, 8, 10],
            [5, 1, 4, 8],
            [6, 2, 5, 9],
            [7, 0, 6, 8],
            [8, 3, 5, 10],
            [9, 1, 2, 3],
            [10, 0, 7, 9],
        ][typeNumber][i];
        const amounts = Number(targetGradeAnimalAmountList[ingredientTypeNumber]);
        animalCombineInfoList.push({
            grade,
            typeNumber: ingredientTypeNumber,
            amounts,
            neededAmounts: i === 0 ? 3 : 1,
        });
    }
    return animalCombineInfoList;
};
const getAnimalIndexByZoneNumber = (zoneNumber) => {
    const y = Number(`${zoneNumber}`[0]);
    const x = Number(`${zoneNumber}`[1]);
    const imgIndex = [1, 2, 4, 5, 7, 8].indexOf(y) * 6 + [1, 2, 4, 5, 7, 8].indexOf(x);
    return imgIndex;
};
const changeGoodsValue = (type, value) => {
    switch (type) {
        case "gold": {
            myUserData.gold += value;
            myGoldValueContainer.innerText = formatNumber(myUserData.gold);
            break;
        }
        case "jade": {
            myUserData.jade += value;
            myJadeValueContainer.innerText = myUserData.jade.toLocaleString("ko-KR");
            break;
        }
        case "scroll": {
            myUserData.scroll += value;
            myScrollValueContainer.innerText = formatNumber(myUserData.scroll);
            break;
        }
        case "spirit": {
            myUserData.spirit += value;
            mySpiritValueContainer.innerText =
                myUserData.spirit.toLocaleString("ko-KR");
            break;
        }
    }
};
const getAnimalSkillInfo = (grade, typeNumber) => {
    let animalSkillInfo = animalSkillInfoList[typeNumber].replace(/\[([0-9\.]+)\]/g, function (match, num) {
        return `${[0, 0.5, 1, 2, 4][grade] * Number(num)}`;
    });
    animalSkillInfo = `${animalSkillInfo}${grade === 4 ? `\n\n${monarchAnimalExtraSkillInfoList[typeNumber]}` : ""}`;
    return animalSkillInfo;
};
// common html func
const updateImgSrc = (img, name, folder) => {
    img.src = `/images/${folder ? `${folder}/` : ""}${name}.png`;
};
const scrollHorizontally = (event) => {
    event.preventDefault();
    const wrapper = event.currentTarget;
    const delta = event.deltaY >= 0 ? 1 : -1;
    wrapper.scrollLeft += delta * 40;
};
// battleZone func
const putAnimalsInBattleZone = (arrangement) => {
    battleZoneAnimalImgs.forEach((img) => {
        updateImgSrc(img, "noImg");
    });
    const arrangementInfoArr = arrangement.split("/");
    arrangementInfoArr.forEach((arrangeInfo, index) => {
        if (arrangeInfo === "0") {
            return;
        }
        const dividerIndex = arrangeInfo.indexOf("_");
        const animalGrade = Number(arrangeInfo.slice(0, dividerIndex));
        const animalTypeIndex = Number(arrangeInfo.slice(dividerIndex + 1));
        updateImgSrc(battleZoneAnimalImgs[index], `${animalNameList[animalGrade][animalTypeIndex]}`, "animals");
    });
};
const clickBattleZone = (event) => {
    if (loadInterval ||
        animalPartMode !== "arrange" ||
        animalPart.style.display !== "flex") {
        return;
    }
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;
    let coordX = Math.floor((offsetX / battleZoneWrapper.offsetWidth) * 6);
    let coordY = Math.floor((offsetY / battleZoneWrapper.offsetHeight) * 6);
    coordX = coordX === 6 ? 5 : coordX;
    coordY = coordY === 6 ? 5 : coordY;
    const targetZoneNumber = [1, 2, 4, 5, 7, 8][coordY] * 10 + [1, 2, 4, 5, 7, 8][coordX];
    const { arrangement } = myUserData;
    const arrangementInfoArr = arrangement.split("/");
    const targetZoneIndex = getAnimalIndexByZoneNumber(targetZoneNumber);
    const targetZoneInfo = arrangementInfoArr[targetZoneIndex];
    if (targetZoneInfo !== "0") {
        updateImgSrc(battleZoneAnimalImgs[targetZoneIndex], "noImg");
        arrangementInfoArr[targetZoneIndex] = "0";
        const targetZoneInfoArr = targetZoneInfo.split("_");
        const targetZoneAnimalGrade = Number(targetZoneInfoArr[0]);
        const targetZoneAnimalTypeNumber = Number(targetZoneInfoArr[1]);
        const { babies, smalls, beasts, mysteriousCreatures, monarchs } = myAnimalsInfoData;
        const targetGradeAnimalsInfoArr = [
            babies,
            smalls,
            beasts,
            mysteriousCreatures,
            monarchs,
        ][targetZoneAnimalGrade].split("/");
        targetGradeAnimalsInfoArr[targetZoneAnimalTypeNumber] = `${Number(targetGradeAnimalsInfoArr[targetZoneAnimalTypeNumber]) + 1}`;
        switch (targetZoneAnimalGrade) {
            case 0: {
                myAnimalsInfoData.babies = targetGradeAnimalsInfoArr.join("/");
                break;
            }
            case 1: {
                myAnimalsInfoData.smalls = targetGradeAnimalsInfoArr.join("/");
                break;
            }
            case 2: {
                myAnimalsInfoData.beasts = targetGradeAnimalsInfoArr.join("/");
                break;
            }
            case 3: {
                myAnimalsInfoData.mysteriousCreatures =
                    targetGradeAnimalsInfoArr.join("/");
                break;
            }
            case 4: {
                myAnimalsInfoData.monarchs = targetGradeAnimalsInfoArr.join("/");
                break;
            }
        }
        const originAnimalContainer = document.getElementById(targetZoneInfo);
        const originAnimalAmountsContainer = originAnimalContainer.querySelector(".animalList_animalAmountContainer");
        originAnimalAmountsContainer.innerText = `${Number(originAnimalAmountsContainer.innerText) + 1}`;
    }
    if (savedAnimal !== "") {
        arrangementInfoArr[targetZoneIndex] = savedAnimal;
        const savedAnimalInfoArr = savedAnimal.split("_");
        const savedAnimalGrade = Number(savedAnimalInfoArr[0]);
        const savedAnimalTypeNumber = Number(savedAnimalInfoArr[1]);
        updateImgSrc(battleZoneAnimalImgs[targetZoneIndex], animalNameList[savedAnimalGrade][savedAnimalTypeNumber], "animals");
        const { babies, smalls, beasts, mysteriousCreatures, monarchs } = myAnimalsInfoData;
        const targetGradeAnimalsInfoArr = [
            babies,
            smalls,
            beasts,
            mysteriousCreatures,
            monarchs,
        ][savedAnimalGrade].split("/");
        targetGradeAnimalsInfoArr[savedAnimalTypeNumber] = `${Number(targetGradeAnimalsInfoArr[savedAnimalTypeNumber]) - 1}`;
        switch (savedAnimalGrade) {
            case 0: {
                myAnimalsInfoData.babies = targetGradeAnimalsInfoArr.join("/");
                break;
            }
            case 1: {
                myAnimalsInfoData.smalls = targetGradeAnimalsInfoArr.join("/");
                break;
            }
            case 2: {
                myAnimalsInfoData.beasts = targetGradeAnimalsInfoArr.join("/");
                break;
            }
            case 3: {
                myAnimalsInfoData.mysteriousCreatures =
                    targetGradeAnimalsInfoArr.join("/");
                break;
            }
            case 4: {
                myAnimalsInfoData.monarchs = targetGradeAnimalsInfoArr.join("/");
                break;
            }
        }
        const savedAnimalContainer = document.getElementById(savedAnimal);
        const savedAnimalAmountsContainer = savedAnimalContainer.querySelector(".animalList_animalAmountContainer");
        savedAnimalAmountsContainer.innerText = `${Number(savedAnimalAmountsContainer.innerText) - 1}`;
    }
    battleZoneAnimalImgs.forEach((img) => {
        img.style.backgroundColor = "white";
    });
    myUserData.arrangement = arrangementInfoArr.join("/");
    savedAnimal = "";
};
// homePart func
const putMyUserData = () => {
    const { nick, loginId, profileAnimal, level, exp, highestBattleGrade, battleInfo, cashCode, } = myUserData;
    const { permanentBattlePerfectWin } = myAchivementData;
    updateImgSrc(profileImg, profileAnimal, "animals");
    userNameContainer.innerText = nick;
    profileModalUserNameContainer.value = nick;
    profileModalIdContainer.value = loginId;
    profileModalCashCodeContainer.value = cashCode ? cashCode : "";
    levelContainer.innerText = `LV. ${level}`;
    const expToLevelUp = 2 ** (Math.ceil(level / 10) - 1) * level * 100;
    const expPercent = ((exp / expToLevelUp) * 100).toFixed(2);
    expBar.style.width = `${expPercent}%`;
    expInfoContainer.innerText = `${exp} (${expPercent}%)`;
    const highestBattleGradeUnder100 = highestBattleGrade % 100;
    currentBattleGradeGroupIndex = permanentBattlePerfectWin + 1;
    let stars = 0;
    Array.from(battleInfo).forEach((star, index) => {
        const starAmounts = Number(star);
        stars += starAmounts;
        battleGradeStarContainers[index].innerText = "⭐".repeat(starAmounts);
    });
    battleGradeTotalInfoContainer.innerText = `${currentBattleGradeGroupIndex}단계 (${stars}⭐)`;
    const battleGradeListWidth = battleGradeList.getBoundingClientRect().width;
    battleGradeListWrapper.scrollLeft +=
        battleGradeListWidth * ((highestBattleGradeUnder100 - 4) / 100);
    battleGrades[highestBattleGradeUnder100].click();
};
const clickBattleGrade = (event) => {
    if (loadInterval)
        return;
    const target = event.currentTarget;
    const targetIndex = Array.from(battleGrades).indexOf(target);
    const { battleInfo } = myUserData;
    const { permanentBattlePerfectWin } = myAchivementData;
    if (currentBattleGradeGroupIndex === permanentBattlePerfectWin + 1 &&
        targetIndex > 0 &&
        !battleInfo[targetIndex - 1]) {
        return;
    }
    battleGrades.forEach((battleGrade) => {
        battleGrade.classList.remove("targetBattleGrade");
    });
    const gradeInfoContainer = target.querySelector(".battleGrade_gradeInfoContainer");
    target.classList.add("targetBattleGrade");
    const enemyGradeSetCondition = Math.ceil(Math.sqrt(currentBattleGradeGroupIndex));
    const enemyGrade = enemyGradeSetCondition <= 100
        ? enemyGradeSetCondition <= 10
            ? enemyGradeSetCondition === 1
                ? 0
                : 1
            : 2
        : 3;
    const currentDetailGrade = Number(gradeInfoContainer.innerText);
    const currentGrade = (currentBattleGradeGroupIndex - 1) * 100 + currentDetailGrade;
    const enemyTypeIndex = currentDetailGrade % 11 === 0 ? 10 : (currentDetailGrade % 11) - 1;
    updateImgSrc(battleEnemyImg, animalNameList[enemyGrade][enemyTypeIndex], "animals");
    battleEnemyInfo.innerText = `${animalKorNameList[enemyGrade][enemyTypeIndex]}\n\nHP: ${formatNumber(Math.ceil(currentGrade / 10) * currentGrade * 200)}`;
    updateImgSrc(battleBossImg, animalNameList[enemyGrade + 1][enemyTypeIndex], "animals");
    battleBossInfo.innerText = `${animalKorNameList[enemyGrade + 1][enemyTypeIndex]}\n\nHP: ${formatNumber(Math.ceil(currentGrade / 10) * currentGrade * 2500)}`;
    const starContainer = target.querySelector(".battleGrade_starContainer");
    const stars = starContainer.innerText === "⭐⭐⭐"
        ? 3
        : starContainer.innerText === "⭐⭐"
            ? 2
            : starContainer.innerText === "⭐"
                ? 1
                : 0;
    battleRewardContainers.forEach((rewardContainer) => {
        rewardContainer.style.display = "flex";
    });
    battleRewardContainers.forEach((rewardContainer, index) => {
        if (index <= 1)
            return;
        if (stars === 3) {
            rewardContainer.style.display = "none";
        }
        else if (stars === 2) {
            if (index < 4) {
                rewardContainer.style.display = "none";
            }
        }
        else if (stars === 1) {
            if (index < 3) {
                rewardContainer.style.display = "none";
            }
        }
    });
    battleRewardAmountContainers.forEach((amountContainer, index) => {
        if (index >= 2)
            return;
        amountContainer.innerText = formatNumber([currentGrade * 10, currentGrade * 20][index]);
    });
    consumeScrollValueContainer.innerText = formatNumber((Math.ceil(currentGrade / 20) + 1) * 5);
    if (stars === 3) {
        sweepBtn.style.display = "block";
    }
    else {
        sweepBtn.style.display = "none";
    }
};
const clickProfileManageBtn = () => {
    if (loadInterval)
        return;
    outOfProfileModal.style.display = "block";
    profileModal.style.display = "flex";
    const { profileAnimal } = myUserData;
    let grade = 0;
    let typeNumber = 0;
    let profileModalAnimalImgIndex = 0;
    for (let i = 0; i < 55; i++) {
        const animalName = animalNameList[Math.floor(i / 11)][i % 11];
        if (profileAnimal === animalName) {
            grade = Math.floor(i / 11);
            typeNumber = i % 11;
            profileModalAnimalImgIndex = i;
            break;
        }
    }
    const chosenProfileImg = profileImgListWrapper.querySelector(".chosenProfileImg");
    if (chosenProfileImg) {
        chosenProfileImg.classList.remove("chosenProfileImg");
    }
    profileModalAnimalImgs[profileModalAnimalImgIndex].classList.add("chosenProfileImg");
};
const clickBattleGradeMoveBtn = (direction) => () => {
    if (loadInterval)
        return;
    const { permanentBattlePerfectWin } = myAchivementData;
    if (permanentBattlePerfectWin < 1)
        return;
    if ((["leftEnd", "left"].includes(direction) &&
        currentBattleGradeGroupIndex === 1) ||
        (["right", "rightEnd"].includes(direction) &&
            currentBattleGradeGroupIndex === permanentBattlePerfectWin + 1)) {
        return;
    }
    let stars = 300;
    const { battleInfo } = myUserData;
    switch (direction) {
        case "leftEnd": {
            currentBattleGradeGroupIndex = 1;
            battleGradeStarContainers.forEach((starContainer) => {
                starContainer.innerText = "⭐⭐⭐";
            });
            break;
        }
        case "left": {
            currentBattleGradeGroupIndex -= 1;
            battleGradeStarContainers.forEach((starContainer) => {
                starContainer.innerText = "⭐⭐⭐";
            });
            break;
        }
        case "right": {
            if (currentBattleGradeGroupIndex === permanentBattlePerfectWin) {
                stars = 0;
                battleGradeStarContainers.forEach((starContainer) => {
                    starContainer.innerText = "";
                });
                Array.from(battleInfo).forEach((star, index) => {
                    const starAmounts = Number(star);
                    stars += starAmounts;
                    battleGradeStarContainers[index].innerText = "⭐".repeat(starAmounts);
                });
            }
            else {
                battleGradeStarContainers.forEach((starContainer) => {
                    starContainer.innerText = "⭐⭐⭐";
                });
            }
            currentBattleGradeGroupIndex += 1;
            break;
        }
        case "rightEnd": {
            stars = 0;
            battleGradeStarContainers.forEach((starContainer) => {
                starContainer.innerText = "";
            });
            Array.from(battleInfo).forEach((star, index) => {
                const starAmounts = Number(star);
                stars += starAmounts;
                battleGradeStarContainers[index].innerText = "⭐".repeat(starAmounts);
            });
            currentBattleGradeGroupIndex = permanentBattlePerfectWin + 1;
            break;
        }
    }
    battleGradeTotalInfoContainer.innerText = `${currentBattleGradeGroupIndex}단계 (${stars}⭐)`;
    const battleGradeListWidth = battleGradeList.getBoundingClientRect().width;
    battleGradeListWrapper.scrollLeft -= battleGradeListWidth;
    battleGrades[0].click();
};
const startBattle = async () => {
    if (loadInterval)
        return;
    try {
        if (myUserData.arrangement ===
            "0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0/0") {
            alertByModal("동물을 배치해주세요!");
            return;
        }
        let currentDetailGrade = 1;
        Array.from(battleGrades).some((gradeContainer) => {
            if (gradeContainer.classList.contains("targetBattleGrade")) {
                return true;
            }
            currentDetailGrade++;
        });
        const currentGrade = (currentBattleGradeGroupIndex - 1) * 100 + currentDetailGrade;
        const neededScrolls = (Math.ceil(currentGrade / 20) + 1) * 5;
        if (myUserData.scroll < neededScrolls) {
            return;
        }
        showLoading();
        const loginCode = localStorage.getItem("LOGIN_CODE");
        const res = await axios.default.post("/battle/startBattle", {
            loginCode,
            currentBattleGradeGroupIndex,
            currentDetailGrade,
        });
        stopLoading();
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
            throw new Error();
        }
        location.href = `/battle/${currentGrade}`;
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 로그아웃됩니다!");
    }
};
const sweep = async () => {
    if (loadInterval)
        return;
    try {
        let currentDetailGrade = 1;
        Array.from(battleGrades).some((gradeContainer) => {
            if (gradeContainer.classList.contains("targetBattleGrade")) {
                return true;
            }
            currentDetailGrade++;
        });
        const currentGrade = (currentBattleGradeGroupIndex - 1) * 100 + currentDetailGrade;
        const neededScrolls = (Math.ceil(currentGrade / 20) + 1) * 5;
        if (myUserData.scroll < neededScrolls) {
            return;
        }
        showLoading();
        const loginCode = localStorage.getItem("LOGIN_CODE");
        const res = await axios.default.post("/battle/sweep", {
            loginCode,
            currentBattleGradeGroupIndex,
            currentDetailGrade,
        });
        stopLoading();
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
            throw new Error();
        }
        const { userData, achivementData } = data;
        const { level, exp, gold, jade, scroll, spirit } = userData;
        const { dailyBattleWinCounter, dailyBattleWinRewardOrNot, dailyTargetTime, weeklyBattleWinCounter, weeklyBattleWinRewardOrNot, weeklyTargetTime, } = achivementData;
        myUserData.level = level;
        myUserData.exp = exp;
        myUserData.gold = gold;
        myUserData.jade = jade;
        myUserData.scroll = scroll;
        myUserData.spirit = spirit;
        levelContainer.innerText = `LV. ${level}`;
        const expToLevelUp = 2 ** (Math.ceil(level / 10) - 1) * level * 100;
        const expPercent = ((exp / expToLevelUp) * 100).toFixed(2);
        expBar.style.width = `${expPercent}%`;
        expInfoContainer.innerText = `${exp} (${expPercent}%)`;
        putMyGoods();
        for (let i = 0; i < 4; i++) {
            passScrollRewardAmountContainers[i].innerText = formatNumber([10, 3, 6, 9][i] * (3 + level));
        }
        putMyShopInfo();
        myAchivementData.dailyBattleWinCounter = dailyBattleWinCounter;
        myAchivementData.dailyBattleWinRewardOrNot = dailyBattleWinRewardOrNot;
        myAchivementData.dailyTargetTime = dailyTargetTime;
        myAchivementData.weeklyBattleWinCounter = weeklyBattleWinCounter;
        myAchivementData.weeklyBattleWinRewardOrNot = weeklyBattleWinRewardOrNot;
        myAchivementData.weeklyTargetTime = weeklyTargetTime;
        putMyAchivementInfo();
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 로그아웃됩니다!");
    }
};
// animalPart func
const putMyAnimalsInAnimalPart = () => {
    const { babies, smalls, beasts, mysteriousCreatures, monarchs } = myAnimalsInfoData;
    [babies, smalls, beasts, mysteriousCreatures, monarchs].forEach((gradeAnimalsAmountInfo, gradeIndex) => {
        const gradeAnimalsAmountArr = gradeAnimalsAmountInfo.split("/");
        gradeAnimalsAmountArr.forEach((amountStr, typeIndex) => {
            animalPartAnimalAmountContainers[gradeIndex * 11 + typeIndex].innerText = amountStr;
        });
    });
};
const clickAnimalPartAnimalImgContainer = (event) => {
    if (loadInterval)
        return;
    const target = event.currentTarget;
    const targetId = target.id;
    const underBarIndex = targetId.indexOf("_");
    const targetGrade = Number(targetId.slice(0, underBarIndex));
    const targetTypeNumber = Number(targetId.slice(underBarIndex + 1));
    const targetAmountContainer = target.querySelector(".animalList_animalAmountContainer");
    const targetAmounts = Number(targetAmountContainer.innerText);
    switch (animalPartMode) {
        case "normal": {
            updateImgSrc(animalSpecificPartAnimalImg, animalNameList[targetGrade][targetTypeNumber], "animals");
            animalSpecificPartAnimalGrade.classList.remove("babyGradeSpan", "smallGradeSpan", "beastGradeSpan", "mysteriousCreatureGradeSpan", "monarchGradeSpan");
            animalSpecificPartAnimalGrade.classList.add(`${animalGradeNameList[targetGrade]}GradeSpan`);
            animalSpecificPartAnimalGrade.innerText = `[${animalGradeKorNameList[targetGrade]}]`;
            animalSpecificPartAnimalName.innerText =
                animalKorNameList[targetGrade][targetTypeNumber];
            animalSpecificPartAnimalAmountContainer.innerText = `(${targetAmounts})`;
            const { gradeUpgrade, mysteriousCreatureEachUpgrade, monarchEachUpgrade, } = myAnimalsInfoData;
            const basisDPS = [60, 600, 6000, 60000, 600000][targetGrade];
            let attackSpeed = [1, 1.25, 1.875, 3, 6][targetGrade] *
                (1 - getAttackSpeedBasicNumber(targetTypeNumber) / 20);
            const basisAttackDamage = basisDPS / attackSpeed;
            if (targetGrade >= 3 && targetTypeNumber === 3) {
                attackSpeed +=
                    targetGrade === 3
                        ? 0.02 *
                            Number(mysteriousCreatureEachUpgrade.split("/")[targetTypeNumber])
                        : 0.04 * Number(monarchEachUpgrade.split("/")[targetTypeNumber]);
            }
            const targetGradeUpgrade = Number(gradeUpgrade.split("/")[targetGrade]);
            const attackDamage = Math.round(basisAttackDamage *
                (1 +
                    0.05 * targetGradeUpgrade +
                    (targetGrade < 3 || targetTypeNumber === 3
                        ? 0
                        : targetGrade === 3
                            ? 0.1 *
                                Number(mysteriousCreatureEachUpgrade.split("/")[targetTypeNumber])
                            : 0.2 * Number(monarchEachUpgrade.split("/")[targetTypeNumber]))));
            animalSpecificPartSpecContainer.innerText = `공격력: ${formatNumber(attackDamage)}\n\n공격속도: ${attackSpeed.toFixed(2)}`;
            if (targetGrade) {
                const targetSkillInfo = getAnimalSkillInfo(targetGrade, targetTypeNumber);
                animalSpecificPartSkillInfoContainer.innerText = targetSkillInfo;
            }
            else {
                animalSpecificPartSkillInfoContainer.innerText = "";
            }
            combineInfoContainer.style.display = "none";
            if (targetGrade < 4) {
                combineInfoContainer.style.display = "flex";
                updateImgSrc(combineInfoContainerTargetImg, animalNameList[targetGrade + 1][targetTypeNumber], "animals");
                const combineInfoList = getAnimalCombineInfoList(targetGrade, targetTypeNumber);
                combineInfoList.forEach((combineInfo, index) => {
                    const { grade, typeNumber, amounts, neededAmounts } = combineInfo;
                    updateImgSrc(combineInfoContainer_ingredientImgs[index], animalNameList[grade][typeNumber], "animals");
                    ingredientImgContainer_ingredientAmountContainers[index].innerText = `(${amounts}/${neededAmounts})`;
                });
            }
            animalComprehensivePart.style.display = "none";
            animalSpecificPart.style.display = "flex";
            break;
        }
        case "arrange": {
            if (targetAmounts === 0)
                return;
            savedAnimal = targetId;
            battleZoneAnimalImgs.forEach((img) => {
                img.style.backgroundColor = "rgb(225,255,225)";
            });
        }
    }
};
const clickAnimalPartModeChangeBtn = async () => {
    if (loadInterval)
        return;
    switch (animalPartMode) {
        case "normal": {
            animalPartMode = "arrange";
            animaPartModeChangeBtn.innerText = "배치 저장";
            temporaryArrangement = myUserData.arrangement;
            temporaryBabies = myAnimalsInfoData.babies;
            temporarySmalls = myAnimalsInfoData.smalls;
            temporaryBeasts = myAnimalsInfoData.beasts;
            temporaryMysteriousCreatures = myAnimalsInfoData.mysteriousCreatures;
            temporaryMonarchs = myAnimalsInfoData.monarchs;
            break;
        }
        case "arrange": {
            try {
                animalPartMode = "normal";
                animaPartModeChangeBtn.innerText = "배치";
                battleZoneAnimalImgs.forEach((img) => {
                    img.style.backgroundColor = "white";
                });
                const { arrangement } = myUserData;
                const { babies, smalls, beasts, mysteriousCreatures, monarchs } = myAnimalsInfoData;
                showLoading();
                const loginCode = localStorage.getItem("LOGIN_CODE");
                const res = await axios.default.post("/animal/saveArrangement", {
                    loginCode,
                    arrangement,
                    animals: { babies, smalls, beasts, mysteriousCreatures, monarchs },
                });
                stopLoading();
                const { data } = res;
                const { answer } = data;
                if (answer === "error") {
                    throw new Error();
                }
            }
            catch (err) {
                stopLoading();
                reload = true;
                alertByModal("오류가 발생하여 로그아웃됩니다!");
            }
            break;
        }
    }
};
const summonAnimal = async (number) => {
    if (loadInterval)
        return;
    try {
        if (animalPartMode === "arrange") {
            alertByModal("배치 모드에서는 소환이 불가능합니다!");
            return;
        }
        const { spirit } = myUserData;
        if (spirit < number) {
            return;
        }
        loadInterval = -1;
        const loginCode = localStorage.getItem("LOGIN_CODE");
        const res = await axios.default.post("/animal/summonAnimal", {
            loginCode,
            summonAmounts: number,
        });
        loadInterval = null;
        loadInterval = -1;
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
            throw new Error();
        }
        const { newAnimals, achivementData } = data;
        changeGoodsValue("spirit", -number);
        animalListWrapper.scrollTop -= 10000;
        const { babies } = myAnimalsInfoData;
        const babiesAmountArr = babies.split("/");
        const highestSummonAmounts = Object.values(newAnimals)
            .map((amountStr) => {
            return Number(amountStr);
        })
            .reduce((origin, cur) => {
            return origin > cur ? origin : cur;
        });
        for (const animalIndexStr in newAnimals) {
            const animalIndex = Number(animalIndexStr);
            const summonAmounts = newAnimals[animalIndex];
            babiesAmountArr[animalIndex] = `${Number(babiesAmountArr[animalIndex]) + summonAmounts}`;
            const targetAnimalImgContainer = animalPartAnimalImgContainers[animalIndex];
            const targetAnimalAmountContainer = animalPartAnimalAmountContainers[animalIndex];
            const animalAmounts = newAnimals[animalIndex];
            for (let i = 0; i < animalAmounts; i++) {
                setTimeout(() => {
                    targetAnimalImgContainer.classList.add("summonedAnimalImgContainer");
                    targetAnimalAmountContainer.innerText = `${Number(targetAnimalAmountContainer.innerText) + 1}`;
                    setTimeout(() => {
                        targetAnimalImgContainer.classList.remove("summonedAnimalImgContainer");
                        if (i === highestSummonAmounts - 1) {
                            loadInterval = null;
                        }
                    }, 250);
                }, 500 * i);
            }
        }
        myAnimalsInfoData.babies = babiesAmountArr.join("/");
        myAchivementData = achivementData;
        putMyAchivementInfo();
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 로그아웃됩니다!");
    }
};
const clickAnimalSpecificPartCloseBtn = () => {
    if (loadInterval)
        return;
    animalSpecificPart.style.display = "none";
    animalComprehensivePart.style.display = "flex";
};
const combineAnimal = async () => {
    if (loadInterval)
        return;
    try {
        const targetAnimalKorName = animalSpecificPartAnimalName.innerText;
        let targetAnimalGrade = 0;
        let targetAnimalTypeNumber = 0;
        let targetFind = false;
        for (const animalKorNamesByGrade of animalKorNameList) {
            targetAnimalTypeNumber = 0;
            for (const animalKorName of animalKorNamesByGrade) {
                if (targetAnimalKorName === animalKorName) {
                    targetFind = true;
                    break;
                }
                targetAnimalTypeNumber++;
            }
            if (targetFind) {
                break;
            }
            targetAnimalGrade++;
        }
        const combineInfoList = getAnimalCombineInfoList(targetAnimalGrade, targetAnimalTypeNumber);
        for (const combineInfo of combineInfoList) {
            const { neededAmounts, amounts } = combineInfo;
            if (amounts < neededAmounts) {
                return;
            }
        }
        showLoading();
        const loginCode = localStorage.getItem("LOGIN_CODE");
        const res = await axios.default.post("/animal/combineAnimal", {
            loginCode,
            targetAnimalGrade,
            targetAnimalTypeNumber,
        });
        stopLoading();
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
            throw new Error();
        }
        const { animalsInfoData, achivementData } = data;
        myAnimalsInfoData = animalsInfoData;
        myAchivementData = achivementData;
        putMyAnimalsInAnimalPart();
        putMyAchivementInfo();
        animalPartAnimalImgContainers[targetAnimalGrade * 11 + targetAnimalTypeNumber].click();
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 로그아웃됩니다!");
    }
};
// upgradePart func
const putMyAnimalUpgradeInfo = () => {
    const { gradeUpgrade, mysteriousCreatureEachUpgrade, monarchEachUpgrade } = myAnimalsInfoData;
    const gradeUpgradeInfoArr = gradeUpgrade.split("/");
    const mysteriousCreatureEachUpgradeInfoArr = mysteriousCreatureEachUpgrade.split("/");
    const monarchEachUpgradeInfoArr = monarchEachUpgrade.split("/");
    gradeUpgradeInfoArr.forEach((gradeUpgradeInfo, index) => {
        const upgradeValue = Number(gradeUpgradeInfo);
        const upgradeValueSpan = upgradeValueSpans[index];
        const upgradeExecuterGoldValueContainer = upgradeExecuterGoldValueContainers[index];
        upgradeValueSpan.innerText = `+${upgradeValue}`;
        if (index < 4) {
            if (upgradeValue < 2 ** index * 20) {
                upgradeExecuterGoldValueContainer.innerText = `${formatNumber((upgradeValue + 1) * 10 ** index)}`;
            }
            else {
                upgradeExecuterGoldValueContainer.innerText = "최대 강화";
            }
        }
        else {
            upgradeExecuterGoldValueContainer.innerText = `${formatNumber((upgradeValue + 1) * 10000)}`;
        }
    });
    mysteriousCreatureEachUpgradeInfoArr.forEach((mysteriousCreatureUpgradeInfo, index) => {
        const realIndex = index + 5;
        const upgradeValue = Number(mysteriousCreatureUpgradeInfo);
        const upgradeValueSpan = upgradeValueSpans[realIndex];
        const upgradeExecuterGoldValueContainer = upgradeExecuterGoldValueContainers[realIndex];
        upgradeValueSpan.innerText = `+${upgradeValue}`;
        if (upgradeValue < 25) {
            upgradeExecuterGoldValueContainer.innerText = `${formatNumber((upgradeValue + 1) * 1000)}`;
        }
        else {
            upgradeExecuterGoldValueContainer.innerText = "최대 강화";
        }
    });
    monarchEachUpgradeInfoArr.forEach((monarchUpgradeInfo, index) => {
        const realIndex = index + 16;
        const upgradeValue = Number(monarchUpgradeInfo);
        const upgradeValueSpan = upgradeValueSpans[realIndex];
        const upgradeExecuterGoldValueContainer = upgradeExecuterGoldValueContainers[realIndex];
        upgradeValueSpan.innerText = `+${upgradeValue}`;
        if (upgradeValue < 50) {
            upgradeExecuterGoldValueContainer.innerText = `${formatNumber((upgradeValue + 1) * 10000)}`;
        }
        else {
            upgradeExecuterGoldValueContainer.innerText = "최대 강화";
        }
    });
};
const clickUpgradeExecuter = async (target) => {
    if (loadInterval)
        return;
    try {
        const neededGoldValueContainer = target.querySelector(".goldContainer_goldValueContainer");
        if (neededGoldValueContainer.innerText === "최대 강화") {
            return;
        }
        const executerIndex = Array.from(upgradeExecuters).indexOf(target);
        let neededGold = 0;
        const { gradeUpgrade, mysteriousCreatureEachUpgrade, monarchEachUpgrade } = myAnimalsInfoData;
        const gradeUpgradeInfoArr = gradeUpgrade.split("/");
        const mysteriousCreatureEachUpgradeInfoArr = mysteriousCreatureEachUpgrade.split("/");
        const monarchEachUpgradeInfoArr = monarchEachUpgrade.split("/");
        let upgradePart = "grade";
        let upgradeValue = 0;
        let realIndex = executerIndex;
        if (executerIndex <= 4) {
            upgradeValue = Number(gradeUpgradeInfoArr[executerIndex]);
            neededGold = (upgradeValue + 1) * 10 ** executerIndex;
        }
        else if (executerIndex <= 15) {
            upgradePart = "mysteriousCreature";
            realIndex -= 5;
            upgradeValue = Number(mysteriousCreatureEachUpgradeInfoArr[realIndex]);
            neededGold = (upgradeValue + 1) * 1000;
        }
        else {
            upgradePart = "monarch";
            realIndex -= 16;
            upgradeValue = Number(monarchEachUpgradeInfoArr[realIndex]);
            neededGold = (upgradeValue + 1) * 10000;
        }
        const { gold } = myUserData;
        if (gold < neededGold) {
            return;
        }
        loadInterval = -1;
        const loginCode = localStorage.getItem("LOGIN_CODE");
        const res = await axios.default.post("/animal/upgradeAnimal", {
            loginCode,
            upgradePart,
            upgradeIndex: realIndex,
        });
        loadInterval = null;
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
            throw new Error();
        }
        const { animalsInfoData } = data;
        myAnimalsInfoData = animalsInfoData;
        putMyAchivementInfo();
        changeGoodsValue("gold", -neededGold);
        upgradeValue++;
        if (executerIndex <= 4) {
            gradeUpgradeInfoArr[executerIndex] = `${upgradeValue}`;
            myAnimalsInfoData.gradeUpgrade = gradeUpgradeInfoArr.join("/");
        }
        else if (executerIndex <= 15) {
            mysteriousCreatureEachUpgradeInfoArr[realIndex] = `${upgradeValue}`;
            myAnimalsInfoData.mysteriousCreatureEachUpgrade =
                mysteriousCreatureEachUpgradeInfoArr.join("/");
        }
        else {
            monarchEachUpgradeInfoArr[realIndex] = `${upgradeValue}`;
            myAnimalsInfoData.monarchEachUpgrade =
                monarchEachUpgradeInfoArr.join("/");
        }
        const upgradeValueSpan = upgradeValueSpans[executerIndex];
        const upgradeExecuterGoldValueContainer = upgradeExecuterGoldValueContainers[executerIndex];
        upgradeValueSpan.innerText = `+${upgradeValue}`;
        if (executerIndex <= 3) {
            if (upgradeValue < 2 ** executerIndex * 20) {
                upgradeExecuterGoldValueContainer.innerText = `${formatNumber((upgradeValue + 1) * 10 ** executerIndex)}`;
            }
            else {
                upgradeExecuterGoldValueContainer.innerText = "최대 강화";
            }
        }
        else if (executerIndex === 4) {
            upgradeExecuterGoldValueContainer.innerText = `${formatNumber((upgradeValue + 1) * 10000)}`;
        }
        else if (executerIndex <= 15) {
            if (upgradeValue < 25) {
                upgradeExecuterGoldValueContainer.innerText = `${formatNumber((upgradeValue + 1) * 1000)}`;
            }
            else {
                upgradeExecuterGoldValueContainer.innerText = "최대 강화";
            }
        }
        else {
            if (upgradeValue < 50) {
                upgradeExecuterGoldValueContainer.innerText = `${formatNumber((upgradeValue + 1) * 10000)}`;
            }
            else {
                upgradeExecuterGoldValueContainer.innerText = "최대 강화";
            }
        }
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 로그아웃됩니다!");
    }
};
// achivementPart func
const putMyAchivementInfo = () => {
    const { gradeUpgrade, mysteriousCreatureEachUpgrade, monarchEachUpgrade } = myAnimalsInfoData;
    const { dailyBattleWinCounter, dailyBattleWinRewardOrNot, dailyAnimalSummonCounter, dailyAnimalSummonRewardOrNot, weeklyBattleWinCounter, weeklyBattleWinRewardOrNot, weeklyAnimalSummonCounter, weeklyAnimalSummonRewardOrNot, allBabiesGetOrNot, allSmallsGetOrNot, allBeastsGetOrNot, allMysteriousCreaturesGetOrNot, allMonarchsGetOrNot, allAnimalsRewardOrNot, gradeUpgradeRewardOrNot, mysteriousCreatureEachUpgradeRewardOrNot, monarchEachUpgradeRewardOrNot, permanentBattleWin, permanentBattleWinReward, permanentBattlePerfectWin, permanentBattlePerfectWinReward, } = myAchivementData;
    for (let i = 0; i < 4; i++) {
        const achivementProgressBar = achivementProgressBars[i];
        const achivementProgressInfoContainer = achivementProgressInfoContainers[i];
        const fullCounter = [3, 8, 15, 40][i];
        const currentCounter = [
            dailyBattleWinCounter,
            dailyAnimalSummonCounter,
            weeklyBattleWinCounter,
            weeklyAnimalSummonCounter,
        ][i];
        achivementProgressBar.style.width = `${(currentCounter / fullCounter) * 100}%`;
        achivementProgressInfoContainer.innerText = `${currentCounter}/${fullCounter}`;
        const rewardOrNot = [
            dailyBattleWinRewardOrNot,
            dailyAnimalSummonRewardOrNot,
            weeklyBattleWinRewardOrNot,
            weeklyAnimalSummonRewardOrNot,
        ][i];
        if (rewardOrNot) {
            const achivementRewardCompletedImg = achivementRewardCompletedImgs[i];
            achivementRewardCompletedImg.style.display = "block";
        }
    }
    for (let i = 4; i < 9; i++) {
        const achivementProgressBar = achivementProgressBars[i];
        const achivementProgressInfoContainer = achivementProgressInfoContainers[i];
        const realIndex = i - 4;
        const fullCounter = 11;
        let currentCounter = [
            allBabiesGetOrNot,
            allSmallsGetOrNot,
            allBeastsGetOrNot,
            allMysteriousCreaturesGetOrNot,
            allMonarchsGetOrNot,
        ][realIndex]
            .split("/")
            .reduce((acc, cur) => {
            return acc + Number(cur);
        }, 0);
        achivementProgressBar.style.width = `${(currentCounter / fullCounter) * 100}%`;
        achivementProgressInfoContainer.innerText = `${currentCounter}/${fullCounter}`;
        const rewardOrNot = Boolean(Number(allAnimalsRewardOrNot.split("/")[realIndex]));
        if (rewardOrNot) {
            const achivementRewardCompletedImg = achivementRewardCompletedImgs[i];
            achivementRewardCompletedImg.style.display = "block";
        }
    }
    for (let i = 9; i < 14; i++) {
        const achivementProgressBar = achivementProgressBars[i];
        const achivementProgressInfoContainer = achivementProgressInfoContainers[i];
        const realIndex = i - 9;
        const fullCounter = 2 ** realIndex * 20;
        const currentCounter = Number(gradeUpgrade.split("/")[realIndex]);
        achivementProgressBar.style.width = `${(currentCounter / fullCounter) * 100}%`;
        achivementProgressInfoContainer.innerText = `${currentCounter}/${fullCounter}`;
        const rewardOrNot = Boolean(Number(gradeUpgradeRewardOrNot.split("/")[realIndex]));
        if (rewardOrNot) {
            const achivementRewardCompletedImg = achivementRewardCompletedImgs[i];
            achivementRewardCompletedImg.style.display = "block";
        }
    }
    for (let i = 14; i < 36; i++) {
        const achivementProgressBar = achivementProgressBars[i];
        const achivementProgressInfoContainer = achivementProgressInfoContainers[i];
        let fullCounter = 25;
        let realIndex = i - 14;
        let targetCounter = mysteriousCreatureEachUpgrade;
        let targetRewardOrNot = mysteriousCreatureEachUpgradeRewardOrNot;
        if (i > 24) {
            fullCounter = 50;
            realIndex = i - 25;
            targetCounter = monarchEachUpgrade;
            targetRewardOrNot = monarchEachUpgradeRewardOrNot;
        }
        const currentCounter = Number(targetCounter.split("/")[realIndex]);
        achivementProgressBar.style.width = `${(currentCounter / fullCounter) * 100}%`;
        achivementProgressInfoContainer.innerText = `${currentCounter}/${fullCounter}`;
        const rewardOrNot = Boolean(Number(targetRewardOrNot.split("/")[realIndex]));
        if (rewardOrNot) {
            const achivementRewardCompletedImg = achivementRewardCompletedImgs[i];
            achivementRewardCompletedImg.style.display = "block";
        }
    }
    for (let i = 36; i < 38; i++) {
        const achivementProgressBar = achivementProgressBars[i];
        const achivementProgressInfoContainer = achivementProgressInfoContainers[i];
        const realIndex = i - 36;
        const achivementName = [
            permanentBattleWinAchivementName,
            permanentBattlePerfectWinAchivementName,
        ][realIndex];
        const targetAchivement = [permanentBattleWin, permanentBattlePerfectWin][realIndex];
        const targetReward = [
            permanentBattleWinReward,
            permanentBattlePerfectWinReward,
        ][realIndex];
        let targetBattleGradeGroupIndex = targetReward + 1;
        let currentCounter = 100;
        let fullCounter = 100;
        if (i === 36) {
            if (targetAchivement === targetReward) {
                targetBattleGradeGroupIndex = targetAchivement + 1;
                if (permanentBattleWin === permanentBattlePerfectWin) {
                    const { battleInfo } = myUserData;
                    const battleInfoLength = battleInfo.length;
                    currentCounter = battleInfoLength;
                }
                else {
                    currentCounter = 0;
                }
            }
        }
        else {
            fullCounter = 300;
            if (targetAchivement === targetReward) {
                targetBattleGradeGroupIndex = targetAchivement + 1;
                const { battleInfo } = myUserData;
                const totalStarAmounts = Array.from(battleInfo).reduce((acc, cur) => {
                    return acc + Number(cur);
                }, 0);
                currentCounter = totalStarAmounts;
            }
            else {
                currentCounter = 300;
            }
        }
        achivementProgressBar.style.width = `${(currentCounter / fullCounter) * 100}%`;
        achivementProgressInfoContainer.innerText = `${currentCounter}/${fullCounter}`;
        achivementName.innerText = `${targetBattleGradeGroupIndex}${["단계 모든 전투 승리", "단계 300별 획득"][realIndex]}`;
        if (fullCounter === currentCounter && targetAchivement === targetReward) {
            const achivementRewardCompletedImg = achivementRewardCompletedImgs[i];
            achivementRewardCompletedImg.style.display = "block";
        }
    }
};
const clickAchivementRewardImgContainer = async (event) => {
    if (loadInterval)
        return;
    try {
        const target = event.currentTarget;
        const completeImg = target.querySelector(".rewardImgContainer_rewardCompletedImg");
        if (completeImg.style.display === "block") {
            return;
        }
        const achivementInfoContainer = target.previousElementSibling;
        const progressBar = achivementInfoContainer.querySelector(".progressContainer_progressBar");
        if (progressBar.style.width !== "100%") {
            return;
        }
        const achivementIndex = Array.from(achivementRewardImgContainers).indexOf(target);
        showLoading();
        const loginCode = localStorage.getItem("LOGIN_CODE");
        const res = await axios.default.post("/user/receiveAchivementReward", {
            loginCode,
            achivementIndex,
        });
        stopLoading();
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
            throw new Error();
        }
        if (answer === "date changed") {
            alertByModal("업적 업데이트를 위해 재접속합니다!");
            loadInterval = 1;
            setTimeout(() => {
                location.reload();
            }, 1000);
            return;
        }
        const { achivementData } = data;
        myAchivementData = achivementData;
        putMyAchivementInfo();
        if (achivementIndex === 0) {
            myAchivementData.dailyBattleWinRewardOrNot = true;
            changeGoodsValue("spirit", 2);
        }
        else if (achivementIndex === 1) {
            myAchivementData.dailyAnimalSummonRewardOrNot = true;
            changeGoodsValue("jade", 50);
        }
        else if (achivementIndex === 2) {
            myAchivementData.weeklyBattleWinRewardOrNot = true;
            changeGoodsValue("spirit", 12);
        }
        else if (achivementIndex === 3) {
            myAchivementData.weeklyAnimalSummonRewardOrNot = true;
            changeGoodsValue("jade", 300);
        }
        else if (achivementIndex < 9) {
            const { allAnimalsRewardOrNot } = myAchivementData;
            const allAnimalsRewardInfoArr = allAnimalsRewardOrNot.split("/");
            const realIndex = achivementIndex - 4;
            allAnimalsRewardInfoArr[realIndex] = "1";
            myAchivementData.allAnimalsRewardOrNot =
                allAnimalsRewardInfoArr.join("/");
            changeGoodsValue("spirit", 6 ** realIndex * 4);
        }
        else if (achivementIndex < 14) {
            const { gradeUpgradeRewardOrNot } = myAchivementData;
            const gradeUpgradeRewardInfoArr = gradeUpgradeRewardOrNot.split("/");
            const realIndex = achivementIndex - 9;
            gradeUpgradeRewardInfoArr[realIndex] = "1";
            myAchivementData.gradeUpgradeRewardOrNot =
                gradeUpgradeRewardInfoArr.join("/");
            changeGoodsValue("gold", 40 ** realIndex * 400);
        }
        else if (achivementIndex < 25) {
            const { mysteriousCreatureEachUpgradeRewardOrNot } = myAchivementData;
            const mysteriousCreatureEachUpgradeRewardInfoArr = mysteriousCreatureEachUpgradeRewardOrNot.split("/");
            mysteriousCreatureEachUpgradeRewardInfoArr[achivementIndex - 14] = "1";
            myAchivementData.mysteriousCreatureEachUpgradeRewardOrNot =
                mysteriousCreatureEachUpgradeRewardInfoArr.join("/");
            changeGoodsValue("gold", 600000);
        }
        else if (achivementIndex < 36) {
            const { monarchEachUpgradeRewardOrNot } = myAchivementData;
            const monarchEachUpgradeRewardInfoArr = monarchEachUpgradeRewardOrNot.split("/");
            monarchEachUpgradeRewardInfoArr[achivementIndex - 25] = "1";
            myAchivementData.monarchEachUpgradeRewardOrNot =
                monarchEachUpgradeRewardInfoArr.join("/");
            changeGoodsValue("gold", 20000000);
        }
        completeImg.style.display = "block";
        if (achivementIndex === 36) {
            myAchivementData.permanentBattleWinReward++;
            const { permanentBattleWin, permanentBattleWinReward } = myAchivementData;
            if (permanentBattleWin === permanentBattleWinReward) {
                completeImg.style.display = "none";
                const targetBattleGradeGroupIndex = permanentBattleWinReward + 1;
                const fullCounter = 100;
                const { battleInfo } = myUserData;
                const battleInfoLength = battleInfo.length;
                const currentCounter = battleInfoLength;
                const achivementProgressBar = achivementProgressBars[achivementIndex];
                const achivementProgressInfoContainer = achivementProgressInfoContainers[achivementIndex];
                achivementProgressBar.style.width = `${(currentCounter / fullCounter) * 100}%`;
                achivementProgressInfoContainer.innerText = `${currentCounter}/${fullCounter}`;
                permanentBattleWinAchivementName.innerText = `${targetBattleGradeGroupIndex}단계 모든 전투 승리`;
            }
            changeGoodsValue("jade", 1000);
        }
        else if (achivementIndex === 37) {
            myAchivementData.permanentBattlePerfectWinReward++;
            const { permanentBattlePerfectWin, permanentBattlePerfectWinReward } = myAchivementData;
            if (permanentBattlePerfectWin === permanentBattlePerfectWinReward) {
                completeImg.style.display = "none";
                const targetBattleGradeGroupIndex = permanentBattlePerfectWinReward + 1;
                const fullCounter = 300;
                const { battleInfo } = myUserData;
                const totalStarAmounts = Array.from(battleInfo).reduce((acc, cur) => {
                    return acc + Number(cur);
                }, 0);
                const currentCounter = totalStarAmounts;
                const achivementProgressBar = achivementProgressBars[achivementIndex];
                const achivementProgressInfoContainer = achivementProgressInfoContainers[achivementIndex];
                achivementProgressBar.style.width = `${(currentCounter / fullCounter) * 100}%`;
                achivementProgressInfoContainer.innerText = `${currentCounter}/${fullCounter}`;
                permanentBattlePerfectWinAchivementName.innerText = `${targetBattleGradeGroupIndex}단계 모든 전투 승리`;
            }
            changeGoodsValue("jade", 2000);
        }
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 로그아웃됩니다!");
    }
};
// passPart func
const putMyPassInfo = () => {
    const basicPass = myPassData.find((pass) => {
        return pass.type === "basic";
    });
    const beastPass = myPassData.find((pass) => {
        return pass.type === "beast";
    });
    const mysteriousCreaturePass = myPassData.find((pass) => {
        return pass.type === "mysteriousCreature";
    });
    const monarchPass = myPassData.find((pass) => {
        return pass.type === "monarch";
    });
    const currentDate = new Date();
    const UTCYear = currentDate.getUTCFullYear();
    const UTCMonth = currentDate.getUTCMonth();
    const UTCDate = currentDate.getUTCDate();
    const todayStartTime = Date.UTC(UTCYear, UTCMonth, UTCDate, 0, 0, 0, 0);
    for (let i = 0; i < 4; i++) {
        const targetPass = [
            basicPass,
            beastPass,
            mysteriousCreaturePass,
            monarchPass,
        ][i];
        const { level } = myUserData;
        passScrollRewardAmountContainers[i].innerText = formatNumber([10, 3, 6, 9][i] * (3 + level));
        if (!targetPass) {
            passPartPassNames[i].innerText = `${["출석 보상", "야수 패스", "영물 패스", "군주 패스"][i]}\n\n(미보유)`;
            continue;
        }
        if (i > 0) {
            const { endTime } = targetPass;
            const endDate = new Date(endTime);
            passPartPassNames[i].innerText = `${["야수 패스", "영물 패스", "군주 패스"][i - 1]}\n\n(~${endDate.getUTCFullYear().toString().slice(2)}.${endDate.getUTCMonth() + 1}.${endDate.getUTCDate()})`;
        }
        const { lastSpiritRewardTime, lastScrollRewardTime } = targetPass;
        if (lastSpiritRewardTime >= todayStartTime) {
            const passPartRewardImgContainer = passPartRewardImgContainers[2 * i];
            const completeImg = passPartRewardImgContainer.querySelector(".rewardImgContainer_rewardCompletedImg");
            completeImg.style.display = "block";
        }
        if (lastScrollRewardTime >= todayStartTime) {
            const passPartRewardImgContainer = passPartRewardImgContainers[2 * i + 1];
            const completeImg = passPartRewardImgContainer.querySelector(".rewardImgContainer_rewardCompletedImg");
            completeImg.style.display = "block";
        }
        if (menuBtns[4].style.color !== "blue" &&
            (lastSpiritRewardTime < todayStartTime ||
                lastScrollRewardTime < todayStartTime)) {
            menuBtns[4].style.color = "blue";
        }
    }
};
const clickPassRewardImgContainer = async (event) => {
    if (loadInterval)
        return;
    try {
        const target = event.currentTarget;
        const completeImg = target.querySelector(".rewardImgContainer_rewardCompletedImg");
        if (completeImg.style.display === "block") {
            return;
        }
        const passContainer = target.parentNode;
        const passName = passContainer.querySelector(".passNameContainer_passName");
        if (passName.innerText.includes("미보유")) {
            return;
        }
        const passRewardIndex = Array.from(passPartRewardImgContainers).indexOf(target);
        const passIndex = Math.floor(passRewardIndex / 2);
        const rewardIndex = passRewardIndex % 2;
        showLoading();
        const loginCode = localStorage.getItem("LOGIN_CODE");
        const res = await axios.default.post("/user/receivePassReward", {
            loginCode,
            passIndex,
            rewardIndex,
        });
        stopLoading();
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
            throw new Error();
        }
        if (answer === "date changed") {
            alertByModal("패스 업데이트를 위해 재접속합니다!");
            loadInterval = 1;
            setTimeout(() => {
                location.reload();
            }, 1000);
            return;
        }
        const { lastTargetRewardTime } = data;
        const targetPass = myPassData.find((pass) => {
            return (pass.type ===
                ["basic", "beast", "mysteriousCreature", "monarch"][passIndex]);
        });
        switch (rewardIndex) {
            case 0: {
                changeGoodsValue("spirit", [6, 2, 4, 6][passIndex]);
                targetPass.lastSpiritRewardTime = lastTargetRewardTime;
                break;
            }
            case 1: {
                const { level } = myUserData;
                changeGoodsValue("scroll", [10, 3, 6, 9][passIndex] * (3 + level));
                targetPass.lastScrollRewardTime = lastTargetRewardTime;
                break;
            }
        }
        completeImg.style.display = "block";
        for (const pass of myPassData) {
            const currentDate = new Date();
            const UTCYear = currentDate.getUTCFullYear();
            const UTCMonth = currentDate.getUTCMonth();
            const UTCDate = currentDate.getUTCDate();
            const todayStartTime = Date.UTC(UTCYear, UTCMonth, UTCDate, 0, 0, 0, 0);
            if (pass.lastScrollRewardTime < todayStartTime ||
                pass.lastSpiritRewardTime < todayStartTime) {
                return;
            }
        }
        menuBtns[4].style.color = "black";
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 로그아웃됩니다!");
    }
};
// shopPart func
const putMyShopInfo = () => {
    const { fewScrollPurchaseTime, manyScrollPurchaseTime, fewSpiritPurchaseTime, manySpiritPurchaseTime, } = myUserData;
    const currentDate = new Date();
    const UTCYear = currentDate.getUTCFullYear();
    const UTCMonth = currentDate.getUTCMonth();
    const UTCDate = currentDate.getUTCDate();
    const todayStartTime = Date.UTC(UTCYear, UTCMonth, UTCDate, 0, 0, 0, 0);
    for (let i = 0; i < 4; i++) {
        const targetPurchaseTime = [
            fewScrollPurchaseTime,
            manyScrollPurchaseTime,
            fewSpiritPurchaseTime,
            manySpiritPurchaseTime,
        ][i];
        if (i < 2) {
            const amountContainer = shopPartGoodsAmountsContainers[i];
            const { level } = myUserData;
            amountContainer.innerText = formatNumber((3 + level) * [5, 10][i]);
        }
        if (targetPurchaseTime >= todayStartTime) {
            const completeImg = shopPartGoodsPurchaseCompletedImgs[i];
            completeImg.style.display = "block";
        }
    }
};
const clickShopPartPassContainer = async (event) => {
    if (loadInterval)
        return;
    try {
        const target = event.currentTarget;
        const passIndex = Array.from(shopPartPassContainers).indexOf(target);
        const neededJade = [400, 1200, 3600][passIndex];
        if (myUserData.jade < neededJade) {
            return;
        }
        const targetPass = myPassData.find((pass) => {
            return (pass.type === ["beast", "mysteriousCreature", "monarch"][passIndex]);
        });
        const currentDate = new Date();
        const currentTime = currentDate.getTime();
        if (targetPass && targetPass.endTime > currentTime + 86400000 * 10) {
            alertByModal("패스 연장의 경우, 잔여 유효기간이 10일 미만일 때부터 구매 가능합니다!");
            return;
        }
        showLoading();
        const loginCode = localStorage.getItem("LOGIN_CODE");
        const res = await axios.default.post("/shop/purchasePass", {
            loginCode,
            passIndex,
        });
        stopLoading();
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
            throw new Error();
        }
        if (answer === "date changed") {
            alertByModal("패스 업데이트를 위해 재접속합니다!");
            loadInterval = 1;
            setTimeout(() => {
                location.reload();
            }, 1000);
            return;
        }
        changeGoodsValue("jade", -neededJade);
        const UTCYear = currentDate.getUTCFullYear();
        const UTCMonth = currentDate.getUTCMonth();
        const UTCDate = currentDate.getUTCDate();
        const todayStartTime = Date.UTC(UTCYear, UTCMonth, UTCDate, 0, 0, 0, 0);
        if (!targetPass) {
            const { newPassCurrentTime } = data;
            myPassData.push({
                type: ["beast", "mysteriousCreature", "monarch"][passIndex],
                endTime: todayStartTime + 86400000 * 31 - 1,
                lastScrollRewardTime: todayStartTime - 1,
                lastSpiritRewardTime: todayStartTime - 1,
            });
        }
        else {
            targetPass.endTime = targetPass.endTime + 2592000000;
        }
        putMyPassInfo();
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 로그아웃됩니다!");
    }
};
const clickShopPartGoodsImgContainers = async (event) => {
    if (loadInterval)
        return;
    try {
        const target = event.currentTarget;
        const completeImg = target.querySelector(".goodsShopContainer_purchaseCompletedImg");
        if (completeImg.style.display == "block") {
            return;
        }
        const targetGoodsIndex = Array.from(shopPartGoodsImgContainers).indexOf(target);
        const neededJade = [10, 20, 100, 200][targetGoodsIndex];
        if (myUserData.jade < neededJade) {
            return;
        }
        showLoading();
        const loginCode = localStorage.getItem("LOGIN_CODE");
        const res = await axios.default.post("/shop/purchaseGoods", {
            loginCode,
            targetGoodsIndex,
        });
        stopLoading();
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
            throw new Error();
        }
        if (answer === "date changed") {
            alertByModal("재화 구매 날짜 업데이트를 위해 재접속합니다!");
            loadInterval = 1;
            setTimeout(() => {
                location.reload();
            }, 1000);
            return;
        }
        const { goodsPurchaseCurrentTime } = data;
        changeGoodsValue("jade", -neededJade);
        completeImg.style.display = "block";
        const { level } = myUserData;
        switch (targetGoodsIndex) {
            case 0: {
                myUserData.fewScrollPurchaseTime = goodsPurchaseCurrentTime;
                changeGoodsValue("scroll", 5 * level + 15);
                break;
            }
            case 1: {
                myUserData.manyScrollPurchaseTime = goodsPurchaseCurrentTime;
                changeGoodsValue("scroll", 10 * level + 30);
                break;
            }
            case 2: {
                myUserData.fewSpiritPurchaseTime = goodsPurchaseCurrentTime;
                changeGoodsValue("spirit", 5);
                break;
            }
            case 3: {
                myUserData.manySpiritPurchaseTime = goodsPurchaseCurrentTime;
                changeGoodsValue("spirit", 10);
                break;
            }
        }
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 로그아웃됩니다!");
    }
};
const clickJadeChargeValueControlBtn = (target) => {
    if (loadInterval)
        return;
    const direction = target === jadeChargeExecuterJadeUpBtn ? "up" : "down";
    const currentJadeChargeValue = Number(jadeChargeExecuterJadeValueContainer.innerText);
    if ((currentJadeChargeValue === 10000 && direction === "up") ||
        (currentJadeChargeValue === 0 && direction === "down")) {
        return;
    }
    const newJadeChargeValue = currentJadeChargeValue + (direction === "up" ? 500 : -500);
    jadeChargeExecuterJadeValueContainer.innerText = `${newJadeChargeValue}`;
    jadeChargePriceContainer.innerText = (newJadeChargeValue * 10).toLocaleString();
};
const clickJadeChargeBtn = async () => {
    if (loadInterval)
        return;
    try {
        if (myUserData.cashCode) {
            alertChargeInfo();
            return;
        }
        const currentJadeChargeValue = Number(jadeChargeExecuterJadeValueContainer.innerText);
        if (currentJadeChargeValue === 0) {
            return;
        }
        showLoading();
        const loginCode = localStorage.getItem("LOGIN_CODE");
        const res = await axios.default.post("/shop/chargeJade", {
            loginCode,
            currentJadeChargeValue,
        });
        stopLoading();
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
            throw new Error();
        }
        const { newCashCode } = data;
        changeGoodsValue("jade", currentJadeChargeValue);
        myUserData.cashCode = newCashCode;
        myUserData.chargeCash = currentJadeChargeValue * 10;
        profileModalCashCodeContainer.value = myUserData.cashCode;
        jadeChargeExecuterJadeValueContainer.innerText = "0";
        jadeChargePriceContainer.innerText = "0";
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 로그아웃됩니다!");
    }
};
// mailPart func
const putMyMails = async () => {
    try {
        showLoading();
        const loginCode = localStorage.getItem("LOGIN_CODE");
        const res = await axios.default.post("/mail/getMailInfo", {
            loginCode,
        });
        stopLoading();
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
            throw new Error();
        }
        const { mailData } = data;
        myMailData = mailData;
        const mailAmounts = myMailData.length < 5 ? 5 : myMailData.length;
        mailList.style.height = `${(mailAmounts * 4000) / 228}%`;
        for (const mail of myMailData) {
            const { id, content, expire, giftInfo } = mail;
            const giftInfoArr = giftInfo.split("/");
            const giftInfoLength = giftInfoArr.reduce((acc, cur) => {
                return acc + (cur === "0" ? 0 : 1);
            }, 0);
            const mailContainer = document.createElement("div");
            mailContainer.classList.add("mailList_mailContainer");
            mailContainer.style.width = `${44 + 12 * giftInfoLength}%`;
            mailContainer.style.height = `${3600 / (40 * mailAmounts)}%`;
            const mailIdContainer = document.createElement("div");
            mailIdContainer.style.display = "none";
            mailIdContainer.classList.add("mailContainer_mailId");
            mailIdContainer.innerText = `${id}`;
            const mailContentContainer = document.createElement("div");
            mailContentContainer.classList.add("mailContainer_mailContentContainer");
            mailContentContainer.style.width = `${2200 / (22 + 6 * giftInfoLength)}%`;
            const mailNameContainer = document.createElement("div");
            mailNameContainer.classList.add("mailContentContainer_mailNameContainer");
            mailNameContainer.innerText = `${content}`;
            const mailExpireContainer = document.createElement("div");
            mailExpireContainer.classList.add("mailContentContainer_mailExpireContainer");
            mailExpireContainer.innerText = `~${new Date(expire)
                .toLocaleString("ko-KR")
                .replaceAll(". 오후", " 오후")
                .replaceAll(". ", ".")
                .slice(2, -3)}`;
            mailContentContainer.append(mailNameContainer, mailExpireContainer);
            mailContainer.append(mailIdContainer, mailContentContainer);
            giftInfoArr.forEach((giftAmountStr, index) => {
                if (giftAmountStr === "0")
                    return;
                const giftAmounts = Number(giftAmountStr);
                const mailRewardImgContainer = document.createElement("div");
                mailRewardImgContainer.classList.add("mailContainer_rewardImgContainer");
                mailRewardImgContainer.style.width = `${600 / (22 + 6 * giftInfoLength)}%`;
                const mailRewardImg = document.createElement("img");
                mailRewardImg.classList.add("mailContainer_rewardImg");
                updateImgSrc(mailRewardImg, ["gold", "jade", "scroll", "spirit"][index]);
                const mailRewardAmountContainer = document.createElement("div");
                mailRewardAmountContainer.classList.add("mailContainer_rewardAmountContainer");
                mailRewardAmountContainer.innerText = [1, 3].includes(index) ? giftAmounts.toLocaleString('ko-KR') : formatNumber(giftAmounts);
                mailRewardImgContainer.append(mailRewardImg, mailRewardAmountContainer);
                mailContainer.append(mailRewardImgContainer);
            });
            mailContainer.addEventListener("click", clickMailContainer);
            mailList.append(mailContainer);
        }
        if(menuBtns[6].style.color !== "blue" && myMailData.length > 0){
            menuBtns[6].style.color = "blue";
          }else
        if (menuBtns[6].style.color === "blue" && myMailData.length === 0) {
            menuBtns[6].style.color = "black";
        }
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 로그아웃됩니다!");
    }
};
const clickMailContainer = async (event) => {
    if (loadInterval)
        return;
    try {
        const target = event.currentTarget;
        const mailIdContainer = target.querySelector(".mailContainer_mailId");
        const mailId = Number(mailIdContainer.innerText);
        const targetMail = myMailData.find((mail) => {
            return mail.id === mailId;
        });
        if (!targetMail || targetMail.expire < Date.now()) {
            if (targetMail) {
                const targetMailIndex = myMailData.indexOf(targetMail);
                myMailData.splice(targetMailIndex, 1);
            }
            target.removeEventListener("click", clickMailContainer);
            target.remove();
            alertByModal("유효기간이 지났거나, 이미 확인한 메일입니다!");
            return;
        }
        showLoading();
        const loginCode = localStorage.getItem("LOGIN_CODE");
        const res = await axios.default.post("/mail/checkAndReceiveMail", {
            loginCode,
            mailId,
        });
        stopLoading();
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
            throw new Error();
        }
        if (answer === "date changed") {
            alertByModal("우편 업데이트를 위해 재접속합니다!");
            loadInterval = 1;
            setTimeout(() => {
                location.reload();
            }, 1000);
            return;
        }
        const { giftInfo } = targetMail;
        const giftInfoArr = giftInfo.split("/");
        giftInfoArr.forEach((giftAmountStr, index) => {
            if (giftAmountStr === "0")
                return;
            const giftAmounts = Number(giftAmountStr);
            changeGoodsValue(["gold", "jade", "scroll", "spirit"][index], giftAmounts);
        });
        const targetMailIndex = myMailData.indexOf(targetMail);
        myMailData.splice(targetMailIndex, 1);
        target.removeEventListener("click", clickMailContainer);
        target.remove();
        if (menuBtns[6].style.color === "blue" && myMailData.length === 0) {
            menuBtns[6].style.color = "black";
        }
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 로그아웃됩니다!");
    }
};
// rankPart func
const putRankInfo = async () => {
    try {
        showLoading();
        const loginCode = localStorage.getItem("LOGIN_CODE");
        const res = await axios.default.post("/user/getRankInfo", {
            loginCode,
        });
        stopLoading();
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
            throw new Error();
        }
        const { rankerData } = data;
        rankerArr = rankerData;
        let rankerArrLength = rankerArr.length;
        rankerArrLength = rankerArrLength < 4 ? 4 : rankerArrLength;
        rankList.style.height = `${(332 * rankerArrLength) / 15}%`;
        rankContainers.forEach((rankContainer) => {
            rankContainer.style.display = "none";
        });
        rankerArr.forEach((ranker, index) => {
            const { nick, profileAnimal, level, highestBattleGrade } = ranker;
            const rankContainer = rankContainers[index];
            const rankerProfileImg = rankContainer.querySelector(".rankContainer_profileImg");
            const rankerNameContainer = rankContainer.querySelector(".rankerInfoContainer_nameContainer");
            const rankerLevelContainer = rankContainer.querySelector(".rankerInfoContainer_levelContainer");
            const rankerHighestBattleGradeContainer = rankContainer.querySelector(".rankerInfoContainer_battleGradeContainer");
            rankContainer.style.height = `${7500 / (83 * rankerArrLength)}%`;
            updateImgSrc(rankerProfileImg, profileAnimal, "animals");
            rankerNameContainer.innerText = nick;
            rankerLevelContainer.innerText = `LV. ${level}`;
            if (highestBattleGrade === 0) {
                rankerHighestBattleGradeContainer.innerText = "최고 단계: 1-0";
            }
            else if (Math.floor(highestBattleGrade / 100) ===
                highestBattleGrade / 100) {
                rankerHighestBattleGradeContainer.innerText = `최고 단계: ${highestBattleGrade / 100}-100`;
            }
            else {
                rankerHighestBattleGradeContainer.innerText = `최고 단계: ${Math.floor(highestBattleGrade / 100) + 1}-${highestBattleGrade % 100}`;
            }
            rankContainer.style.display = "flex";
        });
        const { nick, level, highestBattleGrade, profileAnimal } = myUserData;
        updateImgSrc(myProfileImgInRankPart, profileAnimal, "animals");
        myNameContainerInRankPart.innerText = nick;
        myLevelContainerInRankPart.innerText = `LV. ${level}`;
        if (highestBattleGrade === 0) {
            myHightestBattleGradeContainerInRankPart.innerText = "최고 단계: 1-0";
        }
        else if (Math.floor(highestBattleGrade / 100) ===
            highestBattleGrade / 100) {
            myHightestBattleGradeContainerInRankPart.innerText = `최고 단계: ${highestBattleGrade / 100 + 1}-100`;
        }
        else {
            myHightestBattleGradeContainerInRankPart.innerText = `최고 단계: ${Math.floor(highestBattleGrade / 100) + 1}-${highestBattleGrade % 100}`;
        }
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 로그아웃됩니다!");
    }
};
const clickWatchBtn = (event) => {
    const target = event.currentTarget;
    const rankContainer = target.parentNode;
    const rankerRankValueContainer = rankContainer.querySelector(".rankContainer_rankValueContainer");
    const rankerRankValue = Number(rankerRankValueContainer.innerText);
    const { arrangement } = rankerArr[rankerRankValue - 1];
    putAnimalsInBattleZone(arrangement);
};
// goodsContainer func
const putMyGoods = () => {
    const { gold, jade, scroll, spirit } = myUserData;
    myGoldValueContainer.innerText = formatNumber(gold);
    myJadeValueContainer.innerText = jade.toLocaleString("ko-KR");
    myScrollValueContainer.innerText = formatNumber(scroll);
    mySpiritValueContainer.innerText = spirit.toLocaleString("ko-KR");
};
// menuBtnContainer func
const clickMenuBtn = (partIndex) => () => {
    if (loadInterval)
        return;
    mainParts.forEach((mainPart) => {
        mainPart.style.display = "none";
    });
    menuBtns.forEach((menuBtn) => {
        menuBtn.style.fontWeight = "400";
    });
    if (animalSpecificPart.style.display === "flex") {
        animalSpecificPart.style.display = "none";
        animalComprehensivePart.style.display = "flex";
    }
    if (animalPartMode === "arrange") {
        myUserData.arrangement = temporaryArrangement;
        myAnimalsInfoData.babies = temporaryBabies;
        myAnimalsInfoData.smalls = temporarySmalls;
        myAnimalsInfoData.beasts = temporaryBeasts;
        myAnimalsInfoData.mysteriousCreatures = temporaryMysteriousCreatures;
        myAnimalsInfoData.monarchs = temporaryMonarchs;
        putMyAnimalsInAnimalPart();
        animalPartMode = "normal";
        animaPartModeChangeBtn.innerText = "배치";
        battleZoneAnimalImgs.forEach((img) => {
            img.style.backgroundColor = "white";
        });
    }
    putAnimalsInBattleZone(myUserData.arrangement);
    if (partIndex === 6) {
        let mailExist = mailList.childElementCount === 0 ? false : true;
        while (mailExist) {
            mailList.children[0].remove();
            if (mailList.childElementCount === 0) {
                mailExist = false;
            }
        }
        putMyMails();
    }
    else if (partIndex === 7) {
        putRankInfo();
    }
    const targetPart = mainParts[partIndex];
    targetPart.style.display = "flex";
    const targetBtn = menuBtns[partIndex];
    targetBtn.style.fontWeight = "900";
};
// profileModal
const clickProfileModalCloseBtn = () => {
    if (loadInterval)
        return;
    outOfProfileModal.style.display = "none";
    profileModal.style.display = "none";
};
const clickProfileModalAnimalImg = (event) => {
    const target = event.currentTarget;
    const chosenProfileImg = profileImgListWrapper.querySelector(".chosenProfileImg");
    if (chosenProfileImg) {
        chosenProfileImg.classList.remove("chosenProfileImg");
    }
    target.classList.add("chosenProfileImg");
};
const clickProfileImgSetBtn = async () => {
    if (loadInterval)
        return;
    try {
        const chosenProfileImg = profileImgListWrapper.querySelector(".chosenProfileImg");
        const animalIndex = Array.from(profileModalAnimalImgs).indexOf(chosenProfileImg);
        const animalGrade = Math.floor(animalIndex / 11);
        const animalTypeNumber = animalIndex % 11;
        showLoading();
        const loginCode = localStorage.getItem("LOGIN_CODE");
        const res = await axios.default.post("/user/changeProfileImg", {
            loginCode,
            animalGrade,
            animalTypeNumber,
        });
        stopLoading();
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
            throw new Error();
        }
        alertByModal(`프로필 이미지 변경 완료!\n업데이트를 위해 재접속합니다!`);
        loadInterval = 1;
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 로그아웃됩니다!");
    }
};
const clickUserInfoChangeBtn = (type) => async () => {
    if (loadInterval)
        return;
    try {
        let textContainer = profileModalUserNameContainer;
        let tester = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,8}$/;
        if (type === "password") {
            textContainer = profileModalPasswordContainer;
            tester = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*()._-]{6,16}$/;
        }
        const text = textContainer.value;
        const textTest = tester.test(text);
        if (!textTest) {
            alertByModal("닉네임: 2~8자 내 한글, 영어, 숫자\n비밀번호: 6~16자 내 영어, 숫자, 일부 특수문자(!@#$%^&*()._-)");
            return;
        }
        let res = null;
        showLoading();
        const loginCode = localStorage.getItem("LOGIN_CODE");
        switch (type) {
            case "nick": {
                res = await axios.default.post("/auth/changeNick", {
                    loginCode,
                    newNick: text,
                });
                break;
            }
            case "password": {
                res = await axios.default.post("/auth/changePassword", {
                    loginCode,
                    newPassword: text,
                });
                break;
            }
        }
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
        alertByModal(`${type === "nick" ? "닉네임" : "비밀번호"} 변경 완료!\n업데이트를 위해 재접속합니다!`);
        loadInterval = 1;
        setTimeout(() => {
            location.reload();
        }, 1000);
    }
    catch (err) {
        stopLoading();
        reload = true;
        alertByModal("오류가 발생하여 로그아웃됩니다!");
    }
};
// loadModal, alertModal
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
// event listener
battleZoneWrapper.addEventListener("click", clickBattleZone);
profileManageBtn.addEventListener("click", clickProfileManageBtn);
battleGradeLeftEndMoveBtn.addEventListener("click", clickBattleGradeMoveBtn("leftEnd"));
battleGradeLeftMoveBtn.addEventListener("click", clickBattleGradeMoveBtn("left"));
battleGradeRightMoveBtn.addEventListener("click", clickBattleGradeMoveBtn("right"));
battleGradeRightEndMoveBtn.addEventListener("click", clickBattleGradeMoveBtn("rightEnd"));
battleGradeListWrapper.addEventListener("wheel", scrollHorizontally);
battleGrades.forEach((battleGrade) => {
    battleGrade.addEventListener("click", clickBattleGrade);
});
battleBtn.addEventListener("click", startBattle);
sweepBtn.addEventListener("click", sweep);
animalPartAnimalImgContainers.forEach((animalPartAnimalImgContainer) => {
    animalPartAnimalImgContainer.addEventListener("click", clickAnimalPartAnimalImgContainer);
});
animaPartModeChangeBtn.addEventListener("click", clickAnimalPartModeChangeBtn);
if (navigator.userAgent.match(/mobile/i) ||
    navigator.userAgent.match(/iPad|Android|Touch/i)) {
    animalSummonBtn.addEventListener("touchstart", () => {
        summonAnimal(1);
        clickInterval = setInterval(() => {
            summonAnimal(1);
        }, 200);
    });
    animalSummonBtn.addEventListener("touchend", () => {
        if (clickInterval) {
            clearInterval(clickInterval);
        }
    });
    animalSummonBtn.addEventListener("touchmove", (event) => {
        const touch = event.touches[0];
        if (clickInterval &&
            document.elementFromPoint(touch.pageX, touch.pageY) !== animalSummonBtn) {
            clearInterval(clickInterval);
        }
    });
    animalSummonTenBtn.addEventListener("touchstart", () => {
        summonAnimal(10);
        clickInterval = setInterval(() => {
            summonAnimal(10);
        }, 200);
    });
    animalSummonTenBtn.addEventListener("touchend", () => {
        if (clickInterval) {
            clearInterval(clickInterval);
        }
    });
    animalSummonTenBtn.addEventListener("touchmove", (event) => {
        const touch = event.touches[0];
        if (clickInterval &&
            document.elementFromPoint(touch.pageX, touch.pageY) !== animalSummonTenBtn) {
            clearInterval(clickInterval);
        }
    });
}
else {
    animalSummonBtn.addEventListener("mousedown", (event) => {
        summonAnimal(1);
        clickInterval = setInterval(() => {
            summonAnimal(1);
        }, 200);
    });
    animalSummonBtn.addEventListener("mouseup", () => {
        if (clickInterval) {
            clearInterval(clickInterval);
        }
    });
    animalSummonBtn.addEventListener("mouseleave", () => {
        if (clickInterval) {
            clearInterval(clickInterval);
        }
    });
    animalSummonTenBtn.addEventListener("mousedown", (event) => {
        summonAnimal(10);
        clickInterval = setInterval(() => {
            summonAnimal(10);
        }, 200);
    });
    animalSummonTenBtn.addEventListener("mouseup", () => {
        if (clickInterval) {
            clearInterval(clickInterval);
        }
    });
    animalSummonTenBtn.addEventListener("mouseleave", () => {
        if (clickInterval) {
            clearInterval(clickInterval);
        }
    });
}
animalSpecificPartCloseBtn.addEventListener("click", clickAnimalSpecificPartCloseBtn);
combineInfoContainerTargetImg.addEventListener("click", combineAnimal);
upgradeExecuters.forEach((executer) => {
    if (navigator.userAgent.match(/mobile/i) ||
        navigator.userAgent.match(/iPad|Android|Touch/i)) {
        executer.addEventListener("touchstart", (event) => {
            const target = event.currentTarget;
            clickUpgradeExecuter(target);
            clickInterval = setInterval(() => {
                clickUpgradeExecuter(target);
            }, 200);
        });
        executer.addEventListener("touchend", () => {
            if (clickInterval) {
                clearInterval(clickInterval);
            }
        });
        executer.addEventListener("touchmove", (event) => {
            const touch = event.touches[0];
            if (clickInterval &&
                document.elementFromPoint(touch.pageX, touch.pageY) !== executer) {
                clearInterval(clickInterval);
            }
        });
    }
    else {
        executer.addEventListener("mousedown", (event) => {
            const target = event.currentTarget;
            clickUpgradeExecuter(target);
            clickInterval = setInterval(() => {
                clickUpgradeExecuter(target);
            }, 200);
        });
        executer.addEventListener("mouseup", () => {
            if (clickInterval) {
                clearInterval(clickInterval);
            }
        });
        executer.addEventListener("mouseleave", () => {
            if (clickInterval) {
                clearInterval(clickInterval);
            }
        });
    }
});
achivementRewardImgContainers.forEach((imgContainer) => {
    imgContainer.addEventListener("click", clickAchivementRewardImgContainer);
});
passPartRewardImgContainers.forEach((imgContainer) => {
    imgContainer.addEventListener("click", clickPassRewardImgContainer);
});
shopPartPassContainers.forEach((passContainer) => {
    passContainer.addEventListener("click", clickShopPartPassContainer);
});
shopPartGoodsImgContainers.forEach((imgContainer) => {
    imgContainer.addEventListener("click", clickShopPartGoodsImgContainers);
});
if (navigator.userAgent.match(/mobile/i) ||
    navigator.userAgent.match(/iPad|Android|Touch/i)) {
    jadeChargeExecuterJadeDownBtn.addEventListener("touchstart", (event) => {
        const target = event.currentTarget;
        clickJadeChargeValueControlBtn(target);
        clickInterval = setInterval(() => {
            clickJadeChargeValueControlBtn(target);
        }, 200);
    });
    jadeChargeExecuterJadeUpBtn.addEventListener("touchstart", (event) => {
        const target = event.currentTarget;
        clickJadeChargeValueControlBtn(target);
        clickInterval = setInterval(() => {
            clickJadeChargeValueControlBtn(target);
        }, 200);
    });
    jadeChargeExecuterJadeDownBtn.addEventListener("touchend", () => {
        if (clickInterval) {
            clearInterval(clickInterval);
        }
    });
    jadeChargeExecuterJadeUpBtn.addEventListener("touchend", () => {
        if (clickInterval) {
            clearInterval(clickInterval);
        }
    });
    jadeChargeExecuterJadeDownBtn.addEventListener("touchmove", (event) => {
        const touch = event.touches[0];
        if (clickInterval &&
            document.elementFromPoint(touch.pageX, touch.pageY) !==
                jadeChargeExecuterJadeDownBtn) {
            clearInterval(clickInterval);
        }
    });
    jadeChargeExecuterJadeUpBtn.addEventListener("touchmove", (event) => {
        const touch = event.touches[0];
        if (clickInterval &&
            document.elementFromPoint(touch.pageX, touch.pageY) !==
                jadeChargeExecuterJadeUpBtn) {
            clearInterval(clickInterval);
        }
    });
}
else {
    jadeChargeExecuterJadeDownBtn.addEventListener("mousedown", (event) => {
        const target = event.currentTarget;
        clickJadeChargeValueControlBtn(target);
        clickInterval = setInterval(() => {
            clickJadeChargeValueControlBtn(target);
        }, 200);
    });
    jadeChargeExecuterJadeUpBtn.addEventListener("mousedown", (event) => {
        const target = event.currentTarget;
        clickJadeChargeValueControlBtn(target);
        clickInterval = setInterval(() => {
            clickJadeChargeValueControlBtn(target);
        }, 200);
    });
    jadeChargeExecuterJadeDownBtn.addEventListener("mouseup", () => {
        if (clickInterval) {
            clearInterval(clickInterval);
        }
    });
    jadeChargeExecuterJadeUpBtn.addEventListener("mouseup", () => {
        if (clickInterval) {
            clearInterval(clickInterval);
        }
    });
    jadeChargeExecuterJadeDownBtn.addEventListener("mouseleave", () => {
        if (clickInterval) {
            clearInterval(clickInterval);
        }
    });
    jadeChargeExecuterJadeUpBtn.addEventListener("mouseleave", () => {
        if (clickInterval) {
            clearInterval(clickInterval);
        }
    });
}
jadeChargeBtn.addEventListener("click", clickJadeChargeBtn);
rankerWatchBtns.forEach((watchBtn) => {
    watchBtn.addEventListener("click", clickWatchBtn);
});
menuBtns.forEach((menuBtn, index) => {
    menuBtn.addEventListener("click", clickMenuBtn(index));
});
profileModalCloseBtn.addEventListener("click", clickProfileModalCloseBtn);
profileImgListWrapper.addEventListener("wheel", scrollHorizontally);
profileModalAnimalImgs.forEach((profileModalAnimalImg) => {
    profileModalAnimalImg.addEventListener("click", clickProfileModalAnimalImg);
});
profileImgSetBtn.addEventListener("click", clickProfileImgSetBtn);
nickChangeBtn.addEventListener("click", clickUserInfoChangeBtn("nick"));
passwordChangeBtn.addEventListener("click", clickUserInfoChangeBtn("password"));
alertModal.addEventListener("click", () => {
    alertModal.style.display = "none";
    OutOfAlertModal.style.display = "none";
});
document.addEventListener("click", () => {
    if (reload) {
        location.href = "/login";
        return;
    }
});
window.addEventListener("keydown", () => {
    if (reload) {
        location.href = "/login";
        return;
    }
});
checkLoginCode();
