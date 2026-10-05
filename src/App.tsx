import { useState } from "preact/hooks";
import { invoke } from "@tauri-apps/api/core";
import Layout from "./layouts/layout.tsx";
import preactLogo from "./assets/preact.svg";
import Button from "./components/Button.tsx";
import Reader from "./components/Reader/index.tsx";
import { ChatInput } from "./components/ChatInput.tsx";
import { FileUploadInput } from "./components/FileUploadInput.tsx";
import ValueInput from "./components/ValueInput/index.tsx";
import TextArea from "./components/TextArea/index.tsx";
import DatePicker from "./components/DatePicker/index.tsx";
import Slider from "./components/Slider/index.tsx";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState<string | number | boolean>("");

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

        <ValueInput label="Test" onOutput={({value, name: _}) => {
          setName(value.toString())
        }}
          placeholder="Enter a name..."
          value={name as string}
        />

        <TextArea  label="Test" onOutput={({value, name: _}) => {
          setName(value.toString())
        }}
          placeholder="Enter a name..."
          value={name as string}
        />

        <DatePicker label="Test" onOutput={({value, name: _}) => {
          setName(value.toString())
        }}/>


        <Slider label="Test" onOutput={({value, name: _}) => {
          setName(value.toString())
        }}/>
        <Button
          type="submit"
        >Greet</Button>
      </form>
      <p>{greetMsg}</p>


      <ChatInput onSubmit={(text) => { console.log(text) }}></ChatInput>


      <FileUploadInput />
        <Reader>
          <div class="one" id="one">


              <div class="two" id="two">
                  <div class="three" id="three"></div>
              </div>
          </div>
        </Reader>
    </Layout>
  );
}

export default App;
