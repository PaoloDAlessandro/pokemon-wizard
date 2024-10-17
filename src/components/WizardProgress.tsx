import React from "react";
import { Check } from "lucide-react";

interface WizardProgressProps {
  currentStep: number;
}

const steps = [
  { number: 1, title: "Trainer Info" },
  { number: 2, title: "Choose Team" },
  { number: 3, title: "Select Opponent" },
];

const WizardProgress: React.FC<WizardProgressProps> = ({ currentStep }) => {
  return (
    <div className="mb-6">
      <ol className="flex items-center w-full lg:w-11/12 mx-auto">
        {steps.map((step, index) => (
          <li key={step.number} className={`flex items-center ${index < steps.length - 1 ? "w-full" : ""}`}>
            <div
              className={`
                flex items-center justify-center w-8 h-8 min-w-8 min-h-8 rounded-full border-2
                ${currentStep >= step.number ? "bg-blue-500 border-blue-600" : "bg-white border-gray-300"}
                transition-all duration-300 ease-in-out
              `}
            >
              {currentStep > step.number ? <Check className="w-4 h-4 text-white" /> : <span className={`text-xs font-medium ${currentStep === step.number ? "text-white" : "text-gray-600"}`}>{step.number}</span>}
            </div>
            <span
              className={`
              ml-2 text-xs font-medium 
              ${currentStep >= step.number ? "text-blue-600" : "text-gray-600"}
              transition-all duration-300 ease-in-out
            `}
            >
              {step.title}
            </span>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 relative">
                <div className="h-0.5 bg-gray-200 absolute w-full top-1/2 transform -translate-y-1/2"></div>
                <div
                  className={`
                    h-0.5 bg-blue-500 absolute top-1/2 transform -translate-y-1/2
                    transition-all duration-500 ease-in-out
                  `}
                  style={{ width: `${currentStep > step.number ? "100%" : "0%"}` }}
                ></div>
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default WizardProgress;
