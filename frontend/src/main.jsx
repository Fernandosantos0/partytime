import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

/* Configurando a rota */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import Home from './routes/Home.jsx';
import CreateParty from './routes/CreateParty.jsx';

// Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      }, 
      {
        path: '/party/new',
        element: <CreateParty />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
