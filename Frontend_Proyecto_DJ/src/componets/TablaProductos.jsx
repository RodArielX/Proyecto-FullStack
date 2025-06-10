import { useContext, useEffect, useState } from "react";
import { Trash2, Eye, Pencil } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { FaBroom, FaCompactDisc } from 'react-icons/fa'

const Tabla = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroArtista, setFiltroArtista] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");
  const [filtroStock, setFiltroStock] = useState("");
  const [mostrarAgotados, setMostrarAgotados] = useState(true);

  const listarProductos = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/producto/listar`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await axios.get(url, options);
      setProductos(respuesta.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmar = confirm("¿Estás seguro de eliminar este producto?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/producto/eliminar/${id}`;
      const options = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(url, options);
      listarProductos(); // Actualiza la tabla después de eliminar
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    listarProductos();
  }, []);

  const productosFiltrados = productos.filter((p) => {
    const coincideNombre = p.nombreDisco.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideArtista = p.artista.toLowerCase().includes(filtroArtista.toLowerCase());
    const coincideGenero = filtroGenero ? p.genero === filtroGenero : true;
    const mostrar = mostrarAgotados ? true : p.stock > 0;
    const coincideStock = filtroStock === ''
    ? true
    : String(p.stock).toLowerCase().includes(filtroStock.toLowerCase())
    return coincideNombre && coincideArtista && coincideGenero && mostrar && coincideStock;
  });

  const limpiarFiltros = () => {
    setFiltroNombre("");
    setFiltroArtista("");
    setFiltroGenero("");
    setFiltroStock("");
    setMostrarAgotados(true);
  };

  return (
    <div className="bg-zinc-950 text-white p-6 rounded-2xl shadow-xl">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate('/dashboard/crear')}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-5 py-2 rounded-xl shadow-lg transition-all flex items-center gap-3"
        >
          <FaCompactDisc className="text-lg" />
          Ingresar Disco
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar por disco"
          className="p-2 rounded-md bg-zinc-900 border border-zinc-700 text-white placeholder-gray-400"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por artista"
          className="p-2 rounded-md bg-zinc-900 border border-zinc-700 text-white placeholder-gray-400"
          value={filtroArtista}
          onChange={(e) => setFiltroArtista(e.target.value)}
        />
        <input
          type="number"
          placeholder="Buscar por stock"
          className="p-2 rounded-md bg-zinc-900 border border-zinc-700 text-white placeholder-gray-400"
          value={filtroStock}
          onChange={(e) => setFiltroStock(e.target.value)}
        />
        {/*<select
          className="p-2 rounded-md bg-zinc-900 border border-zinc-700 text-white"
          value={filtroGenero}
          onChange={(e) => setFiltroGenero(e.target.value)}
        >
          <option value="">--- Seleccionar ---</option>
          <option value="Electrónica">Electrónica</option>
          <option value="House">House</option>
          <option value="Tecno">Tecno</option>
          <option value="Rock">Rock</option>
          <option value="Pop">Pop</option>
          <option value="Raggae">Raggae</option>
          <option value="Funk">Funk</option>
          <option value="Hip-Hop">Hip-Hop</option>
          <option value="Latino">Latino</option>
          <option value="Otro">Otro</option>
        </select>*/}
        <label className="flex items-center space-x-2 text-white">
          <input
            type="checkbox"
            checked={mostrarAgotados}
            onChange={() => setMostrarAgotados(!mostrarAgotados)}
          />
          <span>Mostrar agotados</span>
        </label>
        <button
          onClick={limpiarFiltros}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-5 py-2 rounded-xl shadow-lg transition-all flex items-center gap-3 text-lg whitespace-nowrap w-fit"
        >
          <FaBroom className="text-lg" />
          Limpiar filtros
        </button>
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="text-center text-gray-400">No existen registros que coincidan con tu búsqueda.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full bg-zinc-900 text-white shadow-md rounded-xl overflow-hidden">
            <thead className="bg-yellow-500 text-black">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Disco</th>
                <th className="p-3 text-left">Artista</th>
                <th className="p-3 text-left">Precio</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.map((producto, index) => (
                <tr key={producto._id} className="border-b border-zinc-800 hover:bg-zinc-800">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{producto.nombreDisco}</td>
                  <td className="p-3">{producto.artista}</td>
                  <td className="p-3">${producto.precio}</td>
                  <td className="p-3">{producto.stock}</td>
                  <td className="p-3 flex justify-center space-x-4">
                    <Eye
                      className="w-5 h-5 text-green-400 cursor-pointer hover:scale-110 transition"
                      onClick={() => navigate(`/dashboard/visualizarProducto/${producto._id}`)}
                    />
                    {auth.rol === "Administrador" && (
                      <>
                        <Pencil
                          className="w-5 h-5 text-blue-400 cursor-pointer hover:scale-110 transition"
                          onClick={() => navigate(`/dashboard/actualizarProductos/${producto._id}`)}
                        />
                        <Trash2
                          className="w-5 h-5 text-red-400 cursor-pointer hover:scale-110 transition"
                          onClick={() => handleDelete(producto._id)}
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

export default Tabla