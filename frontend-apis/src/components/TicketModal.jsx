import * as Dialog from "@radix-ui/react-dialog";
import FileUpload from "../card/FileUpload";
import AmountInput from "../inputs/AmountInput";
import EmailInput from "../inputs/EmailInput";
import DescriptionInput from "../inputs/DescriptionInput";
import DateInput from "../inputs/DateInput";
import { useState, useEffect } from "react";

const TicketModal = ({ triggerText, triggerIcon, modalTitle, buttonText, buttonStyle }) => {
    const hardcodedMembers = [
        { name: "John Lorin" },
        { name: "Chris Bondi" },
        { name: "Yasmine" },
        { name: "Joseph" },
        { name: "a" },
        { name: "s" },
        { name: "d" },
    ];

    const [divisionType, setDivisionType] = useState("equal");
    const [percentages, setPercentages] = useState({});

    useEffect(() => {
        if (hardcodedMembers && hardcodedMembers.length > 0 && divisionType === "equal") {
            divideEqually();
        }
    }, [hardcodedMembers, divisionType]);

    const handlePercentageChange = (name, value) => {
        const updatedPercentages = { ...percentages, [name]: parseFloat(value) || 0 };
        setPercentages(updatedPercentages);
    };

    const divideEqually = () => {
        const totalMembers = hardcodedMembers.length;
        const baseShare = 100 / totalMembers; // Porcentaje base
        const updatedPercentages = hardcodedMembers.reduce((acc, member) => {
            acc[member.name] = parseFloat(baseShare.toFixed(10)); // Usamos 10 decimales para máxima precisión
            return acc;
        }, {});

        // Ajustar el último miembro para asegurar que el total sea exactamente 100%
        const totalAssigned = Object.values(updatedPercentages).reduce((acc, value) => acc + value, 0);
        const difference = 100 - totalAssigned;
        const lastMember = hardcodedMembers[totalMembers - 1].name;
        updatedPercentages[lastMember] += difference; // Ajustar la diferencia al último miembro

        setPercentages(updatedPercentages);
        setDivisionType("equal");
    };

    const totalPercentage = Object.values(percentages).reduce(
        (acc, value) => acc + parseFloat(value || 0),
        0
    );

    return (
        <Dialog.Root>
            <Dialog.Trigger className={`inline-flex items-center justify-center gap-1 py-2 px-3 mt-2 font-medium text-sm text-center rounded-lg sm:mt-0 ${buttonStyle}`}>
                {triggerIcon}
                {triggerText}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40 z-50" />
                <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4 z-50 bg-white rounded-md shadow-lg overflow-y-auto max-h-[80vh]">
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

                            {/* Sección de dividir gastos */}
                            <div>
                                División del gasto
                                <div className="flex gap-3 mb-6">
                                    <button
                                        onClick={divideEqually}
                                        className={`px-4 py-2 font-semibold rounded-lg transition-colors ${
                                            divisionType === "equal" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                    >
                                        Dividir equitativamente
                                    </button>
                                    <button
                                        onClick={() => setDivisionType("custom")}
                                        className={`px-4 py-2 font-semibold rounded-lg transition-colors ${
                                            divisionType === "custom" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                    >
                                        Personalizar porcentaje
                                    </button>
                                </div>

                                <div className="space-y-4 mb-6">
                                    {hardcodedMembers.map((member) => (
                                        <div key={member.name} className="flex justify-between items-center">
                                            <span className="text-gray-800">{member.name}</span>
                                            <div className="relative flex items-center">
                                                <input
                                                    type="number"
                                                    value={parseFloat(percentages[member.name] || 0).toFixed(2)} // Mostrar solo 2 decimales
                                                    onChange={(e) => handlePercentageChange(member.name, e.target.value)}
                                                    disabled={divisionType === "equal"}
                                                    className="w-20 px-3 py-2 border rounded-lg text-right text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
                                                />
                                                <span className="ml-2 text-gray-500">%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-700">Total dividido:</span>
                                    <span
                                        className={`font-semibold ${
                                            totalPercentage === 100 ? "text-green-600" : "text-red-600"
                                        }`}
                                    >
                                        {totalPercentage.toFixed(2)}%
                                    </span>
                                </div>

                                <div className="h-6 mb-4">
                                    {totalPercentage !== 100 ? (
                                        <p className="text-red-500 text-sm">El total debe sumar 100%</p>
                                    ) : (
                                        <p className="text-green-500 text-sm">El total es correcto</p>
                                    )}
                                </div>
                            </div>
                        </Dialog.Description>
                        <div className="flex items-center gap-3 p-4 border-t">
                            <Dialog.Close asChild>
                                <button
                                    className={`px-6 py-2 rounded-md text-white font-semibold ${
                                        totalPercentage === 100 ? "bg-indigo-600 hover:bg-indigo-500" : "bg-gray-400 cursor-not-allowed"
                                    }`}
                                    disabled={totalPercentage !== 100}
                                >
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
