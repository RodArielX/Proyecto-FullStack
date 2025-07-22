import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import logoDJ from '../assets/dj.png'
import { Eye, EyeOff } from 'lucide-react'

export default function Restablecer() {
    const navigate = useNavigate()
    const { token } = useParams()
    const esAdmin = window.location.pathname.includes('/admin/')
    const [tokenback, setTokenback] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [form, setForm] = useState({
        password: "",
        confirmpassword: ""
    })

    const validarPoliticaPassword = (password) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_\-])[A-Za-z\d@$!%*?&.#^()_\-]{8,}$/;
        return regex.test(password);
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!form.password || !form.confirmpassword) {
            toast.error("Todos los campos son obligatorios")
            return
        }

        if (!validarPoliticaPassword(form.password)) {
            toast.error("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.")
            return
        }

        if (form.password !== form.confirmpassword) {
            toast.error("Las contraseñas no coinciden")
            return
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/${esAdmin ? 'admin' : 'cliente'}/nuevo-password/${token}`
            const respuesta = await axios.post(url, form)
            toast.success(respuesta.data.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/${esAdmin ? 'admin' : 'cliente'}/recuperar-password/${token}`
            const respuesta = await axios.get(url)
            setTokenback(true)
            toast.success(respuesta.data.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }

    useEffect(() => {
        verifyToken()
    }, [])

    return (
        <>
            <ToastContainer />
            <div className="h-screen w-full bg-[url('/images/proyecto3.jpg')] bg-no-repeat bg-cover bg-center flex justify-center items-center">
                <div className="bg-[#1a1a1a] bg-opacity-90 border border-yellow-500 p-8 rounded-2xl shadow-2xl w-full max-w-md text-white flex flex-col items-center">
                    <img
                        src={logoDJ}
                        alt="Logo DJ"
                        className="w-24 h-24 rounded-full border-4 border-yellow-400 mb-4 object-cover shadow-md"
                    />
                    <h1 className="text-3xl font-bold text-yellow-400 text-center uppercase mb-2 tracking-wide">
                        Restablecer Contraseña
                    </h1>
                    <p className="text-center text-gray-300 text-sm mb-6">
                        Ingresa tu nueva contraseña para continuar
                    </p>

                    {tokenback && (
                        <form className="w-full" onSubmit={handleSubmit}>
                            <div className="mb-4 relative">
                                <label className="block text-sm font-semibold text-yellow-400 mb-1">
                                    🔐 Nueva Contraseña
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Escribe tu contraseña"
                                    className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-[38px] text-gray-300 hover:text-yellow-400"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                                <p className="text-xs text-gray-400 mt-2">
                                    La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.
                                </p>
                            </div>

                            <div className="mb-6 relative">
                                <label className="block text-sm font-semibold text-yellow-400 mb-1">
                                    🔐 Confirmar Contraseña
                                </label>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmpassword"
                                    value={form.confirmpassword}
                                    onChange={handleChange}
                                    placeholder="Repite tu contraseña"
                                    className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-[38px] text-gray-300 hover:text-yellow-400"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-xl transition-transform hover:scale-105 duration-300"
                                >
                                    Confirmar
                                </button>

                                {esAdmin && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => navigate("/login")}
                                            className="w-full py-3 bg-transparent border border-yellow-400 text-yellow-400 rounded-xl hover:bg-yellow-500 hover:text-black transition-all duration-300"
                                        >
                                            Iniciar Sesión
                                        </button>
                                        <p className="text-xs text-gray-400 mt-2">
                                            Si eres administrador da clic en el botón "Iniciar Sesión".
                                        </p>
                                    </>
                                )}

                                {!esAdmin && (
                                    <p className="text-xs text-gray-400 mt-2">
                                        Si eres uno de nuestros clientes, ingresa a la aplicación móvil con tu nueva contraseña.
                                    </p>
                                )}
                            </div>

                        </form>
                    )}
                </div>
            </div>
        </>
    )
}