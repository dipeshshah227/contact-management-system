import React from "react";
import background from "../../assets/background.jpg";

interface AuthLayout {
  children: React.ReactNode;
  image: string;
}

const AuthLayout = ({ children, image }: AuthLayout) => {
  return (
    <>
      <div
        className={`bg-image flex justify-center items-center w-screen h-screen  `}
        style={{
          background: `url('${background}') no-repeat center `,
          backgroundSize: "cover",
          width: "100%",
          height: "100vh",
        }}
      >
        {/* main div */}
        <div className="w-3/4 flex relative p-8 bg-white shadow-xl rounded-lg mx-10 h-3/4 box-border overflow-y-auto md:w-11/12 lg:w-7/12 ">
          <h2 className="text-xl absolute text-[#2460DA] ">logo</h2>
          <img
            className="w-4/6 hidden  md:visible md:block md:w-3/5 lg:4/5 object-contain"
            src={image}
            alt=""
          />
          {/* right div */}
          <div className="text-left box-content w-full">
            {children}

            {/* <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
