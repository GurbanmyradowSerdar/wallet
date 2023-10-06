class In {
  text;
  money;
  date;
  constructor(text, money, date) {
    this.text = text;
    this.money = money;
    this.date = date;
  }
}

class Out {
  text;
  money;
  date;
  constructor(text, money, date) {
    this.text = text;
    this.money = money;
    this.date = date;
  }
}
let inArr = [];
let outArr = [];

// ! Set values in localStorage ///////////////////////////////////////////////////////
function save() {
  if (inArr.length > 0) {
    localStorage.setItem("inArr", JSON.stringify(inArr));
  }
  if (outArr.length > 0) {
    localStorage.setItem("outArr", JSON.stringify(outArr));
  }
}

//! Get values in localStorage and loading dashboard ///////////////////////////////////////////////////////
function load() {
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
    // ! in and out cards
    setInCardDetails();
    setOutCardDetails();
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
        // ! putting data to ui
        // ! time
        setTime();
        // ! priceBoards details
        setPriceBoardsDetails();
        // ! user profile
        setUserProfileCardDetails();
        // ! in and out cards
        setInCardDetails();
        setOutCardDetails();
      } else {
      }
    });
  }
}

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
    date = new Date(),
    todaysDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

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
  if (inArr.length > 0) {
    incomeAllTimeCurrent = inArr.reduce(
      (prev, cur) => prev + Number(cur.money),
      0
    );

    incomeTodayCurrent = inArr
      .filter((item) => item.date === todaysDate)
      .reduce((prev, cur) => prev + Number(cur.money), 0);
  }

  // ! calculating expense priceBoard
  if (outArr.length > 0) {
    expenseAllTimeCurrent = outArr.reduce(
      (prev, cur) => prev + Number(cur.money),
      0
    );

    expenseTodayCurrent = outArr
      .filter((item) => item.date === todaysDate)
      .reduce((prev, cur) => prev + Number(cur.money), 0);
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
    n = 0;

  // ! setting data to ui
  username.innerText = getItemFromLocalStorage("username");
  startedAt.children.item(1).innerText = getItemFromLocalStorage("startedAt");

  // ! notes
  n += inArr.length > 0 ? inArr.length : 0;
  n += outArr.length > 0 ? outArr.length : 0;
  notes.children.item(1).innerText = n;

  // ! best income
  bestIncome.children.item(1).innerText =
    inArr.length > 0 ? Math.max(...inArr.map((item) => Number(item.money))) : 0;

  // ! worst expense
  worstExpense.children.item(1).innerText =
    outArr.length > 0
      ? Math.max(...outArr.map((item) => Number(item.money)))
      : 0;
}

// ! set in cards details
function setInCardDetails() {
  let listParent = document.getElementById("list__list-wrapper-income");

  // ! remove previous children from list
  while (listParent.firstChild) {
    listParent.removeChild(listParent.firstChild);
  }

  // ! putting data to ui (to list)
  if (inArr.length > 0) {
    inArr.reverse().forEach((item, index) => {
      // ! creating dom elements
      let li = document.createElement("li"),
        amount = document.createElement("p"),
        divider = document.createElement("div"),
        date = document.createElement("p"),
        description = document.createElement("p");

      // ! setting attributes to them
      li.className = "list__item in";
      amount.className = "list__item-amount";
      divider.className = "list__item-divider";
      date.className = "list__item-date";
      description.className = "list__item-desc";

      // ! setting theirs content
      amount.innerText = item.money;
      date.innerText = item.date;
      description.innerText = item.text;

      // ! adding elements into dom
      li.append(amount, divider.cloneNode(true), date, divider, description);
      listParent.append(li);

      // ! show popup when clicked
      li.onclick = function (e) {
        showPopup(this);
      };
    });
    inArr.reverse();
  }
}

// ! set out cards details
function setOutCardDetails() {
  let listParent = document.getElementById("list__list-wrapper-expense");

  // ! remove previous children from list
  while (listParent.firstChild) {
    listParent.removeChild(listParent.firstChild);
  }

  // ! putting data to ui (to list)
  if (outArr.length > 0) {
    outArr.reverse().forEach((item, index) => {
      // ! creating dom elements
      let li = document.createElement("li"),
        amount = document.createElement("p"),
        divider = document.createElement("div"),
        date = document.createElement("p"),
        description = document.createElement("p");

      // ! setting attributes to them
      li.className = "list__item out";
      amount.className = "list__item-amount";
      divider.className = "list__item-divider";
      date.className = "list__item-date";
      description.className = "list__item-desc";

      // ! setting theirs content
      amount.innerText = item.money;
      date.innerText = item.date;
      description.innerText = item.text;

      // ! adding elements into dom
      li.append(amount, divider.cloneNode(true), date, divider, description);
      listParent.append(li);

      // ! show popup when clicked
      li.onclick = function (e) {
        showPopup(this);
      };
    });
    outArr.reverse();
  }
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

// ! onclick list item to show popup
function showPopup(thisItem) {
  let popup = document.getElementById("popup"),
    fade = document.querySelector(".fade"),
    titleElement = document.getElementById("popup-title"),
    amountElement = document.getElementById("popup-amount-text"),
    dateElement = document.getElementById("popup-date-text"),
    descElement = document.getElementById("popup-desc-text"),
    deleteElement = document.getElementById("popup-delete"),
    okElement = document.getElementById("popup-ok"),
    amount = `${thisItem.children.item(0).innerText}`,
    date = `${thisItem.children.item(2).innerText}`,
    desc = `${thisItem.children.item(4).innerText}`;

  // ! implementing ui
  popup.className = "popup-active";
  fade.style.display = "block";
  amountElement.innerText = amount;
  dateElement.innerText = date;
  descElement.innerText = desc;
  thisItem.className.includes("in")
    ? (titleElement.innerText = "Income")
    : (titleElement.innerText = "Expense");

  // ! buttons handlers
  okElement.onclick = function () {
    popup.className = "popup";
    fade.style.display = "none";
  };
  deleteElement.onclick = function () {
    let item = {};
    item.money = amount;
    item.text = desc;
    item.date = date;

    if (thisItem.className.includes("in")) {
      inArr.filter((value, index) => {
        if (
          value.money === item.money &&
          value.date === item.date &&
          value.text === item.text
        ) {
          inArr.splice(index, 1);

          // ! solution for arr is empty but in local storage we have data and it cant be setted because array is empty
          localStorage.setItem("inArr", JSON.stringify(inArr));

          setInCardDetails();
          setPriceBoardsDetails();
          setUserProfileCardDetails();
        }
      });
    } else {
      outArr.filter((value, index) => {
        if (
          value.money === item.money &&
          value.date === item.date &&
          value.text === item.text
        ) {
          outArr.splice(index, 1);
          // ! solution for arr is empty but in local storage we have data and it cant be setted because array is empty
          localStorage.setItem("outArr", JSON.stringify(outArr));

          setOutCardDetails();
          setPriceBoardsDetails();
          setUserProfileCardDetails();
        }
      });
    }
    popup.className = "popup";
    fade.style.display = "none";
  };
}

// ! user cards buttons handlers
{
  let setIncomeLimit = document.getElementById("set-income-limit"),
    setExpenseLimit = document.getElementById("set-expense-limit"),
    deleteAll = document.getElementById("delete-all"),
    parentOfButtons = document.querySelector(".user__buttons-primiry"),
    okButton = parentOfButtons.children.item(1),
    cancelButton = parentOfButtons.children.item(2);
  // ! income limit buttons
  setIncomeLimit.onclick = function (e) {
    let input = document.getElementById("income-limit-user");

    okButton.className = "add-btn-active";
    cancelButton.className = "cancel-btn-active";

    this.style.display = "none";
    setExpenseLimit.style.display = "none";

    input.placeholder = "income limit... 120";
    input.classList = "set-limit-active";

    input.focus();
    input.onkeydown = function (e) {
      if (e.key === "Enter") {
        okButtonHandler();
      }
    };

    function okButtonHandler() {
      if (input.value.length > 0 && !isNaN(input.value)) {
        localStorage.setItem("incomeLimit", input.value);
        input.value = "";

        okButton.className = "add-btn-hidden";
        cancelButton.className = "cancel-btn-hidden";

        setIncomeLimit.style.display = "block";
        setExpenseLimit.style.display = "block";

        input.placeholder = "";
        input.classList = "set-limit-hidden";

        // ! recalculating data and updating ui
        setPriceBoardsDetails();
      }
    }

    // ! ok and cancel click handlers
    okButton.onclick = okButtonHandler;

    cancelButton.onclick = function (e) {
      okButton.className = "add-btn-hidden";
      cancelButton.className = "cancel-btn-hidden";

      setIncomeLimit.style.display = "block";
      setExpenseLimit.style.display = "block";

      input.placeholder = "";
      input.classList = "set-limit-hidden";

      input.value = "";
    };
  };

  // ! expense limit buttons
  setExpenseLimit.onclick = function (e) {
    let input = document.getElementById("income-limit-user");

    okButton.className = "add-btn-active";
    cancelButton.className = "cancel-btn-active";

    this.style.display = "none";
    setIncomeLimit.style.display = "none";

    input.placeholder = "expense limit... 120";
    input.classList = "set-limit-active";

    input.focus();
    input.onkeydown = function (e) {
      if (e.key === "Enter") {
        okButtonHandler();
      }
    };

    function okButtonHandler() {
      if (input.value.length > 0 && !isNaN(input.value)) {
        localStorage.setItem("expenseLimit", input.value);
        input.value = "";

        okButton.className = "add-btn-hidden";
        cancelButton.className = "cancel-btn-hidden";

        setIncomeLimit.style.display = "block";
        setExpenseLimit.style.display = "block";

        input.placeholder = "";
        input.classList = "set-limit-hidden";

        // ! recalculating data and updating ui
        setPriceBoardsDetails();
      }
    }

    // ! ok and cancel click handlers
    okButton.onclick = okButtonHandler;

    cancelButton.onclick = function (e) {
      okButton.className = "add-btn-hidden";
      cancelButton.className = "cancel-btn-hidden";

      setIncomeLimit.style.display = "block";
      setExpenseLimit.style.display = "block";

      input.placeholder = "";
      input.classList = "set-limit-hidden";

      input.value = "";
    };
  };

  // ! delete all button
  deleteAll.onclick = function (e) {
    if (confirm("are you sure to delete all data?")) {
      let priceCard = document.querySelector(".priceboard"),
        cards = document.querySelector(".cards"),
        registration = document.getElementById("registration");

      registration.style.display = "flex";
      document.body.style.overflow = "hidden";
      priceCard.style.visibility = "hidden";
      cards.style.visibility = "hidden";

      // ? nulling local storage
      localStorage.removeItem("username");
      localStorage.removeItem("incomeLimit");
      localStorage.removeItem("expenseLimit");
      localStorage.removeItem("isLogined");
      localStorage.removeItem("startedAt");
      localStorage.removeItem("inArr");
      localStorage.removeItem("outArr");
      inArr = [];
      outArr = [];

      // ! i have some issue my js not working after code above, i use this for solution
      location.reload();
    } else {
    }
  };
}

// ! income inputs buttons handlers
{
  let incomeAmount = document.getElementById("pricecard-income-amount"),
    incomeDesc = document.getElementById("pricecard-income-desc"),
    incomeCancel = document.getElementById("pricecard-in-cancel"),
    incomeAdd = document.getElementById("pricecard-in-add");
  // ! validation add
  incomeAdd.onclick = function (e) {
    if (
      incomeAmount.value.length > 0 &&
      !isNaN(incomeAmount.value) &&
      incomeDesc.value.length > 0
    ) {
      incomeAmount.parentElement.children.item(0).style.color = "white";
      incomeDesc.parentElement.children.item(0).style.color = "white";

      inArr.push(
        new In(
          incomeDesc.value,
          incomeAmount.value,
          `${new Date().getDate()}/${
            new Date().getMonth() + 1
          }/${new Date().getFullYear()}`
        )
      );
      incomeAmount.value = "";
      incomeDesc.value = "";

      // ! recalculating data and updating ui
      setInCardDetails();
      setPriceBoardsDetails();
      setUserProfileCardDetails();
    } else {
      incomeAmount.parentElement.children.item(0).style.color = "red";
      incomeDesc.parentElement.children.item(0).style.color = "red";
    }
  };
  // ! cancel handling
  incomeCancel.onclick = function (e) {
    incomeAmount.value = "";
    incomeDesc.value = "";
    incomeAmount.parentElement.children.item(0).style.color = "white";
    incomeDesc.parentElement.children.item(0).style.color = "white";
  };
}

// ! expense inputs buttons handlers
{
  let expenseAmount = document.getElementById("pricecard-expense-amount"),
    expenseDesc = document.getElementById("pricecard-expense-desc"),
    expenseCancel = document.getElementById("pricecard-out-cancel"),
    expenseAdd = document.getElementById("pricecard-out-add");

  // ! validation add
  expenseAdd.onclick = function (e) {
    if (
      expenseAmount.value.length > 0 &&
      !isNaN(expenseAmount.value) &&
      expenseDesc.value.length > 0
    ) {
      expenseAmount.parentElement.children.item(0).style.color = "white";
      expenseDesc.parentElement.children.item(0).style.color = "white";

      outArr.push(
        new Out(
          expenseDesc.value,
          expenseAmount.value,
          `${new Date().getDate()}/${
            new Date().getMonth() + 1
          }/${new Date().getFullYear()}`
        )
      );
      expenseAmount.value = "";
      expenseDesc.value = "";
      // ! recalculating data and updating ui
      setOutCardDetails();
      setPriceBoardsDetails();
      setUserProfileCardDetails();
    } else {
      expenseAmount.parentElement.children.item(0).style.color = "red";
      expenseDesc.parentElement.children.item(0).style.color = "red";
    }
  };
  // ! cancel handling
  expenseCancel.onclick = function (e) {
    expenseAmount.value = "";
    expenseDesc.value = "";
    expenseAmount.parentElement.children.item(0).style.color = "white";
    expenseDesc.parentElement.children.item(0).style.color = "white";
  };
}

// ! fade onclick handler
{
  document.querySelector(".fade").onclick = () => {
    let popup = document.getElementById("popup"),
      fade = document.querySelector(".fade");

    popup.className = "popup";
    fade.style.display = "none";
  };
}

// ! managing the window resize event handler
{
  function windowResizeTabletHandler() {
    let windowWidth = window.innerWidth,
      parent = document.querySelector(".cards__user"),
      profileElement = parent.querySelector(".user__profile"),
      buttonsElement = parent.querySelector(".user__buttons"),
      wrapperElement = parent.children.item(0);

    if (windowWidth > 414 && windowWidth <= 1000) {
      // ! if tablet
      wrapperElement.append(profileElement, buttonsElement);
      wrapperElement.style.display = "flex";
    } else {
      // ! if not tablet fixing the changes
      parent.insertBefore(profileElement, wrapperElement.nextElementSibling);
      parent.append(buttonsElement);
      while (wrapperElement.firstChild) {
        wrapperElement.removeChild(wrapperElement.firstChild);
      }
      wrapperElement.style.display = "none";
    }
  }
  windowResizeTabletHandler();
  window.addEventListener("resize", windowResizeTabletHandler);
}
