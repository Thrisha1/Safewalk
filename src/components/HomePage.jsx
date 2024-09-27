import React,{ useState, useEffect } from 'react'
import SplashScreen from './SplashScreen.jsx'
import OnBoardingScreen from "./OnBoardingScreen.jsx";
import Loader from "./Loader.jsx";

function HomePage() {
    const [showSplash, setShowSplash] = useState(true);
    const [screenSwitch, setScreenSwitch] = useState(0);

    const handleScreenSwitch = (a) => {
        setScreenSwitch(screenSwitch + a);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
        setShowSplash(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);
  
  return (
    <div className="h-full flex items-center justify-center">
      hlo
        { showSplash ? (
           <div className="">
             <SplashScreen />
             <p className="mt-4 text-white">Loading...</p>
             <Loader />
           </div>
        ) : (
            <div className="w-full h-full">
                <OnBoardingScreen handleScreenSwitch={handleScreenSwitch} title="Way to Go" description=" dummy data description " button_name="Next" backgroundImage="/onboard-1.png" />
                <OnBoardingScreen handleScreenSwitch={handleScreenSwitch} title="Way to Go" description=" dummy data description " button_name="Next" backgroundImage="/onboard-2.png" />
                <OnBoardingScreen handleScreenSwitch={handleScreenSwitch} title="Way to Go" description=" dummy data description " button_name="Next" backgroundImage="/onboard-3.png" />
            </div>
        )}
    </div>
  )
}

export default HomePage