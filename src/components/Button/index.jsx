function Button({ onClick, className, title }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
