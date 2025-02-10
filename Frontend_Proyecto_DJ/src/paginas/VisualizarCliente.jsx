import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';

const VisualizarCliente = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const consultarCliente = async () => {
            try {
                const token = localStorage.getItem('token');
                const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/detalle/${id}`;
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                };
                const respuesta = await axios.get(url, options);
                setCliente(respuesta.data);
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false });
            }
        };
        consultarCliente();
    }, [id]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
            <h1 className="font-black text-4xl text-gray-700 text-center">Detalles del Cliente</h1>
            <hr className="my-4 border-gray-300" />
            <p className="text-gray-600 text-center mb-6">Aquí puedes ver los datos del cliente registrado.</p>
            {Object.keys(cliente).length !== 0 ? (
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="w-full md:w-2/3">
                        <p className="text-lg text-gray-800 mt-2">
                            <span className="font-bold text-gray-600">Nombre: </span>
                            {cliente.nombre} {cliente.apellido}
                        </p>
                        <p className="text-lg text-gray-800 mt-2">
                            <span className="font-bold text-gray-600">Ciudad: </span>
                            {cliente.ciudad}
                        </p>
                        <p className="text-lg text-gray-800 mt-2">
                            <span className="font-bold text-gray-600">Dirección: </span>
                            {cliente.direccion}
                        </p>
                        <p className="text-lg text-gray-800 mt-2">
                            <span className="font-bold text-gray-600">Teléfono: </span>
                            {cliente.telefono}
                        </p>
                        <p className="text-lg text-gray-800 mt-2">
                            <span className="font-bold text-gray-600">Email: </span>
                            {cliente.email}
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 flex justify-center mt-4 md:mt-0">
                        <img
                            src="/images/man.png"
                            alt="Cliente"
                            className="h-40 w-40 rounded-full border-2 border-gray-300"
                        />
                    </div>
                </div>
            ) : (
                Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}
        </div>
    );
};

export default VisualizarCliente;