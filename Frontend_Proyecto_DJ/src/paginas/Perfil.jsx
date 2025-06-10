import React, { useContext, useState } from 'react'
import { CardPerfil } from '../componets/Perfil/CardPerfil'
import FormularioPerfil from '../componets/Perfil/FormularioPerfil'
import AuthContext from '../context/AuthProvider'
import ModalPassword from '../componets/Modals/ModalPassword'

const Perfil = () => {
    const { auth } = useContext(AuthContext)
    const [mostrarModalPassword, setMostrarModalPassword] = useState(false)

    return (
        <>
            <div className="mt-5 mb-6">
                <h1 className="text-4xl font-black text-yellow-400 drop-shadow-glow">Perfil</h1>
                <hr className="my-4 border-yellow-300" />
                <p className='text-gray-300'>Este módulo te permite visualizar el perfil del usuario {auth?.nombre}</p>
            </div>

            {
                "descripcion" in auth && (
                    <div className='flex justify-around gap-x-8 flex-wrap gap-y-8 md:flex-nowrap'>
                        <div className='w-full md:w-1/2'>
                            <FormularioPerfil />
                        </div>
                        <div className='w-full md:w-1/2'>
                            <CardPerfil />

                            {/* Botón para abrir modal */}
                            <button
                                onClick={() => setMostrarModalPassword(true)}
                                className="mt-6 w-full bg-yellow-500 hover:bg-yellow-400 text-black py-2 px-4 rounded-md font-semibold transition"
                            >
                                Cambiar contraseña
                            </button>

                            {/* Modal */}
                            {mostrarModalPassword && (
                                <ModalPassword onClose={() => setMostrarModalPassword(false)} />
                            )}
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Perfil