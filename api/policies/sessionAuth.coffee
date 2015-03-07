module.exports = (req, resp, next) ->
  # User is allowed, proceed to the next policy,
  # or if this is the last policy, the controller
  return next()  if req.session.authenticated

  # User is not allowed
  # (default res.forbidden() behavior can be overridden in `config/403.js`)
  return resp.forbidden 'You are not permitted to perform this action.'
