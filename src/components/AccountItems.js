import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import AccountItem from './AccountItem';

// (Number -> Void) -> (a -> a)
// return a function that will set the given function in the onClickItem attribute
// of a object
// @see http://ramdajs.com/docs/#assoc
const setClickAction = action => R.assoc('onClickItem', action);

// (Number -> Void) -> ([a] -> [a])
// return a function that will set the given action in each object of a list
// @see http://ramdajs.com/docs/#map
const setClickActionOnAll = action => R.map(setClickAction(action));

// return a function that will render the given component for each object of a
// list
// @see http://ramdajs.com/docs/#map
const renderItems = ItemComponent => R.map(ItemComponent);

// functional component that displays the given list of items
// it pass the onClickItem function to each item when rendering them
// @see http://ramdajs.com/docs/#map
const AccountItems = ({
  displayedItems,
  onClickItem,
}) => (
  <div className="column col-12">
    {R.compose(
      renderItems(AccountItem),
      setClickActionOnAll(onClickItem),
    )(displayedItems)}
  </div>
);

AccountItems.propTypes = {
  displayedItems: PropTypes.array.isRequired,
  onClickItem: PropTypes.func.isRequired,
};

export default AccountItems;
