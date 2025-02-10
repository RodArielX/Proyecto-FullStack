import { useState } from "react"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

export const FormularioProductos = ({producto}) => {

    const navigate = useNavigate()
    // Paso 1
    const[form, setForm] = useState({
        nombreDisco:producto?.nombreDisco || "",
        artista:producto?.artista || "",
        precio:producto?.precio || "",
        genero:producto?.genero || "",
        stock:producto?.stock || ""
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

        if(producto?._id){
            // Actualizar
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/producto/actualizar/${producto._id}`
                const options = {
                    headers:{
                        method:'PUT',
                        'Content-Type':'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.put(url,form,options)
                navigate('/dashboard/listarProductos')
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
                    htmlFor='nombreDisco:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del disco: </label>
                <input
                    id='nombreDisco'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Nombre disco'
                    name='nombreDisco'
                    value={form.nombreDisco || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='artista:'
                    className='text-gray-700 uppercase font-bold text-sm'>Nombre del artista: </label>
                <input
                    id='artista'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Nombre del artista'
                    name='artista'
                    value={form.artista || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label
                    htmlFor='precio:'
                    className='text-gray-700 uppercase font-bold text-sm'>Precio: </label>
                <input
                    id='precio'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Precio del disco'
                    name='precio'
                    value={form.precio || ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                    <label
                        htmlFor='genero:'
                        className='text-gray-700 uppercase font-bold text-sm'>Género: </label>

                    <select
                        id='genero'
                        name="genero"
                        onChange={handleChange}
                        value={form.genero || ''}
                        className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'>
                        <option value="">--- Seleccionar ---</option>
                        <option value="Clásica">Clásica</option>
                        <option value="Electrónica">Electrónica</option>
                        <option value="Hip-Hop">Hip-Hop</option>
                        <option value="Jazz">Jazz</option>
                        <option value="Pop">Pop</option>
                        <option value="Rock">Rock</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
            <div>
                <label
                    htmlFor='stock:'
                    className='text-gray-700 uppercase font-bold text-sm'>Stock: </label>
                <input
                    id='stock'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Cantidad de discos'
                    name='stock'
                    value={form.stock || ''}
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                value={producto?._id ? 'Actualizar':'Registrar'} />

        </form>
    )
}