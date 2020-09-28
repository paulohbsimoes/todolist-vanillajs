function clearPage() {
  while(app.firstChild) {
    app.removeChild(app.firstChild);
  }
}

function todo(tasks) {
  const app = document.querySelector('#app');

  const todoInput = document.createElement('input');
  todoInput.placeholder = 'Press <Enter> to insert';

  todoInput.onfocus = (e) => {
    app.onkeydown = (e) => {
      if (e.key === "Enter") {
        addTask(todoInput.value);
      }
    };
  };

  const todoFormTextWrapper = document.createElement('h2')
  const todoFormText = document.createTextNode('To-do list');
  todoFormTextWrapper.appendChild(todoFormText);

  const todoForm = document.createElement('div');
  todoForm.className = 'todo-form';
  todoForm.appendChild(todoFormTextWrapper);
  todoForm.appendChild(todoInput);
  
  const todoList = document.createElement('div');
  todoList.className = 'todo-list';

  tasks.map(task => {
    const newTaskDescription = document.createTextNode(task);
    const newTaskDescriptionWrapper = document.createElement('span');
    newTaskDescriptionWrapper.appendChild(newTaskDescription);

    const newTaskRemoveButton = document.createElement('button');
    newTaskRemoveButton.textContent = 'x'
    newTaskRemoveButton.onclick = () => removeTask(task);

    const newTask = document.createElement('div');
    newTask.className = 'todo-task';
    newTask.appendChild(newTaskDescriptionWrapper);
    newTask.appendChild(newTaskRemoveButton);

    todoList.appendChild(newTask);
  })

  const container = document.createElement('div');
  container.className = 'todo';
  container.appendChild(todoForm);
  container.appendChild(todoList);
  app.appendChild(container);

  todoInput.focus();
}

function render() {
  const state = getState();
  clearPage();
  todo(state.tasks);
}

const app = document.querySelector('#app');

const initialState = {
  // tasks: ['First', 'Second', 'Third', 'Fourth']
  tasks: []
}

function getState() {
  return JSON.parse(localStorage.getItem('tasks')) || initialState;
}

function addTask(task) {
  if (!task) return;
  const taskUpdate = {
    tasks: getState().tasks.concat([task])
  };
  localStorage.setItem(
    'tasks',
    JSON.stringify(Object.assign({}, getState(), taskUpdate))
  );
  return render();
}

function removeTask(task) {
  const taskUpdate = {
    tasks: getState().tasks.filter(currentTask => currentTask !== task)
  }
  localStorage.setItem(
    'tasks',
    JSON.stringify(Object.assign({}, getState(), taskUpdate))
  );
  return render();
}

render();