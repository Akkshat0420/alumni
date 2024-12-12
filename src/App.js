
//import ReactDOM from 'react-dom';

import React from 'react';
//import HomePage from './components/homepage';
//import ProfilePage from './components/resume';
//import LeanCanvas from './components/lean';
import RoutePage from './components/root';

//import Login from './components/login';
//import RoutePage from './components/root';




// Import your components
//import RegisterStudent from './RegisterStudent';
//import Signup from './Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/navfile';
//import Navbar from './components/navfile';
//import LeanCanvas from './components/lean';
//import RoutePage from './components/root';
//import Profile from './Profile';

// Define the routes using createBrowserRouter


// Use RouterProvider at the root of your application
function App() {
    
 return(
    <div  className='App'>
    
   
    <CustomNavbar/>
    
    <main>  
    <RoutePage/>  
    </main>
  
   
     
    </div>
  );
}


export default App;
