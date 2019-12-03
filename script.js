const Todos = []

const todos = JSON.parse(localStorage.getItem('todos')) || Todos

const elements = {
  todoList: document.getElementById('todo-list'),
  todoInput: document.getElementById('todo-input'),
  addButton: document.getElementById('add-todo'),
  resetButton: document.getElementById('reset-todo'),
} 

function renderTodoList() {
  elements.todoList.innerHTML = null
  todos.forEach((todo, index) => {
    const newTodo = document.createElement('li')
    //newTodo.innerText = todo.text
    const span = document.createElement('span')
    span.innerText = todo.text
    newTodo.appendChild(span)
    if (todo.completed) {
      newTodo.classList.add('done')
    } else {
      const completeButton = document.createElement('button')
      completeButton.classList.add('complete')
      completeButton.innerText = 'complete'
      completeButton.addEventListener('click', () => completeTodo(index))
      newTodo.append('', completeButton)
    }

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('del')
    deleteButton.innerText = 'delete'
    deleteButton.addEventListener('click', () => deleteTodo(index))
    newTodo.append(' ', deleteButton)

    elements.todoList.append(newTodo)
  })
}

function storeAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos))
  renderTodoList()
}

function isInputFilled() {
  return elements.todoInput.value.length > 0
}

function addTodo() {
  if (isInputFilled()) {
    const todoText = elements.todoInput.value
    todos.push({ text: todoText, completed: false })
    storeAndRender()
    elements.todoInput.value = ''
    elements.todoInput.focus()
  }
}

function completeTodo(index) {
  todos[index].completed = true
  storeAndRender()
}

function deleteTodo(index) {
  todos.splice(index, 1)
  storeAndRender()
}

///////////////////////////////////////////////////////////////////////////////

elements.todoInput.addEventListener('keypress', e =>
  e.keyCode === 13 ? addTodo() : {}
)

elements.addButton.addEventListener('click', () => addTodo())

elements.resetButton.addEventListener('click', () => {
  localStorage.clear()
  window.location.reload()
})

///////////////////////////////////////////////////////////////////////////////

storeAndRender()
elements.todoInput.focus()
