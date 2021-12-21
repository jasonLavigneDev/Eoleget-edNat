import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../contexts/context';
import { usePagination } from '../../../api/utils/hooks';

import { makeStyles } from '@material-ui/core/styles';

import AppCard from './AppCard';
import Applications from '../../../api/applications/applications';

const useStyles = makeStyles(() => ({
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
}));

function AppCardList({ isUpperCase }) {
  const ITEM_PER_PAGE = 15;
  const classes = useStyles();
  const [{ appPage, userId }, dispatch] = useAppContext();
  const { search = '', searchToggle = false } = appPage;

  const { changePage, page, items, total } = usePagination(
    'applications.all',
    { search },
    Applications,
    {},
    { sort: { nom: 1 } },
    ITEM_PER_PAGE,
  );

  const handleChangePage = (event, value) => {
    changePage(value);
  };

  const inputRef = useRef(null);
  // focus on search input when it appears
  useEffect(() => {
    if (inputRef.current && searchToggle) {
      inputRef.current.focus();
    }
  }, [searchToggle]);

  useEffect(() => {
    if (page !== 1) {
      changePage(1);
    }
  }, [search]);

  const filterApp = (app) => {
    let searchText = app.nom + app.description + app.identificationName || '';
    searchText = searchText.toLowerCase();
    if (!search) return true;
    return searchText.indexOf(search.toLowerCase()) > -1;
  };
  const mapList = (func) => items.filter((app) => filterApp(app)).map(func);

  return (
    <span className={classes.cardContainer}>
      {total > ITEM_PER_PAGE && (
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.pagination}>
          <Pagination count={Math.ceil(total / ITEM_PER_PAGE)} page={page} onChange={handleChangePage} />
        </Grid>
      )}
      {mapList((app) => {
        let { description } = app;
        if (isUpperCase(app.description)) {
          description = app.description.toLowerCase();
        }
        return <AppCard title={app.nom} description={description} versions={app.versions} url={app.url} />;
      })}
      {total > ITEM_PER_PAGE && (
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.pagination}>
          <Pagination count={Math.ceil(total / ITEM_PER_PAGE)} page={page} onChange={handleChangePage} />
        </Grid>
      )}
    </span>
  );
}

AppCardList.propTypes = {
  isUpperCase: PropTypes.func.isRequired,
};

export default AppCardList;
