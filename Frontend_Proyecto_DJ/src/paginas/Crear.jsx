import React from 'react'
import { FormularioProductos } from '../componets/FormularioProductos'

const Crear = () => {
    return (
        <div className="mt-5 mb-6">
            <h1 className="text-4xl font-black text-yellow-400 drop-shadow-glow">Discos de Vinilo</h1>
            <hr className="my-4 border-yellow-300"  />
            <p className="text-gray-300">Este módulo te permite registrar un nuevo disco de vinilo para tu catálogo</p><br />
            <FormularioProductos />
        </div>
    )
}

export default Crear