import React from 'react'
import TablaClientes from '../componets/TablaClientes'

const ListarClientes = () => {
    return (
        <div className="mt-5 mb-6">
            <h1 className="text-4xl font-black text-yellow-400 drop-shadow-glow">Clientes</h1>
            <hr className="my-4 border-yellow-300" />
            <p className="text-gray-300">Este módulo te permite listar clientes registrados</p><br />
            <TablaClientes/>
        </div>
    )
}

export default ListarClientes