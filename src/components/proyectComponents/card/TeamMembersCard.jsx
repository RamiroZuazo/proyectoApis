import { useState } from "react";
import TeamMemberModal from "../modal/TeamMemberModal";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default () => {
  const [members, setMembers] = useState([
    {
      avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      name: "John lorin",
      email: "john@example.com"
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/86.jpg",
      name: "Chris bondi",
      email: "chridbondi@example.com"
    },
    {
      avatar: "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
      name: "Yasmine",
      email: "yasmine@example.com"
    },
    {
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f",
      name: "Joseph",
      email: "joseph@example.com"
    },
  ]);

  // Función para agregar un nuevo miembro
  const addMember = (newMember) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
  };

  // Función para eliminar un miembro
  const handleDeleteItem = (idx) => {
    const updatedItems = members.filter((_, index) => index !== idx);
    setMembers(updatedItems); // Actualiza el estado con los miembros restantes
  };

  return (
    <div className="max-w-2xl mx-auto lg:max-w-full px-8 mt-4">
      <div className="items-start justify-between sm:flex">
        <div>
          <h4 className="text-gray-800 text-2xl font-bold">Miembros del proyecto</h4>
          <p className="mt-2 text-gray-600 text-base sm:text-sm">Agrega miembros para compartir los gastos.</p>
        </div>
        {/* Pasa la función addMember al modal */}
        <TeamMemberModal addMember={addMember}>
          <button className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            Agregar miembro
          </button>
        </TeamMemberModal>
      </div>

      {/* Lista de miembros */}
      <ul className="mt-12 divide-y">
        {
          members.map((item, idx) => (
            <li key={idx} className="py-5 flex items-start justify-between">
              <div className="flex gap-3">
                <img src={item.avatar} className="flex-none w-12 h-12 rounded-full" alt="avatar" />
                <div>
                  <span className="block text-sm text-gray-700 font-semibold">{item.name}</span>
                  <span className="block text-sm text-gray-600">{item.email}</span>
                </div>
              </div>
              <button
                className="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-200 rounded-lg"
                onClick={() => handleDeleteItem(idx)} // Elimina el miembro
              >
                <DeleteOutlineOutlinedIcon />
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
