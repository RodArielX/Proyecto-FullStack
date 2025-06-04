import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';
import { FormularioEventos } from '../componets/FormularioEventos';

const ActualizarEventos = () => {

    const [evento, setEvento] = useState({})

    const { id } = useParams()

    useEffect(() => {
        const consultarEventos = async () => {
            try {
                // Obtener Token
                const token = localStorage.getItem('token')
                // Definir Endpoint
                const url = `${import.meta.env.VITE_BACKEND_URL}/evento/detalle/${id}`
                // Headers
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                // Respuesta al backend
                const respuesta = await axios.get(url, options)
                setEvento(respuesta.data)
            } catch (error) {
                console.log(error)
            }
        }
        consultarEventos()
    }, [])

    return (
        <div className="mt-5 mb-6">
            <h1 className="text-4xl font-black text-yellow-400 drop-shadow-glow">Eventos</h1>
            <hr className="my-4 border-yellow-300"/>
            <p className="text-gray-300">Este módulo te permite actualizar los datos de un evento registrado</p><br />

            {
                Object.keys(evento).length !=0 && <FormularioEventos evento={evento}/>
            }
          
        </div>

    )
}

export default ActualizarEventos