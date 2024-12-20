export default ({ name, value, onChange }) => {
    return (
        <div>
            <label className="text-gray-600">Monto</label>
            <div className="relative max-w-xs text-gray-500">
                <span className="h-6 text-gray-400 absolute left-3 inset-y-0 my-auto">
                    &#x24;
                </span>
                <input
                    type="number"
                    name={name}
                    placeholder="0.00"
                    value={value}
                    onChange={onChange}
                    className="w-full pl-8 pr-16 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                    <select className="text-sm bg-transparent outline-none px-1 rounded-lg h-full">
                        <option>USD</option>
                        <option>EUR</option>
                        <option>ARS</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
