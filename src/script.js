// Source - https://stackoverflow.com/a
// Posted by jAndy, modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-27, License - CC BY-SA 4.0

let items = [];


function carregar() {
  const storedItems = localStorage.getItem("items");
  if (storedItems) {
    items = JSON.parse(storedItems);
  }
}

function salvar(items) {
  localStorage.setItem("items", JSON.stringify(items));
}

carregar();
renderTasks();
console.log(items);

const addItemBnt = document.getElementById("add-item");
const addBnt = document.getElementById("add");
const newItem = document.getElementById("add-item-input");

const setNameBtn = document.getElementById("set-task-name");
const taskName = document.getElementById("task-name-input");
const change = document.getElementById("set-name");
const tname = document.getElementById("changeName");

function show(el) {
  el.style.display = "block";
}

function hide(el) {
  el.style.display = "none";
}

function setTaskName() {
  hide(setNameBtn);
  hide(tname);
  show(taskName);
  show(change);
}

function setName() {
  const newName = document.getElementById("task-name-input").value;
  const changeName = document.getElementById("changeName");
  if (newName) {
    changeName.textContent = newName;
    show(setNameBtn);
    hide(change);
    hide(taskName);
    show(tname);
    newName.value = "";
    notificacao("Nome da tarefa atualizado com sucesso!");
  } else {
    changeName.textContent = "Just do it!";
    hide(change);
    hide(taskName);
    show(tname);
    show(setNameBtn);
  }
}

function addItem() {
  hide(addItemBnt);
  show(addBnt);
  show(newItem);
}

function add() {
  const text = newItem.value.trim();

  //Se tarefa existe, se não está vazia, e se já existe
  if (text && !items.some((i) => i.nome === text)) {
    addTask(text);
    salvar(items);
    renderTasks();
    notificacao("Tarefa adicionada com sucesso!");
  } else if (text) {
    notificacao("Tarefa já existe!", "red");
  }

  newItem.value = "";

  hide(addBnt);
  hide(newItem);
  show(addItemBnt);
}

function addTask(nome) {
  items.push({ nome });
  console.log(items);
}

function renderTasks() {
  const tasks = document.getElementById("tasks");
  tasks.innerHTML = "";
  let tarefas = localStorage.getItem("items");
  tarefas = JSON.parse(tarefas);

  if (!tarefas) {
    tarefas = [];
  }

  tarefas.forEach((item) => {
    const task = document.createElement("div");
    tasks.appendChild(task);
    task.id = "task";
    const tarefa = document.createElement("p");
    tarefa.textContent = item.nome;
    task.appendChild(tarefa);

    //Options div
    const options = document.createElement("div");
    options.id = "options";
    options.style.display = "flex";
    options.style.gap = "5px";
    options.style.backgroundColor = "transparent";
    task.appendChild(options);

    //Concluir tarefa
    const completeBnt = document.createElement("div");
    completeBnt.id = "complete";
    const completeImg = document.createElement("img");
    completeImg.src = "assets/correct.png";
    completeImg.alt = "complete";
    completeImg.id = "complete-img";

    completeBnt.appendChild(completeImg);
    options.appendChild(completeBnt);

    completeBnt.addEventListener("click", () => {
      task.classList.toggle("completed");
      if (task.classList.contains("completed")) {
        notificacao("Tarefa concluída!", "green");
      } else {
        notificacao("Tarefa desmarcada!");
      }
    });

    //Deletar tarefas
    const deleteBnt = document.createElement("button");
    deleteBnt.id = "delete";
    const deleteImg = document.createElement("img");
    deleteImg.src = "assets/trash-can.png";
    deleteImg.alt = "Delete";
    deleteImg.id = "delete-img";
    deleteBnt.appendChild(deleteImg);
    options.appendChild(deleteBnt);

    deleteBnt.addEventListener("click", () => {
      task.remove();
      items = items.filter((i) => i.nome !== item.nome);
      salvar(items);
      notificacao("Tarefa removida com sucesso!", "green");

    });
  });
}

function notificacao(message, color) {
  const notification = document.getElementById("notification-container");
  const notify = document.createElement("div");
  notify.classList.add("notification");
  notify.textContent = message;
  notify.style.backgroundColor = color;
  notification.appendChild(notify);

  setTimeout(() => {
    notify.remove();
  }, 3000);
}
