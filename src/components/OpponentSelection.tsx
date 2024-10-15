import axios from "axios";
import { CheckCircle2, ChevronLeftIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { PokemonDetails, PokemonListItem, PokemonTeam } from "../types";
import { Button } from "./Button";
import Loader from "./Loader";
import PokemonCard from "./PokemonCard";

const OpponentSelection: React.FC<{
  playerTeam: PokemonTeam;
  setOpponentTeam: Function;
  allPokemon: PokemonListItem[];
  nextStep: Function;
  prevStep: Function;
}> = ({ playerTeam, setOpponentTeam, allPokemon, nextStep, prevStep }) => {
  const [opponentTeam, setOpponentTeamState] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    generateOpponentTeam();
  }, []);

  const generateOpponentTeam = async () => {
    setIsLoading(true);
    const playerPokemonNames = playerTeam.map((pokemon) => pokemon.name);
    const availablePokemon = allPokemon.filter((pokemon) => !playerPokemonNames.includes(pokemon.name));

    const selectedOpponents = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * availablePokemon.length);
      const selectedPokemon = availablePokemon.splice(randomIndex, 1)[0];

      try {
        const response = await axios.get(selectedPokemon.url);
        const pokemonDetails = response.data;
        selectedOpponents.push(pokemonDetails);
      } catch (error) {
        console.error(`Error fetching details for ${selectedPokemon.name}:`, error);
      }
    }

    setOpponentTeamState(selectedOpponents);
    setIsLoading(false);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setOpponentTeam(opponentTeam);
    setIsConfirmed(true);
    setIsLoading(false);
  };

  const handleNextStep = () => {
    nextStep();
  };

  if (isConfirmed) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4 text-center">
        <CheckCircle2 className="text-green-500 size-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">All data submitted!</h2>
        <p className="mb-4">You are ready to start the battle!</p>
        <Button onClick={handleNextStep} disabled>
          Start Battle
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Opponent Team</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {opponentTeam.map((pokemon: PokemonDetails) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <Button onClick={generateOpponentTeam} variant={"secondary"}>
              Regenerate Team
            </Button>
            <Button onClick={handleConfirm} variant={"default"}>
              Confirm Team
            </Button>
          </div>
        </>
      )}
      <div className="bg-white fixed bottom-0 py-2 pb-4 lg:pb-2 left-0 w-full min-h-10">
        <div className="flex flex-row justify-between items-center w-11/12 mx-auto max-w-[100rem]">
          <div className="w-1/3">
            <Button onClick={() => prevStep()}>
              <ChevronLeftIcon className="w-4 h-4 -ml-2" />
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpponentSelection;
