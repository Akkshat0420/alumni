import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Signup";
import Login from "./login";
import Profile from "./profile";
//import PostsPage1 from "./postlist";
import PostPage from "./post";
import { AuthProvider } from "./authprovider";
//import ProtectedRoute from "./ProtectedRoute";
import EmailForm from "./eventscre";
import EventsList from "./eventlist";
import ProtectedRoute from "./protect";
import DonationPage from "./donationation";
import ProjectListPage from "./donationlist";
import HomePage1 from "./home";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage1/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/post",
    element: (
      <ProtectedRoute>
        <PostPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/donation",
    element: (
      <ProtectedRoute>
        <DonationPage/>
      </ProtectedRoute>
    ),
  },
   {
    path: "/events",
    element: (
      <ProtectedRoute>
        <EmailForm/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/eventslist",
    element: (
      <ProtectedRoute>
        <EventsList/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/projects",
    element: (
      <ProtectedRoute>
        <ProjectListPage/>
      </ProtectedRoute>
    ),
  },
]);

const RoutePage = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default RoutePage;
