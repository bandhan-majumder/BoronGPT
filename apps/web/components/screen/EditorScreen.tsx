'use client';

import { useState } from 'react';
import Sidebar from '../Sidebar';
import FileExplorer from '../FileExplorer';
import CodeEditor from '../CodeEditor';
import Header from '../Header';
import { FileItem, Step } from "../../types/index";

const mockSteps: Step[] = [
  {
    id: '1',
    title: 'Initialize Project',
    description: 'Set up the basic project structure with TypeScript and Tailwind CSS',
    status: 'completed',
    files: ['package.json', 'tsconfig.json', 'tailwind.config.ts']
  },
  {
    id: '2',
    title: 'Create Components',
    description: 'Build the main UI components for the application',
    status: 'completed',
    files: ['components/Header.tsx', 'components/Sidebar.tsx', 'components/FileExplorer.tsx']
  },
  {
    id: '3',
    title: 'Implement Code Editor',
    description: 'Integrate Monaco editor for code editing functionality',
    status: 'in-progress',
    files: ['components/CodeEditor.tsx']
  },
  {
    id: '4',
    title: 'Add Preview Functionality',
    description: 'Enable live preview of the application',
    status: 'pending',
    files: []
  }
];

const mockFiles: FileItem[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    isExpanded: true,
    children: [
      {
        id: '2',
        name: 'components',
        type: 'folder',
        isExpanded: true,
        children: [
          { id: '3', name: 'Header.tsx', type: 'file', content: `import React from 'react';\nimport { Button } from '@/components/ui/button';\n\nexport default function Header() {\n  return (\n    <header className="bg-white border-b">\n      <div className="px-4 py-3 flex items-center justify-between">\n        <h1 className="text-xl font-semibold">Bolt Clone</h1>\n        <Button>Preview</Button>\n      </div>\n    </header>\n  );\n}` },
          { id: '4', name: 'Sidebar.tsx', type: 'file', content: `import React from 'react';\n\nexport default function Sidebar() {\n  return (\n    <aside className="w-80 bg-gray-50 border-r">\n      <div className="p-4">\n        <h2 className="font-semibold mb-4">Steps</h2>\n        {/* Steps content */}\n      </div>\n    </aside>\n  );\n}` },
          { id: '5', name: 'FileExplorer.tsx', type: 'file', content: `import React from 'react';\n\nexport default function FileExplorer() {\n  return (\n    <div className="w-64 bg-gray-900 text-white">\n      <div className="p-4">\n        <h3 className="font-semibold mb-4">Files</h3>\n        {/* File tree */}\n      </div>\n    </div>\n  );\n}` }
        ]
      },
      {
        id: '6',
        name: 'app',
        type: 'folder',
        isExpanded: false,
        children: [
          { id: '7', name: 'page.tsx', type: 'file', content: `export default function Home() {\n  return (\n    <div className="container mx-auto p-8">\n      <h1 className="text-4xl font-bold">Welcome to Bolt Clone</h1>\n    </div>\n  );\n}` },
          { id: '8', name: 'layout.tsx', type: 'file', content: `import './globals.css';\n\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode;\n}) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  );\n}` }
        ]
      }
    ]
  },
  {
    id: '9',
    name: 'package.json',
    type: 'file',
    content: `{\n  "name": "bolt-clone",\n  "version": "0.1.0",\n  "private": true,\n  "scripts": {\n    "dev": "next dev",\n    "build": "next build",\n    "start": "next start"\n  },\n  "dependencies": {\n    "next": "latest",\n    "react": "latest",\n    "react-dom": "latest"\n  }\n}`
  }
];

export default function EditorScreen() {
  //@ts-ignore
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(mockFiles[0].children?.[0]?.children?.[0] || null);
  const [files, setFiles] = useState<FileItem[]>(mockFiles);

  const toggleExpanded = (id: string) => {
    const updateFiles = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, isExpanded: !item.isExpanded };
        }
        if (item.children) {
          return { ...item, children: updateFiles(item.children) };
        }
        return item;
      });
    };
    setFiles(updateFiles(files));
  };

  const updateFileContent = (id: string, content: string) => {
    const updateFiles = (items: FileItem[]): FileItem[] => {
      return items.map(item => {
        if (item.id === id) {
          return { ...item, content };
        }
        if (item.children) {
          return { ...item, children: updateFiles(item.children) };
        }
        return item;
      });
    };
    setFiles(updateFiles(files));
    
    if (selectedFile?.id === id) {
      setSelectedFile({ ...selectedFile, content });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar steps={mockSteps} />
        
        <div className="flex flex-1">
          <FileExplorer 
            files={files}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
            onToggleExpanded={toggleExpanded}
          />
          
          <div className="flex-1 flex flex-col">
            <CodeEditor 
              file={selectedFile}
              onContentChange={updateFileContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}