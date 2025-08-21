import { Navigate } from "react-router-dom";
import { auth } from "../../firebaseConfig"; // Adjust path based on your structure
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";

function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (!currentUser) {
        // If there's no user, force a logout to clear any session
        signOut(auth).catch((error) => console.error("Sign out error:", error));
      }
      setUser(currentUser);
      console.log(currentUser)
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  // If no user, redirect to home and ensure logout
  return user ? children : <Navigate to="/" />;
}

export default PrivateRoute;
