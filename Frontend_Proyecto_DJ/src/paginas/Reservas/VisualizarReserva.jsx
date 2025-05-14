import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DetalleReserva from '../../componets/Reservas/DetalleReserva';

const VisualizarReserva = () => {
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    const fetchReserva = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reserva/detalle/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReserva(data);
    };
    fetchReserva();
  }, [id]);

  if (!reserva) return <p className="text-center mt-10">Cargando reserva...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Detalle de Reserva</h1>
      <DetalleReserva reserva={reserva} />
    </div>
  );
};

export default VisualizarReserva;


