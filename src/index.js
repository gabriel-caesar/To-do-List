import "./styles.css";
import { createList } from "./logic.js";
import { 
  renderList, 
  closeListTab, 
  renderListTab,
  closeTaskTab,
  renderTaskTab
 } from "./dom-functions.js";

// calling the DOM for the creation of lists
const newListContainer = document.querySelector(".new-list-container");
const listName = document.getElementById("list-name");
const requirements = document.querySelector(".requirements");
const listContainer = document.getElementById("lc");

// calling the DOM for the creation of tasks
const newTaskContainer = document.querySelector(".new-task-container");
const taskName = document.getElementById("task-name");
const dueDate = document.getElementById("due-date");

// "+" TASK button
const createTaskBtn = document.getElementById("add-task-btn");
createTaskBtn.addEventListener('click', renderTaskTab); 

// "+ New List" button
const createListBtn = document.getElementById("add-list-btn");
createListBtn.addEventListener('click', renderListTab);

// creates a new list calling the main logic function
// and renders it to the left panel 
listName.addEventListener('keydown', e => {
  if (e.key === "Enter") {
    e.preventDefault();
    createList();
    renderList();
  }
});

// close button for the "+ New List" tab
document.getElementById("close-list-btn").addEventListener('click', () => {
  closeListTab();
});
// close button for the "+" TASK tab
document.getElementById("close-task-btn").addEventListener('click', () => {
  closeTaskTab();
})

// closes the "+" TASKS tab with "Esc" when input focused
taskName.addEventListener('keydown', e => {
  if (e.key === "Escape") {
    e.preventDefault();
    closeTaskTab();
  }
});

// closes the "+" TASKS tab with "Esc" when input focused
dueDate.addEventListener('keydown', e => {
  if (e.key === "Escape") {
    e.preventDefault();
    closeTaskTab();
  }
});

// closes the "+ New List" tab with "Esc" when input focused
listName.addEventListener('keydown', e => {
  if (e.key === "Escape") {
    e.preventDefault();
    closeListTab();
  }
});

renderList();

// exporting functions and variables for other dependent files
export { newListContainer,
  listName,
  requirements,
  listContainer,
  newTaskContainer,
  taskName,
  dueDate
  };