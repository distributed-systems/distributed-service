!function() {

	var   Class 		= require('ee-class')
		, EventEmitter 	= require('ee-event-emitter')
		, type 			= require('ee-types')
		, log 			= require('ee-log')
        , uuid          = require('node-uuid');


	/*
	 * basic service implementation
	 */
	module.exports = new Class({
		inherits: EventEmitter


		// tell the outside that we are a service
		, isService: { get: function() {return true;}}


		// the id of this service (service name)
		, id: null


		// semver of the service instance
		// it's not al ittle bit optional
		, version: null


		// the uid of the service instance
		// gets dynamically assigned when
		// registering with the service registry
		, uid: null


		// each service is launched in the scope of an application
		// it will be set by the caller of the applciation
		, applicationId: null


		// a secure token the is used to enable
		// secure communication
		, secureToken: null
		

		/**
		 * service constructor
		 *
		 * @param <Object> options
		 */
		, init: function(options) {
			if (!options) throw new Error('Missing the options object!');
			if (!type.string(options.applicationId)) throw new Error('Missing the applicationId in the options object!');
			if (!type.string(options.secureToken)) throw new Error('Missing the secureToken in the options object!');
			if (!type.string(options.id)) throw new Error('Missing the id in the options object!');
			if (!type.string(options.version)) throw new Error('Missing the version in the options object!');

			// create service uid, 
			this.uid = uuid.v4();

			// store
			this.setApplicationId(options.applicationId);
			this.setSecureToken(options.secureToken);

			this.id = options.id;
			this.version = options.version;
		}



		/**
		 * is called by the message router, it indicates that it is listeing
		 * for messages and other events
		 */
		, handleRouterAdd: function() {
			this.emit('addRoute', this);
		}



		/**
		 * stores the secure token to enable secure communication
		 *
		 * @param <string> 256bit token as 32 byte hex encoded string
		 */
		, setSecureToken: function(token) {
			if (!type.string(token)) throw new Error('Missing secure token!');
			if (token.length !== 64) throw new Error('The token must be exactly 256 bit long (as hex encoded -> 64 characters)');

			this.secureToken = token;
		}

		

		/**
		 * set the application id
		 *
		 * @param <string> application id
		 */
		, setApplicationId: function(id) {
			if (!type.string(id)) throw new Error('Missing application id!');
			if (id.length !== 36) throw new Error('The application id must be exactly 36 characters long)');
			this.applicationId = id;
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
