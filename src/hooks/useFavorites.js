import { useEffect, useMemo, useState } from "react";

const KEY = "oscar_films_favorites_v1";

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites));
  }, [favorites]);

  const ids = useMemo(() => new Set(favorites.map((m) => m.id)), [favorites]);

  function toggle(movie) {
    setFavorites((prev) => {
      if (prev.some((x) => x.id === movie.id)) {
        return prev.filter((x) => x.id !== movie.id);
      }
      const pick = {
        id: movie.id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path || null,
        vote_average: movie.vote_average ?? null,
        overview: movie.overview ?? "",
      };
      return [pick, ...prev];
    });
  }

  function isFav(id) {
    return ids.has(Number(id));
  }

  return { favorites, toggle, isFav };
}