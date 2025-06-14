import React from 'react'
import ModuloEventos from '../../componets/Eventos/ModuloEventos'

const ListarEventos = () => {
    return (
        <div className="mt-5 mb-6">
            <h1 className="text-4xl font-black text-yellow-400 drop-shadow-glow">Eventos</h1>
            <hr className="my-4 border-yellow-300" />
            <p className="text-gray-300">Este módulo te permite gestionar los eventos de Edwin Asqui DJ</p><br />
            <ModuloEventos/>
        </div>
    )
}

export default ListarEventos
