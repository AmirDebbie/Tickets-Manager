import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, TextField } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function MyModal(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [userEmail, setUserEmail] = useState();
  const [labels, setLabels] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('api/tickets', {
        id: uuidv4(),
        title,
        content, 
        userEmail, 
        creationTime: new Date().getTime(),
        labels
    })
    props.fetch();
    handleClose();
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 style={{textAlign: 'center'}}>Add New Ticket</h2>
      <form onSubmit={handleSubmit}>
          <TextField 
            style={{width: 400}} 
            label='Enter Title' 
            required={true}
            onChange={(e) => setTitle(e.target.value)}
            id='title'
          /><br />
          <TextField 
            style={{width: 400}} 
            label='Enter Content' multiline 
            required={true} 
            onChange={(e) => setContent(e.target.value)}
            id='content'
          /><br />
          <TextField 
            style={{width: 400}} 
            label='Enter Email' 
            required={true}
            onChange={(e) => setUserEmail(e.target.value)}
            id='email'
          /><br />
          <TextField 
            style={{width: 400}} 
            label='Enter Labels'
            placeholder='label,label,label' 
            onChange={(e) => setLabels((e.target.value).split(','))}
            id='labels'
          />
          <Button 
            style={{margin: 10}} 
            variant='contained' 
            color='primary' 
            type='submit'
            id='submit'
          >Submit</Button>
      </form>
    </div>
  );

  return (
    <div>
      <Button 
        onClick={handleOpen}
        style={{margin: 10}}
        variant='contained' 
        color='secondary' 
        id='modalBtn'
      >Add New Ticket</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}