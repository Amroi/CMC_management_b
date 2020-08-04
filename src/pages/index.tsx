import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './index.less';
import Admin from './views'
import Login from './views/login/login.jsx'
import storageUtils from '../pages/utils/storageUtils.js';
import memoryUtils from '../pages/utils/memoryUtils.js';

import { Provider } from 'react-redux'
import store from './redux/store.js'

/*
import Loadable from 'react-loadable';

const loading = () => <div>加载中---</div>
const Login = Loadable({
	loader: () => import('./views/login/login.jsx'),
	loading: loading
})

const loading2 = () => <div>loading---111</div>
const Admin = Loadable({
	loader: () => import('./views'),
	loading: loading2
})
*/

export default class App extends React.Component {
	render() {
		const user = storageUtils.getUser();
		memoryUtils.user = user

		return (
			<Provider store={store}>
				<HashRouter>
					<Switch>
						<Route path="/login" component={Login} />
						<Route path="/" component={Admin} />
					</Switch>
				</HashRouter>
			</Provider>
		)
	}
}
