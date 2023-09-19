// src/context/TodoContext.js
import React, { createContext, useReducer, useContext, useEffect } from 'react';

const initialState = JSON.parse(localStorage.getItem('todos')) || [];

const TodoContext = createContext();

const todoReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.payload];
        case 'DELETE_TODO':
            return state.filter((todo) => todo.id !== action.payload);
        case 'EDIT_TODO':
            const editedTodoIndex = state.findIndex((todo) => todo.id === action.payload.id);
            if (editedTodoIndex !== -1) {
                const newState = [...state];
                newState[editedTodoIndex] = action.payload;
                return newState;
            }
            return state;
        default:
            return state;
    }
};

export const TodoProvider = ({ children }) => {
    const [todos, dispatch] = useReducer(todoReducer, initialState);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    return (
        <TodoContext.Provider value={{ todos, dispatch }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = () => {
    const context = useContext(TodoContext);
    if (!context) {
        throw new Error('useTodo must be used within a TodoProvider');
    }
    return context;
};
