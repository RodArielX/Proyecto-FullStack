import React from 'react'
import ModuloReserva from '../../componets/Reservas/ModuloReserva'

const ListarReservas = () => {
    return (
        <div className="mt-5 mb-6">
            <h1 className="text-4xl font-black text-yellow-400 drop-shadow-glow">Eventos Proximos</h1>
            <hr className="my-4 border-yellow-300" />
            <p className="text-gray-300">Este módulo te permite gestionar los eventos proximos</p><br />
            <ModuloReserva/>
        </div>
    )
}

export default ListarReservas
