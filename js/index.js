/*  how this code works 
1. this file will execute the methods in the "taskManager.js"
2. Create a new instance of "TaskMangager" so that we can use it's methods
3. First we select the elements we would like to target e.g the elements in the "add task form" so that we can collect their values
	and use them for validation.
4. Set an id variable that we can reference when we need to grab the id from the task card.
5. The validation functions which will add a class or remove a class depending on a conditional statement
6. Set an event listener on the add task form add button and call the add, save, and render methods.
7. In the "updateTaskList" function, traverse the DOM to find the id of the card you want to update.
8. In the "updateArray" function, use the id found, to update the values of the object with the new values, but keep the id the same.
*/

const newTask = new TaskManager();

newTask.load();

newTask.render();

const newTaskForm = document.querySelector("#addTaskForm");
const taskName = document.querySelector("#taskname");
const taskStatus = document.querySelector("#taskStatus");
const taskAssignee = document.querySelector("#taskAssignee");
const dueDate = document.querySelector("#dueDate");
const taskDescription = document.querySelector("#taskDescription");
const tasksList = document.querySelector("#tasksList");

let taskId = 0;

//validation
const setError = (element, message) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".error");

	errorDisplay.innerText = message;
	inputControl.classList.add("error");
	inputControl.classList.remove("success");
};

const setSuccess = (element) => {
	const inputControl = element.parentElement;
	const errorDisplay = inputControl.querySelector(".error");

	errorDisplay.innerText = "";
	inputControl.classList.add("success");
	inputControl.classList.remove("error");
};

const validateInputs = () => {
	let valid = true;
	const tasknameValue = taskName.value.trim();
	const taskstatusValue = taskStatus.value.trim();
	const taskassigneeValue = taskAssignee.value.trim();
	const duedateValue = dueDate.value.trim();

	if (tasknameValue === "") {
		setError(taskName, "A task name is required");
		valid = false;
	} else {
		console.log(taskName.parentNode);
		setSuccess(taskName);
	}

	if (taskstatusValue === "Choose...") {
		setError(taskStatus, "Please set a status");
		valid = false;
	} else {
		setSuccess(taskStatus);
	}

	if (taskassigneeValue === "") {
		setError(taskAssignee, "Please assign a name");
		valid = false;
	} else {
		setSuccess(taskAssignee);
	}

	if (duedateValue === "") {
		setError(dueDate, "When is task due for completion");
		valid = false;
	} else {
		setSuccess(dueDate);
	}
	return valid;
};

//add tasks

newTaskForm.addEventListener("submit", (e) => {
	//prevent the form from submitting
	e.preventDefault();

	console.log("in form");

	let validForm = validateInputs();

	console.log(validForm);

	if (validForm) {
		newTask.addTask(
			taskName.value,
			taskAssignee.value,
			dueDate.value,
			taskDescription.value,
			taskStatus.value
		);

		console.log(newTask.tasks);

		newTask.render();
		newTask.save();

		taskName.value = "";
		taskAssignee.value = "";
		dueDate.value = "";
		taskDescription.value = "";
		taskStatus.value = "";

		clearForm();
	}
});

const clearForm = () => {
	let form = document.querySelector("#addTaskForm");
	form.reset();
};

//set up for updating and deleting tasks
let todoColumn = document.querySelector("#todo");
todoColumn.addEventListener("click", updateTaskList);
todoColumn.addEventListener("click", deleteTask);

let inprogressColumn = document.querySelector("#in_progress");
inprogressColumn.addEventListener("click", updateTaskList);
inprogressColumn.addEventListener("click", deleteTask);

let doneList = document.querySelector("#done");
doneList.addEventListener("click", updateTaskList);
doneList.addEventListener("click", deleteTask);

// function to populate form fields when updating task
function populateForm(task) {
	console.log(task);
	taskName.value = task.taskName;
	taskAssignee.value = task.taskAssignee;
	dueDate.value = task.dueDate;
	taskDescription.value = task.taskDescription;
	taskStatus.value = task.taskStatus;
}

// to update task

function updateTaskList(e) {
	if (e.target.classList.contains("update")) {
		//get the parent task
		const parentTask =
			e.target.parentElement.parentElement.parentElement.parentElement;
		console.log(parentTask);
		taskId = Number(e.target.parentElement.parentElement.id);
		console.log(taskId);
		task = newTask.getTaskById(taskId);

		// prefill form with old information
		populateForm(task);
		// update information
		let updatebtn = document.getElementById("updateTaskBtn");
		updatebtn.addEventListener("click", updateArray);
	}
}

function updateArray() {
	console.log(`in updateArray function with id of: ${taskId}`);

	let validForm = validateInputs();

	if (validForm) {
		newTask.updateTask(
			taskId,
			taskName.value,
			taskAssignee.value,
			dueDate.value,
			taskDescription.value,
			taskStatus.value
		);
		newTask.save();
		newTask.render();
		//reset values
		updateTaskId = 0;
		clearForm();
	}
}

function deleteTask(e) {
	console.log("in delete task");
	if (e.target.classList.contains("delete")) {
		const parentTask =
			e.target.parentElement.parentElement.parentElement.parentElement;
		console.log(parentTask);
		taskId = Number(e.target.parentElement.parentElement.id);
		newTask.deleteTask(taskId);
		newTask.save();
		newTask.render();
	}
}

let taskHtml = createTaskHtml("bread", "kim", "2023-10-6", "get some");

console.log(taskHtml);
