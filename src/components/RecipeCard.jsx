import { useState } from "react";
import { Link } from "react-router-dom";
import "./RecipeCard.css";

const API_URL = "http://localhost:4000";

export default function RecipeCard({ recipe, onDeleteRecipe, onUpdateRecipe }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(recipe.title);
  const [saving, setSaving] = useState(false);

  function handleDelete() {
    fetch(`${API_URL}/recipes/${recipe.id}`, { method: "DELETE" }).then(() => {
      onDeleteRecipe(recipe.id);
    });
  }

  function handleSaveTitle() {
    setSaving(true);

    fetch(`${API_URL}/recipes/${recipe.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editedTitle }),
    })
      .then((r) => r.json())
      .then((updated) => {
        onUpdateRecipe(updated);
        setIsEditing(false);
      })
      .finally(() => setSaving(false));
  }

  return (
    <div className="card">
      <img
        className="card__img"
        src={recipe.image || "https://via.placeholder.com/600x400"}
        alt={recipe.title}
      />

      <div className="card__body">
        {!isEditing ? (
          <h3 className="card__title">
            <Link className="card__link" to={`/recipes/${recipe.id}`}>
              {recipe.title}
            </Link>
          </h3>
        ) : (
          <div className="editRow">
            <input
              className="input"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <button className="btn" onClick={handleSaveTitle} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        )}

        <p className="card__meta">
          <span>{recipe.category || "Uncategorized"}</span> •{" "}
          <span>{recipe.time || 0} mins</span>
        </p>

        <div className="card__actions">
          <button className="btn" onClick={() => setIsEditing((v) => !v)}>
            {isEditing ? "Cancel" : "Edit Title"}
          </button>

          <button className="btn danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
