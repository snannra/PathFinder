import "./Form.css";

interface Props {
  label: string;
  placeholder: string;
}

const Form = ({ label, placeholder }: Props) => {
  return (
    <div className="mb-3">
      <label htmlFor="exampleFormControlInput1" className="form-label">
        {label}
      </label>
      <input
        type="email"
        className="form-control"
        id="exampleFormControlInput1"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Form;
