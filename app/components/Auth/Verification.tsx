import { useActivationMutation } from "@/redux/features/auth/authApi";
import { styles } from "../../../app/styles/styles";
import React, { FC, useEffect, useRef, useState } from "react";
import {toast} from "react-hot-toast";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";

type Props = {
  setRoute: (route: string) => void;
};
type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const {token} = useSelector((state:any)=>state.auth);
  const [activation,{isSuccess,error}]= useActivationMutation();

  const [invalidError, setInvalidError] = useState<boolean>(false);

  useEffect(() => {
    if(isSuccess){
      toast.success("Account activated successfully");
      setRoute("Login");
    };
    if(error){
      setInvalidError(true);
      if("data" in error){
        const errorData =error as any;
        toast.error(errorData.data.message);
    }else{
      console.log("An error occured",error);
    }
  } 

  }, [isSuccess, error, setRoute])
  
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await activation({activation_token:token,activation_code:verificationNumber});
  
   
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);
    if (index > 0 && value === "") {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  return (
    <div>
      <h1 className={`${styles.title}`}>Verify Your Account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] mb-5 flex items-center justify-center ">
          <VscWorkspaceTrusted
            size={40}
            className="fill-black dark:fill-white"
          />
        </div>
      </div>
      <br />
      <br />
      <div className="1100px:w-[70%] flex justify-around items-center m-auto">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="text"
            key={index}
            ref={inputRefs[index]}
            maxLength={1}
            className={`w-[65px] h-[65px] mx-2 my-2 pb-2 bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${invalidError 
            ? "shake border-red-500" 
            : "dark:border-white border-[0000004a]"}`}
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder="0"
            autoFocus={index === 0}
            value={verifyNumber[key as keyof VerifyNumber]}
          />
        
        ))}
        
        
      </div>
      <br />
      {invalidError && (
          
          <p className="text-red-500 text-center text-[12px]">Enter Valid OTP</p>
        )}
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button
          className={`${styles.button}`}
          onClick={verificationHandler}
        >
          Verify OTP
        </button>
        </div>
        <h5 className="text-[16px] pb-5 font-Poppins text-black dark:text-white text-center pt-4">
            Go back to sign in? <span
          onClick={() => setRoute("Sign-Up")}
          className={`text-[#2190ff] pl-1 cursor-pointer my-5`}
        >
          Sign Up
        </span>
        </h5>
      
    </div>
  );
};

export default Verification;
