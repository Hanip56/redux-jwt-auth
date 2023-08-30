import { AiFillWarning } from "react-icons/ai";

const ErrorComp = ({ error = "", className = "" }) => {
  return (
    <div className={`flex gap-2 justify-center ${className}`}>
      <AiFillWarning className="text-redPin" />{" "}
      <p className="errorMessage">{error}</p>
    </div>
  );
};

export default ErrorComp;
