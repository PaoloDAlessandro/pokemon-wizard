import React from "react";
import { PokemonDetails } from "../types";
import { ResponsiveDialog } from "./ResponsiveDialog";
import { Typography } from "./Typography";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./Carousel";
import { ChevronLeft, ChevronRight, Dna, Swords, Shapes } from "lucide-react";
import { Button } from "./Button";

const PokemonCard: React.FC<{
  pokemon: PokemonDetails;
  onSelect?: (pokemon: PokemonDetails) => void;
  isInTeam?: boolean;
}> = ({ pokemon, onSelect, isInTeam }) => {
  return (
    <ResponsiveDialog trigger={<PokemonCardListItem pokemon={pokemon} onSelect={onSelect} isInTeam={isInTeam} />}>
      <div className="flex flex-col items-center lg:max-h-[84vh] p-6 bg-gradient-to-b overflow-y-auto from-blue-100 to-blue-50 rounded-xl">
        <div className="flex flex-col items-center max-h-[90dvh] overflow-auto scrollbar-hide">
          <div className="flex flex-row justify-center w-4/5 px-4 py-2 mb-4 bg-white rounded-lg shadow-lg">
            <div className="relative size-52 md:size-32 lg:size-48">
              <Carousel className="w-full h-full">
                <CarouselContent>
                  <CarouselItem>
                    <img src={pokemon.sprites.front_default} alt={`${pokemon.name} front view`} className="w-full h-full object-contain" />
                  </CarouselItem>
                  <CarouselItem>
                    <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back view`} className="w-full h-full object-contain" />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600">
                  <ChevronLeft size={24} />
                </CarouselPrevious>
                <CarouselNext className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600">
                  <ChevronRight size={24} />
                </CarouselNext>
              </Carousel>
            </div>
          </div>

          <Typography as="h2" variant="h3" className="text-center font-bold mt-3 mb-2 capitalize text-2xl text-gray-800">
            {pokemon.name}
          </Typography>

          <div className="flex flex-row gap-2 mb-6">
            {pokemon.types.map((type) => (
              <div key={type.type.name} className="rounded-full bg-blue-500 px-4 py-1 text-white text-sm font-medium uppercase tracking-wide">
                {type.type.name}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <section className="bg-white p-4 rounded-lg shadow-md">
              <Typography as="h3" variant="h5" className="font-semibold mb-3 text-lg text-blue-600 flex items-center">
                <Dna className="mr-2 text-blue-500" size={20} />
                Species
              </Typography>
              <p className="capitalize text-gray-600">{pokemon.species.name}</p>
            </section>

            <section className="bg-white p-4 rounded-lg shadow-md">
              <Typography as="h3" variant="h5" className="font-semibold mb-3 text-lg text-blue-600 flex items-center">
                <Shapes className="mr-2 text-blue-500" size={20} />
                Forms
              </Typography>
              <ul className="list-none flex flex-wrap gap-2">
                {pokemon.forms.map((form) => (
                  <li key={form.name} className="capitalize bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {form.name}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white p-4 rounded-lg shadow-md md:col-span-2">
              <Typography as="h3" variant="h5" className="font-semibold mb-3 text-lg text-blue-600 flex items-center">
                <Swords className="mr-2 text-blue-500" size={20} />
                Moves
              </Typography>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 h-[calc(3*2.25rem+2*0.5rem)] overflow-y-auto pr-2">
                {pokemon.moves.map((move) => (
                  <div key={move.move.name} className="bg-blue-50 border border-blue-200 rounded-md px-3 py-1 text-center h-9 flex items-center justify-center">
                    <span className="capitalize text-blue-700 text-sm font-medium truncate w-full">{move.move.name.replace("-", " ")}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {onSelect && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(pokemon);
            }}
            className={`w-full py-2 mt-6 rounded-md text-white text-sm font-medium transition-colors duration-300 ${isInTeam ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
          >
            {isInTeam ? "Remove from Team" : "Add to Team"}
          </Button>
        )}
      </div>
    </ResponsiveDialog>
  );
};

interface PokemonCardListItemProps {
  pokemon: PokemonDetails;
  onSelect?: (pokemon: PokemonDetails) => void;
  isInTeam?: boolean;
}

const PokemonCardListItem = React.forwardRef<HTMLDivElement, PokemonCardListItemProps>(({ pokemon, onSelect, isInTeam, ...props }, ref) => {
  return (
    <div className="flex flex-col w-full max-w-xs bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden cursor-pointer" ref={ref} {...props}>
      <div className="relative pt-[70%] bg-gradient-to-b from-blue-100 to-blue-50">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} className="absolute top-0 left-0 w-full h-full object-contain p-4" />
      </div>
      <div className="p-4 flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <Typography as="h3" variant="h4" className="font-bold capitalize text-gray-800 mb-2 truncate">
            {pokemon.name}
          </Typography>
          <div className="flex flex-wrap gap-2 mb-3">
            {pokemon.types.map((type) => (
              <span key={type.type.name} className="px-2 py-1 bg-blue-500 rounded-full text-white text-xs font-semibold uppercase tracking-wide">
                {type.type.name}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-600 mb-4">
            <span className="mr-3">HP: {pokemon.stats.find((stat) => stat.stat.name === "hp")?.base_stat}</span>
            <span>EXP: {pokemon.base_experience}</span>
          </div>
        </div>
        {onSelect && (
          <Button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the dialog
              onSelect(pokemon);
            }}
            className={`w-full py-2 rounded-md text-white text-sm font-medium transition-colors duration-300 ${isInTeam ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
          >
            {isInTeam ? "Remove from Team" : "Add to Team"}
          </Button>
        )}
      </div>
    </div>
  );
});

PokemonCardListItem.displayName = "PokemonCardListItem";

export default PokemonCard;
