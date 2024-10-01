import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, CircularProgress, Box, Button } from '@mui/material';

const ReservationDetails = () => {
  const { id } = useParams(); // Get reservation ID from the URL
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reservation details from the backend
  useEffect(() => {
    axios.get(`http://localhost:5000/api/reservations/${id}`)
      .then(response => {
        setReservation(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching reservation details.');
        setLoading(false);
      });
  }, [id]);

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
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  // Null check for reservation
  if (!reservation) {
    return <Typography variant="h6">No reservation found.</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>Reservation Details for {reservation.customerName}</Typography>
      <Typography variant="body1">Date: {reservation.reservationDate}</Typography>
      <Typography variant="body1">Number of Guests: {reservation.numGuests}</Typography>
      <Typography variant="body1">Contact: {reservation.contact}</Typography>
      <Typography variant="body1">Special Requests: {reservation.specialRequests || 'None'}</Typography>
      
      {/* Optionally, add buttons to edit or delete reservation */}
      <Button variant="contained" color="secondary" sx={{ marginTop: '10px' }}>
        Edit Reservation
      </Button>
      <Button variant="contained" color="error" sx={{ marginTop: '10px', marginLeft: '10px' }}>
        Delete Reservation
      </Button>
    </div>
  );
};

export default ReservationDetails;
