import React from 'react'
import Tabla from '../componets/TablaClientes'
import TablaProductos from '../componets/TablaProductos'


const ProductoListar = () => {
    return (
        <div className="mt-5 mb-6">
            <h1 className="text-4xl font-black text-yellow-400 drop-shadow-glow">Catálogo de Discos</h1>
            <hr className="my-4 border-yellow-300"  />
            <p className="text-gray-300">Este módulo te permite visualizar todos los discos de vinil registrados</p><br/>
            <TablaProductos/>
        </div>
    )
}

export default ProductoListar