module.exports = AppController =
  homepage: (req, resp) ->
    resp.view 'homepage'