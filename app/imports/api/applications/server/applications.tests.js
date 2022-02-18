/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

import { assert } from 'chai';
import faker from 'faker';

import { Meteor } from 'meteor/meteor';
import '../../../../i18n/en.i18n.json';

// this file also includes tests on users/permissions
import { Accounts } from 'meteor/accounts-base';

import Packs from '../../packs/packs';
import Applications from '../applications';

import './publications';

describe('packs', function () {
  describe('publications', function () {
    let userId;
    let packId;
    let appli1;
    let appli2;
    let pack;
    beforeEach(function () {
      Packs.remove({});
      Applications.remove({});
      Meteor.users.remove({});

      const email = faker.internet.email();
      userId = Accounts.createUser({
        email,
        username: email,
        password: 'toto',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        groupCount: 0,
        groupQuota: 10,
      });

      appli1 = {
        nom: 'Test Appli',
        identification: 'TestAppli',
        versions: ['1.0.0', '2.0.0'],
        description: 'Test Application',
        tags: ['Tag1', 'Tag2'],
        license: 'MIT',
        url: 'https://testappli.com',
      };

      appli2 = {
        nom: 'Test Appli 2',
        identification: 'TestAppli2',
        versions: ['1.0.0', '2.0.0'],
        description: 'Test Application 2',
        tags: ['Tag1', 'Tag2'],
        license: 'MIT',
        url: 'https://testappli2.com',
      };

      Applications.insert(appli1);
      Applications.insert(appli2);

      const app1 = {
        nom: appli1.nom,
        identification: appli1.identification,
        version: appli1.versions[0],
        description: appli1.description,
      };
      const app2 = {
        nom: appli2.nom,
        identification: appli2.identification,
        version: appli2.versions[0],
        description: appli2.description,
      };

      const apps = [app1, app2];
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      const date = today.toUTCString();
      packId = Packs.insert({
        name: 'testPack',
        creationDate: date,
        isValidated: true,
        applications: apps,
        owner: userId,
        ownerName: email,
        description: 'test application',
        color: 'purple',
        isPublic: true,
      });
      pack = Packs.findOne({ _id: packId });
    });
    describe('applications.all', function () {
      it('sends all applications for pagination', function (done) {
        const collector = new PublicationCollector({ userId });
        collector.collect('applications.all', { page: 1, search: '', itemPerPage: 10 }, (collections) => {
          assert.equal(collections.applications.length, 2);
          done();
        });
      });
    });
    describe('applications.table.all', function () {
      it('sends all public fields for all applications', function (done) {
        const collector = new PublicationCollector({ userId });
        collector.collect('applications.table.all', {}, (collections) => {
          assert.equal(collections.applications.length, 2);
          done();
        });
      });
    });
    describe('applications.pack', function () {
      it('sends all fields for all applications of one pack', function (done) {
        const collector = new PublicationCollector({ userId });
        collector.collect('applications.pack', { packAppli: pack.applications }, (collections) => {
          assert.property(collections, 'applications');
          done();
        });
      });
    });
    describe('applications.single', function () {
      it('sends all fields for a specific application', function (done) {
        const collector = new PublicationCollector({ userId });
        collector.collect('applications.single', { identification: appli1.identification }, (collections) => {
          assert.property(collections, 'applications');
          done();
        });
      });
    });
  });
});
