import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FoodIngredientList from './FoodIngredientList'
import NutritionFactsRestriction from './NutritionFactsRestrictionComponent';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    
  },
});

class RestrictionTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Whole Foods" />
            <Tab label="Nutrition Facts" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}><FoodIngredientList onClick={this.props.handleAddIngredient} ingredients={this.props.ingredients} isLoading={this.props.ingredients.isLoading} errMess={this.props.ingredients.errMess} postIngredient={this.props.postIngredient} putIngredient={this.props.putIngredient} deleteIngredient={this.props.deleteIngredient} {...this.props} /></TabContainer>
          <TabContainer dir={theme.direction}><NutritionFactsRestriction {...this.props}/></TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

RestrictionTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(RestrictionTabs);
