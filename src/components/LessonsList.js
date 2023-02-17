import LessonLoader from "../components/LessonLoader";
import preview from "../images/video-preview-2.png";

function LessonsList({ lessons, status }) {
  return (
    <section className="lessons">
      <div className="lessons__wrapper">
        <div className="lessons__inner">
          {status === "loading"
            ? [...Array(8)].map((_, index) => {
                return <LessonLoader key={index} />;
              })
            : lessons.map((lesson) => {
                return (
                  <div className="lessons__item" key={lesson._id}>
                    <img src={preview} alt="" />
                    <div className="lessons__item-title">{lesson.title}</div>
                    <div className="lessons__item-content">
                      {lesson.content.length > 70 ? lesson.content.slice(0, 70) + "..." : lesson.content}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </section>
  );
}

export default LessonsList;
