import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import AccountItem from './AccountItem';

const AccountItems = ({
  displayedItems,
  onClickItem,
}) => (
  <div className="column col-12">
    {R.compose(
      R.map(AccountItem),
      R.map(R.assoc('onClickItem', onClickItem))
    )(displayedItems)}
  </div>
);

AccountItems.propTypes = {
  displayedItems: PropTypes.array.isRequired,
  onClickItem: PropTypes.func.isRequired,
};

export default AccountItems;
