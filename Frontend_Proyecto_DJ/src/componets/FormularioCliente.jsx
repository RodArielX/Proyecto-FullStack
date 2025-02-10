import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export const FormularioCliente = ({cliente}) => {

    const navigate = useNavigate()
    // Paso 1
    const[form, setForm] = useState({
        nombre:cliente?.nombre || "",
        apellido:cliente?.apellido || "",
        ciudad:cliente?.ciudad || "",
        direccion:cliente?.ciudad || "",
        telefono:cliente?.telefono || "",
        email:cliente?.email || ""
    })

    // Paso 2
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]:e.target.value
      })
    }

    // Paso 3
    const handleSubmit = async (e) => {
        e.preventDefault()

        if(cliente?._id){
            // Actualizar
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/cliente/actualizar/${cliente._id}`
                const options = {
                    headers:{
                        method:'PUT',
                        'Content-Type':'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.put(url,form,options)
                navigate('/dashboard/listarClientes')
            } catch (error) {
                console.log(error)
            }
        }
        else{
            // Crear
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/producto/registro`
                const options = {
                    headers:{
                        'Content-Type':'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.post(url,form,options)
    
                navigate('/dashboard/listarProductos')
            } catch (error) {
                
            }

        }
        
      
    }
    
    return (
        
        <form onSubmit={handleSubmit}>
            <div>
                <label
                    htmlFor='nombre:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del cliente: </label>
                <input
                    id='nombre'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Nombre'
                    name='nombre'
                    value={form.nombre || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='apellido:'
                    className='text-gray-700 uppercase font-bold text-sm'>Apellido del cliente: </label>
                <input
                    id='apellido'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='apellido'
                    name='apellido'
                    value={form.apellido || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='ciudad:'
                    className='text-gray-700 uppercase font-bold text-sm'>Ciudad: </label>
                <input
                    id='ciudad'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Ciudad'
                    name='ciudad'
                    value={form.ciudad || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='direccion:'
                    className='text-gray-700 uppercase font-bold text-sm'>Dirección: </label>
                <input
                    id='direccion'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='direccion'
                    name='direccion'
                    value={form.direccion || ''}
                    onChange={handleChange}
                />
            </div>
            
            <div>
                <label
                    htmlFor='telefono:'
                    className='text-gray-700 uppercase font-bold text-sm'>Teléfono: </label>
                <input
                    id='telefono'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Telefono'
                    name='telefono'
                    value={form.telefono || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700 uppercase font-bold text-sm'>Email: </label>
                <input
                    id='email'
                    type="email"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='nombre@ejemplo.com'
                    name='email'
                    value={form.email || ''}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                value={cliente?._id ? 'Actualizar':'Registrar'} />

        </form>
    )
}