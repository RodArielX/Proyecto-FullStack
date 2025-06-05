import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus, Calendar1Icon } from "lucide-react";
import AuthContext from "../../context/AuthProvider";

const ModuloEventos = () => {
  const { auth } = useContext(AuthContext);
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  const listarEventos = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/evento/listar`;
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(url, options);
      setEventos(data);
    } catch (error) {
      console.error("Error al listar eventos", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmar = confirm("¿Estás seguro de eliminar este evento?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_BACKEND_URL}/evento/eliminar/${id}`;
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(url, options);
      listarEventos();
    } catch (error) {
      console.error("Error al eliminar evento", error);
    }
  };

  useEffect(() => {
    listarEventos();
  }, []);

  return (
    <div className="p-6 bg-[#0e0e0e] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate("/dashboard/crearEventos")}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-3 rounded-2xl shadow-lg transition duration-300 hover:scale-105"
        >
          <Calendar1Icon size={20} />
          Agregar Evento
        </button>
      </div>

      {eventos.length === 0 ? (
        <p className="text-gray-400 text-center mt-20 text-xl">No hay eventos registrados.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventos.map((evento) => (
            <div
              key={evento._id}
              className="bg-[#1a1a1a] rounded-2xl shadow-lg hover:shadow-yellow-500/20 transition duration-300 overflow-hidden border border-yellow-900/30"
            >
              {evento.imagenEvento && (
                <img
                  src={evento.imagenEvento}
                  alt={evento.nombreEvento}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <h2 className="text-xl font-bold text-white mb-1">
                  {evento.nombreEvento}
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  {new Date(evento.fechaEvento).toLocaleDateString()}
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => navigate(`/dashboard/actualizarEventos/${evento._id}`)}
                    className="text-yellow-400 hover:text-yellow-500 transition"
                    title="Editar"
                  >
                    <Pencil />
                  </button>
                  <button
                    onClick={() => handleDelete(evento._id)}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Eliminar"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuloEventos;







