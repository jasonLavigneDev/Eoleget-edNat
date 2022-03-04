/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */

import { PublicationCollector } from 'meteor/johanbrook:publication-collector';

import { assert } from 'chai';
import faker from 'faker';

import { Meteor } from 'meteor/meteor';
import '../../../../i18n/en.i18n.json';

// this file also includes tests on users/permissions
import { Accounts } from 'meteor/accounts-base';

import Packs from '../packs';
import Applications from '../../applications/applications';

import { createPack, removePack, updatePack } from '../methods';
import './publications';

describe('packs', function () {
  describe('publications', function () {
    let userId;
    let packId;
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

      const appli1 = {
        nom: 'Test Appli',
        identification: 'TestAppli',
        versions: ['1.0.0', '2.0.0'],
        description: 'Test Application',
        tags: ['Tag1', 'Tag2'],
        license: 'MIT',
        url: 'https://testappli.com',
      };
      const appli2 = {
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
    });
    describe('packs.all', function () {
      it('sends all packs', function (done) {
        const collector = new PublicationCollector({ userId });
        collector.collect('packs.all', { page: 1, search: '', itemPerPage: 10 }, (collections) => {
          assert.equal(collections.packs.length, 1);
          done();
        });
      });
    });
    describe('packs.single', function () {
      it('sends all public fields for a specific pack', function (done) {
        const collector = new PublicationCollector({ userId });
        collector.collect('packs.single', { _id: packId }, (collections) => {
          assert.equal(collections.packs.length, 1);
          done();
        });
      });
    });
    describe('packs.user', function () {
      it('sends all fields for a specific pack created by user', function (done) {
        const collector = new PublicationCollector({ userId });
        collector.collect('packs.user', { page: 1, search: '', userId, itemPerPage: 10 }, (collections) => {
          assert.property(collections, 'packs');
          done();
        });
      });
    });
  });
  describe('methods', function () {
    let userId;
    let email;
    let emailOwner;
    let ownerId;
    beforeEach(function () {
      // Clear
      Packs.remove({});
      Applications.remove({});
      Meteor.users.remove({});
      // Generate 'users'
      email = faker.internet.email();
      userId = Accounts.createUser({
        email,
        username: email,
        password: 'toto',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        groupCount: 0,
        groupQuota: 10,
      });
      emailOwner = faker.internet.email();
      ownerId = Accounts.createUser({
        email: emailOwner,
        username: emailOwner,
        password: 'toto',
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        groupCount: 0,
        groupQuota: 10,
      });

      const appli1 = {
        nom: 'Test Appli',
        identification: 'TestAppli',
        versions: ['1.0.0', '2.0.0'],
        description: 'Test Application',
        tags: ['Tag1', 'Tag2'],
        license: 'MIT',
        url: 'https://testappli.com',
      };

      const appli2 = {
        nom: 'Test Appli 2',
        identification: 'TestAppli2',
        versions: ['1.0.0', '2.0.0'],
        description: 'Test Application 2',
        tags: ['Tag3', 'Tag4'],
        license: 'MIT',
        url: 'https://testappli2.com',
      };

      Applications.insert(appli1);
      Applications.insert(appli2);
    });
    describe('createPack', function () {
      it('user can create pack', function () {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const creationDate = today.toUTCString();

        const appli1 = {
          nom: 'Test Appli',
          identification: 'TestAppli',
          version: '2.0.0',
          description: 'Test Application',
        };

        const appli2 = {
          nom: 'Test Appli 2',
          identification: 'TestAppli2',
          version: '1.0.0',
          description: 'Test Application 2',
        };

        createPack._execute(
          { userId },
          {
            name: 'Test',
            description: 'Test Pack',
            applications: [appli1, appli2],
            ownerName: email,
            creationDate,
            isValidated: true,
            color: 'purple',
            isPublic: true,
          },
        );

        // Check Pack exists
        const pack = Packs.findOne({ name: 'Test' });
        assert.equal(pack.name, 'Test');
      });
      it('user can not create an empty pack', function () {
        assert.throw(
          () => {
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const creationDate = today.toUTCString();

            createPack._execute(
              { userId },
              {
                name: 'Test',
                description: 'Test Pack',
                applications: [],
                ownerName: email,
                creationDate,
                isValidated: true,
                color: 'purple',
                isPublic: true,
              },
            );
          },
          Meteor.Error,
          /api.packs.emptyPack/,
        );
      });
      it('user can not create a pack with only one app', function () {
        assert.throw(
          () => {
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const creationDate = today.toUTCString();

            const appli1 = {
              nom: 'Test Appli',
              identification: 'TestAppli',
              version: '2.0.0',
              description: 'Test Application',
            };

            createPack._execute(
              { userId },
              {
                name: 'Test',
                description: 'Test Pack',
                applications: [appli1],
                ownerName: email,
                creationDate,
                isValidated: true,
                color: 'purple',
                isPublic: true,
              },
            );
          },
          Meteor.Error,
          /api.packs.notEnoughApp/,
        );
      });
      it('user can not create pack with name already taken', function () {
        assert.throw(
          () => {
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const creationDate = today.toUTCString();

            const appli1 = {
              nom: 'Test Appli',
              identification: 'TestAppli',
              version: '2.0.0',
              description: 'Test Application',
            };

            const appli2 = {
              nom: 'Test Appli 2',
              identification: 'TestAppli2',
              version: '1.0.0',
              description: 'Test Application 2',
            };

            createPack._execute(
              { userId },
              {
                name: 'Test',
                description: 'Test Pack',
                applications: [appli1, appli2],
                creationDate,
                ownerName: email,
                isValidated: true,
                color: 'purple',
                isPublic: true,
              },
            );

            // Check Pack exists
            const pack = Packs.findOne({ name: 'Test' });
            assert.equal(pack.name, 'Test');

            createPack._execute(
              { userId },
              {
                name: 'Test',
                description: 'Test Pack 2',
                applications: [appli1],
                creationDate,
                ownerName: email,
                isValidated: true,
                color: 'yellow',
                isPublic: true,
              },
            );
          },
          Meteor.Error,
          /api.packs.nameAlreadyTaken/,
        );
      });
    });
    describe('removePack', function () {
      it('user can remove owned pack', function () {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const creationDate = today.toUTCString();

        const appli1 = {
          nom: 'Test Appli',
          identification: 'TestAppli',
          version: '2.0.0',
          description: 'Test Application',
        };

        const appli2 = {
          nom: 'Test Appli 2',
          identification: 'TestAppli2',
          version: '1.0.0',
          description: 'Test Application 2',
        };

        createPack._execute(
          { userId: ownerId },
          {
            name: 'Test',
            description: 'Test Pack',
            applications: [appli1, appli2],
            creationDate,
            ownerName: emailOwner,
            isValidated: true,
            color: 'purple',
            isPublic: true,
          },
        );

        // Check Pack exists
        const pack = Packs.findOne({ name: 'Test' });
        assert.equal(pack.name, 'Test');

        // Check Pack doesn't exists anymore
        removePack._execute({ userId: ownerId }, { packId: pack._id });
        const packRemoved = Packs.findOne({ name: 'Test' });
        assert.equal(packRemoved, undefined);
      });
      it('user can not remove not owned pack', function () {
        // Throws if non owner/admin user, or logged out user
        assert.throws(
          () => {
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const creationDate = today.toUTCString();
            const appli1 = {
              nom: 'Test Appli',
              identification: 'TestAppli',
              version: '2.0.0',
              description: 'Test Application',
            };
            const appli2 = {
              nom: 'Test Appli 2',
              identification: 'TestAppli2',
              version: '1.0.0',
              description: 'Test Application 2',
            };

            createPack._execute(
              { userId: ownerId },
              {
                name: 'Test',
                description: 'Test Pack',
                applications: [appli1, appli2],
                creationDate,
                ownerName: emailOwner,
                isValidated: true,
                color: 'purple',
                isPublic: true,
              },
            );

            const pack = Packs.findOne({ name: 'Test' });
            assert.equal(pack.name, 'Test');
            removePack._execute({ userId }, { packId: pack._id });
          },
          Meteor.Error,
          /api.packs.removePack.notPermitted/,
        );
      });
    });
    describe('updatePack', function () {
      it('user can update owned pack', function () {
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        const creationDate = today.toUTCString();
        const appli1 = {
          nom: 'Test Appli',
          identification: 'TestAppli',
          version: '2.0.0',
          description: 'Test Application',
        };
        const appli2 = {
          nom: 'Test Appli 2',
          identification: 'TestAppli2',
          version: '1.0.0',
          description: 'Test Application 2',
        };

        createPack._execute(
          { userId: ownerId },
          {
            name: 'Test',
            description: 'Test Pack',
            applications: [appli1, appli2],
            creationDate,
            ownerName: emailOwner,
            isValidated: true,
            color: 'purple',
            isPublic: true,
          },
        );

        const pack = Packs.findOne({ name: 'Test' });
        assert.equal(pack.name, 'Test');
        updatePack._execute(
          { userId: ownerId },
          {
            _id: pack._id,
            name: 'Test2',
            applications: [appli1, appli2],
            description: 'Description modified',
            color: 'yellow',
            isPublic: true,
          },
        );

        const packModified = Packs.findOne({ _id: pack._id });
        assert.equal(packModified.name, 'Test2');
        assert.equal(packModified.description, 'Description modified');
        assert.equal(packModified.color, 'yellow');
      });
      it('user can not update not owned pack', function () {
        assert.throws(
          () => {
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const creationDate = today.toUTCString();
            const appli1 = {
              nom: 'Test Appli',
              identification: 'TestAppli',
              version: '2.0.0',
              description: 'Test Application',
            };
            const appli2 = {
              nom: 'Test Appli 2',
              identification: 'TestAppli2',
              version: '1.0.0',
              description: 'Test Application 2',
            };

            createPack._execute(
              { userId: ownerId },
              {
                name: 'Test',
                description: 'Test Pack',
                applications: [appli1, appli2],
                creationDate,
                ownerName: emailOwner,
                isValidated: true,
                color: 'purple',
                isPublic: true,
              },
            );

            const pack = Packs.findOne({ name: 'Test' });
            assert.equal(pack.name, 'Test');
            updatePack._execute(
              { userId },
              {
                _id: pack._id,
                name: 'Test2',
                applications: [appli1, appli2],
                description: 'Description modified',
                color: 'yellow',
                isPublic: false,
              },
            );
          },
          Meteor.Error,
          /api.packs.updatePack.notPermitted/,
        );
      });
      it('user can not update pack with no applications', function () {
        assert.throw(
          () => {
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const creationDate = today.toUTCString();

            const appli1 = {
              nom: 'Test Appli',
              identification: 'TestAppli',
              version: '2.0.0',
              description: 'Test Application',
            };

            const appli2 = {
              nom: 'Test Appli 2',
              identification: 'TestAppli2',
              version: '1.0.0',
              description: 'Test Application 2',
            };

            createPack._execute(
              { userId },
              {
                name: 'Test',
                description: 'Test Pack',
                applications: [appli1, appli2],
                creationDate,
                ownerName: emailOwner,
                isValidated: true,
                color: 'purple',
                isPublic: true,
              },
            );

            const pack = Packs.findOne({ name: 'Test' });
            assert.equal(pack.name, 'Test');
            updatePack._execute(
              { userId },
              {
                _id: pack._id,
                name: 'Test2',
                applications: [],
                description: 'Description modified',
                color: 'yellow',
                isPublic: true,
              },
            );
          },
          Meteor.Error,
          /api.packs.emptyPack/,
        );
      });
      it('user can not update pack with only one app', function () {
        assert.throw(
          () => {
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const creationDate = today.toUTCString();

            const appli1 = {
              nom: 'Test Appli',
              identification: 'TestAppli',
              version: '2.0.0',
              description: 'Test Application',
            };

            createPack._execute(
              { userId },
              {
                name: 'Test',
                description: 'Test Pack',
                applications: [appli1],
                creationDate,
                ownerName: emailOwner,
                isValidated: true,
                color: 'purple',
                isPublic: true,
              },
            );

            const pack = Packs.findOne({ name: 'Test' });
            assert.equal(pack.name, 'Test');
            updatePack._execute(
              { userId },
              {
                _id: pack._id,
                name: 'Test2',
                applications: [],
                description: 'Description modified',
                color: 'yellow',
                isPublic: true,
              },
            );
          },
          Meteor.Error,
          /api.packs.notEnoughApp/,
        );
      });
      it('user can not update pack with name already taken', function () {
        assert.throw(
          () => {
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            const creationDate = today.toUTCString();

            const appli1 = {
              nom: 'Test Appli',
              identification: 'TestAppli',
              version: '2.0.0',
              description: 'Test Application',
            };

            const appli2 = {
              nom: 'Test Appli 2',
              identification: 'TestAppli2',
              version: '1.0.0',
              description: 'Test Application 2',
            };

            createPack._execute(
              { userId },
              {
                name: 'Test',
                description: 'Test Pack',
                applications: [appli1, appli2],
                creationDate,
                ownerName: emailOwner,
                isValidated: true,
                color: 'purple',
                isPublic: true,
              },
            );

            createPack._execute(
              { userId },
              {
                name: 'Test2',
                description: 'Test Pack 2',
                applications: [appli1, appli2],
                creationDate,
                ownerName: emailOwner,
                isValidated: true,
                color: 'yellow',
                isPublic: true,
              },
            );

            // Check Pack exists
            const pack = Packs.findOne({ name: 'Test' });
            const pack2 = Packs.findOne({ name: 'Test2' });
            assert.equal(pack.name, 'Test');
            assert.equal(pack2.name, 'Test2');

            updatePack._execute(
              { userId },
              {
                _id: pack._id,
                name: 'Test2',
                applications: [appli1],
                description: 'Description modified',
                color: 'yellow',
                isPublic: true,
              },
            );
          },
          Meteor.Error,
          /api.packs.nameAlreadyTaken/,
        );
      });
    });
  });
});
