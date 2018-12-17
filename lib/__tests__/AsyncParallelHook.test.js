const { AsyncParallelHook} = require('../')
const hook = new AsyncParallelHook(['arg1'])

hook.tapPromise('plugin.1', function (arg1) {
	return new Promise(function (resolve, reject) {
		setTimeout(() => {
			console.log('p1', arg1)
			resolve(arg1 + '.p1')
		}, 1000)
	})
})

hook.tapPromise('plugin.2', function (arg1) {
	return new Promise(function (resolve, reject) {
		setTimeout(() => {
			console.log('p2', arg1)
			resolve(arg1+'.p2')
		}, 500)
	})
})

hook.promise('t1').then(function() {
	console.log('promise finished', arguments)
}).catch(() => {
	console.log('promise error!')
})
