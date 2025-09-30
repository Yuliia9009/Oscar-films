export default function SidebarFilters({
    genres = [],
    selectedGenres = [],
    onToggleGenre = () => { },
    year = "",
    onYearChange = () => { },
    sort = "popularity.desc",
    onSortChange = () => { },
    adult = false,
    onAdultChange = () => { },
    onApply = () => { },
    onClear = () => { },
}) {
    return (
        <div>
            {/* Жанры */}
            <div className="filter">
                <h3 className="filter__title">Жанры</h3>
                <div className="genres">
                    {genres.map((g) => (
                        <button
                            key={g.id}
                            type="button"
                            className={selectedGenres.includes(g.id) ? "chip active" : "chip"}
                            onClick={() => onToggleGenre(g.id)}
                        >
                            {g.name}
                        </button>
                    ))}
                    {genres.length === 0 && (
                        <div className="msg">Загрузка жанров…</div>
                    )}
                </div>
            </div>

            {/* Год выпуска */}
            <div className="filter">
                <h3 className="filter__title">Год выпуска</h3>
                <input
                    className="input"
                    type="number"
                    inputMode="numeric"
                    placeholder="Напр. 2023"
                    value={year}
                    onChange={(e) => onYearChange(e.target.value)}
                />
            </div>

            {/* Сортировка */}
            <div className="filter">
                <h3 className="filter__title">Сортировка</h3>
                <select
                    className="select"
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value)}
                >
                    <option value="popularity.desc">Популярные</option>
                    <option value="vote_average.desc">По рейтингу</option>
                    <option value="release_date.desc">Новинки</option>
                </select>
            </div>

            {/* 18+ */}
            <div className="filter">
                <h3 className="filter__title">18+</h3>
                <div className="row">
                    <input
                        id="adult-toggle"
                        type="checkbox"
                        checked={adult}
                        onChange={(e) => onAdultChange(e.target.checked)}
                    />
                    <label htmlFor="adult-toggle">Показывать фильмы для взрослых</label>
                </div>
            </div>

            {/* Кнопки действий */}
            <div className="filter">
                <div className="row">
                    <button type="button" className="btn" onClick={onApply}>Применить фильтры</button>
                    <button type="button" className="btn" onClick={onClear}>Сбросить</button>
                </div>
            </div>
        </div>
    );
}

