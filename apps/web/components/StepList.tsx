"use client";

import { Step } from "../types";
import { CheckCircle, Circle, Clock, File, ChevronRight } from "lucide-react";
import StepCard from "./StepCard";

interface StepsListProps {
  steps: Step[];
  currentStep: number;
  onSelectStep: (stepId: number) => void;
}

export default function StepsList({
  steps,
  currentStep,
  onSelectStep,
}: StepsListProps) {
  return (
    <div className="bg-gray-900 rounded-lg shadow-lg p-4 h-full overflow-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">Build Steps</h2>
      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`p-1 rounded-lg cursor-pointer transition-colors ${
              currentStep === step.id
                ? "bg-gray-800 border border-gray-700"
                : "hover:bg-gray-800"
            }`}
            onClick={() => onSelectStep(step.id)}
          >
            <div className="flex items-center gap-2">
              {step.status === "completed" ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : step.status === "in-progress" ? (
                <Clock className="w-5 h-5 text-blue-400" />
              ) : (
                <Circle className="w-5 h-5 text-gray-600" />
              )}
              <h3 className="font-medium text-gray-100">{step.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
