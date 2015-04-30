var merge = require( './merge' )

function createMessageLogger( defaults, options ){
  var SILENCED
  if( process.env && process.env.SILENCE_JJ_LOG === 'true' ){
    SILENCED = true
  }

  if( options.silent === true ){
    SILENCED = true
  }

  var writeStream = options.writeStream
  return function logMessage( message ){
    return new Promise( function( resolve, reject ){
      if( SILENCED ){
        resolve()
        return
      }

      message = merge( defaults, message )
      for( var attr in message ){
        if( !message.hasOwnProperty( attr ) ){
          continue
        }
        if( typeof message[ attr ] === 'function' ){
          message[ attr ] = message[ attr ]()
        }
      }

      var messageString = JSON.stringify( message ) + '\n'
      writeStream.write( messageString )

      resolve( message )
    })
  }
}

module.exports = createMessageLogger
