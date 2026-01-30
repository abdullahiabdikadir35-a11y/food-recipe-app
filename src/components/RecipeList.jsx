import RecipeCard from "./RecipeCard";
import "./RecipeList.css";

export default function RecipeList({ recipes, onDeleteRecipe, onUpdateRecipe }) {
  if (!recipes.length) {
    return <p className="empty">No recipes yet. Add one!</p>;
  }

  return (
    <div className="grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onDeleteRecipe={onDeleteRecipe}
          onUpdateRecipe={onUpdateRecipe}
        />
      ))}
    </div>
  );
}
