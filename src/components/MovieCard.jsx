import { Link } from "react-router-dom";
import { posterUrl } from "../api/tmdb";

export default function MovieCard({ movie, onFavToggle, isFav }) {
    const { id, title, poster_path, vote_average } = movie;
    return (
        <div className="card">
            <Link to={`/movie/${id}`} className="card__imageWrap">
                <img src={posterUrl(poster_path)} alt={title} className="card__image" />
            </Link>
            <div className="card__body">
                <h3 className="card__title" title={title}>{title}</h3>
                <div className="card__meta">
                    <span className="rating">★ {vote_average?.toFixed?.(1) ?? "–"}</span>
                    <button className={isFav ? "btn btn--fav active" : "btn btn--fav"} onClick={() => onFavToggle(movie)}>
                        {isFav ? "В избранном" : "В избранное"}
                    </button>
                </div>
                <Link to={`/movie/${id}`} className="btn btn--link">Подробнее →</Link>
            </div>
        </div>
    );
}