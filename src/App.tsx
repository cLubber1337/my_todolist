import React, {useState} from 'react';
import './App.css';
import {Todolist} from './componets/Todolist';

export type FilterBtnType = "All" | "Active" | "Completed"

function App() {
    const [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "Redux", isDone: true}
    ])

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(f => f.id !== id))
    }

    const [filter, setFilter] = useState<FilterBtnType>("All")

    const changeFilter = (nameBtn:FilterBtnType) => {
        setFilter(nameBtn)
    }
    let filteredTasks = tasks

    if (filter === "Active") {
        filteredTasks = tasks.filter(f => !f.isDone)
    }
    if (filter === "Completed") {
        filteredTasks = tasks.filter(f => f.isDone)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={filteredTasks}
                deleteTask={deleteTask}
                changeFilter={changeFilter}/>

        </div>

    );
}

export default App;
