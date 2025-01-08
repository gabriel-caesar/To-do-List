import { newListContainer, 
  listName, 
  requirements, 
  listContainer 
} from "./index.js";
import { listsArray } from "./logic.js";

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
  newListContainer.style.bottom = "7%"
};

// handles the rendering of a new list
const renderList = () => {
  listContainer.innerHTML = "";
  listsArray.forEach(x => {
    const { listName } = x
    
    listContainer.innerHTML += `
      <div class="list-wrapper" id="list-wrapper">
          <button class="list" id="list-btn" data-list-name="${listName}">
            <div class="content">
              <i class="fa-solid fa-cube" style="color: #373636"></i>
              <h4>${listName}</h4>
            </div>
            <div class="arrow">
              <i class="fa-solid fa-caret-up"></i>
            </div>
          </button>
      </div>
    `
    const listButton = document.getElementById("list-btn");
    listButton.addEventListener('click', event => {
      const thisObject = listsArray.find(obj => obj.listName === event.target.dataset.listName);
    
      if (thisObject && typeof thisObject.action === 'function') {
        thisObject.action();
      } else {
        console.log("Error", thisObject);
      }
    });
  });
};



// exporting functions for other dependent files
export { renderList, closeListTab, renderListTab };


/* It seems the issue lies in how you're selecting the button element and setting up the event listener. You're using document.getElementById("list-btn"), but getElementById only returns the first element with that ID. Since you're rendering multiple buttons with the same ID (list-btn), this will only grab the first one.

IDs should be unique in the DOM, so the repeated use of the same ID is causing your problem. Instead, consider using className or another selector (like querySelectorAll) to target all the buttons correctly.

The find() method is also likely returning undefined because it can't find the list due to the way the event is being handled. Double-check your button rendering logic and how you're targeting them within the event listener.

Also, don't forget that thisObject.action is just a reference to the function. To execute it, you need to call it as thisObject.action(). */