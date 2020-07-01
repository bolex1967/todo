"use strict";
window.onload = initTodoList;
const inputElement = document.getElementById("in");
const radio = document.getElementsByName("radio");
// const view = "2";
const ulElement = document.getElementById("out");
const todoList = JSON.parse(localStorage.getItem("todoList")) || [];

function radioChange() {
  console.log(this);
  const view = this.value;
  const ttt = document.querySelectorAll("ul li");
  console.log("view: = ", view);
  console.log(ttt);

  for (let i = 0; i < ttt.length; i++) {
    const liElement = ttt[i];
    console.log(liElement);

    if (view === "1") {
      liElement.classList.remove("hide");
    }

    if (view === "2") {
      if (liElement.classList.contains("checked")) {
        liElement.classList.add("hide");
      } else {
        liElement.classList.remove("hide");
      }
    }

    if (view === "3") {
      if (!liElement.classList.contains("checked")) {
        liElement.classList.add("hide");
      } else {
        liElement.classList.remove("hide");
      }
    }
  }
}

function initTodoList() {
  for (let i = 0; i < radio.length; i++) {
    radio[i].onchange = radioChange;
  }

  for (let todo of todoList) {
    // ulElement.append(renderTodo(todo));
    ulElement.prepend(renderTodo(todo));
  }
  inputElement.onkeypress = function (f) {
    if (f.keyCode === 13) {
      console.log("Enter");
      addItem();
    }
  };
  radioChange.call({ value: "2" });
}

// {} - JS object
// { abc: 1 }
// this -> {}
// this.value -> { value: "2" }

function addItem() {
  const value = inputElement.value;
  const date = new Date();

  if (value !== "") {
    const todoItem = {
      id: date.getTime(),
      date: date,
      text: value,
      checked: false,
    };
    todoList.push(todoItem);

    ulElement.prepend(renderTodo(todoItem));

    inputElement.value = "";
  }
  saveTodo();
}

function checkTodo() {
  const liElm = this.parentElement;
  const id = liElm.dataset.id;
  const todo = todoList.find((val) => val.id === Number(id));
  todo.checked = !todo.checked;

  todo.checked
    ? liElm.classList.add("checked")
    : liElm.classList.remove("checked");

  // if (todo.checked) {
  //   liElm.classList.add("checked");
  //   liElm.classList.add("hide");
  // } else {
  //   liElm.classList.remove("checked");
  //   liElm.classList.remove("hide");
  // }
  saveTodo();
}

function deleteTodo() {
  if (!confirm("Do you really want to delete this todo?")) return;
  const liElm = this.parentElement;
  const id = liElm.dataset.id;
  liElm.remove();
  const index = todoList.findIndex((val) => val.id === Number(id));
  todoList.splice(index, 1);
  saveTodo();
}

function renderTodo(todoItem) {
  const liElm = document.createElement("li");
  const divElm = document.createElement("div");
  const inputElm = document.createElement("input");
  const buttonElm = document.createElement("button");

  liElm.dataset.id = todoItem.id;
  divElm.textContent = todoItem.text;
  divElm.classList.add("todo");
  inputElm.type = "checkbox";
  inputElm.checked = todoItem.checked;
  buttonElm.textContent = "x";

  todoItem.checked
    ? liElm.classList.add("checked")
    : liElm.classList.remove("checked");

  inputElm.onchange = checkTodo;
  buttonElm.onclick = deleteTodo;

  liElm.append(buttonElm);
  liElm.append(inputElm);
  liElm.append(divElm);
  return liElm;
}

function saveTodo() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
