import React, { useState, useEffect } from 'react';
import SplashScreen from './SplashScreen.jsx';
import OnBoardingScreen from "./OnBoardingScreen.jsx";
import Dashboard from "./Dashboard.jsx";
import LoginSignupPage from './Login.jsx';
import supabase from '../../supabase'
import { useRouter } from 'next/navigation.js';

function HomePage() {
    const router = useRouter();
    const [showSplash, setShowSplash] = useState(true);
    const [screenSwitch, setScreenSwitch] = useState(0);
    const [isLogin, setisLogin] = useState(true);

    const handleScreenSwitch = () => {
        setScreenSwitch((prevScreen) => prevScreen + 1);  // This correctly increments the state
    };

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            router.push('/dashboard');
        }
    }

    useEffect(() => {
        getUser();
        const timer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const onboardingScreens = [
        { title: "Welcome", description: "Welcome to Safewalk", backgroundImage: "/onboard-1.png" },
        { title: "Way to Go", description: "Travel Safely with SafeWalk", backgroundImage: "/onboard-2.webp" },
        { title: "Almost There", description: "Let's Go", backgroundImage: "/onboard-3.jpeg" },
    ];

    return (
        <div className="h-full flex items-center justify-center">
            {showSplash ? (
                <div className="">
                    <SplashScreen />
                    <p className="mt-4 text-white">Loading...</p>
                    {/* <Loader /> */}
                </div>
            ) : (
                <div className="w-full h-full">
                    {screenSwitch < onboardingScreens.length ? (
                        <OnBoardingScreen
                            handleScreenSwitch={handleScreenSwitch}  // Ensure this prop is correctly passed
                            title={onboardingScreens[screenSwitch].title}
                            description={onboardingScreens[screenSwitch].description}
                            button_name="Next"
                            backgroundImage={onboardingScreens[screenSwitch].backgroundImage}
                        />
                    ) : (
                        <LoginSignupPage /> // Show Login / Sign Up screen after all onboarding screens
                    )}
                </div>
            )}
        </div>
    );
}

export default HomePage;
