// Importando os hooks
import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

// Importando o arquivo de configuração do axios
import axios from '../axios';

// Importando o css
import './Home.css';

export default function Home() {
    const [parties, setParties] = useState(null);

    /* Fazendo a requisição da API */
    useEffect(() => {

        const loadParties = async () => {
            const res = await axios.get('/parties');
            setParties(res.data);
        };

        loadParties();

    }, []);

    if(!parties) return <p>Carregando...</p>;

    return (
        <div className='home'>
            <h1>Suas Festas</h1>
            
            <div className="parties-container">
                {/* Verificando se existe dados cadastrado no banco */}
                {parties.length === 0 && <p>Não há festas cadastrada!</p>}

                {/* Mostrando todos os dados cadastrado no banco de dados  */}
                {parties.map(party => {
                    return (
                        <div className="party" key={party._id}> 
                            <img src={party.image} alt={party.title} />
                            <h3>{party.title}</h3>
                            <Link to={`/party/${party._id}`} className='btn-secondary'>Detalhes</Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}