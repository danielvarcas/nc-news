import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {
  withStyles, Icon, Grid, Hidden, Grow, Slide,
} from '@material-ui/core';
import Logout from './Logout';
import LoginButton from './LoginButton';
import TopicsMenu from './TopicsMenu';
import ControlsMenu from './ControlsMenu';

const styles = theme => ({
  root: {
    flexGrow: 1,

  },
  appBar: {
    backgroundColor: 'white',
  },
  account: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  topics: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  menu: {
    justifyContent: 'flex-end',
  },
});

const Nav = (props) => {
  const {
    topics, classes, username, changeLoginState,
  } = props;
  return (
    <div className={classes.root}>
      <Grid container>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Grid item xs={8}>
              <div className={classes.topics}>
                <Button component={Link} to="/">
                  <Icon className={classes.icon}>home</Icon>
                  nc news
                </Button>
                <Hidden xsDown>
                  {topics.map(topic => (
                    <Grow in key={topic.slug}>
                      <Button component={Link} to={`/topics/${topic.slug}`}>
                        {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
                      </Button>
                    </Grow>
                  ))}
                </Hidden>
                <TopicsMenu
                  options={topics.map(topic => topic.slug)}
                  className={classes.menu}
                />
                <ControlsMenu
                  username={username}
                  className={classes.menu}
                  changeLoginState={changeLoginState}
                />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.account}>
                {!username && (
                <React.Fragment>
                  <Slide in direction="left">
                    <LoginButton changeLoginState={changeLoginState} />
                  </Slide>
                </React.Fragment>
                ) }
                {username && <Logout changeLoginState={changeLoginState} username={username} />}
              </div>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
};

Nav.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape(
    {
      slug: PropTypes.string,
      description: PropTypes.string,
    },
  )).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    grow: PropTypes.string,
  }).isRequired,
  username: PropTypes.string,
  changeLoginState: PropTypes.func.isRequired,
};

Nav.defaultProps = {
  username: '',
};

export default withStyles(styles)(Nav);
