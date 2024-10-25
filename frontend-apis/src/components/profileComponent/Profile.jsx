import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomModal from './CustomModal'; // Asegúrate de importar el modal reutilizable

const UserProfile = () => {
  const [name, setName] = useState("John Lorin");
  const [email, setEmail] = useState("john@example.com");
  const [newPhoto, setNewPhoto] = useState("https://randomuser.me/api/portraits/men/46.jpg");
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para controlar la visibilidad del modal

  const navigate = useNavigate();

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

  // Función para actualizar los datos (nombre, correo)
  const handleUpdateProfile = () => {
    //alert("Perfil actualizado con éxito");
  };

  // Función para redirigir al componente de restablecer contraseña
  const handlePasswordReset = () => {
    navigate("/ForgotPasswordProfile", { state: { showSignUpLink: false } }); // Pasamos el estado al componente de restablecer contraseña
  };

  // Función para eliminar la cuenta y redirigir a la página de inicio
  const handleDeleteAccount = () => {
    // Aquí deberías implementar la lógica para eliminar la cuenta en el backend
    //alert("Cuenta eliminada exitosamente");
    navigate("/LandingPage"); // Redirigir a la página de inicio (LandingPage)
  };

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

export default UserProfile;
