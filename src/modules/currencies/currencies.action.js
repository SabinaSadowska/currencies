export const CURRENCIES_ACTION_TYPES = {
  ACTION_FETCH_DATA: "ACTION_FETCH_DATA",
  ACTION_FETCH_DATA_SUCCESS: "ACTION_FETCH_DATA_SUCCESS",
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
