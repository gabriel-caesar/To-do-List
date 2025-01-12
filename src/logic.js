import { closeListTab, closeTaskTab } from "./dom-functions";
import { 
  listName, 
  requirements, 
  listPointer, 
  taskName,
  taskRequirements, 
  dueDate
 } from "./index.js";

function mainLogic () {
  let lists = [];

  // store the lists created by the user
  function addNewList (listName) {
    lists.push({
      listName: `${listName}`,
      tasks: [],
    });
  };

  function addNewTask (task, date) {
    const object = selectList(listPointer.value, lists);
    const index = lists.indexOf(object);
    lists[index].tasks.push({taskName: task, dueDate: date});
    console.log(lists);
  };
  
  // this function returns clicked list
  function selectList (name, array) {
    const targetObj = array.find(obj => obj.listName === name);
    return targetObj;
  };

  return { addNewList, lists, selectList, addNewTask };
};

// regex for user entry
const listRegex = /^(?!.*(\s{2,}|\-{2,}|\:{2,}|'{2,}))[A-Z][A-Za-z\s\-\:\']+[a-z]$/;
const taskRegex = /^(?!.*(\s{2,}|\-{2,}))[A-Z][A-Za-z\s\-\:\']+[a-z]$/;

// getting the mainLogic to chain functions and initializing it
// exporting it so its closures can be used outside this file
const logic = mainLogic();

// initializing the array from mainLogic
const listsArray = logic.lists;

// creates a list and summons the render function, because
// it needs the condition to avoid accidental duplications
const createList = () => {
  if (listRegex.test(listName.value) && listsArray.every(x => x.listName !== listName.value)) {
    logic.addNewList(listName.value);
    closeListTab();
  } else {
    listName.classList.toggle("invalid");
    requirements.style.display = "block";
    requirements.innerHTML = `
    <h3>Please, follow the requirements: </h3>
    <li>&#8226; No duplicate names,</li>
    <li>&#8226; At least two letters,</li>
    <li>&#8226; First letter capitalized,</li>
    <li>&#8226; No special characters.</li>
  `;
  }
};

// creates a task
const createTask = () => {

  // regex to match mm/dd/yyyy
  const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/\d{4}$/;

  if (taskRegex.test(taskName.value) &&
    dateRegex.test(dueDate.value) &&
    listPointer.value !== "") {

    // adding the task using the user input for
    // the due date and task name
    logic.addNewTask(taskName.value, dueDate.value);
    closeTaskTab();
    
  } else {

    taskName.classList.toggle("invalid");
    dueDate.classList.toggle("invalid-date");
    taskRequirements.style.display = "block";
    taskRequirements.innerHTML = `
      <h3>Please, follow the requirements: </h3>
      <li>&#8226; No duplicate names,</li>
      <li>&#8226; At least two letters,</li>
      <li>&#8226; First letter capitalized,</li>
      <li>&#8226; Follow the date pattern <span class="date-pattern">mm/dd/yyyy</span>,</li>
      <li>&#8226; Make sure to select one list.</li>
    `;

  }

};

// exporting functions and variables for other dependent files
export { createList, listsArray, logic, createTask};