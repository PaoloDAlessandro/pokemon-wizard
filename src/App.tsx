import { useState } from "react";
import "./App.css";
import { Typography } from "./components/Typography";
import Wizard from "./components/Wizard";
import WizardProgress from "./components/WizardProgress";
import { Toaster } from "./components/Toast/Toaster";

function App() {
  const [step, setStep] = useState(1);
  return (
    <div className="App bg-gray-100 h-[100dvh] max-h-[100dvh] flex flex-col">
      <header className="sticky top-0 z-10 bg-gray-100">
        <div className="App-header py-3 w-11/12 lg:w-full lg:max-w-[100rem] mx-auto mt-2 space-y-5">
          <Typography as="h1" variant="h3" className="text-center text-4xl font-bold pokemon-font">
            Pokémon Team Builder
          </Typography>
          <WizardProgress currentStep={step} />
        </div>
      </header>
      <main className="flex-grow w-full mt-1 lg:mt-5 px-4 overflow-y-auto">
        <Wizard step={step} setStep={setStep} />
        <Toaster />
      </main>
    </div>
  );
}

export default App;
