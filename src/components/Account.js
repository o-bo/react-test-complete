import React, { Component } from 'react';
import R from 'ramda';

import items from '../config/data';

import AccountItems from './AccountItems';

// Number -> ([a] -> Number)
// return a function that will find the index of an item in a list using its id.
// @see http://ramdajs.com/docs/#findIndex
const findItemById = id => R.findIndex(R.propEq('id', id));

// a -> a
// switch the checked attribute of the given item.
const updateItem = item => ({
  ...item,
  checked: !item.checked
});

// Number -> [a] -> [a]
// update the item identified by the given id in the given list by switching the
// value of its checked attribute.
// @see http://ramdajs.com/docs/#adjust
const updateAccountItem = R.curry((id, items) => R.adjust(
  updateItem,
  findItemById(id)(items),
  items));

// this component is the main container
// it displays the title of the app, the current filter and owns the methods
// used to filter and update the items.
class Account extends Component {

  // initial state
  state = {
    items: [],
    displayedItems: [],
    title: 'toutes',
  }

  // when the component is loaded we initialize the state by reading the items
  // from the config file.
  componentWillMount() {
    this.setState((prevState, props) => {
      return {
        items,
        displayedItems: items,
      };
    });
  }

  // update the state by filtering the checked items
  filterValidated = () => {
    this.setState((prevState, props) => {
      const currentItems = prevState.items;

      return {
        title: 'validées',
        displayedItems: R.filter(R.propEq('checked', true))(currentItems),
      };
    });
  }

  // update the state by filtering the unchecked items
  filterUnvalidated = () => {
    this.setState((prevState, props) => {
      const currentItems = prevState.items;

      return {
        title: 'invalidées',
        displayedItems: R.filter(R.propEq('checked', false))(currentItems),
      };
    });
  }

  // update the state by displaying all the items
  filterAll = () => {
    this.setState((prevState, props) => {
      const currentItems = prevState.items;

      return {
        title: 'toutes',
        displayedItems: currentItems,
      };
    });
  }

  // handle the action on the checked button of the given item.
  onClickItem = (itemId) => {
    this.setState((prevState, props) => {
      const currentItems = prevState.items;
      const currentDisplayedItems = prevState.displayedItems;
      const updateItem = updateAccountItem(itemId);

      return {
        items: updateItem(currentItems),
        displayedItems: updateItem(currentDisplayedItems),
      };
    });
  }

  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column col-4"></div>
          <div className="column col-4">
            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Mon compte</h4>
                <h6 className="card-subtitle">{`Dernières opérations : ${this.state.title}`}</h6>
              </div>
              <div className="card-body">
                <AccountItems
                  {...this.state}
                  onClickItem={this.onClickItem}
                />
              </div>
              <div className="card-footer">
                <div className="btn-group btn-group-block">
                  <button
                    className="btn"
                    onClick={this.filterValidated}
                  >
                    Voir les validées
                  </button>
                  <button
                    className="btn"
                    onClick={this.filterUnvalidated}
                  >
                    Voir les invalidées
                  </button>
                  <button
                    onClick={this.filterAll}
                    className="btn"
                  >
                    Voir toutes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="column col-4"></div>
        </div>
      </div>
    );
  }
}

export default Account;
