import { useState } from "react";
import RecipeList from "../components/RecipeList";

export default function Home({
  recipes,
  favourites,
  onToggleFavourite,
  onDeleteRecipe,
  onUpdateRecipe,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section className="home">
      <h1 className="home__title">All Recipes</h1>

      <p className="home__subtitle">
        Search, add, edit, delete, and favourite recipes.
      </p>

      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <RecipeList
        recipes={filteredRecipes}
        favourites={favourites}
        onToggleFavourite={onToggleFavourite}
        onDeleteRecipe={onDeleteRecipe}
        onUpdateRecipe={onUpdateRecipe}
      />
    </section>
  );
}
