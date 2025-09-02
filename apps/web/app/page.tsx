"use client";

import { Button, Textarea } from '@repo/ui/index'
import { Plus, Send } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { usePromptStore } from '../providers/prompt-store-provider'

export default function Home() {
  const [message, setMessage] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { setPrompt } = usePromptStore(
    (state) => state,
  )

  const handleSend = () => {
    // store the prompt with zustand
    setPrompt({ prompt: message });
    router.push(`/playground`);
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      
      const newHeight = Math.min(textarea.scrollHeight, 128); 
      textarea.style.height = `${newHeight}px`;
    }
  }, [message]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-32">
        <div className="w-full max-w-2xl space-y-8">

          <div className="text-center space-y-2">
            <h1 className="text-4xl font-light text-gray-100">
              Good afternoon, Bandhan
            </h1>
          </div>

          <div className="relative">
            <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700 focus-within:border-gray-600 transition-colors">
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
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Message Claude..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-400 text-lg p-0 outline-none resize-none min-h-[24px] max-h-32 overflow-y-auto leading-6"
                  rows={1}
                />
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>BoronGPT</span>
                </div>

                <Button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  size="icon"
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-full h-8 w-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}