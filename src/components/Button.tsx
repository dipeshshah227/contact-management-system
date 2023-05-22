interface IProp
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
  customStyle?: string;
}

const Button = ({ loading, customStyle }: IProp) => {
  return (
    <button
      className={` m-auto bg-purple-900 w-32 text-white p-2 px-6  rounded cursor-pointer enabled:hover:bg-purple-700 
              ${loading && "bg-gray-500 cursor-not-allowed"} ${customStyle} `}
      disabled={loading}
      type="submit"
    >
      {loading ? "Loading..." : "Submit"}
    </button>
  );
};

export default Button;
