"use client";

import React from "react";
import { useState, useEffect, useMemo } from "react";
import StepList from "../StepList";
import { CodeEditor } from "../CodeEditor";
import { FileItem, Step, StepAfterConvert } from "../../types/index";
import { filterStepsToFiles, modifySteps } from "../../lib/step";
import { useWebContainer } from "../../hooks/useWebcontainer";
import { FileExplorer } from "../FileExplorer";
import { TabView } from "../TabView";
import { PreviewFrame } from "../PreviewFrame";

export default function EditorScreen({
  initialSteps,
  prompt,
}: {
  initialSteps: StepAfterConvert[];
  prompt: string;
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [steps, setSteps] = useState<Step[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);
  const webcontainer = useWebContainer();
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");

  // Initialize files from initialSteps only once when component mounts
  useEffect(() => {
    const modifiedSteps = modifySteps(initialSteps);
    setSteps(modifiedSteps);
    const originalFiles = filterStepsToFiles(modifiedSteps);
    if (originalFiles.length > 0) {
      setFiles(originalFiles);
      setSteps((prevSteps) =>
        prevSteps.map((s: Step) => ({
          ...s,
          status: "completed",
        })),
      );
    }
  }, [initialSteps]); // Only depend on initialSteps

  // webcontainer effect - only runs when files or webcontainer changes
  useEffect(() => {
    if (!webcontainer || files.length === 0) return;

    const createMountStructure = (files: FileItem[]): Record<string, any> => {
      const mountStructure: Record<string, any> = {};

      const processFile = (file: FileItem, isRootFolder: boolean) => {
        if (file.type === "folder") {
          // For folders, create a directory entry
          mountStructure[file.name] = {
            directory: file.children
              ? Object.fromEntries(
                  file.children.map((child) => [
                    child.name,
                    processFile(child, false),
                  ]),
                )
              : {},
          };
        } else if (file.type === "file") {
          if (isRootFolder) {
            mountStructure[file.name] = {
              file: {
                contents: file.content || "",
              },
            };
          } else {
            // For files, create a file entry with contents
            return {
              file: {
                contents: file.content || "",
              },
            };
          }
        }

        return mountStructure[file.name];
      };

      // Process each top-level file/folder
      files.forEach((file) => processFile(file, true));

      return mountStructure;
    };

    const mountStructure = createMountStructure(files);
    webcontainer.mount(mountStructure);
  }, [files, webcontainer]);

  // Memoize the PreviewFrame to prevent unnecessary re-renders
  const previewFrame = useMemo(() => {
    return webcontainer ? (
      <PreviewFrame webContainer={webcontainer} files={files} />
    ) : null;
  }, [webcontainer, files]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-100">Website Builder</h1>
        <p className="text-sm text-gray-400 mt-1">Prompt: {prompt}</p>
      </header>

      <div className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-4 gap-6 p-6">
          <div className="col-span-1 space-y-6 overflow-auto">
            <div>
              <div className="h-[80vh]">
                <StepList
                  steps={steps}
                  currentStep={currentStep}
                  onSelectStep={setCurrentStep}
                />
              </div>
              <div>
                <div className="flex">
                  <br />
                  {/* {(loading || !templateSet) && <Loader />}
                  {!(loading || !templateSet) && <div className='flex'>
                    <textarea value={userPrompt} onChange={(e) => {
                    setPrompt(e.target.value)
                  }} className='p-2 w-full'></textarea>
                  <button onClick={async () => {
                    const newMessage = {
                      role: "user" as "user",
                      content: userPrompt
                    };

                    setLoading(true);
                    const stepsResponse = await axios.post(`${BACKEND_URL}/chat`, {
                      messages: [...llmMessages, newMessage]
                    });
                    setLoading(false);

                    setLlmMessages(x => [...x, newMessage]);
                    setLlmMessages(x => [...x, {
                      role: "assistant",
                      content: stepsResponse.data.response
                    }]);
                    
                    setSteps(s => [...s, ...parseXml(stepsResponse.data.response).map(x => ({
                      ...x,
                      status: "pending" as "pending"
                    }))]);

                  }} className='bg-purple-400 px-4'>Send</button>
                  </div>} */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <FileExplorer files={files} onFileSelect={setSelectedFile} />
          </div>
          <div className="col-span-2 bg-gray-900 rounded-lg shadow-lg p-4 h-[calc(100vh-8rem)]">
            <TabView activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="h-[calc(100%-4rem)]">
              {activeTab === "code" ? (
                <CodeEditor file={selectedFile} />
              ) : (
                previewFrame
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
