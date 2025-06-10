import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ImagePlus } from "lucide-react";

export const FormularioEventos = ({ evento }) => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nombreEvento: evento?.nombreEvento || "",
        fechaEvento: evento?.fechaEvento ? evento.fechaEvento.slice(0, 10) : "",
        imagenEvento: null,
    });

    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (evento?.imagenEvento) {
            setPreview(evento.imagenEvento);
        }
    }, [evento]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            const file = files[0];
            setForm({ ...form, imagenEvento: file });
            setPreview(URL.createObjectURL(file));
        } else {
            setForm({ ...form, [name]: value });
        }
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.nombreEvento.trim() || !form.fechaEvento) {
            setError("Debes llenar todos los campos obligatorios.");
            return;
        }

        const formData = new FormData();
        formData.append("nombreEvento", form.nombreEvento);
        formData.append("fechaEvento", form.fechaEvento);
        if (form.imagenEvento) {
            formData.append("imagenEvento", form.imagenEvento);
        }

        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            };

            if (evento?._id) {
                const url = `${import.meta.env.VITE_BACKEND_URL}/evento/actualizar/${evento._id}`;
                await axios.put(url, formData, config);
            } else {
                const url = `${import.meta.env.VITE_BACKEND_URL}/evento/registro`;
                await axios.post(url, formData, config);
            }

            navigate('/dashboard/listarEventos');
        } catch (error) {
            console.error("Error al guardar evento:", error);

            if (
                error.response &&
                error.response.data &&
                error.response.data.msg
            ) {
                setError(error.response.data.msg);
            } else {
                setError("Error al guardar el evento. Intenta nuevamente.");
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-[#1a1a1a] border border-yellow-500 p-6 rounded-2xl shadow-lg text-white max-w-3xl mx-auto"
        >
            <h2 className="text-3xl text-center text-yellow-400 font-bold mb-6 tracking-wide">
                {evento?._id ? '🎤 Editar Evento' : '📅 Registrar Evento'}
            </h2>

            {error && (
                <p className="mb-4 text-center text-red-500 font-semibold">
                    {error}
                </p>
            )}

            <div className="mb-5">
                <label htmlFor='nombreEvento' className='block text-sm font-semibold text-yellow-400'>Nombre del evento:</label>
                <input
                    id='nombreEvento'
                    type="text"
                    name='nombreEvento'
                    value={form.nombreEvento}
                    onChange={handleChange}
                    placeholder='Nombre del evento'
                    className='mt-1 w-full p-2 rounded-lg bg-[#2c2c2c] text-white placeholder-gray-500 border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                />
            </div>

            <div className="mb-5">
                <label htmlFor='fechaEvento' className='block text-sm font-semibold text-yellow-400'>Fecha del evento:</label>
                <input
                    id='fechaEvento'
                    type="date"
                    name='fechaEvento'
                    value={form.fechaEvento}
                    onChange={handleChange}
                    className='mt-1 w-full p-2 rounded-lg bg-[#2c2c2c] text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400'
                />
            </div>

            <div className="mb-5">
                <label className="block text-sm font-semibold text-yellow-400 mb-1">
                    Imagen del evento:
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
                value={evento?._id ? 'Actualizar Evento' : 'Registrar Evento'}
                className='w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition duration-300 shadow-md mt-4'
            />
        </form>
    );
};

