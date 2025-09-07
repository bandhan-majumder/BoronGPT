import { ActionType, FileItem, Step, StepAfterConvert, StepType } from "../types";


export function modifySteps(steps: StepAfterConvert[]): Step[] {
  const modifiedSteps: Step[] = steps.map((step, index) => ({
    id: index + 1,
    title: step.type === ActionType.file ? `Create File ${step.filePath}` : `Run Command`,
    description: step.type === ActionType.file ? `Create or modify the file at ${step.filePath}` : `Execute the shell command`,
    type: step.type === ActionType.file ? StepType.CreateFile : StepType.RunScript,
    status: "pending",
    code: step.type === ActionType.file ? (typeof step.content === 'string' ? step.content : JSON.stringify(step.content, null, 2)) : undefined,
    script: step.type === ActionType.shell ? (typeof step.content === 'string' ? step.content : JSON.stringify(step.content, null, 2)) : undefined,
    filePath: step.filePath,
  }));

  return modifiedSteps
}

export function filterStepsToFiles(steps: Step[]) {
  let originalFiles: FileItem[] = [];
  steps.filter(({ status }) => status === "pending").map((step: Step) => {
    if (step?.type === StepType.CreateFile && step.filePath) {
      let parsedPath = step.filePath?.split("/") ?? []; // ["src", "components", "App.tsx"]
      let currentFileStructure = [...originalFiles]; // {}
      let finalAnswerRef = currentFileStructure;

      let currentFolder = ""
      while (parsedPath.length) {
        currentFolder = `${currentFolder}/${parsedPath[0]}`;
        let currentFolderName = parsedPath[0];
        parsedPath = parsedPath.slice(1);

        if (!parsedPath.length) {
          // final file
          let file = currentFileStructure.find(x => x.path === currentFolder)
          if (!file) {
            currentFileStructure.push({
              name: currentFolderName!,
              type: 'file',
              path: currentFolder,
              content: step.code
            })
          } else {
            file.content = step.code;
          }
        } else {
          /// in a folder
          let folder = currentFileStructure.find(x => x.path === currentFolder)
          if (!folder) {
            // create the folder
            currentFileStructure.push({
              name: currentFolderName!,
              type: 'folder',
              path: currentFolder,
              children: []
            })
          }

          currentFileStructure = currentFileStructure.find(x => x.path === currentFolder)!.children!;
        }
      }
      originalFiles = finalAnswerRef;
    }
  })
  return originalFiles.length ? originalFiles : [];
}