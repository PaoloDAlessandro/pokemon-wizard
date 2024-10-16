import React, { useState, useEffect } from "react";
import axios from "axios";
import { PokemonListItem, TrainerInfo, PokemonDetails } from "../types";
import PokemonSelection from "./PokemonSelection";
import OpponentSelection from "./OpponentSelection";
import TrainerDetails from "./TrainerDetails";
import { CheckCircle2 } from "lucide-react";
import { Button } from "./Button";

const Wizard: React.FC<{ step: number; setStep: Function }> = ({ step, setStep }) => {
  const [trainerInfo, setTrainerInfo] = useState<TrainerInfo | null>(null);
  const [team, setTeam] = useState<PokemonDetails[]>([]);
  const [, setOpponent] = useState<PokemonDetails | null>(null);
  const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([]);

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  const fetchAllPokemon = async () => {
    try {
      const allPokemonResponse = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000");
      const allPokemonList = allPokemonResponse.data.results;
      setAllPokemon(allPokemonList);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  switch (step) {
    case 1:
      return <TrainerDetails trainerInfo={trainerInfo} setTrainerInfo={setTrainerInfo} nextStep={nextStep} />;
    case 2:
      return <PokemonSelection trainerInfo={trainerInfo} team={team} setTeam={setTeam} prevStep={prevStep} nextStep={nextStep} allPokemon={allPokemon} />;
    case 3:
      return <OpponentSelection playerTeam={team} setOpponentTeam={setOpponent} allPokemon={allPokemon} nextStep={nextStep} prevStep={prevStep} />;
    case 4:
      return (
        <div className="w-full max-w-4xl mx-auto p-4 text-center">
          <CheckCircle2 className="text-green-500 size-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">All data submitted!</h2>
          <p className="mb-4">You are ready to start the battle!</p>
          <Button disabled>Start Battle</Button>
        </div>
      );
    default:
      return <div>Invalid step</div>;
  }
};

export default Wizard;
