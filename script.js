document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

   function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    // Create list item
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn"); // ✅ use classList.add

    // Remove task when button is clicked
    removeButton.onclick = function () {
        taskList.removeChild(li);
    };

    // Append button to li, then li to task list
    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";
}

    // Event listener for Add Task button
    addButton.addEventListener("click", addTask);

    // Event listener for pressing Enter key
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
});