const FilterDropdown = ({ label, value, onChange, options, className = '' }) => (
  <label className={`block ${className}`}>
    <span className="sr-only">{label}</span>
    <select value={value} onChange={onChange} className="field h-12">
      <option value="">{label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </label>
);

export default FilterDropdown;
