import { newListContainer, 
  listName, 
  requirements, 
  listContainer,
  newTaskContainer,
  taskName,
  dueDate 
} from "./index.js";
import { listsArray, logic } from "./logic.js";

// closes the naming list tab (user input)
const closeListTab = () => {
  newListContainer.style.maxHeight = "0";
  newListContainer.style.zIndex = "-1";
  listName.value = "";
  requirements.innerHTML = "";
  requirements.style.display = "none";
  listName.classList.remove("invalid");
};

// it renders the naming list tab (user input)
const renderListTab = () => {
  newListContainer.style.maxHeight = "200px";
  newListContainer.style.zIndex = "0";
  newListContainer.style.bottom = "7%";
  // selects the input automatically
  listName.select();
};

const renderTaskTab = () => {
  newTaskContainer.style.maxHeight = "61px";
  newTaskContainer.style.zIndex = "0";
  newTaskContainer.style.bottom = "6%";
  // selects the input automatically
  taskName.select();
};

const closeTaskTab = () => {
  newTaskContainer.style.maxHeight = "0px";
  newTaskContainer.style.zIndex = "-1";
  taskName.innerHTML = "";
  dueDate.innerHTML = "";
};

// handles the rendering of the right panel where
// tasks are shown related to its parent's list
const renderRightPanel = name => {

  // from here I'm creating the rendering for each list
  // when the user selects one list from the left panel,
  // this function translates the list info to the right panel
  const rightPanel = document.querySelector(".nav-panel");

  rightPanel.innerHTML = "";
  
  const headerWrapper = document.createElement("div");
  headerWrapper.className = "header-wrapper";
  rightPanel.appendChild(headerWrapper);

  const textBtnWrap = document.createElement("div");
  textBtnWrap.className = "text-btn-wrap";
  headerWrapper.appendChild(textBtnWrap);

  // here is one important point, because i use the the function
  // parameter to access the actual name of the list being clicked
  const renderedListName = document.createElement("h1");
  renderedListName.className = "semi-bold";
  renderedListName.innerHTML = `
  <i class="fa-solid fa-cube" style="color: #166AC5"></i> ${name}
  `
  textBtnWrap.appendChild(renderedListName);

  const deleteListBtn = document.createElement("button");
  deleteListBtn.className = "buttons";
  deleteListBtn.id = "delete-list-icon";
  deleteListBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
  textBtnWrap.appendChild(deleteListBtn);

  const textareaWrapper = document.createElement("div");
  textareaWrapper.className = "textarea-wrapper";
  textareaWrapper.innerHTML = `
  <textarea class="inputs" name="list-desc" id="list-desc" placeholder="Add your list a description..."></textarea>
  `
  headerWrapper.appendChild(textareaWrapper);

  console.log(logic.selectList(name), listsArray);
};

// handles the rendering of a new list
const renderList = () => {
  
  // clearing the listContainer to avoid duplication
  listContainer.innerHTML = "";
  listsArray.forEach(x => {
    const { listName } = x

    // this listName refactor makes sure that the name is formatted
    // properly to avoid future errors of syntax that breaks the program
    const uniqueId = listName.replace(/\s+/g, '-').toLowerCase();

    // creating the wrappers and buttons dinamically to avoid
    // eventListener errors instead of generating the entire code with innerHTML 
    const listWrapper = document.createElement('div');
    listWrapper.className = "list-wrapper";

    const button = document.createElement('button');
    button.className = "list";
    button.id = uniqueId;

    button.innerHTML = `
      <div class="content">
        <i class="fa-solid fa-cube" style="color: #373636"></i>
        <h4>${listName}</h4>
      </div>
      <div class="arrow">
        <i class="fa-solid fa-caret-up"></i>
      </div>
    `;

    listContainer.appendChild(listWrapper);
    listWrapper.appendChild(button);

    // assigning an action for the list button which avoids
    // the renderRightPanel(name) being invoked right away (without clicking) by
    // wrapping it in a callback arrow function
    const listBtn = document.getElementById(uniqueId);
    listBtn.addEventListener('click', () => renderRightPanel(listName));
  });
};

// exporting functions for other dependent files
export { 
  renderList, 
  closeListTab, 
  renderListTab,
  closeTaskTab,
  renderTaskTab
 };