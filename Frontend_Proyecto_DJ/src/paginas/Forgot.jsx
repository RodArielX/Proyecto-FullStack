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
          <ToastContainer/>
          <div className="h-screen w-full bg-[url('/images/RecuperarContraseña_DJ.jpg')] bg-no-repeat bg-cover bg-center flex flex-col">
              <header className="w-full flex justify-between items-center p-4 absolute top-0 left-0">
                  <Link to="/" className="text-white text-xl font-bold">
                      <img src="/images/dj.png" alt="Logo" className="h-10"/>
                  </Link>
                  <Link to="/login" className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">
                      Iniciar Sesión
                  </Link>
              </header>
              <div className="flex flex-grow justify-center items-center">
                  <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md">
                      <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">¿Olvidaste tu contraseña?</h1>
                      <small className="text-gray-400 block my-4 text-sm">No te preocupes! Te enviaremos un email para que puedas reestablecer tu contraseña</small>
                      
                      <form onSubmit={handleSubmit}>
                          <div className="mb-1">
                              <label className="mb-2 block text-sm font-semibold">Email</label>
                              <input name="email" onChange={handleChange} type="email" placeholder="nombre@ejemplo.com" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                          </div>
                          
                          <div className="mb-3">
                              <button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">Enviar email</button>
                          </div>
                      </form>
                      
                      <div className="mt-5 text-xs border-b-2 py-4 "></div>
                      
                      <div className="mt-3 text-sm flex justify-between items-center">
                          <p>¿No tienes una cuenta?</p>
                          <Link to="/register" className="py-2 px-5 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Registrate aquí</Link>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )  
}
