import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserData, updateUserProfile } from "../../api/api.users"; // Importa las funciones

const Profile = async () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPhoto, setNewPhoto] = useState(""); // Para almacenar la nueva foto (en Base64)
  const [updatedUserData, setUpdatedUserData] = useState({
    nombre: "",
    email: "",
    contraseña: "",
  });

  const userId = 2; // Suponiendo que estás trabajando con el usuario con ID 4
  const navigate = useNavigate();


  // Obtener los datos del usuario al montar el componente
  useEffect(() => {
    document.title = "Perfil - Ticketify";

    const fetchData = async () => {
      try {
        const response = await fetchUserData(userId);
        if (response.ok) {
          setUserData(response.user);
          setUpdatedUserData({
            nombre: response.user.nombre,
            email: response.user.email,
            contraseña: "", // Para no pre-poblar la contraseña
          });
        } else {
          setError("No se pudo obtener los datos del usuario33333.");
        }
      } catch (err) {
        console.error("Error al obtener los datos del usuario:", err);
        setError("Error al obtener los datos del usuario22222.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  // Función para actualizar el perfil del usuario
  const handleUpdateProfile = async () => {
    try {
      const response = await updateUserProfile(userId, updatedUserData, newPhoto);

      if (response.ok) {
        alert("Perfil actualizado con éxito");
        setUserData(response.user); // Actualiza los datos con la URL de Cloudinary
      } else {
        alert(`Hubo un problema al actualizar el perfil: ${response.message || 'Error desconocido'}`);
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
    </div>
  );
};

export default Profile;

