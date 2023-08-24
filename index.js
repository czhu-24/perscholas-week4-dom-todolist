const addBtnEl = document.getElementById("add-task");
const resetBtnEl = document.getElementById("reset-tasks");
const listEl = document.getElementsByClassName("list")[0];
const completedListEl = document.getElementsByClassName("completed-list")[0];
const inputFieldEl = document.querySelector("input");

const tasksArray = [];

/* inside the addBtnEl event listener, when it's clicked, call ANOTHER function that creates the <li> item, changes its text, and appends it to the list */

const addTask = () => {
    // making div that's a flex container to hold both the task and its checkbox
    const flexContainer = document.createElement("div");
    flexContainer.classList.add("flex-container");

    // making div to hold task
    const newTask = document.createElement("div");
    newTask.textContent = inputFieldEl.value;
    newTask.classList.add("task");

    // making checkbox to hold if task was done or not
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = tasksArray.length;
    // add eventListener to the checkbox
    checkbox.addEventListener('click', completeTask);

    // now append both the task div & the checkbox to the flex container
    flexContainer.append(checkbox);
    flexContainer.append(newTask);

    listEl.append(flexContainer);

    tasksArray.push({task: inputFieldEl.value, completed: false});

    // wipe out inputFieldEl
    inputFieldEl.value = "";
}

const resetTasks = () => {
    inputFieldEl.value = "";
    listEl.textContent = "";
    tasksArray.length = 0;
}

const completeTask = (e) => {
    // get the checkbox's parent node to remove itself from DOM (along w/ its children)

    const completedTaskDiv = e.target.parentNode;
    // if you append / appendChild a div to a DOM element, it'll remove the div element from wherever it was in the DOM originally (if it was in the DOM)
    completedListEl.append(completedTaskDiv);



    //listEl.removeChild(completedTaskDiv);

    // also change tasksArray 
    
    const id = e.target.getAttribute("id");
    console.log(id);
    tasksArray[id].completed = true;

    
    //e.target.parentNode.style.display = "none";
}

addBtnEl.addEventListener('click', addTask);
resetBtnEl.addEventListener('click', resetTasks);

// TODO
// the .hide class styling can be done later
// i could still have one eventlistener for the checkbox
// but now i just check which list the checkbox is attached to -- OR the tasksArray.isCompleted value

