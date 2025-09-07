"use client";

import { Button, Textarea } from '@repo/ui/index'
import { ArrowUp, Plus } from 'lucide-react';
import React, { useRef, useState } from 'react'

interface chatInputProps {
    onClick: () => void,
}

function ChatInput({ onClick }: chatInputProps) {
    const [message, setMessage] = useState<string>("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    return (
        <div className="relative">
            <div className="bg-[#272725] rounded-2xl p-4 border border-gray-700 focus-within:border-gray-600 transition-colors">
                <div className="flex items-start space-x-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-full mt-1"
                    >
                        <Plus className="h-5 w-5" />
                    </Button>

                    <Textarea
                        ref={textareaRef}
                        style={{
                            overflow: "auto",
                            scrollbarWidth: "none",
                        }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Build me an app..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-400 text-lg p-0 outline-none resize-none min-h-[24px] max-h-32 overflow-y-auto leading-6"
                        rows={1}
                    />
                </div>

                <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <span>BoronGPT</span>
                    </div>

                    <Button
                        onClick={onClick}
                        disabled={!message.trim()}
                        size="icon"
                        className="bg-[#92918f] hover:bg-white text-black rounded-full h-10 w-10 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowUp className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ChatInput