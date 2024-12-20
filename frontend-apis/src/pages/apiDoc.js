import React from 'react';

const SwaggerDocs = () => {
    const openDocs = () => {
        window.open('http://localhost:8080/api-docs', '_blank');
    };

    return (
        <div className="swagger-docs">
            <button
                onClick={openDocs}
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Ver Documentación API
            </button>
        </div>
    );
};

export default SwaggerDocs;
