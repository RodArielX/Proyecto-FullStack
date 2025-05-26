import { useContext, useEffect, useState } from "react";
import { Trash2, Eye, Pencil } from "lucide-react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../context/AuthProvider";
import { FaBroom, FaUserPlus } from "react-icons/fa";

const TablaClientes = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);

  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroCiudad, setFiltroCiudad] = useState("");
  const [filtroTelefono, setFiltroTelefono] = useState("");

  const listarClientes = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/listar`;
      const options = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      const respuesta = await axios.get(url, options);
      setClientes(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmar = confirm("¿Vas a eliminar este cliente, estás seguro?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem('token');
      const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/eliminar/${id}`;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      };

      await axios.delete(url, { headers });
      listarClientes();
    } catch (error) {
      console.log(error);
    }
  };

  const limpiarFiltros = () => {
    setFiltroNombre("");
    setFiltroCiudad("");
    setFiltroTelefono("");
  };

  useEffect(() => {
    listarClientes();
  }, []);

  const clientesFiltrados = clientes.filter((cliente) => {
    const coincideNombre = (cliente.nombre ?? "").toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideCiudad = (cliente.ciudad ?? "").toLowerCase().includes(filtroCiudad.toLowerCase());
    const coincideTelefono = (cliente.telefono ?? "").includes(filtroTelefono);
    return coincideNombre && coincideCiudad && coincideTelefono;
  });



  return (
    <div className="bg-zinc-950 text-white p-6 rounded-2xl shadow-xl">
      <div className="flex justify-end mb-6">
        {/*<button
          onClick={() => navigate('/dashboard/crearCliente')}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-5 py-2 rounded-xl shadow-lg transition-all flex items-center gap-3"
        >
          <FaUserPlus className="text-lg" />
          Registrar Cliente
        </button>*/}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="p-2 rounded-md bg-zinc-900 border border-zinc-700 text-white placeholder-gray-400"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por ciudad"
          className="p-2 rounded-md bg-zinc-900 border border-zinc-700 text-white placeholder-gray-400"
          value={filtroCiudad}
          onChange={(e) => setFiltroCiudad(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por teléfono"
          className="p-2 rounded-md bg-zinc-900 border border-zinc-700 text-white placeholder-gray-400"
          value={filtroTelefono}
          onChange={(e) => setFiltroTelefono(e.target.value)}
        />
        <button
          onClick={limpiarFiltros}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-5 py-2 rounded-xl shadow-lg transition-all flex items-center gap-3 text-lg whitespace-nowrap w-fit"
        >
          <FaBroom className="text-lg" />
          Limpiar filtros
        </button>
      </div>

      {clientesFiltrados.length === 0 ? (
        <p className="text-center text-gray-400">No existen registros que coincidan con tu búsqueda.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full bg-zinc-900 text-white shadow-md rounded-xl overflow-hidden">
            <thead className="bg-yellow-500 text-black">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Nombre</th>
                <th className="p-3 text-left">Ciudad</th>
                <th className="p-3 text-left">Teléfono</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((cliente, index) => (
                <tr key={cliente._id} className="border-b border-zinc-800 hover:bg-zinc-800">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{cliente.nombre}</td>
                  <td className="p-3">{cliente.ciudad}</td>
                  <td className="p-3">{cliente.telefono}</td>
                  <td className="p-3 flex justify-center space-x-4">
                    <Eye
                      className="w-5 h-5 text-green-400 cursor-pointer hover:scale-110 transition"
                      onClick={() => navigate(`/dashboard/visualizarCliente/${cliente._id}`)}
                    />
                    {auth.rol === "Administrador" && (
                      <>
                        {/*<Pencil
                          className="w-5 h-5 text-blue-400 cursor-pointer hover:scale-110 transition"
                          onClick={() => navigate(`/dashboard/actualizarClientes/${cliente._id}`)}
                        />*/}
                        <Trash2
                          className="w-5 h-5 text-red-400 cursor-pointer hover:scale-110 transition"
                          onClick={() => handleDelete(cliente._id)}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TablaClientes;