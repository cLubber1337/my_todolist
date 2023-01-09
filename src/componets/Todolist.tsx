import React from 'react';
import {FilterBtnType, TaskType} from "../App";


type PropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    deleteTask: (todoListID: string, id: string) => void
    changeFilter: (todoListID: string, filter: FilterBtnType) => void
}

export const Todolist: React.FC<PropsType> = ({
    title, tasks, deleteTask, changeFilter,todoListID
}) => {

    const changeFilterOnClickALL = () => changeFilter(todoListID,"All")
    const changeFilterOnClickActive = () => changeFilter(todoListID,"Active")
    const changeFilterOnClickCompleted = () => changeFilter(todoListID,"Completed")

    return (<div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(value => (
                    <li key={value.id}>
                        <input type="checkbox" checked={value.isDone}/> <span>{value.title}</span>
                        <button onClick={() => deleteTask(todoListID,value.id)}>✖</button>
                    </li>))}
            </ul>
            <div>
                <button onClick={changeFilterOnClickALL}>All</button>
                <button onClick={changeFilterOnClickActive}>Active</button>
                <button onClick={changeFilterOnClickCompleted}>Completed</button>
            </div>
        </div>
    )
}

