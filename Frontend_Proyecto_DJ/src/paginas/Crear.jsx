import React from 'react'
import { FormularioProductos } from '../componets/FormularioProductos'

const Crear = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Productos</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite registrar un nuevo producto</p>
            <FormularioProductos />
        </div>
    )
}

export default Crear