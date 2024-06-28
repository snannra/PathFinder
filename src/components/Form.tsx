interface Props {
  label: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const Form = ({ label, placeholder, onChange }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">
        {label}
      </label>
      <input
        width={200}
        type="email"
        className="form-control"
        id="exampleFormControlInput1"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default Form;
