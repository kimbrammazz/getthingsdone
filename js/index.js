const newTask = new TaskManager();

const newTaskForm = document.querySelector("#addTaskForm");
const taskName = document.querySelector("#taskname");
const taskStatus = document.querySelector("#taskStatus");
const taskAssignee = document.querySelector("#taskAssignee");
const dueDate = document.querySelector("#dueDate");
const taskDescription = document.querySelector("#taskDescription");
const submit = document.querySelector("#submit");

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
	submit.disable = true;
	const tasknameValue = taskName.value.trim();
	const taskstatusValue = taskStatus.value.trim();
	const taskassigneeValue = taskAssignee.value.trim();
	const duedateValue = dueDate.value.trim();

	if (tasknameValue === "") {
		setError(taskName, "A task name is required");
	} else {
		setSuccess(taskName);
		return true;
	}

	if (taskstatusValue === "Choose...") {
		setError(taskStatus, "Please set a status");
	} else {
		console.log(taskstatusValue);
		setSuccess(taskStatus);
		return true;
	}

	if (taskassigneeValue === "") {
		setError(taskAssignee, "Please assign a name");
	} else {
		setSuccess(taskAssignee);
		return true;
	}

	if (duedateValue === "") {
		setError(dueDate, "When is task due for completion");
	} else {
		setSuccess(dueDate);
		return true;
	}
};

//add tasks
newTaskForm.addEventListener("submit", (e) => {
	console.log("in form");
	//prevent the form from submitting
	e.preventDefault();

	validateInputs();

	let validForm = validateInputs();

	console.log(validForm);
	console.log(validateInputs());

	if (!validForm) {
		submit.disabled = true;
	} else {
		submit.disable = false;
		newTask.addTask(
			taskName.value,
			taskAssignee.value,
			dueDate.value,
			taskDescription.value,
			taskStatus.value
		);

		console.log(newTask.tasks);

		taskName.value = "";
		taskAssignee.value = "";
		dueDate.value = "";
		taskDescription.value = "";
		taskStatus.value = "";
	}
});
