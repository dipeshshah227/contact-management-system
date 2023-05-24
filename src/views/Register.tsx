import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios/AxiosConfig";

import at from "../assets/icon/at.svg";
import email from "../assets/icon/email.svg";
import login from "../assets/login.svg";
import Button from "../components/Button";
import InputField from "../components/InputField";
import AuthLayout from "../components/layout/AuthLayout";
import { detectState } from "../slice/authslice";
import { useAppDispatch } from "../store/hooks";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(detectState());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    fullName: string;
  }>();

  const onSubmit = (data: { email: string; fullName: string }) => {
    setLoading(true); // Set loading to true before making the request
    axiosClient.post("auth/v1.0/requestRegistrationToken", data).then((res) => {
      if (res.status === 204) {
        setLoading(false); // Set loading to false when the response is received
        navigate("/verifytoken", {
          state: {
            email: data.email,
          },
        });
      }
    });
  };

  return (
    <AuthLayout image={login}>
      <div
        className={`h-[80%] p-4 flex flex-col  justify-center items-center ${
          loading && "cursor-not-allowed"
        } `}
      >
        <h1 className="text-3xl ">Register now</h1>
        <p className="text-xs text-gray-400 font-light pt-4">
          Enter your information to register.
        </p>
        <form
          className="w-full flex flex-col  space-y-8 relative mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            icon={at}
            type="text"
            placeholder="Name"
            label="name"
            att={{
              ...register("fullName", {
                required: "Name is required",
              }),
            }}
            error={errors.fullName?.message as string}
          />
          <InputField
            icon={email}
            type="text"
            placeholder="Email"
            label="email"
            att={{
              ...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email",
                },
              }),
            }}
            error={errors.email?.message as string}
          />
          <Button loading={loading} />
        </form>
        <Link to="/login" className="text-sm mt-4 underline">
          Already have an account?
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
