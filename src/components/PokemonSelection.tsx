import axios from "axios";
import React, { useEffect, useState } from "react";
import { PokemonDetails, PokemonListItem, TrainerInfo } from "../types";
import Pagination from "./Pagination";
import PokemonCard from "./PokemonCard";
const POKEMON_PER_PAGE = 20;

const PokemonSelection: React.FC<{ trainerInfo: TrainerInfo | null; setTeam: Function }> = ({ trainerInfo, setTeam }) => {
  const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([]);
  const [pokemonWithDetails, setPokemonWithDetails] = useState<PokemonDetails[]>([]);
  const [selectedPokemons, setSelectedPokemons] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAllPokemon();
  }, [trainerInfo?.favoriteType]);

  useEffect(() => {
    if (allPokemon.length > 0) {
      fetchPokemonDetails();
    }
  }, [allPokemon, currentPage]);

  const fetchAllPokemon = async () => {
    setIsLoading(true);
    try {
      const favoriteTypeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${trainerInfo?.favoriteType}`);
      const favoriteTypePokemon = favoriteTypeResponse.data.pokemon.map((p: any) => p.pokemon);

      const allPokemonResponse = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10000");
      const allPokemonList = allPokemonResponse.data.results;

      const otherPokemon = allPokemonList.filter((p: PokemonListItem) => !favoriteTypePokemon.some((fp: PokemonListItem) => fp.name === p.name));

      const combinedPokemon = [...favoriteTypePokemon, ...otherPokemon];
      setAllPokemon(combinedPokemon);
    } catch (error) {
      console.error("Error fetching Pokemon list:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPokemonDetails = async () => {
    setIsLoading(true);
    const startIndex = (currentPage - 1) * POKEMON_PER_PAGE;
    const endIndex = startIndex + POKEMON_PER_PAGE;
    const pokemonToFetch = allPokemon.slice(startIndex, endIndex);

    try {
      const detailsPromises = pokemonToFetch.map((p: PokemonListItem) => axios.get(p.url));
      const detailsResponses = await Promise.all(detailsPromises);
      const pokemonDetails = detailsResponses.map((response) => response.data);
      setPokemonWithDetails(pokemonDetails);
    } catch (error) {
      console.error("Error fetching Pokemon details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (pokemon: PokemonDetails) => {
    setSelectedPokemons((prev) => {
      const isAlreadySelected = prev.some((p) => p.id === pokemon.id);
      if (isAlreadySelected) {
        return prev.filter((p) => p.id !== pokemon.id);
      } else if (prev.length < 7) {
        return [...prev, pokemon];
      }
      return prev;
    });
  };

  const isInTeam = (pokemon: PokemonDetails) => {
    return selectedPokemons.some((p) => p.id === pokemon.id);
  };

  const totalPages = Math.ceil(allPokemon.length / POKEMON_PER_PAGE);

  return (
    <div>
      <div className="w-full h-full overflow-y-auto pb-16 lg:pb-16 lg:p-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">{isLoading ? <p className="col-span-full text-center">Loading Pokémon...</p> : pokemonWithDetails.map((pokemon: PokemonDetails) => <PokemonCard key={pokemon.id} pokemon={pokemon} onSelect={handleSelect} isInTeam={isInTeam(pokemon)} />)}</div>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default PokemonSelection;
