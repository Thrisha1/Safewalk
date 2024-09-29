import React from 'react'
import Image from 'next/image'

function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-full animate-pulse">
        <Image src='/logo.png' alt="splash" width="200" height="200" />
    </div>
  )
}

export default SplashScreen