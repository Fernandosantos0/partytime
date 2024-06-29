import { NavLink } from 'react-router-dom';

// Importando o css
import './Navbar.css';

export default function NavBar() {
    return (
        <nav id="navbar">
            <h2>Party Time!</h2>

            <ul>
                <li>
                    <NavLink to='/'>Minhas Festas</NavLink>
                </li>

                <li>
                    <NavLink to='/party/new' className='btn'>Criar Festa</NavLink>
                </li>
            </ul>
        </nav>
    );
}