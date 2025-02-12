const tasks = [
  {
    complete: false,
    description: "New task is created and added to the list"
  }
];

function addTask(){
  const taskText = taskInput.value.trim();
  if(taskText === "") return;

  taskInput.value = "";
  tasks.push({complete: false, description: taskText});
  renderTasks();
}

function removeTask(index){
  tasks.splice(index, 1);
  renderTasks();
}

function markTaskComplete(index){
  tasks[index].complete = !tasks[index].complete;
  renderTasks()
}

function renderTasks(){
  const taskList = document.querySelector('.task-list');
  taskList.innerHTML = ""
  if(tasks.length === 0) return;

  tasks.sort((a, b) => a.complete - b.complete);
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.complete ? 'task complete' : 'task';

    li.innerHTML = `
      <div class="task-title">
        <input type="checkbox" ${task.complete ? "checked" : ''} onchange=(markTaskComplete(${index}))>
        <div class="task-descript">${task.description}</div>
      </div>
      <div class="remove-btn">
        <img width="20" height="20" src="./assets/icons/xmark-solid.svg" alt="remove button" onclick="removeTask(${index})" />
      </div>
    `

    taskList.append(li);
  });
}

const taskInput = document.querySelector('.task-input');
const addTaskBtn = document.querySelector('.add-task-btn');

taskInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter'){
    addTask();
  }
})

addTaskBtn.addEventListener('click', addTask);

document.addEventListener('DOMContentLoaded', () => {
  renderTasks()
})