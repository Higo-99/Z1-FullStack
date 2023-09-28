import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Login from './features/Auth/Login';
import Register from './features/Auth/Register';
import UsersList from './features/UsersManage/UsersList';
import UsersEdit from './features/UsersManage/UsersEdit';
import useTitle from './hooks/useTitle';
import NotFound from './components/NotFound/NotFound';
import Layout from './components/Layout/Layout';
import Test from './Test';
import HomePage from './components/Homepages/HomePage';

function App() {
  useTitle('Z1_App Main page')
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
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
