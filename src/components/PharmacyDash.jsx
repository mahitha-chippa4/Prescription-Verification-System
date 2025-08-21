import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const hello=()=>{
  signOut(auth).catch((error) => console.error("Sign out error:", error));
}
function PharmacyDash() {
  return (
    <div>
      <button onClick={hello}>Logout</button>
    </div>
  )
}

export default PharmacyDash