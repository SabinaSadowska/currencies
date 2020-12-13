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
import { ACTION_FETCH_DATA } from "../../modules/currencies/currencies.action";
import { selectAllState } from "../../modules/currencies/currencies.selector";

function Currencies(props) {
  useEffect(() => {
    props.actionFetchData();
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));

  const classes = useStyles();
  const currencies = props.allCurrencies || [];

  const addToFavorite = (event) => {
    event.preventDefault();
    return console.log(event.target.dataset.code);
  };

  const fav = {
    USD: true,
    EUR: true,
    GBP: true,
  };

  const checkType = (data, code, element) => {
    return data[code] ? element : null;
  };

  return (
    <Grid xs={12} md={4} sm={4} lg={4} className="currencies">
      <Grid item xs={12} md={6}>
        <Typography variant="h6" className={classes.title}>
          Currencies
        </Typography>
        <div className={classes.demo}>
          <List>
            {currencies.length
              ? currencies[0].rates.map((el, idx) => (
                  <ListItem key={idx}>
                    <ListItemSecondaryAction>
                      <button
                        data-code={el.code}
                        onClick={(event) => addToFavorite(event)}
                      >
                        Add
                      </button>
                    </ListItemSecondaryAction>
                    <ListItemText primary={el.code} />
                    <ListItemText primary={el.mid} />
                  </ListItem>
                ))
              : null}
          </List>
        </div>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h6" className={classes.title}>
          Favorites
        </Typography>
        <div className={classes.demo}>
          <List>
            {currencies.length &&
              currencies[0].rates.map((element, index) => {
                return checkType(fav, element.code, element) ? (
                  <ListItem key={index}>
                    <ListItemSecondaryAction>
                      <button
                        data-code={element.code}
                        onClick={(event) => addToFavorite(event)}
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
  allCurrencies: selectAllState(state),
});

const mapDispatchToProps = (dispatch) => ({
  actionFetchData: () => {
    dispatch(ACTION_FETCH_DATA());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
