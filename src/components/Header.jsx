// Header atas untuk pencarian, notifikasi, dan profil pengguna.
export default function Header({ searchValue, onSearchChange }) {
    return (
        <header className="lc-topbar">
            <div className="lc-search">
                <span className="lc-search__icon" aria-hidden="true">
                    <span />
                    <span />
                </span>
                <input
                    className="lc-search__input"
                    type="text"
                    placeholder="Search appointments, clients, treatments..."
                    value={searchValue}
                    onChange={onSearchChange}
                    aria-label="Search"
                />
            </div>

            <div className="lc-topbar__right">
                <button type="button" className="lc-iconbtn" aria-label="Notifications">
                    <span className="lc-bell" aria-hidden="true">
                        <span />
                        <span />
                    </span>
                    <span className="lc-dot" aria-hidden="true" />
                </button>

                <div className="lc-divider" role="separator" aria-orientation="vertical" />

                <button type="button" className="lc-profile">
                    <img className="lc-profile__avatar" src="/img/logo.png" alt="User avatar" />
                    <span className="lc-profile__text">
                        <span className="lc-profile__name">Dr. Anugrah</span>
                        <span className="lc-profile__role">Administrator</span>
                    </span>
                    <span className="lc-profile__chev" aria-hidden="true">
                        <span />
                    </span>
                </button>
            </div>
        </header>
    );
}
