import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Signup";
import Login from "./login";
import Profile from "./profile";
//import PostsPage1 from "./postlist";
//import PostPage from "./post";
import { AuthProvider } from "./authprovider";
//import ProtectedRoute from "./ProtectedRoute";
import ProtectedRoute from "./protect";
import DonationPage from "./donationation";
import ProjectListPage from "./donationlist";
import HomePage1 from "./home";
import EmailForm from "./eventscre";
import EventsList from "./eventlist";
import JobPostForm from "./jobportal";
import CollegeMeetingForm from "./creatvitual";
import CollegeDashboard from "../Admin/dashboard";
import CollegeSignup from "../Admin/signCollege";
import CollegeProfile from "../Admin/collegeprofile";
import CollegeView from "../Admin/collegeveiw";
import CollegeSelector from "../Admin/startpage";
import CreatePost from "./post";
import StudentCorner from "../student/studentcorner";
import StudentAuth from "../student/sudentsign";
import CollegeMeetings from "../Admin/fetchvirtual";
import About from "../Admin/aboutus";
import ContactUs from "../Admin/contactus";
import HelpDesk from "../Admin/helpdesk";
import Feedback from "../Admin/feedback";
//import { useLocation } from "react-router-dom";
const router = createBrowserRouter([
   {
    path: "/",
    element: (
      
        <CollegeSelector/>

     
    ),
  },
  {
    path: ":shortName-alumni",
    element: (
      
        <CollegeView/>

     
    ),
  },
  {
    path: "/sharedexp",
    element: (
      <ProtectedRoute >
        <HomePage1/>

      </ProtectedRoute>
    ),
  },
  {
    path: "/post1",
    element: (
      <ProtectedRoute >
        <CreatePost/>

      </ProtectedRoute>
    ),
  },
 
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signup1",
    element: <CollegeSignup/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
       <StudentCorner/>
      </ProtectedRoute>
    ),
  },
   {
    path: "/events",
    element: (
      
       <EventsList/>
     
    ),
  },
{
    path: "/about",
    element: (
     <About/>
     
    ),
  },
  {
    path: "/contact",
    element: (
      
     <ContactUs/>
     
    ),
  },
  {
    path: "/help-desk",
    element: (
      
      <HelpDesk/>
    ),
  },
   {
    path: "/feedback",
    element: (
      
      <Feedback/>
    ),
  },
    {
    path: "/alumni-profile",
    element: (
      <ProtectedRoute requiredType={'student'}>
        <Profile />
      </ProtectedRoute>
    ),
  },
    {
    path: "/college-profile",
    element: (
      <ProtectedRoute requiredTyp={'college'}>
        <CollegeProfile/>
      </ProtectedRoute>
    ),
  },
   {
    path: "/student-corner",
    element: (
     
       <StudentCorner/>
      
    ),
  },
   {
    path: "/student-signup",
    element: (
      
       <StudentAuth/>
     
    ),
  },
  // {
  //   path: "/post1",
  //   element: (
  //     <ProtectedRoute>
  //       <PostPage />
  //     </ProtectedRoute>
  //   ),
  // },
   {
    path: "/dashboard/po" ,
    element: (
      <ProtectedRoute requiredType="college">
        <HomePage1/>
      </ProtectedRoute>
    ),
  },
  
 
 
   {
    path: "/create-event",
    element: (
      <ProtectedRoute requiredType={'college'}>
        <EmailForm/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/donation-create",
    element: (
      <ProtectedRoute requiredType={'college'} >
        <DonationPage/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/donation",
    element: (
     
      <ProjectListPage/>  
     
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
  {
    path: "/share-opportunities",
    element: (
      
       <JobPostForm/>
     
    ),
  },
  {
    path: "/create-virtual",
    element: (
      <ProtectedRoute  >
        <CollegeMeetingForm/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/virtual-meetings",
    element: (
      <ProtectedRoute  >
        <CollegeMeetings/>
      </ProtectedRoute>
    ),
  },
    {
    path: "/post-job",
    element: (
      <ProtectedRoute>
       <JobPostForm/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute requiredType="college">
        <CollegeDashboard/>
      </ProtectedRoute>
    ),
  }
]);

const RoutePage = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default RoutePage;
