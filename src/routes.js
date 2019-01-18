import Login from './components/login';
import Post from './components/posts';
import Register from './components/register'

export default ([
  {
    name: 'register',
    component: Register,
  },
  {
    name: 'login',
    component: Login,
  },
  {
    name: 'post',
    component: Post,
  },
]);
