import { closeListTab } from "./dom-functions";
import { listName, requirements } from "./index.js";

function mainLogic () {
  let lists = [];

  // store the lists created by the user
  function addNewList (listName) {
    lists.push({
      listName: `${listName}`,
      action: () => console.log(listName),
    });
    console.log(lists);
  };

  return { addNewList, lists };
};

// regex for user entry
const regex = /^(?!.*(\s{2,}|\-{2,}|\:{2,}|'{2,}))[A-Z][A-Za-z\s\-\:\']+[a-z]$/;

// getting the mainLogic to chain functions and initializing it
const logic = mainLogic();

// initializing the array from mainLogic
const listsArray = logic.lists;

// creates a list and summons the render function, because
// it needs the condition to avoid accidental duplications
const createList = () => {
  if (regex.test(listName.value) && listsArray.every(x => x.listName !== listName.value)) {
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

// exporting functions and variables for other dependent files
export { mainLogic, createList, listsArray };