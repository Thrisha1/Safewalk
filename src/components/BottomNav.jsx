import Link from "next/link";
import React from "react";
import supabase from "../../supabase";
import {useRouter} from 'next/navigation'

const BottomNav = ({ openModal }) => {
    const router = useRouter();
    return (
        <nav className="bg-white py-2 shadow-lg">
            <ul className="flex justify-around items-center text-sm text-gray-700">
                <Link href="/dashboard">
                    <li className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#1C274C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M3 9.5L12 3l9 6.5v11.5a1 1 0 0 1-1 1h-6v-5h-4v5H4a1 1 0 0 1-1-1V9.5z" />
                        </svg>
                        <span>Home</span>
                    </li>
                </Link>
                <li className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#1C274C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M2 2v20" />
                        <path d="M2 6h14l-3.5 5L16 16H2" />
                    </svg>
                    <div>
                        <button onClick={openModal} className="">
                            Report a Crime
                        </button>
                    </div>
                </li>
                {/* <li className="flex flex-col items-center bg-red-500 text-white py-2 px-4 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#1C274C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                        <path d="M21.63 18.37L13.63 4.37a2 2 0 0 0-3.46 0L2.37 18.37A2 2 0 0 0 4 21h16a2 2 0 0 0 1.63-2.63z" />
                    </svg>
                    <span>SOS</span>
                </li> */}
                {/* <li className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#1C274C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.88 19.88 0 0 1-8.63-3.19 19.51 19.51 0 0 1-6-6A19.88 19.88 0 0 1 3.27 4.18 2 2 0 0 1 5.25 2h3a2 2 0 0 1 2 1.72 12.49 12.49 0 0 0 .68 2.81 2 2 0 0 1-.45 2.11l-1.27 1.28a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.49 12.49 0 0 0 2.81.68 2 2 0 0 1 1.72 2z" />
                    </svg>
                    <span>call</span>
                </li> */}
                <li className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#1C274C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9.09 9a3 3 0 1 1 5.82 1c0 1.5-3 3-3 3" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <span>Helpline</span>
                </li>
                {/* log out */}
                <button onClick={
                    () => {
                        supabase.auth.signOut();
                        router.push("/")
                    }
                }>
                    <li className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="#1C274C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                            <path d="M12 5l7 7-7 7" />
                            <path d="M19 12H5" />
                        </svg>
                        <span>Logout</span>
                    </li>
                </button>
            </ul>
        </nav>
    );
};

export default BottomNav;