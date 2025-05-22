import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProfilePage = () => {
  return (
    <div className="container my-4">
      <div className="card shadow p-4">
        <header className="text-center mb-4">
          <h1 className="fw-bold">Akkshat Kumar Gautam</h1>
          <p className="mb-1">
            <a href="mailto:gakkshat1198@gmail.com" className="text-primary text-decoration-underline">
              gakkshat1198@gmail.com
            </a>{' '}
            | Mobile: +91 8960466711
          </p>
          <p>
            <a
              href="https://github.com/Akkshat0420"
              className="text-primary text-decoration-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub: Akkshat0420
            </a>{' '}
            |{' '}
            <a
              href="https://www.linkedin.com/in/akkshat-kumar-gautam-93b392226"
              className="text-primary text-decoration-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn: Akkshat
            </a>
          </p>
        </header>

        <section className="mb-4">
          <h3 className="fw-semibold border-bottom pb-1">Professional Summary</h3>
          <p>
            Motivated <strong>Full-Stack & App Developer</strong> focusing on <strong>Flutter</strong> and <strong>Firebase</strong>,
            with foundations in <strong>React.js</strong>, <strong>Next.js</strong>, <strong>Node.js</strong>, and <strong>MongoDB</strong>.
            Gained hands-on experience through academic and personal projects including <strong>repairing and selling platforms</strong>,
            <strong>stock dashboards</strong>, and <strong>alumni portals</strong>. Passionate about real-world solutions,
            problem-solving, and continuous learning.
          </p>
        </section>

        <section className="mb-4">
          <h3 className="fw-semibold border-bottom pb-1">Education</h3>
          <p><strong>Kanpur Institute of Technology</strong>, Kanpur, India</p>
          <p>B.Tech in Computer Science & Engineering | GPA: 7.8 | Nov 2021 – Present</p>
          <p><strong>Vivekanand S S M Inter College</strong>, Unnao, India</p>
          <p>Intermediate: 79% (2019 - 2020) | High School: 86.33% (2017 - 2018)</p>
        </section>

        <section className="mb-4">
          <h3 className="fw-semibold border-bottom pb-1">Technical Skills</h3>
          <ul className="list-unstyled">
            <li><strong>Languages:</strong> Dart, JavaScript, Python</li>
            <li><strong>Mobile Development:</strong> Flutter, Firebase, REST APIs, Push Notifications</li>
            <li><strong>Backend & Web:</strong> Node.js, Express.js, Django, MongoDB Atlas (Configration)</li>
           
            <li><strong>Tools:</strong>  GitHub, VS Code, PyCharm, Postman</li>
            <li><strong>Platforms:</strong>  Firebase Console, Flutter </li>
          </ul>
        </section>

        <section className="mb-4">
          <h3 className="fw-semibold border-bottom pb-1">Project Experience</h3>

          <div className="mb-3">
            <h5 className="fw-bold ">
              Vegan Restaurant App <small className="text-muted">| Flutter + Firebase</small>
              <span className="float-end text-secondary fw-normal">Sep 2024 – Oct 2024</span>
            </h5>
            <p>
              Built a real-time restaurant ordering app with Flutter. Customers could place and track orders via Firebase Cloud Messaging.
              Admin panel supported request management. Used state management and Firestore for scalable architecture.
            </p>
          </div>

          <div className="mb-3">
            <h5 className="fw-bold ">
              Alumni Association App <small className="text-muted">| Flutter + MERN Stack</small>
              <span className="float-end text-secondary fw-normal">Ongoing</span>
            </h5>
            <p>
              Cross-platform portal with features like alumni registration, event announcements, job posts, and donations.
              Designed for smooth navigation and modular architecture.
            </p>
          </div>

          <div className="mb-3">
            <h5 className="fw-bold ">
              Attendance System <small className="text-muted">| Python + MySQL</small>
              <span className="float-end text-secondary fw-normal">Oct 2023 – Nov 2023</span>
            </h5>
            <p>
              Desktop app using OpenCV for face-based attendance. Integrated MySQL for logging real-time data and improving accuracy.
            </p>
          </div>

          <div className="mb-3">
            <h5 className="fw-bold ">
              Twitter Lite <small className="text-muted">| Django + Bootstrap</small>
              <span className="float-end text-secondary fw-normal">Apr 2024 – May 2024</span>
            </h5>
            <p>
              Mini Twitter clone with tweet posting and login features. Emphasized clean UI and responsive layout using Bootstrap.
            </p>
          </div>
        </section>

        <section className="mb-4">
          <h3 className="fw-semibold border-bottom pb-1">Certifications</h3>
          <ul>
            <li><strong>Startup Nexus 2024 – 2nd Place:</strong> Presented a Flutter-based startup idea with real-world value.</li>
            <li><strong>AICTE Innovation & Design Thinking:</strong> Certified in entrepreneurship, agile UI/UX thinking, and lean startup strategy.</li>
          </ul>
        </section>

       
      </div>
    </div>
  );
};

export default ProfilePage;
