"use strict";
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const axios = __importDefault(require("axios"));
// common html
const attackObjectImg = document.querySelector("#attackObjectImg");
const bottomCanvas = document.querySelector("#bottomCanvas");
const bottomCanvasCtx = bottomCanvas.getContext("2d");
const middleCanvas = document.querySelector("#middleCanvas");
const middleCanvasCtx = middleCanvas.getContext("2d");
const topCanvas = document.querySelector("#topCanvas");
const topCanvasCtx = topCanvas.getContext("2d");
const battleZoneWrapper = document.querySelector("#battleZoneWrapper");
const enemyImg = document.querySelector("#enemyImg");
const enemyInfo = document.querySelector("#enemyInfo");
const bossImg = document.querySelector("#bossImg");
const bossInfo = document.querySelector("#bossInfo");
const animalProfileContainer = document.querySelector("#animalProfileContainer");
const animalProfileImg = animalProfileContainer.querySelector("#animalProfileImg");
const animalGrade = animalProfileContainer.querySelector("#animalGrade");
const animalName = animalProfileContainer.querySelector("#animalName");
const animalMoveBtn = animalProfileContainer.querySelector("#animalMoveBtn");
const animalSpecContainer = animalProfileContainer.querySelector("#animalSpecContainer");
const animalSkillInfo = document.querySelector("#animalSkillInfo");
const timer = document.querySelector("#timer");
const lifeContainer = document.querySelector("#lifeContainer");
const hpVisibleToggleBtn = document.querySelector("#hpVisibleToggleBtn");
const speedControlBtn = document.querySelector("#speedControlBtn");
const pauseBtn = document.querySelector("#pauseBtn");
const giveUpBtn = document.querySelector("#giveUpBtn");
const alertModal = document.querySelector(".alertModal");
const OutOfAlertModal = document.querySelector(".OutOfAlertModal");
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
let battleGrade = 0;
let myAnimalsArrangement = "";
let myAnimalsUpgradeInfo = {
    gradeUpgrade: "",
    mysteriousCreatureEachUpgrade: "",
    monarchEachUpgrade: "",
};
const rightDirectionPathList = [1, 3, 5, 9, 17];
const leftDirectionPathList = [7, 11, 13, 15, 19];
const downDirectionPathList = [2, 6, 8, 10, 14];
const upDirectionPathList = [4, 12, 16, 18, 20];
const animalsImgArr = [];
const animalSkillImgList = {};
let battle = null;
let savedZoneNumber = 0;
let battleZoneClickMode = "info";
// common html func
const updateImgSrc = (img, name, folder) => {
    img.src = `/images/${folder ? `${folder}/` : ""}${name}.png`;
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
const getZoneNumberByAnimalIndex = (imgIndex) => {
    const zoneNumber = [1, 2, 4, 5, 7, 8][Math.floor(imgIndex / 6)] * 10 +
        [1, 2, 4, 5, 7, 8][imgIndex % 6];
    return zoneNumber;
};
// common func
const checkBeforeBattle = async () => {
    try {
        const path = window.location.pathname;
        const pathParts = path.split("/");
        const pathLastPartValue = pathParts[pathParts.length - 1];
        battleGrade = Number(pathLastPartValue);
        const enemyGrade = battleGrade <= 100
            ? 0
            : battleGrade <= 1000
                ? 1
                : battleGrade <= 10000
                    ? 2
                    : 3;
        const enemyTypeIndex = (battleGrade % 100) % 11 === 0 ? 10 : ((battleGrade % 100) % 11) - 1;
        updateImgSrc(enemyImg, animalNameList[enemyGrade][enemyTypeIndex], "animals");
        enemyInfo.innerText = `${animalKorNameList[enemyGrade][enemyTypeIndex]}\n\nHP: ${formatNumber(Math.ceil(battleGrade / 10) * battleGrade * 200)}`;
        updateImgSrc(bossImg, animalNameList[enemyGrade + 1][enemyTypeIndex], "animals");
        bossInfo.innerText = `${animalKorNameList[enemyGrade + 1][enemyTypeIndex]}\n\nHP: ${formatNumber(Math.ceil(battleGrade / 10) * battleGrade * 2500)}`;
        const loginCode = localStorage.getItem("LOGIN_CODE");
        if (!loginCode) {
            location.href = "/login";
            return;
        }
        const res = await axios.default.post("/battle/checkBeforeBattle", {
            loginCode,
            battleGrade,
        });
        const { data } = res;
        const { answer } = data;
        if (answer === "error") {
            throw new Error();
        }
        if (answer === "no user") {
            throw new Error();
        }
        const { newLoginCode, arrangement, animalsUpgradeInfo } = data;
        // start func
        localStorage.setItem("LOGIN_CODE", newLoginCode);
        myAnimalsArrangement = arrangement;
        myAnimalsUpgradeInfo = animalsUpgradeInfo;
        battle = new Battle(battleGrade);
        battle.startBattle(arrangement, animalsUpgradeInfo);
    }
    catch (err) {
        localStorage.removeItem("loginCode");
        location.href = "/login";
    }
};
class Battle {
    constructor(grade) {
        this.grade = grade;
        this.life = 60;
        this.enemiesArr = [];
        this.animalsArr = [];
        this.attackObjectsArr = [];
        this.animalSkillImgsArr = [];
        this.speed = 1;
        this.hpVisible = false;
        this.pauseOrNot = false;
        this.tick = 0;
        this.moveLog = [];
        this.battleInterval = 0;
        this.jadeIncrease = 0;
        this.goldIncrease = 0;
        this.star = 0;
    }
    startBattle(arrangement, animalsUpgradeInfo) {
        const { gradeUpgrade, mysteriousCreatureEachUpgrade, monarchEachUpgrade } = animalsUpgradeInfo;
        const arrangementInfoArr = arrangement.split("/");
        arrangementInfoArr.forEach((arrangementInfo, index) => {
            if (arrangementInfo === "0") {
                return;
            }
            const dividerIndex = arrangementInfo.indexOf("_");
            const grade = Number(arrangementInfo.slice(0, dividerIndex));
            const typeNumber = Number(arrangementInfo.slice(dividerIndex + 1));
            const targetGradeUpgrade = Number(gradeUpgrade.split("/")[grade]);
            const targetEachUpgrade = grade < 3
                ? 0
                : grade === 3
                    ? Number(mysteriousCreatureEachUpgrade.split("/")[typeNumber])
                    : Number(monarchEachUpgrade.split("/")[typeNumber]);
            const newAnimal = new Animal(this, this.animalsArr.length, grade, typeNumber, targetGradeUpgrade, targetEachUpgrade, getZoneNumberByAnimalIndex(index));
            this.animalsArr.push(newAnimal);
            const newAnimalImg = new Image();
            updateImgSrc(newAnimalImg, animalNameList[grade][typeNumber], "animals");
            animalsImgArr.push(newAnimalImg);
            if (grade) {
                const animalName = animalNameList[grade][typeNumber];
                const existImgs = animalSkillImgList[animalName];
                if (!existImgs) {
                    if ([1, 3, 6, 10].includes(typeNumber)) {
                        const imgInfo = `${animalNameList[grade][typeNumber]}Skill`;
                        const newAnimalSkillImg = new Image();
                        updateImgSrc(newAnimalSkillImg, imgInfo, "animals");
                        animalSkillImgList[animalName] = [newAnimalSkillImg];
                    }
                    else {
                        const skillImgArr = [];
                        for (let i = 0; i < 4; i++) {
                            const imgInfo = `${animalNameList[grade][typeNumber]}Skill${i + 1}`;
                            const newAnimalSkillImg = new Image();
                            updateImgSrc(newAnimalSkillImg, imgInfo, "animals");
                            skillImgArr.push(newAnimalSkillImg);
                        }
                        animalSkillImgList[animalName] = skillImgArr;
                        if (grade === 4) {
                            const specialSkillImgArr = [];
                            for (let i = 0; i < 4; i++) {
                                const imgInfo = `${animalNameList[grade][typeNumber]}SpecialSkill${i + 1}`;
                                const newAnimalSkillImg = new Image();
                                updateImgSrc(newAnimalSkillImg, imgInfo, "animals");
                                specialSkillImgArr.push(newAnimalSkillImg);
                            }
                            animalSkillImgList[`${animalName}Special`] = specialSkillImgArr;
                        }
                    }
                }
            }
        });
        setTimeout(() => {
            const firstAnimal = this.animalsArr[0];
            const { grade, typeNumber, firstAttackDamage, firstAttackSpeed, zoneNumber, } = firstAnimal;
            savedZoneNumber = zoneNumber;
            updateImgSrc(animalProfileImg, animalNameList[grade][typeNumber], "animals");
            animalGrade.innerText = `[${animalGradeKorNameList[grade]}]`;
            animalGrade.classList.add([
                "babyGradeSpan",
                "smallGradeSpan",
                "beastGradeSpan",
                "mysteriousCreatureGradeSpan",
                "monarchGradeSpan",
            ][grade]);
            animalName.innerText = animalKorNameList[grade][typeNumber];
            animalSpecContainer.innerText = `공격력: ${formatNumber(firstAttackDamage)}\n\n공격속도: ${firstAttackSpeed.toFixed(2)}`;
            animalSkillInfo.innerText =
                grade === 0 ? "" : getAnimalSkillInfo(grade, typeNumber);
            this.proceedBattle();
        }, 3000);
    }
    moveEnemies() {
        this.enemiesArr.forEach((enemy) => {
            if (!enemy.dead) {
                enemy.updateDebuffArr();
                const moveSpeed = enemy.getSpeed();
                enemy.move(moveSpeed);
                enemy.getNewSlowDebuff();
            }
        });
    }
    createEnemy() {
        const enemyIndex = this.tick / 20;
        const enemy = new Enemy(this, enemyIndex);
        this.enemiesArr.push(enemy);
        enemy.getNewSlowDebuff();
    }
    attackEnemies() {
        this.animalsArr.forEach((animal) => {
            animal.updateBuff();
            animal.attackEnemy();
        });
        this.attackObjectsArr = this.attackObjectsArr.filter((attackObject) => {
            return !attackObject.end;
        });
        this.attackObjectsArr.forEach((attackObject) => {
            attackObject.moveObject();
        });
    }
    proceedBattle() {
        this.pauseOrNot = false;
        this.battleInterval = setInterval(() => {
            for (let i = this.moveLog.length - 1; i >= 0; i--) {
                const moveInfo = this.moveLog[i];
                const firstDividerIndex = moveInfo.indexOf("_");
                const proceedTick = Number(moveInfo.slice(0, firstDividerIndex));
                if (proceedTick !== this.tick) {
                    break;
                }
                const secondDividerIndex = moveInfo.indexOf("-");
                const originZoneNumber = Number(moveInfo.slice(firstDividerIndex + 1, secondDividerIndex));
                const originAnimal = this.animalsArr.find((animal) => {
                    return animal.zoneNumber === originZoneNumber;
                });
                if (!originAnimal) {
                    break;
                }
                const targetZoneNumber = Number(moveInfo.slice(secondDividerIndex + 1));
                originAnimal.moveAnimal(targetZoneNumber);
            }
            if (this.tick === 3600) {
                const boss = this.enemiesArr[60];
                if (boss.dead) {
                    const livingEnemies = this.enemiesArr.filter((enemy) => {
                        return (!enemy.dead &&
                            (enemy.path !== 20 || (enemy.path === 20 && enemy.coordY > 50)));
                    });
                    const livingEnemiesAmounts = livingEnemies.length;
                    this.loseLife(livingEnemiesAmounts);
                    if (this.life > 0) {
                        this.winBattle();
                    }
                }
                else {
                    this.loseBattle();
                }
            }
            let minute = -1;
            let second = -1;
            this.moveEnemies();
            if (this.tick >= 0 && Math.floor(this.tick / 20) === this.tick / 20) {
                minute = Math.floor((3600 - this.tick) / 1200);
                second = 60 - Math.floor((this.tick % 1200) / 20);
                if (second === 60) {
                    second = 0;
                }
                timer.innerText = `${minute}:${second < 10 ? `0${second}` : second}`;
                if (this.tick <= 2400) {
                    this.createEnemy();
                }
            }
            this.attackEnemies();
            // render Img
            this.animalSkillImgsArr = this.animalSkillImgsArr.filter((skillImg) => {
                return skillImg.startTick > this.tick - 8;
            });
            topCanvasCtx.clearRect(0, 0, topCanvas.width, topCanvas.height);
            middleCanvasCtx.clearRect(0, 0, middleCanvas.width, middleCanvas.height);
            bottomCanvasCtx.clearRect(0, 0, bottomCanvas.width, bottomCanvas.height);
            if (battleZoneClickMode === "move") {
                bottomCanvasCtx.fillStyle = "rgb(220,255,220)";
                for (let i = 0; i < 9; i++) {
                    bottomCanvasCtx.fillRect([100, 400, 700][i % 3] / (1000 / bottomCanvas.width), [100, 400, 700][Math.floor(i / 3)] / (1000 / bottomCanvas.height), bottomCanvas.width / 5, bottomCanvas.height / 5);
                }
            }
            this.animalsArr.forEach((animal) => {
                let highestAttackDamageBuffGrade = 0;
                let highestAttackSpeedBuffGrade = 0;
                animal.attackDamageBuffArr.forEach((buff) => {
                    const subjectAnimal = this.animalsArr[buff.subjectIndex];
                    if (subjectAnimal.grade > highestAttackDamageBuffGrade) {
                        highestAttackDamageBuffGrade = subjectAnimal.grade;
                    }
                });
                animal.attackSpeedBuffArr.forEach((buff) => {
                    const subjectAnimal = this.animalsArr[buff.subjectIndex];
                    if (subjectAnimal.grade > highestAttackSpeedBuffGrade) {
                        highestAttackSpeedBuffGrade = subjectAnimal.grade;
                    }
                });
                if (highestAttackDamageBuffGrade) {
                    const animalName = animalNameList[highestAttackDamageBuffGrade][1];
                    const skillImg = animalSkillImgList[animalName][0];
                    // const imgInfo = `${animalNameList[highestAttackDamageBuffGrade][1]}Skill`;
                    // const skillImg = document.querySelector(
                    //   `#${imgInfo}`
                    // ) as HTMLImageElement;
                    const x = (animal.coordX - 50) / (1000 / bottomCanvas.width);
                    const y = (animal.coordY - 50) / (1000 / bottomCanvas.height);
                    bottomCanvasCtx.drawImage(skillImg, x, y, middleCanvas.width / 10, middleCanvas.height / 10);
                }
                if (highestAttackSpeedBuffGrade) {
                    const animalName = animalNameList[highestAttackSpeedBuffGrade][3];
                    const skillImg = animalSkillImgList[animalName][0];
                    const x = (animal.coordX - 50) / (1000 / bottomCanvas.width);
                    const y = (animal.coordY - 50) / (1000 / bottomCanvas.height);
                    bottomCanvasCtx.drawImage(skillImg, x, y, middleCanvas.width / 10, middleCanvas.height / 10);
                }
            });
            this.enemiesArr.forEach((enemy) => {
                if (enemy.dead)
                    return;
                middleCanvasCtx.save();
                const x = (enemy.coordX - 50) / (1000 / middleCanvas.width);
                const y = (enemy.coordY - 50) / (1000 / middleCanvas.height);
                middleCanvasCtx.translate(x + middleCanvas.width / 20, y + middleCanvas.height / 20);
                middleCanvasCtx.rotate((Math.PI / 180) *
                    (leftDirectionPathList.includes(enemy.path)
                        ? 90
                        : upDirectionPathList.includes(enemy.path)
                            ? 180
                            : rightDirectionPathList.includes(enemy.path)
                                ? 270
                                : 0));
                middleCanvasCtx.translate(-x - middleCanvas.width / 20, -y - middleCanvas.height / 20);
                middleCanvasCtx.drawImage(enemy.index === 60 ? bossImg : enemyImg, x, y, middleCanvas.width / 10, middleCanvas.height / 10);
                middleCanvasCtx.restore();
            });
            this.enemiesArr.forEach((enemy) => {
                if (enemy.dead)
                    return;
                let highestSlowDebuffGrade = 0;
                enemy.debuffArr.forEach((debuff) => {
                    if (debuff.speedDecrease === 1) {
                        return;
                    }
                    const subjectAnimal = this.animalsArr[debuff.subjectIndex];
                    if (subjectAnimal.grade > highestSlowDebuffGrade) {
                        highestSlowDebuffGrade = subjectAnimal.grade;
                    }
                });
                if (highestSlowDebuffGrade) {
                    const x = (enemy.coordX - 50) / (1000 / middleCanvas.width);
                    const y = (enemy.coordY - 50) / (1000 / middleCanvas.height);
                    const animalName = animalNameList[highestSlowDebuffGrade][6];
                    const slowDebuffSkillImg = animalSkillImgList[animalName][0];
                    // const slowDebuffSkillInfo = `${animalNameList[highestSlowDebuffGrade][6]}Skill`;
                    // const slowDebuffSkillImg = document.querySelector(
                    //   `#${slowDebuffSkillInfo}`
                    // ) as HTMLImageElement;
                    topCanvasCtx.drawImage(slowDebuffSkillImg, x, y, topCanvas.width / 10, topCanvas.height / 10);
                }
            });
            if (this.hpVisible) {
                this.enemiesArr.forEach((enemy) => {
                    if (enemy.dead)
                        return;
                    const x = (enemy.coordX - 50) / (1000 / middleCanvas.width);
                    const y = (enemy.coordY - 50) / (1000 / middleCanvas.height);
                    const enemyHpRate = enemy.hp /
                        (Math.ceil(this.grade / 10) *
                            this.grade *
                            (enemy.index === 60 ? 2500 : 200));
                    topCanvasCtx.fillStyle = "rgb(220,220,220)";
                    topCanvasCtx.fillRect(x, y, topCanvas.width / 10, topCanvas.height / 100);
                    topCanvasCtx.fillStyle = "green";
                    topCanvasCtx.fillRect(x, y, (topCanvas.width / 10) * enemyHpRate, topCanvas.height / 100);
                });
            }
            this.attackObjectsArr.forEach((attackObject) => {
                if (attackObject.end)
                    return;
                middleCanvasCtx.drawImage(attackObjectImg, attackObject.coordX / (1000 / middleCanvas.width), attackObject.coordY / (1000 / middleCanvas.height), middleCanvas.width / 125, middleCanvas.height / 125);
            });
            this.animalsArr.forEach((animal) => {
                middleCanvasCtx.save();
                const x = (animal.coordX - 50) / (1000 / middleCanvas.width);
                const y = (animal.coordY - 50) / (1000 / middleCanvas.height);
                middleCanvasCtx.translate(x + middleCanvas.width / 20, y + middleCanvas.height / 20);
                middleCanvasCtx.rotate((Math.PI / 180) * animal.angle);
                middleCanvasCtx.translate(-x - middleCanvas.width / 20, -y - middleCanvas.height / 20);
                middleCanvasCtx.drawImage(animalsImgArr[animal.index], x, y, middleCanvas.width / 10, middleCanvas.height / 10);
                middleCanvasCtx.restore();
            });
            this.animalSkillImgsArr.forEach((skillImg) => {
                topCanvasCtx.save();
                const tickDiff = this.tick - skillImg.startTick;
                // topCanvasCtx.globalAlpha = tickDiff < 3 ? (4 + tickDiff * 2) / 10 : 0.5;
                topCanvasCtx.drawImage(skillImg.imgList.length === 1
                    ? skillImg.imgList[0]
                    : skillImg.imgList[Math.floor(tickDiff / 2)], skillImg.x, skillImg.y, skillImg.width, skillImg.height);
                topCanvasCtx.restore();
            });
            this.tick++;
        }, 50 / this.speed);
    }
    async winBattle() {
        try {
            this.star = this.life === 60 ? 3 : this.life >= 40 ? 2 : 1;
            this.pauseBattle();
            const loginCode = localStorage.getItem("LOGIN_CODE");
            const res = await axios.default.post("/battle/winBattle", {
                loginCode,
                battleGrade,
                moveLog: this.moveLog,
                star: this.star,
            });
            const { data } = res;
            const { answer } = data;
            if (answer === "error") {
                throw new Error();
            }
            alertByModal("승리!\n잠시 후, 홈으로 돌아갑니다.");
            setTimeout(() => {
                location.href = `/home`;
            }, 1000);
        }
        catch (err) {
            location.href = `/login`;
        }
    }
    loseBattle() {
        this.pauseBattle();
        alertByModal("패배!\n잠시 후, 홈으로 돌아갑니다.");
        setTimeout(() => {
            location.href = `/home`;
        }, 1000);
    }
    loseLife(life) {
        this.life -= life;
        lifeContainer.innerText = `🖤 ${this.life}`;
        if (this.life <= 0) {
            this.loseBattle();
        }
    }
    controlSpeed(speed) {
        this.speed = speed;
        if (!this.pauseOrNot) {
            this.pauseBattle();
            this.proceedBattle();
        }
    }
    pauseBattle() {
        this.pauseOrNot = true;
        clearInterval(this.battleInterval);
    }
}
class Enemy {
    constructor(battle, index) {
        this.battle = battle;
        this.dead = false;
        this.index = index;
        this.zoneNumber = 0;
        this.path = 1;
        this.coordX = 50;
        this.coordY = 50;
        this.hp =
            Math.ceil(battle.grade / 10) * battle.grade * (index === 60 ? 2500 : 200);
        this.debuffArr = [];
    }
    getNewSlowDebuff() {
        const existDebuffSubjectIndexArr = [];
        this.debuffArr.forEach((debuff) => {
            existDebuffSubjectIndexArr.push(debuff.subjectIndex);
        });
        const goats = this.battle.animalsArr.filter((animal) => {
            return animal.typeNumber === 6 && animal.grade >= 1;
        });
        goats.forEach((goat) => {
            if (existDebuffSubjectIndexArr.includes(goat.index)) {
                return;
            }
            const { leftX, rightX, topY, bottomY, index } = goat;
            if (this.coordX >= leftX &&
                this.coordX <= rightX &&
                this.coordY >= topY &&
                this.coordY <= bottomY) {
                this.debuffArr.push({
                    speedDecrease: 0.125 * skillCoefficientArr[goat.grade] +
                        0.001 * goat.eachUpgrade +
                        (goat.grade === 4 ? 0.2 : 0),
                    area: { leftX, rightX, topY, bottomY },
                    endTick: null,
                    subjectIndex: index,
                });
            }
        });
    }
    updateDebuffArr() {
        this.debuffArr = this.debuffArr.filter((debuff, index, arr) => {
            const { endTick, area } = debuff;
            return ((endTick && endTick > this.battle.tick) ||
                (area &&
                    this.coordX >= area.leftX &&
                    this.coordX <= area.rightX &&
                    this.coordY >= area.topY &&
                    this.coordY <= area.bottomY));
        });
    }
    getSpeed() {
        const basisSpeed = 5;
        let speed = basisSpeed;
        let highestSpeedDecrease = 0;
        for (const debuff of this.debuffArr) {
            const { speedDecrease } = debuff;
            if (speedDecrease === 1) {
                highestSpeedDecrease = 1;
                break;
            }
            highestSpeedDecrease =
                highestSpeedDecrease < speedDecrease
                    ? speedDecrease
                    : highestSpeedDecrease;
        }
        if (highestSpeedDecrease === 1) {
            speed = 0;
        }
        else if (this.index !== 60) {
            speed *= 1 - highestSpeedDecrease;
        }
        else if (highestSpeedDecrease > 0.7) {
            speed *= 1 - highestSpeedDecrease;
        }
        else {
            speed *= 1 - highestSpeedDecrease / 2;
        }
        return speed;
    }
    move(speed) {
        if (this.path === 20) {
            this.coordY -= speed;
            if (this.coordY <= 50) {
                this.dead = true;
                this.battle.loseLife(1);
                if (this.index === 60) {
                    this.battle.loseBattle();
                }
            }
            return;
        }
        if (rightDirectionPathList.includes(this.path)) {
            this.coordX += speed;
            if (([1, 17].includes(this.path) && this.coordX >= 350) ||
                ([5, 9].includes(this.path) && this.coordX >= 950) ||
                (this.path === 3 && this.coordX >= 650)) {
                this.path++;
                this.move(0);
            }
        }
        else if (leftDirectionPathList.includes(this.path)) {
            this.coordX -= speed;
            if (([7, 11].includes(this.path) && this.coordX <= 650) ||
                ([15, 19].includes(this.path) && this.coordX <= 50) ||
                (this.path === 13 && this.coordX <= 350)) {
                this.path++;
                this.move(0);
            }
        }
        else if (downDirectionPathList.includes(this.path)) {
            this.coordY += speed;
            if (([2, 6].includes(this.path) && this.coordY >= 350) ||
                ([10, 14].includes(this.path) && this.coordY >= 950) ||
                (this.path === 8 && this.coordY >= 650)) {
                this.path++;
                this.move(0);
            }
        }
        else if (upDirectionPathList.includes(this.path)) {
            this.coordY -= speed;
            if ((this.path === 4 && this.coordY <= 50) ||
                ([12, 16].includes(this.path) && this.coordY <= 650) ||
                (this.path === 18 && this.coordY <= 350)) {
                this.path++;
                this.move(0);
            }
        }
        this.zoneNumber =
            Math.floor(this.coordY / 100) * 10 + Math.floor(this.coordX / 100);
    }
    getDamage(dmg) {
        this.hp -= dmg;
        if (this.hp <= 0) {
            this.dead = true;
            if (this.battle.tick > 2400) {
                const livingEnemies = this.battle.enemiesArr.filter((enemy) => {
                    return !enemy.dead;
                });
                const livingEnemiesAmounts = livingEnemies.length;
                if (livingEnemiesAmounts === 0) {
                    this.battle.winBattle();
                }
            }
        }
    }
}
class AttackObject {
    constructor(battle, coordX, coordY, target, damage) {
        this.battle = battle;
        this.coordX = coordX;
        this.coordY = coordY;
        this.target = target;
        this.damage = damage;
        this.end = false;
    }
    moveObject() {
        if (this.target.dead) {
            this.end = true;
            return;
        }
        const coordXDif = this.target.coordX - this.coordX;
        const coordYDif = this.target.coordY - this.coordY;
        const length = Math.sqrt(coordXDif ** 2 + coordYDif ** 2);
        const speed = 17.5;
        if (length <= speed) {
            this.target.getDamage(this.damage);
            this.end = true;
            return;
        }
        this.coordX = this.coordX + speed * (coordXDif / length);
        this.coordY = this.coordY + speed * (coordYDif / length);
    }
}
class AnimalSkillImg {
    constructor(subject, target, startTick, specialOrNot) {
        const subjectAnimalName = animalNameList[subject.grade][subject.typeNumber];
        this.imgList =
            animalSkillImgList[specialOrNot ? `${subjectAnimalName}Special` : subjectAnimalName];
        if ([8, 9].includes(subject.typeNumber)) {
            this.x = (target.coordX - 25) / (1000 / topCanvas.width);
            this.y = (target.coordY - 25) / (1000 / topCanvas.height);
            this.width = middleCanvas.width / 20;
            this.height = middleCanvas.height / 20;
        }
        if ([2, 4, 7].includes(subject.typeNumber)) {
            this.x = (target.coordX - 150) / (1000 / topCanvas.width);
            this.y = (target.coordY - 150) / (1000 / topCanvas.height);
            this.width = middleCanvas.width * 0.3;
            this.height = middleCanvas.height * 0.3;
        }
        else {
            this.x = (target.coordX - 50) / (1000 / topCanvas.width);
            this.y = (target.coordY - 50) / (1000 / topCanvas.height);
            this.width = middleCanvas.width / 10;
            this.height = middleCanvas.height / 10;
        }
        this.startTick = startTick;
    }
}
const basisDPSArr = [60, 600, 6000, 60000, 600000];
const attackSpeedBasicNumberArr = [2, 9, 6, 1, 5, 8, 7, 4, 0, 3, 10];
const attackSpeedArr = [1, 1.25, 1.875, 3, 6];
const skillCoefficientArr = [0, 0.5, 1, 2, 4];
class Animal {
    constructor(battle, index, grade, typeNumber, gradeUpGrade, eachUpgrade, zoneNumber) {
        this.battle = battle;
        this.index = index;
        this.grade = grade;
        this.typeNumber = typeNumber;
        this.eachUpgrade = eachUpgrade;
        const basisDPS = basisDPSArr[grade];
        this.firstAttackSpeed =
            attackSpeedArr[grade] * (1 - attackSpeedBasicNumberArr[typeNumber] / 20);
        const basisAttackDamage = basisDPS / this.firstAttackSpeed;
        if (grade >= 3 && typeNumber === 3) {
            this.firstAttackSpeed += eachUpgrade * (grade === 3 ? 0.02 : 0.04);
        }
        this.attackSpeed = this.firstAttackSpeed;
        this.firstAttackDamage = Math.round(basisAttackDamage *
            (1 +
                0.05 * gradeUpGrade +
                (grade < 3 || typeNumber === 3 ? 0 : grade === 3 ? 0.1 : 0.2) *
                    eachUpgrade));
        this.attackDamage = this.firstAttackDamage;
        this.lastAttackTick = -100;
        this.totalAttackNumbers = 0;
        this.attackDamageBuffArr = [];
        this.attackSpeedBuffArr = [];
        this.zoneNumber = zoneNumber;
        this.coordX = Number(zoneNumber.toString()[1]) * 100 + 50;
        this.coordY = Number(zoneNumber.toString()[0]) * 100 + 50;
        this.leftX = this.coordX - 250;
        this.rightX = this.coordX + 250;
        this.topY = this.coordY - 250;
        this.bottomY = this.coordY + 250;
        this.angle = 0;
    }
    setCoord(zoneNumber) {
        this.zoneNumber = zoneNumber;
        this.coordX = Number(zoneNumber.toString()[1]) * 100 + 50;
        this.coordY = Number(zoneNumber.toString()[0]) * 100 + 50;
        this.leftX = this.coordX - 250;
        this.rightX = this.coordX + 250;
        this.topY = this.coordY - 250;
        this.bottomY = this.coordY + 250;
        this.angle = 0;
    }
    updateBuff() {
        this.attackDamageBuffArr = this.attackDamageBuffArr.filter((buff) => {
            return buff.endTick > this.battle.tick;
        });
        this.attackSpeedBuffArr = this.attackSpeedBuffArr.filter((buff) => {
            return buff.endTick > this.battle.tick;
        });
        let highestAttackDamageIncrease = 0;
        let highestAttackSpeedIncrease = 0;
        for (const buff of this.attackDamageBuffArr) {
            highestAttackDamageIncrease =
                highestAttackDamageIncrease > buff.attackDamageIncrease
                    ? highestAttackDamageIncrease
                    : buff.attackDamageIncrease;
        }
        for (const buff of this.attackSpeedBuffArr) {
            highestAttackSpeedIncrease =
                highestAttackSpeedIncrease > buff.attackSpeedIncrease
                    ? highestAttackSpeedIncrease
                    : buff.attackSpeedIncrease;
        }
        this.attackDamage = this.firstAttackDamage + highestAttackDamageIncrease;
        this.attackSpeed = this.firstAttackSpeed + highestAttackSpeedIncrease;
    }
    checkAttackOrNot() {
        return this.lastAttackTick + 20 / this.attackSpeed <= this.battle.tick;
    }
    findTarget() {
        let target = null;
        for (let i = 0; i < this.battle.enemiesArr.length; i++) {
            const enemy = this.battle.enemiesArr[i];
            if (enemy.index * 20 < this.battle.tick &&
                !enemy.dead &&
                enemy.coordX >= this.leftX &&
                enemy.coordX <= this.rightX &&
                enemy.coordY >= this.topY &&
                enemy.coordY <= this.bottomY) {
                target = enemy;
                break;
            }
        }
        return target;
    }
    moveAnimalWithUpdatingSlowDebuff(animal, newZoneNumber) {
        animal.battle.enemiesArr.forEach((enemy) => {
            if (enemy.dead) {
                return;
            }
            enemy.debuffArr = enemy.debuffArr.filter((debuff) => {
                return debuff.subjectIndex !== animal.index;
            });
        });
        animal.setCoord(newZoneNumber);
        const { leftX, rightX, topY, bottomY } = animal;
        animal.battle.enemiesArr.forEach((enemy) => {
            if (enemy.dead ||
                enemy.coordX < leftX ||
                enemy.coordX > rightX ||
                enemy.coordY < topY ||
                enemy.coordY > bottomY) {
                return;
            }
            enemy.debuffArr.push({
                speedDecrease: 0.125 * skillCoefficientArr[animal.grade] +
                    animal.eachUpgrade * 0.001 +
                    (animal.grade === 4 ? 0.2 : 0),
                area: { leftX, rightX, topY, bottomY },
                endTick: null,
                subjectIndex: animal.index,
            });
        });
    }
    moveAnimal(zoneNumber) {
        const existAnimal = this.battle.animalsArr.find((animal) => {
            return animal.zoneNumber === zoneNumber;
        });
        if (existAnimal) {
            if (existAnimal.typeNumber !== 6 || existAnimal.grade < 1) {
                existAnimal.setCoord(this.zoneNumber);
            }
            else {
                this.moveAnimalWithUpdatingSlowDebuff(existAnimal, this.zoneNumber);
            }
        }
        if (this.typeNumber !== 6 || this.grade < 1) {
            this.setCoord(zoneNumber);
            return;
        }
        this.moveAnimalWithUpdatingSlowDebuff(this, zoneNumber);
    }
    getTargetConditionArr(zoneNumber) {
        return [
            zoneNumber,
            zoneNumber + 1,
            zoneNumber - 1,
            zoneNumber + 9,
            zoneNumber - 9,
            zoneNumber + 10,
            zoneNumber - 10,
            zoneNumber + 11,
            zoneNumber - 11,
        ];
    }
    calculateAttackAngle(target) {
        const height = Math.abs(target.coordY - this.coordY);
        const length = Math.abs(target.coordX - this.coordX);
        const radian = Math.atan(height / length);
        const basisAngle = radian * (180 / Math.PI);
        const angle = (target.coordX < this.coordX ? 90 : 270) +
            ((target.coordX - this.coordX) * (target.coordY - this.coordY) > 0
                ? basisAngle
                : this.coordX === target.coordX && this.coordY < target.coordY
                    ? basisAngle
                    : -basisAngle);
        return angle;
    }
    attackEnemy() {
        const attackOrNot = this.checkAttackOrNot();
        if (!attackOrNot)
            return;
        const target = this.findTarget();
        if (!target)
            return;
        this.totalAttackNumbers++;
        const attackObject = new AttackObject(this.battle, this.coordX, this.coordY, target, this.attackDamage);
        this.battle.attackObjectsArr.push(attackObject);
        this.angle = this.calculateAttackAngle(target);
        this.lastAttackTick = this.battle.tick;
        if (this.typeNumber === 6 || this.grade < 1)
            return;
        if ([0, 5].includes(this.typeNumber)) {
            const animalSkillImg = new AnimalSkillImg(this, target, this.battle.tick);
            this.battle.animalSkillImgsArr.push(animalSkillImg);
            let skillTargetEnemies = this.battle.enemiesArr.filter((enemy) => {
                return !enemy.dead && enemy.zoneNumber === target.zoneNumber;
            });
            skillTargetEnemies.forEach((skillTarget) => {
                skillTarget.getDamage(this.typeNumber === 0
                    ? Math.round((((this.totalAttackNumbers % 20) + 1) / 100) *
                        skillCoefficientArr[this.grade] *
                        this.attackDamage *
                        0.2)
                    : Math.round((skillCoefficientArr[this.grade] * this.attackDamage * 0.2) / 10));
            });
            if (this.grade < 4)
                return;
            if ((this.typeNumber === 0 && this.totalAttackNumbers % 100 !== 0) ||
                (this.typeNumber === 5 && this.totalAttackNumbers % 20 !== 0))
                return;
            this.battle.animalSkillImgsArr.pop();
            const animalSpecialSkillImg = new AnimalSkillImg(this, target, this.battle.tick, true);
            this.battle.animalSkillImgsArr.push(animalSpecialSkillImg);
            skillTargetEnemies
                .filter((skillTarget) => {
                return !skillTarget.dead;
            })
                .forEach((skillTarget) => {
                skillTarget.getDamage(this.typeNumber === 0
                    ? 40 * this.attackDamage
                    : 8 * this.attackDamage);
            });
        }
        else if ([1, 3].includes(this.typeNumber)) {
            if (this.totalAttackNumbers % 10 !== 0)
                return;
            const targetConditionArr = this.getTargetConditionArr(this.zoneNumber);
            const skillTargetAnimals = this.battle.animalsArr.filter((animal) => {
                return targetConditionArr.includes(animal.zoneNumber);
            });
            skillTargetAnimals.forEach((animal) => {
                if (this.typeNumber === 1) {
                    animal.attackDamageBuffArr.push({
                        attackDamageIncrease: Math.round(0.1 * skillCoefficientArr[this.grade] * this.attackDamage),
                        subjectIndex: this.index,
                        endTick: this.battle.tick + 100,
                    });
                }
                else {
                    animal.attackSpeedBuffArr.push({
                        attackSpeedIncrease: 0.1 * skillCoefficientArr[this.grade] * this.attackSpeed,
                        subjectIndex: this.index,
                        endTick: this.battle.tick + 100,
                    });
                }
            });
            if (this.grade < 4)
                return;
            if (this.totalAttackNumbers % 100 !== 0)
                return;
            this.battle.animalsArr.forEach((animal) => {
                if (skillTargetAnimals.includes(animal))
                    return;
                if (this.typeNumber === 1) {
                    animal.attackDamageBuffArr.push({
                        attackDamageIncrease: Math.round(0.1 * skillCoefficientArr[this.grade] * this.attackDamage),
                        subjectIndex: this.index,
                        endTick: this.battle.tick + 100,
                    });
                }
                else {
                    animal.attackSpeedBuffArr.push({
                        attackSpeedIncrease: 0.1 * skillCoefficientArr[this.grade] * this.attackSpeed,
                        subjectIndex: this.index,
                        endTick: this.battle.tick + 100,
                    });
                }
            });
        }
        else if ([2, 4, 7].includes(this.typeNumber)) {
            if (this.totalAttackNumbers % 10 !== 0)
                return;
            const animalSkillImg = new AnimalSkillImg(this, target, this.battle.tick);
            this.battle.animalSkillImgsArr.push(animalSkillImg);
            const targetConditionArr = this.getTargetConditionArr(target.zoneNumber);
            let skillTargetEnemies = this.battle.enemiesArr.filter((enemy) => {
                return !enemy.dead && targetConditionArr.includes(enemy.zoneNumber);
            });
            skillTargetEnemies.forEach((enemy) => {
                enemy.getDamage(Math.round((this.typeNumber === 2 ? 0.4 : this.typeNumber === 4 ? 0.5 : 0.1) *
                    skillCoefficientArr[this.grade] *
                    this.attackDamage));
            });
            skillTargetEnemies = skillTargetEnemies.filter((enemy) => {
                return !enemy.dead;
            });
            if ([2, 7].includes(this.typeNumber)) {
                const stunTime = (this.typeNumber === 2 ? 2 : 8) * skillCoefficientArr[this.grade];
                skillTargetEnemies.forEach((enemy) => {
                    enemy.debuffArr.push({
                        speedDecrease: 1,
                        area: null,
                        endTick: this.battle.tick + (enemy.index === 60 ? stunTime / 2 : stunTime),
                        subjectIndex: this.index,
                    });
                });
            }
            if (this.grade < 4)
                return;
            if (this.totalAttackNumbers % 100 !== 0)
                return;
            this.battle.animalSkillImgsArr.pop();
            const animalSpecialSkillImg = new AnimalSkillImg(this, target, this.battle.tick, true);
            this.battle.animalSkillImgsArr.push(animalSpecialSkillImg);
            skillTargetEnemies.forEach((enemy) => {
                enemy.getDamage(Math.round((this.typeNumber === 2 ? 14 : this.typeNumber === 4 ? 20 : 8) *
                    this.attackDamage));
            });
            skillTargetEnemies = skillTargetEnemies.filter((enemy) => {
                return !enemy.dead;
            });
            if ([2, 7].includes(this.typeNumber)) {
                const extraStunTime = this.typeNumber === 2 ? 20 : 40;
                skillTargetEnemies.forEach((enemy) => {
                    const newDebuff = enemy.debuffArr[enemy.debuffArr.length - 1];
                    newDebuff.endTick += extraStunTime;
                });
            }
        }
        else if ([8, 9].includes(this.typeNumber)) {
            if (this.typeNumber === 9 && this.grade === 4 && target.index === 60) {
                target.getDamage(2 * this.attackDamage);
                const animalSpecialSkillImg = new AnimalSkillImg(this, target, this.battle.tick, true);
                this.battle.animalSkillImgsArr.push(animalSpecialSkillImg);
            }
            if (this.totalAttackNumbers % 10 !== 0)
                return;
            if (this.typeNumber === 8 || this.grade !== 4 || target.index !== 60) {
                const animalSkillImg = new AnimalSkillImg(this, target, this.battle.tick);
                this.battle.animalSkillImgsArr.push(animalSkillImg);
            }
            target.getDamage(Math.round((this.typeNumber === 8 ? 3.25 : 3.5) *
                skillCoefficientArr[this.grade] *
                this.attackDamage));
            let stunTime = 0;
            if (!target.dead) {
                stunTime =
                    (this.typeNumber === 8 ? 15 : 10) * skillCoefficientArr[this.grade];
                target.debuffArr.push({
                    speedDecrease: 1,
                    area: null,
                    endTick: this.battle.tick + (target.index === 60 ? stunTime / 2 : stunTime),
                    subjectIndex: this.index,
                });
            }
            if (this.grade < 4)
                return;
            if (this.typeNumber === 8) {
                if (this.totalAttackNumbers % 20 !== 0)
                    return;
                target.getDamage(16 * this.attackDamage);
                this.battle.animalSkillImgsArr.pop();
                const animalSpecialSkillImg = new AnimalSkillImg(this, target, this.battle.tick, true);
                this.battle.animalSkillImgsArr.push(animalSpecialSkillImg);
            }
            else if (target.index === 60) {
                if (this.totalAttackNumbers % 10 === 0 && !target.dead) {
                    target.debuffArr[target.debuffArr.length - 1].endTick +=
                        2 / stunTime;
                }
            }
        }
        else if (this.typeNumber === 10) {
            if (this.totalAttackNumbers % 3 !== 0)
                return;
            const animalSkillImg = new AnimalSkillImg(this, target, this.battle.tick);
            this.battle.animalSkillImgsArr.push(animalSkillImg);
            this.battle.goldIncrease += 2 * skillCoefficientArr[this.grade];
            if (this.totalAttackNumbers %
                (300 - (this.grade >= 3 ? this.eachUpgrade : 0)) !==
                0)
                return;
            this.battle.jadeIncrease += 2 * skillCoefficientArr[this.grade];
        }
    }
}
const getAnimalSkillInfo = (grade, typeNumber) => {
    let animalSkillInfo = animalSkillInfoList[typeNumber].replace(/\[([0-9\.]+)\]/g, function (match, num) {
        return `${[0, 0.5, 1, 2, 4][grade] * Number(num)}`;
    });
    animalSkillInfo = `${animalSkillInfo}${grade >= 3 && typeNumber === 6
        ? " (개별 육성 비례하여 이동속도 감소 효과 소폭 증가)"
        : ""}${grade === 4 ? `\n\n${monarchAnimalExtraSkillInfoList[typeNumber]}` : ""}`;
    return animalSkillInfo;
};
const clickBattleZone = (event) => {
    if (!battle || battle.tick <= 0 || battle.pauseOrNot === true)
        return;
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;
    const coordX = Math.floor((offsetX / battleZoneWrapper.offsetWidth) * 10);
    const coordY = Math.floor((offsetY / battleZoneWrapper.offsetHeight) * 10);
    if ([1, 2, 4, 5, 7, 8].includes(coordX) &&
        [1, 2, 4, 5, 7, 8].includes(coordY)) {
        const targetZoneNumber = coordY * 10 + coordX;
        if (battleZoneClickMode === "info") {
            const targetAnimal = battle.animalsArr.find((animal) => {
                return animal.zoneNumber === targetZoneNumber;
            });
            if (!targetAnimal) {
                return;
            }
            savedZoneNumber = targetZoneNumber;
            const { grade, typeNumber, firstAttackDamage, firstAttackSpeed } = targetAnimal;
            updateImgSrc(animalProfileImg, animalNameList[grade][typeNumber], "animals");
            animalGrade.innerText = `[${animalGradeKorNameList[grade]}]`;
            animalGrade.classList.add([
                "babyGradeSpan",
                "smallGradeSpan",
                "beastGradeSpan",
                "mysteriousCreatureGradeSpan",
                "monarchGradeSpan",
            ][grade]);
            animalName.innerText = animalKorNameList[grade][typeNumber];
            animalSpecContainer.innerText = `공격력: ${formatNumber(firstAttackDamage)}\n\n공격속도: ${firstAttackSpeed.toFixed(2)}`;
            animalSkillInfo.innerText =
                grade === 0 ? "" : getAnimalSkillInfo(grade, typeNumber);
        }
        else {
            if (savedZoneNumber !== targetZoneNumber) {
                battle.moveLog.push(`${battle.tick + 1}_${savedZoneNumber}-${targetZoneNumber}`);
                savedZoneNumber = targetZoneNumber;
            }
            battleZoneClickMode = "info";
        }
    }
};
const clickAnimalMoveBtn = () => {
    if (!battle || battle.tick <= 0 || battle.pauseOrNot === true)
        return;
    battleZoneClickMode = "move";
};
const alertByModal = (msg) => {
    alertModal.innerText = msg;
    alertModal.style.display = "flex";
    OutOfAlertModal.style.display = "flex";
};
// event listener
document.addEventListener("visibilitychange", () => {
    if (battle && document.hidden && !battle.pauseOrNot && battle.tick > 0) {
        battle.pauseBattle();
        pauseBtn.innerText = "시작";
    }
});
battleZoneWrapper.addEventListener("click", clickBattleZone);
animalMoveBtn.addEventListener("click", clickAnimalMoveBtn);
document.addEventListener("keyup", (event) => {
    if (event.key === " ") {
        clickAnimalMoveBtn();
    }
});
hpVisibleToggleBtn.addEventListener("click", () => {
    if (battle && battle.tick > 0) {
        battle.hpVisible = battle.hpVisible ? false : true;
    }
});
speedControlBtn.addEventListener("click", () => {
    if (battle && battle.tick > 0) {
        if (battle.speed === 1) {
            battle.controlSpeed(2);
            speedControlBtn.innerText = "⨉2";
        }
        else {
            battle.controlSpeed(1);
            speedControlBtn.innerText = "⨉1";
        }
    }
});
pauseBtn.addEventListener("click", () => {
    if (battle && battle.tick > 0) {
        if (battle.pauseOrNot) {
            battle.proceedBattle();
            pauseBtn.innerText = "정지";
        }
        else {
            battle.pauseBattle();
            pauseBtn.innerText = "시작";
        }
    }
});
giveUpBtn.addEventListener("click", async () => {
    try {
        const loginCode = localStorage.getItem("LOGIN_CODE");
        if (!loginCode) {
            location.href = "/login";
            return;
        }
        const res = await axios.default.post("/battle/giveUpBattle", {
            loginCode,
        });
        const { data } = res;
        const { error } = data;
        if (error) {
            throw new Error();
        }
        location.href = "/home";
    }
    catch (err) {
        location.href = "/login";
    }
});
checkBeforeBattle();
