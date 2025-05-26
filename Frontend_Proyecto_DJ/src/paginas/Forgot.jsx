import {Link} from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import Mensaje from '../componets/Alertas/Mensaje';
import { toast, ToastContainer } from 'react-toastify';


export const Forgot = () => {

    // Paso 1
    const [email, setMail] = useState({})

    // Paso 2
    const handleChange = (e) => {
      setMail({
        ...email,
        [e.target.name]:e.target.value
      })
    }
    

    // Paso 3
    const handleSubmit = async(e) => {
      e.preventDefault()
      try {
        const url =`${import.meta.env.VITE_BACKEND_URL}/recuperar-password`
        const respuesta = await axios.post(url, email)
        console.log(respuesta)
        toast.success(respuesta.data.msg)
        setMail("")
        
      } catch (error) {
        console.log(error)
        toast.error(respuesta.data.msg)

      }
    }
    

    // Paso 4
    return (
    <>
      <ToastContainer />
      <div className="h-screen w-full bg-[url('/images/RecuperarContraseña_DJ.jpg')] bg-no-repeat bg-cover bg-center flex flex-col">
        
        <header className="w-full flex justify-between items-center p-4 absolute top-0 left-0">
          <Link to="/" className="text-white text-xl font-bold">
            <img src="/images/dj.png" alt="Logo" className="h-10" />
          </Link>
          <Link
            to="/login"
            className="py-2 px-5 bg-yellow-500 text-black font-bold rounded-xl hover:scale-105 transition-all hover:bg-yellow-600"
          >
            Iniciar Sesión
          </Link>
        </header>

        <div className="flex flex-grow justify-center items-center">
          <div className="bg-[#1a1a1a] bg-opacity-95 p-8 rounded-2xl shadow-xl w-full max-w-md border border-yellow-500">
            <h1 className="text-3xl text-yellow-400 font-extrabold text-center mb-2 uppercase tracking-wider">
              🔐 ¿Olvidaste tu Contraseña?
            </h1>
            <p className="text-gray-300 text-sm mb-6 text-center">
              No te preocupes, te enviaremos un correo para que puedas restablecerla.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-yellow-400 mb-1">📧 Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="nombre@ejemplo.com"
                  className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-[#2a2a2a] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300"
              >
                ✉️ Enviar Email
              </button>
            </form>

            <div className="mt-8 border-t border-gray-600 pt-4 text-sm flex justify-between text-gray-300">
              <p>¿No tienes una cuenta?</p>
              <Link
                to="/register"
                className="text-yellow-400 font-semibold hover:underline hover:text-yellow-500"
              >
                Regístrate aquí
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
