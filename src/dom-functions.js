import { newListContainer, 
  listName, 
  requirements, 
  listContainer,
  newTaskContainer,
  taskName,
  dueDate,
  listPointer,
  taskRequirements,
} from "./index.js";
import { listsArray, logic } from "./logic.js";

// DOM for the right panel most-parent div
const rightPanel = document.querySelector(".nav-panel");

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
  
  if (desc !== "" && desc[0].toLowerCase()) {
    let array = desc.split("");
    // updating just the first letter
    array[0] = array[0].toUpperCase();
    return array.join("");

  } else {
    return desc;
  }
};

// handles the rendering of the right panel where
// tasks are shown related to its parent's list
const renderRightPanel = name => {

  // from here I'm creating the rendering for each list
  // when the user selects one list from the left panel,
  // this function translates the list info to the right panel

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

  // wraps "wrap1" and "wrap2"
  const textareaWrapper = document.createElement("div");
  textareaWrapper.className = "textarea-wrapper";
  headerWrapper.appendChild(textareaWrapper);

  // holds the <p> with textarea.value
  const wrap2 = document.createElement("div");
  wrap2.className = "wrap2"
  // appending wrap2 to textareaWrapper for rendering
  textareaWrapper.appendChild(wrap2);

  // holds the textarea
  const wrap1 = document.createElement("div");
  wrap1.className = "wrap1"
  // appending wrap1 to textareaWrapper for rendering
  textareaWrapper.appendChild(wrap1);

  // getting the selected object
  const object = logic.selectList(name, listsArray);

  // when "description" exists in the selected object
  // this function runs to display it (actually i wrote it
  // as an separeted function to avoid repeating myself too badly)
  const renderDescriptionText = () => {

    // injecting html code
    wrap2.innerHTML = `
    <p class="description">${descReformater(object.description)}</p>
    <div class="edit-btn-wrap">
      <button class="buttons" id="edit-btn">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
  `;

    // generated edit button
    const editBtn = document.getElementById("edit-btn");
    editBtn.addEventListener('click', () => {

      // hides the written description
      wrap2.style.display = "none";

      // invoke the textarea for editing the description
      renderTextarea();
      
    });

  }

  const renderTextarea = () => {

    wrap1.innerHTML = `
    <textarea class="inputs" name="list-desc" id="list-desc" placeholder="Add your list a description..."></textarea>
    `

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

          // adding the new description to the selected object
          // so it can be retrieved and SAVED in the logic
          logic.addNewDesc(listsArray, name, listDesc.value);

          // hides the textarea
          listDesc.style.display = "none";

          // unhides the wrap2 for displaying
          wrap2.style.display = "flex";

          // rendering the description
          renderDescriptionText();
          
        } else {
          // error animation
          listDesc.classList.toggle("invalid");
        }
      }
    });

  };

  // if THERE IS a description in the selected object
  // do this:
  if (object.description) {

    // renders the description
    renderDescriptionText();

  } else {

    // renders the textarea for user input
    renderTextarea();

  }
  
  console.log(listsArray);

  // after that the list name and its description are rendered
  // the renderTask(name) comes into play to render tasks, checking
  // firstly if there is any tasks to display
  renderTask(name);
};

// renders the tasks
const renderTask = name => {
  // found the object with this logic function
  const object = logic.selectList(name, listsArray);
  // accessed its tasks array for further rendering
  const tasks = object.tasks;
  // if there is no task in the selected list
  if (tasks.length !== 0) {

    const taskContainer = document.createElement("div");
    taskContainer.className = "task-container";
    
    tasks.forEach(task => {

    const taskWrapper = document.createElement("div");
    taskWrapper.className = "task-wrapper";
    taskContainer.appendChild(taskWrapper);

    const checkboxTextWrapper = document.createElement("div");
    checkboxTextWrapper.className = "checkbox-task-wrapper";
    taskWrapper.appendChild(checkboxTextWrapper);

    const wrapperOne = document.createElement("div");
    wrapperOne.id = "wrap-one";
    wrapperOne.className = "wrapping flex width";
    wrapperOne.innerHTML = `
      <input type="checkbox">
      <span id="date-due" class="date-marks">${task.dueDate}</span>  
    `;
    checkboxTextWrapper.appendChild(wrapperOne);

    const wrapperTwo = document.createElement("div");
    wrapperTwo.id = "wrapper-two";
    wrapperTwo.className = "wrapping flex";
    wrapperTwo.innerHTML = `
      <h3 class="semi-bold" style="margin-top: 3px">
        ${task.taskName}
      </h3>
    `;
    taskWrapper.appendChild(wrapperTwo);

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.className = "buttons";
    deleteTaskBtn.id = "delete-task-icon";
    deleteTaskBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    wrapperTwo.appendChild(deleteTaskBtn);

    deleteTaskBtn.addEventListener("click", () => {
      
      logic.deleteTask(name, tasks.taskName);
      console.log(tasks);
    });

    //finally appending the parent container to .nav-panel (right panel)
    rightPanel.appendChild(taskContainer);

    });
  } else {
    console.log("No tasks.");
    const noTasksAvailable = document.createElement("h1");
    noTasksAvailable.className = "no-tasks-available semi-bold";
    noTasksAvailable.textContent = "No Tasks Available."
    noTasksAvailable.style.color = "#2c2c2c";
    rightPanel.appendChild(noTasksAvailable);
  }
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
    `;

    const deleteButton = document.createElement("button");
    deleteButton.className = "buttons";
    deleteButton.id = "delete-list-icon";
    deleteButton.style = "transform: scale(0.7); color: #166AC5";
    deleteButton.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;

    listContainer.appendChild(listWrapper);
    listWrapper.appendChild(button);
    button.appendChild(deleteButton);

    // const deleteListBtn = document.getElementById("delete-list-icon");
    // deleteListBtn.addEventListener("click", () => {
    //   callRenderList();
    // });

    // assigning an action for the list button which avoids
    // the renderRightPanel(name) being invoked right away (without clicking) by
    // wrapping it in a callback arrow function
    const listBtn = document.getElementById(uniqueId);
    listBtn.addEventListener('click', () => renderRightPanel(listName));
  });
};

// const callRenderList = () => {
//   logic.deleteList(listName)
//   renderList();
  
// };

// exporting functions for other dependent files
export { 
  renderList, 
  closeListTab, 
  renderListTab,
  closeTaskTab,
  renderTaskTab,
  renderRightPanel
 };