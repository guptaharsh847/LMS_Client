import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl,title }) => {
  const [videoData, setVideoData] = useState({
    otp: "",
    playbackInfo: "",
  });

  useEffect(() => {
    console.log(videoUrl);
    axios
      .post(`http://localhost:8000/api/v1/getVdoCipherOTP`, {
        videoId: videoUrl,
      })
      .then((res: any) => {
        setVideoData(res.data);
        console.log(videoUrl);
console.log(videoData.playbackInfo);
      });
  }, [videoUrl]);

  return (
    <div className="pt-[41%] relative">
      {videoData.playbackInfo !== "" && videoData.otp && (
        <iframe
          width="90%"
          height="100%"
          src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=LSZYgpxu3snLbUix`}
          className="absolute top-0 border-0 w-[90%] h-[100%]  left-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
