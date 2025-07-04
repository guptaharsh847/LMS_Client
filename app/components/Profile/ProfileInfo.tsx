"use client";
import Image from "next/image";

import { styles } from "../../../app/styles/styles";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../../public/assets/avatar.png";
import { useEditProfileMutation, useUpdateAvatarMutation } from "../../../redux/features/user/userApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};
const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);

  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess:success, error: updateError }] = useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, {
    skip: loadUser ? false : true,
  });

  const imageHandler = async (e: any) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar =fileReader.result
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
      toast.success("Profile Updated Successfully");
  
    }

    if (error || updateError) {
      console.log(error);
      console.log(updateError);
      toast.error("Profile Update Failed");

    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e: any) => {

    e.preventDefault();
    if(name !== ""){
    await editProfile({ name:name,  });
    
    }
  
  };

  return (
    <>
      <div className="w-full  flex   justify-center ">
        <div className="absolute ">
          <Image
            src={
              user.avatar || avatar ? user.avatar.url || avatar : avatarIcon
            }
            alt=""
            width={120}
            height={120}    
            className="cursor-pointer w-[120px] h-[120px] mt-2 border-[3px]  border-[#37a39a] rounded-full"
          />

          <input
            type="file"
            name=""
            id="avatar"
            className="hidden "
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image.webp"
          />

          <label htmlFor="avatar">
            <div className="bg-slate-900 w-[30px] h-[30px] cursor-pointer right-2 flex absolute rounded-full  justify-center items-center bottom-2 ">
              <AiOutlineCamera size={20} className="z-10" fill="#fff" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />

      <div className="w-full mt-[6%] pl-[15%] absolute 800px:pl-10 pt-[100px]">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]  ">
              <label className={`${styles.label} block pb-2`}>Full Name</label>

              <input
                type="text"
                className={`${styles.input} !w-[75%] mb-4 800px:w-[90%] 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className={`${styles.label}  pb-2`}>Email Address</label><br />
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[75%] mb-4 800px:w-[90%] 800px:mb-0`}
                required
                value={user?.email}
              />
            </div>
            <input
              className={`w-[50%] 800px:w-[250px] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};
export default ProfileInfo;
