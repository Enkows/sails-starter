Sails = require 'sails'
rc = require 'sails/node_modules/rc'

options = rc 'sails'
options.appPath = './test-cov'
options.environment = 'test'

before (done) ->
  Sails.lift options, (err, sails) ->
    global.request = require('supertest') sails.hooks.http.app
    done err

after (done) ->
  sails.lower done
