import * as Dialog from "@radix-ui/react-dialog";

const PhotoModal = ({ photoUrl, open, onClose }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Trigger className="hidden">Abrir Modal</Dialog.Trigger>
      <Dialog.Content className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <Dialog.Close className="absolute top-4 right-4 text-white text-3xl" onClick={onClose}>
          ×
        </Dialog.Close>
        <img
          src={photoUrl}
          alt="Imagen del ticket"
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default PhotoModal;
