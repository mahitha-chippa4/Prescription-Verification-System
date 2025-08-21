// import React, { useEffect, useState, useRef } from "react";
// import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
// import { QrCode, Camera, CameraOff, Upload } from "lucide-react";

// function PatientDashBoard() {
//   const [scanResult, setScanResult] = useState("");
//   const [isScanning, setIsScanning] = useState(false);
//   const scannerRef = useRef(null);
//   const fileInputRef = useRef(null);
//   const qrCodeRef = useRef(null);
//   useEffect(() => {
//     if (isScanning && !scannerRef.current) {
//       // Initialize scanner only when scanning starts and scanner doesn't exist
//       scannerRef.current = new Html5QrcodeScanner(
//         "reader",
//         {
//           qrbox: {
//             width: 250,
//             height: 250,
//           },
//           fps: 5,
//         },
//         false
//       );

//       function success(result) {
//         if (scannerRef.current) {
//           scannerRef.current.clear();
//           scannerRef.current = null;
//         }
//         setScanResult(result);
//         setIsScanning(false);
//       }

//       function error(err) {
//         console.warn(err);
//       }

//       scannerRef.current.render(success, error);
//     }

//     return () => {
//       if (scannerRef.current) {
//         scannerRef.current.clear();
//         scannerRef.current = null;
//       }
//       if (qrCodeRef.current) {
//         qrCodeRef.current.clear();
//         qrCodeRef.current = null;
//       }
//     };
//   }, [isScanning]);

//   const startScanning = () => {
//     setScanResult("");
//     setIsScanning(true);
//   };

//   const stopScanning = () => {
//     if (scannerRef.current) {
//       scannerRef.current.clear();
//       scannerRef.current = null;
//     }
//     setIsScanning(false);
//   };

//   const handleFileUpload = async (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     try {
//       // Create a new instance for file scanning if it doesn't exist
//       if (!qrCodeRef.current) {
//         qrCodeRef.current = new Html5Qrcode("file-reader");
//       }

//       const result = await qrCodeRef.current.scanFile(file, true);
//       setScanResult(result);

//       // Clean up after successful scan
//       if (qrCodeRef.current) {
//         qrCodeRef.current.clear();
//         qrCodeRef.current = null;
//       }
//     } catch (error) {
//       console.error("Error scanning file:", error);
//       alert(
//         "Could not scan QR code from this image. Please try another image or use the camera scanner."
//       );
//     }

//     // Reset file input
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
//         <div className="p-8">
//           <div className="flex items-center justify-center mb-6">
//             <QrCode className="w-8 h-8 text-blue-600" />
//             <h1 className="text-2xl font-bold text-gray-800 ml-2">
//               Upload Prescription QR Code
//             </h1>
//           </div>

//           {/* QR Code Scanner Container */}
//           {isScanning && <div id="reader" className="mb-4"></div>}

//           {!isScanning && !scanResult && (
//             <div className="space-y-4">
//               <button
//                 onClick={startScanning}
//                 className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto w-full"
//               >
//                 <Camera className="w-5 h-5 mr-2" />
//                 Start Camera Scanning
//               </button>

//               <div className="relative">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileUpload}
//                   className="hidden"
//                   ref={fileInputRef}
//                   id="file-upload"
//                 />
//                 <label
//                   htmlFor="file-upload"
//                   className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center mx-auto w-full cursor-pointer"
//                 >
//                   <Upload className="w-5 h-5 mr-2" />
//                   Upload QR Image
//                 </label>
//               </div>
//             </div>
//           )}

//           {scanResult && (
//             <div className="mt-6 space-y-4">
//               <div className="p-4 bg-green-50 rounded-lg border border-green-200">
//                 <h2 className="text-lg font-semibold text-green-800 mb-2">
//                   Scan Result:
//                 </h2>
//                 <p className="text-green-700 break-all">{scanResult}</p>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <button
//                   onClick={startScanning}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
//                 >
//                   <Camera className="w-5 h-5 mr-2" />
//                   Scan Again
//                 </button>
//                 <label
//                   htmlFor="file-upload"
//                   className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center cursor-pointer"
//                 >
//                   <Upload className="w-5 h-5 mr-2" />
//                   Upload New
//                 </label>
//               </div>
//             </div>
//           )}

//           {/* Hidden element for file scanning */}
//           <div id="file-reader" style={{ display: "none" }}></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PatientDashBoard;


import React, { useEffect, useState, useRef } from "react";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { QrCode, Camera, Upload, LogOut } from "lucide-react";
import { getAuth, signOut } from "firebase/auth";

function PatientDashBoard() {
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);
  const fileInputRef = useRef(null);
  const qrCodeRef = useRef(null);

  useEffect(() => {
    if (isScanning && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        { qrbox: { width: 250, height: 250 }, fps: 5 },
        false
      );

      function success(result) {
        scannerRef.current?.clear();
        scannerRef.current = null;
        setScanResult(result);
        setIsScanning(false);
      }

      function error(err) {
        console.warn(err);
      }

      scannerRef.current.render(success, error);
    }

    return () => {
      scannerRef.current?.clear();
      scannerRef.current = null;
      qrCodeRef.current?.clear();
      qrCodeRef.current = null;
    };
  }, [isScanning]);

  const startScanning = () => {
    setScanResult("");
    setIsScanning(true);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      if (!qrCodeRef.current) {
        qrCodeRef.current = new Html5Qrcode("file-reader");
      }

      const result = await qrCodeRef.current.scanFile(file, true);
      setScanResult(result);

      qrCodeRef.current?.clear();
      qrCodeRef.current = null;
    } catch (error) {
      console.error("Error scanning file:", error);
      alert("Could not scan QR code from this image.");
    }

    fileInputRef.current.value = "";
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("Logged out successfully!");
        window.location.href = "/"; // Redirect to home or login page
      })
      .catch((error) => console.error("Logout Error:", error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Logout Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <QrCode className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800 ml-2">
              Upload Prescription QR Code
            </h1>
          </div>

          {isScanning && <div id="reader" className="mb-4"></div>}

          {!isScanning && !scanResult && (
            <div className="space-y-4">
              <button
                onClick={startScanning}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center w-full"
              >
                <Camera className="w-5 h-5 mr-2" />
                Start Camera Scanning
              </button>

              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  ref={fileInputRef}
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center w-full cursor-pointer"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload QR Image
                </label>
              </div>
            </div>
          )}

          {scanResult && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h2 className="text-lg font-semibold text-green-800 mb-2">
                  Scan Result:
                </h2>
                <p className="text-green-700 break-all">{scanResult}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={startScanning}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Scan Again
                </button>
                <label
                  htmlFor="file-upload"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center cursor-pointer"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload New
                </label>
              </div>
            </div>
          )}

          <div id="file-reader" style={{ display: "none" }}></div>
        </div>
      </div>
    </div>
  );
}

export default PatientDashBoard;

