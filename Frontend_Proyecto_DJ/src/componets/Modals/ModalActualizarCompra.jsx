import { useState } from 'react';
import axios from 'axios';
import Mensaje from '../Alertas/Mensaje';

const ActualizarCompraModal = ({ compraId, onClose, onUpdate }) => {
  const [estado, setEstado] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mensaje, setMensaje] = useState({});
  const [subiendo, setSubiendo] = useState(false);

  const handleImagen = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('estado', estado ? 'enviado' : 'pendiente');
    if (imagen) {
      formData.append('comprobanteEnvio', imagen);
    }

    try {
      setSubiendo(true);

      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/compras/estado/${compraId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMensaje({ respuesta: 'Compra actualizada correctamente', tipo: true });
      onUpdate();
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setMensaje({
        respuesta: error.response?.data?.msg || 'Hubo un error al actualizar la compra',
        tipo: false,
      });
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-[#1a1a1a] border border-yellow-500 rounded-2xl p-6 w-[90%] max-w-lg shadow-2xl text-white relative">
        <h2 className="text-2xl font-bold text-yellow-400 text-center mb-4">Actualizar Compra</h2>

        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={estado}
              onChange={(e) => setEstado(e.target.checked)}
              className="accent-yellow-400"
            />
            <span>Marcar como <strong>enviado</strong></span>
          </label>

          <div>
            <label className="block mb-1 text-yellow-400 font-medium">📎 Subir comprobante de envío:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagen}
              className="bg-black border border-yellow-400 rounded p-2 w-full"
            />
          </div>

          {preview && (
            <div className="relative mt-2 text-center inline-block">
              <img
                src={preview}
                alt="Vista previa"
                className="w-40 h-auto mx-auto rounded-lg border border-yellow-400"
              />
              <button
                type="button"
                onClick={() => {
                  setImagen(null);
                  setPreview(null);
                }}
                className="absolute top-1 right-1 bg-black bg-opacity-60 text-red-500 hover:text-red-700 font-bold px-2 rounded-full"
                title="Eliminar imagen"
              >
                ❌
              </button>
            </div>
          )}


          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={subiendo}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-xl"
            >
              {subiendo ? 'Actualizando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarCompraModal

