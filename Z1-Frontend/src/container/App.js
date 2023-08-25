import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import UsersList from './usersManage/UsersList';
import UsersEdit from './usersManage/UsersEdit';
import useTitle from './hooks/useTitle';

import UsersEditForm from './usersManage/UsersEditForm';

function App() {
  useTitle('Z1_Hospital Main page')
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/usersManage'>
          <Route index element={<UsersList />} />
          <Route path=':id' element={<UsersEdit />} />
          <Route path='edit' element={<UsersEditForm />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
