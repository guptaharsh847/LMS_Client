import { styles } from "@/app/styles/styles";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setsubTitle] = useState("");
  const { data,refetch } = useGetHeroDataQuery("Banner",{
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();
  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setsubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
      toast.success("Hero updated Successfully");
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  }, [data, isSuccess, error]);
  const handleUpdateImage = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <>
      <div className="w-full 1000px:flex items-center">
        <div className="w-screen   !h-screen">
          <div className="!h-screen   items-center text-center   w-full shadow-md flex  flex-col-reverse md:flex-row p-4  sm:p-8">
            <div className="w-full h-[85%] rounded-full md:w-1/2   hero_animation ">
              <img
                src={image}
                alt=""
                className="object-contain 1100px:max-w-[90%] w-[90%] transition-transform hover:scale-110 duration-300 mx-auto my-4 py-8 1500px:max-w-[85%] h-[auto] z-[10]"
              />
              <input
                type="file"
                name=""
                id="banner"
                accept="image/*"
                className="hidden"
                onChange={handleUpdateImage}
              />
              <label htmlFor="banner" className="absolute z-[10]">
                <AiOutlineCamera className="dark:text-white text-black size-10  cursor-pointer" />
              </label>
            </div>
            <div className="  w-[90%] sm:w-1/2 text-center items-center sm:text-left">
              <textarea
                rows={4}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Improve Your Online Learning Experience Better Instantly"
                className="dark:text-white text-[#000000c7] bg-transparent border-none pl-8 w-full  1000px:text-[50px]  font-[500] font-Josefin py-2 leading-tight"
              ></textarea>
              <br />
              <textarea
                rows={4}
                value={subTitle}
                onChange={(e) => setsubTitle(e.target.value)}
                placeholder="We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them."
                className="dark:text-[#edfff4] text-[#000000ac] px-2 ml-7 font-Josefin font-[600] text-[18px] 1500px:!w-[90%] bg-transparent 1100px:!w-[78%]"
              ></textarea>

              <br />
              <br />
              <div
                className={`${
                  styles.button
                } !w-[120px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
                  data?.layout?.banner?.title != title ||
                  data?.layout?.banner?.subTitle !== subTitle ||
                  data?.layout?.banner?.image?.url !== image
                    ? "!cursor-pointer !bg-[#42d383]"
                    : "!cursor-not-allowed"
                } !rounded absolute bottom-12 right-12`}
                onClick={
                  data?.layout?.banner?.title != title ||
                  data?.layout?.banner?.subTitle != subTitle ||
                  data?.layout?.banner?.image?.url != image
                    ? handleEdit
                    : () => null
                }
              >
                Save
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
