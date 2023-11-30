import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { useForm } from "react-hook-form";


function ReportPostModal(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isReported, setIsReported] = useState(false);

    const onSubmit = (data) => {
      // Perform your report submission logic here
      console.log(data);
  
      // Example: Set a flag to indicate that the post is reported
      setIsReported(true);
    };
  
    const handleClose = () => {
      // Close the modal and reset the reported flag
      setIsReported(false);
      props.onHide();
    };
  
    return (
      <Modal {...props} centered>
        <Modal.Header closeButton>
          <Modal.Title>Report Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isReported ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="reason">Reason for reporting:</label>
              <textarea
                id="reason"
                {...register('reason', { required: 'Please provide a reason' })}
              />
              {errors.reason && <p>{errors.reason.message}</p>}
  
              <Button type="submit">Submit Report</Button>
            </form>
          ) : (
            <div>
              <p>Your post has been reported for content that might be irrelevant/inappropriate.</p>
              <Button onClick={handleClose}>Close</Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }

  export default ReportPostModal;