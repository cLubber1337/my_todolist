import React from 'react';
import {FilterBtnType} from "../App";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (id: number) => void
    changeFilter: (nameBtn: FilterBtnType) => void
}

export const Todolist = (props: PropsType) => {

    return (<div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(value => (
                    <li key={value.id}>
                        <input type="checkbox" checked={value.isDone}/> <span>{value.title}</span>
                        <button onClick={() => props.deleteTask(value.id)}>✖</button>
                    </li>))}
            </ul>
            <div>
                <button onClick={() => props.changeFilter("All")}>All</button>
                <button onClick={() => props.changeFilter("Active")}>Active</button>
                <button onClick={() => props.changeFilter("Completed")}>Completed</button>
            </div>
        </div>
    )
}

