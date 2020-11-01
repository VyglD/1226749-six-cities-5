import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Header from "../header/header";
import FavoritesCities from "../favorites-cities/favorites-cities";
import {
  offerIdsType,
} from "../../types";
import {Path} from "../../const";

const Favorites = (props) => {
  const {
    favoriteOfferIds,
  } = props;

  const emptyTriger = favoriteOfferIds.length === 0;

  return (
    <div className={`page ${emptyTriger && `page--favorites-empty`}`}>
      <Header />

      <main
        className={
          `page__main page__main--favorites ${emptyTriger && `page__main--favorites-empty`}`
        }
      >
        <div className="page__favorites-container container">
          <section className={`favorites ${emptyTriger && `favorites--empty` }`}>
            <h1 className="favorites__title">Saved listing</h1>
            {
              emptyTriger
                ? (
                  <div className="favorites__status-wrapper">
                    <b className="favorites__status">Nothing yet saved.</b>
                    <p className="favorites__status-description">
                      Save properties to narrow down search or plan yor future trips.
                    </p>
                  </div>
                )
                : (
                  <FavoritesCities
                    favoriteOfferIds={favoriteOfferIds}
                  />
                )
            }
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link
          className="footer__logo-link"
          to={Path.MAIN}
        >
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
};

Favorites.propTypes = {
  favoriteOfferIds: offerIdsType,
};

const mapStateToProps = ({FAVORITES}) => ({
  favoriteOfferIds: FAVORITES.favoriteOfferIds,
});

export {Favorites};
export default connect(mapStateToProps)(Favorites);
