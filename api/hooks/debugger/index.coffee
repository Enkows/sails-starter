module.exports = DebuggerHook = (sails) ->
  routes:
    before:
      '*': (req, resp, next) ->
        sails.log.blank()
        sails.log.verbose req.method, req.url

        _jsonx = resp.jsonx
        resp.jsonx = (args...) ->
          sails.log.verbose 'Request:', req.params.all()
          sails.log.verbose "Response:", args...
          return _jsonx args...

        do next