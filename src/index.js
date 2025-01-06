import "./styles.css";

function mainLogic () {
  let lists = [];

  // adds 
  function addNewList (listName) {
    lists.push([listName]);
    console.log("List added!", lists);
  };

  return { addNewList };
};

// getting the mainLogic to chain functions
const logic = mainLogic();

// calling the DOM
const newListContainer = document.querySelector(".new-list-container");
const listName = document.getElementById("list-name");
const requirements = document.querySelector(".requirements");
const regex = /^(?!.*(\s{2,}|\-{2,}|\:{2,}|'{2,}))[A-Z][A-Za-z\s\-\:\']+[a-z]$/g;

// closes the naming list tab
const closeListTab = () => {
  // newListContainer.style.display = "none"
  newListContainer.style.maxHeight = "0";
  newListContainer.style.zIndex = "-1";
  listName.value = "";
  requirements.innerHTML = "";
};

// it renders the naming list tab
const renderListTab = () => {
  newListContainer.style.maxHeight = "200px";
  newListContainer.style.zIndex = "0";
  newListContainer.style.bottom = "6%"

  // close button
  document.getElementById("close-list-btn").addEventListener('click', e => {
    closeListTab();
  });

  createList();
};

// creates the list calling the main logic function
const createList = () => {
  listName.addEventListener('keydown', e => {
    
    if (e.key === "Enter") {
      if (regex.test(listName.value)) {
        logic.addNewList(listName.value);
        closeListTab();
      } else (
        requirements.innerHTML = `
        <h3>Please, follow the requirements: </h3>
        <li>&#8226; First letter capitalized</li>
        <li>&#8226; No special characters</li>
      `
      )
    };

  });
};

// new list button
const createListBtn = document.getElementById("add-list-btn");
createListBtn.addEventListener('click', renderListTab);

const renderNewList = () => {
  
  lists.forEach(x => {
    document.createElement('div');
    document.createElement('ul')
  });
};