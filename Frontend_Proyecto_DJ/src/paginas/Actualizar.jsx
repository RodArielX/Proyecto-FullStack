import { Formulario } from '../componets/Formulario'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';

const Actualizar = () => {

    const [cliente, setClientes] = useState({})

    const { id } = useParams()

    useEffect(() => {
        const consultarClientes = async () => {
            try {
                // Obtener Token
                const token = localStorage.getItem('token')
                // Definir Endpoint
                const url = `${import.meta.env.VITE_BACKEND_URL}/clientes/${id}`
                // Headers
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                // Respuesta al backend
                const respuesta = await axios.get(url, options)
                setClientes(respuesta.data.cliente)
            } catch (error) {
                console.log(error)
            }
        }
        consultarClientes()
    }, [])

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Clientes</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los datos de un cliente registrado</p>

            {
                Object.keys(cliente).length !=0 && <Formulario cliente={cliente}/>
            }
          
        </div>

    )
}

export default Actualizar