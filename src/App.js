
//import ReactDOM from 'react-dom';

import React from 'react';
//import HomePage from './components/homepage';
//import ProfilePage from './components/resume';
//import LeanCanvas from './components/lean';
//import RoutePage from './components/root';

//import Login from './components/login';
//import RoutePage from './components/root';




// Import your components
//import RegisterStudent from './RegisterStudent';
//import Signup from './Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/navfile';
//import VirtualMeetingPage from './components/creatvitual';
//import ProfilePage from './components/resume';
//import Navbar from './components/navfile';
//import LeanCanvas from './components/lean';
import RoutePage from './components/root';
//import CollegeSignup from './Admin/signCollege';
//import Signup from './Admin/signCollege';
//import CollegeDashboard from './Admin/dashboard';
//import Profile from './Profile';
import { BrowserRouter } from 'react-router-dom';
// Define the routes using createBrowserRouter


// Use RouterProvider at the root of your application
function App() {
    
 return(
    <div  className='App'>
    
   <BrowserRouter>
    <CustomNavbar/>
    </BrowserRouter>
    <main>  
    <RoutePage/>  
    {/* <VirtualMeetingPage/>
    */}
  {/* <CollegeDashboard/> */}
  {/* <Signup/> */}
  {/* <CollegeSignup/> */}
    </main>
  
   
     
    </div>
  );
}


export default App;
