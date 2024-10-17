import { PokemonDetails } from "../types";

export const POKEMON_GENERATIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const generationMap: { [key: string]: number } = {
  red: 1,
  blue: 1,
  yellow: 1,
  gold: 2,
  silver: 2,
  crystal: 2,
  ruby: 3,
  sapphire: 3,
  emerald: 3,
  firered: 3,
  leafgreen: 3,
  diamond: 4,
  pearl: 4,
  platinum: 4,
  heartgold: 4,
  soulsilver: 4,
  black: 5,
  white: 5,
  "black-2": 5,
  "white-2": 5,
  x: 6,
  y: 6,
  "omega-ruby": 6,
  "alpha-sapphire": 6,
  sun: 7,
  moon: 7,
  "ultra-sun": 7,
  "ultra-moon": 7,
  sword: 8,
  shield: 8,
  "brilliant-diamond": 8,
  "shining-pearl": 8,
  scarlet: 9,
  violet: 9,
};

export function getPokemonGeneration(gameIndices: PokemonDetails["game_indices"]): number | null {
  if (gameIndices.length === 0) {
    return null;
  }
  const gameIndex = gameIndices[0];
  const gameName = gameIndex.version.name.toLowerCase();
  if (generationMap[gameName]) {
    return generationMap[gameName];
  }

  return null;
}

export const selectRandomItems = <T>(items: T[], count: number): T[] => {
  const selected: T[] = [];
  const available = [...items];
  while (selected.length < count && available.length > 0) {
    const randomIndex = Math.floor(Math.random() * available.length);
    const randomItem = available.splice(randomIndex, 1)[0];
    selected.push(randomItem);
  }
  return selected;
};
