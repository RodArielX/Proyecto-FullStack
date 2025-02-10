import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

export const CardPerfilCliente = () => {
    const { auth } = useContext(AuthContext);

    return (
        <div className="w-full max-w-lg mx-auto p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg border border-gray-300 transition-all duration-300 hover:scale-105">
            <div className="flex flex-col items-center">
                {/* Imagen del cliente */}
                <img 
                    src="/images/man.png" 
                    alt="img-client" 
                    className="w-24 h-24 rounded-full border-4 border-white shadow-md"
                />
                
                {/* Nombre del cliente */}
                <h2 className="text-xl font-bold text-gray-700 mt-3">{auth.nombre} {auth.apellido}</h2>
                <p className="text-sm text-gray-500">{auth.email}</p>
            </div>

            {/* Información del cliente */}
            <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                    <span className="text-gray-600 font-semibold uppercase text-sm">Ciudad:</span>
                    <span className="text-gray-800">{auth.ciudad}</span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                    <span className="text-gray-600 font-semibold uppercase text-sm">Dirección:</span>
                    <span className="text-gray-800">{auth.direccion}</span>
                </div>

                <div className="flex justify-between items-center border-b border-gray-300 pb-2">
                    <span className="text-gray-600 font-semibold uppercase text-sm">Teléfono:</span>
                    <span className="text-gray-800">{auth.telefono}</span>
                </div>
            </div>
        </div>
    );
};
