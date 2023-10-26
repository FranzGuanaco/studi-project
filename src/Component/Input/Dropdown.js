export const DropdownInput = ({ label, id, value, onChange, options }) => {
    return (
        <div className="data" style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: '20px' }}>
            <label className="label-fixed-width" htmlFor={id}>{label}</label>
            <select id={id} name={id} style={{ width: "50%" }} value={value} onChange={onChange}>
                {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
    );
};