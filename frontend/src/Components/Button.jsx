const Button = ({ children, onClick, className }) => {
    return (
      <button 
        onClick={onClick} 
        className={`px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 ${className}`}
      >
        {children}
      </button>
    );
  };
  
export default Button;  