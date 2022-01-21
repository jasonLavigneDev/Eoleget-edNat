import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import i18n from 'meteor/universe:i18n';
import { useAppContext } from '../../contexts/context';

// Styles CSS //
const toolbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};
const linkStyle = {
  color: 'tertiary.main',
  textDecoration: 'none',
  outline: 'none',
  marginRight: 25,
  fontFamily: 'WorkSansBold',
};
const linkMobileStyle = {
  flexDirection: 'column',
  color: 'tertiary.main',
  textDecoration: 'none',
  outline: 'none',
  marginRight: 25,
  fontFamily: 'WorkSansBold',
};
const blogLinkStyle = {
  color: 'tertiary.main',
  fontFamily: 'WorkSansBold',
};
const liStyle = {
  listStyle: 'none',
};
// End styles

export const LEGAL_ROUTES = {
  legal: 'legalnotice',
  personalData: 'personal-data',
  accessibility: 'accessibility',
  gcu: 'conditions',
};

const Footer = () => {
  const [{ isMobile }] = useAppContext();
  const externalBlog = Meteor.settings.public.laboiteBlogURL;
  const settingsData = [];

  const toolbarContent = () => {
    return (
      <>
        {settingsData.map(({ key, external, link, text }) => {
          return isMobile ? (
            <li key={key} style={liStyle}>
              {external ? (
                <a style={linkMobileStyle} href={link} target="_blank" rel="noreferrer noopener">
                  {i18n.__(`components.Footer.${text}`)}
                </a>
              ) : (
                <Link sx={linkMobileStyle} to={`/legal/${link}`}>
                  {i18n.__(`components.Footer.${text}`)}
                </Link>
              )}
            </li>
          ) : external ? (
            <a key={key} style={linkStyle} href={link} target="_blank" rel="noreferrer noopener">
              {i18n.__(`components.Footer.${text}`)}
            </a>
          ) : (
            <Link key={key} sx={linkStyle} to={`/legal/${link}`}>
              {i18n.__(`components.Footer.${text}`)}
            </Link>
          );
        })}
      </>
    );
  };

  const blogLink = () => {
    return isMobile ? (
      <li key="blogLinkKey" style={liStyle}>
        {externalBlog === '' ? (
          <Link sx={linkStyle} to="/public">
            Publications
          </Link>
        ) : (
          <a href={externalBlog} style={blogLinkStyle} target="_blank" rel="noreferrer noopener">
            Publications
          </a>
        )}
      </li>
    ) : externalBlog === '' ? (
      <Link key="blogLinkKey" sx={linkStyle} to="/public">
        Publications
      </Link>
    ) : (
      <a key="blogLinkKey" href={externalBlog} style={blogLinkStyle} target="_blank" rel="noreferrer noopener">
        Publications
      </a>
    );
  };

  return (
    <AppBar position="relative">
      {isMobile ? (
        <Toolbar sx={toolbarStyle}>
          <ul>
            {toolbarContent()}
            <li key="contactKey" style={liStyle}>
              <Link sx={linkStyle} to="/contact">
                {i18n.__(`components.Footer.contact`)}
              </Link>
            </li>
            {blogLink()}
          </ul>
        </Toolbar>
      ) : (
        <Toolbar sx={toolbarStyle}>
          <div>{toolbarContent()}</div>
          <div>
            <Link key="contactKey" sx={linkStyle} to="/contact">
              {i18n.__(`components.Footer.contact`)}
            </Link>
            {blogLink()}
          </div>
        </Toolbar>
      )}
    </AppBar>
  );
};
export default Footer;
