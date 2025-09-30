export default function LoadMore({ onClick, disabled, hidden }) {
    if (hidden) return null;
    return (
        <div className="loadMore">
            <button className="btn" disabled={disabled} onClick={onClick}>
                Загрузить ещё
            </button>
        </div>
    );
}