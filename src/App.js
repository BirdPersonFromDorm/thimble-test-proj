import React from "react";
import TodoList from "./page/TodoList";
import {TodoProvider} from "./context";

function App() {

    return (
        <TodoProvider>
                <TodoList/>
        </TodoProvider>
    );
}

export default App;
