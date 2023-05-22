import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import lock from "../assets/icon/lock.svg";
import password from "../assets/password.svg";
import axiosClient from "../axios/AxiosConfig";
import InputField from "../components/InputField";
import AuthLayout from "../components/layout/AuthLayout";
import PublicRoute from "../route/PublicRoute";
import { detectState } from "../slice/authslice";
import { useAppDispatch } from "../store/hooks";
import Button from "../components/Button";

const CompleteRegistration = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state?.email) {
      navigate(`/register`);
    }
    dispatch(detectState());
  }, []);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{
    password: string;
    RetypePassword: string;
  }>();

  const onSubmit = (data: { password: string; RetypePassword: string }) => {
    setLoading(true);
    console.log(data);
    if (data.password !== data.RetypePassword) {
      setError("RetypePassword", {
        message: "Passwords do not match.",
      });
    }

    axiosClient
      .post("/auth/v1.0/completeRegistration", {
        email: location.state?.email,
        token: location.state?.token,
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
        navigate("/");
        console.log(res);
      });
  };
  return (
    <PublicRoute>
      <AuthLayout image={password}>
        <div className="h-[80%] p-4 flex flex-col  justify-center items-center">
          <h1 className="text-3xl ">Complete Registration</h1>
          <p className="text-xs text-gray-400 font-light pt-4">
            Please enter password to complete verification.
          </p>
          <form
            className="w-full flex flex-col  space-y-8 relative mt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              icon={lock}
              type="password"
              placeholder="Password"
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
            <InputField
              icon={lock}
              type="password"
              placeholder="ReType-Password"
              att={{
                ...register("RetypePassword", {
                  required: "Re type password is required",
                }),
              }}
              error={errors.RetypePassword?.message as string}
            />

            {/* <button
              className="bg-purple-900 w-32 text-white p-2 px-6  rounded cursor-pointer hover:bg-purple-700 m-auto"
              type="submit"
            >
              Submit
            </button> */}
            <Button loading={loading} />
          </form>
        </div>
      </AuthLayout>
    </PublicRoute>
  );
};

export default CompleteRegistration;
