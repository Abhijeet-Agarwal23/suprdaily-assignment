import PropTypes from "prop-types";

export const TextArea = ({
  label,
  value,
  placeholder,
  className,
  onChange,
}) => (
  <label className="text-input">
    <span>{label}</span>
    <textarea
      value={value}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
    />
  </label>
);

TextArea.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

TextArea.defaultProps = {
  placeholder: "",
  className: "",
};
