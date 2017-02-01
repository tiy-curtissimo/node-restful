'use strict';

let applications = {
  '98961': [{
    applicationType: 'auto',
    uri: '/my/applications/443449',
    status: 'submitted',
    startedOn: '2016-12-02'
  }, {
    applicationType: 'home',
    uri: '/my/applications/321684',
    status: 'under review',
    startedOn: '2017-01-09'
  }],
  '37365': [{
    applicationType: 'card',
    uri: '/my/applications/0968498',
    status: 'not approved',
    startedOn: '2016-04-19'
  }]
}

module.exports = {
  list: list
};

function list(req, res) {
  let token = req.swagger.params['x-customer-token'].value;
  let list = applications[token] || [];
  res.json(list);
}
