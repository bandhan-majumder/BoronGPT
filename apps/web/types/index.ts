export interface Step {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  files: string[];
}

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  isExpanded?: boolean;
  children?: FileItem[];
}