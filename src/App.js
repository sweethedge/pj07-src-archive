/* eslint-disable */ 
import { Route, Routes } from 'react-router-dom';
import BoxMv from './boxoffice/BoxMv';
import Boxoffice from './boxoffice/Boxoffice';

function App() {
  return (
    <>
    <Routes>
    <Route path = '/' element={<Boxoffice />} />
    <Route path = '/mv' element={<BoxMv />} />
    </Routes>
    </>
  );
}

export default App;
