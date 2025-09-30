import { useState } from "react";

export default function SearchBar({ onSearch, placeholder = "Поиск фильмов..." }) {
    const [q, setQ] = useState("");

    function submit(e) {
        e.preventDefault();
        onSearch(q.trim());
    }

    return (
        <form className="search" onSubmit={submit}>
            <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="search__input"
                placeholder={placeholder}
            />
            <button className="btn" type="submit">Искать</button>
        </form>
    );
}