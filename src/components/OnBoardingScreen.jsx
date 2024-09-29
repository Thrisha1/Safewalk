import React from 'react';

function OnBoardingScreen({ handleScreenSwitch, backgroundImage, title, description, button_name }) {
  return (
    <div
      className="relative w-full h-full object-contain flex flex-col"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-85"></div>
        <div className="fixed bottom-20 w-full flex flex-col items-center justify-center gap-5  ">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-white">{description}</p>
          <button onClick={handleScreenSwitch} className="bg-purple-800 w-72 h-10 text-white rounded hover:bg-purple-700">
            {button_name}
          </button>
        </div>
    </div>
  );
}

export default OnBoardingScreen;

