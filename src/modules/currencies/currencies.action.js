export const CURRENCIES_ACTION_TYPES = {
  ACTION_FETCH_DATA: "ACTION_FETCH_DATA",
  ACTION_FETCH_DATA_SUCCESS: "ACTION_FETCH_DATA_SUCCESS",
  ACTION_ADD_TO_FAVORITES: "ACTION_ADD_TO_FAVORITES",
};

export const ACTION_FETCH_DATA = () => {
  return (dispatch) => {
    fetch("http://api.nbp.pl/api/exchangerates/tables/a/?format=json")
      .then((response) => response.json())
      .then((json) => {
        dispatch(ACTION_FETCH_DATA_SUCCESS(json));
      });
  };
};

export const ACTION_FETCH_DATA_SUCCESS = (currencies) => {
  return {
    type: CURRENCIES_ACTION_TYPES.ACTION_FETCH_DATA_SUCCESS,
    value: currencies,
  };
};

export const ACTION_ADD_TO_FAVORITES = (event) => {
  return {
    type: CURRENCIES_ACTION_TYPES.ACTION_ADD_TO_FAVORITES,
    value: event.target.dataset.code,
  };
};
