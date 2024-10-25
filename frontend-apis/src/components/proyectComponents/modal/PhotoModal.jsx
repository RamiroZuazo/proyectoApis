import * as Dialog from "@radix-ui/react-dialog";
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';

const PhotoModal = ({ photoUrl }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="py-2 leading-none px-3 font-medium text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-200 rounded-lg">
        <InsertPhotoOutlinedIcon />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 z-50" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4 z-50">
          <div className="bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                Ticket
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                {/* Icon for closing */}
              </Dialog.Close>
            </div>
            <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
              {photoUrl ? (
                <img src={photoUrl} alt="Ticket" className="w-full h-auto rounded-md shadow-md" />
              ) : (
                <p>No hay imagen disponible.</p>
              )}
            </Dialog.Description>
            <div className="flex items-center gap-3 p-4 border-t">
              {/* Additional elements if needed */}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PhotoModal;
