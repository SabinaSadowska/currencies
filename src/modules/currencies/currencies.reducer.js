import { CURRENCIES_ACTION_TYPES } from "./currencies.action";

const INITIAL_STATE = {
  currencies: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENCIES_ACTION_TYPES.ACTION_FETCH_DATA:
      return (state = { ...state });

    case CURRENCIES_ACTION_TYPES.ACTION_FETCH_DATA_SUCCESS:
      return (state = {
        ...state,
        currencies: action.value || [],
      });

    default:
      return state;
  }
};
