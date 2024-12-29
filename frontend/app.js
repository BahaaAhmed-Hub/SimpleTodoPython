const apiUrl = "http://localhost:5000/tasks";

async function fetchTasks() {
    const response = await fetch(apiUrl);
    const tasks = await response.json();
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = tasks.map(task => `
        <div>
            ${task.completed ? "<strike>" : ""}${task.name}${task.completed ? "</strike>" : ""}
            <button onclick="deleteTask(${task.id})">Delete</button>
            <button onclick="completeTask(${task.id})">Complete</button>
        </div>
    `).join("");
}

async function addTask() {
    const taskName = document.getElementById("new-task").value;
    await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: taskName, completed: false })
    });
    fetchTasks();
}

async function completeTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: "PUT" });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchTasks();
}

fetchTasks();
