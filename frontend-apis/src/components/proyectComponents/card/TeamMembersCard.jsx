import React, { useState, useEffect } from "react";
import TeamMemberModal from "../modal/TeamMemberModal";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useParams } from "react-router-dom";
import { getMembersByProjectId, removeMemberFromProject } from "../../../api/api.projects";

export default function TeamMembersCard() {
  const { proyecto_id } = useParams();
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Función para obtener los miembros desde el backend
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await getMembersByProjectId(proyecto_id);
      if (response?.proyecto?.Users) {
        const formattedMembers = response.proyecto.Users.map((member) => ({
          avatar: member.imagen_perfil || "https://via.placeholder.com/150",
          name: member.nombre,
          email: member.email,
          rol: member.ProyectoMiembro?.rol || "Miembro",
        }));
        setMembers(formattedMembers);
      } else {
        setError("No se encontraron miembros.");
      }
    } catch (err) {
      setError(err.message || "Error al cargar los miembros.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [proyecto_id]);

  // Función para eliminar un miembro
  const handleDeleteItem = async (idx, email) => {
    try {
      await removeMemberFromProject(proyecto_id, email);
      fetchMembers(); // Refresca la lista tras eliminar un miembro
    } catch (err) {
      console.error("Error al eliminar miembro:", err.message);
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-gray-600 text-center">Cargando miembros...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto lg:max-w-full px-8 mt-4">
      <div className="items-start justify-between sm:flex">
        <div>
          <h4 className="text-gray-800 text-2xl font-bold">Miembros del proyecto</h4>
          <p className="mt-2 text-gray-600 text-base sm:text-sm">Agrega o elimina miembros del proyecto.</p>
        </div>
        <TeamMemberModal onMemberAdded={fetchMembers} />
      </div>

      <ul className="mt-12 divide-y">
        {members.map((item, idx) => (
          <li key={idx} className="py-5 flex items-start justify-between">
            <div className="flex gap-3">
              <img src={item.avatar} className="flex-none w-12 h-12 rounded-full" alt="avatar" />
              <div>
                <span className="block text-sm text-gray-700 font-semibold">{item.name}</span>
                <span className="block text-sm text-gray-600">{item.email}</span>
                <span className="block text-sm text-gray-500 italic">{item.rol}</span>
              </div>
            </div>
            <button
              className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-200 rounded-lg"
              onClick={() => handleDeleteItem(idx, item.email)}
            >
              <DeleteOutlineOutlinedIcon />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
