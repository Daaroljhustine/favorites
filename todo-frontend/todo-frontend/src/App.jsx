import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import TodoList from './TodoList';

const App = () => {
    return (
        <BrowserRouter>
            <div className="container mx-auto mt-10">
                <Routes>
                    <Route path="/" element={<TodoList />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
