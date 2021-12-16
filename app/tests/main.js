import assert from 'assert';

describe('eoleget', function testEoleGet() {
  it('package.json has correct name', async function testPackageJSON() {
    const { name } = await import('../package.json');
    assert.strictEqual(name, 'eoleget');
  });

  if (Meteor.isClient) {
    it('client is not server', function testsClient() {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it('server is not client', function testServer() {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});
