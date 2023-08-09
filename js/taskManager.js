let createTaskHtml = (
	taskName,
	taskAssignee,
	dueDate,
	taskDescription = ""
) => {
	const html = `<li class='list-group-item'>
								<div class="card" style="width: 18rem">
									<div class="card-body">
										<div class="d-flex justify-content-between">
											<button id="update">Update</button>
											<button id="delete">Delete</button>
										</div>
										<h5 class="card-title text-start">${taskName}</h5>
										<p class="card-text text-start">
											${taskDescription}.
										</p>
										<div class="d-flex justify-content-between">
											<h6>${taskAssignee}</h6>
											<h6>${dueDate}</h6>
										</div>
									</div>
								</div>
							</li>`;

	return html;
};

class TaskManager {
	constructor(currentId = 0) {
		this.tasks = [];
		this.currentId = currentId;
	}

	addTask(
		taskName,
		taskAssignee,
		dueDate,
		taskDescription,
		taskStatus = "todo"
	) {
		const newTask = {
			taskName: taskName,
			taskStatus: taskStatus,
			taskAssignee: taskAssignee,
			dueDate: dueDate,
			taskDescription: taskDescription,
			id: this.currentId++,
		};
		return this.tasks.push(newTask);
	}

	render() {
		// create and array to store the tasks' html
		let tasksHtmlList = [];

		// loop over tasks and create the html, storing it in the array
		for (let i = 0; i < this.tasks.length; i++) {
			//get the current task in the loop
			let task = this.tasks[i];

			// format the date
			let date = new Date(task.dueDate);
			let formattedDate = `${date.getDate()}-${
				date.getMonth() + 1
			}-${date.getFullYear()}`;

			// create the task html
			let taskHtml = createTaskHtml(
				task.taskName,
				task.taskStatus,
				task.taskAssignee,
				formattedDate,
				task.taskDescription
			);

			// push it to the taskHtmlList array
			tasksHtmlList.push(taskHtml);
		}

		// Creat the tasksHtml by joining each item in the tasksHtmlList
		// with a new line in between each item
		let tasksHtml = tasksHtmlList.join("");
		console.log(tasksHtml);

		// set the inner html of the taskList on the page
		const todoList = document.querySelector("#todo");
		const inprogressList = document.querySelector("#in_progress");
		const doneList = document.querySelector(".done");

		todoList.innerHTML = tasksHtml;
	}

	save() {
		const tasksJson = JSON.stringify(this.tasks);
		localStorage.setItem("tasks", tasksJson);
		const currentId = String(this.currentId);
		localStorage.setItem("currentId", currentId);
	}

	load() {
		if (localStorage.getItem("tasks")) {
			const taskJson = localStorage.getItem("tasks");
			this.tasks = JSON.parse(taskJson);
		}

		if (localStorage.getItem("currentId")) {
			const currentId = localStorage.getItem("currentId");
			this.currentId = Number(currentId);
		}
	}
}
