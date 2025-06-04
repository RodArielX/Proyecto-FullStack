import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        }

        /*if (evento?._id) {
            await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/evento/actualizar/${evento._id}`,
                formData,
                config
            );
            alert("Evento actualizado con éxito");
        } else {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/evento/registro`,
                formData,
                config
            );
            alert("Evento registrado con éxito");
        }
        navigate("/admin/eventos");
    } catch (err) {
        const msg =
            err.response?.data?.msg ||
            "Error al registrar/actualizar el evento. Inténtalo de nuevo.";
        setError(msg);
    }*/
    };


    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-[#111827] p-6 rounded-2xl shadow-lg space-y-6 border border-gray-700"
        >
            <h2 className="text-2xl font-semibold text-white text-center">
                {evento?._id ? "Editar Evento" : "Registrar Nuevo Evento"}
            </h2>

            {error && (
                <p className="text-red-500 bg-red-100 rounded p-2 text-sm">{error}</p>
            )}

            <div>
                <label className="block text-sm text-yellow-400 mb-1">
                    Nombre del evento
                </label>
                <input
                    type="text"
                    name="nombreEvento"
                    value={form.nombreEvento}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm text-yellow-400 mb-1">
                    Fecha del evento
                </label>
                <input
                    type="date"
                    name="fechaEvento"
                    value={form.fechaEvento}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm text-yellow-400 mb-1">
                    Imagen del evento
                </label>
                <input
                    type="file"
                    name="imagenEvento"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-600 cursor-pointer"
                />
                {preview && (
                    <img
                        src={preview}
                        alt="Vista previa"
                        className="w-full mt-3 rounded-lg shadow-md border border-gray-700"
                    />
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 rounded-lg transition duration-200 shadow-md"
            >
                {evento?._id ? "Actualizar evento" : "Registrar evento"}
            </button>
        </form>
    );
};



