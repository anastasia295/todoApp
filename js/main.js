const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((element) => {
    renderTask(element);
  });
}

checkEmtyList();

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

function addTask(event) {
  event.preventDefault();
  const taskText = taskInput.value;

  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);

  renderTask(newTask);
  taskInput.value = "";
  taskInput.focus();
  checkEmtyList();
  saveToLocalStorage();

  if (tasks.length > 0) {
    const emtyListEl = document.querySelector("#emptyList");

    emtyListEl ? emtyListEl.remove() : null;
  }
}

console.log(tasks);
function deleteTask(event) {
  if (event.target.dataset.action !== "delete") return;

  const parenNode = event.target.closest(".list-group-item");

  const id = Number(parenNode.id);

  const index = tasks.findIndex((el) => el.id === id);

  tasks.splice(index, 1);

  parenNode.remove();
  checkEmtyList();
  saveToLocalStorage();
}

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;
  const parenNode = event.target.closest(".list-group-item");

  const id = Number(parenNode.id);

  const task = tasks.find((el) => el.id === id);
  task.done = !task.done;

  const taskTitle = parenNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");
  saveToLocalStorage();
}

function checkEmtyList() {
  if (tasks.length === 0) {
    const emtyListElement = `<li id="emptyList" class="list-group-item empty-list">
<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3" />
<div class="empty-list__title">Список дел пуст</div>
</li>`;
    tasksList.insertAdjacentHTML("afterbegin", emtyListElement);
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(element) {
  const cssClass = element.done ? "task-title task-title--done" : "task-title";

  const taskHTML = `<li id='${element.id}' class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${element.text}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
      </li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);
}
