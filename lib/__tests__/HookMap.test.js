const { SyncHook, HookMap } = require('tapable')
const keyedHook = new HookMap(key => new SyncHook(["arg"]))

keyedHook.tap("key1", "MyPlugin1", function(arg) {
	console.log('> ', arguments)
});
keyedHook.tap("key1", "MyPlugin2", function(arg) {
	console.log('> ', arguments)
});
keyedHook.tap("key3", "MyPlugin3", function(arg) {
	console.log('> ', arguments)
});

const hook = keyedHook.get("key1");
if( hook !== undefined ) {
	hook.call("hello", function(arg) {
		console.log('', arguments)
	});
}
