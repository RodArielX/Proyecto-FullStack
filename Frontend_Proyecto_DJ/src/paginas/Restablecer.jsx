import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import logoDog from '../assets/dj.png'
import backgroundImage from '../assets/proyecto3.jpg' 
import { useNavigate } from 'react-router-dom'

export default function Restablecer() {

    const navigate = useNavigate()
    const { token } = useParams()
    const [tokenback, setTokenback] = useState(false)
    const [form, setForm] = useState({
        password: "",
        confirmpassword: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/nuevo-password/${token}`
            const respuesta = await axios.post(url, form)
            console.log(respuesta)
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperar-password/${token}`
            const respuesta = await axios.get(url)
            console.log(respuesta)
            setTokenback(true)
            toast.success(respuesta.data.msg)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        verifyToken()
    }, [])

    return (
        <div className="relative w-full h-screen flex items-center justify-center text-white">
            {/* Imagen de fondo con overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div> {/* Capa oscura */}
            </div>

            <div className="relative z-10 flex flex-col items-center p-6 bg-black bg-opacity-70 rounded-xl shadow-lg">
                <ToastContainer />
                <h1 className="text-4xl font-extrabold mb-4 text-center uppercase text-neon-purple drop-shadow-neon">Restablecer Contraseña</h1>
                <small className="text-gray-400 block my-4 text-lg">Ingresa tu nueva contraseña</small>
                <img 
                    className="object-cover h-48 w-48 rounded-full border-4 border-solid border-neon-pink shadow-neon transition duration-500 hover:scale-105" 
                    src={logoDog} 
                    alt="DJ logo"
                />

                {tokenback &&
                    <form className='w-full max-w-md mt-6' onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-neon-green text-lg font-semibold mb-2">Nueva Contraseña</label>
                            <input 
                                type="password" 
                                placeholder="Escribe tu contraseña" 
                                className="block w-full rounded-md border border-gray-600 focus:border-neon-pink focus:outline-none focus:ring-2 focus:ring-neon-pink py-2 px-3 text-gray-300 bg-gray-800 transition duration-300"
                                value={form.password || ""}
                                name='password'
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-neon-green text-lg font-semibold mb-2">Confirmar Contraseña</label>
                            <input 
                                type="password" 
                                placeholder="Repite tu contraseña" 
                                className="block w-full rounded-md border border-gray-600 focus:border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-blue py-2 px-3 text-gray-300 bg-gray-800 transition duration-300"
                                value={form.confirmpassword || ""}
                                name='confirmpassword'
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <button className="bg-neon-blue text-white py-3 rounded-xl font-bold hover:scale-105 transition transform duration-300 shadow-lg hover:shadow-neon-blue">Enviar</button>
                            <button 
                                className="bg-neon-purple text-white py-3 rounded-xl font-bold hover:scale-105 transition transform duration-300 shadow-lg hover:shadow-neon-purple"
                                onClick={()=>{navigate("/login")}}
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                }
            </div>
        </div>
    )
}
