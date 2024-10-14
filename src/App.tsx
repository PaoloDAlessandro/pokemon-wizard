import { useState } from "react";
import "./App.css";
import { Typography } from "./components/Typography";
import Wizard from "./components/Wizard"; // Import the Wizard component
import WizardProgress from "./components/WizardProgress";

function App() {
  const [step, setStep] = useState(1);
  return (
    <div className="App bg-gray-100 min-h-[100dvh] flex flex-col">
      <header className="sticky top-0 z-10 bg-gray-100">
        <div className="App-header py-3 w-11/12 lg:w-full lg:max-w-[96rem] mx-auto space-y-5">
          <Typography as="h1" variant="h2" className="text-center text-4xl font-bold pokemon-font">
            Pokémon Team Builder
          </Typography>
          <WizardProgress currentStep={step} />
        </div>
      </header>
      <main className="flex-grow w-full mt-2 lg:mt-5 px-4">
        <Wizard step={step} setStep={setStep} />
      </main>
    </div>
  );
}

export default App;
