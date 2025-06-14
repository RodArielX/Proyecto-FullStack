import { useContext } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { FiUser, FiUsers, FiMusic, FiCalendar, FiShoppingCart, FiTag, FiMapPin } from 'react-icons/fi'
import { motion } from 'framer-motion'
import AuthContext from '../context/AuthProvider'
import logo_padre from '../assets/logo_padre.jpg'

const Dashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname
    const { auth } = useContext(AuthContext)
    const auntenticado = localStorage.getItem('token')

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white">
            {/* Bloque superior expandido */}
            <div className="bg-[#1f1f1f] shadow-md p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-center">
                    <h1 className="text-3xl font-extrabold text-yellow-400">
                        PANEL ADMINISTRATIVO <span className="text-white"></span>
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        to="/login"
                        onClick={() => localStorage.removeItem('token')}
                        className="bg-red-700 hover:bg-red-900 text-white px-4 py-2 rounded-lg transition"
                    >
                        Salir
                    </Link>
                </div>
            </div>
            {/* Contenido principal */}
            <div className="flex flex-1">
                {/* Menú lateral debajo del bloque superior */}
                <aside className="w-64 bg-[#141414] p-5 border-r border-yellow-400 hidden md:block">
                    <div className="text-center">
                        <h1 className="text-3xl font-extrabold text-yellow-400">EDWIN ASQUI <span className="text-white">DJ</span></h1><br />
                        <img src={logo_padre} alt="logo" className="mx-auto mb-4 p-1 border-4 border-yellow-400 rounded-full" width={100} height={100} />
                        <p className='text-md text-gray-300 mt-1'>🎧 Bienvenido - {auth?.nombre}</p>
                        <p className="text-md text-gray-400 mt-1">🎚️ Rol - {auth?.rol}</p>
                    </div>

                    <ul className="mt-8 space-y-4">
                        <li>
                            <Link to='/dashboard' className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg ${urlActual === '/dashboard' ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-yellow-400'}`}>
                                <FiUser /> Perfil
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/listarClientes' className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg ${urlActual === '/dashboard/listarClientes' ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-yellow-400'}`}>
                                <FiUsers /> Clientes
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/listarProductos' className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg ${urlActual === '/dashboard/listarProductos' ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-yellow-400'}`}>
                                <FiMusic /> Catálogo
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/listarCompras' className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg ${urlActual === '/dashboard/listarCompras' ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-yellow-400'}`}>
                                <FiShoppingCart /> Compras
                            </Link>
                        </li>
                        <li>
                            <Link to='/dashboard/listarEventos' className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg ${urlActual === '/dashboard/listarEventos' ? 'bg-yellow-500 text-black' : 'text-gray-300 hover:text-yellow-400'}`}>
                                <FiMapPin /> Eventos
                            </Link>
                        </li>
                    </ul>
                </aside>

                {/* Área de contenido dinámico */}
                <main className="relative flex-1 overflow-y-auto">
                    <div
                        className="absolute inset-0 bg-cover bg-center z-0 brightness-[0.3] blur-[2px]"
                        style={{ backgroundImage: "url('/images/Logo_Register_DJ.jpeg')" }}
                    />

                    <div className="absolute inset-0 bg-black opacity-40 z-10" />

                    <div className="relative z-20 p-6">
                        {auntenticado ? <Outlet /> : <Navigate to="/login" />}
                    </div>
                </main>
            </div>

            {/* Footer con visualización animada */}
            <footer className="bg-[#141414] h-16 flex items-center justify-center relative">
                <motion.div
                    className="absolute bottom-0 left-0 right-0 flex justify-center gap-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {[...Array(15)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="w-1 rounded-full bg-yellow-400"
                            animate={{ height: ["10%", "70%", "30%", "100%", "10%"] }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                repeatType: 'loop',
                                delay: i * 0.1,
                            }}
                        />
                    ))}
                </motion.div>
                <p className="text-center text-sm text-yellow-300 z-10">
                    &copy; 2025 Edwin Asqui DJ - Todos los derechos reservados.
                </p>
            </footer>
        </div>
    )
}

export default Dashboard
