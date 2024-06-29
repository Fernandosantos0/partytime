// Importando o axios
import axios from '../axios';

// Importando os hooks
import { useState, useEffect } from 'react';

// Método para redirecionamento das páginas
import { useNavigate } from 'react-router-dom';

import './Form.css';

export default function CreateParty() {
    const [ services, setServices ] = useState([]);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState(0);
    const [image, setImage] = useState('');
    const [partyServices, setPartyServices] = useState([]);

    // Load services
    useEffect(() => {

        const loadServices = async () => {
            const res = await axios.get('/services');
            setServices(res.data);
        };

        loadServices();

    }, []);

    // Add or remove services
    const handleServices = function(e) {
        const checked = e.target.checked;
        const value = e.target.value;

        const filteredService = services.filter((s) => s._id === value);

        if(checked) {
            setPartyServices((services) => [...services, filteredService]);
        } else {
            setPartyServices((services) => services.filter((s) => s._id !== value))
        }
    };

    // Create a new party
    const createParty = function(e) {
        e.preventDefault();

        const party = {
            title,
            author,
            description,
            budget,
            image,
            services: partyServices
        }
    };

    return (
        <div className="form-page">
            <h2>Crie sua próxima festa</h2>
            <p>Defina o seu orçamento e escolha os serviços</p>

            <form onSubmit={(e) => createParty(e)}>
                <label>
                    <span>Nome da festa:</span>
                    <input 
                        type="text" 
                        placeholder="Seja criativo..." 
                        required 
                        onChange={(e) => setTitle(e.target.value)} 
                        value={title} 
                    />
                </label>

                <label>
                    <span>Anfitrião:</span>
                    <input 
                        type="text" 
                        placeholder="Quem está dando a festa" 
                        required
                        onChange={(e) => setAuthor(e.target.value)} 
                        value={author}
                    />
                </label>

                <label>
                    <span>Descrição:</span>
                    <textarea 
                        placeholder="Conte mais sobre a festa..." 
                        required 
                        onChange={(e) => setDescription(e.target.value)} 
                        value={description}
                    ></textarea>
                </label>

                <label>
                    <span>Orçamento:</span>
                    <input 
                        type="number" 
                        placeholder="Quanto você pretende investir?" 
                        required
                        onChange={(e) => setBudget(e.target.value)} 
                        value={budget}
                    />
                </label>

                <label>
                    <span>Imagem:</span>
                    <input
                        type="url"
                        placeholder="Insira a URL de uma imagem" 
                        required
                        onChange={(e) => setImage(e.target.value)} 
                        value={image}
                    />
                </label>

                <div>
                    <h2>Escolha os serviços</h2>

                    {/* Inserindo os serviços */}
                    <div className="services-container">
                        {services.length === 0 && <p>Carregando...</p>}

                        {services.length > 0 && services.map((service) => {
                            return (
                                <div className='service' key={service._id}>
                                    <img src={service.image} alt={service.name} />
                                    <p className='service-name'>{service.name}</p>
                                    <div className="service-price">R${service.price}</div>

                                    <div className="checkbox-container">
                                        <input type="checkbox"  value={service._id} onChange={(e) => handleServices(e)} />
                                        <p>Marque para solicitar</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <button type="submit" className="btn">Ciar Festa</button>
            </form>
        </div>
    );
}