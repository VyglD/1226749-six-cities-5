import React from "react";
import Review from "../review/review";
import ReviewForm from "../review-form/review-form";
import {
  componentType,
  historyType,
  offersType,
  reviewsType,
  pathsType,
  functionType,
  emailType
} from "../../types";

class Offer extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      offerValidity: this.isOfferIdValid(),
    };

    if (this.state.offerValidity) {
      this.state.offerId = this.getOfferId();
    }
  }

  getOfferId() {
    const {history} = this.props;

    const pathItems = history.location.pathname.split(`/`);
    return pathItems[pathItems.length - 1];
  }

  isOfferIdValid() {
    const {offers} = this.props;

    return offers.map((offer) => offer.id).includes(this.getOfferId());
  }

  render() {
    const {
      header,
      offers,
      reviews: allReviews,
      history,
      paths,
      getRateVisualisation,
      getSystemFormattedDate,
      getHumanFormattedDate,
      email
    } = this.props;

    if (this.state.offerValidity) {
      const offer = offers.find((element) => element.id === this.state.offerId);

      const reviews = allReviews.filter((review) => review.offerId === this.state.offerId);

      return (
        <div className="page">
          {header}

          <main className="page__main page__main--property">
            <section className="property">
              <div className="property__gallery-container container">
                <div className="property__gallery">

                  {
                    offer.photos.map((photo, index) => {
                      return (
                        <div className="property__image-wrapper" key={index}>
                          <img
                            className="property__image"
                            src={photo}
                            width="260"
                            height="200"
                            alt="Photo studio"
                          />
                        </div>
                      );
                    })
                  }

                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">

                  {
                    offer.isPremium
                      ? (
                        <div className="property__mark">
                          <span>Premium</span>
                        </div>
                      )
                      : ``
                  }

                  <div className="property__name-wrapper">
                    <h1 className="property__name">
                      {offer.title}
                    </h1>
                    <button
                      className="property__bookmark-button button"
                      type="button"
                    >
                      <svg className="property__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span style={getRateVisualisation(offer.rate)}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">{offer.rate}</span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      {offer.housingType}
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {offer.rooms} Bedrooms
                    </li>
                    <li className="property__feature property__feature--adults">
                      Max {offer.guests} adults
                    </li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">&euro;{offer.cost}</b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">What&apos;s inside</h2>
                    <ul className="property__inside-list">
                      {
                        offer.features.map((feature) => (
                          <li className="property__inside-item" key={feature}>
                            {feature}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div className={
                        `property__avatar-wrapper ${
                          offer.owner.isSuper
                            ? `property__avatar-wrapper--pro`
                            : ``
                        } user__avatar-wrapper`
                      }>
                        <img
                          className="property__avatar user__avatar"
                          src={offer.owner.avatar}
                          width="74"
                          height="74"
                          alt="Host avatar"
                        />
                      </div>
                      <span className="property__user-name">
                        {offer.owner.name}
                      </span>
                    </div>
                    <div className="property__description">
                      {
                        offer.description.map((paragraph, index) => (
                          <p className="property__text" key={index}>{paragraph}</p>
                        ))
                      }
                    </div>
                  </div>
                  <section className="property__reviews reviews">
                    <h2 className="reviews__title">
                      Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
                    </h2>
                    <ul className="reviews__list">
                      {
                        reviews.map((review, index) => (
                          <Review
                            key={index}
                            review={review}
                            getRateVisualisation={getRateVisualisation}
                            getSystemFormattedDate={getSystemFormattedDate}
                            getHumanFormattedDate={getHumanFormattedDate}
                          />
                        ))
                      }
                    </ul>
                    {
                      email
                        ? <ReviewForm />
                        : ``
                    }
                  </section>
                </div>
              </div>
              <section className="property__map map"></section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">
                  <article className="near-places__card place-card">
                    <div className="near-places__image-wrapper place-card__image-wrapper">
                      <a href="#">
                        <img className="place-card__image" src="/img/room.jpg" width="260" height="200" alt="Place image"/>
                      </a>
                    </div>
                    <div className="place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;80</b>
                          <span className="place-card__price-text">&#47;&nbsp;night</span>
                        </div>
                        <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                          <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark"></use>
                          </svg>
                          <span className="visually-hidden">In bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{width: `80%`}}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <a href="#">Wood and stone place</a>
                      </h2>
                      <p className="place-card__type">Private room</p>
                    </div>
                  </article>

                  <article className="near-places__card place-card">
                    <div className="near-places__image-wrapper place-card__image-wrapper">
                      <a href="#">
                        <img className="place-card__image" src="/img/apartment-02.jpg" width="260" height="200" alt="Place image"/>
                      </a>
                    </div>
                    <div className="place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;132</b>
                          <span className="place-card__price-text">&#47;&nbsp;night</span>
                        </div>
                        <button className="place-card__bookmark-button button" type="button">
                          <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark"></use>
                          </svg>
                          <span className="visually-hidden">To bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{width: `80%`}}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <a href="#">Canal View Prinsengracht</a>
                      </h2>
                      <p className="place-card__type">Apartment</p>
                    </div>
                  </article>

                  <article className="near-places__card place-card">
                    <div className="near-places__image-wrapper place-card__image-wrapper">
                      <a href="#">
                        <img className="place-card__image" src="/img/apartment-03.jpg" width="260" height="200" alt="Place image"/>
                      </a>
                    </div>
                    <div className="place-card__info">
                      <div className="place-card__price-wrapper">
                        <div className="place-card__price">
                          <b className="place-card__price-value">&euro;180</b>
                          <span className="place-card__price-text">&#47;&nbsp;night</span>
                        </div>
                        <button className="place-card__bookmark-button button" type="button">
                          <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark"></use>
                          </svg>
                          <span className="visually-hidden">To bookmarks</span>
                        </button>
                      </div>
                      <div className="place-card__rating rating">
                        <div className="place-card__stars rating__stars">
                          <span style={{width: `100%`}}></span>
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <h2 className="place-card__name">
                        <a href="#">Nice, cozy, warm big bed apartment</a>
                      </h2>
                      <p className="place-card__type">Apartment</p>
                    </div>
                  </article>
                </div>
              </section>
            </div>
          </main>
        </div>
      );
    }

    history.replace(paths.MAIN);

    return null;
  }
}

Offer.propTypes = {
  header: componentType,
  offers: offersType,
  reviews: reviewsType,
  history: historyType,
  paths: pathsType,
  getRateVisualisation: functionType,
  getSystemFormattedDate: functionType,
  getHumanFormattedDate: functionType,
  email: emailType,
};

export default Offer;
