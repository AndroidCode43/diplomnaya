import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { CreateTicket } from './Pages/CreateTicket/CreateTicket';
import { Main } from './Pages/Main/Main';
import { mainStore } from './redux/store';
import { Flight } from './Pages/Flights/Flights';

function App() {
  return (
    <Provider store={mainStore}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='create_ticket' element={<CreateTicket />} />
          <Route path='flights' element={<Flight/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
