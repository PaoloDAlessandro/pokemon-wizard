import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useToast } from "../hooks/use-toast";
import { PokemonDetails, PokemonListItem, TrainerInfo } from "../types";
import { Button } from "./Button";
import Loader from "./Loader";
import Pagination from "./Pagination";
import PokemonCard from "./PokemonCard";
import { fetchPokemonData } from "../utils/api";

const POKEMON_PER_PAGE = 20;

const PokemonSelection: React.FC<{ trainerInfo: TrainerInfo | null; team: PokemonDetails[]; setTeam: Function; prevStep: Function; nextStep: Function; allPokemon: PokemonListItem[] }> = ({ trainerInfo, team, setTeam, prevStep, nextStep, allPokemon }) => {
  const [pokemonWithDetails, setPokemonWithDetails] = useState<PokemonDetails[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<PokemonDetails[]>(team);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedPokemon, setSortedPokemon] = useState<PokemonListItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (allPokemon.length > 0 && trainerInfo) {
      sortPokemonByFavoriteType();
    }
  }, [allPokemon, trainerInfo]);

  useEffect(() => {
    if (sortedPokemon.length > 0) {
      fetchPokemonDetails();
    }
  }, [sortedPokemon, currentPage]);

  const sortPokemonByFavoriteType = async () => {
    setIsLoading(true);
    try {
      if (trainerInfo?.favoriteType) {
        const favoriteTypeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${trainerInfo.favoriteType}`);
        const favoriteTypePokemonNames = favoriteTypeResponse.data.pokemon.map((p: any) => p.pokemon.name);

        const favoriteTypePokemon = allPokemon.filter((p) => favoriteTypePokemonNames.includes(p.name));
        const otherPokemon = allPokemon.filter((p) => !favoriteTypePokemonNames.includes(p.name));

        setSortedPokemon([...favoriteTypePokemon, ...otherPokemon]);
      } else {
        setSortedPokemon(allPokemon);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch favorite type Pokémon. Please try again.",
        variant: "destructive",
      });
      setSortedPokemon(allPokemon); // Fallback to unsorted list if there's an error
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPokemonDetails = async () => {
    setIsLoading(true);
    const startIndex = (currentPage - 1) * POKEMON_PER_PAGE;
    const endIndex = startIndex + POKEMON_PER_PAGE;
    const pokemonToFetch = sortedPokemon.slice(startIndex, endIndex);

    const detailsResponses = await fetchPokemonData<PokemonDetails>(
      pokemonToFetch.map((p) => p.url),
      toast
    );
    setPokemonWithDetails(detailsResponses);
    setIsLoading(false);
  };

  const handleSelect = (pokemon: PokemonDetails) => {
    setSelectedPokemons((prev) => {
      const isAlreadySelected = prev.some((p) => p.id === pokemon.id);
      if (isAlreadySelected) {
        return prev.filter((p) => p.id !== pokemon.id);
      } else if (prev.length < 7) {
        return [...prev, pokemon];
      }
      if (prev.length === 7) {
        toast({
          title: "Team full",
          description: "You can only have 7 pokemons in your team",
          variant: "destructive",
          duration: 2500,
        });
      }
      return prev;
    });
  };

  const isInTeam = (pokemon: PokemonDetails) => {
    return selectedPokemons.some((p) => p.id === pokemon.id);
  };

  const totalPages = Math.ceil(sortedPokemon.length / POKEMON_PER_PAGE);

  return (
    <div className="max-w-[100rem] mx-auto">
      <div className="w-full h-full overflow-y-auto pb-20 lg:pb-16 lg:p-2">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
            {pokemonWithDetails.map((pokemon: PokemonDetails) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} onSelect={handleSelect} isInTeam={isInTeam(pokemon)} />
            ))}
          </div>
        )}
      </div>
      <div className="bg-white fixed bottom-0 py-2 pb-4 lg:pb-2 left-0 w-full min-h-10">
        <div className="flex flex-row justify-between items-center w-11/12 mx-auto max-w-[100rem]">
          <div className="w-1/3">
            <Button onClick={() => prevStep()}>
              <ChevronLeftIcon className="w-4 h-4 -ml-2" />
              Back
            </Button>
          </div>
          <div className="w-1/3 flex justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
          <div className="w-1/3 flex justify-end">
            {selectedPokemons.length > 0 && (
              <Button
                onClick={() => {
                  setTeam(selectedPokemons);
                  nextStep();
                }}
                className="h-9"
              >
                Next <ChevronRightIcon className="w-4 h-4 -mr-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonSelection;
