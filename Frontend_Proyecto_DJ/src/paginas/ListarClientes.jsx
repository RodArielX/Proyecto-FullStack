import React from 'react'
import TablaClientes from '../componets/TablaClientes'

const ListarClientes = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Clientes</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite listar clientes registrados</p>
            <TablaClientes/>
        </div>
    )
}

export default ListarClientes