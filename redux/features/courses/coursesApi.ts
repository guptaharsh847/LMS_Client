import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCoursesAdmin: builder.query({
      query: () => ({
        url: "/get-course-admin",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ data, id }) => ({
        url: `/edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "/get-allcourse",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `/get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `/get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      })
    }),
    addNewQuestion: builder.mutation({
      query: ({question, courseId, contentId }) => ({

        url: "/add-question",
        method: "PUT",
        body: {question, courseId, contentId},
        credentials: "include" as const,
      })
    }),
    addAnswerInQuestion: builder.mutation({
      query: ({answer,questionId, courseId, contentId }) => ({

        url: "/add-answer",
        method: "PUT",
        body: {answer,questionId, courseId, contentId},
        credentials: "include" as const,
      })
    }),
    addReviewInCourse: builder.mutation({
      query: ({review,rating,courseId}) => ({

        url:  `/add-review/${courseId}`,
        method: "PUT",
        body: {review,rating},
        credentials: "include" as const,
      })
    }),
    addReplyInReview: builder.mutation({
      query: ({comment, courseId, reviewId}:any ) => ({

        url:  `/add-review-reply`,
        method: "PUT",
        body: {comment, courseId, reviewId},
        credentials: "include" as const,
      })
    }),
  }),
});
export const {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetAllCoursesAdminQuery,
  useGetAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddReviewInCourseMutation,
  useAddReplyInReviewMutation,

} = courseApi;
