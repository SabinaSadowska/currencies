const selectCurrencies = (state) => state.currencies.currencies;

export const selectAllState = (state) => selectCurrencies(state);
