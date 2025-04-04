import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { store } from "@services/store";
import { useEffect } from "react";
import { Provider } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 1000, // thời gian hiệu ứng (ms)
      once: true, // chỉ animate 1 lần khi scroll tới
    });
  });

  return (
    <HeroUIProvider>
      <ToastProvider />
      <Provider store={store}>{children}</Provider>
    </HeroUIProvider>
  );
}
