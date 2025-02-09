import { Children, createContext, useState } from "react";
import axios from 'axios'

// Creacion del grupo de WhatsApp (AuthContext)
const tratamientosContext = createContext()

// Crear el mensaje(AuthProvider)
// Integrantes (children)
const TratamientosProvider = ({ children }) => {

    const [modal, setModal] = useState(false)

    const [tratamientos, setTratamientos] = useState([])

    const handleModal = () => {
        setModal(!modal)
    }

    const registrarTratamientos = async (datos) => {
        try {
            const token = localStorage.getItem('token')
            const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/registro`
            const options = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.post(url, datos, options)
            setTratamientos([respuesta.data.tratamiento, ...tratamientos])
        } catch (error) {
            console.log(error);
        }
    }

    const eliminarTratamientos = async (id) => {
        try {
            const confirmar = confirm("Vas a eliminar el tratamiento de un paciente, ¿Estás seguro de realizar esta acción?")
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/${id}`
                const options={
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.delete(url,options);
                const tratamientosActualizados = tratamientos.filter(t => t._id !== id)
                setTratamientos(tratamientosActualizados)
            }
        }
        catch (error) {
            setMensaje({ respuesta: response.data?.msg, tipo: false })
        }
    }

    const cambiarTratamientos = async (id) => {
        try {
            const confirmar = confirm("Vas a cambiar el estado del tratamiento de un paciente, ¿Estás seguro de realizar esta acción?")
            if (confirmar) {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/tratamiento/estado/${id}`
                const options={
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                await axios.post(url,{},options);
                const tratamientosActualizados = tratamientos.filter(t => t._id !== id)
                setTratamientos(tratamientosActualizados)
            }
        }
        catch (error) {
            setMensaje({ respuesta: response.data?.msg, tipo: false })
        }
    }




    return (
        <tratamientosContext.Provider value={
            {
                // Contenido del mensaje
                modal,
                setModal,
                handleModal,
                registrarTratamientos,
                tratamientos,
                setTratamientos,
                eliminarTratamientos,
                cambiarTratamientos
            }
        }>
            {children}
        </tratamientosContext.Provider>
    )
} 
export { TratamientosProvider }
export default tratamientosContext
