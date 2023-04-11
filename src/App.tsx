import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { LoginScreen } from "./components/Auth";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "@tanstack/react-query";
import { HomeScreen } from "./components/Home";
import { MovieScreen } from "./components/Movie";

function App() {
  const [count, setCount] = useState(0);

  const queryClient = useQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/movie" element={<MovieScreen />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
