import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { addMemberToProject } from "../../../api/api.projects"; // Importa la función de la API
import { useParams } from "react-router-dom";

export default function TeamMemberModal({ onMemberAdded }) {
  const { proyecto_id } = useParams(); // Obtén el ID del proyecto desde la URL
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("Miembro"); // Valor inicial por defecto
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+$/.test(email);

  const handleAddMember = async () => {
    if (!email.trim()) {
      setError("Es necesario ingresar un correo.");
    } else if (!isValidEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
    } else {
      try {
        setLoading(true);
        await addMemberToProject(proyecto_id, email, rol); // Llama a la API para agregar el miembro
        const newMember = {
          name: "Nuevo Miembro", // Placeholder, ya que depende del backend
          email,
          rol,
        };
        onMemberAdded(newMember);
        setEmail("");
        setRol("Miembro"); // Resetea el rol a su valor inicial
        setError("");
        setOpen(false); // Cierra el modal después de agregar
      } catch (err) {
        setError(err.message || "Error al agregar miembro.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Botón para abrir el modal */}
      <Dialog.Trigger className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0">
        Agregar miembro
      </Dialog.Trigger>

      {/* Contenido del modal */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 z-40" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50"
          onPointerDownOutside={() => setOpen(false)} // Cierra el modal al hacer clic afuera
          onEscapeKeyDown={() => setOpen(false)} // Cierra el modal al presionar Escape
        >
          <Dialog.Title className="text-xl font-bold mb-4">Invita a un nuevo miembro</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 mb-4">
            Ingresa el correo y selecciona el rol del nuevo miembro.
          </Dialog.Description>

          {/* Campo para el correo */}
          <input
            type="email"
            className="w-full mb-3 px-4 py-2 border rounded-md"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Selección de rol */}
          <select
            className="w-full mb-3 px-4 py-2 border rounded-md"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="Miembro">Miembro</option>
            <option value="Admin">Admin</option>
          </select>

          {/* Mensaje de error */}
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          {/* Botón de envío */}
          <button
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500"
            onClick={handleAddMember}
            disabled={loading}
          >
            {loading ? "Agregando..." : "Agregar"}
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
