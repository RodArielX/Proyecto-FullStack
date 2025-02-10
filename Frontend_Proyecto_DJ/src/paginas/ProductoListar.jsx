import React from 'react'
import Tabla from '../componets/TablaClientes'
import TablaProductos from '../componets/TablaProductos'


const ProductoListar = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Productos</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite visualizar todos los productos registrados</p>
            <TablaProductos/>
        </div>
    )
}

export default ProductoListar