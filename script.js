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

saveTaskButton.addEventListener('click', saveTask);
