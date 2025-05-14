import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdInfo, MdDeleteForever } from "react-icons/md";

const TablaReservas = () => {
    const [reservas, setReservas] = useState([]);
    const [reservasFiltradas, setReservasFiltradas] = useState([]);
    const [filtroCliente, setFiltroCliente] = useState("");
    const [filtroEventos, setFiltroEventos] = useState([]);
    const [tiposEvento, setTiposEvento] = useState([]);
    const navigate = useNavigate();

    const obtenerTiposEvento = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/tipo-evento/listar`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTiposEvento(data);
        } catch (error) {
            console.log("Error al obtener tipos de evento", error);
        }
    };

    const obtenerReservas = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reserva/listar`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setReservas(data);
            setReservasFiltradas(data);
        } catch (error) {
            console.log(error);
        }
    };

    const eliminarReserva = async (id) => {
        const confirmar = confirm("¿Estás seguro de eliminar esta reserva?");
        if (!confirmar) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/reserva/eliminar/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            obtenerReservas();
        } catch (error) {
            console.log(error);
        }
    };

    const toggleEvento = (evento) => {
        setFiltroEventos(prev =>
            prev.includes(evento)
                ? prev.filter(e => e !== evento)
                : [...prev, evento]
        );
    };

    const filtrarReservas = () => {
        const filtrado = reservas.filter(reserva => {
            const cliente = reserva.cliente?.nombre?.toLowerCase() || "";
            const evento = reserva.tipoEvento || "";
            const coincideEvento = filtroEventos.length === 0 || filtroEventos.includes(evento);
            return cliente.includes(filtroCliente.toLowerCase()) && coincideEvento;
        });
        setReservasFiltradas(filtrado);
    };

    useEffect(() => {
        obtenerTiposEvento();
        obtenerReservas();
    }, []);

    useEffect(() => {
        filtrarReservas();
    }, [filtroCliente, filtroEventos]);

    return (
        <div>
            {/* Filtros */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Buscar por cliente"
                    value={filtroCliente}
                    onChange={(e) => setFiltroCliente(e.target.value)}
                    className="border p-2 rounded-md w-full md:w-1/2 mb-4"
                />

                <div className="flex flex-wrap gap-4">
                    {tiposEvento.map(evento => (
                        <label key={evento.id} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                value={evento.nombre}
                                checked={filtroEventos.includes(evento.nombre)}
                                onChange={() => toggleEvento(evento.nombre)}
                                className="accent-indigo-600"
                            />
                            <span>{evento.nombre}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Tabla */}
            <table className="w-full table-auto bg-white shadow-lg">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-2">#</th>
                        <th className="p-2">Cliente</th>
                        <th className="p-2">Tipo de Evento</th>
                        <th className="p-2">Fecha</th>
                        <th className="p-2">Total</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {reservasFiltradas.map((reserva, index) => (
                        <tr key={reserva._id} className="border-b text-center hover:bg-gray-100">
                            <td>{index + 1}</td>
                            <td>{reserva.cliente?.nombre || "No registrado"}</td>
                            <td>{reserva.tipoEvento || "N/A"}</td>
                            <td>{new Date(reserva.fecha).toLocaleDateString()}</td>
                            <td>${reserva.total}</td>
                            <td>
                                <MdInfo
                                    onClick={() => navigate(`/dashboard/visualizarReserva/${reserva._id}`)}
                                    className="inline-block text-blue-600 w-6 h-6 cursor-pointer mx-2"
                                />
                                <MdDeleteForever
                                    onClick={() => eliminarReserva(reserva._id)}
                                    className="inline-block text-red-700 w-6 h-6 cursor-pointer mx-2"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TablaReservas;

