import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Eye, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";

const TablaCompras = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [compras, setCompras] = useState([]);
    const [filtroCliente, setFiltroCliente] = useState("");
    const [filtroMetodoPago, setFiltroMetodoPago] = useState("");

    //  Muestra el modal para poder subir el comprobante 
    const [mostrarModal, setMostrarModal] = useState(false);
    const [compraSeleccionada, setCompraSeleccionada] = useState(null);
    const [estadoEnvio, setEstadoEnvio] = useState(false);
    const [comprobanteEnvio, setComprobanteEnvio] = useState(null);

    const abrirModal = (compra) => {
        setCompraSeleccionada(compra);
        setEstadoEnvio(compra.estado === "enviado");
        setMostrarModal(true);
    };

    const actualizarCompra = async () => {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("estado", estadoEnvio ? "enviado" : "pendiente");
            if (comprobanteEnvio) {
                formData.append("comprobanteEnvio", comprobanteEnvio);
            }

            const url = `${import.meta.env.VITE_BACKEND_URL}/compra/actualizar/${compraSeleccionada._id}`;
            const options = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.put(url, formData, options);
            setMostrarModal(false);
            listarCompras(); // Recarga las compras
        } catch (error) {
            console.log("Error al actualizar la compra:", error);
        }
    };


    const listarCompras = async () => {
        try {
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/compras/historial`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const respuesta = await axios.get(url, options);
            setCompras(respuesta.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarCompras();
    }, []);

    const comprasFiltradas = compras.filter((c) => {
        const nombreCliente = c.cliente?.nombre || "Tú";
        const coincideCliente = nombreCliente.toLowerCase().includes(filtroCliente.toLowerCase());
        const coincidePago = filtroMetodoPago ? c.tipoPago.toLowerCase() === filtroMetodoPago.toLowerCase() : true;
        return coincideCliente && coincidePago;
    });

    const limpiarFiltros = () => {
        setFiltroCliente("");
        setFiltroMetodoPago("");
    };

    return (
        <>
            <div className="bg-zinc-950 text-white p-6 rounded-2xl shadow-xl">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                    Historial de Compras
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <input
                        type="text"
                        placeholder="Buscar por cliente"
                        className="p-2 rounded-md bg-zinc-900 border border-zinc-700 text-white placeholder-gray-400"
                        value={filtroCliente}
                        onChange={(e) => setFiltroCliente(e.target.value)}
                    />
                    <select
                        className="p-2 rounded-md bg-zinc-900 border border-zinc-700 text-white"
                        value={filtroMetodoPago}
                        onChange={(e) => setFiltroMetodoPago(e.target.value)}
                    >
                        <option value="">Todos los métodos de pago</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="transferencia">Transferencia</option>
                    </select>
                    <button
                        onClick={limpiarFiltros}
                        className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-5 py-2 rounded-xl shadow-lg transition-all text-lg"
                    >
                        Limpiar filtros
                    </button>
                </div>

                {comprasFiltradas.length === 0 ? (
                    <p className="text-center text-gray-400">No existen compras registradas.</p>
                ) : (
                    <div className="overflow-x-auto rounded-xl">
                        <table className="min-w-full bg-zinc-900 text-white shadow-md rounded-xl overflow-hidden">
                            <thead className="bg-yellow-500 text-black">
                                <tr>
                                    <th className="p-3 text-left">#</th>
                                    <th className="p-3 text-left">Cliente</th>
                                    <th className="p-3 text-left">Total</th>
                                    <th className="p-3 text-left">Método de Pago</th>
                                    <th className="p-3 text-left">Fecha</th>
                                    <th className="p-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comprasFiltradas.map((compra, index) => (
                                    <tr
                                        key={compra._id}
                                        className="border-b border-zinc-800 hover:bg-zinc-800"
                                    >
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3">{compra.cliente?.nombre || "Tú"}</td>
                                        <td className="p-3">${compra.total.toFixed(2)}</td>
                                        <td className="p-3 capitalize">{compra.tipoPago}</td>
                                        <td className="p-3">
                                            {new Date(compra.fechaCompra).toLocaleDateString()}
                                        </td>
                                        <td className="p-3 flex justify-center">
                                            <Eye
                                                className="w-5 h-5 text-green-400 cursor-pointer hover:scale-110 transition"
                                                onClick={() =>
                                                    navigate(`/dashboard/visualizarCompras/${compra._id}`)
                                                }
                                            />
                                            <Pencil
                                                className="w-5 h-5 text-blue-400 cursor-pointer hover:scale-110 transition ml-4"
                                                onClick={() => abrirModal(compra)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* MODAL para actualizar compra */}
            {mostrarModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-zinc-900 text-white p-6 rounded-xl w-full max-w-md shadow-xl">
                        <h3 className="text-lg font-bold text-yellow-400 mb-4">
                            Actualizar Estado de Compra
                        </h3>

                        <div className="mb-4">
                            <label className="block mb-1 text-sm">Comprobante de Envío:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setComprobanteEnvio(e.target.files[0])}
                                className="w-full bg-zinc-800 p-2 rounded"
                            />
                        </div>

                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="estadoEnvio"
                                checked={estadoEnvio}
                                onChange={() => setEstadoEnvio(!estadoEnvio)}
                                className="mr-2"
                            />
                            <label htmlFor="estadoEnvio">Marcar como enviado</label>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setMostrarModal(false)}
                                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={actualizarCompra}
                                className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

};

export default TablaCompras;