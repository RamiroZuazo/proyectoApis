import React from 'react';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

export default ({ name, value, onChange }) => {
    return (
        <div>
            <label className="text-gray-600">Descripcion</label>
            <div className="relative max-w-xs">
                <DescriptionOutlinedIcon className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" />
                <input
                    type="text"
                    name={name}
                    placeholder="Ingresa la descripcion del gasto"
                    value={value}
                    onChange={onChange}
                    className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
            </div>
        </div>
    );
};
