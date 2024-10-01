import React from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Icon for orders
import FeedbackIcon from '@mui/icons-material/Feedback'; // Icon for feedback

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container style={styles.container}>
      <Typography variant="h4" style={styles.title}>
        Welcome to the TeleAI Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={styles.buttonGrid}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingCartIcon />} // Add order icon
            onClick={() => navigate('/orders')}
            style={styles.button}
          >
            View Orders
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FeedbackIcon />} // Add feedback icon
            onClick={() => navigate('/feedback')}
            style={styles.button}
          >
            View Feedback
          </Button>
        </Grid>
        {/* Add more navigation buttons as needed */}
      </Grid>
    </Container>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full screen height
  },
  title: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  buttonGrid: {
    width: '100%', // Make grid take full width
  },
  button: {
    minWidth: '200px', // Ensure buttons are uniformly wide
    fontSize: '16px',
  },
};

export default Dashboard;
