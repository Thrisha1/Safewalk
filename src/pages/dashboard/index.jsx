import React,{useState, useEffect} from 'react'
import Dashboard from '@/components/Dashboard'
import SplashScreen from '@/components/SplashScreen'
import supabase from '../../../supabase'
import { useRouter } from 'next/navigation'

export default function index() {
    const router = useRouter();
    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            router.push('/');
        }
        else{
            setisLoading(false);
        }
    }
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className={`bg-white ${isLoading && "h-screen"}`}>
            {isLoading ?(
                <div className="h-full flex items-center justify-center">
                    <SplashScreen/>
                </div>
            ): (
                <Dashboard/>
            )}
        </div>
    )
}
