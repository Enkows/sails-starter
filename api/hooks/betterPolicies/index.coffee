bindPolicies = require './lib/bindPolicies.js'

module.exports = betterPolicies = (sails) ->
  configure: ->
    sails.on 'hook:policies:loaded', ->
      sails.hooks.policies.bindPolicies = ->
        self = sails.hooks.policies
        bindPolicies self.mapping, sails.middleware.controllers
        sails.log.verbose 'BetterPolicies: Policy-controller bindings complete!'
        sails.emit 'hook:policies:bound'
