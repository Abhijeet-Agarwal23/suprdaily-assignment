import PropTypes from "prop-types";
import "./Button.css";

export const Button = ({ disabled, className, children, onClick }) => (
  <button
    type="button"
    disabled={disabled}
    className={`btn ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  disabled: false,
  className: "",
  children: null,
};
