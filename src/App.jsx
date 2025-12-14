import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }])
      setInputValue('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  return (
    <div className="app">
      <div className="app-layout">
        {/* Left panel */}
        <aside className="left-panel">
          <h2 className="panel-title">Menu</h2>
          <nav className="panel-nav">
            <button className="nav-item active">All Todos</button>
            <button className="nav-item">Active</button>
            <button className="nav-item">Completed</button>
          </nav>
        </aside>
        
        {/* Main content area */}
        <main className="main-content">
          <h1>Todo List</h1>
          <div className="todo-container">
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new todo..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            Add
          </button>
        </div>
        <ul className="todo-list">
          {todos.length === 0 ? (
            <li className="empty-message">No todos yet. Add one above!</li>
          ) : (
            todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className="todo-text">{todo.text}</span>
                <button 
                  onClick={() => removeTodo(todo.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

