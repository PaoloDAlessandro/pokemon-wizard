import { ChevronLeftIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useToast } from "../hooks/use-toast";
import { PokemonDetails, PokemonGeneration, PokemonSpecies, PokemonTeam } from "../types";
import { fetchPokemonData } from "../utils/api";
import { getPokemonGeneration, POKEMON_GENERATIONS, selectRandomItems } from "../utils/pokemon";
import { Button } from "./Button";
import Loader from "./Loader";
import PokemonCard from "./PokemonCard";

interface OpponentSelectionProps {
  playerTeam: PokemonTeam;
  setOpponentTeam: React.Dispatch<React.SetStateAction<PokemonDetails[] | null>>;
  nextStep: () => void;
  prevStep: () => void;
}

const OpponentSelection: React.FC<OpponentSelectionProps> = ({ playerTeam, setOpponentTeam, nextStep, prevStep }) => {
  const [opponentTeam, setOpponentTeamState] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateOpponentTeam = useCallback(async () => {
    setIsLoading(true);
    try {
      const playerPokemonGenerations = new Set(playerTeam.map((pokemon) => getPokemonGeneration(pokemon.game_indices)).filter((gen): gen is number => gen !== null));

      const generationsToFetch = POKEMON_GENERATIONS.filter((generation) => !playerPokemonGenerations.has(generation));

      const pokemonGenerationsInfos = await fetchPokemonData<PokemonGeneration>(
        generationsToFetch.map((gen) => `https://pokeapi.co/api/v2/generation/${gen}`),
        toast
      );

      const eligiblePokemonSpecies = pokemonGenerationsInfos.flatMap((generationInfo) => generationInfo.pokemon_species);

      const selectedSpecies = selectRandomItems(eligiblePokemonSpecies, 4);

      if (selectedSpecies.length < 4) {
        throw new Error("Not enough eligible Pokémon species to form a team.");
      }

      const opponentSpecies = await fetchPokemonData<PokemonSpecies>(
        selectedSpecies.map((species) => species.url),
        toast
      );

      const opponentVariants = opponentSpecies.map((species) => {
        const randomVariety = selectRandomItems(species.varieties, 1)[0];
        return randomVariety.pokemon;
      });

      const opponentPokemon = await fetchPokemonData<PokemonDetails>(
        opponentVariants.map((variant) => variant.url),
        toast
      );

      setOpponentTeamState(opponentPokemon);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [playerTeam, toast]);

  if (opponentTeam.length === 0 && !isLoading) {
    generateOpponentTeam();
  }

  const handleConfirm = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Simulate API call
    setOpponentTeam(opponentTeam);
    setIsLoading(false);
    nextStep();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Opponent Team</h2>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="pb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {opponentTeam.map((pokemon: PokemonDetails) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <Button onClick={generateOpponentTeam} variant="secondary">
              Regenerate Team
            </Button>
            <Button onClick={handleConfirm} variant="default">
              Confirm Team
            </Button>
          </div>
        </div>
      )}
      <div className="bg-white fixed bottom-0 py-2 pb-4 lg:pb-2 left-0 w-full min-h-10">
        <div className="flex flex-row justify-between items-center w-11/12 mx-auto max-w-[100rem]">
          <div className="w-1/3">
            <Button onClick={prevStep}>
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
