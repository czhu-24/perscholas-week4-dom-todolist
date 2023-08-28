const addBtnEl = document.getElementById("add-task");
const resetBtnEl = document.getElementById("reset-tasks");
const listEl = document.getElementsByClassName("list")[0]; // list of not completed tasks
const completedListEl = document.getElementsByClassName("completed-list")[0]; 
const inputFieldEl = document.querySelector("input");
let tasksArray = [];
const orderTracker = 20; 

const clickCheckbox = (e) => {

    const completedTaskDiv = e.target.parentNode;
    // if you append / appendChild a div to a DOM element, it'll remove the div element from wherever it was in the DOM originally (if it was in the DOM)

    // also change tasksArray 
    
    const id = e.target.getAttribute("id");
    console.log(id);

    // IF the tasksArray's object's property completed is true, append the completedTaskDiv to normal list
    if(tasksArray[id].completed){ // it's a truthy value afterall 
        listEl.append(completedTaskDiv);
        tasksArray[id].completed = false;
    }else{ // if this is NOT a completed task already, mark it completed & move it to completed
        completedListEl.append(completedTaskDiv);
        tasksArray[id].completed = true;
    }

    saveTasks();
}

// function to save to localStorage
function saveTasks() {
    // JSON.stringify because localStorage can only store strings
    localStorage.setItem("tasks", JSON.stringify(tasksArray));

}

function loadTasks() {
    tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
    // if localStorage has no key named "tasks", then set tasksArray to []

    // order the array items based on their .order value & then put them on screen

    // ok, great! the tasksArray is working as intended 

    // I could potentially create a function that makes li elements
    // go through the tasksArray
    // if the tasksArray element.completed is true, append it to the completedList
    // else, append it to the listEl

    for(taskId in tasksArray){
        // making outermost flex container to hold the task div & checkbox
        const flexContainer = document.createElement("div");
        flexContainer.classList.add("flex-container");

        // making div to hold task
        const newTask = document.createElement("div");
        newTask.textContent = tasksArray[taskId].task;
        newTask.classList.add("task");

        // making checkbox to hold if task was done or not
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = taskId;
        // add eventListener to the checkbox
        checkbox.addEventListener('click', clickCheckbox);

        // now append both the task div & the checkbox to the flex container
        flexContainer.append(checkbox);
        flexContainer.append(newTask);

        if(tasksArray[taskId].completed){
            checkbox.checked = true;
            completedListEl.append(flexContainer);
        }else{
            listEl.append(flexContainer);
        }
    }
}

/* inside the addBtnEl event listener, when it's clicked, call ANOTHER function that creates the <li> item, changes its text, and appends it to the list */

const addTask = () => {
    if(!inputFieldEl.value){ 
        // if inputFieldEl is falsy (if it's an empty string), then exit out of this function & return undefined
        return;
    }

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
    checkbox.addEventListener('click', clickCheckbox);

    // now append both the task div & the checkbox to the flex container
    flexContainer.append(checkbox);
    flexContainer.append(newTask);

    listEl.append(flexContainer);

    tasksArray.push({ task: inputFieldEl.value, completed: false, order: tasksArray.length});

    // wipe out inputFieldEl
    inputFieldEl.value = "";

    // saveTasks
    saveTasks();
}

/* inside the addBtnEl event listener, when it's clicked, call ANOTHER function that creates the <li> item, changes its text, and appends it to the list */

const resetTasks = () => {
    inputFieldEl.value = "";
    listEl.textContent = "";
    const listH2 = document.createElement("h2");
    listH2.textContent = "Uncompleted tasks";
    listEl.append(listH2);

    completedListEl.textContent = "";
    const completedListH2 = document.createElement("h2");
    completedListH2.textContent = "Completed tasks";
    completedListEl.append(completedListH2);

    tasksArray.length = 0;
    saveTasks();
}



// END OF FUNCTION DECLARATIONS

// load tasks from localStorage after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// event listeners for two buttons
addBtnEl.addEventListener('click', addTask);
resetBtnEl.addEventListener('click', resetTasks);


