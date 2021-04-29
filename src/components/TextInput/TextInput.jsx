import PropTypes from "prop-types";
import "./TextInput.css";

export const TextInput = ({
  label,
  value,
  placeholder,
  className,
  onChange,
}) => (
  <label className="text-input">
    <span>{label}</span>
    <input
      type="text"
      value={value}
      maxLength={20}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
    />
  </label>
);

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextInput.defaultProps = {
  placeholder: "",
  className: "",
};
