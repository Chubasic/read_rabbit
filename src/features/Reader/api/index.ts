import { invoke } from "@tauri-apps/api/core";

export async function saveLastPage(bookId: string, lastPage: number) {
  await invoke('set_last_page', {
    patch: {
      id: bookId,
      last_page: lastPage,
    }
  });
}
