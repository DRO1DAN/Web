const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskObject => {
        createTaskElement(taskObject);
    });
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(taskElement => {
        tasks.push({
            text: taskElement.querySelector('span').textContent,
            completed: taskElement.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTaskElement(taskObject) {
    const taskText = taskObject.text;
    if (taskText === '') return;

    const li = document.createElement('li');
    
    if (taskObject.completed) {
        li.classList.add('completed');
    }
    
    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити';
    deleteBtn.className = 'delete-btn';
    
    deleteBtn.onclick = function() {
        li.remove();
        saveTasks();
    };
    li.appendChild(deleteBtn);
    
    span.onclick = function() {
        li.classList.toggle('completed');
        saveTasks(); 
    };

    taskList.appendChild(li);
}

function addNewTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const newTask = {
        text: taskText,
        completed: false
    };
    
    createTaskElement(newTask);
    taskInput.value = '';
    saveTasks();
}

document.addEventListener('DOMContentLoaded', loadTasks);
addTaskBtn.addEventListener('click', addNewTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addNewTask();
    }
});

new Sortable(taskList, {
    animation: 150,
    onEnd: function() {
        saveTasks();
    }
});