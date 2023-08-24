const addBtnEl = document.getElementById("add-task");
const resetBtnEl = document.getElementById("reset-tasks");
const listEl = document.getElementsByClassName("list")[0];
const inputFieldEl = document.querySelector("input");
const completedListEl = document.getElementsByClassName("completed-list")[0];

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
    checkbox.id = "id-" + tasksArray.length;
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

    let id = e.target.getAttribute("id");
    let idNumber = id.substring(3, id.length);

    // set the corresponding task in tasksArray so that its isCompleted property is true
    tasksArray[idNumber].completed = true;
    console.log(idNumber);

    // take the 
    e.target.parentNode.style.display = "none";  

    // toggle completed list to display if it's not already
    //toggleCompletedList();
}

const toggleCompletedList = () => {
    // append completed task to the completed list
    // HM... the HTML tag still exists
    const completedTask = document.getElementById("id-0");
    

    // toggle
    if(completedListEl.style.display === "none") {
        completedListEl.style.display = "grid";
    }else{
        completedListEl.style.display = "none";
    }
}

addBtnEl.addEventListener('click', addTask);
resetBtnEl.addEventListener('click', resetTasks);

