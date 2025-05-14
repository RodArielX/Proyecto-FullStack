import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

export const CardPerfil = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-[#1a1a1a] rounded-2xl shadow-lg border border-yellow-500 text-white">
      <div className="flex flex-col items-center">
        {/* Imagen del usuario */}
        <img
          src="/images/djuser.png"
          alt="dj-user"
          className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-lg"
        />

        {/* Nombre del usuario */}
        <h2 className="text-3xl font-bold text-yellow-400 mt-4 tracking-wide">
          {auth.nombre} {auth.apellido}
        </h2>
        <p className="text-sm text-gray-400 italic">{auth.email}</p>
      </div>

      {/* Información del usuario */}
      <div className="mt-8 space-y-4 text-base">
        <div className="flex justify-between items-center border-b border-yellow-700 pb-3">
          <span className="text-yellow-300 font-semibold uppercase">Dirección:</span>
          <span className="text-white text-right">{auth.direccion}</span>
        </div>

        <div className="flex justify-between items-center border-b border-yellow-700 pb-3">
          <span className="text-yellow-300 font-semibold uppercase">Teléfono:</span>
          <span className="text-white text-right">{auth.telefono}</span>
        </div>

        <div className="flex justify-between items-center border-b border-yellow-700 pb-3">
          <span className="text-yellow-300 font-semibold uppercase">Descripción:</span>
          <span className="text-white text-right">{auth.descripcion}</span>
        </div>
      </div>
    </div>
  );
};
