
import { useContext, useState } from "react"
import Mensaje from "../Alertas/Mensaje"
import AuthContext from "../../context/AuthProvider"

const Password = () => {

    const { actualizarPassword } = useContext(AuthContext)

    const [mensaje, setMensaje] = useState({})

    const [form, setForm] = useState({
        passwordactual: "",
        passwordnuevo: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (Object.values(form).includes("")) {
            setMensaje({ respuesta: "Todos los campos deben ser ingresados", tipo: false })
            setTimeout(() => {
                setMensaje({})
            }, 3000);
            return
        }

        if (form.passwordnuevo.length < 6) {
            setMensaje({ respuesta: "El password debe tener mínimo 6 carácteres", tipo: false })
            setTimeout(() => {
                setMensaje({})
            }, 3000);
            return
        }

        const resultado = await actualizarPassword(form)
        setMensaje(resultado)
        setTimeout(() => {
            setMensaje({})
        }, 3000);
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

                <div className="mb-5">
                    <label
                        htmlFor="passwordactual"
                        className="text-yellow-300 uppercase font-semibold text-sm"
                    >
                        Contraseña actual:
                    </label>
                    <input
                        id="passwordactual"
                        type="password"
                        className="bg-black border border-yellow-500/30 text-yellow-200 w-full p-3 mt-2 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
                        placeholder="**************"
                        name="passwordactual"
                        value={form.passwordactual}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="passwordnuevo"
                        className="text-yellow-300 uppercase font-semibold text-sm"
                    >
                        Nueva Contraseña:
                    </label>
                    <input
                        id="passwordnuevo"
                        type="password"
                        className="bg-black border border-yellow-500/30 text-yellow-200 w-full p-3 mt-2 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500/40"
                        placeholder="**************"
                        name="passwordnuevo"
                        value={form.passwordnuevo}
                        onChange={handleChange}
                    />
                </div>

                <input
                    type="submit"
                    className="bg-yellow-400 text-black w-full py-3 mt-4 font-bold uppercase rounded-xl shadow-lg hover:bg-yellow-300 transition-all hover:scale-105 cursor-pointer"
                    value="Actualizar"
                />
            </form>
        </>
    );

}

export default Password