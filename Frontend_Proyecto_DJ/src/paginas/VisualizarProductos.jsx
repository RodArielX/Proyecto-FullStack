import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';

const VisualizarProductos = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState({});
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const consultarProducto = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/producto/detalle/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                };
                const respuesta = await axios.get(url, options);
                setProducto(respuesta.data);
            } catch (error) {
                setMensaje({ respuesta: error.response?.data?.msg || "Error al obtener el producto", tipo: false });
            }
        };
        consultarProducto();
    }, [id]);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="font-black text-4xl text-gray-500 text-center">Visualizar Producto</h1>
            <hr className="my-4" />
            <p className="mb-6 text-center text-gray-600">Este submódulo te permite visualizar los datos del producto</p>

            {
                Object.keys(producto).length !== 0 ? (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1">
                            <p className="text-md text-gray-800">
                                <span className="text-gray-600 uppercase font-bold">* Nombre del disco: </span>
                                {producto.nombreDisco}
                            </p>
                            <p className="text-md text-gray-800 mt-3">
                                <span className="text-gray-600 uppercase font-bold">* Nombre del artista: </span>
                                {producto.artista}
                            </p>
                            <p className="text-md text-gray-800 mt-3">
                                <span className="text-gray-600 uppercase font-bold">* Precio: </span>
                                ${producto.precio}
                            </p>
                            <p className="text-md text-gray-800 mt-3">
                                <span className="text-gray-600 uppercase font-bold">* Género: </span>
                                {producto.genero}
                            </p>
                            <p className="text-md text-gray-800 mt-3">
                                <span className="text-gray-600 uppercase font-bold">* Stock: </span>
                                {producto.stock} unidades
                            </p>
                        </div>

                        <div className="flex-1 flex justify-center">
                            <img 
                                src="/images/disco-de-vinilo.png" 
                                alt="Disco de vinilo" 
                                className="h-64 w-64 rounded-lg border border-gray-300 shadow-md"
                            />
                        </div>
                    </div>
                ) : (
                    Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                )
            }
        </div>
    );
};

export default VisualizarProductos;
