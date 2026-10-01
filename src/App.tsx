import { useState } from "preact/hooks";
import { invoke } from "@tauri-apps/api/core";
import Layout from "./components/layout.tsx";
import preactLogo from "./assets/preact.svg";
import Button from "./components/Button.tsx";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <Layout>

      <h1 class="text-center">Welcome to Tauri + Preact</h1>

      <div class="flex justify-center">
        <a href="https://vite.dev" target="_blank" class="font-medium text-primary hover:text-primary-hover">
          <img src="/vite.svg" class="h-[6em] p-[1.5em] transition-all duration-750 hover:drop-shadow-[0_0_2em_#747bff]" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank" class="font-medium text-primary hover:text-primary-hover">
          <img src="/tauri.svg" class="h-[6em] p-[1.5em] transition-all duration-750 hover:drop-shadow-[0_0_2em_#24c8db]" alt="Tauri logo" />
        </a>
        <a href="https://preactjs.com" target="_blank" class="font-medium text-primary hover:text-primary-hover">
          <img src={preactLogo} class="h-[6em] p-[1.5em] transition-all duration-750 hover:drop-shadow-[0_0_2em_#673ab8]" alt="Preact logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and Preact logos to learn more.</p>

      <form
        class="flex justify-center"
        onSubmit={(e) => {
          console.log("submit", e);
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          class="mr-1.25 rounded-lg border border-transparent px-3 py-2 text-base font-medium bg-surface-light dark:bg-surface-dark shadow-button outline-none"
          onInput={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <Button
          type="submit"
        >Greet</Button>
      </form>
      <p>{greetMsg}</p>
    </Layout>
  );
}

export default App;
