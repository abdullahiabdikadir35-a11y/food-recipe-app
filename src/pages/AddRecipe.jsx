import RecipeForm from "../components/RecipeForm";
import "./AddRecipe.css";

export default function AddRecipe({ onAddRecipe, apiUrl }) {
  return (
    <section className="add">
      <h1 className="add__title">Add a Recipe</h1>
      <p className="add__subtitle">This form is controlled and sends a POST.</p>

      <RecipeForm onAddRecipe={onAddRecipe} apiUrl={apiUrl} />
    </section>
  );
}
