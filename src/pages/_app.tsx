import "@/styles/globals.css"; // @==src dir
import type { AppProps } from "next/app";
import Layout from "@/pages/Components/NavigationBar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout />
      <Component {...pageProps} />
    </>
  );
}
