describe 'API/ApiController', ->
  describe '#ping', ->
    it 'pong!', (done) ->
      request.get('/api/ping').expect 200
      .end (err, resp) ->
        resp.body.result.should.equal 'pong!'
        done err