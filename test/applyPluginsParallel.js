var Tapable = require("../lib/Tapable");
var should = require("should");

function makeTestPlugin(expectedArgs, returnVal) {
	return function() {
		var args = Array.prototype.slice.call(arguments);
		args.should.be.eql(expectedArgs);
		return returnVal;
	}
}

describe("applyPluginsAsync",function () {
	it("test1", function() {
		var runningSum = 0;
		var tapable = new Tapable();
		tapable.plugin('plugin', function(cb) {
			runningSum++;
			cb();
		});
		tapable.plugin('plugin', function(cb) {
			runningSum++;
			cb();
		});
		tapable.plugin('plugin', function(cb) {
			runningSum++;
			cb();
		});
		tapable.applyPluginsAsync('plugin',function () {
		});
		runningSum.should.be.eql(3);
	})
})

describe("applyPluginsParallel",function () {
	var tapable = new Tapable();
	it("test1", function() {
		var runningSum = 0;
		tapable.plugin('plugin', function(cb) {
			runningSum++;
			cb();
		});
		tapable.plugin('plugin', function(cb) {
			runningSum++;
			cb();
		});
		tapable.plugin('plugin', function(cb) {
			runningSum++;
			cb();
		});
		tapable.applyPluginsParallel('plugin',function () {
			console.log("hello");
		});
		runningSum.should.be.eql(3);
	});

	// it("test2",function () {
	// 	tapable.plugin("emit",
	// 		function (a,b,cb) {
	// 			setTimeout(()=>{
	// 				console.log('1',a,b);
	// 				cb('e222','33333');
	// 			},1000)
	// 		});
	// 	tapable.plugin("emit",
	// 		function (a,b,cb) {
	// 			setTimeout(()=>{
	// 				console.log('2',a,b);
	// 				cb();
	// 			},500)
	// 		});
	// 	tapable.applyPluginsParallel("emit",'aaaa','bbbbb',function(a,b){
	// 		console.log('end',a,b)
	// 	});
	// });

	it("applyPluginsParallelBailResult",function () {
		tapable.plugin("emit2",function(a,b,cb){
			setTimeout(()=>{
				console.log('1',a,b);
				cb();
			},1000);
		});

		tapable.plugin("emit2",function(a,b,cb){
			setTimeout(()=>{
				console.log('2',a,b);
				cb();
			},500)
		});

		tapable.plugin("emit2",function(a,b,cb){
			setTimeout(()=>{
				console.log('3',a,b);
				cb();
			},500)
		});

		tapable.applyPluginsParallelBailResult("emit2",'aaaa','bbbbb',function(a,b){
			console.log('end',a,b)
		});
	});
});

describe("applyPlugins",function () {
	it("test1", function() {
		var obj = {};
		var tapable = new Tapable();
		tapable.plugin('plugin',function(o, cb) {
			o.a = 12;
			cb();
			return o;
		});
		tapable.plugin('plugin',function(o, cb) {
			o.b = 11;
			cb();
			return o;
		});
		tapable.plugin('plugin',function(o,cb) {
			o.c = 13;
			cb();
			return o;
		});
		tapable.applyPluginsWaterfall('plugin',obj, function () {
			console.log("hello");
		});

		obj.a.should.be.eql(12);
		obj.b.should.be.eql(11);
		obj.c.should.be.eql(13);
	})
})
