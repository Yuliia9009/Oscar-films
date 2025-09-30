import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPersonDetails, getPersonMovieCredits, profileUrl } from "../api/tmdb";
import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";

export default function Person() {
    const { id } = useParams();
    const { toggle, isFav } = useFavorites();
    const [person, setPerson] = useState(null);
    const [credits, setCredits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                setLoading(true); setError("");
                const [p, c] = await Promise.all([
                    getPersonDetails(id),
                    getPersonMovieCredits(id),
                ]);
                setPerson(p);
                const cast = (c.cast || []).sort((a, b) => (b.release_date || "").localeCompare(a.release_date || ""));
                setCredits(cast);
            } catch (e) { setError("Не удалось загрузить персону"); }
            finally { setLoading(false); }
        })();
    }, [id]);

    if (loading) return <div className="container"><p className="msg">Загрузка…</p></div>;
    if (error) return <div className="container"><p className="msg error">{error}</p></div>;
    if (!person) return null;

    return (
        <div className="container">
            <div className="person">
                <img className="person__avatar" src={profileUrl(person.profile_path, "w342")} alt={person.name} />
                <div className="person__body">
                    <h1 className="person__name">{person.name}</h1>
                    {person.biography && <p className="person__bio">{person.biography}</p>}
                </div>
            </div>

            <h2 style={{ marginTop: 16 }}>Фильмография</h2>
            <div className="grid">
                {credits.map((m) => (
                    <MovieCard
                        key={m.credit_id || `${m.id}-${m.release_date}`}
                        movie={m}
                        onFavToggle={toggle}
                        isFav={isFav(m.id)}
                    />
                ))}
            </div>
        </div>
    );
}