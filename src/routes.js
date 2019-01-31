import Login from './components/login';
import Register from './components/register';
import Home from './components/home';
import Barcode from './components/barcode';
import Product from './components/product';
import Menu from './components/menu';

export default [
  {
    name: 'login',
    component: Login,
  },
  {
    name: 'home',
    component: Home,
  },
  {
    name: 'register',
    component: Register,
  },
  {
    name: 'barcode',
    component: Barcode,
  },
  {
    name: 'product',
    component: Product,
  },
  {
    name: 'menu',
    component: Menu,
  },
];
