# Agent guide


- We use Preact
- type over interfaces for props
- Sloppy import are not allowed. `import Cmp from "Cmp"` is incorrect import and therefore is sloppy. `import Cmp from "Cmp.tsx"` is a correct import
- File reading is performed via the Tauri backend written in Rust.
