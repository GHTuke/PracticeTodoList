import { useRef, useState } from "react";
import { Todo } from "./types";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, themeBalham } from 'ag-grid-community';
import { ColDef } from "ag-grid-community";
import "./App.css";
import { DatePicker } from "@mui/x-date-pickers";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import dayjs from "dayjs";


// kaikkien moduulien rekisteröinti (voisi myös ottaa yksitellen)
ModuleRegistry.registerModules([AllCommunityModule]);

function TodoList() {
    const [todo, setTodo] = useState<Todo>({ description: '', priority: '', date: '' });
    const [todos, setTodos] = useState<Todo[]>([]);
    const gridRef = useRef<AgGridReact<Todo>>(null);

    const addTodo = () => {
        // Estää tyhjän kentän lisäämisen
        if (!todo.description || !todo.date) return;
        setTodos([...todos, todo]);
        // Tyhjentää syöttökentän kun syöte annettu
        setTodo({ description: '', priority: '', date: '' });
    };

    // poistaa indeksin mukaisen todon
    const deleteTodo = () => {
        if (gridRef.current?.api.getSelectedNodes().length) {
            setTodos(todos.filter((_todo, i) => i !== Number(gridRef.current?.api.getSelectedNodes()[0].id)));
        } else {
            alert('Select a row first')
        }
    }

    /*
    Vanhaan päivämäärä formatointiin ennen MUI datepickeriä
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("fi-FI")
    }
    */

    const handleDateChange = (date: dayjs.Dayjs | null) => {
        if (date) {
            setTodo({ ...todo, date: date.format("DD.MM.YYYY") });
        }
    };

    // Aika paljon kateltu ylimääräsiä määrityksiä https://www.ag-grid.com/react-data-grid/column-properties/
    const [columnDefs] = useState<ColDef<Todo>[]>([
        {
            field: "priority",
            sortable: true,
            filter: true,
            floatingFilter: true,
            // poistaa ylimääräisen filterinapin floatin filteristä, jättää sen vielä itse rivivalintaan
            suppressFloatingFilterButton: true,
            // initialFlex:in avulla täyttyy alkuun koko grid, mutta pysyy itse säädettävänä
            initialFlex: 1
        },
        {
            field: "description",
            filter: true,
            sortable: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
            initialFlex: 2
        },
        {
            field: "date",
            sortable: true,
            filter: true,
            floatingFilter: true,
            suppressFloatingFilterButton: true,
            initialFlex: 1,
            /*
            Jos ottaa MUI datepickerin pois voi stringin formatoida tätä kautta
            valueFormatter: (params) => formatDate(params.value)
            */
        },
    ])

    return (
        <>
            <div className="App">
                <h1>Todo List</h1>
                <fieldset>
                    <legend>Add todo:</legend>

                    {/*https://mui.com/material-ui/react-select/*/}
                    <FormControl sx={{ minWidth: 120 }} size="medium">
                        <InputLabel>Priority</InputLabel>
                        <Select
                            onChange={event => setTodo({ ...todo, priority: event.target.value })}
                            value={todo.priority}
                            label="Priority"
                        >
                            <MenuItem value='Low'>Low</MenuItem>
                            <MenuItem value='Medium'>Medium</MenuItem>
                            <MenuItem value='High'>High</MenuItem>
                        </Select>
                    </FormControl>


                    <TextField
                        placeholder="Description"
                        onChange={event => setTodo({ ...todo, description: event.target.value })}
                        value={todo.description}
                    />


                    {/*
                    <input
                        type="date"
                        onChange={(event) => setTodo({ ...todo, date: event.target.value })}
                        value={todo.date}
                    />
                    */}

                    {/*https://mui.com/x/react-date-pickers/getting-started/*/}
                    <DatePicker
                        label="Select Date"
                        value={todo.date ? dayjs(todo.date, "DD.MM.YYYY") : null}
                        onChange={handleDateChange}
                        format="DD.MM.YYYY"
                    />

                    {/*https://mui.com/material-ui/react-button/#color*/}
                    <Button variant="outlined" size="large" color="inherit" onClick={addTodo}>Add</Button>
                    <Button variant="outlined" size="large" color="inherit" onClick={deleteTodo}>Delete</Button>
                </fieldset>
                <div style={{ width: 700, height: 500 }}>
                    <AgGridReact
                        ref={gridRef}
                        rowData={todos}
                        columnDefs={columnDefs}
                        rowSelection="single"
                    />
                </div>
            </div>
        </>
    );
}

export default TodoList;