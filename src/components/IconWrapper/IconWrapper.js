import "./IconWrapper.css";

const IconWrapper = ({ children, bg = "bg-danger", ...rest }) => {
  return (
    <div
      className={`root ${bg} rounded-circle`}
      style={{
        width: "30px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        cursor: "pointer",
      }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default IconWrapper;
