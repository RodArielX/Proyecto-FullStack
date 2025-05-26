import React from 'react'
import TablaCompras from '../../componets/Compras/TablaCompras'

const ListarCompras = () => {
    return (
        <div className="mt-5 mb-6">
            <h1 className="text-4xl font-black text-yellow-400 drop-shadow-glow">Compras</h1>
            <hr className="my-4 border-yellow-300" />
            <p className="text-gray-300">Este módulo te permite listar el historial de compras</p><br />
            <TablaCompras/>
        </div>
    )
}

export default ListarCompras