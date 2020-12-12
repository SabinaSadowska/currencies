import React, { useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core/styles";
import "./currencies.css";
import { ACTION_FETCH_DATA } from "../modules/currencies/currencies.action";
import { selectAllState } from "../modules/currencies/currencies.selector";

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

  return (
    <Grid xs={12} md={4} sm={4} lg={4} className="currencies">
      <Grid item xs={12} md={6}>
        <Typography variant="h6" className={classes.title}>
          Currencies
        </Typography>
        <div className={classes.demo}>
          <List>
            {currencies.length
              ? currencies[0].rates.map((el) => (
                  <ListItem>
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="addToFavorite">
                        <FavoriteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                    <ListItemText primary={el.code} />
                    <ListItemText primary={el.mid} />
                  </ListItem>
                ))
              : null}
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
