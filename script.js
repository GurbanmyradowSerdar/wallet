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
function showInput(which) {
  let box = document.getElementById("box");
  box.style.display = "none";

  let cont = document.createElement("div"),
    text = document.createElement("input"),
    money = document.createElement("input"),
    chooseCont = document.createElement("div"),
    ok = document.createElement("button"),
    cancel = document.createElement("button");

  let body = document.body;

  cont.id = "input";
  text.id = "input__text";
  money.id = "input__money";
  chooseCont.id = "input__choose";
  cancel.id = "input__cancel";
  ok.id = "input__ok";

  money.placeholder = "Ex 30...";
  ok.innerHTML = "OK";
  cancel.innerHTML = "Cancel";

  append(cont, text);
  append(cont, money);
  append(chooseCont, ok);
  append(chooseCont, cancel);
  append(cont, chooseCont);

  append(body, cont);

  cancel.onclick = () => {
    body.removeChild(cont);
    box.style.display = "flex";
  };

  if (which) {
    text.placeholder = "Ex website...";

    ok.onclick = function okClick() {
      let a = text.value.trim();
      let b = money.value.trim();

      if (a.length === 0 || isNaN(b) || b.length === 0) {
      } else {
        ok.style.display = "flex";
        inArr.push(new In(a, b));

        result += Number(b);
        body.removeChild(cont);
        box.style.display = "flex";
      }
    };
  } else {
    text.placeholder = "Ex food...";

    ok.onclick = function okClick() {
      let a = text.value;
      let b = money.value;

      if (a.length === 0 || isNaN(b) || b.length === 0) {
      } else {
        if (b < result) {
          ok.style.display = "flex";
          outArr.push(new Out(a, b));

          result -= Number(b);

          body.removeChild(cont);
          box.style.display = "flex";
        } else {
          alert("You don't have enough money for do this");
        }
      }
    };
  }
}

// show result ///////////////////////////////////////////////////////
function showRes() {
  let box = document.getElementById("box");
  box.style.display = "none";

  let cont = document.createElement("div"),
    res = document.createElement("h1"),
    desIn = document.createElement("h3"),
    desOut = document.createElement("h3"),
    textIn = document.createElement("div"),
    textOut = document.createElement("div"),
    chooseCont = document.createElement("div"),
    ok = document.createElement("button"),
    clear = document.createElement("button");

  let body = document.body;

  textIn.className = "result__box";
  textOut.className = "result__box";
  cont.id = "show-box";
  res.id = "show__res";
  chooseCont.id = "input__choose";
  clear.id = "input__cancel";
  ok.id = "input__ok";

  res.innerHTML = `Result = ${result}$`;
  ok.innerHTML = "OK";
  clear.innerHTML = "Clear";
  let answer = 0;
  inArr.forEach((item, i) => (answer += Number(item.money)));
  desIn.innerHTML = `Income : ${answer}$`;
  answer = 0;
  outArr.forEach((item, i) => (answer += Number(item.money)));
  desOut.innerHTML = `Expense : ${answer}$`;

  inArr.forEach((elem, i) => {
    let t = document.createElement("p");
    let t1 = document.createElement("p");
    t.innerHTML = `Description : ${elem.text}`;
    t1.innerHTML = `Money : ${elem.money}$`;
    append(textIn, t);
    append(textIn, t1);
  });

  outArr.forEach((elem, i) => {
    let t = document.createElement("p");
    let t1 = document.createElement("p");
    t.innerHTML = `Description : ${elem.text}`;
    t1.innerHTML = `Money : ${elem.money}$`;
    append(textOut, t);
    append(textOut, t1);
  });

  append(cont, res);
  append(cont, desIn);
  append(cont, textIn);
  append(cont, desOut);
  append(cont, textOut);
  append(chooseCont, ok);
  append(chooseCont, clear);
  append(cont, chooseCont);

  append(body, cont);

  ok.onclick = () => {
    body.removeChild(cont);
    box.style.display = "flex";
  };

  clear.onclick = () => {
    desIn.innerHTML = `Income : 0$`;
    desOut.innerHTML = `Expense : 0$`;
    result = 0;
    window.localStorage.clear();
    inArr = [];
    outArr = [];
    res.innerHTML = `Result = ${result}$`;
    textIn.innerHTML = "";
    textOut.innerHTML = "";
  };
}

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
function append(parent, elem) {
  parent.appendChild(elem);
}

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

// Get values in localStorage ///////////////////////////////////////////////////////
function load() {
  result = Number(localStorage.getItem("result"));

  let i = localStorage.getItem("inArr");
  if (i !== null) inArr = JSON.parse(i);

  let o = localStorage.getItem("outArr");
  if (o !== null) outArr = JSON.parse(o);

  let firstVisit = JSON.parse(localStorage.getItem("isFirstVisit"));
  if (firstVisit !== null && firstVisit === true) isFirstVisit = true;
}
