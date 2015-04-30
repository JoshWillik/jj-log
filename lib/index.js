var merge = require( './merge' )
var messageLogger = require( './message-logger' )

function buildLogger( options ){
  options = merge( {
    writeStream: process.stdout
  }, options )

  var defaults = merge( {}, options.defaults )
  var methods = options.methods

  if( options.timestamps !== false ){
    defaults.timestamp = Date.now
  }

  var logger = messageLogger( defaults, options )

  for( var method in methods ){
    if( !methods.hasOwnProperty( method ) ) continue

    var methodDefaults = merge( defaults, methods[ method ] )
    logger[ method ] = messageLogger( methodDefaults, options )
  }

  return logger
}

module.exports = buildLogger
