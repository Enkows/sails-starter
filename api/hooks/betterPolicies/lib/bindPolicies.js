var util = require('sails/node_modules/sails-util');

module.exports = 	function _bindPolicies (mapping, middlewareSet) {

  util.each(middlewareSet, function (_c, id) {

    var topLevelPolicyId = mapping[id];
    var actions, actionFn;
    var controller = middlewareSet[id];

    // If a policy doesn't exist for this controller, use '*'
    if (util.isUndefined(topLevelPolicyId)) {
      var policyKey = id.split('/').slice(0, -1).join('/') + '/*';
      if (policyKey == '/*') policyKey = '*';
      topLevelPolicyId = mapping[policyKey];

      if (util.isUndefined(topLevelPolicyId)) {
        topLevelPolicyId = mapping['*'];
      }
    }

    // sails.log.verbose('Applying policy :: ', topLevelPolicyId, ' to ', id);

    // Build list of actions
    if (util.isDictionary(controller)) {
      actions = util.functions(controller);
    }

    // If this is a controller policy, apply it immediately
    if (!util.isDictionary(topLevelPolicyId)) {

      // :: Controller is a container object
      // -> apply the policy to all the actions
      if (util.isDictionary(controller)) {
        // sails.log.verbose('Applying policy (' + topLevelPolicyId + ') to controller\'s (' + id + ') actions...');
        util.each(actions, function (actionId) {
          actionFn = controller[actionId];
          controller[actionId] = topLevelPolicyId.concat([actionFn]);
          // sails.log.verbose('Applying policy to ' + id + '.' + actionId + '...', controller[actionId]);
        }, this);
        return;
      }

      // :: Controller is a function
      // -> apply the policy directly
      // sails.log.verbose('Applying policy (' + topLevelPolicyId + ') to top-level controller middleware fn (' + id + ')...');
      middlewareSet[id] = topLevelPolicyId.concat(controller);
    }

    // If this is NOT a top-level policy, and merely a container of other policies,
    // iterate through each of this controller's actions and apply policies in a way that makes sense
    else {

      util.each(actions, function (actionId) {

        var actionPolicy = mapping[id][actionId];
        // sails.log.verbose('Mapping policies to actions.... ', actions);

        // If a policy doesn't exist for this controller/action, use the controller-local '*'
        if (util.isUndefined(actionPolicy)) {
          actionPolicy = mapping[id]['*'];
        }

        // if THAT doesn't exist, use the global '*' policy
        if (util.isUndefined(actionPolicy)) {
          actionPolicy = mapping['*'];
        }
        // sails.log.verbose('Applying policy (' + actionPolicy + ') to action (' + id + '.' + actionId + ')...');

        actionFn = controller[actionId];
        controller[actionId] = actionPolicy.concat([actionFn]);
      }, this);
    }

  });
};