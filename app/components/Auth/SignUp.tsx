"use client";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { styles } from "../../../app/styles/styles";
import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};
const schema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Please Enter your Name"),
  email: Yup.string()
    .email("Please enter valid Email")
    .required("PLease enter your E-mail"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Please Enter your Password"),
});
const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register,{data,error,isSuccess}] =useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message= data?.message || "Registration Success";
      toast.success(message);
      setRoute("Verification");
    }
    if(error){
     if("data" in error){
          const errorData =error as any;
          toast.error(errorData.data.message);
    }
    }
      
  }, [isSuccess, error, data?.message, setRoute]); 


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data={name,email,password}
      // setRoute("Verification");
      await register(data);

    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full px-2 py-2">
      <h1 className={`${styles.title}`}>SignUp with ELearning</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="name">
            Enter your Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            placeholder="John"
            className={`${errors.name && touched.name && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.name && touched.name && (
            <p className="text-red-500 text-[12px]">{errors.name}</p>
          )}
        </div>
        <label className={`${styles.label} `} htmlFor="email">
          Enter your Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          placeholder="loginmail@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <p className="text-red-500 text-[12px]">{errors.email}</p>
        )}

        <div className="w-full mt-5 mb-1 relative">
          <label className={`${styles.label}`} htmlFor="password">
            Enter your Password
          </label>
          <input
            type={show ? "text" : "password"}
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Enter your Password"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          <span
            onClick={() => setShow(!show)}
            className="absolute top-[50%] right-[10px] text-[20px] cursor-pointer"
          >
            {show ? (
              <AiOutlineEyeInvisible className=" cursor-pointer ml-5 my-2 dark:text-white text-black" />
            ) : (
              <AiOutlineEye className=" cursor-pointer ml-5 my-2 dark:text-white text-black" />
            )}
          </span>
        </div>
        {errors.password && touched.password && (
          <p className="text-red-500 text-[12px]">{errors.password}</p>
        )}
        <div className="w-full mt-5">
          <input type="submit" value="SignUp" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-[16px] font-Poppins text-black dark:text-white text-center pt-4">
          Or join with
        </h5>
        <div className="item-center justify-center flex my-3">
          <AiFillGithub
            size={30}
            className="cursor-pointer dark:text-white text-black mr-2"
          />
          <FcGoogle
            size={30}
            className="cursor-pointer dark:text-white text-black ml-2"
          />
        </div>
        <h5 className="text-[16px] font-Poppins text-black dark:text-white text-center pt-4">
          Already have account?
          <span
            onClick={() => setRoute("Login")}
            className={`text-[#2190ff] pl-1 cursor-pointer mt-5`}
          >
            Login
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default SignUp;
