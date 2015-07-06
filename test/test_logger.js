var assert = require( 'assert' )
var stream = require( 'stream' )
var logger = require( '..' )

describe( 'Logger module', function(){
  var outputStream
  beforeEach( function createNewOutputStream(){
    outputStream = {
      write: function( data ){
        this.data = data
      },
      read: function(){
        return this.data
      }
    }
  })

  it( 'should create logger without failing', function(){
    return logger({
      writeStream: outputStream
    })
  })

  it( 'should have a timestamp by default', function(){
    logger({
      writeStream: outputStream
    })()

    var output = outputStream.read()
    var outputObject = JSON.parse( output )
    assert( typeof outputObject.timestamp === 'number' )
  })

  it( 'should not have a timestamp if timestamps is false', function(){
    logger({
      writeStream: outputStream,
      timestamps: false
    })()

    var output = outputStream.read()
    var outputObject = JSON.parse( output )
    assert.equal( outputObject.timestamp, undefined )
  })

  it( 'should carry default values if those have been provided', function(){
    logger({
      writeStream: outputStream,
      defaults: {
        cat: 'falls down'
      }
    })()


    var output = outputStream.read()
    var outputObject = JSON.parse( output )
    assert.equal( outputObject.cat, 'falls down' )
  })

  it( 'should allow overriding defaults', function(){
    logger({
      writeStream: outputStream,
      defaults: {
        cat: 'falls down'
      }
    })({
      cat: 'walks normally'
    })


    var output = outputStream.read()
    var outputObject = JSON.parse( output )
    assert.equal( outputObject.cat, 'walks normally' )
  })

  it( 'should allow methods to be added', function(){
    var l = logger({
      writeStream: outputStream,
      defaults: {
        cat: 'falls down'
      },
      methods: {
        info: {
          level: 'info'
        }
      }
    })
    l.info()

    var output = outputStream.read()
    var outputObject = JSON.parse( output )
    assert.equal( outputObject.level, 'info' )
  })

  it( 'should allow added methods to be overridable', function(){
    var l = logger({
      writeStream: outputStream,
      methods: {
        info: {
          level: 'info'
        }
      }
    })
    l.info({
      level: 'status'
    })

    var output = outputStream.read()
    var outputObject = JSON.parse( output )
    assert.equal( outputObject.level, 'status' )
  })

  it( 'should allow an attribute to be a function', function(){
    var l = logger({
      writeStream: outputStream,
      defaults: {
        foo: function(){
          return 'foo ' + 'bar'
        }
      }
    })()

    var output = outputStream.read()
    var outputObject = JSON.parse( output )
    assert.equal( outputObject.foo, 'foo bar' )
  })

  it( 'should allow a method attribute to be a function', function(){
    var l = logger({
      writeStream: outputStream,
      methods: {
        info: {
          test: function(){
            return 'this is a test'
          }
        }
      }
    }).info()

    var output = outputStream.read()
    var outputObject = JSON.parse( output )
    assert.equal( outputObject.test, 'this is a test' )
  })


  it( 'should allow logging strings and implicitly convert to a payload', function(){
    var l = logger({
      writeStream: outputStream
    })

    l( 'testing' )

    var output = outputStream.read()
    var outputObject = JSON.parse( output )
    assert.equal( outputObject.message, 'testing' )
  })

  it( 'should output nothing if silent is set', function(){
    var l = logger({
      writeStream: outputStream,
      silent: true
    })()

    var output = outputStream.read()
    assert.equal( output, undefined )
  })

})
