import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';
import { FormularioProductos } from '../componets/FormularioProductos'

const ActualizarEventos = () => {

    const [producto, setProducto] = useState({})

    const { id } = useParams()

    useEffect(() => {
        const consultarProductos = async () => {
            try {
                // Obtener Token
                const token = localStorage.getItem('token')
                // Definir Endpoint
                const url = `${import.meta.env.VITE_BACKEND_URL}/producto/detalle/${id}`
                // Headers
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                // Respuesta al backend
                const respuesta = await axios.get(url, options)
                setProducto(respuesta.data)
            } catch (error) {
                console.log(error)
            }
        }
        consultarProductos()
    }, [])

    return (
        <div className="mt-5 mb-6">
            <h1 className="text-4xl font-black text-yellow-400 drop-shadow-glow">Catálogo</h1>
            <hr className="my-4 border-yellow-300"/>
            <p className="text-gray-300">Este módulo te permite actualizar los datos de un disco de vinilo registrado</p><br />

            {
                Object.keys(producto).length !=0 && <FormularioProductos producto={producto}/>
            }
          
        </div>

    )
}

export default ActualizarEventos