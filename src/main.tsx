import { render } from "preact";
import App from "./App.tsx";
import "pdfjs-dist/web/pdf_viewer.css";
import "./global.css";
render(<App />, document.getElementById("root")!);
