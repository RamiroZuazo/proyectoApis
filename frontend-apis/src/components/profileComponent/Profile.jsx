import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedUser, updateUser } from "../../api/api.users"; // Asegúrate de que updateUser esté importada correctamente
import { jwtDecode } from 'jwt-decode';

const UserProfile = () => {
  const [name, setName] = useState(""); // Inicializamos vacío
  const [email, setEmail] = useState("");
  const [newPhoto, setNewPhoto] = useState("https://via.placeholder.com/150"); // Foto de perfil por defecto
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState(null); // Para manejar errores
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate();

  // Función para cargar los datos del usuario logueado
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await getLoggedUser(); 
      const { user } = response; 
      setName(user.nombre || ""); 
      setEmail(user.email || ""); 
      setNewPhoto(user.imagen_perfil || "https://via.placeholder.com/150"); // Foto de perfil
    } catch (err) {
      setError(err.message || "Error al cargar los datos del usuario");
    } finally {
      setLoading(false);
    }
  };

  // Cargar los datos del usuario al montar el componente
  useEffect(() => {
    fetchUserData();
  }, []);

  // Función para manejar el cambio de la foto
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto(reader.result); // Muestra la nueva foto
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para actualizar el perfil
  const handleUpdateProfile = async () => {
    try {
      const updatedData = {
        nombre: name,
        email: email,
        imagen_perfil: newPhoto, // Enviar la nueva imagen si fue cambiada
      };
  
      // Realizamos la actualización del perfil
      const result = await updateUser(updatedData);
  
      console.log(result); // Ver la respuesta completa para debug
  
      if (result.ok) {
        window.location.reload(); // Recarga toda la página
      } else {
      }
    } catch (err) {
      console.error('Error al actualizar perfil:', err);  // Ver el error completo
    }
  };
  
  

  const handlePasswordReset = () => {
    navigate("/ForgotPasswordProfile", { state: { showSignUpLink: false } });
  };

  if (loading) {
    return <div className="text-center text-gray-600">Cargando datos del usuario...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-lg mx-auto my-5 bg-white p-8 rounded-xl shadow shadow-slate-300">
      <h1 className="text-4xl font-medium mb-6">Perfil del Usuario</h1>

      {/* Imagen de perfil */}
      <div className="flex items-center mb-6">
        <img
          src={newPhoto}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover ring-offset-2 ring-gray-200 ring-2"
        />
        <div className="ml-4">
          <label
            className="cursor-pointer bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500"
          >
            Cambiar foto
            <input
              type="file"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>
        </div>
      </div>

      {/* Nombre */}
      <div className="mb-4">
        <label className="block font-medium text-slate-700">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full py-2 px-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-600"
        />
      </div>

      {/* Correo */}
      <div className="mb-4">
        <label className="block font-medium text-slate-700">Correo</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

export default UserProfile;
