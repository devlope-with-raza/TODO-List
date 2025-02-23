const taskInput = document.querySelector('.task-input');
const addBtn = document.querySelector('.add-btn');
const taskList = document.querySelector('.task-list');
const taskCount = document.querySelector('#task-count');
const clearBtn = document.querySelector('.clear-btn');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Initial render
renderTasks();

// Add task on button click
addBtn.addEventListener('click', addTask);

// Add task on Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Clear all tasks
clearBtn.addEventListener('click', () => {
    tasks = [];
    saveTasks();
    renderTasks();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        // Toggle completion
        const checkbox = li.querySelector('.checkbox');
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        // Delete task
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        taskList.appendChild(li);
    });

    updateTaskCount();
    clearBtn.style.display = tasks.length > 0 ? 'block' : 'none';
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskCount() {
    const remaining = tasks.filter(task => !task.completed).length;
    taskCount.textContent = remaining;
}