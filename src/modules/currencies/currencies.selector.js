const selectCurrencies = (state) => state.currencies.currencies;
const selectFavourites = (state) => state.currencies.favourites;

export const selectAllCurrencies = (state) => selectCurrencies(state);

export const selectAllFavourites = (state) => selectFavourites(state);
