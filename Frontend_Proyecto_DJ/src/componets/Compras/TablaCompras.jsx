import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Eye, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import ActualizarCompraModal from "../Modals/ModalActualizarCompra";

const TablaCompras = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [compras, setCompras] = useState([]);
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroMetodoPago, setFiltroMetodoPago] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");


  const [mostrarModal, setMostrarModal] = useState(false);
  const [compraSeleccionada, setCompraSeleccionada] = useState(null);

  const abrirModal = (compra) => {
    setCompraSeleccionada(compra);
    setMostrarModal(true);
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
    const coincideCliente = nombreCliente
      .toLowerCase()
      .includes(filtroCliente.toLowerCase());
    const coincidePago = filtroMetodoPago
      ? c.formaPago.toLowerCase() === filtroMetodoPago.toLowerCase()
      : true;
    const coincideEstado = filtroEstado
      ? c.estado?.toLowerCase() === filtroEstado.toLowerCase()
      : true;
    return coincideCliente && coincidePago && coincideEstado;
  });

  const limpiarFiltros = () => {
    setFiltroCliente("");
    setFiltroMetodoPago("");
    setFiltroEstado("")
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
          <select
            className="p-2 rounded-md bg-zinc-900 border border-zinc-700 text-white"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="">Estado</option>
            <option value="pendiente">Pendiente</option>
            <option value="enviado">Enviado</option>
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
                  <th className="p-3 text-left">Estado</th>
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
                    <td className="p-3 capitalize">{compra.formaPago}</td>
                    <td className="p-3">
                      {new Date(compra.fechaCompra).toLocaleDateString()}
                    </td>
                    <td className="p-3 capitalize">{compra.estado}</td>
                    <td className="p-3 flex justify-center gap-4">
                      <Eye
                        className="w-5 h-5 text-green-400 cursor-pointer hover:scale-110 transition"
                        onClick={() =>
                          navigate(`/dashboard/visualizarCompras/${compra._id}`)
                        }
                      />
                      <Pencil
                        className="w-5 h-5 text-blue-400 cursor-pointer hover:scale-110 transition"
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

      {/* Modal usar componente externo */}
      {mostrarModal && compraSeleccionada && (
        <ActualizarCompraModal
          compraId={compraSeleccionada._id}
          onClose={() => setMostrarModal(false)}
          onUpdate={() => {
            listarCompras();
            setMostrarModal(false);
          }}
        />
      )}
    </>
  );
};

export default TablaCompras