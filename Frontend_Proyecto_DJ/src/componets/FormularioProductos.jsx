import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const FormularioProductos = ({ producto }) => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombreDisco: producto?.nombreDisco || "",
        artista: producto?.artista || "",
        precio: producto?.precio || "",
        genero: producto?.genero || "",
        stock: producto?.stock || "",
        imagen: null
    });

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (producto?.imagenUrl) {
            setPreview(producto.imagenUrl);
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nombreDisco", form.nombreDisco);
        formData.append("artista", form.artista);
        formData.append("precio", form.precio);
        formData.append("genero", form.genero);
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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='nombreDisco' className='text-gray-700 uppercase font-bold text-sm'>
                    Nombre del disco:
                </label>
                <input
                    id='nombreDisco'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Nombre disco'
                    name='nombreDisco'
                    value={form.nombreDisco}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor='artista' className='text-gray-700 uppercase font-bold text-sm'>
                    Nombre del artista:
                </label>
                <input
                    id='artista'
                    type="text"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Nombre del artista'
                    name='artista'
                    value={form.artista}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor='precio' className='text-gray-700 uppercase font-bold text-sm'>
                    Precio:
                </label>
                <input
                    id='precio'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Precio del disco'
                    name='precio'
                    value={form.precio}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor='genero' className='text-gray-700 uppercase font-bold text-sm'>
                    Género:
                </label>
                <select
                    id='genero'
                    name="genero"
                    onChange={handleChange}
                    value={form.genero}
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'>
                    <option value="">--- Seleccionar ---</option>
                    <option value="Clásica">Clásica</option>
                    <option value="Electrónica">Electrónica</option>
                    <option value="Hip-Hop">Hip-Hop</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="Otro">Otro</option>
                </select>
            </div>

            <div>
                <label htmlFor='stock' className='text-gray-700 uppercase font-bold text-sm'>
                    Stock:
                </label>
                <input
                    id='stock'
                    type="number"
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                    placeholder='Cantidad de discos'
                    name='stock'
                    value={form.stock}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="imagen" className="text-gray-700 uppercase font-bold text-sm">
                    Imagen del disco:
                </label>
                <input
                    id="imagen"
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={handleChange}
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-3"
                />
                {preview && (
                    <img
                        src={preview}
                        alt="Vista previa"
                        className="w-48 h-48 object-cover mt-2 rounded-md border"
                    />
                )}
            </div>

            <input
                type="submit"
                className='bg-gray-600 w-full p-3 
                    text-slate-300 uppercase font-bold rounded-lg 
                    hover:bg-gray-900 cursor-pointer transition-all'
                value={producto?._id ? 'Actualizar' : 'Registrar'} />
        </form>
    );
};
