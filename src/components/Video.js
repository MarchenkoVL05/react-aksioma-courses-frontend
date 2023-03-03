import { useNavigate } from "react-router-dom";

import Plyr from "plyr-react";
import "plyr-react/plyr.css";

function Video({ lesson }) {
  const navigate = useNavigate();

  const plyrProps = {
    source: {
      type: "video",
      title: "video",
      sources: [
        {
          src: `http://localhost:4444${lesson.videoUrl}`,
          type: "video/mp4",
          size: 1080,
        },
      ],
    },
    options: {
      settings: ["captions", "quality", "speed", "loop"],
      disableContextMenu: true,
      quality: { default: 576, options: [1080, 720, 576, 480, 360, 240] },
    },
    style: {
      width: "100%",
      height: "400px",
    },
  };

  return (
    <>
      <div className="detail-video">
        <Plyr {...plyrProps} />
        <div className="detail-video__content">
          <h1 className="detail-video__title">{lesson.title}</h1>
          <p className="detail-video__descr">{lesson.content}</p>
          <button onClick={() => navigate("/")} className="detail-video__back">
            Вернуться к списку уроков
          </button>
        </div>
      </div>
    </>
  );
}

export default Video;
