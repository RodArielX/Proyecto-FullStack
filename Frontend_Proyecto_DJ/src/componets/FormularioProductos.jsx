import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ImagePlus } from "lucide-react";

export const FormularioProductos = ({ producto }) => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombreDisco: producto?.nombreDisco || "",
        artista: producto?.artista || "",
        precio: producto?.precio || "",
        genero: producto?.genero || "",
        generoOtro: producto?.generoOtro || "",  // nuevo campo para "Otro"
        stock: producto?.stock || "",
        imagen: null
    });

    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (producto?.imagen) {
            setPreview(producto.imagen);
        }
    }, [producto]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            const file = files[0];
            setForm({ ...form, imagen: file });
            setPreview(URL.createObjectURL(file));
        } else {
            setForm({ ...form, [name]: value });
        }
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar campos obligatorios
        if (
            !form.nombreDisco.trim() ||
            !form.artista.trim() ||
            !form.precio ||
            !form.genero.trim() ||
            !form.stock ||
            (form.genero === "Otro" && !form.generoOtro.trim())
        ) {
            setError("Debes llenar todos los campos en este formulario.");
            return;
        }

        const formData = new FormData();
        formData.append("nombreDisco", form.nombreDisco);
        formData.append("artista", form.artista);
        formData.append("precio", form.precio);
        formData.append("genero", form.genero);

        // Enviar generoPersonalizado solo si seleccionó "Otro"
        if (form.genero === "Otro") {
            formData.append("generoPersonalizado", form.generoOtro.trim());
        }

        formData.append("stock", form.stock);
        if (form.imagen) {
            formData.append("imagen", form.imagen);
        }

        try {
            const token = localStorage.getItem('token');
            const options = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            };

            if (producto?._id) {
                const url = `${import.meta.env.VITE_BACKEND_URL}/producto/actualizar/${producto._id}`;
                await axios.put(url, formData, options);
            } else {
                const url = `${import.meta.env.VITE_BACKEND_URL}/producto/registro`;
                await axios.post(url, formData, options);
            }

            navigate('/dashboard/listarProductos');
        } catch (error) {
            console.error("Error al guardar producto:", error);
        }
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="bg-[#1a1a1a] border border-yellow-500 p-6 rounded-2xl shadow-lg text-white max-w-3xl mx-auto"
        >
            <h2 className="text-3xl text-center text-yellow-400 font-bold mb-6 tracking-wide">
                {producto?._id ? '💿 Editar Disco' : '🎶 Registrar Disco'}
            </h2>

            {error && (
                <p className="mb-4 text-center text-red-500 font-semibold">
                    {error}
                </p>
            )}

            <div className="mb-5">
                <label htmlFor='nombreDisco' className='block text-sm font-semibold text-yellow-400'>Nombre del disco:</label>
                <input
                    id='nombreDisco'
                    type="text"
                    name='nombreDisco'
                    value={form.nombreDisco}
                    onChange={handleChange}
                    placeholder='Nombre del disco'
                    className='mt-1 w-full p-2 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-500 border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                />
            </div>

            <div className="mb-5">
                <label htmlFor='artista' className='block text-sm font-semibold text-yellow-400'>Nombre del artista:</label>
                <input
                    id='artista'
                    type="text"
                    name='artista'
                    value={form.artista}
                    onChange={handleChange}
                    placeholder='Artista o banda'
                    className='mt-1 w-full p-2 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-500 border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                />
            </div>

            <div className="mb-5">
                <label htmlFor='precio' className='block text-sm font-semibold text-yellow-400'>Precio:</label>
                <input
                    id='precio'
                    type="number"
                    name='precio'
                    value={form.precio}
                    onChange={handleChange}
                    placeholder='Precio del disco'
                    className='mt-1 w-full p-2 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-500 border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                />
            </div>

            <div className="mb-5">
                <label htmlFor='genero' className='block text-sm font-semibold text-yellow-400'>Género:</label>
                <select
                    id='genero'
                    name="genero"
                    value={form.genero}
                    onChange={handleChange}
                    className='mt-1 w-full p-2 rounded-lg bg-[#2c2c2c] text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                >
                    <option value="">--- Seleccionar ---</option>
                    <option value="Clásica">Clásica</option>
                    <option value="Electrónica">Electrónica</option>
                    <option value="Hip-Hop">Hip-Hop</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="Otro">Otro</option>
                </select>

                {/* Campo extra solo si se elige "Otro" */}
                {form.genero === "Otro" && (
                    <input
                        type="text"
                        name="generoOtro"
                        value={form.generoPersonalizado}
                        onChange={handleChange}
                        placeholder="Escribe el género aquí"
                        className="mt-3 w-full p-2 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-500 border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                )}
            </div>

            <div className="mb-5">
                <label htmlFor='stock' className='block text-sm font-semibold text-yellow-400'>Stock:</label>
                <input
                    id='stock'
                    type="number"
                    name='stock'
                    value={form.stock}
                    onChange={handleChange}
                    placeholder='Cantidad disponible'
                    className='mt-1 w-full p-2 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-500 border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                />
            </div>

            <div className="mb-5">
                <label className="block text-sm font-semibold text-yellow-400 mb-1">
                    Imagen del disco:
                </label>
                <label className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-white transition w-fit">
                    <ImagePlus size={18} />
                    Seleccionar imagen
                    <input
                        type="file"
                        name="imagenEvento"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                    />
                </label>
                {preview && (
                    <img
                        src={preview}
                        alt="Vista previa"
                        className="w-40 h-40 object-cover mt-3 rounded-lg border-2 border-yellow-500"
                    />
                )}
            </div>

            <input
                type="submit"
                value={producto?._id ? 'Actualizar' : 'Registrar'}
                className='w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition duration-300 shadow-md mt-4'
            />
        </form>
    );
};