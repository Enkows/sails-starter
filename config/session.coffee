module.exports.session =
  secret: '147188fa793e6dc3837069eeea96e22c'
  cookie:
    maxAge: 30 * 24 * 60 * 60 * 1000

  adapter: 'redis'
  host: 'localhost'
  port: 6379
  ttl: 30 * 24 * 60 * 60
  prefix: 'sess:'
