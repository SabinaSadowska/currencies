import { combineReducers } from "redux";
import currencies from "./currencies/currencies.reducer";

export default combineReducers({
  currencies: currencies,
});
