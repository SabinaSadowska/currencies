import { CURRENCIES_ACTION_TYPES } from "./currencies.action";

const INITIAL_STATE = {
  currencies: [],
  favourites: {},
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

    case CURRENCIES_ACTION_TYPES.ACTION_ADD_TO_FAVORITES:
      return (state = {
        ...state,
        currencies: [...state.currencies],
        favourites: {
          ...state.favourites,
          [action.value]: true,
        },
      });

    case CURRENCIES_ACTION_TYPES.ACTION_DELETE_FROM_FAVOURITES:
      return (state = {
        ...state,
        currencies: [...state.currencies],
        favourites: {
          ...state.favourites,
          [action.value]: false,
        },
      });

    default:
      return state;
  }
};
