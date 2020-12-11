import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import "./currencies.css";
import { ACTION_FETCH_DATA } from "../modules/currencies/currencies.action";

function Currencies(props) {
  useEffect(() => {
    props.actionFetchData();
  }, []);

  return (
    <div className="currencies">
      <Grid>
        <Grid></Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  actionFetchData: () => {
    dispatch(ACTION_FETCH_DATA());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Currencies);
