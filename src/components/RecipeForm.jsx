import { useState } from "react";
import "./RecipeForm.css";

export default function RecipeForm({ onAddRecipe, apiUrl }) {
  const [formData, setFormData] = useState({
    title: "",
    time: "",
    category: "",
    image: "",
    instructions: "",
  });

  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const newRecipePayload = {
      title: formData.title.trim(),
      time: Number(formData.time) || 0,
      category: formData.category.trim(),
      image: formData.image.trim(),
      instructions: formData.instructions.trim(),
    };

    // ✅ POST
    fetch(`${apiUrl}/recipes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipePayload),
    })
      .then((r) => r.json())
      .then((data) => {
        // ✅ REQUIRED state update after POST response
        onAddRecipe(data);

        // clear form
        setFormData({
          title: "",
          time: "",
          category: "",
          image: "",
          instructions: "",
        });
      })
      .finally(() => setSubmitting(false));
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="label">
        Title
        <input
          className="field"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Spaghetti"
          required
        />
      </label>

      <div className="row">
        <label className="label">
          Time (mins)
          <input
            className="field"
            name="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="e.g. 20"
            type="number"
            min="0"
          />
        </label>

        <label className="label">
          Category
          <input
            className="field"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Dinner"
          />
        </label>
      </div>

      <label className="label">
        Image URL (optional)
        <input
          className="field"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://..."
        />
      </label>

      <label className="label">
        Instructions
        <textarea
          className="field textarea"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Write short steps..."
        />
      </label>

      <button className="submit" type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add Recipe"}
      </button>
    </form>
  );
}
