import "./App.css";
import { Typography } from "./components/Typography";
import Wizard from "./components/Wizard"; // Import the Wizard component

function App() {
  return (
    <div className="App bg-gray-100 h-[100dvh] flex flex-col justify-between items-center">
      <header className="App-header mt-3">
        <Typography as="h1" variant="h2" className="text-center text-4xl font-bold pokemon-font px-3">
          Pokémon Team Builder
        </Typography>
      </header>
      <main className="mt-8 w-full h-full">
        <Wizard />
      </main>
    </div>
  );
}

export default App;
