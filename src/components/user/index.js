import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'
import { withRouter } from 'react-router-dom';

import './style.css';
import Message from '../../static/message.png';
import Lookup from '../../static/lookup.png';
import { translate } from '../../utils/utils';
import {connect} from 'react-redux';
import { compose } from 'redux';

class User extends Component {
  state = {

  }

  render() {
    const { lang } = this.props;
    return (
      <div className="user-card">
        <h2>{this.props.data.firstName}{' ' + this.props.data.lastName}</h2>
        <div className="bottom">
          <img src="https://picsum.photos/200" alt="img" />
          <p>{this.props.data.email}</p>
          <div className="icons">
            <img data-tip={translate('view post', lang)} onClick={() => this.props.viewUser(this.props.id)} src={Lookup} alt="icon" />
            <img data-tip={translate('send message', lang)} src={Message} alt="icon" />
          </div>
        </div>
        <ReactTooltip />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
      lang: state.lang
  };
}

export default compose(
  withRouter,
  connect(mapStateToProps, null)
)(User);