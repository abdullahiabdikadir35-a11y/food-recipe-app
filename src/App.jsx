import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import About from "./pages/About";
import RecipeDetails from "./components/RecipeDetails";

import "./App.css";

const API_URL = "http://localhost:4000";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ GET (load all recipes)
  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(`${API_URL}/recipes`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load recipes");
        return r.json();
      })
      .then((data) => setRecipes(data))
      .catch((err) => setError(err.message || "Something went wrong"))
      .finally(() => setLoading(false));
  }, []);

  // ✅ REQUIRED: state update after POST response
  function addRecipe(newRecipe) {
    setRecipes((prev) => [...prev, newRecipe]);
  }

  // ✅ state update after PATCH response
  function updateRecipe(updatedRecipe) {
    setRecipes((prev) =>
      prev.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r))
    );
  }

  // ✅ state update after DELETE
  function deleteRecipe(id) {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="app">
      <NavBar />

      <main className="container">
        {loading && <p className="status">Loading recipes...</p>}
        {error && <p className="status error">{error}</p>}

        <Routes>
          <Route
            path="/"
            element={
              <Home
                recipes={recipes}
                onDeleteRecipe={deleteRecipe}
                onUpdateRecipe={updateRecipe}
              />
            }
          />

          <Route
            path="/add"
            element={<AddRecipe onAddRecipe={addRecipe} apiUrl={API_URL} />}
          />

          <Route path="/about" element={<About />} />

          {/* Optional but nice */}
          <Route
            path="/recipes/:id"
            element={
              <RecipeDetails
                recipes={recipes}
                apiUrl={API_URL}
                onUpdateRecipe={updateRecipe}
                onDeleteRecipe={deleteRecipe}
              />
            }
          />

          <Route
            path="*"
            element={<p className="status">404 - Page not found</p>}
          />
        </Routes>
      </main>
    </div>
  );
}
