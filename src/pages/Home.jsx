import { useEffect, useState } from "react";
import { fetchPopular, searchMovies } from "../api/tmdb";
import { useFavorites } from "../hooks/useFavorites";
import SearchBar from "../components/SearchBar";
import Grid from "../components/Grid";
import MovieCard from "../components/MovieCard";
import LoadMore from "../components/LoadMore";

export default function Home() {
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [mode, setMode] = useState("popular"); // "popular" | "search"
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { toggle, isFav } = useFavorites();

    useEffect(() => {
        loadPopular(1, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function loadPopular(nextPage = 1, reset = false) {
        try {
            setLoading(true); setError("");
            const data = await fetchPopular(nextPage);
            setItems((prev) => reset ? data.results : [...prev, ...data.results]);
            setPage(data.page);
            setTotalPages(data.total_pages);
            setMode("popular");
        } catch (e) { setError("Не удалось загрузить популярные фильмы"); }
        finally { setLoading(false); }
    }

    async function doSearch(q, nextPage = 1, reset = true) {
        if (!q) {
            await loadPopular(1, true);
            setQuery("");
            return;
        }
        try {
            setLoading(true); setError("");
            const data = await searchMovies(q, nextPage);
            setItems((prev) => reset ? data.results : [...prev, ...data.results]);
            setPage(data.page);
            setTotalPages(data.total_pages);
            setMode("search");
            setQuery(q);
        } catch (e) { setError("Ошибка поиска"); }
        finally { setLoading(false); }
    }

    const canLoadMore = page < totalPages;

    return (
        <div className="container">
            <h1 className="title">Каталог фильмов</h1>
            <SearchBar onSearch={(q) => doSearch(q, 1, true)} />

            {error && <p className="msg error">{error}</p>}

            {mode === "search" && !loading && items.length === 0 && (
                <p className="msg">Фильмы не найдены</p>
            )}

            {mode === "popular" && items.length === 0 && loading && (
                <p className="msg">Загружаем популярные…</p>
            )}

            <Grid>
                {items.map((m) => (
                    <MovieCard
                        key={m.id}
                        movie={m}
                        onFavToggle={toggle}
                        isFav={isFav(m.id)}
                    />
                ))}
            </Grid>

            <LoadMore
                hidden={!items.length || !canLoadMore}
                disabled={loading}
                onClick={() => {
                    if (mode === "popular") loadPopular(page + 1);
                    else doSearch(query, page + 1, false);
                }}
            />
        </div>
    );
}