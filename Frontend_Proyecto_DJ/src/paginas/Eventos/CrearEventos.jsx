import React from 'react'
import { FormularioEventos } from '../../componets/FormularioEventos'

const CrearEventos = () => {
    return (
        <div className="mt-5 mb-6">
            <h1 className="text-4xl font-black text-yellow-400 drop-shadow-glow">Eventos</h1>
            <hr className="my-4 border-yellow-300"  />
            <p className="text-gray-300">Este módulo te permite registrar un nuevo evento</p><br />
            <FormularioEventos />
        </div>
    )
}

export default CrearEventos