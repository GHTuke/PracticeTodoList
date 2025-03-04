export type Todo = {
    priority: string;
    description: string;
    date: string;
}

export type TodoTableProps = {
    todos: Todo[];
    handleDelete: (row: number) => void;
}