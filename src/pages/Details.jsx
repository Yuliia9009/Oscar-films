import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails, getMovieCredits, posterUrl, profileUrl } from "../api/tmdb";
import { useFavorites } from "../hooks/useFavorites";

export default function Details() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { toggle, isFav } = useFavorites();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true); setError("");
                const [m, c] = await Promise.all([
                    getMovieDetails(id),
                    getMovieCredits(id),
                ]);
                setMovie(m); setCredits(c);
            } catch (e) { setError("Не удалось загрузить фильм"); }
            finally { setLoading(false); }
        })();
    }, [id]);

    if (loading) return <div className="container"><p className="msg">Загрузка…</p></div>;
    if (error) return <div className="container"><p className="msg error">{error}</p></div>;
    if (!movie) return null;

    const topCast = (credits?.cast || []).slice(0, 10);

    return (
        <div className="container details">
            <img className="details__poster" src={posterUrl(movie.poster_path, "w780")} alt={movie.title} />
            <div className="details__body">
                <h1 className="details__title">{movie.title}</h1>
                <p className="details__rating">Рейтинг: ★ {movie.vote_average?.toFixed?.(1) ?? "–"}</p>
                <p className="details__overview">{movie.overview || "Описание отсутствует."}</p>
                <button className={isFav(id) ? "btn btn--fav active" : "btn btn--fav"} onClick={() => toggle(movie)}>
                    {isFav(id) ? "Удалить из избранного" : "Добавить в избранное"}
                </button>

                {topCast.length > 0 && (
                    <div className="cast">
                        <h2 className="cast__title">Актеры</h2>
                        <div className="cast__grid">
                            {topCast.map((p) => (
                                <Link to={`/person/${p.id}`} key={p.id} className="cast__item" title={p.name}>
                                    <img src={profileUrl(p.profile_path)} alt={p.name} />
                                    <div className="cast__name">{p.name}</div>
                                    <div className="cast__role">{p.character}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
