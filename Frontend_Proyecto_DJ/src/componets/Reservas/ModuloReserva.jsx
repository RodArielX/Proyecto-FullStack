import { useState } from 'react';
import { Trash, Pencil, Upload } from 'lucide-react';
import axios from 'axios';

const ModuloReserva = ({ imagenesIniciales = [], onChange }) => {
  const [imagenes, setImagenes] = useState(imagenesIniciales);
  const [preview, setPreview] = useState(null);

  const subirImagen = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('imagen', file);

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/imagenes/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const nuevasImagenes = [...imagenes, data];
      setImagenes(nuevasImagenes);
      onChange(nuevasImagenes); // Comunica al padre
    } catch (error) {
      console.error('Error al subir imagen:', error);
    }
  };

  const eliminarImagen = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/imagenes/${id}`);
      const filtradas = imagenes.filter((img) => img._id !== id);
      setImagenes(filtradas);
      onChange(filtradas);
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
    }
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-xl shadow-xl text-white space-y-4">
      <h2 className="text-2xl font-bold text-yellow-400">🖼️ Gestión de Imágenes</h2>
      
      <label className="inline-flex items-center gap-3 cursor-pointer text-sm font-semibold text-gray-300 hover:text-yellow-400">
        <Upload className="w-5 h-5" />
        Subir Imagen
        <input type="file" className="hidden" onChange={subirImagen} accept="image/*" />
      </label>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {imagenes.map((img) => (
          <div key={img._id} className="relative group border border-yellow-600 rounded-xl overflow-hidden shadow-lg">
            <img src={img.url} alt="Imagen" className="w-full h-40 object-cover" />

            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-all flex justify-center items-center gap-4">
              <button onClick={() => eliminarImagen(img._id)} className="p-2 bg-red-600 hover:bg-red-700 rounded-full">
                <Trash className="w-4 h-4" />
              </button>
              {/* Aquí puedes implementar edición si es necesario */}
              <button className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full">
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuloReserva;


