import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';

const FeedbackComponent = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error handling

  useEffect(() => {
    axios.get('http://localhost:5000/api/feedback')
      .then(response => {
        if (response.data && response.data.length > 0) {
          setFeedbackList(response.data);
        } else {
          setError('No feedback available');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching feedback", error);
        setError('Error fetching feedback');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>{error}</Typography>; // Display error message
  }

  return (
    <Grid container spacing={3}>
      {feedbackList.map((feedback, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card>
            <CardContent>
              <Typography variant="h6">Feedback {index + 1}</Typography>
              <Typography>{feedback}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeedbackComponent;
