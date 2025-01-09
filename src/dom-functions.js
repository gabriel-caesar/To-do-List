import { newListContainer, 
  listName, 
  requirements, 
  listContainer 
} from "./index.js";
import { listsArray, logic } from "./logic.js";

// calling the DOM that doesn't need exporting
// in other words, it just need this file to be manipulated
const rightPanel = document.querySelector(".right-panel");

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

// handles the rendering of the right panel where
// tasks are shown related to its parent's list
const renderRightPanel = name => {
  
  // rightPanel.innerHTML
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
export { renderList, closeListTab, renderListTab };