import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Button, CircularProgress, Box } from '@mui/material';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch orders from the backend API
  useEffect(() => {
    axios.get('http://localhost:5000/api/orders') // Your backend API endpoint
      .then(response => {
        setOrders(response.data); // Save the orders data from API response
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch((err) => {
        setError('Error fetching orders.'); // Handle any errors while fetching
        setLoading(false);
      });
  }, []);

  // Display a loading spinner while the orders are being fetched
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  // If an error occurred while fetching data, display the error message
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  // Display the list of orders as cards
  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      {orders.length === 0 ? (
        <Typography variant="h6" color="textSecondary">No orders available</Typography>
      ) : (
        orders.map(order => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <Card
              sx={{
                transition: '0.3s',
                '&:hover': { transform: 'scale(1.05)', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)' },
                backgroundColor: order.status === 'Completed' ? '#e0f7fa' : '#fff'
              }}
            >
              <CardContent>
                <Typography variant="h6">Order for: {order.item}</Typography>
                <Typography variant="body2">Customer: {order.customerName}</Typography>
                <Typography variant="body2">Quantity: {order.quantity}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {order.status}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: '10px' }}
                  onClick={() => navigate(`/orders/${order.id}`)} // Navigate to the order details page
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

export default OrderList;
