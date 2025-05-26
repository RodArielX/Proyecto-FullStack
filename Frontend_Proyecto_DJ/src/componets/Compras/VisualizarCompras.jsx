import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensaje';

const VisualizarCompras = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [compra, setCompra] = useState({});
  const [mensaje, setMensaje] = useState({});

  useEffect(() => {
    const consultarCompra = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = `${import.meta.env.VITE_BACKEND_URL}/compra/detalle/${id}`;
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
    <div className="max-w-4xl mx-auto p-6 bg-[#1a1a1a] border border-yellow-500 rounded-2xl shadow-lg text-white">
      <h1 className="font-black text-4xl text-yellow-400 text-center tracking-wide">🧾 Visualizar Compra</h1>
      <hr className="my-4 border-yellow-600" />
      <p className="mb-6 text-center text-gray-300">Este submódulo te permite visualizar los detalles de una compra realizada</p>

      {Object.keys(compra).length !== 0 ? (
        <div className="space-y-4 text-white">
          <p>
            <span className="text-yellow-400 uppercase font-semibold">👤 Cliente: </span>
            {compra.cliente?.nombre || 'N/A'}
          </p>
          <p>
            <span className="text-yellow-400 uppercase font-semibold">📅 Fecha de Compra: </span>
            {new Date(compra.fecha).toLocaleString()}
          </p>
          <p>
            <span className="text-yellow-400 uppercase font-semibold">💳 Método de Pago: </span>
            {compra.metodoPago}
          </p>
          <p>
            <span className="text-yellow-400 uppercase font-semibold">💰 Total: </span>
            ${compra.total}
          </p>
          <div>
            <span className="text-yellow-400 uppercase font-semibold">🛍️ Productos: </span>
            <ul className="list-disc list-inside mt-2">
              {compra.productos?.map((item, i) => (
                <li key={i}>
                  {item.nombreDisco} - {item.cantidad} unidades - ${item.precio} c/u
                </li>
              ))}
            </ul>
          </div>
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
