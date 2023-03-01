import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import AuthPage from './pages/AuthPage';
import LessonPage from './pages/LessonPage';
import CreatePage from './pages/CreatePage';

import './App.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/register',
    element: <AuthPage register={true} />,
  },
  {
    path: '/login',
    element: <AuthPage register={false} />,
  },
  {
    path: 'lesson/:lessonId',
    element: <LessonPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/create',
    element: <CreatePage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
