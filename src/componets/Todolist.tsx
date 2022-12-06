import React from "react";

type TodolistPropsType = {
  data: Array<DataType>;
};
type DataType = {
  id: number;
  title: string;
  isDone: boolean;
};

export const Todolist = (props: TodolistPropsType) => {
  return (
    <div>
      <div>
        <h3>What to learn</h3>
        <div>
          <input />
          <button>+</button>
        </div>
        <ul>
          {props.data.map((el) => (
            <li>
              <input type="checkbox" checked={el.isDone} />{" "}
              <span>{el.title}</span>
            </li>
          ))}
        </ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    </div>
  );
};
