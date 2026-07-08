"use client";

import { useState } from "react";

interface Item {
  id: number;
  name: string;
  done: boolean;
}

const SUGGESTIONS = [
  "Latte",
  "Pane",
  "Uova",
  "Pomodori",
  "Pasta",
  "Olio d'oliva",
  "Mozzarella",
  "Banane",
  "Caffè",
  "Riso",
];

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(1);

  const addItem = (name: string) => {
    if (!name.trim()) return;
    setItems((prev) => [...prev, { id: nextId, name: name.trim(), done: false }]);
    setNextId((n) => n + 1);
    setInput("");
  };

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const unusedSuggestions = SUGGESTIONS.filter(
    (s) => !items.some((i) => i.name.toLowerCase() === s.toLowerCase())
  );

  return (
    <main
      style={{
        maxWidth: 480,
        margin: "0 auto",
        padding: "2rem 1rem",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "0.25rem" }}>
        Lista della Spesa
      </h1>
      <p
        style={{
          textAlign: "center",
          color: "#666",
          fontSize: "0.9rem",
          marginBottom: "1.5rem",
        }}
      >
        Seed Demo &mdash; powered by IDV
      </p>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addItem(input);
        }}
        style={{ display: "flex", gap: 8, marginBottom: "1rem" }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Aggiungi un prodotto..."
          style={{
            flex: 1,
            padding: "0.6rem 0.8rem",
            borderRadius: 8,
            border: "1px solid #ddd",
            fontSize: "1rem",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.6rem 1.2rem",
            borderRadius: 8,
            border: "none",
            background: "#4f46e5",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          +
        </button>
      </form>

      {/* Suggestions */}
      {unusedSuggestions.length > 0 && (
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ fontSize: "0.8rem", color: "#888", marginBottom: 6 }}>
            Suggerimenti:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {unusedSuggestions.map((s) => (
              <button
                key={s}
                onClick={() => addItem(s)}
                style={{
                  padding: "0.3rem 0.7rem",
                  borderRadius: 16,
                  border: "1px solid #e0e0e0",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  color: "#555",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* List */}
      {items.length === 0 ? (
        <p style={{ textAlign: "center", color: "#aaa", marginTop: "2rem" }}>
          Nessun prodotto nella lista.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0.6rem 0.8rem",
                marginBottom: 6,
                background: "#fff",
                borderRadius: 8,
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggleItem(item.id)}
                style={{ width: 18, height: 18, cursor: "pointer" }}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: item.done ? "line-through" : "none",
                  color: item.done ? "#aaa" : "#1a1a2e",
                }}
              >
                {item.name}
              </span>
              <button
                onClick={() => removeItem(item.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#e53e3e",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  padding: "0 4px",
                }}
                title="Rimuovi"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <p
          style={{
            textAlign: "center",
            fontSize: "0.85rem",
            color: "#888",
            marginTop: "1rem",
          }}
        >
          {items.filter((i) => i.done).length}/{items.length} completati
        </p>
      )}
    </main>
  );
}
