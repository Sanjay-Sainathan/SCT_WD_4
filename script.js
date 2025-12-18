const taskInput = document.getElementById("taskInput");
const taskTime = document.getElementById("taskTime");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("petalTasks")) || [];

addBtn.addEventListener("click", addTask);

function addTask() {
  if (!taskInput.value.trim()) return;

  tasks.push({
    id: Date.now(),
    text: taskInput.value,
    time: taskTime.value,
    completed: false
  });

  taskInput.value = "";
  taskTime.value = "";

  saveAndRender();
}

function toggle(id) {
  tasks.forEach(t => {
    if (t.id === id) t.completed = !t.completed;
  });
  saveAndRender();
}

function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const updated = prompt("Edit task", task.text);
  if (updated) {
    task.text = updated;
    saveAndRender();
  }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("petalTasks", JSON.stringify(tasks));
  render();
}

function render() {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
      <div>
        <span>${task.text}</span>
        ${task.time ? `<small>${new Date(task.time).toLocaleString()}</small>` : ""}
      </div>
      <div class="actions">
        <button class="done" onclick="toggle(${task.id})">✓</button>
        <button class="edit" onclick="editTask(${task.id})">✎</button>
        <button class="delete" onclick="deleteTask(${task.id})">✕</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

render();
