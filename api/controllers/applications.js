'use strict';

let applications = {
  '98961': [{
    id: 443449,
    applicationType: 'auto',
    uri: '/my/applications/443449',
    status: 'submitted',
    startedOn: '2016-12-02',
    amountRequested: 40000
  }, {
    id: 321684,
    applicationType: 'home',
    uri: '/my/applications/321684',
    status: 'under review',
    startedOn: '2017-01-09',
    amountRequested: 360000
  }],
  '37365': [{
    id: 0968498,
    applicationType: 'card',
    uri: '/my/applications/0968498',
    status: 'not approved',
    startedOn: '2016-04-19',
    amountRequested: 10000
  }]
}

module.exports = {
  list: list,
  create: create
};

function pad0(s) {
  s = s.toString();
  if (s.length === 1) {
    return '0' + s
  }
  return s;
}

function now() {
  let d = new Date();
  return `${d.getFullYear()}-${pad0(d.getMonth() + 1)}-${pad0(d.getDate())}`;
}

function list(req, res) {
  let token = req.swagger.params['x-customer-token'].value;
  let list = applications[token] || [];
  res.json({ applications: list });
}

function create(req, res) {
  let submission = req.swagger.params.application.value;
  let token = req.swagger.params['x-customer-token'].value;
  let list = applications[token] || [];

  let found = list.find(a => a.applicationType === submission.applicationType);

  if (found) {
    res.status(409).json({
      message: `An application of type ${submission.applicationType} is already in process.`,
      existing: found,
      submitted: submission
    });
  } else {
    submission.id = Math.floor(Math.random() * 1000000);
    submission.startedOn = now();

    list.push(submission);

    if (submission.applicationType === 'card') {
      res.status(202);
      submission.status = 'submitted';
    } else {
      res.status(201);
      submission.status = 'incomplete';
    }
    res.json(submission);
  }
}
