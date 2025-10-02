// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Initialize tasks array from localStorage (or empty array)
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    // Helper: save current tasks array to localStorage
    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Helper: create a DOM <li> element for a task (with remove button)
    function createTaskElement(taskText) {
        const li = document.createElement("li");
        li.textContent = taskText;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn"); // use classList.add as required

        // When clicked, remove the task element and update localStorage
        removeBtn.onclick = function () {
            // Remove the li from the DOM
            taskList.removeChild(li);

            // Remove the first matching taskText from the tasks array
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                saveTasksToLocalStorage();
            }
        };

        li.appendChild(removeBtn);
        return li;
    }

    /**
     * Add a task to the DOM and optionally save it to localStorage.
     * @param {string} [taskText] - The task text. If omitted, reads from taskInput.
     * @param {boolean} [save=true] - Whether to save the task in localStorage.
     */
    function addTask(taskText, save = true) {
        // If taskText not provided, get it from the input field
        if (typeof taskText === "undefined") {
            taskText = taskInput.value.trim();
        }

        // Validate non-empty
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create task element and append to list
        const li = createTaskElement(taskText);
        taskList.appendChild(li);

        // Clear input only when this call is from user action (save === true)
        if (save) {
            taskInput.value = "";
        }

        // Update tasks array and localStorage if requested
        if (save) {
            tasks.push(taskText);
            saveTasksToLocalStorage();
        }
    }

    // Load tasks from localStorage and render them on page load
    function loadTasks() {
        const storedTasks = tasks; // already parsed above
        storedTasks.forEach(function (taskText) {
            // Pass save = false so addTask does not save again to localStorage
            addTask(taskText, false);
        });
    }

    // Event listeners
    addButton.addEventListener("click", function () {
        addTask();
    });

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Initialize app by loading saved tasks
    loadTasks();
});
