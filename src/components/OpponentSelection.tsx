import React, { useState, useEffect } from "react";
import axios from "axios";

const OpponentSelection: React.FC<{ team: any[]; setOpponentTeam: Function }> = ({ team, setOpponentTeam }) => {
  const [opponentTeam, setOpponentTeamState] = useState([]);

  useEffect(() => {
    // Logic to generate opponent team based on user's team
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=100")
      .then((response) => {
        const filteredPokemons = response.data.results.filter((pokemon: any) => {
          // Filter logic based on generation
          return true; // Placeholder
        });
        setOpponentTeamState(filteredPokemons.slice(0, 4));
      })
      .catch((error) => console.error(error));
  }, [team]);

  return (
    <div>
      {opponentTeam.map((pokemon: any) => (
        <div key={pokemon.name}>
          <h3>{pokemon.name}</h3>
          {/* Add type, species, and stats details here */}
        </div>
      ))}
      <button onClick={() => setOpponentTeam(opponentTeam)}>Finish</button>
    </div>
  );
};

export default OpponentSelection;
