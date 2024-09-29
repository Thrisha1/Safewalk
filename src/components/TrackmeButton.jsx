import React, { useState } from "react";
import supabase from '../../supabase'

const TrackMeButton = () => {
    const [loading, setLoading] = useState(false);

    const handleShareLocation = async () => {
        console.log("Share location");
        setLoading(true);


        const { data: { user } } = await supabase.auth.getUser()
        const { id: userId } = user;


        try {
            // Step 1: Fetch contact number from Supabase
            const { data, error } = await supabase
                .from('friends')
                .select('contactNumber')
                .eq('user_id', userId)
                .limit(1)
                .single();

            if (error) {
                console.error("Error fetching contact number:", error);
                setLoading(false);
                return;
            }

            const contactNumber = data.contactNumber;

            // Step 2: Get user's current location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Step 3: Open WhatsApp with pre-filled message
                    const message = `Hey, I am here: https://www.google.com/maps?q=${latitude},${longitude}`;
                    const whatsappUrl = `https://wa.me/${contactNumber}?text=${encodeURIComponent(message)}`;

                    window.open(whatsappUrl, '_blank');
                    setLoading(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setLoading(false);
                }
            );
        } catch (err) {
            console.error("Unexpected error:", err);
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center py-4">
            <button
                onClick={handleShareLocation}
                className="bg-green-500 text-white py-2 px-8 rounded-full shadow-lg hover:bg-green-600 transition"
                disabled={loading}
            >
                {loading ? "Sharing..." : "Share Your Location"}
            </button>
        </div>
    );
};

export default TrackMeButton;