import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../Alertas/Mensaje';

const VisualizarCompras = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [compra, setCompra] = useState({});
  const [mensaje, setMensaje] = useState({});

  useEffect(() => {
    const consultarCompra = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_BACKEND_URL}/compras/detallehistorial/${id}`;
        const options = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };
        const respuesta = await axios.get(url, options);
        setCompra(respuesta.data);
      } catch (error) {
        setMensaje({
          respuesta: error.response?.data?.msg || 'Error al obtener la compra',
          tipo: false,
        });
      }
    };
    consultarCompra();
  }, [id]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#1a1a1a] border border-yellow-500 rounded-2xl shadow-xl text-white">
      <h1 className="font-black text-4xl text-yellow-400 text-center tracking-wide">🧾 Visualizar Compra</h1>
      <hr className="my-4 border-yellow-600" />
      <p className="mb-6 text-center text-gray-300">Visualiza los detalles completos de esta compra realizada por el cliente</p>

      {Object.keys(compra).length !== 0 ? (
        <div className="space-y-4 text-white">
          {compra.cliente && (
            <div className="bg-[#262626] p-4 rounded-xl shadow">
              <p className="text-yellow-400 font-bold">👤 Cliente</p>
              <p>{compra.cliente.nombre} ({compra.cliente.email})</p>
              <p>📞 {compra.cliente.telefono}</p>
              <p>📍 {compra.cliente.direccion}</p>
            </div>
          )}

          <div className="bg-[#262626] p-4 rounded-xl shadow space-y-2">
            <p><span className="text-yellow-400 font-bold">📅 Fecha Compra:</span> {new Date(compra.fechaCompra).toLocaleString()}</p>
            <p><span className="text-yellow-400 font-bold">💳 Pago:</span> {compra.formaPago}</p>
            <p><span className="text-yellow-400 font-bold">📦 Estado:</span> {compra.estado}</p>
            <p><span className="text-yellow-400 font-bold">💰 Total:</span> ${compra.total}</p>
            {compra.estado === 'enviado' && (
              <p>
                <span className="text-yellow-400 font-bold">📅 Fecha Envío:</span>{' '}
                {new Date(compra.fechaEnvio).toLocaleString()}
              </p>
            )}
          </div>

          <div className="bg-[#262626] p-4 rounded-xl shadow">
            <p className="text-yellow-400 font-bold mb-2">🛍️ Productos Comprados</p>
            <ul className="list-disc list-inside space-y-1">
              {compra.productos?.map((item, i) => (
                <li key={i}>
                  {item.nombre || 'Producto eliminado'} - {item.cantidad} unidades - ${item.producto?.precio} c/u
                </li>
              ))}
            </ul>
          </div>

          {compra.comprobantePago && (
            <div className="bg-[#262626] p-4 rounded-xl shadow">
              <p className="text-yellow-400 font-bold">📎 Comprobante de Pago</p>
              <img
                src={compra.comprobantePago}
                alt="Comprobante de pago"
                className="w-80 h-auto border border-yellow-400 rounded-xl mt-2"
              />
            </div>
          )}

          {compra.comprobanteEnvio && (
            <div className="bg-[#262626] p-4 rounded-xl shadow">
              <p className="text-yellow-400 font-bold">🚚 Comprobante de Envío</p>
              <img
                src={compra.comprobanteEnvio}
                alt="Comprobante de envío"
                className="w-80 h-auto border border-yellow-400 rounded-xl mt-2"
              />
            </div>
          )}
        </div>
      ) : (
        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/dashboard/listarCompras')}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-md"
        >
          ⬅ Volver a Compras
        </button>
      </div>
    </div>
  );
};

export default VisualizarCompras