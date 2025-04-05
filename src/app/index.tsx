import { Providers } from "./providers";
import AppRouter from "./routes";
import "./global.css";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    console.log("AOS initialized");
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);
  return (
    <>
      <Providers>
        <AppRouter />
      </Providers>
    </>
  );
}

export default App;
