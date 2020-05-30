import React, { useState, useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
}

function SurveyList({ handleSurveySelection }: Props) {
  const [surveys, setSurveys] = useState<Array<any>>([]);

  useEffect(() => {
    const response = API.getSurveys();
    console.log(response);
    setSurveys(response);
  }, []);

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <List component='nav' aria-label='secondary mailbox folders'>
          {surveys.map(survey => {
            return (
              <ListItem
                key={survey.id}
                onClick={() => {
                  handleSurveySelection(survey.id, true);
                }}
                button
              >
                <ListItemText style={{ textAlign: 'center' }} primary={survey.name} />
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}

export default SurveyList;
