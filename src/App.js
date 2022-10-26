

import './App.scss';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainHeader from './components/MainHeader/MainHeader';
import Train from "./pages/Main/Main"
import Main from './pages/Main/Main';
import Account from './pages/Account/Account';

function App() {
  return (
    

    <BrowserRouter>
      <MainHeader />
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />

        <Route path="/main" element={<Main />} />
        
        <Route path="/train" element={<Train />} />

        <Route path="/account" element={<Account />}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
