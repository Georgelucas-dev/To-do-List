// Source - https://stackoverflow.com/a
// Posted by jAndy, modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-27, License - CC BY-SA 4.0
let items = [];

const addItemBnt = document.getElementById("add-item");
const addBnt = document.getElementById("add");
const newItem = document.getElementById("add-item-input");

const setNameBtn = document.getElementById('set-task-name');
const taskName = document.getElementById("task-name-input");
const change = document.getElementById('set-name');

function show(el) {
  el.style.display = "block";
}

function hide(el) {
  el.style.display = "none";
}

function setTaskName(){
  hide(setNameBtn);
  show(taskName);
  show(change);
}

function setName(){
  const newName = document.getElementById('task-name-input').value;
  const changeName = document.getElementById('changeName');
  if(newName){
    changeName.textContent = newName;
    show(setNameBtn);
    hide(change);
    hide(taskName);
    newName.value = '';
    notificacao("Nome da tarefa atualizado com sucesso!");
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
    renderTasks();
    notificacao("Tarefa adicionada com sucesso!");
  } else if (text) {
    notificacao("Tarefa já existe!");
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

  items.forEach((item) => {
    const task = document.createElement("div");
    tasks.appendChild(task);

    task.id = "task";

    const tarefa = document.createElement("p");

    tarefa.textContent = item.nome;

    task.appendChild(tarefa);
    //Deletar tarefas
    const deleteBnt = document.createElement("button");
    deleteBnt.id = "delete";
    deleteBnt.textContent = "X";
    task.appendChild(deleteBnt);

    deleteBnt.addEventListener("click", () => {
      task.remove();
      tasks.innerHTML = "";
      items = items.filter((i) => i.nome !== item.nome);
      renderTasks();
      notificacao("Tarefa removida com sucesso!");
    
    //Atualizar tarefas

    });
  });
}

function notificacao(message) {
  const notification = document.getElementById("notification-container");

  const notify = document.createElement("div");
  notify.classList.add("notification");
  notify.textContent = message;

  notification.appendChild(notify);

  setTimeout(() => {
    notify.remove();
  }, 3000);
}
