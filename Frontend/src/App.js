import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Login from './container/auth/Login';
import Register from './container/auth/Register';
import UsersList from './container/usersManage/UsersList';
import UsersEdit from './container/usersManage/UsersEdit';
import useTitle from './hooks/useTitle';
import NotFound from './components/NotFound';
import Layout from './components/Layout';
import Test from './Test';

function App() {
  useTitle('Z1_App Main page')
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/usersManage'>
            <Route index element={<UsersList />} />
            <Route path=':id' element={<UsersEdit />} />
          </Route>

          <Route path='Test' element={<Test />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
