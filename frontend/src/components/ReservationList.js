import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button, CircularProgress, Box } from '@mui/material';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch reservations from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/reservations')
      .then(response => {
        setReservations(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching reservations.');
        setLoading(false);
      });
  }, []);

  // Loading spinner
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  // Error message
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      {reservations.length === 0 ? (
        <Typography variant="h6" color="textSecondary">No reservations available</Typography>
      ) : (
        reservations.map(reservation => (
          <Grid item xs={12} sm={6} md={4} key={reservation.id}>
            <Card
              sx={{
                transition: '0.3s',
                '&:hover': { transform: 'scale(1.05)', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' }
              }}
            >
              <CardContent>
                <Typography variant="h6">Reservation for: {reservation.customerName}</Typography>
                <Typography variant="body2">Date: {reservation.reservationDate}</Typography>
                <Typography variant="body2">Guests: {reservation.numGuests}</Typography>
                <Typography variant="body2">Special Requests: {reservation.specialRequests || 'None'}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: '10px' }}
                  onClick={() => navigate(`/reservations/${reservation.id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ReservationList;
