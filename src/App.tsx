import React, {useState} from 'react';
import './App.css';
import {Todolist} from './componets/Todolist';
import {v1} from "uuid";

export type FilterBtnType = "All" | "Active" | "Completed"
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListType = {
    id: string
    title: string
    filter: FilterBtnType
}
type TasksStateType = {
    [todoListID: string]: TaskType[]
}

function App() {
    const todoList1_ID = v1()
    const todoList2_ID = v1()
    const [todoList, setTodoList] = useState<TodoListType[]>([
        {id: todoList1_ID, title: "What to do", filter: "All"},
        {id: todoList2_ID, title: "What to buy", filter: "All"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoList1_ID]: [
            {id: v1(), title: "Drink coffee", isDone: true},
            {id: v1(), title: "Work", isDone: true},
            {id: v1(), title: "Watch TV", isDone: false},
            {id: v1(), title: "Learn english", isDone: true}
        ],
        [todoList2_ID]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Coca-cola", isDone: false},
            {id: v1(), title: "Meat", isDone: true}
        ]
    })

    const addTask = (todoListID: string, task: string ) => {
        let newTask: TaskType = {id: v1(), title: task, isDone: false}
        setTasks({...tasks,[todoListID]: [newTask,...tasks[todoListID]] })
    }

    const deleteTask = (todoListID: string, id: string) => {
        setTasks({...tasks,[todoListID]: tasks[todoListID].filter(f=>f.id !== id)})
    }

    const changeFilter = (todoListID: string, filter:FilterBtnType) => {
        setTodoList(todoList.map(m => m.id === todoListID ? {...m, filter: filter } : m ))
    }
    
    const changeTaskStatus = (todoListID: string, taskID: string, isDone: boolean) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(m => m.id === taskID ? {...m, isDone} : m)})
    }




    return (
        <div className="App">
            {todoList.map(tl => {
                let filteredTasks = tasks[tl.id]

                if (tl.filter === "Active") {
                    filteredTasks = tasks[tl.id].filter(f => !f.isDone)
                }
                if (tl.filter === "Completed") {
                    filteredTasks = tasks[tl.id].filter(f => f.isDone)
                }

                return<Todolist
                    key={tl.id}
                    todoListID={tl.id}
                    title={tl.title}
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                />

            })}


        </div>

    );
}

export default App;
