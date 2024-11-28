import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomModal from "./CustomModal"; // Asegúrate de importar el modal reutilizable

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPhoto, setNewPhoto] = useState(""); // Para almacenar la nueva foto (en Base64)
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [updatedUserData, setUpdatedUserData] = useState({
    nombre: "",
    email: "",
    contraseña: "",
  });

  const userId = 4; // Suponiendo que estás trabajando con el usuario con ID 2
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Perfil - Ticketify";

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
        if (response.data.ok) {
          setUserData(response.data.user);
          setUpdatedUserData({
            nombre: response.data.user.nombre,
            email: response.data.user.email,
            contraseña: "", // Para no pre-poblar la contraseña
          });
        } else {
          setError("No se pudo obtener los datos del usuario.");
        }
      } catch (err) {
        console.error("Error al obtener los datos del usuario:", err);
        setError("Error al obtener los datos del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Función para manejar el cambio de foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto(reader.result); // Muestra la nueva foto
      };
      reader.readAsDataURL(file); // Lee el archivo como un URL en Base64
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("nombre", updatedUserData.nombre);
    formData.append("email", updatedUserData.email);
    formData.append("contraseña", updatedUserData.contraseña);
  
    if (newPhoto) {
      formData.append("imagen_perfil", newPhoto); // La imagen en Base64
    }
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/${userId}`,  // Verifica que la ruta sea la correcta
        formData,
        {
          headers: {
            "Content-Type": "application/json",  // Usa "application/json" si ya no usas FormData
          },
        }
      );
  
      if (response.data.ok) {
        alert("Perfil actualizado con éxito");
        setUserData(response.data.user);  // Actualiza los datos con la URL de Cloudinary
      } else {
        alert(`Hubo un problema al actualizar el perfil: ${response.data.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error("Error al actualizar el perfil", error);
      if (error.response) {
        alert(`Error al actualizar el perfil: ${error.response.data.message || 'Error desconocido'}`);
      } else {
        alert(`Hubo un error al realizar la solicitud: ${error.message}`);
      }
    }
  };
  

  const handlePasswordReset = () => {
    navigate("/ForgotPasswordProfile", { state: { showSignUpLink: false } }); // Redirigir para cambiar contraseña
  };

  const handleDeleteAccount = () => {
    navigate("/LandingPage"); // Redirigir a la página de inicio después de eliminar la cuenta
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-lg mx-auto my-5 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium mb-6">Perfil del Usuario</h1>

      {/* Imagen de perfil */}
      <div className="flex items-center mb-6">
        <img
          src={newPhoto || userData.imagen_perfil} // Usa la nueva foto o la existente
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover ring-offset-2 ring-gray-200 ring-2"
        />
        <div className="ml-4">
          <label
            className="cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500"
          >
            Cambiar foto
            <input type="file" className="hidden" onChange={handlePhotoChange} />
          </label>
        </div>
      </div>

      {/* Nombre */}
      <div className="mb-4">
        <label className="block font-medium text-slate-700">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={updatedUserData.nombre}
          onChange={handleInputChange}
          className="w-full py-2 px-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
        />
      </div>

      {/* Correo */}
      <div className="mb-4">
        <label className="block font-medium text-slate-700">Correo</label>
        <input
          type="email"
          name="email"
          value={updatedUserData.email}
          onChange={handleInputChange}
          className="w-full py-2 px-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
        />
      </div>

      {/* Contraseña */}
      <div className="mb-4">
        <label className="block font-medium text-slate-700">Contraseña</label>
        <input
          type="password"
          name="contraseña"
          value={updatedUserData.contraseña}
          onChange={handleInputChange}
          className="w-full py-2 px-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
        />
      </div>

      {/* Botón para actualizar perfil */}
      <button
        onClick={handleUpdateProfile}
        className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg mb-4"
      >
        Actualizar perfil
      </button>

      {/* Restablecer contraseña */}
      <button
        onClick={handlePasswordReset}
        className="w-full py-3 font-medium text-indigo-600 bg-white border border-indigo-600 rounded-lg hover:bg-indigo-50"
      >
        Cambiar contraseña
      </button>

      {/* Eliminar cuenta */}
      <button
        onClick={() => setShowDeleteModal(true)} // Abre el modal al hacer clic en "Eliminar cuenta"
        className="w-full py-3 font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg mt-4"
      >
        Eliminar cuenta
      </button>

      {/* Modal de confirmación para eliminar cuenta */}
      <CustomModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        title="¿Desea eliminar su cuenta?"
        primaryButtonText="Eliminar cuenta"
        onPrimaryAction={handleDeleteAccount} // Ejecuta la función de eliminar cuenta al confirmar
      />
    </div>
  );
};

export default Profile;
