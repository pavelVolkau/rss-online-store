import 'normalize.css';
import './common/styles/reset.scss';
import App from './common/app/App';
import store, { initStore } from './common/redux/store';

const app = new App();
app.start();
store.dispatch(initStore('store start-init'));
