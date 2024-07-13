
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { Login, Logout } from './pages';

function App() {  

  const router = createBrowserRouter([
    {
      path: "/account/login",
      element: <Login />
    },
    {
      path: "/account/logout",
      element: <Logout />
    }
  ]);
  
  return <RouterProvider router={router}/>;
}

export default App
