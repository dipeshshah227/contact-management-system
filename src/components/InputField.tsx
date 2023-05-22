import hidepassword from "../assets/icon/hidepassword.svg";
import showpassword from "../assets/icon/showpassword.svg";
import { useState } from "react";

interface IFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  customStyle?: string;
  label?: string;
  att: object;
  error: string;
  icon?: string;
}

const InputField: React.FC<IFieldProps> = ({
  type,
  placeholder,
  customStyle,
  att,
  error,
  label,
  icon,
}) => {
  const [inputType, setInputType] = useState(type);
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      setIsFocus(false);
    }
  };

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div className="relative">
      <input
        type={inputType}
        placeholder={!isFocus ? placeholder : ""}
        className={`${
          icon && "pl-10"
        } w-full h-10 border rounded text-sm px-4 outline-purple-500 bg-gray-50 ${
          isFocus && "bg-white"
        }  ${customStyle} `}
        {...att}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isFocus && (
        <span
          className={`text-[#A9A9A9] absolute text-xs left-10 -top-2 bg-white px-1 animate-input-appear`}
        >
          {placeholder}
        </span>
      )}
      {icon && (
        <img
          src={icon}
          alt=""
          className="w-[25px] h-[25px] absolute top-2 left-2 fill-blue-500 "
        />
      )}
      {type === "password" && (
        <img
          onClick={togglePasswordVisibility}
          className="w-[25px] h-[25px] absolute right-3 top-2 cursor-pointer"
          src={inputType === "password" ? hidepassword : showpassword}
        />
      )}

      {error && (
        <span className="w-full left-0 text-red-500 text-xs absolute top-12">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
