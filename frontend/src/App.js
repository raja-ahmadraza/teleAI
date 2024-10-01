import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import ReservationList from './components/ReservationList';
import ReservationDetails from './components/ReservationDetails';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import NavBar from './components/Navbar';
import FeedbackComponent from './components/FeedbackComponent';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
    },
    secondary: {
      main: '#FFC107',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          {/* Navigation Bar */}
          <NavBar />
          <Routes>
            <Route path="/" element={<OrderList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/feedback" element={<FeedbackComponent />} />  
            <Route path="/reservations" element={<ReservationList />} />
            <Route path="/reservations/:id" element={<ReservationDetails />} />
            </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
