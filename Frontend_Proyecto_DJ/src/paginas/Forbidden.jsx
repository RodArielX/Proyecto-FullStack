import logoDenegado from '../assets/Logo_Register_DJ.jpeg';

export const Forbidden = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
            {/* Imagen con efecto neon */}
            <img 
                className="object-cover h-80 w-80 rounded-full border-4 border-yellow-500 shadow-lg shadow-yellow-500"
                src={logoDenegado} 
                alt="image description"
            />

            <div className="flex flex-col items-center justify-center text-center mt-6">
                {/* Mensaje principal con efecto de luces */}
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest animate-pulse text-neon-purple">
                    ACCESO DENEGAGO
                </p>
                
                {/* Mensaje secundario con estilo futurista */}
                <p className="md:text-lg lg:text-xl text-gray-400 mt-4 font-mono">
                    Lo siento ña no hay chance de mostrarte la pagina xd.
                </p>
            </div>
        </div>
    );
};