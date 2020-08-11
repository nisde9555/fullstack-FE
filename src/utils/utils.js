import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import catalog from '../translationCatalog.json';

export const translate = (key, lang = null) => {
	return lang && catalog[key] && catalog[key][lang] ? catalog[key][lang] : key
}

export default class ProtectedRoute extends React.Component {

	render() {
    const { component: Component, render, ...rest } = this.props;
    const token = localStorage.getItem('token');
		return <Route { ...rest } render={ token && render ? render : () =>
			token && Component
				? <Component { ...rest }/>
				: <Redirect to='/login' />
		} />
	}
}

export const isDefined = item => {
  return item === '' ? false : true;
}

export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};