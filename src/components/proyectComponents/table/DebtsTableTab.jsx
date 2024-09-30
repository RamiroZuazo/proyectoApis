import { useState } from "react"

export default () => {

    const [tableItems, setTableItems] = useState([
        {
            label: "A pagar",
            title: "Miembros",
            items: [
                {
                    prop: "John lorin",
                    Monto: "$0",
                    Estado: "Sin deuda"
                },
                {
                    prop: "Chris bondi",
                    Monto: "$0",
                    Estado: "Sin deuda"
                },
                {
                    prop: "yasmine",
                    Monto: "$399",
                    Estado: "En deuda"
                },
                {
                    prop: "Joseph",
                    Monto: "$678",
                    Estado: "En deuda"
                },
            ]
        },
        {
            label: "A cobrar",
            title: "Miembros",
            items: [
                {
                    prop: "John lorin",
                    Monto: "$203",
                    Estado: "En deuda",
                },
                {
                    prop: "Chris bondi",
                    Monto: "$408",
                    Estado: "En deuda",
                },
                {
                    prop: "yasmine",
                    Monto: "$0",
                    Estado: "Sin deuda"
                },
                {
                    prop: "Joseph",
                    Monto: "$0",
                    Estado: "Sin deuda"
                },
            ]
        },
    ]);

    const [selectedItem, setSelectedItem] = useState(0);

    const labelColors = {
        "Sin deuda": {
            color: "text-green-600 bg-green-50",
        },
        "En deuda": {
            color: "text-red-600 bg-red-50",
        },
    };

    const handleSetToZero = (index) => {
        const updatedItems = [...tableItems];
        const currentItem = updatedItems[selectedItem].items[index];

        // Actualizamos el monto y estado del usuario
        currentItem.Monto = "$0";
        currentItem.Estado = "Sin deuda";

        setTableItems(updatedItems);
    };

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="text-sm mt-6 overflow-x-auto">
                <ul role="tablist" className="w-full border-b flex items-center gap-x-3 overflow-x-auto">
                    {
                        tableItems.map((item, idx) => (
                            <li key={idx} className={`py-2 border-b-2 ${selectedItem == idx ? "border-indigo-600 text-indigo-600" : "border-white text-gray-500"}`}>
                                <button
                                    role="tab"
                                    aria-selected={selectedItem == idx ? true : false}
                                    aria-controls={`tabpanel-${idx + 1}`}
                                    className="py-2.5 px-4 rounded-lg duration-150 hover:text-indigo-600 hover:bg-gray-50 active:bg-gray-100 font-medium"
                                    onClick={() => setSelectedItem(idx)}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))
                    }
                </ul>
                <table className="w-full table-auto text-left">
                    <thead className="text-gray-600 font-medium border-b">
                        <tr>
                            <th className="w-9/12 py-4 pr-6">{tableItems[selectedItem].title}</th>
                            <th className="py-4 pr-6">Monto</th>
                            <th className="py-4 pr-6 px-4">Estado</th>
                            <th className="py-4 pr-6">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                            tableItems[selectedItem].items.map((item, idx) => (
                                <tr key={idx}>
                                    <td className="pr-6 py-4 whitespace-nowrap">{item.prop}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap text-indigo-600">{item.Monto}</td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        <span className={`py-2 px-3 rounded-full font-semibold text-xs ${labelColors[item?.Estado]?.color || ""}`}>{item.Estado}</span>
                                    </td>
                                    <td className="pr-6 py-4 whitespace-nowrap">
                                        {item.Estado === "En deuda" && (
                                            <button
                                                className="py-2 px-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
                                                onClick={() => handleSetToZero(idx)}
                                            >
                                                {selectedItem === 0 ? "Pago" : "Cobrado"}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
