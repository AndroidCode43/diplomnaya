import React from "react";
import "./CreateTask.scss";

export const CreateTask = (props) => {
    return(
        <div>
            <div className="create_task_container">
                <h1 className="create_task_text">{props.text}</h1>
            </div>
        </div>
    );
} 