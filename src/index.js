import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./style/style.css"
import 'react-toastify/dist/ReactToastify.min.css';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TodoProvider>
    <ThemeProvider>
      <React.StrictMode>
        <App />
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          closeOnClick
          rtl={false}
        />
      </React.StrictMode>
    </ThemeProvider>
  </TodoProvider>
);

