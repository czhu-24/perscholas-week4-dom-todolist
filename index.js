const addBtnEl = document.getElementById("add-task");
const resetBtnEl = document.getElementById("reset-tasks");
const listEl = document.getElementsByClassName("list")[0];
const completedListEl = document.getElementsByClassName("completed-list")[0];
const inputFieldEl = document.querySelector("input");
let tasksArray = [];
let orderTracker = 20; 

// TO DO TO DO
// I think the simplest way would be to just have a separate uncompletedTasksArray
// and completedTasksArray

// yes, so give each object: {id: number, task: "string", isCompleted: boolean}
// then remove & append them to each arrays as necessary 

// TODO TO DO
// whenever you make a new task, give it order of 20
// and then do +1 to the orderTracker
// ALSO store this in localStorage
// on refresh, get from localStorage & orderTracker = orderTracker from localStorage


// the .hide class styling can be done later
// refactor functions so that each function does ONE thing

// ALSO, i notice that with the way i complete tasks, I can make them "visually" appear
// out of order. i should probably reorder tasksArray.

const clickCheckbox = (e) => {
    // get the checkbox's parent node to remove itself from DOM (along w/ its children)

    const completedTaskDiv = e.target.parentNode;
    // if you append / appendChild a div to a DOM element, it'll remove the div element from wherever it was in the DOM originally (if it was in the DOM)

    // also change tasksArray 
    
    const id = e.target.getAttribute("id");
    console.log(id);
    //tasksArray[id].completed = true;

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
    tasksArray = JSON.parse(localStorage.getItem('tasks'));

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
    checkbox.addEventListener('click', clickCheckbox);

    // now append both the task div & the checkbox to the flex container
    flexContainer.append(checkbox);
    flexContainer.append(newTask);

    listEl.append(flexContainer);

    tasksArray.push({task: inputFieldEl.value, completed: false, order: tasksArray.length});

    // wipe out inputFieldEl
    inputFieldEl.value = "";

    // saveTasks
    saveTasks();
}

/* inside the addBtnEl event listener, when it's clicked, call ANOTHER function that creates the <li> item, changes its text, and appends it to the list */

const resetTasks = () => {
    inputFieldEl.value = "";
    listEl.textContent = "";
    completedListEl.textContent = "";
    tasksArray.length = 0;
    saveTasks();
}

// END OF FUNCTION DECLARATIONS

// load tasks from localStorage on loading the page
loadTasks();

// event listeners for two buttons
addBtnEl.addEventListener('click', addTask);
resetBtnEl.addEventListener('click', resetTasks);


