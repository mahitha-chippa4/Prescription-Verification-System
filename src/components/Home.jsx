// import React from "react";
// import { Stethoscope, User, Pill as Pills, ArrowRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const navigate = useNavigate();
//   const userTypes = [
//     {
//       type: "Doctor",
//       icon: Stethoscope,
//       description: "Medical Professional",
//     },
//     {
//       type: "Patient",
//       icon: User,
//       description: "General User",
//     },
//     {
//       type: "Pharmacist",
//       icon: Pills,
//       description: "Pharmacy Professional",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-sage-50">
//       <div className="container mx-auto px-4 py-16">
//         <div className="text-center mb-16 animate-fade-in">
//           <h1 className="text-4xl md:text-6xl font-bold text-emerald-900 mb-4">
//             Prescription Verification System
//           </h1>
//           <p className="text-lg text-emerald-700">
//             Select your role to continue
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//           {userTypes.map((userType) => (
//             <button
//               key={userType.type}
//               className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-emerald-50"
//             >
//               <div className="flex flex-col items-center space-y-4" onClick={()=>{
//                 navigate(`/${userType.type}`)
//               }}>
//                 <div className="p-4 rounded-full bg-sage-100 group-hover:bg-sage-200 transition-colors">
//                   <userType.icon className="w-8 h-8 text-emerald-700" />
//                 </div>
//                 <h2 className="text-2xl font-semibold text-emerald-900">
//                   {userType.type}
//                 </h2>
//                 <p className="text-emerald-600">{userType.description}</p>
//                 <ArrowRight className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
//               </div>
//               <div className="absolute inset-0 border-2 border-transparent hover:border-emerald-200 rounded-2xl transition-colors duration-300" />
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;


import React from "react";
import { Stethoscope, User, Pill as Pills, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const userTypes = [
    {
      type: "Doctor",
      icon: Stethoscope,
      description: "Medical Professional",
    },
    {
      type: "Patient",
      icon: User,
      description: "General User",
    },
    {
      type: "Pharmacist",
      icon: Pills,
      description: "Pharmacy Professional",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-sage-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-7 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-green-400">
            Prescription Verification System
          </h1>
          <p className="text-lg text-emerald-700">
            Select your role to continue
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {userTypes.map((userType) => (
            <button
              key={userType.type}
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-emerald-50"
              onClick={() => navigate(`/${userType.type}`)} // Moved onClick here
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-full bg-sage-100 group-hover:bg-sage-200 transition-colors">
                  <userType.icon className="w-8 h-8 text-emerald-700" />
                </div>
                <h2 className="text-2xl font-semibold text-emerald-900">
                  {userType.type}
                </h2>
                <p className="text-emerald-600">{userType.description}</p>
                <ArrowRight className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute inset-0 border-2 border-transparent hover:border-emerald-200 rounded-2xl transition-colors duration-300" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
