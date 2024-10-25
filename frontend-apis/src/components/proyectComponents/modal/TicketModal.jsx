import * as Dialog from "@radix-ui/react-dialog";
import FileUpload from "../card/FileUpload";
import AmountInput from "../inputs/AmountInput";
import EmailInput from "../inputs/EmailInput";
import DescriptionInput from "../inputs/DescriptionInput";
import DateInput from "../inputs/DateInput";

const TicketModal = ({ triggerText, triggerIcon, modalTitle, buttonText, buttonStyle }) => {
    return (
        <Dialog.Root>
            <Dialog.Trigger className={`inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center rounded-lg sm:mt-0 ${buttonStyle}`}>
                {triggerIcon}
                {triggerText}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 z-50" />
                <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4 z-50">
                    <div className="bg-white rounded-md shadow-lg">
                        <div className="flex items-center justify-between p-4 border-b">
                            <Dialog.Title className="text-lg font-medium text-gray-800 ">
                                {modalTitle}
                            </Dialog.Title>
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
                        <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
                            <EmailInput />
                            <DescriptionInput />
                            <DateInput />
                            <AmountInput />
                            <FileUpload />
                        </Dialog.Description>
                        <div className="flex items-center gap-3 p-4 border-t">
                            <Dialog.Close asChild>
                                <button className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 ">
                                    {buttonText}
                                </button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                                <button
                                    className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                                    aria-label="Close"
                                >
                                    Cancelar
                                </button>
                            </Dialog.Close>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default TicketModal;
