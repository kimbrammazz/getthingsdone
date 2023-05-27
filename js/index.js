const newTask = new TaskManager();

const newTaskForm = document.querySelector("#addTaskForm");
const newTaskName = document.querySelector("#formTask");
const newTaskStatus = document.querySelector("#formStatus");
const newTaskAssignee = document.querySelector("#formAssignee");
const newTaskDueDate = document.querySelector("#formDue");
const newTaskDescription = document.querySelector("#formDescription");

newTaskForm.addEventListener("submit", (e) => {
	console.log("in form");
	e.preventDefault();

	validateInputs();

	console.log(taskName);

	newTask.addTask(
		taskName,
		taskAssignee,
		taskDueDate,
		taskDescription,
		taskStatus
	);

	console.log(newTask.tasks);
	newTaskName.value = "";
	newTaskAssignee.value = "";
	newTaskDueDate.value = "";
	newTaskDescription.value = "";
	newTaskStatus.value = "";
});

// validation
const showError = (input, message) => {
	const formField = input.parentElement;
};
const validateInputs = () => {
	const taskName = newTaskName.value;
	const taskAssignee = newTaskAssignee.value;
	const taskDueDate = newTaskDueDate.value;
	const taskDescription = newTaskDescription.value;
	const taskStatus = newTaskStatus.value;
};

//check
