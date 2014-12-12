!function() {

	var   Class 		= require('ee-class')
		, EventEmitter 	= require('ee-event-emitter')
		, log 			= require('ee-log');


	/*
	 * implements basic message handling, is an abstraction so that
	 * the underlying message system can be swapped wihtout rewritiung 
	 * any code above this layer.
	 */
	module.exports = new Class({
		inherits: EventEmitter


		// the id of this service (service name)
		, id: null


		// semver of the service instance
		// it's not al ittle bit optional
		, version: null


		// the uid of the service instance
		// gets dynamically assigned when
		// registering with the service registry
		, uid: null
		


		


		, init: function(options) {

		}



		/**
		 * handle incoming messages
		 *
		 * @param <Message> object message
		 */
		, handleMessage: function(message) {
			throw new Error('Messagehandler not implemented!');
		}



		/**
		 * emit a message to be sent elsewhere
		 *
		 * @param <Message> object message
		 */
		, emitMessage: function(message) {
			this.emit('message', message);
		}
	});
}();
