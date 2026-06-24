function CustomName({ type, placeholder, value, onChange, className, label }) {
  return (
    <>
      <label className="font-medium block mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={className}
        onChange={onChange}
      />
    </>
  );
}
export default CustomName;
