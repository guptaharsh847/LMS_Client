import { styles } from "@/app/styles/styles";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";

type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}: Props) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");

  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation();
  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const [
    addAnswerInQuestion,
    {
      isSuccess: successAnswer,
      error: errorAnswer,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();
  const course = courseData?.course;
  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );
  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();
  const [
    addReplyInReview,
    {
      isSuccess: successReplyInReview,
      error: errorReplyInReview,
      isLoading: replyInReviewCreationLoading,
    },
  ] = useAddReplyInReviewMutation();

  const handleQuestion = (e: any) => {
    if (question.length === 0) {
      toast.error("Question cannot be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();

      toast.success("Question added successfully");
    }
    if (successAnswer) {
      setAnswer("");
      refetch();
      toast.success("Reply added successfully");
    }
    if (reviewSuccess) {
      setReview("");
      setRating(0);
      courseRefetch();
      toast.success("Review added successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (errorAnswer) {
      if ("data" in errorAnswer) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (successReplyInReview) {
      setReply("");
      toast.success("Reply added successfully");
      // refetch();
      courseRefetch();
    }
    if (errorReplyInReview) {
      if ("data" in errorReplyInReview) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    isSuccess,
    error,
    errorAnswer,
    successAnswer,
    reviewSuccess,
    reviewError,
    successReplyInReview,
    errorReplyInReview,
  ]);

  const handleAnswerSubmit = (e: any) => {
    // answer,
    // courseId,
    // contentId,
    // questionId,
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };

  const handleReview = (e: any) => {
    if (review.length === 0) {
      toast.error("Review cannot be empty");
    } else {
      if (isReviewExists) {
        toast.error("You have already submitted a review");
      } else {
        addReviewInCourse({
          courseId: id,
          review,
          rating,
        });
      }
    }
  };
  const handleReviewReply = (e: any) => {
    if (!replyInReviewCreationLoading) {
      if (reply.length === 0) {
        toast.error("Reply cannot be empty");
      } else {
        
        // console.log(reply);
        // console.log(reviewId);
        // console.log(id);
        addReplyInReview({
          comment: reply,
          reviewId,
          courseId: id,
        });
      }
    }
  };
  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="flex justify-between items-center w-full my-3">
        <div
          className={`${
            styles.button
          } text-white !w-[unset] dark:text-white !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2 text-white" />
          Prev Lesson
        </div>
        <div
          className={`${
            styles.button
          } !w-[unset] text-white dark:text-white !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          <AiOutlineArrowRight className="mr-2 text-white dark:text-white" />
          Next Lesson
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] text-black dark:text-white">
        {data[activeVideo].title}
      </h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-800 dark:bg-slate-800  bg-opacity-20 font-[500] backdrop-blur shadow-[bg-slate-700] text-black dark:text-white  rounded shadow-inner">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            key={index}
            className={`800px: text-[20px] cursor-pointer ${
              activeBar === index && "text-red-500"
            }`}
            onClick={() => setActiveBar(index)}
          >
            {text}
          </h5>
        ))}
      </div>
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 text-black dark:text-white">
          {data[activeVideo].description}
        </p>
      )}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5">
              <h2 className="800px:text-[20px] 800px:inline-block text-black dark:text-white">
                {item.title && item.title + ":"}
              </h2>
              <a
                href={item.url}
                className="800px:text-[20px] inline-block 800px:pl-2 text-[#4395c4]"
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {activeBar === 2 && (
        <>
          <div className="flex w-full mt-2">
            <Image
              src={user.avatar ? user.avatar.url : "/LMS_Client/public/assets/avatar.png"}
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full w-[50px] h-[50px] object-cover"
            />
            <textarea
              id=""
              name=""
              cols={40}
              rows={5}
              className="800px:w-full w-[80%] 800px:text-[18px] bg-transparent ml-3 border border-[#ffffff57] p-2 rounded outline-none font-Poppins text-black dark:text-white "
              placeholder="Write Your Questions"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-no-drop"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </>
      )}
      {activeBar === 3 && (
        <div className="w-full pt-2">
          <>
            {!isReviewExists && (
              <>
                <div className="w-full flex">
                  <Image
                    src={user.avatar ? user.avatar.url : "/images/avatar.png"}
                    alt="avatar"
                    width={50}
                    height={50}
                    className="rounded-full w-[50px] h-[50px] object-cover"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] text-black dark:text-white">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            size={25}
                            color="rgb(246,186,0)"
                            className="mr-1 cursor-pointer"
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            size={25}
                            color="rgb(246,186,0)"
                            className="mr-1 cursor-pointer"
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      id=""
                      name=""
                      cols={40}
                      rows={5}
                      className="800px:w-full w-[95%] 800px:text-[18px] bg-transparent ml-3 border border-[#ffffff57] p-2 rounded outline-none font-Poppins text-black dark:text-white "
                      placeholder="Write Your Comment"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${
                      styles.button
                    } !w-[120px] !h-[40px] text-[18px] mt-5  mr-0
                    ${reviewCreationLoading && "cursor-no-drop"}`}
                    onClick={reviewCreationLoading ? () => {} : handleReview}
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
            <div className="w-full">
              {(course?.reviews && [...course.reviews].reverse())?.map(
                (item: any, index: number) => (
                  <div className="w-full my-4">
                    <div className="w-full flex mb-2">
                      <div>
                        <Image
                          src={
                            item?.user.avatar
                              ? item?.user.avatar.url
                              : "/images/avatar.png"
                          }
                          alt="avatar"
                          width={50}
                          height={50}
                          className="rounded-full w-[50px] h-[50px] object-cover"
                        />
                      </div>
                      <div className="pl-3  text-black dark:text-white">
                        <h1 className="text-[20px] text-black dark:text-white">
                          {item?.user.name}
                        </h1>
                        <Ratings rating={item.rating} />
                        <p>{item?.comment}</p>
                        <small className="text-[#0e0d0dd2]  dark:text-white">
                          {format(item?.createdAt)}•
                        </small>
                      </div>
                    </div>
                    {user.role === "admin" && (
                      <span
                        className={`${styles.label} !ml-10  cursor-pointer dark:text-white text-black`}
                        onClick={() => {
                          setIsReviewReply(true), setReviewId(item._id);
                        }}
                      >
                        Add Reply
                      </span>
                    )}
                    {isReviewReply && (
                      <div className="w-full flex relative">
                        <input
                          type="text"
                          className={`800px:ml-12 w-[95%] 800px:text-[16px] bg-transparent ml-3 border border-[#00000027] p-[5px]  outline-none font-Poppins text-black dark:text-white `}
                          placeholder="Write Your reply"
                          value={reply}
                          onChange={(e: any) => {
                            setReply(e.target.value);
                          }}
                        />
                        <button
                          type="submit"
                          className="absolute right-0 bottom-1 text-black dark:text-white"
                          onClick={handleReviewReply}
                          // disabled={}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                    {(item?.commentReplies && [...item?.commentReplies])
          ?.reverse().map((item: any, index: number) => (
                      <div className="w-full flex 800px:ml-16 my-5 ">
                        <div className="w-[50px] h-[50px]">
                         
                            <Image
                              src={
                                item?.user.avatar
                                  ? item?.user.avatar.url
                                  : "/LMS_Client/public/assets/avatar.png"
                              }
                              alt="avatar"
                              width={50}
                              height={50}
                              className="rounded-full w-[50px] h-[50px] object-cover"
                            />
                          </div>
                          <div className="pl-2  text-black dark:text-white">
                            <h5 className="text-[20px] text-black dark:text-white">
                              {item?.user.name}
                            </h5>
                            <p>{item.comment}</p>
                            <small className="text-[#ffffff83]">
                              {format(item?.createdAt)}•
                            </small>
                          </div>
                        
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {(data[activeVideo]?.questions && [...data[activeVideo]?.questions])
          ?.reverse()
          .map((item: any, index: number) => (
            <CommentItem
              key={index}
              item={item}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              data={data}
              activeVideo={activeVideo}
              index={index}
              answerCreationLoading={answerCreationLoading}
            />
          ))}
      </div>
    </>
  );
};
const CommentItem = ({
  item,
  answer,
  setAnswer,
  handleAnswerSubmit,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div>
            <Image
              src={
                item?.user.avatar ? item?.user.avatar.url : "/images/avatar.png"
              }
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full w-[50px] h-[50px] object-cover"
            />
          </div>
          <div className="pl-3  text-black dark:text-white">
            <h5 className="text-[20px] text-black dark:text-white">
              {item?.user.name}
            </h5>
            <p>{item?.question}</p>
            <small className="text-[#0e0d0dd2]  dark:text-white">
              {format(item?.createdAt)}•
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <span
            className="mr-2 cursor-pointer text-black dark:text-[#ffffff83] 800px:pl-16"
            onClick={() => {
              setReplyActive(!replyActive), setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className="cursor-pointer text-black dark:text-white"
          />
          <span className="pl-1 mt-[-4px] cursor-pointer text-black  dark:text-[#ffffff83]">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && (
          <>
            {item.questionReplies.map((item: any, index: number) => (
              <div className="my-5 w-full flex 800px:ml-16 text-black dark:text-white">
                <div>
                  <Image
                    src={
                      item.user.avatar
                        ? item.user.avatar.url
                        : "/images/avatar.png"
                    }
                    alt="avatar"
                    width={50}
                    height={50}
                    className="rounded-full w-[50px] h-[50px] object-cover"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px] text-black dark:text-white">
                      {item?.user.name}
                    </h5>
                    {item.user.role === "admin" && (
                      <VscVerifiedFilled className="text-[#4ff774] ml-2 text-[20px]" />
                    )}
                  </div>
                  <p>{item?.answer}</p>
                  <small className="text-[#0e0d0dd2]  dark:text-white">
                    {format(item?.createdAt)}•
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative">
                <input
                  type="text"
                  className={`${
                    answer === "" ||
                    (answerCreationLoading && "cursor-not-allowed")
                  }800px:ml-12 w-[95%] 800px:text-[16px] bg-transparent ml-3 border border-[#00000027] p-[5px]  outline-none font-Poppins text-black dark:text-white `}
                  placeholder="Write Your reply"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-1 text-black dark:text-white"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerCreationLoading}
                >
                  Submit
                </button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};
export default CourseContentMedia;
