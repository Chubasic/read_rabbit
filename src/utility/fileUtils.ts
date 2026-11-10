import { exists, BaseDirectory, open } from "@tauri-apps/plugin-fs";

// Check if the `$APPDATA/avatar.png` file exists
await exists("avatar.png", { baseDir: BaseDirectory.AppData });

export function fileExists(
  path: string,
  baseDir: BaseDirectory,
): Promise<boolean> {
  return exists(path, { baseDir });
}
// Move to backend
export async function readFile(path: string, baseDir: BaseDirectory): Promise<Uint8Array<ArrayBuffer>> {
  const fileHandle = await open(path, { baseDir });
  const stat = await fileHandle.stat();
  const buff = new Uint8Array(stat.size);
  await fileHandle.read(buff);
  await fileHandle.close();
  return buff;
}
