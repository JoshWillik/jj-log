function merge(){
  var toMerge = Array.prototype.slice.call( arguments )

  // If there's nothing in this array, abort
  if( !toMerge.length ){
    return {}
  }

  var mergedValues = {}
  toMerge.forEach( function( mergeItem ){
    for( var attr in mergeItem ){
      if( !mergeItem.hasOwnProperty( attr ) ) continue

      mergedValues[ attr ] = mergeItem[ attr ]
    }
  })

  return mergedValues
}

module.exports = merge
