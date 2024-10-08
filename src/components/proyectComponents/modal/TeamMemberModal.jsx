import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export default function TeamMemberModal({ addMember }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // NUEVO ESTADO PARA GESTIONAR EL ERROR
  const [open, setOpen] = useState(false); // CONTROLAMOS LA APERTURA DEL MODAL

  // Función para validar si el correo tiene un formato válido
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar el correo
    return emailRegex.test(email);
  };

  // Función para agregar un nuevo miembro
  const handleAddMember = () => {
    if (email.trim() === "") {
      setError("Es necesario ingresar un correo electrónico.");
    } else if (!isValidEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
    } else {
      const newMember = {
        name: "Nuevo Miembro", // Nombre por defecto o dinámico
        email: email,
        avatar: "https://via.placeholder.com/150", // Avatar por defecto
      };
      addMember(newMember); // Llama a la función para agregar el miembro
      setEmail(""); // Limpia el campo de correo
      setError(""); // Limpia el mensaje de error
      setOpen(false); // Cierra el modal si el correo es válido
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg sm:mt-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
        Agregar miembro
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 w-full h-full bg-black opacity-40 z-40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4 z-50">
          <div className="bg-white rounded-md shadow-lg px-4 py-6">
            <div className="flex items-center justify-end">
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Dialog.Close>
            </div>
            <div className="max-w-sm mx-auto space-y-3 text-center ">
              <Dialog.Title className="text-xl font-medium text-gray-800 ">
                Invita a un nuevo miembro
              </Dialog.Title>

              <Dialog.Description className="text-sm text-gray-600">
                <p>Ingresa el correo del nuevo miembro que quieras añadir al proyecto.</p>
              </Dialog.Description>

              <fieldset className="Fieldset relative">
                <svg
                  className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <input
                  className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  placeholder="Ingresa el correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>

              {/* MENSAJE DE ERROR */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                className="w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
                onClick={handleAddMember}
              >
                Invitar
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
