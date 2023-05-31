import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateTicket } from './Pages/CreateTicket/CreateTicket';
import { Main } from './Pages/Main/Main';
import { Flight } from './Pages/Flights/Flights';
import { CreateFlight } from './Pages/CreateFlight/CreateFlight';
import { Planes } from './Pages/Planes/Planes';
import { Registration } from './Pages/auth/Registration/Registration';
import {AdminFlights} from "./Pages/AdminFlights/AdminFlights";
import {Login} from "./Pages/auth/Login/Login";
import {Account} from "./Pages/Account/Account";
import {CurrentFlight} from "./Pages/CurrentFlight/CurrentFlight";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='flights' element={<Flight />} />
          <Route path='auth/registration' element={<Registration/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='account' element={<Account/>}/>
          <Route path='flight/:flightId' element={<CurrentFlight/>}/>
          <Route element={<PrivateRoutes/>}>
              <Route path='admin/create_ticket' element={<CreateTicket />} />
              <Route path='admin/create_flight' element={<CreateFlight />} />
              <Route path='admin/flights' element={<AdminFlights/>} />
              <Route path='admin/planes' element={<Planes/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
