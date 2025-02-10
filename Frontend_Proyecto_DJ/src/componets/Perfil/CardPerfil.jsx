import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

export const CardPerfil = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg border border-gray-300">
            <div className="flex flex-col items-center">
                {/* Imagen del usuario */}
                <img 
                    src="/images/djuser.png" 
                    alt="dj-user" 
                    className="w-32 h-32 rounded-full border-4 border-white shadow-md"
                />

                {/* Nombre del usuario */}
                <h2 className="text-2xl font-bold text-gray-700 mt-3">{auth.nombre} {auth.apellido}</h2>
                <p className="text-lg text-gray-500">{auth.email}</p>
            </div>

            {/* Información del usuario */}
            <div className="mt-6 space-y-4 text-lg">
                <div className="flex justify-between items-center border-b border-gray-300 pb-3">
                    <span className="text-gray-600 font-semibold uppercase">Dirección:</span>
                    <span className="text-gray-800">{auth.direccion}</span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-300 pb-3">
                    <span className="text-gray-600 font-semibold uppercase">Teléfono:</span>
                    <span className="text-gray-800">{auth.telefono}</span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-300 pb-3">
                    <span className="text-gray-600 font-semibold uppercase">Descripción:</span>
                    <span className="text-gray-800">{auth.descripcion}</span>
                </div>
            </div>
        </div>
    );
};

