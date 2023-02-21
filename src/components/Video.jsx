import React from "react";
import { useNavigate } from "react-router-dom";

function Video({ lesson }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="detail-video">
        <video width="1067" height="540" controls="controls" poster="video/duel.jpg">
          <source src="video/duel.ogv" type='video/ogg; codecs="theora, vorbis"'></source>
          <source src="video/duel.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></source>
          <source src="video/duel.webm" type='video/webm; codecs="vp8, vorbis"'></source>
          Тег video не поддерживается вашим браузером.
        </video>
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
