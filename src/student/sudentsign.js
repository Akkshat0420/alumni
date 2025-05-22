import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
//import { auth, db } from './firebase';
import { auth,db } from '../components/firebase'; // your firebase config
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
 
const StudentAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '', phone: '', college: '' ,profileImage:''});
  const data=useParams('');
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // 🔐 Login
        await signInWithEmailAndPassword(auth, form.email, form.password);
        alert('Logged in successfully!');
         navigate('/student-signup');
      } else {
        // 📝 Signup
        const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
        const user = userCredential.user;

        const studentRef = doc(db, 'students', user.uid);
        await setDoc(studentRef, {
          name: form.name,
          email: form.email,
          phone: formatPhone(form.phone),
          college: form.college,
          profileImage:form.profileImage,
          type: 'user0',
          approved:false,
        });

        alert('Student registered successfully!');
         navigate('/student-signup');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const formatPhone = (phone) => {
    return phone.startsWith('+91') ? phone : `+91-${phone}`;
  };

  return (
    <div className="container py-5">
      <h2>{isLogin ? 'Student Login' : 'Student Signup'}</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="form-control mb-2"
            />
            <input
              type="text"
              name="college"
              placeholder="College Name"
              value={form.college}
              onChange={handleChange}
              required
              className="form-control mb-2"
            />
             <input
              type="text"
              name="imageurl"
              placeholder="Profile Image"
              value={form.profileImage}
              onChange={handleChange}
              required
              className="form-control mb-2"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="form-control mb-2"
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">
          {isLogin ? 'Login' : 'Signup'}
        </button>
      </form>
      <button className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Signup" : 'Already registered? Login'}
      </button>
    </div>
  );
};

export default StudentAuth;
