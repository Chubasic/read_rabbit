import { getCurrentWindow } from '@tauri-apps/api/window';
import { useEffect } from 'preact/hooks';

export default function (onCloseCb: () => Promise<void> | void, inputs: any[]) {

  useEffect(() => {
    const appWindow = getCurrentWindow();
    const listen = async () => await appWindow.onCloseRequested(async (event) => {
      // Prevent the immediate close, e.g. show a confirmation dialog
      event.preventDefault();

      const shouldClose = confirm('Bye.');
      if (shouldClose) {
        await onCloseCb();
        await appWindow.destroy(); // bypasses CloseRequested
        // await appWindow.close();
      }
    });
    const unlistenFuture = listen();
    return () => unlistenFuture.then(unlisten => unlisten())
  }, inputs)

}
