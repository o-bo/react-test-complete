import React, { Component } from 'react';
import R from 'ramda';

import items from '../config/data';

import AccountItems from './AccountItems';


const findItemById = id => R.findIndex(R.propEq('id', id));

const updateItem = item => ({ ...item, checked: !item.checked });

const updateAccountItem = R.curry((id, items) => R.adjust(
  updateItem,
  findItemById(id)(items),
  items));

class Account extends Component {

  state = {
    items: [],
    displayedItems: [],
    title: 'toutes',
  }

  componentWillMount() {
    this.setState((prevState, props) => {
      return {
        items,
        displayedItems: items,
      };
    });
  }

  filterValidated = () => {
    this.setState((prevState, props) => {
      const currentItems = prevState.items;

      return {
        title: 'validées',
        displayedItems: R.filter(R.propEq('checked', true))(currentItems),
      };
    });
  }

  filterUnvalidated = () => {
    this.setState((prevState, props) => {
      const currentItems = prevState.items;

      return {
        title: 'invalidées',
        displayedItems: R.filter(R.propEq('checked', false))(currentItems),
      };
    });
  }

  filterAll = () => {
    this.setState((prevState, props) => {
      const currentItems = prevState.items;

      return {
        title: 'toutes',
        displayedItems: currentItems,
      };
    });
  }

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
