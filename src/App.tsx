// import { invoke } from "@tauri-apps/api/core";
import Layout from "./layouts/layout.tsx";
import Reader from "./features/Reader/index.tsx";

function App() {
  return (
    <Layout>
      <h1 class="text-center">Welcome message</h1>
      <Reader>
        <div class="one" id="one"></div>
      </Reader>
    </Layout>
  );
}

export default App;
