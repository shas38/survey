import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import API from '../../utils/API';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 275
    }
  })
);

interface Props {
  handleSurveySelection: any;
  id: string | null;
}

function Survey({ handleSurveySelection, id }: Props) {
  const [surveyData, setSurveyData] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);

  useEffect(() => {
    const response = API.getSurvey(id);
    console.log(response);
    const selectedOptions: any = {};
    response.questions.forEach((question: any) => {
      selectedOptions[question.id] = null; //question.options[0].id;
    });
    setSurveyData(response);
    setSelected(selectedOptions);
  }, []);

  const classes = useStyles();

  const handleChange = (event: any) => {
    setSelected({ ...selected, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    handleSurveySelection(null, false);
    console.log(selected);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        {surveyData &&
          surveyData.questions.map((question: any) => {
            return (
              <Paper
                style={{ padding: '1rem 2rem' }}
                key={question.id}
                onClick={() => {
                  handleSurveySelection(question.id, true);
                }}
              >
                <Typography variant='h4'>{question.title}</Typography>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>{question.subTitle}</FormLabel>
                  <RadioGroup
                    aria-label={question.title}
                    name={question.id}
                    value={selected[question.id]}
                    onChange={handleChange}
                  >
                    {question.options.map((option: any) => {
                      return <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.text} />;
                    })}
                  </RadioGroup>
                </FormControl>
              </Paper>
            );
          })}
        <Grid style={{ marginTop: '2rem' }} justify='space-between' container>
          <Grid item>
            <Button variant='contained' color='primary' onClick={() => handleSurveySelection(null, false)}>
              back
            </Button>
          </Grid>
          <Grid item>
            <Button variant='contained' color='primary' onClick={handleSubmit}>
              submit
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
export default Survey;
