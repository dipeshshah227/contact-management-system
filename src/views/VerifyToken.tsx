import React, { ChangeEvent, useEffect, useRef, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../axios/AxiosConfig";

import verifytoken from "../assets/verifytoken.svg";
import AuthLayout from "../components/layout/AuthLayout";
import PublicRoute from "../route/PublicRoute";
import { detectState } from "../slice/authslice";
import { useAppDispatch } from "../store/hooks";

const VerifyToken: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!location.state?.email) {
      navigate("/register");
    }
    dispatch(detectState());
  }, []);

  // console.log(location.state);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = e.target;
    const value = input.value;

    if (value.match(/([0-9])+/g)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(-1); // Only take the last character entered
      setOtp(newOtp);
      setError("");

      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else {
      input.value = ""; // Clear the input if it doesn't match the pattern
    }
  };

  // const handleKeyDown = (
  //   e: React.KeyboardEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   const previousIndex = index - 1;

  //   if (e.key === "Backspace" && !e.currentTarget.value && previousIndex >= 0) {
  //     e.preventDefault();
  //     inputRefs.current[previousIndex].focus();
  //   }
  // };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const previousIndex = index - 1;
    const nextIndex = index + 1;

    if (e.key === "Backspace") {
      if (!e.currentTarget.value && previousIndex >= 0) {
        e.preventDefault();
        const newOtp = [...otp];
        newOtp[previousIndex] = ""; // Remove the value of the previous input
        setOtp(newOtp);
        inputRefs.current[previousIndex].focus();
      } else if (!e.currentTarget.value && previousIndex < 0) {
        e.preventDefault();
      } else if (e.currentTarget.value && nextIndex === otp.length) {
        e.preventDefault();
        const newOtp = [...otp];
        newOtp[index] = ""; // Clear the value of the current input
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = () => {
    if (otp.join("").length === 6) {
      setLoading(true);
      axiosClient
        .post("/auth/v1.0/verifyToken", {
          email: location.state.email,
          token: otp.join(""),
        })
        .then((res) => {
          if (res.status == 204) {
            setLoading(false);
            navigate("/completeregistration", {
              state: {
                email: location.state?.email,
                token: otp.join(""),
              },
            });
          }
        })
        .catch((error) => {
          console.log(error);
          setError(error.response.data.error.message);
        });
    } else {
      setError("Please enter the OTP.");
    }
  };
  // console.log(otp.join(""));
  return (
    <PublicRoute>
      <AuthLayout image={verifytoken}>
        <div className="h-[80%]  p-4 flex flex-col justify-center items-center mt-28">
          <h1 className="text-3xl">Verify Token</h1>
          <p className=" text-sm text-center pt-4">
            Please enter the verification OTP sent to{" "}
            <span className="font-semibold">{location.state?.email}</span>{" "}
          </p>

          <div className="flex gap-4 mt-2">
            {otp.map((value, index) => (
              <input
                key={index}
                type="number"
                className="w-9 h-12 border outline-purple-500 rounded pl-3 text-2xl caret-transparent "
                onChange={(e) => handleInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                value={value}
                autoFocus={index === 0}
                ref={(el) => (inputRefs.current[index] = el!)}
              />
            ))}
          </div>
          {error && (
            <span className="absolute text-red-500 top-80 text-sm">
              {error}
            </span>
          )}

          <button
            className="bg-purple-900 w-32 text-white p-2 px-6 rounded cursor-pointer hover:bg-purple-700 m-auto mt-8"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </AuthLayout>
    </PublicRoute>
  );
};

export default VerifyToken;
