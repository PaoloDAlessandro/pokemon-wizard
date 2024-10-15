import React, { useState, useEffect } from "react";
import axios from "axios";
import { PokemonListItem, TrainerInfo, PokemonDetails } from "../types";
import PokemonSelection from "./PokemonSelection";
import OpponentSelection from "./OpponentSelection";
import TrainerDetails from "./TrainerDetails";

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
    default:
      return <div>Invalid step</div>;
  }
};

export default Wizard;
