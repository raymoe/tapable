const { AsyncSeriesHook } = require('../')
const hook = new AsyncSeriesHook(['arg1'])

hook.tapAsync('plugin.1', function (arg1, callback) {
	setTimeout(() => {
		console.log('p1', arg1)
		callback(null, 'p1')
	}, 2000)
})

hook.tapAsync('plugin.2', function (arg1, callback) {
	setTimeout(() => {
		console.log('p2', arg1)
		callback(null, 'p2')
	}, 1000)
})

hook.tapAsync('plugin.3', function (arg1, callback) {
	setTimeout(() => {
		console.log('p3', arg1)
		callback(null, 'p3')
	}, 500)
})

hook.callAsync('t1', function () {
	console.log('hook.callAsync finish.', arguments)
})
