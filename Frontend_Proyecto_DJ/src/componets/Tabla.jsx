import { useContext, useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthProvider";


const Tabla = () => {

    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()


    // Paso 1
    const [productos, setProductos] = useState([])

    // Paso 2
    const listarProductos = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/producto/listar`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            console.log(respuesta.data)
            setProductos(respuesta.data, ...productos)
            console.log(productos)

        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {

            const confirmar = confirm("Vas a eliminar este producto, ¿Estás seguro?")

            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/producto/eliminar/${id}`
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
                const respuesta = await axios.delete(url, { headers, data })
                listarProductos()

            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listarProductos()
    }, [])

    return (
        <>
            {
                productos.length == 0
                    ?
                    <p>No existen registros</p>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre del Disco</th>
                                <th className='p-2'>Nombre del Artista</th>
                                <th className='p-2'>Precio</th>
                                <th className='p-2'>Género</th>
                                <th className='p-2'>Stock</th>
                                <th className='p-2'>Acciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                productos.map((producto, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={producto._id}>
                                        <td>{index + 1}</td>
                                        <td>{producto.nombreDisco}</td>
                                        <td>{producto.artista}</td>
                                        <td>{producto.precio}</td>
                                        <td>{producto.genero}</td>
                                        <td>{producto.stock}</td>
    
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/visualizar/${producto._id}`)} />
                                            {
                                                auth.rol === "Administrador" &&
                                                (
                                                    <>
                                                        <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                            onClick={() => navigate(`/dashboard/actualizarProductos/${producto._id}`)}
                                                        />

                                                        <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                                            onClick={() => { handleDelete(producto._id) }}
                                                        />
                                                    </>
                                                )
                                            }


                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
            }
        </>

    )
}

export default Tabla