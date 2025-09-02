'use client';

import { cn } from '@repo/ui/cn';
import { Step } from '../types';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface SidebarProps {
  steps: Step[];
}

export default function Sidebar({ steps }: SidebarProps) {
  const getStatusIcon = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Step['status']) => {
    switch (status) {
      case 'completed':
        return 'border-l-green-500 bg-green-50';
      case 'in-progress':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-300 bg-gray-50';
    }
  };

  return (
    <aside className="w-80 bg-gray-50 border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Project Steps</h2>
          <span className="text-sm text-gray-500">
            {steps.filter(s => s.status === 'completed').length}/{steps.length}
          </span>
        </div>
        
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer",
                getStatusColor(step.status)
              )}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getStatusIcon(step.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-medium text-gray-500">
                      STEP {index + 1}
                    </span>
                  </div>
                  
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    {step.description}
                  </p>
                  
                  {step.files.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {step.files.map((file, fileIndex) => (
                        <span
                          key={fileIndex}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-white text-gray-700 border border-gray-200"
                        >
                          {file}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}