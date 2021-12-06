import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppCard from '../components/AppCard';

const useStyles = makeStyles(() => ({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
}));

export default function Index() {
  const classes = useStyles();
  return (
    <div>
      <main>
        <span className={classes.cardContainer}>
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
          <AppCard title="La classe" subTitle="C'est vrai" content="C'est pas mal" />
        </span>
      </main>
    </div>
  );
}
