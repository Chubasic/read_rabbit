import { ComponentChild } from "preact";

export default function Layout({ children }: {children: ComponentChild} ) {
  return (
    <div class="min-h-screen bg-background-light dark:bg-background-dark text-foreground font-sans antialiased transition-colors duration-300">
      <main class="max-w-7xl mx-auto px-4 pt-[10vh] flex flex-col justify-center items-center text-center">
        {children}
      </main>
    </div>
  );
}
