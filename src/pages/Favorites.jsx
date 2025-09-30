import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";
import Grid from "../components/Grid";

export default function Favorites() {
    const { favorites, toggle } = useFavorites();

    return (
        <div className="container">
            <h1 className="title">Избранное</h1>
            {favorites.length === 0 ? (
                <p className="msg">Список избранного пуст</p>
            ) : (
                <Grid>
                    {favorites.map((m) => (
                        <MovieCard
                            key={m.id}
                            movie={m}
                            onFavToggle={toggle}
                            isFav={true}
                        />
                    ))}
                </Grid>
            )}
        </div>
    );
}