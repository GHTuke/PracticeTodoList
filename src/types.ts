export type Todo = {
    description: string;
    date: Date;
}

export type TodoTableProps = {
    todos: Todo[];
    handleDelete: (row: number) => void;
}