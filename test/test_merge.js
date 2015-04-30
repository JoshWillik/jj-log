var assert = require( 'assert' )
var merge = require( '../lib/merge' )

describe( 'The merge function', function(){
  it( 'should merge keys from two objects', function(){
    var a = { cat: 'walk' }
    var b = { fish: 'swim' }
    var merged = merge( a, b )

    assert.equal( merged.cat, a.cat, 'The first object\'s keys are lost' )
    assert.equal( merged.fish, b.fish, 'The second object\'s keys are lost' )
  })

  it( 'should allow overrides from later objects', function(){
    var a = { cat: 'walk' }
    var b = { cat: 'run' }
    var merged = merge( a, b )

    assert.equal( merged.cat, b.cat, 'The value was not overriden' )
  })

  it( 'should return a clone of an object, 1 argument', function(){
    var original = { cat: 'walk' }
    var merged = merge( original )
    original.cat = 'some random value'
    assert.equal( merged.cat, 'walk' )
  })

  it( 'should return a clone of an object, more arguments', function(){
    var itemA = { rain: 'falls' }
    var itemB = { snow: 'blows' }
    var merged = merge( itemA, itemB )
    itemA.rain = 'REDACTED'
    itemB.snow = 'REDACTED'

    assert.equal( merged.rain, 'falls', 'Merge returns the original object with 2 arguments' )
    assert.equal( merged.snow, 'blows', 'Merge returns the original object with 2 arguments' )
  })

  it( 'should silently skip invalid entries', function(){
    var a = { cat: 'walks' }

    var merged = merge( false, a, null, undefined, 1, 'hello' )
    assert.equal( merged.cat, a.cat )
  })
})
