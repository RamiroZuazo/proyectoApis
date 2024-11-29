import React from 'react';

const FileUpload = ({ onFileSelect }) => {
    // Función que maneja la selección del archivo
    const handleFileChange = (e) => {
        const file = e.target.files[0]; // Obtiene el primer archivo seleccionado
        if (file) {
            onFileSelect(file);  // Llama a la función `onFileSelect` para pasar el archivo al componente padre
        }
    };

    return (
        <div>
            <div>
                <label className="text-gray-600">
                    Carga de archivo
                </label>
            </div>
            <div className="max-w-md h-40 rounded-lg border-2 border-dashed flex items-center justify-center">
                <label htmlFor="file" className="cursor-pointer text-center p-4 md:p-8">
                    <svg className="w-10 h-10 mx-auto" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.1667 26.6667C8.48477 26.6667 5.5 23.6819 5.5 20C5.5 16.8216 7.72428 14.1627 10.7012 13.4949C10.5695 12.9066 10.5 12.2947 10.5 11.6667C10.5 7.0643 14.231 3.33334 18.8333 3.33334C22.8655 3.33334 26.2288 6.19709 27.0003 10.0016C27.0556 10.0006 27.1111 10 27.1667 10C31.769 10 35.5 13.731 35.5 18.3333C35.5 22.3649 32.6371 25.7279 28.8333 26.5M25.5 21.6667L20.5 16.6667M20.5 16.6667L15.5 21.6667M20.5 16.6667L20.5 36.6667" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-3 text-gray-700 max-w-xs mx-auto">Tocar para <span className="font-medium text-indigo-600">cargar tu archivo</span> o arrastra y suelta tu archivo aquí</p>
                </label>
                <input
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}  // Se añade el manejador de evento para el cambio de archivo
                />
            </div>
        </div>
    );
};

export default FileUpload;
