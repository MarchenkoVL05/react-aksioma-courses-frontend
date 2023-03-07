import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeLesson } from "../redux/slices/lessonSlice";

import preview from "../images/video-preview.png";
import remove from "../images/removeLesson.svg";

function LessonCard({ userInfo, lesson, setIsRemoveClicked }) {
  const dispatch = useDispatch();

  const handleRemoveLesson = (lessonId) => {
    let confirmRemoving = window.confirm("Вы уверены что хотите удалить этот урок?");
    if (confirmRemoving) {
      dispatch(removeLesson(lessonId));
      setIsRemoveClicked(true);
    } else {
      return;
    }
  };

  return (
    <div className="lessons__item" key={lesson._id}>
      {userInfo.role == "admin" && (
        <button onClick={() => handleRemoveLesson(lesson._id)} className="lessons__item-remove" type="button">
          <img src={remove} />
        </button>
      )}
      <Link to={`/lesson/${lesson._id}`} className="lessons__item-link-wrapper">
        <img
          className="lessons__item-preview"
          src={lesson.thumbnail ? `http://localhost:4444${lesson.thumbnail}` : preview}
          alt=""
        />
        <div className="lessons__item-title">{lesson.title}</div>
        <div className="lessons__item-content">
          {lesson.content.length > 70 ? lesson.content.slice(0, 70) + "..." : lesson.content}
        </div>
      </Link>
    </div>
  );
}

export default LessonCard;
