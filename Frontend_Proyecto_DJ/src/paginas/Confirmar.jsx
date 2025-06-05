import { useEffect, useState } from 'react'
import  Logo_Register_DJ  from "/images/Logo_Register_DJ.jpeg";
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Mensaje from '../componets/Alertas/Mensaje'


export const Confirmar = () => {


    // Paso 1
    const { token } = useParams()
    const [mensaje, setMensaje] = useState("")


    // Paso 2
    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/confirmar/${token}`;

            const respuesta = await axios.get(url)
            setMensaje({ respuesta: respuesta.data.msg, tipo: true })

        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false })
        }

    }


    useEffect(() => {
        verifyToken()
    }, [])

    return (
        <div className="min-h-screen bg-[#0e0e0e] flex flex-col items-center justify-center text-white px-4 text-center">

            {Object.keys(mensaje).length > 0 && (
                <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}

            <img
                src={Logo_Register_DJ}
                alt="logo"
                className="object-cover h-60 w-60 md:h-72 md:w-72 rounded-full border-4 border-yellow-500 shadow-lg"
            />

            <div className="flex flex-col items-center justify-center mt-10">
                <p className="text-3xl md:text-4xl font-extrabold text-yellow-400 drop-shadow-md">
                    ¡Muchas gracias!
                </p>
                <p className="mt-4 text-gray-300 text-lg">
                    Tu proceso fue exitoso. Ya puedes iniciar sesión.
                </p>

                <Link
                    to="/login"
                    className="mt-6 py-2 px-6 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-600 transition-transform transform hover:scale-105"
                >
                    Iniciar Sesión
                </Link>
            </div>
        </div>
    );

}
