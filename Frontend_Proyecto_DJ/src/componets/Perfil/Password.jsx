import { useContext, useState } from "react"
import { FiEye, FiEyeOff } from "react-icons/fi"
import Mensaje from "../Alertas/Mensaje"
import AuthContext from "../../context/AuthProvider"
import { Eye, EyeOff } from "lucide-react"

const Password = () => {
    const { actualizarPassword } = useContext(AuthContext)

    const [mensaje, setMensaje] = useState({})

    const [form, setForm] = useState({
        passwordactual: "",
        passwordnuevo: ""
    })

    const validarPoliticaPassword = (password) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_\-])[A-Za-z\d@$!%*?&.#^()_\-]{8,}$/;
        return regex.test(password);
    };


    const [showPasswordActual, setShowPasswordActual] = useState(false)
    const [showPasswordNuevo, setShowPasswordNuevo] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.values(form).includes("")) {
            setMensaje({ respuesta: "Todos los campos deben ser ingresados", tipo: false })
            setTimeout(() => setMensaje({}), 3000)
            return
        }

        if (!validarPoliticaPassword(form.passwordnuevo)) {
            setMensaje({
                respuesta:
                    "La contraseña debe tener mínimo 8 caracteres, incluir una mayúscula, una minúscula, un número y un carácter especial.",
                tipo: false
            })
            setTimeout(() => setMensaje({}), 4000)
            return
        }

        const resultado = await actualizarPassword(form)
        setMensaje(resultado)
        setTimeout(() => setMensaje({}), 3000)
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div className="mt-5 mb-6">
                <h1 className="text-4xl font-black text-yellow-400 drop-shadow-glow">Contraseña</h1>
                <hr className="my-4 border-yellow-300" />
                <p className="text-gray-300">Este módulo te permite actualizar la contraseña del Administrador</p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-zinc-900 to-gray-800 p-6 rounded-2xl shadow-xl border border-yellow-400/20"
            >
                {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                {/* Contraseña actual */}
                <div className="mb-5 relative">
                    <label htmlFor="passwordactual" className="text-yellow-300 uppercase font-semibold text-sm">
                        Contraseña actual:
                    </label>
                    <input
                        id="passwordactual"
                        type={showPasswordActual ? "text" : "password"}
                        className="bg-black border border-yellow-500/30 text-yellow-200 w-full p-3 mt-2 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/40 pr-10"
                        placeholder="**************"
                        name="passwordactual"
                        value={form.passwordactual}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPasswordActual(!showPasswordActual)}
                        className="absolute top-[56%] right-3 transform -translate-y-1/2 text-yellow-300 hover:text-yellow-100"
                    >
                        {showPasswordActual ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {/* Nueva contraseña */}
                <div className="mb-5 relative">
                    <label htmlFor="passwordnuevo" className="text-yellow-300 uppercase font-semibold text-sm">
                        Nueva Contraseña:
                    </label>
                    <input
                        id="passwordnuevo"
                        type={showPasswordNuevo ? "text" : "password"}
                        className="bg-black border border-yellow-500/30 text-yellow-200 w-full p-3 mt-2 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/40 pr-10"
                        placeholder="**************"
                        name="passwordnuevo"
                        value={form.passwordnuevo}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPasswordNuevo(!showPasswordNuevo)}
                        className="absolute top-[56%] right-3 transform -translate-y-1/2 text-yellow-300 hover:text-yellow-100"
                    >
                        {showPasswordNuevo ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <p className="text-sm text-gray-400 mt-2">
                        🔒 Usa al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo.
                    </p>
                </div>

                <input
                    type="submit"
                    className="bg-yellow-400 text-black w-full py-3 mt-4 font-bold uppercase rounded-xl shadow-lg hover:bg-yellow-300 transition-all hover:scale-105 cursor-pointer"
                    value="Actualizar"
                />
            </form>
        </>
    )
}

export default Password
