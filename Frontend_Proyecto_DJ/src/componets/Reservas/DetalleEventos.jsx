const DetalleReserva = ({ reserva }) => {
  return (
    <div className="p-6 bg-white rounded shadow-md space-y-4">
      <p><strong>Cliente:</strong> {reserva.cliente}</p>
      <p><strong>Tipo de Evento:</strong> {reserva.tipoEvento}</p>
      <p><strong>Fecha:</strong> {new Date(reserva.fecha).toLocaleDateString()}</p>
      <p><strong>Descripción:</strong> {reserva.descripcion}</p>
    </div>
  );
};

export default DetalleReserva;