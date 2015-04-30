# jj-log

jj-log is a JSON logger that's as extendable as you want it to be.

## Installation
```
$ npm install jj-log
```

## Usage

### Defaults
```js
var jjLog = require( 'jj-log' )
var log = jjLog()

log({
    message: 'hello'
})
//> {"message":"hello", "timestamp":1430337665558}
```

### Without Timestamps
```js
var jjLog = require( 'jj-log' )
var log = jjLog({
    timestamps: false
})

log({
    message: 'hello'
})
//> {"message":"hello"}
```

### With Default Data
```js
var jjLog = require( 'jj-log' )
var log = jjLog({
    timestamps: false,
    defaults: {
        level: 'info',
        package: 'jj-log'
    }
})

log({
    message: 'hello'
})
//> {"message":"hello","level":"info","package":"jj-log"}
```

### With Additional Methods
```js
var jjLog = require( 'jj-log' )
var log = jjLog({
    timestamps: false,
    methods: {
        fatal: {
            level: 'fatal',
            shouldWePanic: 'absolutely'
        },
        warn: {
            level: 'warn',
            shouldWePanic: 'probably not'
        }
    }
})

log.warn({
    message: 'hello'
})
//> {"message":"hello","level":"warn","shouldWePanic":"probably not"}

log.fatal({
    message: 'hello'
})
//> {"message":"hello","level":"fatal","shouldWePanic":"absolutely"}
```

### Attributes May Be Functions

```
var fatalErrorsSoFar = 0
var jjLog = require( 'jj-log' )
var log = jjLog({
    timestamps: false,
    methods: {
        fatal: {
            level: 'fatal',
            errorNumber: function(){
                return fatalErrorsSoFar++
            }
        }
    }
})

log.fatal({
    message: 'oops'
})
//> {"message":"oops","level":"fatal","errorNumber":1}

log.fatal({
    message: 'oops again'
})
//> {"message":"oops again","level":"fatal","errorNumber":2}
```

### Default May be Overriden at Any Level
```
var jjLog = require( 'jj-log' )
var log = jjLog({
    timestamps: false,
    defaults: {
        level: 'info'
    },
    methods: {
        warn: {
            level: 'warn'
        }
    }
})

log()
//> {"level":"info"}

log({
    level: 'uh oh'
})
//> {"level":"uh oh"}

log.warn()
//> {"level":"info"}

log.warn({
    level: 'a bit worse this time'
})
//> {"level":"a bit worse this time"}
```
