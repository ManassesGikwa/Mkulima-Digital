import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';
import App from './components/App';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Authors from './pages/Authors';
import CreatePost from './pages/CreatePost';
import AuthorPosts from './pages/AuthorPosts';
import Solutions from './pages/Solutions';
import Posts from './components/Posts';
import Community from './pages/Community';
import Careers from './pages/Careers';
import Finance from './pages/Finance';
import Support from './pages/Support';
import CommunityDetails from './pages/CommunityDetails';


const router = createBrowserRouter([
  {
    path: "*", // Change the path here
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />},
      {path: "posts/:id", element: <PostDetail />},
      {path: "solutions", element: <Solutions />},
      {path: "blogs", element: <Posts />},
      {path: "community", element: <Community />},
      {path: "careers", element: <Careers />},
      {path: "finance", element: <Finance />},
      // {path: "register", element: <Register />},
      {path: "support", element: <Support />},
      // {path: "login", element: <Login />},
      // {path: "profile/:id", element: <UserProfile />},
      {path: "authors", element: <Authors />},
      {path: "create", element: <CreatePost/>},
      {path: "posts/users/:id", element: <AuthorPosts />},
      {path: "community/:id", element: <CommunityDetails />}
      // {path: "myposts/:id", element: <Dashboard />},
      // {path: "posts/:id/edit", element: <EditPost />},
      // {path: "posts/:id/delete", element: <DeletePost />},
      // {path: "logout", element: <Logout />},
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
