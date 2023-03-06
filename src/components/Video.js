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
        },
      ],
    },
    options: {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
      disableContextMenu: true,
      fullscreen: {
        enabled: true,
        fallback: true,
        iosNative: true,
      },
    },
  };

  return (
    <>
      <div className="detail-video">
        <div className="detail-video__container">
          <Plyr {...plyrProps} />
        </div>
        <div className="detail-video__content">
          <h1 className="detail-video__title">{lesson.title}</h1>
          <div className="detail-video__department">{lesson.categoryId.categoryName}</div>
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
