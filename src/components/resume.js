import React from 'react';

const ProfilePage = () => {
  return (
    <div className="container my-2">
      <div className="card shadow-lg p-4">
        <header className="text-center">
          <h1>Akkshat kumar Gautam</h1>
          <p>
            <a href="mailto:gakkshat1198@gmail.com">gakkshat1198@gmail.com</a> | Mobile: +91 8960466711
          </p>
          <p>
            <a href="https://github.com/Akkshat0420">Akkshat0420 (GitHub)</a> | 
            <a href="https://www.linkedin.com/in/akkshat-kumar-gautam-93b392226"> Akkshat (LinkedIn)</a>
          </p>
        </header>

        <section className="my-4">
          <h3>EDUCATION</h3>
          <p><strong>Kanpur Institute of Technology</strong>, Kanpur, India</p>
          <p>Bachelor of Technology : Computer Science & Engineering; GPA: 7.8 (November 2021..)</p>
          <p><strong>Vivekanand S S M Inter College</strong>, Unnao, India</p>
          <p>Intermediate; Percantage: 79% (June 2019 - August 2020)</p>
          <p>HighSchool; Percantage: 86.33% (June 2017 - August 2018)</p>
          
          
        </section>

        <section className="my-4">
          <h3>SKILLS SUMMARY</h3>
          <ul>
            <li><strong>Languages:</strong> Python, SQL, Javscript,Dart</li>
            <li><strong>Frameworks:</strong> Flutter, Numpy ,Matplotlib,Django,Express,React(Library)</li>
            <li><strong>Tools:</strong>  FireBase, PowerPoint, MongoDb, MySQL, SQLite</li>
            <li><strong>Platforms:</strong> PyCharm, Visual Studio Code</li>
            
          </ul>
        </section>
        
        

        <section className="my-4">
          <h3>PROJECTS</h3>
          <div className="mb-3">
            <h5>Attandance with Face Recognisition | LINK <span className="float-right">October 23 - November 2023</span></h5>
            <p>
            I developed a Face Recognition system using Python and the OpenCV module, integrated with MySQL to store and manage student entry data. This system ensures efficient and accurate identification while maintaining a robust database of student records.</p>
          </div>
          <div className="mb-3">
            <h5>Simple Tweet website | LINK <span className="float-right">april 2024 - May 2024</span></h5>
            <p>Using Django, HTML, and Bootstrap, I created a simplified version of a Twitter-like website. Users can post tweets and view tweets from others in an interactive, responsive interface. The application focuses on core functionality for seamless user engagement.</p>
          </div>
          
          <div className="mb-3">
            <h5>Vegan Resturant App| LINK <span className="float-right">September 2024 - October 2024</span></h5>
            <p>In this project, I used Flutter and Firebase to develop a system where users can place orders through a user app. The restaurant app receives notifications for new orders, allowing staff to accept or reject them, and the corresponding status updates are sent as notifications to the user app. </p>
          </div>
          <div>
          <p> I am currently developing an Alumni Association platform as both a web and mobile application, utilizing the MERN stack and Flutter. This platform includes a comprehensive Alumni Repository, allowing alumni to connect and engage. It also features a Job Portal for career opportunities, a Donation Portal to support projects, Event Announcements for alumni gatherings, and a Feedback system to gather insights and improve engagement. </p>
          </div>
        </section>
        <section className="my-4">
          <h3>CERTIFICATIONS</h3>
          <div className="mb-3">
            <h5>2nd Position in Startup Nexus 2024 <span className="float-right"></span></h5>
            <p>Achieved second place in the prestigious Startup Nexus 2024 competition, showcasing innovative business ideas and solutions.
            </p>
          </div>
          <div className="mb-3">
            <h5>Innovation Design and Entrepreneurship Certification by AICTE <span className="float-right"></span></h5>
            <p>Completed a certification program focused on fostering innovation, design thinking, and entrepreneurial skills, conducted by the All India Council for Technical Education (AICTE).</p>
          </div>
          
         
         
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
