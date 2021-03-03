import { useEffect, useState } from 'react';
import './App.scss';
import PostList from './components/PostList';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: 'I love Easy Frontend! 😍 ' },
    { id: 2, title: 'We love Easy Frontend! 🥰 ' },
    { id: 3, title: 'They love Easy Frontend! 🚀 ' },
  ]);

  const [postList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const requestUrl = 'http://js-post-api.herokuapp.com/api/posts?_limit=10&_page=1';
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        console.log({responseJSON});
  
        const { data } = responseJSON;
        setPostList(data);       
      } catch (error) {
        console.log('Failed to fetch post list: ', error.message);
      }
    }
    fetchPostList();
  }, []);

  function handleTodoList(todo) {
    console.log(todo);
    const index = todoList.findIndex(x => x.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }
  function handleTodoFormSubmit(formValues) {
    const newTodoList = [...todoList];
    const newTodo = {
      id: todoList.length + 1,
      ...formValues,
    }
    newTodoList.push(newTodo);
    setTodoList(newTodoList);
  }

  return (
    <div className="app">
      <h1>React Hooks - PostList</h1>
      {/* <TodoForm onSubmit={handleTodoFormSubmit}/> */}
      {/* <TodoList todos={todoList} onTodoClick={handleTodoList}/> */}
      <PostList posts={postList}/>
    </div>
  );
}

export default App;
