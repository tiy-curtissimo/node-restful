var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {
  describe('applications', function() {
    describe('GET /api/my/applications/v1.0', function() {
      it('should return an empty list of applications for a user that has no applications', function(done) {
        request(server)
          .get('/api/my/applications/v1.0')
          .set('Accept', 'application/json')
          .set('x-customer-token', 123456)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.should.deepEqual({ applications: [] });
            done();
          });
      });

      it('should return a list of applications for a user that has applications', function(done) {
        request(server)
          .get('/api/my/applications/v1.0')
          .set('Accept', 'application/json')
          .set('x-customer-token', 98961)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
            res.body.applications.should.have.length(2);
            done();
          });
      });
    });
  });
});
