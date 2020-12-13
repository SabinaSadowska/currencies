import React, { useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import "./currencies.sass";
import {
  ACTION_FETCH_DATA,
  ACTION_ADD_TO_FAVORITES,
  ACTION_DELETE_FROM_FAVOURITES,
  ACTION_DELETE_ALL_FAVOURITES,
} from "../../modules/currencies/currencies.action";
import {
  selectAllFavourites,
  selectAllCurrencies,
} from "../../modules/currencies/currencies.selector";
import "./currencies.sass";

function Currencies(props) {
  useEffect(() => {
    props.actionFetchData();
  }, []);

  const currencies = props.allCurrencies || [];
  const favourites = props.allFavourites;
  console.log(favourites);

  const checkType = (data, code, element) => {
    return data[code] ? element : null;
  };

  const onAlert = (event, fn, txt) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(txt)) {
      return fn(event);
    } else {
      return;
    }
  };

  const onAlertDeleteAll = (fn, txt) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(txt)) {
      return fn();
    } else {
      return;
    }
  };

  return (
    <Grid item lg={10} md={10} sm={12} xs={12} className="currencies">
      <Grid item xs={12} md={5} sm={10}>
        <Typography variant="h6" className="currencies__title">
          Currencies
        </Typography>
        <div>
          <List className="currencies__list">
            {currencies.length
              ? currencies[0].rates.map((el, idx) => (
                  <ListItem key={idx}>
                    {checkType(favourites, el.code, el) ? null : (
                      <ListItemSecondaryAction>
                        <button
                          className="currencies__button"
                          data-code={el.code}
                          onClick={(event) => props.addToFavorites(event)}
                        >
                          Add to favourites
                        </button>
                      </ListItemSecondaryAction>
                    )}

                    <ListItemText primary={el.code} />
                    <ListItemText primary={el.mid} />
                  </ListItem>
                ))
              : null}
          </List>
        </div>
      </Grid>

      <Grid item xs={12} md={3} sm={10}>
        <Typography variant="h6" className="currencies__title --red">
          Favourites
        </Typography>
        <div>
          <List className="currencies__list">
            {currencies.length &&
              currencies[0].rates.map((element, index) => {
                return checkType(favourites, element.code, element) ? (
                  <ListItem key={index}>
                    <ListItemSecondaryAction>
                      <button
                        className="currencies__button --delete"
                        data-code={element.code}
                        onClick={(event) =>
                          onAlert(
                            event,
                            props.deleteFromFavourites,
                            "Delete currency?"
                          )
                        }
                      >
                        Delete
                      </button>
                    </ListItemSecondaryAction>
                    <ListItemText primary={element.code} />
                    <ListItemText primary={element.mid} />
                  </ListItem>
                ) : null;
              })}
            {Object.keys(favourites).length ? (
              <button
                className="currencies__button --deleteAll"
                onClick={() =>
                  onAlertDeleteAll(
                    props.deleteAllFavourites,
                    "Delete all currencies?"
                  )
                }
              >
                Delete all
              </button>
            ) : null}
          </List>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  allCurrencies: selectAllCurrencies(state),
  allFavourites: selectAllFavourites(state),
});

const mapDispatchToProps = (dispatch) => ({
  actionFetchData: () => {
    dispatch(ACTION_FETCH_DATA());
  },
  addToFavorites: (event) => {
    dispatch(ACTION_ADD_TO_FAVORITES(event));
  },
  deleteFromFavourites: (event) => {
    dispatch(ACTION_DELETE_FROM_FAVOURITES(event));
  },
  deleteAllFavourites: (event) => {
    dispatch(ACTION_DELETE_ALL_FAVOURITES());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
