import {createSelector} from "reselect";
import {CITIES as orderedCities} from "../const";

const allOffers = (state) => state.OFFERS.allOffers;
const favoreiteOffersIds = (state) => state.FAVORITES.favoriteIds;

const getAllOfferIds = createSelector(
    [allOffers],
    (offers) => {
      return offers.map((offer) => offer.id);
    }
);

const getCitiesInfo = createSelector(
    [allOffers],
    (offers) => {
      const City = new Map(
          orderedCities.map((city) => [city, null])
      );

      offers.forEach((offer) => {
        const cityName = offer.cityInfo.name;
        if (!City.get(cityName)) {
          City.set(cityName, offer.cityInfo);
        }
      });

      return City;
    }
);

const getCities = createSelector(
    [getCitiesInfo],
    (citiesInfo) => {
      return Array.from(citiesInfo.keys());
    }
);

const getOffersByCities = createSelector(
    [allOffers, getCities],
    (offers, cities) => {
      const offersByCity = new Map(
          cities.map((city) => [city, []])
      );

      offers.forEach((offer) => {
        offersByCity.get(offer.city).push(offer);
      });

      return offersByCity;
    }
);

const getFirstNotEmptyCity = createSelector(
    [getOffersByCities],
    (offersByCity) => {
      const cities = Array.from(offersByCity.keys());
      const firstNotEmptyCity = cities.find((city) => offersByCity.get(city).length > 0);

      return firstNotEmptyCity ? firstNotEmptyCity : cities[0];
    }
);

const getFavoriteOffersByCities = createSelector(
    [allOffers, favoreiteOffersIds],
    (offers, offersIds) => {
      const favoriteOffersByCities = new Map();

      offers.filter((offer) => offersIds.includes(offer.id))
      .forEach((offer) => {
        if (favoriteOffersByCities.has(offer.city)) {
          favoriteOffersByCities.get(offer.city).push(offer);
        } else {
          favoriteOffersByCities.set(offer.city, [offer]);
        }
      });

      return favoriteOffersByCities;
    }
);

export {
  getAllOfferIds,
  getCitiesInfo,
  getCities,
  getOffersByCities,
  getFirstNotEmptyCity,
  getFavoriteOffersByCities,
};
