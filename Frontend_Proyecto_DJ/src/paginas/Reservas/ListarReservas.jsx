// pages/Reservas/ListarReservas.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import TablaReservas from '../../componets/Reservas/TablaReservas';

const ListarReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [filtro, setFiltro] = useState({ cliente: '', tipoEvento: [] });

  const tiposEventos = ['Fiesta', 'Boda', 'Concierto', 'Graduación'];

  useEffect(() => {
    const obtenerReservas = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/reserva/listar`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservas(data);
    };
    obtenerReservas();
  }, []);

  const handleDelete = async (id) => {
    const confirmar = confirm("¿Deseas eliminar esta reserva?");
    if (!confirmar) return;
    const token = localStorage.getItem('token');
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/reserva/eliminar/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setReservas(reservas.filter(r => r._id !== id));
  };

  const handleFiltroChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const nuevosTipos = checked
        ? [...filtro.tipoEvento, value]
        : filtro.tipoEvento.filter(tipo => tipo !== value);
      setFiltro(prev => ({ ...prev, tipoEvento: nuevosTipos }));
    } else {
      setFiltro(prev => ({ ...prev, [name]: value }));
    }
  };

  const reservasFiltradas = reservas.filter(r => {
    const matchCliente = r.cliente.toLowerCase().includes(filtro.cliente.toLowerCase());
    const matchTipo = filtro.tipoEvento.length === 0 || filtro.tipoEvento.includes(r.tipoEvento);
    return matchCliente && matchTipo;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Listado de Reservas</h1>

      <div className="mb-4 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          name="cliente"
          placeholder="Buscar por cliente"
          className="p-2 border rounded"
          onChange={handleFiltroChange}
        />

        <div className="flex gap-2 flex-wrap">
          {tiposEventos.map(tipo => (
            <label key={tipo} className="flex items-center gap-1">
              <input
                type="checkbox"
                value={tipo}
                checked={filtro.tipoEvento.includes(tipo)}
                onChange={handleFiltroChange}
              />
              {tipo}
            </label>
          ))}
        </div>
      </div>

      <TablaReservas reservas={reservasFiltradas} handleDelete={handleDelete} />
    </div>
  );
};

export default ListarReservas;
