import './App.css'
import TodoList from './TodoList'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TodoList />
      </LocalizationProvider>
    </>
  )
}

export default App
