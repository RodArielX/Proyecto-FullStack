import { useContext } from "react"
import AuthContext from "../../context/AuthProvider"

export const CardPerfilCliente = () => {
    const { auth } = useContext(AuthContext)
    return (
        <div className="bg-white border border-slate-200 h-auto p-4 
                        flex flex-col items-center justify-between shadow-xl rounded-lg">

            <div>
                <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="m-auto " width={120} height={120} />
            </div>
            <div className="self-start">
                <b>Nombre del cliente:</b><p className="inline-block ml-3">{auth.nombre}</p>
            </div>
            <div className="self-start">
                <b>Apellido del cliente:</b><p className="inline-block ml-3">{auth.apellido}</p>
            </div >
            <div className="self-start">
                <b>Ciudad:</b><p className="inline-block ml-3">{auth.ciudad}</p>
            </div>
            <div className="self-start">
                <b>Dirección:</b><p className="inline-block ml-3">{auth.direccion}</p>
            </div>
            <div className="self-start">
                <b>Teléfono:</b><p className="inline-block ml-3">{auth.telefono}</p>
            </div>
            <div className="self-start">
                <b>Email:</b><p className="inline-block ml-3">{auth.email}</p>
            </div>
        </div>
    )
} 