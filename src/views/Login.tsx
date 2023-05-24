import { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import email from "../assets/icon/email.svg";
import lock from "../assets/icon/lock.svg";
import password from "../assets/password.svg";
import axiosClient from "../axios/AxiosConfig";
import Button from "../components/Button";
import InputField from "../components/InputField";
import AuthLayout from "../components/layout/AuthLayout";
import { detectState, setState } from "../slice/authslice";
import { useAppDispatch } from "../store/hooks";

interface Idata {
  email: string;
  password: string;
}

const Login = () => {
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
  } = useForm<Idata>();

  const onSubmit: SubmitHandler<Idata> = (data) => {
    setLoading(true);
    console.log(data);
    axiosClient
      .post("/auth/v1.0/login", {
        username: data.email,
        password: data.password,
      })
      .then((res) => {
        setLoading(false);
        localStorage.setItem(
          "access_token",
          JSON.stringify(res.data.access_token)
        );
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(res.data.refresh_token)
        );
        dispatch(setState("loggedIn"));
        navigate("/");
        console.log(res);
      });
  };

  return (
    <AuthLayout image={password}>
      <div className="h-[80%] p-4 flex flex-col  justify-center items-center">
        <h1 className="text-3xl ">Welcome back</h1>
        <p className="text-xs text-gray-400 font-light pt-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          pariatur doloribus rerum nemo libero reiciendis quas necessitatibus
        </p>
        <form
          className="w-full flex flex-col  space-y-8 relative mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
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

          <InputField
            icon={lock}
            type="password"
            placeholder="Password"
            label="password"
            att={{
              ...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 digits long",
                },
              }),
            }}
            error={errors.password?.message as string}
          />
          <Button loading={loading} />
        </form>

        <Link to="/register" className="text-sm mt-4 underline">
          Don't have a account?
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
