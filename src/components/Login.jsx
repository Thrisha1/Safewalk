import React from "react";
import supabase from "../../supabase";

function LoginSignupPage() {


  const login = async () => {
    console.log("login");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: "http://localhost:3000/dashboard"
      }
    })
    if (error) {
      console.log(error, "error");
      return;
    }
    console.log(data, "data");

  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
     
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-8">
        <img
          src="/logo.png"
          alt="Raksha logo"
          className="w-24 h-24"
        />
        <h1 className="mt-4 text-2xl font-semibold text-purple-600">SafeWalk</h1>
      </div>
      {/*
    //   Input Field for Mobile Number
      <div className="w-4/5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mobile Number
        </label>
        <input
          type="text"
          placeholder="Enter your mobile number"
          className="w-full px-4 py-2 border border-purple-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

    //   Log In / Sign Up Button
      <div className="mt-4 w-4/5">
        <button className="w-full py-2 bg-purple-400 text-white font-semibold rounded-lg hover:bg-purple-500 transition duration-200">
          Log In / Sign Up
        </button>
      </div>

      Divider 
      <div className="my-4 flex items-center w-4/5">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500">Or Connect</span>
        <hr className="flex-grow border-gray-300" />
      </div>
*/}
      {/* Google Sign In Button */}
      <div className="w-4/5">
        <button
          onClick={login}
          className="flex text-black items-center justify-center w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200">
          <img
            src="https://techdocs.akamai.com/identity-cloud/img/social-login/identity-providers/iconfinder-new-google-favicon-682665.png"
            alt="Google logo"
            className="w-6 h-6 mr-2"
            onClick={login}
          />
          Continue with Google
        </button>

      </div>

      {/* Login with Email Option */}
      {/* <div className="w-4/5 mt-4">
        <p className="text-sm text-center text-gray-500">Already have an account?</p>
        <button className="w-full py-2 mt-2 bg-white text-purple-600 border border-purple-400 font-semibold rounded-lg hover:bg-gray-50 transition duration-200">
          Log In with Email
        </button>
      </div> */}
    </div>
  );
}

export default LoginSignupPage;