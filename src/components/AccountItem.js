import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class ItemActionLink extends Component {

  static propTypes = {
    itemId: PropTypes.number.isRequired,
    action: PropTypes.func.isRequired,
    icon: PropTypes.string.isRequired,
  };

  onClickAction = () => {
    this.props.action(this.props.itemId);
  }

  render() {
    return (
      <a
        className="circle flex"
        style={{
          width: '30px',
          height: '30px',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #AAAAAA',
          color: '#AAAAAA',
          cursor: 'pointer',
        }}
        onClick={this.onClickAction}
      >
        <i className={`icon ${this.props.icon}`}></i>
      </a>
    );
  }
}

const AccountItem = ({
  id,
  title,
  date,
  amount,
  checked,
  onClickItem,
}) => (
  <div
    key={id}
    className="column col-12 inline-flex"
    style={{
      borderBottom: "1px solid #EFEFEF"
    }}
  >
    <div
      className="mr-10 flex"
      style={{
        alignItems: 'center'
      }}
    >
      <div>
        <h5><strong>{moment(date).format('DD')}</strong></h5>
        <strong>{moment(date).format('MMM')}</strong>
      </div>
    </div>
    <div
      className="ml-10 mr-10 flex"
      style={{
        flex: '1',
        alignItems: 'center'
      }}
    >
      <div>
        <h5 className="text-uppercase">
          {checked
            ? <del>{title}</del>
            : title}
        </h5>
        <strong>{`${amount} €`}</strong>
      </div>
    </div>
    <div
      className="ml-10 flex"
      style={{
        alignItems: 'center'
      }}
    >
      <ItemActionLink
        itemId={id}
        action={onClickItem}
        icon={checked ? "icon-cross" : "icon-check"}
      />
    </div>
  </div>
);

AccountItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  onClickItem: PropTypes.func.isRequired,
};

export default AccountItem;
