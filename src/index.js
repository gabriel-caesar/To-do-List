import "./styles.css";
import { createList, listsArray } from "./logic.js";
import { renderList, closeListTab, renderListTab } from "./dom-functions.js";

// calling the DOM
const newListContainer = document.querySelector(".new-list-container");
const listName = document.getElementById("list-name");
const requirements = document.querySelector(".requirements");
const listContainer = document.getElementById("lc");

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

// closes the "+ New List" tab with "Esc" when input focused
listName.addEventListener('keydown', e => {
  if (e.key === "Escape") {
    e.preventDefault();
    closeListTab();
  }
});

renderList();

// exporting functions and variables for other dependent files
export { newListContainer, listName, requirements, listContainer };