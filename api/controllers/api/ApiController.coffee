module.exports = ApiController =
  ping: (req, resp) ->
    resp.ok result: 'pong!'