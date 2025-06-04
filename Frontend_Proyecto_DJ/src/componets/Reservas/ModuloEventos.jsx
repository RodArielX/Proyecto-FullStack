import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Eventos</h1>
        <button
          onClick={() => navigate("/dashboard/crearEventos")}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl shadow-md transition duration-300"
        >
          <Plus size={18} />
          Agregar Evento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {eventos.map((evento) => (
          <div
            key={evento._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-200"
          >
            {evento.imagenEvento && (
              <img
                src={evento.imagenEvento}
                alt={evento.nombreEvento}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {evento.nombreEvento}
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                {new Date(evento.fechaEvento).toLocaleDateString()}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => navigate(`/dashboard/actualizarEventos/${evento._id}`)}
                  className="text-yellow-600 hover:text-yellow-800 transition"
                  title="Editar"
                >
                  <Pencil />
                </button>
                <button
                  onClick={() => handleDelete(evento._id)}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Eliminar"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuloEventos






