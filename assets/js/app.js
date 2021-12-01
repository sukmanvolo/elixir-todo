import React from 'react';
import axios from 'axios';
import promise from 'redux-promise';
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from "react-redux";

const ROOT_URL = location.protocol === 'https:' ? 'https://todo-ex.herokuapp.com'
                                                : 'http://local.herokuapp.com:4000';

const createStoreWithMiddleware = applyMiddleware(
  promise
)(createStore);

// Reducers
const todo = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          id: action.id,
          text: action.text,
          completed: false
        };
      case 'TOGGLE_TODO':
        return action.id === state.id ? action : state;
      default:
        return state;
    }
};

let initialState = [];
const todos = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todo(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

// Action creators
const addTodo = (text) => {
  return axios
    .post(`${ROOT_URL}/api/v1/todo_items`,{todo_item: {content: text}})
    .then(resp => { resp.data.type = 'ADD_TODO'; return resp.data; })
    .catch(()=> {});
};

const toggleTodo = (todo) => {
  return axios
    .put(`${ROOT_URL}/api/v1/todo_items/${todo.id}`, {todo_item: {done: !todo.completed}})
    .then(resp => { resp.data.type = 'TOGGLE_TODO'; return resp.data; })
    .catch(()=> {});
};

const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  };
};

const Link = ({ active, children, onClick }) => {
  const clickLink = e => {
    e.preventDefault()
    onClick()
  }
  const dummyLink = e => {
    e.preventDefault()
  }
  return (
    <li>
      <a 
        href='#'
        className={ active ? "selected" : ""}
        onClick={ active ? dummyLink : clickLink }
      >
      { children }
      </a>
    </li>
  ) 
};

// FilterLink container component
const FilterLink = connect(
  (state, ownProps) => ({ // mapStateToProps
    active: ownProps.filter === state.visibilityFilter 
  }),
  (dispatch, ownProps) => ({ // mapDispatchToProps
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    }
  })
)(Link);

const Footer = () => (
  <footer className="footer">
    <ul className="filters">
      <FilterLink filter='SHOW_ALL'>All</FilterLink>
      <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
      <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
    </ul>
  </footer>
);

const Todo = ({ onClick, completed, text }) => ( 
  <li className={ completed ? 'completed' : '' } >
    <div className="view">
      <input 
        onClick={ onClick }
        className="toggle" 
        type="checkbox" 
        checked={completed}/>
      <label>{text}</label>
    </div>
  </li> 
);

const TodoList = ({todos, onTodoClick}) => ( 
  <section className="main">
    <input className="toggle-all" type="checkbox" />
    <ul className="todo-list"> 
      {
        todos.map( todo =>
        <Todo 
          key={todo.id}
          onClick={() => onTodoClick(todo)}
          {...todo} 
        />)
      } 
    </ul>
  </section>
);

let AddTodo = ({dispatch}) => {
  const keyUpHandler = (evt) => {
    const ENTER = 13
    if (evt.which === ENTER && input.value) {
      // hit enter, create new item if field isn't empty
      dispatch(addTodo(input.value))
      input.value = ''
    } 
  }
  let input;
  return (
    <header className="header">
      <h1>todos</h1>
      <input 
        autofocus
        className="new-todo" 
        placeholder="What needs to be done?" 
        ref = {node=>{input=node;}}
        onKeyDown={keyUpHandler}
      /> 
    </header>  
  );
};
AddTodo = connect()(AddTodo);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
}

const VisibleTodoList = connect(
  // mapStateToProps
  (state) => ({
    todos: getVisibleTodos( state.todos, state.visibilityFilter )
  }),
  // mapDispatchToProps
  (dispatch) => ({
      onTodoClick: id => { dispatch(toggleTodo(id)) }
  })
)(TodoList);

const TodoApp = () => (
  <section className="todoapp">
    <AddTodo/> 
    <VisibleTodoList/>
    <Footer/>
  </section>
);

fetch(ROOT_URL+'/api/v1/todo_items').then(r=>r.json()).then(data => {
  initialState = data;
  ReactDOM.render(( 
    <Provider store={ createStoreWithMiddleware(todoApp) }>
      <TodoApp/>
    </Provider>
    ), document.getElementById('root')
  );
})
