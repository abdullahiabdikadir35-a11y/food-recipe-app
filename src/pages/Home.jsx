import RecipeList from "../components/RecipeList";
import "./Home.css";

export default function Home({ recipes, onDeleteRecipe, onUpdateRecipe }) {
  return (
    <section className="home">
      <h1 className="home__title">All Recipes</h1>
      <p className="home__subtitle">
        Add recipes, edit titles, and delete recipes (CRUD).
      </p>

      <RecipeList
        recipes={recipes}
        onDeleteRecipe={onDeleteRecipe}
        onUpdateRecipe={onUpdateRecipe}
      />
    </section>
  );
}
