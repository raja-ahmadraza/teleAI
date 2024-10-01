import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Snackbar, CircularProgress, Typography, Box } from '@mui/material';
import Alert from '@mui/material/Alert';

const OrderDetails = () => {
  const { id } = useParams(); // Get order ID from URL
  const [order, setOrder] = useState(null);
  const [feedback, setFeedback] = useState(''); // Feedback state
  const [submittedFeedback, setSubmittedFeedback] = useState([]); // Submitted feedback list
  const [loading, setLoading] = useState(true); // Loading state
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state for success message
  const [error, setError] = useState(null); // Track if there's an error

  // Fetch order details from the backend
  useEffect(() => {
    if (!id) {
      setError('No order ID provided.');
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:5000/api/orders/${id}`)
      .then(response => {
        if (response.data) {
          setOrder(response.data);
          setSubmittedFeedback(response.data.feedback || []); // Ensure feedback is an array, even if it's empty
        } else {
          setError('No order found with this ID.');
        }
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error("API Error:", error);
        setError('Error fetching order details.');
        setLoading(false); // Stop loading in case of error
      });
  }, [id]);

  // Handle feedback input change
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value); // Update feedback state as user types
  };

  // Submit feedback to the backend
  const submitFeedback = () => {
    if (!feedback.trim()) {
      return; // Prevent empty feedback submission
    }

    axios.post(`http://localhost:5000/api/orders/${id}/feedback`, { feedback })
      .then(response => {
        setSubmittedFeedback(response.data.feedback); // Update the feedback list
        setFeedback(''); // Clear the form
        setOpenSnackbar(true); // Show success message

        // Hide the snackbar after 3 seconds
        setTimeout(() => setOpenSnackbar(false), 3000);
      })
      .catch(error => {
        console.error("Error submitting feedback:", error);
      });
  };

  // Display a loading spinner while waiting for data
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  // Display error message if there's an error
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  // Check if order exists
  if (!order) {
    return <p>No order found.</p>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Order Details for {order.item || 'Unknown Item'}
      </Typography>
      <Typography variant="body1">Customer Name: {order.customerName}</Typography>
      <Typography variant="body1">Contact: {order.contact}</Typography>
      <Typography variant="body1">Quantity: {order.quantity}</Typography>
      <Typography variant="body1">Special Instructions: {order.specialInstructions || 'None'}</Typography>

      {/* Feedback Form */}
      <Box mt={3} mb={3}>
        <Typography variant="h5">Leave Feedback</Typography>
        <TextField
          label="Enter your feedback"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={feedback}
          onChange={handleFeedbackChange}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={submitFeedback}
          sx={{ marginTop: '10px' }}
        >
          Submit Feedback
        </Button>
      </Box>

      {/* Snackbar for success message */}
      <Snackbar open={openSnackbar} autoHideDuration={3000}>
        <Alert severity="success">Feedback submitted successfully!</Alert>
      </Snackbar>

      {/* Display submitted feedback */}
      <Box mt={3}>
        <Typography variant="h5">Submitted Feedback</Typography>
        <ul>
          {submittedFeedback.length > 0 ? (
            submittedFeedback.map((fb, index) => (
              <li key={index}>{fb}</li>
            ))
          ) : (
            <Typography variant="body2">No feedback submitted yet.</Typography>
          )}
        </ul>
      </Box>
    </div>
  );
};

export default OrderDetails;
