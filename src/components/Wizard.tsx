import React, { useState } from "react";
import { PokemonTeam, TrainerInfo } from "../types";
import OpponentSelection from "./OpponentSelection";
import PokemonSelection from "./PokemonSelection";
import TrainerDetails from "./TrainerDetails";
import WizardProgress from "./WizardProgress";

interface WizardProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

const Wizard: React.FC<WizardProps> = ({ step, setStep }) => {
  const [trainerInfo, setTrainerInfo] = useState<TrainerInfo | null>(null);
  const [team, setTeam] = useState<PokemonTeam>([]);
  const [opponentTeam, setOpponentTeam] = useState<PokemonTeam>([]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="w-11/12 lg:w-full lg:max-w-[96rem] h-full mx-auto">
      {step === 1 && <TrainerDetails setTrainerInfo={setTrainerInfo} nextStep={nextStep} />}
      {step === 2 && <PokemonSelection trainerInfo={trainerInfo} setTeam={setTeam} />}
      {step === 3 && <OpponentSelection team={team} setOpponentTeam={setOpponentTeam} />}
    </div>
  );
};

export default Wizard;
