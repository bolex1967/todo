window.onload = initTodoList;

const todoList = JSON.parse(localStorage.getItem("todoList")) || [];
console.log(todoList);

function saveTodo() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function initTodoList() {
  for (let todo of todoList) {
    const ulElement = document.getElementById("out");
    // ulElement.append(renderTodo(todo));
    ulElement.prepend(renderTodo(todo));
  }
}

function addItem() {
  const todoElement = document.getElementById("in");
  const value = todoElement.value;
  const date = new Date();

  if (value != "") {
    const todoItem = {
      id: date.getTime(),
      date: date,
      text: value,
      checked: false,
    };
    todoList.push(todoItem);

    const ulElement = document.getElementById("out");
    ulElement.prepend(renderTodo(todoItem));

    todoElement.value = "";
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
  // } else {
  //   liElm.classList.remove("checked");
  // }
  saveTodo();
}

function deleteTodo() {
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

  liElm.append(divElm);
  liElm.append(inputElm);
  liElm.append(buttonElm);
  return liElm;
}
