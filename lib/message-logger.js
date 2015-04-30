var merge = require( './merge' )

function createMessageLogger( defaults, options ){
  var writeStream = options.writeStream

  return function logMessage( message ){
    return new Promise( function( resolve, reject ){
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

      resolve()
    })
  }
}

module.exports = createMessageLogger
