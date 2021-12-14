import React from 'react';
import { Roles } from 'meteor/alanning:roles';
import { useAppContext } from '../contexts/context';

export default function Index() {
  const [{ user }] = useAppContext();
  const isAdmin = user ? Roles.userIsInRole(user._id, 'admin') : false;

  return <div>{`${isAdmin ? 'Bonjour maître' : 'Coucou'} ${user ? user.firstName : ''}`}</div>;
}
