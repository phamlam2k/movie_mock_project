import "./App.css";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LoginScreen } from "./components/Auth";
import { HomeScreen } from "./components/Home";
import { MovieScreen } from "./components/Movie";
import { MovieUpdateScreen } from "./components/Update/MovieUpdate";
import { MovieDetailScreen } from "./components/Detail/MovieDetail";
import { MovieCreateScreen } from "./components/Create/MovieCreate";
import { CategoryScreen } from "./components/Category";
import { ActorScreen } from "./components/Actor";
import { CategoryDetailScreen } from "./components/Detail/CategoryDetail";
import { ActorDetailScreen } from "./components/Detail/ActorDetail";
import { CategoryUpdateScreen } from "./components/Update/CategoryUpdate";
import { ActorUpdateScreen } from "./components/Update/ActorUpdate";
import { CategoryCreateScreen } from "./components/Create/CategoryCreate";
import { ActorCreateScreen } from "./components/Create/ActorCreate";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/movie" element={<MovieScreen />} />
        <Route path="/category" element={<CategoryScreen />} />
        <Route path="/actor" element={<ActorScreen />} />
        <Route path="/movie/detail/:id" element={<MovieDetailScreen />} />
        <Route path="/category/detail/:id" element={<CategoryDetailScreen />} />
        <Route path="/category/detail/:id" element={<ActorDetailScreen />} />
        <Route path="/movie/update/:id" element={<MovieUpdateScreen />} />
        <Route path="/category/update/:id" element={<CategoryUpdateScreen />} />
        <Route path="/actor/update/:id" element={<ActorUpdateScreen />} />
        <Route path="/movie/create" element={<MovieCreateScreen />} />
        <Route path="/category/create" element={<CategoryCreateScreen />} />
        <Route path="/actor/create" element={<ActorCreateScreen />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
