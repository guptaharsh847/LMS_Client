import { styles } from "@/app/styles/styles";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard"

type Props = {};

export const reviews = [
  {
    name: "Marcus Garcia",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    profession: "Human Resources Specialist (Canada)",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's stpe specimen book. ",
      ratings:4
  },
  {
    name: "Louise Mckinney",
    avatar: "https://randomuser.me/api/portraits/women/24.jpg",
    profession: "Business Analyst (Brazil)",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      ratings:5
  },
  {
    name: "Erika Vargas",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    profession: "Marketing Manager (United Kingdom)",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it been the industry's standard dummy text ever since the 1500s,  to make a type specimen book. ",
      ratings:4.5
  },
  {
    name: "Todd Wallace",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    profession: "Cybersecurity Analyst (Japan)",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      ratings:4
  },
  {
    name: "Pauline Mccoy",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    profession: "Chief marketing officer (CMO)",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      ratings:5
  },
  {
    name: "HHaadr Mccoy",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    profession: "Chief marketing officer (CMO)",
    comment:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
      ratings:5
  },
  
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-4">
      <div className="w-full items-center 800px:flex">
        <div className="w-full 800px:w-[50%]">
          <Image
            src={require("../../../public/assets/business-img.png")}
            alt="reviews"
            width={600}
            height={600}
          />
        </div>
        <div className="w-full 800px:w-[50%] ">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students are {""}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Our Strength
            </span>{" "}
            <br />
            See What They Say About Us
          </h3>

          <p className={`${styles.label} font-[200] `}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book.
          </p>
        </div>
        <br />
        <br />
      </div>
        <div
          className={`grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-16 border-0 md:[&>*:nth-child(3)]:!mt-[-40px] `}
        >
          {reviews &&
            reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
        </div>
    </div>
  );
};

export default Reviews;
