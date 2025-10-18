import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Aos from "aos";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import DrawerContext from "./Context/DrawerContext";
import AboutUs from "./Screens/AboutUs";
import ContactUs from "./Screens/ContactUS";
import AddMovie from "./Screens/Dashboard/Admin/AddMovies";
import Dashboard from "./Screens/Dashboard/Admin/Dashboard";
import FavoritesMovies from "./Screens/Dashboard/FavoritesMovies";
import Password from "./Screens/Dashboard/Password";
import Profile from "./Screens/Dashboard/Profile";
import HomeScreen from "./Screens/HomeScreen";
import Login from "./Screens/Login";
import MoviesPage from "./Screens/Movies";
import NotFound from "./Screens/NotFound";
import PopularMoviesPage from "./Screens/PopularMoviesPage";
import Register from "./Screens/Register";
import SearchResults from "./Screens/SearchResults";
import SingleMovie from "./Screens/SingleMovie";
import WatchPage from "./Screens/WatchPage";
import ScrollOnTop from "./ScrollOnTop";
// Create a client
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <DrawerContext>
        <ScrollOnTop>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movie/:id" element={<SingleMovie />} />
            <Route path="/watch/:id" element={<WatchPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password" element={<Password />} />
            <Route path="/favorites" element={<FavoritesMovies />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/AddMovie" element={<AddMovie />} />
            <Route path="/popular-movies" element={<PopularMoviesPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ScrollOnTop>
      </DrawerContext>
    </QueryClientProvider>
  );
}

export default App;
