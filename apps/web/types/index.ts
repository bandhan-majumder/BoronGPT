export enum ActionType {
  file = "file",
  shell = "shell",
}

export enum StepType {
  CreateFile,
  CreateFolder,
  EditFile,
  DeleteFile,
  RunScript,
}

export interface ResponseAfterConvert {
  steps: StepAfterConvert[];
  metadata: {
    totalSteps: number;
  };
}

export interface StepAfterConvert {
  type: ActionType;
  filePath?: string; // only for file actions
  content: string | object;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  type: StepType;
  status: "pending" | "in-progress" | "completed";
  code?: string; // for CreateFile, EditFile types
  script?: string; // for RunScript type
  filePath?: string;
}

export interface Project {
  prompt: string;
  steps: Step[];
}

export interface FileItem {
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
  content?: string;
  path: string;
}

export interface FileViewerProps {
  file: FileItem | null;
  onClose: () => void;
}
