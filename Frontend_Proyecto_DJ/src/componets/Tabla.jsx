import { useContext, useEffect, useState } from "react";
import { MdDeleteForever, MdNoteAdd, MdInfo } from "react-icons/md";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthProvider";


const Tabla = () => {

    const { auth } = useContext(AuthContext)
    const navigate = useNavigate()


    // Paso 1
    const [pacientes, setPacientes] = useState([])

    // Paso 2
    const listarPacientes = async () => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.get(url, options)
            console.log(respuesta.data)
            setPacientes(respuesta.data, ...pacientes)
            console.log(pacientes)

        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {

            const confirmar = confirm("Vas a registrar la salida, ¿Estás seguro?")

            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/paciente/eliminar/${id}`
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
                const data = {
                    salida: new Date().toString()
                }
                const respuesta = await axios.delete(url, { headers, data })
                listarPacientes()

            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        listarPacientes()
    }, [])

    return (
        <>
            {
                pacientes.length == 0
                    ?
                    <p>No existen registros</p>
                    :
                    <table className='w-full mt-5 table-auto shadow-lg  bg-white'>
                        <thead className='bg-gray-800 text-slate-400'>
                            <tr>
                                <th className='p-2'>N°</th>
                                <th className='p-2'>Nombre</th>
                                <th className='p-2'>Propietario</th>
                                <th className='p-2'>Email</th>
                                <th className='p-2'>Celular</th>
                                <th className='p-2'>Estado</th>
                                <th className='p-2'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                pacientes.map((paciente, index) => (
                                    <tr className="border-b hover:bg-gray-300 text-center" key={paciente._id}>
                                        <td>{index + 1}</td>
                                        <td>{paciente.nombre}</td>
                                        <td>{paciente.propietario}</td>
                                        <td>{paciente.email}</td>
                                        <td>{paciente.celular}</td>
                                        <td>
                                            <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{paciente.estado && "activo"}</span>
                                        </td>
                                        <td className='py-2 text-center'>
                                            <MdNoteAdd className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2" onClick={() => navigate(`/dashboard/visualizar/${paciente._id}`)} />
                                            {
                                                auth.rol === "veterinario" &&
                                                (
                                                    <>
                                                        <MdInfo className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2"
                                                            onClick={() => navigate(`/dashboard/actualizar/${paciente._id}`)}
                                                        />

                                                        <MdDeleteForever className="h-7 w-7 text-red-900 cursor-pointer inline-block"
                                                            onClick={() => { handleDelete(paciente._id) }}
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