import { Outlet } from 'react-router-dom';

// Components
import NavBar from './components/NavBar';

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <Outlet />
    </div>
  )
}

