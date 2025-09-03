'use client';

import { Button } from "@repo/ui/index";
import { Eye, Settings, Share2 } from 'lucide-react';

export default function Header() {
  const handlePreview = () => {
    window.open('/preview', '_blank');
  };

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">B</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Bolt Clone</h1>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </Button>
        
        <Button 
          onClick={handlePreview}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 transition-all duration-200"
          size="sm"
        >
          <Eye className="w-4 h-4" />
          Preview
        </Button>
      </div>
    </header>
  );
}