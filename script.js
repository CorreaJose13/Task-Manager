const taskInput = document.getElementById('task-input');
const saveTaskButton = document.getElementById('save-task');
const getTaskButton = document.getElementById('get-task');
const taskList = document.getElementById('task-list');

const nextKey = function () {
    let lenLS = localStorage.length;
    if (lenLS === 0) {
        return 0;
    }

    let maxKey = -1;
    for (let i = 0; i < lenLS; i++) {
        const key = parseInt(localStorage.key(i));
        if (key > maxKey) {
            maxKey = key;
        }
    }

    return maxKey + 1;
};

function saveTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        let key = nextKey();
        localStorage.setItem(key, taskText);
        taskInput.value = '';
        listTasks();
    }
}

function updateTask(listItem, updateButton, input) {
    switch (updateButton.textContent) {
        case 'Edit task':
            updateButton.textContent = 'Save changes'
            input.disabled = false;
            input.focus();
            break;
        case 'Save changes':
            let textValue = input.value.trim();
            let taskKey = listItem.getAttribute('data-key');
            if (textValue) {
                localStorage.setItem(taskKey, textValue);
            }
            input.disabled = true;
            updateButton.textContent = 'Edit task';
            break;
    }
}

function deleteTask(taskList, listItem) {
    const taskKey = listItem.getAttribute('data-key');
    taskList.removeChild(listItem);
    localStorage.removeItem(taskKey);
}

function listTasks() {
    taskList.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let taskValue = localStorage.getItem(key);
        if (taskValue) {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-key', key);

            const input = document.createElement('input');
            input.value = taskValue;
            input.disabled = true;

            const updateButton = document.createElement('button');
            updateButton.textContent = 'Edit task';
            updateButton.className = 'update';
            updateButton.addEventListener('click', () =>
                updateTask(listItem, updateButton, input)
            );

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete';
            deleteButton.addEventListener('click', () =>
                deleteTask(taskList, listItem)
            );

            listItem.appendChild(input);
            listItem.appendChild(updateButton);
            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
        }
    }
}

saveTaskButton.addEventListener('click', saveTask);
getTaskButton.addEventListener('click', listTasks);