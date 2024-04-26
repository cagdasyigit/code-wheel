import React, { useEffect, useState } from 'react';
import { Box, Paper, Snackbar } from '@mui/material';
import { FeedbackProps } from './types';

const Feedback = (props: FeedbackProps) => {
  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper>
      <Snackbar
        open={open}
        message={props.message}
        onClose={handleClose}
        autoHideDuration={props.autoHide ? 6000 : null}
        resumeHideDuration={0}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        action={
          <Box
            data-testid={'snackbar-action'}
            onClick={handleClose}
            sx={{ cursor: 'pointer', marginRight: '16px' }}
          >
            &times;
          </Box>
        }
      />
    </Paper>
  );
};

export default Feedback;
