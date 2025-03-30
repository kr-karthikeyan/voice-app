import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="dark min-h-screen bg-black text-white">
      <Component {...pageProps} />
    </div>
  );
} 