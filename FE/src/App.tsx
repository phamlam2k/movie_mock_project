import "./App.css";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginScreen } from "./components/Auth";
import { HomeScreen } from "./components/Home";
import { MovieScreen } from "./components/Movie";
import { MovieUpdateScreen } from "./components/Update/MovieUpdate";
import { MovieDetailScreen } from "./components/Detail/MovieDetail";
import { MovieCreateScreen } from "./components/Create/MovieCreate";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/movie" element={<MovieScreen />} />
        <Route path="/movie/detail" element={<MovieDetailScreen />} />
        <Route path="/movie/update" element={<MovieUpdateScreen />} />
        <Route path="/movie/create" element={<MovieCreateScreen />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
