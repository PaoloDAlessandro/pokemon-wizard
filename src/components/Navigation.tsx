import React from "react";

const Navigation: React.FC<{ step: number; nextStep: Function; prevStep: Function }> = ({ step, nextStep, prevStep }) => {
  return (
    <div>
      {step > 1 && <button onClick={() => prevStep()}>Back</button>}
      {step < 3 && <button onClick={() => nextStep()}>Next</button>}
    </div>
  );
};

export default Navigation;
