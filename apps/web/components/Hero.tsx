import React from 'react'
import ChatInput from './ChatInput'
import Image from "next/image"

function Hero() {
    return (
        <div>
            <main className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-yellow-50 flex items-center justify-center gap-3">
                            Build apps
                            <Image
                                src={"/icon.svg"}
                                width={40}
                                height={40}
                                alt="a"
                                className="rounded-xl"
                                style={{ transform: "rotate(35deg)" }}
                            />
                            BoronGPT
                        </h2>
                        <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
                            Prompt, Edit, Ship. Faster than you can imagine.
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <div className='relative'>
                            <ChatInput />
                        </div>
                        <p className="text-sm text-gray-700 mt-3">Press Enter or click the arrow to start </p>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Hero