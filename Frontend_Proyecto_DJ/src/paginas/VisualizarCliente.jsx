import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';
import { useNavigate } from 'react-router-dom';

const VisualizarCliente = () => {
    const { id } = useParams();
    const [cliente, setCliente] = useState({});
    const [mensaje, setMensaje] = useState({});
    const navigate = useNavigate();

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
        <div className="max-w-4xl mx-auto p-6 bg-[#1a1a1a] border border-yellow-500 rounded-2xl shadow-lg text-white">
            <h1 className="font-black text-4xl text-yellow-400 text-center tracking-wide">🎧 Visualizar Cliente</h1>
            <hr className="my-4 border-yellow-600" />
            <p className="mb-6 text-center text-gray-300">Este submódulo te permite visualizar los datos de un cliente registrado.</p>

            {Object.keys(cliente).length !== 0 ? (
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1 space-y-4 text-white">
                        <p>
                            <span className="text-yellow-400 uppercase font-semibold">🧑 Nombre: </span>
                            {cliente.nombre} {cliente.apellido}
                        </p>
                        <p>
                            <span className="text-yellow-400 uppercase font-semibold">🗺️ Provincia: </span>
                            {cliente.provincia}
                        </p>
                        <p>
                            <span className="text-yellow-400 uppercase font-semibold">🌆 Ciudad: </span>
                            {cliente.ciudad}
                        </p>
                        <p>
                            <span className="text-yellow-400 uppercase font-semibold">📍 Dirección: </span>
                            {cliente.direccion}
                        </p>
                        <p>
                            <span className="text-yellow-400 uppercase font-semibold">📞 Teléfono: </span>
                            {cliente.telefono}
                        </p>
                        <p>
                            <span className="text-yellow-400 uppercase font-semibold">📧 Email: </span>
                            {cliente.email}
                        </p>
                    </div>

                    <div className="flex-1 flex justify-center">
                        <img
                            src="/images/man.png"
                            alt="Cliente"
                            className="h-64 w-64 object-cover rounded-xl border-2 border-yellow-500 shadow-md"
                        />
                    </div>
                </div>
            ) : (
                Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}

            {/* Botón para volver */}
            <div className="mt-8 text-center">
                <button
                    onClick={() => navigate('/dashboard/listarClientes')}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md"
                >
                    ⬅ Volver al Listado
                </button>
            </div>
        </div>
    );
};

export default VisualizarCliente
