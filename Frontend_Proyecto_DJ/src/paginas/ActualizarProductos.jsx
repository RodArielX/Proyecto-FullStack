import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../componets/Alertas/Mensaje';
import axios from 'axios';
import { FormularioProductos } from '../componets/FormularioProductos'

const ActualizarProductos = () => {

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
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Productos</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite actualizar los datos de un producto registrado</p>

            {
                Object.keys(producto).length !=0 && <FormularioProductos producto={producto}/>
            }
          
        </div>

    )
}

export default ActualizarProductos