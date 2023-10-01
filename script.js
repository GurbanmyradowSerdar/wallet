class In {
  text;
  money;
  constructor(text, money) {
    this.text = text;
    this.money = money;
  }
}
let inArr = [];
let outArr = [];
let result = 0;
let isFirstVisit = false;

class Out {
  text;
  money;
  constructor(text, money) {
    this.text = text;
    this.money = money;
  }
}

// Show input block ///////////////////////////////////////////////////////
// function showInput(which) {
//   let box = document.getElementById("box");
//   box.style.display = "none";

//   let cont = document.createElement("div"),
//     text = document.createElement("input"),
//     money = document.createElement("input"),
//     chooseCont = document.createElement("div"),
//     ok = document.createElement("button"),
//     cancel = document.createElement("button");

//   let body = document.body;

//   cont.id = "input";
//   text.id = "input__text";
//   money.id = "input__money";
//   chooseCont.id = "input__choose";
//   cancel.id = "input__cancel";
//   ok.id = "input__ok";

//   money.placeholder = "Ex 30...";
//   ok.innerHTML = "OK";
//   cancel.innerHTML = "Cancel";

//   append(cont, text);
//   append(cont, money);
//   append(chooseCont, ok);
//   append(chooseCont, cancel);
//   append(cont, chooseCont);

//   append(body, cont);

//   cancel.onclick = () => {
//     body.removeChild(cont);
//     box.style.display = "flex";
//   };

//   if (which) {
//     text.placeholder = "Ex website...";

//     ok.onclick = function okClick() {
//       let a = text.value.trim();
//       let b = money.value.trim();

//       if (a.length === 0 || isNaN(b) || b.length === 0) {
//       } else {
//         ok.style.display = "flex";
//         inArr.push(new In(a, b));

//         result += Number(b);
//         body.removeChild(cont);
//         box.style.display = "flex";
//       }
//     };
//   } else {
//     text.placeholder = "Ex food...";

//     ok.onclick = function okClick() {
//       let a = text.value;
//       let b = money.value;

//       if (a.length === 0 || isNaN(b) || b.length === 0) {
//       } else {
//         if (b < result) {
//           ok.style.display = "flex";
//           outArr.push(new Out(a, b));

//           result -= Number(b);

//           body.removeChild(cont);
//           box.style.display = "flex";
//         } else {
//           alert("You don't have enough money for do this");
//         }
//       }
//     };
//   }
// }

// show result ///////////////////////////////////////////////////////
// function showRes() {
//   let box = document.getElementById("box");
//   box.style.display = "none";

//   let cont = document.createElement("div"),
//     res = document.createElement("h1"),
//     desIn = document.createElement("h3"),
//     desOut = document.createElement("h3"),
//     textIn = document.createElement("div"),
//     textOut = document.createElement("div"),
//     chooseCont = document.createElement("div"),
//     ok = document.createElement("button"),
//     clear = document.createElement("button");

//   let body = document.body;

//   textIn.className = "result__box";
//   textOut.className = "result__box";
//   cont.id = "show-box";
//   res.id = "show__res";
//   chooseCont.id = "input__choose";
//   clear.id = "input__cancel";
//   ok.id = "input__ok";

//   res.innerHTML = `Result = ${result}$`;
//   ok.innerHTML = "OK";
//   clear.innerHTML = "Clear";
//   let answer = 0;
//   inArr.forEach((item, i) => (answer += Number(item.money)));
//   desIn.innerHTML = `Income : ${answer}$`;
//   answer = 0;
//   outArr.forEach((item, i) => (answer += Number(item.money)));
//   desOut.innerHTML = `Expense : ${answer}$`;

//   inArr.forEach((elem, i) => {
//     let t = document.createElement("p");
//     let t1 = document.createElement("p");
//     t.innerHTML = `Description : ${elem.text}`;
//     t1.innerHTML = `Money : ${elem.money}$`;
//     append(textIn, t);
//     append(textIn, t1);
//   });

//   outArr.forEach((elem, i) => {
//     let t = document.createElement("p");
//     let t1 = document.createElement("p");
//     t.innerHTML = `Description : ${elem.text}`;
//     t1.innerHTML = `Money : ${elem.money}$`;
//     append(textOut, t);
//     append(textOut, t1);
//   });

//   append(cont, res);
//   append(cont, desIn);
//   append(cont, textIn);
//   append(cont, desOut);
//   append(cont, textOut);
//   append(chooseCont, ok);
//   append(chooseCont, clear);
//   append(cont, chooseCont);

//   append(body, cont);

//   ok.onclick = () => {
//     body.removeChild(cont);
//     box.style.display = "flex";
//   };

//   clear.onclick = () => {
//     desIn.innerHTML = `Income : 0$`;
//     desOut.innerHTML = `Expense : 0$`;
//     result = 0;
//     window.localStorage.clear();
//     inArr = [];
//     outArr = [];
//     res.innerHTML = `Result = ${result}$`;
//     textIn.innerHTML = "";
//     textOut.innerHTML = "";
//   };
// }

// let income = document.getElementById("income");
// // Onclick income ///////////////////////////////////////////////////////
// income.onclick = () => {
//   showInput(true);
// };

// let expense = document.getElementById("expense");
// // Onclick expense ///////////////////////////////////////////////////////
// expense.onclick = () => {
//   showInput(false);
// };

// let show = document.getElementById("show");
// // Onclick show ///////////////////////////////////////////////////////
// show.onclick = () => {
//   showRes();
// };

// append ///////////////////////////////////////////////////////
// function append(parent, elem) {
//   parent.appendChild(elem);
// }

// Set values in localStorage ///////////////////////////////////////////////////////
function save() {
  if (result > 0) {
    window.localStorage.setItem("result", JSON.stringify(result));
  }
  if (inArr.length > 0) {
    window.localStorage.setItem("inArr", JSON.stringify(inArr));
  }
  if (outArr.length > 0) {
    window.localStorage.setItem("outArr", JSON.stringify(outArr));
  }
}

//! Get values in localStorage and loading dashboard ///////////////////////////////////////////////////////
function load() {
  result = Number(getItemFromLocalStorage("result"));

  let i = getItemFromLocalStorage("inArr");
  if (i !== null) inArr = JSON.parse(i);

  let o = getItemFromLocalStorage("outArr");
  if (o !== null) outArr = JSON.parse(o);

  // ! check is logined
  let isLogined = getItemFromLocalStorage("isLogined"),
    confirmButton = document.getElementById("registration-confirm");

  if (isLogined !== null && isLogined) {
    let priceCard = document.querySelector(".priceboard"),
      cards = document.querySelector(".cards"),
      registration = document.getElementById("registration");

    registration.style.display = "none";
    document.body.style.overflow = "auto";
    priceCard.style.visibility = "visible";
    cards.style.visibility = "visible";
    priceCard.style.animation = "fade-in 0.8s ease-in-out forwards";
    cards.style.animation = "fade-in 0.8s ease-in-out forwards";

    // ! putting data to ui
    // ! time
    setTime();
    // ! priceBoards details
    setPriceBoardsDetails();
    // ! user profile
    setUserProfileCardDetails();
  } else {
    confirmButton.addEventListener("click", function () {
      if (registerValidator()) {
        let registration = document.getElementById("registration"),
          priceCard = document.querySelector(".priceboard"),
          cards = document.querySelector(".cards");

        registration.className = "registration-hide";
        priceCard.style.visibility = "visible";
        cards.style.visibility = "visible";
        priceCard.style.animation = "fade-in 0.8s ease-in-out forwards";
        cards.style.animation = "fade-in 0.8s ease-in-out forwards";

        setTimeout(() => {
          registration.style.display = "none";
          document.body.style.overflow = "auto";
        }, 800);
      } else {
      }
    });
  }
}

// ! onClick confirm button in registration

// ! validation of registration
function registerValidator() {
  let username = document.getElementById("username__input"),
    incomeLimit = document.getElementById("income__input"),
    expenseLimit = document.getElementById("expense__input");
  if (
    username.value.length !== 0 &&
    username.value.length <= 15 &&
    !isNaN(incomeLimit.value) &&
    !isNaN(expenseLimit.value) &&
    incomeLimit.value.length !== 0 &&
    expenseLimit.value.length !== 0
  ) {
    // ! sets value to local storage
    localStorage.setItem("username", username.value);
    localStorage.setItem("incomeLimit", incomeLimit.value);
    localStorage.setItem("expenseLimit", expenseLimit.value);
    localStorage.setItem("isLogined", true);
    localStorage.setItem(
      "startedAt",
      `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}`
    );
    return true;
  } else {
    return false;
  }
}

// ! setting time
function setTime() {
  let data = document.getElementById("time-date"),
    time = document.getElementById("time-hour");

  function addZero(value) {
    if (value <= 9) {
      return `0${value.toString()}`;
    } else {
      return value;
    }
  }

  setInterval(() => {
    let currentDate = new Date(),
      hour = addZero(currentDate.getHours()),
      minute = addZero(currentDate.getMinutes()),
      date = addZero(currentDate.getDate()),
      month = addZero(currentDate.getMonth() + 1);

    data.innerText = `${date}/${month}/${currentDate.getFullYear()}`;

    time.innerText = `${hour}:${minute}`;
  }, 1000);
}

// ! setting priceBoard details
function setPriceBoardsDetails() {
  let incomeAllTime = document.getElementById("income-alltime"),
    incomeToday = document.getElementById("income-today"),
    incomeProgress = document.getElementById("income-progress-limit"),
    incomeProgressBar = document.getElementById("income-progress-bar"),
    rest = document.querySelectorAll(".rest"),
    date = new Date();

  let incomeAllTimeCurrent = 0,
    incomeTodayCurrent = 0,
    incomeProgressCurrent = isNull(getItemFromLocalStorage("incomeLimit"))
      ? 0
      : getItemFromLocalStorage("incomeLimit"),
    incomeLimit = getItemFromLocalStorage("incomeLimit"),
    restCurrent = 0;

  let expenseAllTime = document.getElementById("expense-alltime"),
    expenseToday = document.getElementById("expense-today"),
    expenseProgress = document.getElementById("expense-progress-limit"),
    expenseProgressBar = document.getElementById("expense-progress-bar");

  let expenseAllTimeCurrent = 0,
    expenseProgressCurrent = isNull(getItemFromLocalStorage("expenseLimit"))
      ? 0
      : getItemFromLocalStorage("expenseLimit"),
    expenseTodayCurrent = 0,
    expenseLimit = getItemFromLocalStorage("expenseLimit");

  // ! calculating income priceBoard
  if (!isNull(getItemFromLocalStorage("inArr"))) {
    let parsedArr = JSON.parse(getItemFromLocalStorage("inArr"));
    incomeAllTimeCurrent = parsedArr.reduce(
      (prev, cur) => prev.money + cur.money,
      0
    );
    incomeTodayCurrent = parsedArr
      .filter((item) => item.date === date.getDate())
      .reduce((prev, cur) => prev.money + cur.momey, 0);
  }

  // ! calculating expense priceBoard
  if (!isNull(getItemFromLocalStorage("outArr"))) {
    let parsedArr = JSON.parse(getItemFromLocalStorage("outArr"));
    expenseAllTimeCurrent = parsedArr.reduce(
      (prev, cur) => prev.money + cur.money,
      0
    );
    expenseTodayCurrent = parsedArr
      .filter((item) => item.date === date.getDate())
      .reduce((prev, cur) => prev.money + cur.momey, 0);
  }

  restCurrent = incomeAllTimeCurrent - expenseAllTimeCurrent;

  // ! setting data into ui
  incomeAllTime.innerText = incomeAllTimeCurrent;
  incomeToday.innerText = incomeTodayCurrent;
  incomeProgress.innerText = `${incomeTodayCurrent}/${incomeProgressCurrent}`;
  incomeProgressBar.style.width =
    incomeTodayCurrent >= incomeLimit
      ? "100%"
      : `${calculatePercent(incomeTodayCurrent, incomeLimit)}%`;

  expenseAllTime.innerText = expenseAllTimeCurrent;
  expenseToday.innerText = expenseTodayCurrent;
  expenseProgress.innerText = `${expenseTodayCurrent}/${expenseProgressCurrent}`;
  expenseProgressBar.style.width =
    expenseTodayCurrent >= expenseLimit
      ? "100%"
      : `${calculatePercent(expenseTodayCurrent, expenseLimit)}%`;

  rest.forEach((item) => (item.innerText = restCurrent));
}

// ! setting user profile card
function setUserProfileCardDetails() {
  let username = document.getElementById("username"),
    startedAt = document.getElementById("started-at"),
    notes = document.getElementById("notes"),
    bestIncome = document.getElementById("best-income"),
    worstExpense = document.getElementById("worst-expense"),
    setIncomeLimit = document.getElementById("set-income-limit"),
    setExpenseLimit = document.getElementById("set-expense-limit"),
    deleteAll = document.getElementById("delete-all");

  let inArray = JSON.parse(getItemFromLocalStorage("inArr")),
    outArray = JSON.parse(getItemFromLocalStorage("outArr"));

  // ! setting data to ui
  username.innerText = getItemFromLocalStorage("username");
  startedAt.children.item(1).innerText = getItemFromLocalStorage("startedAt");
  notes.children.item(1).innerText =
    isNull(inArray) && isNull(outArray) ? 0 : inArray.length + outArray.length;
  bestIncome.children.item(1).innerText =
    isNull(inArray) && isNull(outArray)
      ? 0
      : inArray.reduce(function (max, obj) {
          return obj.money > max ? obj.money : max;
        }, 0);

  worstExpense.children.item(1).innerText =
    isNull(inArray) && isNull(outArray)
      ? 0
      : outArray.reduce(function (max, obj) {
          return obj.money > max ? obj.money : max;
        }, 0);

  setIncomeLimit;
  setExpenseLimit;
  deleteAll;
}

// !isNull cheker
function isNull(value) {
  if (value === null) return true;
  return false;
}

// !calculating precent for progress bars
function calculatePercent(number, maxValue) {
  return (number / maxValue) * 100;
}

// ! get local storage item via key
function getItemFromLocalStorage(key) {
  return localStorage.getItem(key);
}
