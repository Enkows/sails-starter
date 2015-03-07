module.exports.http =
  cache: 31557600000
  customMiddleware: (app) ->
    app.use require("connect-assets") sails.config.assets