import { newListContainer, 
  listName, 
  requirements, 
  listContainer,
  newTaskContainer,
  taskName,
  dueDate,
  listPointer,
  taskRequirements
} from "./index.js";
import { listsArray, logic } from "./logic.js";

// closes the naming list tab (user input)
const closeListTab = () => {
  newListContainer.style.maxHeight = "0";
  newListContainer.style.zIndex = "-1";
  listName.value = "";
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
  newTaskContainer.style.maxHeight = "180px";
  newTaskContainer.style.zIndex = "0";
  newTaskContainer.style.bottom = "6%";
  // selects the input automatically
  taskName.select();
};

const closeTaskTab = () => {
  newTaskContainer.style.maxHeight = "0px";
  newTaskContainer.style.zIndex = "-1";
  taskName.value = "";
  dueDate.value = "";
  taskRequirements.style.display = "none";
  taskName.classList.remove("invalid");
  dueDate.classList.remove("invalid-date");
};

// function that capitalize the first letter of an text input
const descReformater = desc => {
  const value = desc.value
  if (value !== "" && value[0].toLowerCase()) {
    let array = value.split("");
    // updating just the first letter
    array[0] = array[0].toUpperCase();
    return array.join("");
  } else {
    return value;
  }
};

// handles the rendering of the right panel where
// tasks are shown related to its parent's list
const renderRightPanel = name => {

  // from here I'm creating the rendering for each list
  // when the user selects one list from the left panel,
  // this function translates the list info to the right panel
  const rightPanel = document.querySelector(".nav-panel");

  // clears the container to avoid duplication
  rightPanel.innerHTML = "";
  
  const headerWrapper = document.createElement("div");
  headerWrapper.className = "header-wrapper";
  rightPanel.appendChild(headerWrapper);

  const textBtnWrap = document.createElement("div");
  textBtnWrap.className = "text-btn-wrap";
  headerWrapper.appendChild(textBtnWrap);

  // here is one important point, because i use the the function renderRightPanel(namew)
  // parameter to access the actual name of the list being clicked
  const renderedListName = document.createElement("h1");
  renderedListName.className = "semi-bold";
  renderedListName.innerHTML = `
  <i class="fa-solid fa-cube" style="color: #166AC5"></i> ${name}
  `
  textBtnWrap.appendChild(renderedListName);

  // will render the name of the list selected
  // so the logic can send the task created to
  // "lists" array accordinly
  listPointer.value = name;

  // delete list button (trash can)
  const deleteListBtn = document.createElement("button");
  deleteListBtn.className = "buttons";
  deleteListBtn.id = "delete-list-icon";
  deleteListBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
  textBtnWrap.appendChild(deleteListBtn);

  // wraps "wrap1" and "wrap2"
  const textareaWrapper = document.createElement("div");
  textareaWrapper.className = "textarea-wrapper";
  // holds the <p> with textarea.value
  const wrap2 = document.createElement("div");
  wrap2.className = "wrap2"
  // holds the textarea
  const wrap1 = document.createElement("div");
  wrap1.className = "wrap1"
  wrap1.innerHTML = `
  <textarea class="inputs" name="list-desc" id="list-desc" placeholder="Add your list a description..."></textarea>
  `
  headerWrapper.appendChild(textareaWrapper);
  textareaWrapper.appendChild(wrap1);
  textareaWrapper.appendChild(wrap2);

  // making the list description useful
  // it works using "Enter" and reformats the
  // string with the first letter being capitalized
  const listDesc = document.getElementById("list-desc");
  listDesc.addEventListener('keydown', e => {
    if (e.key === "Enter") {

      // regex for the desc input, checks if there is
      // one or more than one space in the user entry
      const regex = /^\s*/gm; // not working right now

      if (listDesc.value !== "") {
        
        // makes sure it gets rid of the shaking and
        // background color effect for invalid input
        listDesc.classList.remove("invalid");

        // hides the textarea
        listDesc.style.display = "none";

        // injecting html code
        wrap2.innerHTML = `
          <p class="description">${descReformater(listDesc)}</p>
          <div class="edit-btn-wrap">
            <button class="buttons" id="edit-btn">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
          </div>
        `;

        // unhides the wrap2 which was hidden by the edit button before
        wrap2.style.display = "flex";

        // generated edit button
        const editBtn = document.getElementById("edit-btn");
        editBtn.addEventListener('click', () => {
          // unhides the textarea
          listDesc.style.display = "flex";
          // hides the <p>
          wrap2.style.display = "none";
        });
      } else {
        // error animation
        listDesc.classList.toggle("invalid");
      }
    }
  });
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
  renderTaskTab,
 };