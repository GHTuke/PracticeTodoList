/* 
HOX
Vielä löytyy tarvittaessa, mutta ei ole käytössä missään
HOX

import { TodoTableProps } from "./types";

function TodoTable(props: TodoTableProps) {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td>Priority</td>
                        <td>Date</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                    {props.todos.map((todo, index) => (
                        <tr key={index}>
                            <td>{todo.priority}</td>
                            <td>{new Date(todo.date).toLocaleDateString("fi-FI")}</td>
                            <td>{todo.description}</td>
                            <td>
                                <button onClick={() => props.handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );

}

export default TodoTable;
*/