import { useState } from "react";
import { Todo } from "./types";
import TodoTable from "./TodoTable";

function TodoList() {
    const [todo, setTodo] = useState<Todo>({ description: '', date: new Date() });
    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodo = () => {
        // Estää tyhjän kentän lisäämisen
        if (!todo.description) return;
        setTodos([...todos, todo]);
        // Tyhjentää kentän kun syöte annettu
        // ei toimi daten kanssa, pitäisi muokata date muotoon string jne. Liikaa koodimuokkauksia for value
        setTodo({ description: '', date: new Date() });
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
                onChange={(event) => setTodo({ ...todo, date: new Date(event.target.value) })}
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