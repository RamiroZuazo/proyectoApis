import React, { useState, useEffect } from 'react';

const SplitExpenseModal = ({ showModal, setShowModal, members }) => {
  const [divisionType, setDivisionType] = useState('equal'); 
  const [percentages, setPercentages] = useState({});

  useEffect(() => {
    // Inicializar los porcentajes
    if (divisionType === 'equal') {
      const equalShare = 100 / members.length;
      const initialPercentages = members.reduce(
        (acc, member) => ({ ...acc, [member.name]: equalShare.toFixed(2) }),
        {}
      );
      setPercentages(initialPercentages);
    }
  }, [members, divisionType]);

  const handlePercentageChange = (name, value) => {
    const updatedPercentages = { ...percentages, [name]: parseFloat(value) || 0 };
    setPercentages(updatedPercentages);
  };

  const divideEqually = () => {
    const equalShare = 100 / members.length;
    const updatedPercentages = members.reduce(
      (acc, member) => ({ ...acc, [member.name]: equalShare.toFixed(2) }),
      {}
    );
    setPercentages(updatedPercentages);
    setDivisionType('equal');
  };

  const totalPercentage = Object.values(percentages).reduce(
    (acc, value) => acc + parseFloat(value || 0),
    0
  );

  const handleSave = () => {
    console.log('Distribución de gastos:', percentages);
    setShowModal(false); // Cerrar el modal
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Dividir gastos</h2>

        {/* Botones de selección de tipo de división */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={divideEqually}
            className={`px-4 py-2 font-semibold rounded-lg transition-colors ${
              divisionType === 'equal' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Dividir equitativamente
          </button>
          <button
            onClick={() => setDivisionType('custom')}
            className={`px-4 py-2 font-semibold rounded-lg transition-colors ${
              divisionType === 'custom' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Personalizar porcentaje
          </button>
        </div>

        {/* Lista de miembros y porcentaje */}
        <div className="space-y-4 mb-6">
          {members.map((member) => (
            <div key={member.name} className="flex justify-between items-center">
              <span className="text-gray-800">{member.name}</span>
              <div className="relative flex items-center">
                <input
                  type="number"
                  value={percentages[member.name]}
                  onChange={(e) => handlePercentageChange(member.name, e.target.value)}
                  disabled={divisionType === 'equal'}
                  className="w-20 px-3 py-2 border rounded-lg text-right text-gray-700 focus:outline-none focus:ring focus:ring-indigo-300"
                />
                <span className="ml-2 text-gray-500">%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Indicador de total */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700">Total dividido:</span>
          <span className={`font-semibold ${totalPercentage !== 100 ? 'text-red-600' : 'text-green-600'}`}>
            {totalPercentage.toFixed(2)}%
          </span>
        </div>

        {/* Espacio reservado para el mensaje de error */}
        <div className="h-6 mb-4">
          {totalPercentage !== 100 && <p className="text-red-500 text-sm">El total debe sumar 100%</p>}
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4 ">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50"
            disabled={totalPercentage !== 100}
          >
            Guardar
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplitExpenseModal;
