import React, { useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { makeStyles } from "@material-ui/core/styles";
import "./currencies.css";
import {
  ACTION_FETCH_DATA,
  ACTION_ADD_TO_FAVORITES,
  ACTION_DELETE_FROM_FAVOURITES,
} from "../../modules/currencies/currencies.action";
import {
  selectAllFavourites,
  selectAllCurrencies,
} from "../../modules/currencies/currencies.selector";

function Currencies(props) {
  useEffect(() => {
    props.actionFetchData();
  }, []);

  const useStyles = makeStyles((theme) => ({
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));

  const classes = useStyles();
  const currencies = props.allCurrencies || [];
  const favourites = props.allFavourites;

  const checkType = (data, code, element) => {
    return data[code] ? element : null;
  };

  return (
    <Grid lg={12} md={12} sm={12} xs={12} row className="currencies">
      <Grid item xs={12} md={5} sm={5}>
        <Typography variant="h6" className={classes.title}>
          Currencies
        </Typography>
        <div className={classes.demo}>
          <List>
            {currencies.length
              ? currencies[0].rates.map((el, idx) => (
                  <ListItem key={idx}>
                    {checkType(favourites, el.code, el) ? null : (
                      <ListItemSecondaryAction>
                        <button
                          data-code={el.code}
                          onClick={(event) => props.addToFavorites(event)}
                        >
                          Add
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

      <Grid item xs={12} md={5}>
        <Typography variant="h6" className={classes.title}>
          Favourites
        </Typography>
        <div className={classes.demo}>
          <List>
            {currencies.length &&
              currencies[0].rates.map((element, index) => {
                return checkType(favourites, element.code, element) ? (
                  <ListItem key={index}>
                    <ListItemSecondaryAction>
                      <button
                        data-code={element.code}
                        onClick={(event) => props.deleteFromFavourites(event)}
                      >
                        Delete
                      </button>
                    </ListItemSecondaryAction>
                    <ListItemText primary={element.code} />
                    <ListItemText primary={element.mid} />
                  </ListItem>
                ) : null;
              })}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
