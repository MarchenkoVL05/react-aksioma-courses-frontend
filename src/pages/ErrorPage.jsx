import { useRouteError } from "react-router-dom";
import notFound from "../images/404.png";

import "../App.scss";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <img src={notFound} alt="" />
      <h1>Упс!</h1>
      <p>Кажется такой страницы у нас нет</p>
    </div>
  );
}
