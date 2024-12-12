// frontend/src/components/RegisterStudent.js
import React from 'react';
//import { useState } from 'react';
//import axios from 'axios'


const RegisterStudent = () => {
  
 /* const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const response = await axios.post('http://localhost:3001/students', student);
      setMessage(response.data.message);
      setStudent({ name: '', email: '', age: '' }); // Reset form
    } catch (error) {
      setMessage('Error: ' + error.response.data.error);
    }
  };*/

  return (
    <div>
     
      <h2 class='dispaly-1'>Register Student  </h2>
      <form >
        <input
          type="text"
          name="name"
          placeholder="Name"
         
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          
          
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          
        />
        <button type="submit">Register</button>
      </form>
      
    </div>
  );
};

export default RegisterStudent;
