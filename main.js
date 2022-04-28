const deskTaskInput = document.getElementById('description-task');
const addTaskBtn = document.getElementById('add-task-btn');
const todosWrapper = document.querySelector('.todos-wrapper');
const dateWrapper = document.querySelector('.date-wrapper');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let tasks;

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))

let todoItemElems = [];

class Task
{
  constructor(description)
  {
    this.description = description;
    this.completed = false;
  }
}

const createDateTemplate = () => {
  let newDate = new Date();
  let day = days[newDate.getDay()];
  let date = newDate.getDate();
  let month = months[newDate.getMonth()];
  return `
  <div>
    <div>
      <span class="day">${day},</span>
      <span class="date">${date}</span>
    </div>
    <div class="month">
      ${month}
    </div>
  </div>
  `
}
dateWrapper.innerHTML += createDateTemplate();

const createTaskTemplate = (task, index) => {
  return `
  <div class="todo-item ${task.completed ? 'checked' : ''} animate__animated">
    <div class="description">
      <div id="description-${index}" 
            class="task-descr ${task.completed ? 'completed' : ''}" 
            ondblclick="updateTask(${index})"
          >${task.description}
      </div>
      <input type="text" 
            class="desc-input invisible" 
            value="${task.description}" 
            id="input-${index}" 
            onblur="changeTaskDesc(${index})">
    </div>
    <div class="buttons">
      <input onclick="completeTask(${index})" 
              type="checkbox" 
              class="btn-complete animate__animated" 
              ${task.completed ? 'checked' : ''}>
      <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
    </div>
  </div>
  `
}

const updateTask = (index) => {
  document.getElementById(`description-${index}`).classList.add('invisible');
  let input = document.getElementById(`input-${index}`);
  input.classList.remove('invisible');
  input.focus();
}

const changeTaskDesc = (index) => {
  let taskDesc = document.getElementById(`description-${index}`);
  let input = document.getElementById(`input-${index}`);
  tasks[index].description = input.value;
  taskDesc.classList.remove('invisible');
  input.classList.add('invisible');
  applyChanges();
}

const filterTasks = () => {
  const activeTasks = tasks.length && tasks.filter(item => item.completed==false)
  const completedTasks = tasks.length && tasks.filter(item => item.completed==true)
  if (activeTasks || completedTasks) {
    tasks = [...activeTasks, ...completedTasks]
  }
}

const fillHtml = () => {
  todosWrapper.innerHTML = '';
  if (tasks.length > 0) {
    filterTasks();
    tasks.forEach((item, index) => {
      todosWrapper.innerHTML += createTaskTemplate(item, index)
    })
    todoItemElems = document.querySelectorAll('.todo-item')
  }
}
fillHtml();

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

const applyChanges = () => {
  filterTasks();
  updateLocal();
  fillHtml();
}
const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  applyChanges();
}

const deleteTask = (index) => {
  todoItemElems[index].classList.add('animate__backOutLeft');
  setTimeout(() => {
    tasks.splice(index, 1);
    applyChanges();
  }, 500)
  
}

addTaskBtn.addEventListener('click', () => {
  if (!deskTaskInput.value) { return }
  tasks.push(new Task(deskTaskInput.value))
  applyChanges();
  deskTaskInput.value = '';
})


