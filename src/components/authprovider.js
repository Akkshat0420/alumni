import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase"; // Ensure db is your Firestore instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        let userData = null;

        try {
          // Check in students collection
          const studentRef = doc(db, "users", uid);
          const studentSnap = await getDoc(studentRef);

          if (studentSnap.exists()) {
            userData = {
              ...studentSnap.data(),
              uid,
              type: "student",
            };
          } else {

            // If not found in students, check in colleges
            
            const collegeRef = doc(db, "college", uid);
            const collegeSnap = await getDoc(collegeRef);

            if (collegeSnap.exists()) {
              userData = {
                ...collegeSnap.data(),
                uid,
                type: "college",
              };
            }
            else{
              const stuRef = doc(db, "students", uid);
            const collegeSnap = await getDoc(stuRef);
             if (collegeSnap.exists()) {
              userData = {
                ...collegeSnap.data(),
                uid,
                type: "student0",
              };
            }
            }
          }
        } catch (error) {
          console.error("Error determining user type:", error);
        }

        setUser(userData);
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

