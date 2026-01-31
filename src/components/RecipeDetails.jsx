import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./recipeDetails.css";

export default function RecipeDetails({ recipes, apiUrl, onDeleteRecipe }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const numericId = Number(id);
  const fromState = useMemo(
    () => recipes.find((r) => r.id === numericId),
    [recipes, numericId]
  );

  const [recipe, setRecipe] = useState(fromState || null);
  const [loading, setLoading] = useState(!fromState);
  const [error, setError] = useState("");

  // Fetch if not found in state
  useEffect(() => {
    if (fromState) return;

    setLoading(true);
    setError("");

    fetch(`${apiUrl}/recipes/${numericId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Recipe not found");
        return r.json();
      })
      .then((data) => setRecipe(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [apiUrl, numericId, fromState]);

  function handleDelete() {
    fetch(`${apiUrl}/recipes/${numericId}`, { method: "DELETE" }).then(() => {
      onDeleteRecipe(numericId);
      navigate("/");
    });
  }

  if (loading) return <p className="detailsStatus">Loading...</p>;
  if (error) return <p className="detailsStatus error">{error}</p>;
  if (!recipe) return <p className="detailsStatus">No recipe found.</p>;

  return (
    <div className="details">
      <div className="details__top">
        <Link className="back" to="/">
          ← Back
        </Link>
        <button className="danger" onClick={handleDelete}>
          Delete
        </button>
      </div>

      <img
        className="details__img"
        src={recipe.image || "https://via.placeholder.com/600x400"}
        alt={recipe.title}
      />

      <h2 className="details__title">{recipe.title}</h2>
      <p className="details__meta">
        <span>{recipe.category || "Uncategorized"}</span> •{" "}
        <span>{recipe.time || 0} mins</span>
      </p>

      <h3>Instructions</h3>
      <p className="details__text">
        {recipe.instructions || "No instructions provided."}
      </p>
    </div>
  );
}
