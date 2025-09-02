'use client';

import { FileItem } from '../types/index';
import { ChevronDown, ChevronRight, File, Folder, FolderOpen } from 'lucide-react';
import { cn } from '@repo/ui/cn';

interface FileExplorerProps {
  files: FileItem[];
  selectedFile: FileItem | null;
  onFileSelect: (file: FileItem) => void;
  onToggleExpanded: (id: string) => void;
}

interface FileTreeItemProps {
  file: FileItem;
  level: number;
  selectedFile: FileItem | null;
  onFileSelect: (file: FileItem) => void;
  onToggleExpanded: (id: string) => void;
}

function FileTreeItem({ file, level, selectedFile, onFileSelect, onToggleExpanded }: FileTreeItemProps) {
  const handleClick = () => {
    if (file.type === 'folder') {
      onToggleExpanded(file.id);
    } else {
      onFileSelect(file);
    }
  };

  const isSelected = selectedFile?.id === file.id;
  const paddingLeft = level * 16 + 12;

  return (
    <div>
      <div
        className={cn(
          "flex items-center py-1.5 px-3 cursor-pointer hover:bg-gray-800 transition-all duration-150 group",
          isSelected && "bg-blue-600 text-white",
          !isSelected && "text-gray-300 hover:text-white"
        )}
        style={{ paddingLeft }}
        onClick={handleClick}
      >
        <div className="flex items-center space-x-2 flex-1">
          {file.type === 'folder' && (
            <div className="w-4 h-4 flex items-center justify-center">
              {file.isExpanded ? (
                <ChevronDown className="w-3 h-3 transition-transform duration-200" />
              ) : (
                <ChevronRight className="w-3 h-3 transition-transform duration-200" />
              )}
            </div>
          )}
          
          <div className="w-4 h-4 flex items-center justify-center">
            {file.type === 'folder' ? (
              file.isExpanded ? (
                <FolderOpen className="w-4 h-4 text-blue-400" />
              ) : (
                <Folder className="w-4 h-4 text-blue-400" />
              )
            ) : (
              <File className="w-4 h-4 text-gray-400 group-hover:text-white" />
            )}
          </div>
          
          <span className="text-sm font-medium truncate">{file.name}</span>
        </div>
      </div>
      
      {file.type === 'folder' && file.isExpanded && file.children && (
        <div className="animate-accordion-down">
          {file.children.map((child) => (
            <FileTreeItem
              key={child.id}
              file={child}
              level={level + 1}
              selectedFile={selectedFile}
              onFileSelect={onFileSelect}
              onToggleExpanded={onToggleExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileExplorer({ files, selectedFile, onFileSelect, onToggleExpanded }: FileExplorerProps) {
  return (
    <div className="w-64 bg-gray-900 border-r border-gray-700 overflow-y-auto">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-sm font-semibold text-gray-200 uppercase tracking-wide">
          Explorer
        </h3>
      </div>
      
      <div className="py-2">
        {files.map((file) => (
          <FileTreeItem
            key={file.id}
            file={file}
            level={0}
            selectedFile={selectedFile}
            onFileSelect={onFileSelect}
            onToggleExpanded={onToggleExpanded}
          />
        ))}
      </div>
    </div>
  );
}