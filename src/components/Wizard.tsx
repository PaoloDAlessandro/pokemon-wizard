import axios from "axios";
import { CheckCircle2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PokemonDetails, PokemonListItem, TrainerInfo } from "../types";
import OpponentSelection from "./OpponentSelection";
import PokemonSelection from "./PokemonSelection";
import TrainerDetails from "./TrainerDetails";
import { useToast } from "../hooks/use-toast";

const Wizard: React.FC<{ step: number; setStep: Function }> = ({ step, setStep }) => {
  const [trainerInfo, setTrainerInfo] = useState<TrainerInfo | null>(null);
  const [team, setTeam] = useState<PokemonDetails[]>([]);
  const [, setOpponent] = useState<PokemonDetails[] | null>(null);
  const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  const fetchAllPokemon = async () => {
    try {
      const allPokemonResponse = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000");
      const allPokemonList = allPokemonResponse.data.results;
      setAllPokemon(allPokemonList);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch Pokémon list. Please try again.",
        variant: "destructive",
      });
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
      return <OpponentSelection playerTeam={team} setOpponentTeam={setOpponent} nextStep={nextStep} prevStep={prevStep} />;
    case 4:
      return (
        <div className="w-full max-w-4xl mx-auto p-4 text-center">
          <CheckCircle2 className="text-green-500 size-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">All data submitted!</h2>
          <p className="mb-4">You are ready to start the battle!</p>
        </div>
      );
    default:
      return <div>Invalid step</div>;
  }
};

export default Wizard;
