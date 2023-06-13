const newTask = new TaskManager();

const newTaskForm = document.querySelector("#addTaskForm");
const taskName = document.querySelector("#taskname");
const taskStatus = document.querySelector("#taskStatus");
const taskAssignee = document.querySelector("#taskAssignee");
const dueDate = document.querySelector("#dueDate");
const taskDescription = document.querySelector("#taskDescription");

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
	console.log("in form");

	//prevent the form from submitting
	e.preventDefault();

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

let taskHtml = createTaskHtml("bread", "kim", "2023-10-6", "get some");
console.log(taskHtml);
