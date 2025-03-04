import { useState } from "react";
import { Todo } from "./types";
import TodoTable from "./TodoTable";

function TodoList() {
    const [todo, setTodo] = useState<Todo>({ description: '', date: '' });
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = () => {
        // Estää tyhjän kentän lisäämisen
        if (!todo.description || !todo.date) return;
        setTodos([...todos, todo]);
        // Tyhjentää syöttökentän kun syöte annettu
        setTodo({ description: '', date: '' });
    };

    // poistaa indeksin mukaisen todon
    const deleteTodo = (index: number) => {
        setTodos(todos.filter((_, i) => i !== index));
    }

    return (
        <>
            <h1>Todo List</h1>
            <input
                type="date"
                onChange={(event) => setTodo({ ...todo, date: event.target.value })}
                value={todo.date}
            />
            <input
                placeholder="Description"
                onChange={event => setTodo({ ...todo, description: event.target.value })}
                value={todo.description}
            />
            <button onClick={addTodo}>Add</button>

            <TodoTable todos={todos} handleDelete={deleteTodo} />
        </>
    );
}

export default TodoList;