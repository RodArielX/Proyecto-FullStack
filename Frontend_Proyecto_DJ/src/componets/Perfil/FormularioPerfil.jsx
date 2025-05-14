import { useContext, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import Mensaje from "../Alertas/Mensaje"

const FormularioPerfil = () => {
  const { auth, actualizarPerfil } = useContext(AuthContext)
  const [mensaje, setMensaje] = useState({})

  const [form, setform] = useState({
    id: auth._id,
    nombre: auth.nombre || "",
    apellido: auth.apellido || "",
    direccion: auth.direccion || "",
    telefono: auth.telefono || "",
    email: auth.email || "",
    descripcion: auth.descripcion || ""
  })

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.values(form).includes("")) {
      setMensaje({ respuesta: "Todos los campos deben ser ingresados", tipo: false })
      setTimeout(() => setMensaje({}), 3000)
      return
    }
    const resultado = await actualizarPerfil(form)
    setMensaje(resultado)
    setTimeout(() => setMensaje({}), 3000)
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-[#1a1a1a] border border-yellow-500 p-6 rounded-2xl shadow-lg text-white max-w-3xl mx-auto"
    >
      {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

      <h2 className="text-3xl text-center text-yellow-400 font-bold mb-6 tracking-wide">🎧 Editar Perfil</h2>

      {/* Campo */}
      <div className="mb-5">
        <label htmlFor='nombre' className='block text-sm font-semibold text-yellow-400'>Nombre:</label>
        <input
          id='nombre'
          type="text"
          name='nombre'
          value={form.nombre}
          onChange={handleChange}
          placeholder='Nombre'
          className='mt-1 w-full p-2 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-500 border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400'
        />
      </div>

      <div className="mb-5">
        <label htmlFor='apellido' className='block text-sm font-semibold text-yellow-400'>Apellido:</label>
        <input
          id='apellido'
          type="text"
          name='apellido'
          value={form.apellido}
          onChange={handleChange}
          placeholder='Apellido'
          className='mt-1 w-full p-2 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-500 border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400'
        />
      </div>

      <div className="mb-5">
        <label htmlFor='direccion' className='block text-sm font-semibold text-yellow-400'>Dirección:</label>
        <input
          id='direccion'
          type="text"
          name='direccion'
          value={form.direccion}
          onChange={handleChange}
          placeholder='Dirección'
          className='mt-1 w-full p-2 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-500 border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400'
        />
      </div>

      <div className="mb-5">
        <label htmlFor='telefono' className='block text-sm font-semibold text-yellow-400'>Teléfono:</label>
        <input
          id='telefono'
          type="text"
          name='telefono'
          value={form.telefono}
          onChange={handleChange}
          placeholder='Teléfono'
          className='mt-1 w-full p-2 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-500 border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400'
        />
      </div>

      <div className="mb-5">
        <label htmlFor='email' className='block text-sm font-semibold text-yellow-400'>Email:</label>
        <input
          id='email'
          type="text"
          name='email'
          value={form.email}
          onChange={handleChange}
          placeholder='nombre@ejemplo.com'
          className='mt-1 w-full p-2 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-500 border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400'
        />
      </div>

      <div className="mb-6">
        <label htmlFor='descripcion' className='block text-sm font-semibold text-yellow-400'>Descripción:</label>
        <input
          id='descripcion'
          type="text"
          name='descripcion'
          value={form.descripcion}
          onChange={handleChange}
          placeholder='Descripción breve'
          className='mt-1 w-full p-2 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-500 border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400'
        />
      </div>

      <input
        type="submit"
        value='Actualizar'
        className='w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition duration-300 shadow-md'
      />
    </form>
  )
}

export default FormularioPerfil
