import React, { useState, useEffect } from "react";
import axios from "axios";
// import './LoginPage.css'
// import ENV from "../.env";
function LoginPage() {
  // const [userData, setUserData] = useState([]);
  // const history = useHistory();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    usr: "",
    pwd: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const currentUrl = window.location.href;
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get('accessToken');
    const localToken = localStorage.getItem('accessToken');

    const currentUrl = window.location.origin + window.location.pathname;

    if (urlToken) {
      // Log 'yes' if accessToken is found in the URL
      console.log('yes');
      // Save the token to localStorage
      localStorage.setItem('accessToken', urlToken);
      // Remove accessToken from URL params
      params.delete('accessToken');
      const newUrl = `${window.location.origin}${window.location.pathname}`;
      window.location.href = newUrl;
    } else if (localToken) {
      // Log 'yes' if accessToken is found in localStorage
      console.log('yes');
    } else {
      // Redirect to the login page if no accessToken is found
      window.location.href = `http://localhost:3999/login?ogwebsite=${encodeURIComponent(currentUrl)}`;
    }
  }, []);

  const handleLogin = async (e) => {
    // e.preventDefault();
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    let value = params.ogwebsite
    setLoading(true);
    window.location.href = 'https://www.google.com'
    // try {
    //   const response = await axios.post('https://api.nitisakc.dev/auth/login', formData );

    //   if (response) {
    //     console.log(response)
    //     const data = response.data;
    //     //   localStorage.setItem("token", true);
    //     localStorage.setItem("accessToken", data.accessToken);
    //     localStorage.setItem("refreshToken", data.refreshToken);
    //     const accessToken = localStorage.getItem("accessToken");
    //     const refreshToken = localStorage.getItem("refreshToken");
    //     try {
    //       const verifyresponse =  await axios.post(
    //         'https://api.nitisakc.dev/auth/verify',
    //         {}, 
    //         {
    //           headers: {
    //             Authorization: `Bearer ${accessToken}`,
    //           },
    //         }
    //       );
      
      
    //       const data =  verifyresponse.data;
    //       // const usrlist =  listofuser.data;
    //       if (verifyresponse) {
    //         // localStorage.setItem("User_list", JSON.stringify(usrlist));
    //         localStorage.setItem("ORG_ID", data.profile[0].ORG_ID);
    //         localStorage.setItem("EMP_ID", data.profile[0].EMP_ID);
    //         localStorage.setItem("EMP_FNAME", data.profile[0].EMP_FNAME);
    //         localStorage.setItem("EMP_LNAME", data.profile[0].EMP_LNAME);
    //         window.location.href = value+'?accessToken='+accessToken;
    //         // history.push('/');
    //       } else if (response.status === 403) {
    //         setError("Username or password is wrong. Please try again.");
    //       } else {
    //         setError("Some thing went wrong with login server. Please try again later.");
    //       }
    //     } catch (error) {
    //       console.error("Error:", error);
          
    //       setError("An error occurred during login.");
    //     }
    //   } else if (response.status === 502) {
    //     setError("Some thing went wrong with login server. Please try again later.");
    //   } else {
    //     console.error("Login failed");
    //     setError("Username or password is wrong. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   setError("An error occurred during login.");
    // } finally {
    //   setLoading(false);
    // }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token == null) {
  //     history.push('/login');
  //   }
  // }, [history]);
  const logout = async () => {
    localStorage.removeItem("accessToken")
    const currentUrl = window.location.origin + window.location.pathname;
    window.location.href = 'http://localhost:3999/logout?ogwebsite='+currentUrl
    
  }
  return (
    <div className="login-page flex bg-gray-100  items-center justify-center w-full h-screen">
      logged ibn
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}

export default LoginPage;
