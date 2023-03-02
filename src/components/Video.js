import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function Video({ lesson }) {
  const navigate = useNavigate();
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef(null);

  const handleRateChange = (e) => {
    setPlaybackRate(e.target.value);
    videoRef.current.playbackRate = e.target.value;
  };

  return (
    <>
      <div className="detail-video">
        <video controls="controls" controlsList="nodownload" ref={videoRef}>
          <source src={`http://localhost:4444${lesson.videoUrl}`} type="video/ogg; codecs=theora, vorbis"></source>
          <source
            src={`http://localhost:4444${lesson.videoUrl}`}
            type="video/mp4; codecs=avc1.42E01E, mp4a.40.2"
          ></source>
          <source src={`http://localhost:4444${lesson.videoUrl}`} type="video/webm; codecs=vp8, vorbis"></source>
          Тег video не поддерживается вашим браузером.
        </video>
        <div className="detail-video__content">
          <h1 className="detail-video__title">{lesson.title}</h1>
          <p className="detail-video__descr">{lesson.content}</p>
          <button onClick={() => navigate("/")} className="detail-video__back">
            Вернуться к списку уроков
          </button>
          <div className="detail-video__speed">
            <label htmlFor="rate">Скорость:</label>
            <input type="range" min="0.5" max="2" step="0.1" value={playbackRate} onChange={handleRateChange} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Video;
