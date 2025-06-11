import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { ToastContainer, toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios'

const Login = () => {

    const navigate = useNavigate()

    const { setAuth } = useContext(AuthContext)

    const [mostrarPassword, setMostrarPassword] = useState(false);


    // Paso 1
    const [form, setForm] = useState({
        email: "",
        password: ""
    })


    // Paso 2
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }


    // Paso 3
    const handleSubmit = async (e) => {
    e.preventDefault()
    const url = `${import.meta.env.VITE_BACKEND_URL}/admin/login`

    try {
        const respuesta = await axios.post(url, form)
        localStorage.setItem('token', respuesta.data.token)
        localStorage.setItem('rol', "Administrador")

        setAuth(respuesta.data)
        console.log(respuesta)
        toast.success("Login exitoso")
        setTimeout(() => {
            navigate('/dashboard')
        }, 2000)

    } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.msg || "Error al iniciar sesión")
    }
}

    return (
        <>
            <ToastContainer />
            <div className="h-screen w-full bg-[url('/images/Logo_Login_DJ.jpeg')] bg-no-repeat bg-cover bg-center flex justify-center items-center">
                <div className="bg-[#1a1a1a] bg-opacity-90 border border-yellow-500 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">
                    <h1 className="text-4xl font-bold text-yellow-400 text-center uppercase mb-4 tracking-wide">Iniciar Sesión</h1>
                    <p className="text-center text-gray-300 text-sm mb-2">Bienvenido</p>
                    <p className="text-center text-gray-300 text-sm mb-6">Ingresa tus credenciales para acceder</p>


                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold text-yellow-400 mb-1">📧 Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="ejemplo@correo.com"
                                className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>

                        <div className="mb-4 relative">
                            <label className="block text-sm font-semibold text-yellow-400 mb-1">🔒 Contraseña</label>
                            <input
                                type={mostrarPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="********************"
                                className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarPassword(!mostrarPassword)}
                                className="absolute top-9 right-3 text-gray-400 hover:text-yellow-400"
                            >
                                {mostrarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>


                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl transition-transform hover:scale-105 duration-300"
                            >
                                🎵 Iniciar Sesión
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                        <hr className="border-gray-600" />
                        <p className="text-center text-sm">O</p>
                        <hr className="border-gray-600" />
                    </div>

                    <div className="mt-4 text-sm text-center">
                        <Link
                            to="/forgot/id"
                            className="text-yellow-400 hover:underline hover:text-yellow-300 transition-colors"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    {/*<div className="mt-6 text-sm flex justify-between items-center">
                        <p className="text-gray-300">¿No tienes una cuenta?</p>
                        <Link
                            to="/register"
                            className="py-2 px-4 bg-transparent border border-yellow-400 text-yellow-400 rounded-xl hover:bg-yellow-500 hover:text-black transition-all duration-300"
                        >
                            Registrarse
                        </Link>
                    </div>*/}
                </div>
            </div>
        </>
    )
}

export default Login