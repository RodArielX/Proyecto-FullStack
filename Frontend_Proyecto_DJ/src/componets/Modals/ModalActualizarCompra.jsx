import { useState, useEffect } from 'react';
import axios from 'axios';
import Mensaje from '../Alertas/Mensaje';

const ActualizarCompraModal = ({ compraId, formaPago, onClose, onUpdate }) => {
  const [estado, setEstado] = useState(false);
  const [bloquearEstado, setBloquearEstado] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mensaje, setMensaje] = useState({});
  const [subiendo, setSubiendo] = useState(false);

  // Consultar el estado actual de la compra usando la ruta detallehistorial
  useEffect(() => {
    const obtenerCompra = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/compras/detallehistorial/${compraId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.estado === 'enviado') {
          setEstado(true);
          setBloquearEstado(true);
        }
      } catch (error) {
        setMensaje({ respuesta: 'Error al obtener estado actual de la compra', tipo: false });
      }
    };

    obtenerCompra();
  }, [compraId]);

  // Si sube imagen en transferencia, cambiar estado a "enviado" automáticamente
  useEffect(() => {
    if (formaPago !== "efectivo" && imagen) {
      setEstado(true);
    }
  }, [imagen, formaPago]);

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
        <p className="text-gray-300">
          {formaPago === 'efectivo'
            ? 'Pago en efectivo: solo debes marcar como enviado.'
            : 'Pago por transferencia: sube el comprobante para cambiar a enviado automáticamente.'}
        </p>
        <br />

        {Object.keys(mensaje).length > 0 && (
          <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {formaPago === 'efectivo' && (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={estado}
                disabled={bloquearEstado}
                onChange={(e) => setEstado(e.target.checked)}
                className="accent-yellow-400 cursor-pointer"
              />
              <span>
                {bloquearEstado ? (
                  <span className="text-green-400 font-semibold">Compra ya enviada</span>
                ) : (
                  <>Marcar como <strong>enviado</strong></>
                )}
              </span>
            </label>
          )}

          {formaPago !== 'efectivo' && (
            <>
              <div>
                <label className="block mb-1 text-yellow-400 font-medium">📎 Subir comprobante de envío:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImagen}
                  className="bg-black border border-yellow-400 rounded p-2 w-full"
                  disabled={bloquearEstado}
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
                      setEstado(false);
                    }}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 text-red-500 hover:text-red-700 font-bold px-2 rounded-full"
                    title="Eliminar imagen"
                    disabled={bloquearEstado}
                  >
                    ❌
                  </button>
                </div>
              )}
            </>
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
              disabled={subiendo || bloquearEstado}
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
