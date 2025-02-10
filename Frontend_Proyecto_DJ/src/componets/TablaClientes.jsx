import { useContext, useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthProvider";


const TablaClientes = () => {

    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()


    // Paso 1
    const [clientes, setClientes] = useState([])

    // Paso 2
    const listarClientes = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/listar`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            console.log(respuesta.data)
            setClientes(respuesta.data, ...clientes)
            console.log(clientes)

        } catch (error) {
            console.log(error)
        }
    }
    // Eliminar Clientes
    const handleDelete = async (id) => {
        try {

            const confirmar = confirm("Vas a eliminar este cliente, ¿Estás seguro?")

            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/eliminar/${id}`
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
                const respuesta = await axios.delete(url, { headers})
                listarClientes()

            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listarClientes()
    }, [])

    return (
        <>
            {
                clientes.length == 0
                    ?
                    <p>No existen registros</p>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Apellido</th>
                                <th className='p-2'>Ciudad</th>
                                <th className='p-2'>Dirección</th>
                                <th className='p-2'>Teléfono</th>
                                <th className='p-2'>Email</th>
                                <th className='p-2'>Acciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                clientes.map((cliente, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={cliente._id}>
                                        <td>{index + 1}</td>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.apellido}</td>
                                        <td>{cliente.ciudad}</td>
                                        <td>{cliente.direccion}</td>
                                        <td>{cliente.telefono}</td>
                                        <td>{cliente.email}</td>

    
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/visualizarCliente/${cliente._id}`)} />
                                            {
                                                auth.rol === "Administrador" &&
                                                (
                                                    <>
                                                        <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                            onClick={() => navigate(`/dashboard/actualizarClientes/${cliente._id}`)}
                                                        />

                                                        <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                                            onClick={() => { handleDelete(cliente._id) }}
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

export default TablaClientes    