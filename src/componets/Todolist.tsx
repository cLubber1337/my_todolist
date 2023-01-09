import React, {useState, ChangeEvent} from 'react';
import {FilterBtnType, TaskType} from "../App";


type PropsType = {
    filter: FilterBtnType
    todoListID: string
    title: string
    tasks: Array<TaskType>
    deleteTask: (todoListID: string, id: string) => void
    changeFilter: (todoListID: string, filter: FilterBtnType) => void
    addTask: (todoListID: string, task: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskStatus: (todoListID: string, taskID: string, isDone: boolean) => void
}

export const Todolist: React.FC<PropsType> = ({title, tasks, deleteTask, changeFilter, todoListID,
    addTask, changeTaskStatus, filter, removeTodoList}) => {
    const [task, setTask] = useState<string>("")
    const [error, setError] = useState<string>("")
    let classNameForInput = error ? "inputError" : undefined

    const inputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.currentTarget.value)
        setError("")
    }
    const addTaskOnClickHandler = () => {
        if (task.trim() === "") {
            setTask("")
            setError("Please, enter task title")

        } else {
            addTask(todoListID, task.trim())
            setTask("")
            setError("")
        }
    }
    const removeTodoListOnClickHandler = () => {
        removeTodoList(todoListID)
    }

    const changeFilterOnClickALL = () => changeFilter(todoListID, "All")
    const changeFilterOnClickActive = () => changeFilter(todoListID, "Active")
    const changeFilterOnClickCompleted = () => changeFilter(todoListID, "Completed")

    return (<div>
            <h3>
                {title}
                <button onClick={removeTodoListOnClickHandler} style={{marginLeft:"5px"}}>x</button>
            </h3>
            <div>
                <input className={classNameForInput} value={task} onChange={inputOnChangeHandler}/>
                <button onClick={addTaskOnClickHandler}>+</button>
                <div className={"errorMessage"}>{error}</div>
            </div>
            <ul>
                {tasks.map((taskMap) => {
                    const changeTaskStatusOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(todoListID, taskMap.id, e.currentTarget.checked)
                    }
                    const classNameForTaskStatus = taskMap.isDone ? "isDone" : ""
                    return (
                        <li key={taskMap.id} className={classNameForTaskStatus}>
                            <input type="checkbox"
                                   onChange={changeTaskStatusOnChangeHandler}
                                   checked={taskMap.isDone}
                            />
                            <span>{taskMap.title}</span>
                            <button onClick={() => deleteTask(todoListID, taskMap.id)}>✖</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={filter === "All" ? "buttonActive":"button"} onClick={changeFilterOnClickALL}>All</button>
                <button className={filter === "Active" ? "buttonActive":"button"} onClick={changeFilterOnClickActive}>Active</button>
                <button className={filter === "Completed" ? "buttonActive":"button"} onClick={changeFilterOnClickCompleted}>Completed</button>
            </div>
        </div>
    )
}

