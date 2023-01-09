import React, {useState, ChangeEvent} from 'react';
import {FilterBtnType, TaskType} from "../App";


type PropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    deleteTask: (todoListID: string, id: string) => void
    changeFilter: (todoListID: string, filter: FilterBtnType) => void
    addTask: (todoListID: string, task: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, isDone: boolean) => void
}

export const Todolist: React.FC<PropsType> = ({
                                                  title, tasks, deleteTask, changeFilter, todoListID,
                                                  addTask, changeTaskStatus
                                              }) => {
    const [task, setTask] = useState<string>("")


    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.currentTarget.value)
    }
    const addTaskOnClickHandler = () => {
        addTask(todoListID, task)
        setTask("")
    }




    const changeFilterOnClickALL = () => changeFilter(todoListID, "All")
    const changeFilterOnClickActive = () => changeFilter(todoListID, "Active")
    const changeFilterOnClickCompleted = () => changeFilter(todoListID, "Completed")

    return (<div>
            <h3>{title}</h3>
            <div>
                <input value={task} onChange={inputOnChangeHandler}/>
                <button onClick={addTaskOnClickHandler}>+</button>
            </div>
            <ul>
                {tasks.map((taskMap) => {
                    const changeTaskStatusOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(todoListID, taskMap.id, e.currentTarget.checked )
                    }
                    return (
                        <li key={taskMap.id}>
                            <input type="checkbox" onChange={changeTaskStatusOnChangeHandler} checked={taskMap.isDone}/>
                            <span>{taskMap.title}</span>
                            <button onClick={() => deleteTask(todoListID, taskMap.id)}>✖</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={changeFilterOnClickALL}>All</button>
                <button onClick={changeFilterOnClickActive}>Active</button>
                <button onClick={changeFilterOnClickCompleted}>Completed</button>
            </div>
        </div>
    )
}

