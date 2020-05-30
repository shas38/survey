import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Survey from '../components/Survey';
import SurveyList from '../components/SurveyList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
);

interface State {
  surveySelected: boolean;
  surveyId: string | null;
}

function SurveyPage() {
  const [state, setState] = useState<State>({
    surveySelected: false,
    surveyId: null
  });
  const [modal, setModal] = useState<boolean>(false);

  const classes = useStyles();

  const handleSurveySelection = (id: string, surveySelected: boolean) => {
    setState({
      surveySelected: surveySelected,
      surveyId: id
    });
    if (id === null) {
      setModal(true);
    }
  };

  const handleClose = () => {
    setModal(false);
  };

  return (
    <>
      {state.surveySelected ? (
        <Survey id={state.surveyId} handleSurveySelection={handleSurveySelection} />
      ) : (
        <SurveyList handleSurveySelection={handleSurveySelection} />
      )}
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className={classes.modal}
      >
        <div className={classes.paper}>
          <h2>Thanks for completing the survey</h2>
          <Button variant='contained' color='primary' onClick={handleClose}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default SurveyPage;
