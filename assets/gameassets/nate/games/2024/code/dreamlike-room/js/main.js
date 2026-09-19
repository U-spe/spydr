/*!
* TweenJS
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/


//##############################################################################
// extend.js
//##############################################################################

this.createjs = this.createjs||{};

/**
 * @class Utility Methods
 */

/**
 * Sets up the prototype chain and constructor property for a new class.
 *
 * This should be called right after creating the class constructor.
 *
 * 	function MySubClass() {}
 * 	createjs.extend(MySubClass, MySuperClass);
 * 	MySubClass.prototype.doSomething = function() { }
 *
 * 	var foo = new MySubClass();
 * 	console.log(foo instanceof MySuperClass); // true
 * 	console.log(foo.prototype.constructor === MySubClass); // true
 *
 * @method extend
 * @param {Function} subclass The subclass.
 * @param {Function} superclass The superclass to extend.
 * @return {Function} Returns the subclass's new prototype.
 */
createjs.extend = function(subclass, superclass) {
	"use strict";

	function o() { this.constructor = subclass; }
	o.prototype = superclass.prototype;
	return (subclass.prototype = new o());
};

//##############################################################################
// promote.js
//##############################################################################

this.createjs = this.createjs||{};

/**
 * @class Utility Methods
 */

/**
 * Promotes any methods on the super class that were overridden, by creating an alias in the format `prefix_methodName`.
 * It is recommended to use the super class's name as the prefix.
 * An alias to the super class's constructor is always added in the format `prefix_constructor`.
 * This allows the subclass to call super class methods without using `function.call`, providing better performance.
 *
 * For example, if `MySubClass` extends `MySuperClass`, and both define a `draw` method, then calling `promote(MySubClass, "MySuperClass")`
 * would add a `MySuperClass_constructor` method to MySubClass and promote the `draw` method on `MySuperClass` to the
 * prototype of `MySubClass` as `MySuperClass_draw`.
 *
 * This should be called after the class's prototype is fully defined.
 *
 * 	function ClassA(name) {
 * 		this.name = name;
 * 	}
 * 	ClassA.prototype.greet = function() {
 * 		return "Hello "+this.name;
 * 	}
 *
 * 	function ClassB(name, punctuation) {
 * 		this.ClassA_constructor(name);
 * 		this.punctuation = punctuation;
 * 	}
 * 	createjs.extend(ClassB, ClassA);
 * 	ClassB.prototype.greet = function() {
 * 		return this.ClassA_greet()+this.punctuation;
 * 	}
 * 	createjs.promote(ClassB, "ClassA");
 *
 * 	var foo = new ClassB("World", "!?!");
 * 	console.log(foo.greet()); // Hello World!?!
 *
 * @method promote
 * @param {Function} subclass The class to promote super class methods on.
 * @param {String} prefix The prefix to add to the promoted method names. Usually the name of the superclass.
 * @return {Function} Returns the subclass.
 */
createjs.promote = function(subclass, prefix) {
	"use strict";

	var subP = subclass.prototype, supP = (Object.getPrototypeOf&&Object.getPrototypeOf(subP))||subP.__proto__;
	if (supP) {
		subP[(prefix+="_") + "constructor"] = supP.constructor; // constructor is not always innumerable
		for (var n in supP) {
			if (subP.hasOwnProperty(n) && (typeof supP[n] == "function")) { subP[prefix + n] = supP[n]; }
		}
	}
	return subclass;
};

//##############################################################################
// deprecate.js
//##############################################################################

this.createjs = this.createjs||{};

/**
 * @class Utility Methods
 */

/**
 * Wraps deprecated methods so they still be used, but throw warnings to developers.
 *
 *	obj.deprecatedMethod = createjs.deprecate("Old Method Name", obj._fallbackMethod);
 *
 * The recommended approach for deprecated properties is:
 *
 *	try {
 *		Obj	ect.defineProperties(object, {
 *			readyOnlyProp: { get: createjs.deprecate("readOnlyProp", function() { return this.alternateProp; }) },
 *			readWriteProp: {
 *				get: createjs.deprecate("readOnlyProp", function() { return this.alternateProp; }),
 *				set: createjs.deprecate("readOnlyProp", function(val) { this.alternateProp = val; })
 *		});
 *	} catch (e) {}
 *
 * @method deprecate
 * @param {Function} [fallbackMethod=null] A method to call when the deprecated method is used. See the example for how
 * @param {String} [name=null] The name of the method or property to display in the console warning.
 * to deprecate properties.
 * @return {Function} If a fallbackMethod is supplied, returns a closure that will call the fallback method after
 * logging the warning in the console.
 */
createjs.deprecate = function(fallbackMethod, name) {
	"use strict";
	return function() {
		var msg = "Deprecated property or method '"+name+"'. See docs for info.";
		console && (console.warn ? console.warn(msg) : console.log(msg));
		return fallbackMethod && fallbackMethod.apply(this, arguments);
	}
};

//##############################################################################
// Event.js
//##############################################################################

this.createjs = this.createjs||{};

(function() {
	"use strict";

// constructor:
	/**
	 * Contains properties and methods shared by all events for use with
	 * {{#crossLink "EventDispatcher"}}{{/crossLink}}.
	 * 
	 * Note that Event objects are often reused, so you should never
	 * rely on an event object's state outside of the call stack it was received in.
	 * @class Event
	 * @param {String} type The event type.
	 * @param {Boolean} bubbles Indicates whether the event will bubble through the display list.
	 * @param {Boolean} cancelable Indicates whether the default behaviour of this event can be cancelled.
	 * @constructor
	 **/
	function Event(type, bubbles, cancelable) {
		
	
	// public properties:
		/**
		 * The type of event.
		 * @property type
		 * @type String
		 **/
		this.type = type;
	
		/**
		 * The object that generated an event.
		 * @property target
		 * @type Object
		 * @default null
		 * @readonly
		*/
		this.target = null;
	
		/**
		 * The current target that a bubbling event is being dispatched from. For non-bubbling events, this will
		 * always be the same as target. For example, if childObj.parent = parentObj, and a bubbling event
		 * is generated from childObj, then a listener on parentObj would receive the event with
		 * target=childObj (the original target) and currentTarget=parentObj (where the listener was added).
		 * @property currentTarget
		 * @type Object
		 * @default null
		 * @readonly
		*/
		this.currentTarget = null;
	
		/**
		 * For bubbling events, this indicates the current event phase:<OL>
		 * 	<LI> capture phase: starting from the top parent to the target</LI>
		 * 	<LI> at target phase: currently being dispatched from the target</LI>
		 * 	<LI> bubbling phase: from the target to the top parent</LI>
		 * </OL>
		 * @property eventPhase
		 * @type Number
		 * @default 0
		 * @readonly
		*/
		this.eventPhase = 0;
	
		/**
		 * Indicates whether the event will bubble through the display list.
		 * @property bubbles
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.bubbles = !!bubbles;
	
		/**
		 * Indicates whether the default behaviour of this event can be cancelled via
		 * {{#crossLink "Event/preventDefault"}}{{/crossLink}}. This is set via the Event constructor.
		 * @property cancelable
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.cancelable = !!cancelable;
	
		/**
		 * The epoch time at which this event was created.
		 * @property timeStamp
		 * @type Number
		 * @default 0
		 * @readonly
		*/
		this.timeStamp = (new Date()).getTime();
	
		/**
		 * Indicates if {{#crossLink "Event/preventDefault"}}{{/crossLink}} has been called
		 * on this event.
		 * @property defaultPrevented
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.defaultPrevented = false;
	
		/**
		 * Indicates if {{#crossLink "Event/stopPropagation"}}{{/crossLink}} or
		 * {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called on this event.
		 * @property propagationStopped
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.propagationStopped = false;
	
		/**
		 * Indicates if {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called
		 * on this event.
		 * @property immediatePropagationStopped
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.immediatePropagationStopped = false;
		
		/**
		 * Indicates if {{#crossLink "Event/remove"}}{{/crossLink}} has been called on this event.
		 * @property removed
		 * @type Boolean
		 * @default false
		 * @readonly
		*/
		this.removed = false;
	}
	var p = Event.prototype;

// public methods:
	/**
	 * Sets {{#crossLink "Event/defaultPrevented"}}{{/crossLink}} to true if the event is cancelable.
	 * Mirrors the DOM level 2 event standard. In general, cancelable events that have `preventDefault()` called will
	 * cancel the default behaviour associated with the event.
	 * @method preventDefault
	 **/
	p.preventDefault = function() {
		this.defaultPrevented = this.cancelable&&true;
	};

	/**
	 * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} to true.
	 * Mirrors the DOM event standard.
	 * @method stopPropagation
	 **/
	p.stopPropagation = function() {
		this.propagationStopped = true;
	};

	/**
	 * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} and
	 * {{#crossLink "Event/immediatePropagationStopped"}}{{/crossLink}} to true.
	 * Mirrors the DOM event standard.
	 * @method stopImmediatePropagation
	 **/
	p.stopImmediatePropagation = function() {
		this.immediatePropagationStopped = this.propagationStopped = true;
	};
	
	/**
	 * Causes the active listener to be removed via removeEventListener();
	 * 
	 * 		myBtn.addEventListener("click", function(evt) {
	 * 			// do stuff...
	 * 			evt.remove(); // removes this listener.
	 * 		});
	 * 
	 * @method remove
	 **/
	p.remove = function() {
		this.removed = true;
	};
	
	/**
	 * Returns a clone of the Event instance.
	 * @method clone
	 * @return {Event} a clone of the Event instance.
	 **/
	p.clone = function() {
		return new Event(this.type, this.bubbles, this.cancelable);
	};
	
	/**
	 * Provides a chainable shortcut method for setting a number of properties on the instance.
	 *
	 * @method set
	 * @param {Object} props A generic object containing properties to copy to the instance.
	 * @return {Event} Returns the instance the method is called on (useful for chaining calls.)
	 * @chainable
	*/
	p.set = function(props) {
		for (var n in props) { this[n] = props[n]; }
		return this;
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[Event (type="+this.type+")]";
	};

	createjs.Event = Event;
}());

//##############################################################################
// EventDispatcher.js
//##############################################################################

this.createjs = this.createjs||{};

(function() {
	"use strict";


// constructor:
	/**
	 * EventDispatcher provides methods for managing queues of event listeners and dispatching events.
	 *
	 * You can either extend EventDispatcher or mix its methods into an existing prototype or instance by using the
	 * EventDispatcher {{#crossLink "EventDispatcher/initialize"}}{{/crossLink}} method.
	 * 
	 * Together with the CreateJS Event class, EventDispatcher provides an extended event model that is based on the
	 * DOM Level 2 event model, including addEventListener, removeEventListener, and dispatchEvent. It supports
	 * bubbling / capture, preventDefault, stopPropagation, stopImmediatePropagation, and handleEvent.
	 * 
	 * EventDispatcher also exposes a {{#crossLink "EventDispatcher/on"}}{{/crossLink}} method, which makes it easier
	 * to create scoped listeners, listeners that only run once, and listeners with associated arbitrary data. The 
	 * {{#crossLink "EventDispatcher/off"}}{{/crossLink}} method is merely an alias to
	 * {{#crossLink "EventDispatcher/removeEventListener"}}{{/crossLink}}.
	 * 
	 * Another addition to the DOM Level 2 model is the {{#crossLink "EventDispatcher/removeAllEventListeners"}}{{/crossLink}}
	 * method, which can be used to listeners for all events, or listeners for a specific event. The Event object also 
	 * includes a {{#crossLink "Event/remove"}}{{/crossLink}} method which removes the active listener.
	 *
	 * <h4>Example</h4>
	 * Add EventDispatcher capabilities to the "MyClass" class.
	 *
	 *      EventDispatcher.initialize(MyClass.prototype);
	 *
	 * Add an event (see {{#crossLink "EventDispatcher/addEventListener"}}{{/crossLink}}).
	 *
	 *      instance.addEventListener("eventName", handlerMethod);
	 *      function handlerMethod(event) {
	 *          console.log(event.target + " Was Clicked");
	 *      }
	 *
	 * <b>Maintaining proper scope</b><br />
	 * Scope (ie. "this") can be be a challenge with events. Using the {{#crossLink "EventDispatcher/on"}}{{/crossLink}}
	 * method to subscribe to events simplifies this.
	 *
	 *      instance.addEventListener("click", function(event) {
	 *          console.log(instance == this); // false, scope is ambiguous.
	 *      });
	 *      
	 *      instance.on("click", function(event) {
	 *          console.log(instance == this); // true, "on" uses dispatcher scope by default.
	 *      });
	 * 
	 * If you want to use addEventListener instead, you may want to use function.bind() or a similar proxy to manage
	 * scope.
	 *
	 * <b>Browser support</b>
	 * The event model in CreateJS can be used separately from the suite in any project, however the inheritance model
	 * requires modern browsers (IE9+).
	 *      
	 *
	 * @class EventDispatcher
	 * @constructor
	 **/
	function EventDispatcher() {
	
	
	// private properties:
		/**
		 * @protected
		 * @property _listeners
		 * @type Object
		 **/
		this._listeners = null;
		
		/**
		 * @protected
		 * @property _captureListeners
		 * @type Object
		 **/
		this._captureListeners = null;
	}
	var p = EventDispatcher.prototype;

// static public methods:
	/**
	 * Static initializer to mix EventDispatcher methods into a target object or prototype.
	 * 
	 * 		EventDispatcher.initialize(MyClass.prototype); // add to the prototype of the class
	 * 		EventDispatcher.initialize(myObject); // add to a specific instance
	 * 
	 * @method initialize
	 * @static
	 * @param {Object} target The target object to inject EventDispatcher methods into. This can be an instance or a
	 * prototype.
	 **/
	EventDispatcher.initialize = function(target) {
		target.addEventListener = p.addEventListener;
		target.on = p.on;
		target.removeEventListener = target.off =  p.removeEventListener;
		target.removeAllEventListeners = p.removeAllEventListeners;
		target.hasEventListener = p.hasEventListener;
		target.dispatchEvent = p.dispatchEvent;
		target._dispatchEvent = p._dispatchEvent;
		target.willTrigger = p.willTrigger;
	};
	

// public methods:
	/**
	 * Adds the specified event listener. Note that adding multiple listeners to the same function will result in
	 * multiple callbacks getting fired.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.addEventListener("click", handleClick);
	 *      function handleClick(event) {
	 *         // Click happened.
	 *      }
	 *
	 * @method addEventListener
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
	 * the event is dispatched.
	 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 * @return {Function | Object} Returns the listener for chaining or assignment.
	 **/
	p.addEventListener = function(type, listener, useCapture) {
		var listeners;
		if (useCapture) {
			listeners = this._captureListeners = this._captureListeners||{};
		} else {
			listeners = this._listeners = this._listeners||{};
		}
		var arr = listeners[type];
		if (arr) { this.removeEventListener(type, listener, useCapture); }
		arr = listeners[type]; // remove may have deleted the array
		if (!arr) { listeners[type] = [listener];  }
		else { arr.push(listener); }
		return listener;
	};
	
	/**
	 * A shortcut method for using addEventListener that makes it easier to specify an execution scope, have a listener
	 * only run once, associate arbitrary data with the listener, and remove the listener.
	 * 
	 * This method works by creating an anonymous wrapper function and subscribing it with addEventListener.
	 * The wrapper function is returned for use with `removeEventListener` (or `off`).
	 * 
	 * <b>IMPORTANT:</b> To remove a listener added with `on`, you must pass in the returned wrapper function as the listener, or use
	 * {{#crossLink "Event/remove"}}{{/crossLink}}. Likewise, each time you call `on` a NEW wrapper function is subscribed, so multiple calls
	 * to `on` with the same params will create multiple listeners.
	 * 
	 * <h4>Example</h4>
	 * 
	 * 		var listener = myBtn.on("click", handleClick, null, false, {count:3});
	 * 		function handleClick(evt, data) {
	 * 			data.count -= 1;
	 * 			console.log(this == myBtn); // true - scope defaults to the dispatcher
	 * 			if (data.count == 0) {
	 * 				alert("clicked 3 times!");
	 * 				myBtn.off("click", listener);
	 * 				// alternately: evt.remove();
	 * 			}
	 * 		}
	 * 
	 * @method on
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener An object with a handleEvent method, or a function that will be called when
	 * the event is dispatched.
	 * @param {Object} [scope] The scope to execute the listener in. Defaults to the dispatcher/currentTarget for function listeners, and to the listener itself for object listeners (ie. using handleEvent).
	 * @param {Boolean} [once=false] If true, the listener will remove itself after the first time it is triggered.
	 * @param {*} [data] Arbitrary data that will be included as the second parameter when the listener is called.
	 * @param {Boolean} [useCapture=false] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 * @return {Function} Returns the anonymous function that was created and assigned as the listener. This is needed to remove the listener later using .removeEventListener.
	 **/
	p.on = function(type, listener, scope, once, data, useCapture) {
		if (listener.handleEvent) {
			scope = scope||listener;
			listener = listener.handleEvent;
		}
		scope = scope||this;
		return this.addEventListener(type, function(evt) {
				listener.call(scope, evt, data);
				once&&evt.remove();
			}, useCapture);
	};

	/**
	 * Removes the specified event listener.
	 *
	 * <b>Important Note:</b> that you must pass the exact function reference used when the event was added. If a proxy
	 * function, or function closure is used as the callback, the proxy/closure reference must be used - a new proxy or
	 * closure will not work.
	 *
	 * <h4>Example</h4>
	 *
	 *      displayObject.removeEventListener("click", handleClick);
	 *
	 * @method removeEventListener
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener The listener function or object.
	 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 **/
	p.removeEventListener = function(type, listener, useCapture) {
		var listeners = useCapture ? this._captureListeners : this._listeners;
		if (!listeners) { return; }
		var arr = listeners[type];
		if (!arr) { return; }
		for (var i=0,l=arr.length; i<l; i++) {
			if (arr[i] == listener) {
				if (l==1) { delete(listeners[type]); } // allows for faster checks.
				else { arr.splice(i,1); }
				break;
			}
		}
	};
	
	/**
	 * A shortcut to the removeEventListener method, with the same parameters and return value. This is a companion to the
	 * .on method.
	 * 
	 * <b>IMPORTANT:</b> To remove a listener added with `on`, you must pass in the returned wrapper function as the listener. See 
	 * {{#crossLink "EventDispatcher/on"}}{{/crossLink}} for an example.
	 *
	 * @method off
	 * @param {String} type The string type of the event.
	 * @param {Function | Object} listener The listener function or object.
	 * @param {Boolean} [useCapture] For events that bubble, indicates whether to listen for the event in the capture or bubbling/target phase.
	 **/
	p.off = p.removeEventListener;

	/**
	 * Removes all listeners for the specified type, or all listeners of all types.
	 *
	 * <h4>Example</h4>
	 *
	 *      // Remove all listeners
	 *      displayObject.removeAllEventListeners();
	 *
	 *      // Remove all click listeners
	 *      displayObject.removeAllEventListeners("click");
	 *
	 * @method removeAllEventListeners
	 * @param {String} [type] The string type of the event. If omitted, all listeners for all types will be removed.
	 **/
	p.removeAllEventListeners = function(type) {
		if (!type) { this._listeners = this._captureListeners = null; }
		else {
			if (this._listeners) { delete(this._listeners[type]); }
			if (this._captureListeners) { delete(this._captureListeners[type]); }
		}
	};

	/**
	 * Dispatches the specified event to all listeners.
	 *
	 * <h4>Example</h4>
	 *
	 *      // Use a string event
	 *      this.dispatchEvent("complete");
	 *
	 *      // Use an Event instance
	 *      var event = new createjs.Event("progress");
	 *      this.dispatchEvent(event);
	 *
	 * @method dispatchEvent
	 * @param {Object | String | Event} eventObj An object with a "type" property, or a string type.
	 * While a generic object will work, it is recommended to use a CreateJS Event instance. If a string is used,
	 * dispatchEvent will construct an Event instance if necessary with the specified type. This latter approach can
	 * be used to avoid event object instantiation for non-bubbling events that may not have any listeners.
	 * @param {Boolean} [bubbles] Specifies the `bubbles` value when a string was passed to eventObj.
	 * @param {Boolean} [cancelable] Specifies the `cancelable` value when a string was passed to eventObj.
	 * @return {Boolean} Returns false if `preventDefault()` was called on a cancelable event, true otherwise.
	 **/
	p.dispatchEvent = function(eventObj, bubbles, cancelable) {
		if (typeof eventObj == "string") {
			// skip everything if there's no listeners and it doesn't bubble:
			var listeners = this._listeners;
			if (!bubbles && (!listeners || !listeners[eventObj])) { return true; }
			eventObj = new createjs.Event(eventObj, bubbles, cancelable);
		} else if (eventObj.target && eventObj.clone) {
			// redispatching an active event object, so clone it:
			eventObj = eventObj.clone();
		}
		
		// TODO: it would be nice to eliminate this. Maybe in favour of evtObj instanceof Event? Or !!evtObj.createEvent
		try { eventObj.target = this; } catch (e) {} // try/catch allows redispatching of native events

		if (!eventObj.bubbles || !this.parent) {
			this._dispatchEvent(eventObj, 2);
		} else {
			var top=this, list=[top];
			while (top.parent) { list.push(top = top.parent); }
			var i, l=list.length;

			// capture & atTarget
			for (i=l-1; i>=0 && !eventObj.propagationStopped; i--) {
				list[i]._dispatchEvent(eventObj, 1+(i==0));
			}
			// bubbling
			for (i=1; i<l && !eventObj.propagationStopped; i++) {
				list[i]._dispatchEvent(eventObj, 3);
			}
		}
		return !eventObj.defaultPrevented;
	};

	/**
	 * Indicates whether there is at least one listener for the specified event type.
	 * @method hasEventListener
	 * @param {String} type The string type of the event.
	 * @return {Boolean} Returns true if there is at least one listener for the specified event.
	 **/
	p.hasEventListener = function(type) {
		var listeners = this._listeners, captureListeners = this._captureListeners;
		return !!((listeners && listeners[type]) || (captureListeners && captureListeners[type]));
	};
	
	/**
	 * Indicates whether there is at least one listener for the specified event type on this object or any of its
	 * ancestors (parent, parent's parent, etc). A return value of true indicates that if a bubbling event of the
	 * specified type is dispatched from this object, it will trigger at least one listener.
	 * 
	 * This is similar to {{#crossLink "EventDispatcher/hasEventListener"}}{{/crossLink}}, but it searches the entire
	 * event flow for a listener, not just this object.
	 * @method willTrigger
	 * @param {String} type The string type of the event.
	 * @return {Boolean} Returns `true` if there is at least one listener for the specified event.
	 **/
	p.willTrigger = function(type) {
		var o = this;
		while (o) {
			if (o.hasEventListener(type)) { return true; }
			o = o.parent;
		}
		return false;
	};

	/**
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	p.toString = function() {
		return "[EventDispatcher]";
	};


// private methods:
	/**
	 * @method _dispatchEvent
	 * @param {Object | Event} eventObj
	 * @param {Object} eventPhase
	 * @protected
	 **/
	p._dispatchEvent = function(eventObj, eventPhase) {
		var l, arr, listeners = (eventPhase <= 2) ? this._captureListeners : this._listeners;
		if (eventObj && listeners && (arr = listeners[eventObj.type]) && (l=arr.length)) {
			try { eventObj.currentTarget = this; } catch (e) {}
			try { eventObj.eventPhase = eventPhase|0; } catch (e) {}
			eventObj.removed = false;
			
			arr = arr.slice(); // to avoid issues with items being removed or added during the dispatch
			for (var i=0; i<l && !eventObj.immediatePropagationStopped; i++) {
				var o = arr[i];
				if (o.handleEvent) { o.handleEvent(eventObj); }
				else { o(eventObj); }
				if (eventObj.removed) {
					this.off(eventObj.type, o, eventPhase==1);
					eventObj.removed = false;
				}
			}
		}
		if (eventPhase === 2) { this._dispatchEvent(eventObj, 2.1); }
	};


	createjs.EventDispatcher = EventDispatcher;
}());

//##############################################################################
// Ticker.js
//##############################################################################

this.createjs = this.createjs||{};

(function() {
	"use strict";


// constructor:
	/**
	 * The Ticker provides a centralized tick or heartbeat broadcast at a set interval. Listeners can subscribe to the tick
	 * event to be notified when a set time interval has elapsed.
	 *
	 * Note that the interval that the tick event is called is a target interval, and may be broadcast at a slower interval
	 * when under high CPU load. The Ticker class uses a static interface (ex. `Ticker.framerate = 30;`) and
	 * can not be instantiated.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      function handleTick(event) {
	 *          // Actions carried out each tick (aka frame)
	 *          if (!event.paused) {
	 *              // Actions carried out when the Ticker is not paused.
	 *          }
	 *      }
	 *
	 * @class Ticker
	 * @uses EventDispatcher
	 * @static
	 **/
	function Ticker() {
		throw "Ticker cannot be instantiated.";
	}


// constants:
	/**
	 * In this mode, Ticker uses the requestAnimationFrame API, but attempts to synch the ticks to target framerate. It
	 * uses a simple heuristic that compares the time of the RAF return to the target time for the current frame and
	 * dispatches the tick when the time is within a certain threshold.
	 *
	 * This mode has a higher variance for time between frames than {{#crossLink "Ticker/TIMEOUT:property"}}{{/crossLink}},
	 * but does not require that content be time based as with {{#crossLink "Ticker/RAF:property"}}{{/crossLink}} while
	 * gaining the benefits of that API (screen synch, background throttling).
	 *
	 * Variance is usually lowest for framerates that are a divisor of the RAF frequency. This is usually 60, so
	 * framerates of 10, 12, 15, 20, and 30 work well.
	 *
	 * Falls back to {{#crossLink "Ticker/TIMEOUT:property"}}{{/crossLink}} if the requestAnimationFrame API is not
	 * supported.
	 * @property RAF_SYNCHED
	 * @static
	 * @type {String}
	 * @default "synched"
	 * @readonly
	 **/
	Ticker.RAF_SYNCHED = "synched";

	/**
	 * In this mode, Ticker passes through the requestAnimationFrame heartbeat, ignoring the target framerate completely.
	 * Because requestAnimationFrame frequency is not deterministic, any content using this mode should be time based.
	 * You can leverage {{#crossLink "Ticker/getTime"}}{{/crossLink}} and the {{#crossLink "Ticker/tick:event"}}{{/crossLink}}
	 * event object's "delta" properties to make this easier.
	 *
	 * Falls back on {{#crossLink "Ticker/TIMEOUT:property"}}{{/crossLink}} if the requestAnimationFrame API is not
	 * supported.
	 * @property RAF
	 * @static
	 * @type {String}
	 * @default "raf"
	 * @readonly
	 **/
	Ticker.RAF = "raf";

	/**
	 * In this mode, Ticker uses the setTimeout API. This provides predictable, adaptive frame timing, but does not
	 * provide the benefits of requestAnimationFrame (screen synch, background throttling).
	 * @property TIMEOUT
	 * @static
	 * @type {String}
	 * @default "timeout"
	 * @readonly
	 **/
	Ticker.TIMEOUT = "timeout";


// static events:
	/**
	 * Dispatched each tick. The event will be dispatched to each listener even when the Ticker has been paused using
	 * {{#crossLink "Ticker/paused:property"}}{{/crossLink}}.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      function handleTick(event) {
	 *          console.log("Paused:", event.paused, event.delta);
	 *      }
	 *
	 * @event tick
	 * @param {Object} target The object that dispatched the event.
	 * @param {String} type The event type.
	 * @param {Boolean} paused Indicates whether the ticker is currently paused.
	 * @param {Number} delta The time elapsed in ms since the last tick.
	 * @param {Number} time The total time in ms since Ticker was initialized.
	 * @param {Number} runTime The total time in ms that Ticker was not paused since it was initialized. For example,
	 * 	you could determine the amount of time that the Ticker has been paused since initialization with `time-runTime`.
	 * @since 0.6.0
	 */


// public static properties:
	/**
	 * Specifies the timing api (setTimeout or requestAnimationFrame) and mode to use. See
	 * {{#crossLink "Ticker/TIMEOUT:property"}}{{/crossLink}}, {{#crossLink "Ticker/RAF:property"}}{{/crossLink}}, and
	 * {{#crossLink "Ticker/RAF_SYNCHED:property"}}{{/crossLink}} for mode details.
	 * @property timingMode
	 * @static
	 * @type {String}
	 * @default Ticker.TIMEOUT
	 **/
	Ticker.timingMode = null;

	/**
	 * Specifies a maximum value for the delta property in the tick event object. This is useful when building time
	 * based animations and systems to prevent issues caused by large time gaps caused by background tabs, system sleep,
	 * alert dialogs, or other blocking routines. Double the expected frame duration is often an effective value
	 * (ex. maxDelta=50 when running at 40fps).
	 * 
	 * This does not impact any other values (ex. time, runTime, etc), so you may experience issues if you enable maxDelta
	 * when using both delta and other values.
	 * 
	 * If 0, there is no maximum.
	 * @property maxDelta
	 * @static
	 * @type {number}
	 * @default 0
	 */
	Ticker.maxDelta = 0;
	
	/**
	 * When the ticker is paused, all listeners will still receive a tick event, but the <code>paused</code> property
	 * of the event will be `true`. Also, while paused the `runTime` will not increase. See {{#crossLink "Ticker/tick:event"}}{{/crossLink}},
	 * {{#crossLink "Ticker/getTime"}}{{/crossLink}}, and {{#crossLink "Ticker/getEventTime"}}{{/crossLink}} for more
	 * info.
	 *
	 * <h4>Example</h4>
	 *
	 *      createjs.Ticker.addEventListener("tick", handleTick);
	 *      createjs.Ticker.paused = true;
	 *      function handleTick(event) {
	 *          console.log(event.paused,
	 *          	createjs.Ticker.getTime(false),
	 *          	createjs.Ticker.getTime(true));
	 *      }
	 *
	 * @property paused
	 * @static
	 * @type {Boolean}
	 * @default false
	 **/
	Ticker.paused = false;


// mix-ins:
	// EventDispatcher methods:
	Ticker.removeEventListener = null;
	Ticker.removeAllEventListeners = null;
	Ticker.dispatchEvent = null;
	Ticker.hasEventListener = null;
	Ticker._listeners = null;
	createjs.EventDispatcher.initialize(Ticker); // inject EventDispatcher methods.
	Ticker._addEventListener = Ticker.addEventListener;
	Ticker.addEventListener = function() {
		!Ticker._inited&&Ticker.init();
		return Ticker._addEventListener.apply(Ticker, arguments);
	};


// private static properties:
	/**
	 * @property _inited
	 * @static
	 * @type {Boolean}
	 * @private
	 **/
	Ticker._inited = false;

	/**
	 * @property _startTime
	 * @static
	 * @type {Number}
	 * @private
	 **/
	Ticker._startTime = 0;

	/**
	 * @property _pausedTime
	 * @static
	 * @type {Number}
	 * @private
	 **/
	Ticker._pausedTime=0;

	/**
	 * The number of ticks that have passed
	 * @property _ticks
	 * @static
	 * @type {Number}
	 * @private
	 **/
	Ticker._ticks = 0;

	/**
	 * The number of ticks that have passed while Ticker has been paused
	 * @property _pausedTicks
	 * @static
	 * @type {Number}
	 * @private
	 **/
	Ticker._pausedTicks = 0;

	/**
	 * @property _interval
	 * @static
	 * @type {Number}
	 * @private
	 **/
	Ticker._interval = 50;

	/**
	 * @property _lastTime
	 * @static
	 * @type {Number}
	 * @private
	 **/
	Ticker._lastTime = 0;

	/**
	 * @property _times
	 * @static
	 * @type {Array}
	 * @private
	 **/
	Ticker._times = null;

	/**
	 * @property _tickTimes
	 * @static
	 * @type {Array}
	 * @private
	 **/
	Ticker._tickTimes = null;

	/**
	 * Stores the timeout or requestAnimationFrame id.
	 * @property _timerId
	 * @static
	 * @type {Number}
	 * @private
	 **/
	Ticker._timerId = null;
	
	/**
	 * True if currently using requestAnimationFrame, false if using setTimeout. This may be different than timingMode
	 * if that property changed and a tick hasn't fired.
	 * @property _raf
	 * @static
	 * @type {Boolean}
	 * @private
	 **/
	Ticker._raf = true;
	

// static getter / setters:
	/**
	 * Use the {{#crossLink "Ticker/interval:property"}}{{/crossLink}} property instead.
	 * @method _setInterval
	 * @private
	 * @static
	 * @param {Number} interval
	 **/
	Ticker._setInterval = function(interval) {
		Ticker._interval = interval;
		if (!Ticker._inited) { return; }
		Ticker._setupTick();
	};
	// Ticker.setInterval is @deprecated. Remove for 1.1+
	Ticker.setInterval = createjs.deprecate(Ticker._setInterval, "Ticker.setInterval");

	/**
	 * Use the {{#crossLink "Ticker/interval:property"}}{{/crossLink}} property instead.
	 * @method _getInterval
	 * @private
	 * @static
	 * @return {Number}
	 **/
	Ticker._getInterval = function() {
		return Ticker._interval;
	};
	// Ticker.getInterval is @deprecated. Remove for 1.1+
	Ticker.getInterval = createjs.deprecate(Ticker._getInterval, "Ticker.getInterval");

	/**
	 * Use the {{#crossLink "Ticker/framerate:property"}}{{/crossLink}} property instead.
	 * @method _setFPS
	 * @private
	 * @static
	 * @param {Number} value
	 **/
	Ticker._setFPS = function(value) {
		Ticker._setInterval(1000/value);
	};
	// Ticker.setFPS is @deprecated. Remove for 1.1+
	Ticker.setFPS = createjs.deprecate(Ticker._setFPS, "Ticker.setFPS");

	/**
	 * Use the {{#crossLink "Ticker/framerate:property"}}{{/crossLink}} property instead.
	 * @method _getFPS
	 * @static
	 * @private
	 * @return {Number}
	 **/
	Ticker._getFPS = function() {
		return 1000/Ticker._interval;
	};
	// Ticker.getFPS is @deprecated. Remove for 1.1+
	Ticker.getFPS = createjs.deprecate(Ticker._getFPS, "Ticker.getFPS");

	/**
	 * Indicates the target time (in milliseconds) between ticks. Default is 50 (20 FPS).
	 * Note that actual time between ticks may be more than specified depending on CPU load.
	 * This property is ignored if the ticker is using the `RAF` timing mode.
	 * @property interval
	 * @static
	 * @type {Number}
	 **/
	 
	/**
	 * Indicates the target frame rate in frames per second (FPS). Effectively just a shortcut to `interval`, where
	 * `framerate == 1000/interval`.
	 * @property framerate
	 * @static
	 * @type {Number}
	 **/
	try {
		Object.defineProperties(Ticker, {
			interval: { get: Ticker._getInterval, set: Ticker._setInterval },
			framerate: { get: Ticker._getFPS, set: Ticker._setFPS }
		});
	} catch (e) { console.log(e); }


// public static methods:
	/**
	 * Starts the tick. This is called automatically when the first listener is added.
	 * @method init
	 * @static
	 **/
	Ticker.init = function() {
		if (Ticker._inited) { return; }
		Ticker._inited = true;
		Ticker._times = [];
		Ticker._tickTimes = [];
		Ticker._startTime = Ticker._getTime();
		Ticker._times.push(Ticker._lastTime = 0);
		Ticker.interval = Ticker._interval;
	};
	
	/**
	 * Stops the Ticker and removes all listeners. Use init() to restart the Ticker.
	 * @method reset
	 * @static
	 **/
	Ticker.reset = function() {
		if (Ticker._raf) {
			var f = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
			f&&f(Ticker._timerId);
		} else {
			clearTimeout(Ticker._timerId);
		}
		Ticker.removeAllEventListeners("tick");
		Ticker._timerId = Ticker._times = Ticker._tickTimes = null;
		Ticker._startTime = Ticker._lastTime = Ticker._ticks = Ticker._pausedTime = 0;
		Ticker._inited = false;
	};

	/**
	 * Returns the average time spent within a tick. This can vary significantly from the value provided by getMeasuredFPS
	 * because it only measures the time spent within the tick execution stack. 
	 * 
	 * Example 1: With a target FPS of 20, getMeasuredFPS() returns 20fps, which indicates an average of 50ms between 
	 * the end of one tick and the end of the next. However, getMeasuredTickTime() returns 15ms. This indicates that 
	 * there may be up to 35ms of "idle" time between the end of one tick and the start of the next.
	 *
	 * Example 2: With a target FPS of 30, {{#crossLink "Ticker/framerate:property"}}{{/crossLink}} returns 10fps, which
	 * indicates an average of 100ms between the end of one tick and the end of the next. However, {{#crossLink "Ticker/getMeasuredTickTime"}}{{/crossLink}}
	 * returns 20ms. This would indicate that something other than the tick is using ~80ms (another script, DOM
	 * rendering, etc).
	 * @method getMeasuredTickTime
	 * @static
	 * @param {Number} [ticks] The number of previous ticks over which to measure the average time spent in a tick.
	 * Defaults to the number of ticks per second. To get only the last tick's time, pass in 1.
	 * @return {Number} The average time spent in a tick in milliseconds.
	 **/
	Ticker.getMeasuredTickTime = function(ticks) {
		var ttl=0, times=Ticker._tickTimes;
		if (!times || times.length < 1) { return -1; }

		// by default, calculate average for the past ~1 second:
		ticks = Math.min(times.length, ticks||(Ticker._getFPS()|0));
		for (var i=0; i<ticks; i++) { ttl += times[i]; }
		return ttl/ticks;
	};

	/**
	 * Returns the actual frames / ticks per second.
	 * @method getMeasuredFPS
	 * @static
	 * @param {Number} [ticks] The number of previous ticks over which to measure the actual frames / ticks per second.
	 * Defaults to the number of ticks per second.
	 * @return {Number} The actual frames / ticks per second. Depending on performance, this may differ
	 * from the target frames per second.
	 **/
	Ticker.getMeasuredFPS = function(ticks) {
		var times = Ticker._times;
		if (!times || times.length < 2) { return -1; }

		// by default, calculate fps for the past ~1 second:
		ticks = Math.min(times.length-1, ticks||(Ticker._getFPS()|0));
		return 1000/((times[0]-times[ticks])/ticks);
	};

	/**
	 * Returns the number of milliseconds that have elapsed since Ticker was initialized via {{#crossLink "Ticker/init"}}.
	 * Returns -1 if Ticker has not been initialized. For example, you could use
	 * this in a time synchronized animation to determine the exact amount of time that has elapsed.
	 * @method getTime
	 * @static
	 * @param {Boolean} [runTime=false] If true only time elapsed while Ticker was not paused will be returned.
	 * If false, the value returned will be total time elapsed since the first tick event listener was added.
	 * @return {Number} Number of milliseconds that have elapsed since Ticker was initialized or -1.
	 **/
	Ticker.getTime = function(runTime) {
		return Ticker._startTime ? Ticker._getTime() - (runTime ? Ticker._pausedTime : 0) : -1;
	};

	/**
	 * Similar to the {{#crossLink "Ticker/getTime"}}{{/crossLink}} method, but returns the time on the most recent {{#crossLink "Ticker/tick:event"}}{{/crossLink}}
	 * event object.
	 * @method getEventTime
	 * @static
	 * @param runTime {Boolean} [runTime=false] If true, the runTime property will be returned instead of time.
	 * @returns {number} The time or runTime property from the most recent tick event or -1.
	 */
	Ticker.getEventTime = function(runTime) {
		return Ticker._startTime ? (Ticker._lastTime || Ticker._startTime) - (runTime ? Ticker._pausedTime : 0) : -1;
	};
	
	/**
	 * Returns the number of ticks that have been broadcast by Ticker.
	 * @method getTicks
	 * @static
	 * @param {Boolean} pauseable Indicates whether to include ticks that would have been broadcast
	 * while Ticker was paused. If true only tick events broadcast while Ticker is not paused will be returned.
	 * If false, tick events that would have been broadcast while Ticker was paused will be included in the return
	 * value. The default value is false.
	 * @return {Number} of ticks that have been broadcast.
	 **/
	Ticker.getTicks = function(pauseable) {
		return  Ticker._ticks - (pauseable ? Ticker._pausedTicks : 0);
	};


// private static methods:
	/**
	 * @method _handleSynch
	 * @static
	 * @private
	 **/
	Ticker._handleSynch = function() {
		Ticker._timerId = null;
		Ticker._setupTick();

		// run if enough time has elapsed, with a little bit of flexibility to be early:
		if (Ticker._getTime() - Ticker._lastTime >= (Ticker._interval-1)*0.97) {
			Ticker._tick();
		}
	};

	/**
	 * @method _handleRAF
	 * @static
	 * @private
	 **/
	Ticker._handleRAF = function() {
		Ticker._timerId = null;
		Ticker._setupTick();
		Ticker._tick();
	};

	/**
	 * @method _handleTimeout
	 * @static
	 * @private
	 **/
	Ticker._handleTimeout = function() {
		Ticker._timerId = null;
		Ticker._setupTick();
		Ticker._tick();
	};

	/**
	 * @method _setupTick
	 * @static
	 * @private
	 **/
	Ticker._setupTick = function() {
		if (Ticker._timerId != null) { return; } // avoid duplicates

		var mode = Ticker.timingMode;
		if (mode == Ticker.RAF_SYNCHED || mode == Ticker.RAF) {
			var f = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
			if (f) {
				Ticker._timerId = f(mode == Ticker.RAF ? Ticker._handleRAF : Ticker._handleSynch);
				Ticker._raf = true;
				return;
			}
		}
		Ticker._raf = false;
		Ticker._timerId = setTimeout(Ticker._handleTimeout, Ticker._interval);
	};

	/**
	 * @method _tick
	 * @static
	 * @private
	 **/
	Ticker._tick = function() {
		var paused = Ticker.paused;
		var time = Ticker._getTime();
		var elapsedTime = time-Ticker._lastTime;
		Ticker._lastTime = time;
		Ticker._ticks++;
		
		if (paused) {
			Ticker._pausedTicks++;
			Ticker._pausedTime += elapsedTime;
		}
		
		if (Ticker.hasEventListener("tick")) {
			var event = new createjs.Event("tick");
			var maxDelta = Ticker.maxDelta;
			event.delta = (maxDelta && elapsedTime > maxDelta) ? maxDelta : elapsedTime;
			event.paused = paused;
			event.time = time;
			event.runTime = time-Ticker._pausedTime;
			Ticker.dispatchEvent(event);
		}
		
		Ticker._tickTimes.unshift(Ticker._getTime()-time);
		while (Ticker._tickTimes.length > 100) { Ticker._tickTimes.pop(); }

		Ticker._times.unshift(time);
		while (Ticker._times.length > 100) { Ticker._times.pop(); }
	};

	/**
	 * @method _getTime
	 * @static
	 * @private
	 **/
	var w=window, now=w.performance.now || w.performance.mozNow || w.performance.msNow || w.performance.oNow || w.performance.webkitNow;
	Ticker._getTime = function() {
		return ((now&&now.call(w.performance))||(new Date().getTime())) - Ticker._startTime;
	};


	createjs.Ticker = Ticker;
}());

//##############################################################################
// AbstractTween.js
//##############################################################################

this.createjs = this.createjs||{};

(function() {
	"use strict";


// constructor
	/**
	 * Base class that both {{#crossLink "Tween"}}{{/crossLink}} and {{#crossLink "Timeline"}}{{/crossLink}} extend. Should not be instantiated directly.
	 * @class AbstractTween
	 * @param {Object} [props] The configuration properties to apply to this instance (ex. `{loop:-1, paused:true}`).
	 * Supported props are listed below. These props are set on the corresponding instance properties except where
	 * specified.
	 * @param {boolean} [props.useTicks=false]  See the {{#crossLink "AbstractTween/useTicks:property"}}{{/crossLink}} property for more information.
	 * @param {boolean} [props.ignoreGlobalPause=false] See the {{#crossLink "AbstractTween/ignoreGlobalPause:property"}}{{/crossLink}} for more information.
	 * @param {number|boolean} [props.loop=0] See the {{#crossLink "AbstractTween/loop:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.reversed=false] See the {{#crossLink "AbstractTween/reversed:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.bounce=false] See the {{#crossLink "AbstractTween/bounce:property"}}{{/crossLink}} for more information.
	 * @param {number} [props.timeScale=1] See the {{#crossLink "AbstractTween/timeScale:property"}}{{/crossLink}} for more information.
	 * @param {Function} [props.onChange] Adds the specified function as a listener to the {{#crossLink "AbstractTween/change:event"}}{{/crossLink}} event
	 * @param {Function} [props.onComplete] Adds the specified function as a listener to the {{#crossLink "AbstractTween/complete:event"}}{{/crossLink}} event
	 * @extends EventDispatcher
	 * @constructor
	 */
	function AbstractTween(props) {
		this.EventDispatcher_constructor();
		
	// public properties:
		/**
		 * Causes this tween to continue playing when a global pause is active. For example, if TweenJS is using {{#crossLink "Ticker"}}{{/crossLink}},
		 * then setting this to false (the default) will cause this tween to be paused when `Ticker.paused` is set to
		 * `true`. See the {{#crossLink "Tween/tick"}}{{/crossLink}} method for more info. Can be set via the `props`
		 * parameter.
		 * @property ignoreGlobalPause
		 * @type Boolean
		 * @default false
		 */
		this.ignoreGlobalPause = false;
	
		/**
		 * Indicates the number of times to loop. If set to -1, the tween will loop continuously.
		 *
		 * Note that a tween must loop at _least_ once to see it play in both directions when `{{#crossLink "AbstractTween/bounce:property"}}{{/crossLink}}`
		 * is set to `true`.
		 * @property loop
		 * @type {Number}
		 * @default 0
		 */
		this.loop = 0;
	
		/**
		 * Uses ticks for all durations instead of milliseconds. This also changes the behaviour of some actions (such as `call`).
		 * Changing this value on a running tween could have unexpected results.
		 * @property useTicks
		 * @type {Boolean}
		 * @default false
		 * @readonly
		 */
		this.useTicks = false;
		
		/**
		 * Causes the tween to play in reverse.
		 * @property reversed
		 * @type {Boolean}
		 * @default false
		 */
		this.reversed = false;
		
		/**
		 * Causes the tween to reverse direction at the end of each loop. Each single-direction play-through of the
		 * tween counts as a single bounce. For example, to play a tween once forward, and once back, set the
		 * `{{#crossLink "AbstractTween/loop:property"}}{{/crossLink}}` to `1`.
		 * @property bounce
		 * @type {Boolean}
		 * @default false
		 */
		this.bounce = false;
		
		/**
		 * Changes the rate at which the tween advances. For example, a `timeScale` value of `2` will double the
		 * playback speed, a value of `0.5` would halve it.
		 * @property timeScale
		 * @type {Number}
		 * @default 1
		 */
		this.timeScale = 1;
	
		/**
		 * Indicates the duration of this tween in milliseconds (or ticks if `useTicks` is true), irrespective of `loops`.
		 * This value is automatically updated as you modify the tween. Changing it directly could result in unexpected
		 * behaviour.
		 * @property duration
		 * @type {Number}
		 * @default 0
		 * @readonly
		 */
		this.duration = 0;
	
		/**
		 * The current normalized position of the tween. This will always be a value between 0 and `duration`.
		 * Changing this property directly will have unexpected results, use {{#crossLink "Tween/setPosition"}}{{/crossLink}}.
		 * @property position
		 * @type {Object}
		 * @default 0
		 * @readonly
		 */
		this.position = 0;
		
		/**
		 * The raw tween position. This value will be between `0` and `loops * duration` while the tween is active, or -1 before it activates.
		 * @property rawPosition
		 * @type {Number}
		 * @default -1
		 * @readonly
		 */
		this.rawPosition = -1;
		
		
	// private properties:
		/**
		 * @property _paused
		 * @type {Boolean}
		 * @default false
		 * @protected
		 */
		this._paused = true;
		
		/**
		 * @property _next
		 * @type {Tween}
		 * @default null
		 * @protected
		 */
		this._next = null;
		
		/**
		 * @property _prev
		 * @type {Tween}
		 * @default null
		 * @protected
		 */
		this._prev = null;
		
		/**
		 * @property _parent
		 * @type {Object}
		 * @default null
		 * @protected
		 */
		this._parent = null;

		/**
		 * @property _labels
		 * @type Object
		 * @protected
		 **/
		this._labels = null;

		/**
		 * @property _labelList
		 * @type Array[Object]
		 * @protected
		 **/
		this._labelList = null;

		if (props) {
			this.useTicks = !!props.useTicks;
			this.ignoreGlobalPause = !!props.ignoreGlobalPause;
			this.loop = props.loop === true ? -1 : (props.loop||0);
			this.reversed = !!props.reversed;
			this.bounce = !!props.bounce;
			this.timeScale = props.timeScale||1;
			props.onChange && this.addEventListener("change", props.onChange);
			props.onComplete && this.addEventListener("complete", props.onComplete);
		}
		
		// while `position` is shared, it needs to happen after ALL props are set, so it's handled in _init()
	};

	var p = createjs.extend(AbstractTween, createjs.EventDispatcher);

// events:
	/**
	 * Dispatched whenever the tween's position changes. It occurs after all tweened properties are updated and actions
	 * are executed.
	 * @event change
	 **/
	 
	/**
	 * Dispatched when the tween reaches its end and has paused itself. This does not fire until all loops are complete;
	 * tweens that loop continuously will never fire a complete event.
	 * @event complete
	 **/
	
// getter / setters:
	
	/**
	 * Use the {{#crossLink "AbstractTween/paused:property"}}{{/crossLink}} property instead.
	 * @method _setPaused
	 * @param {Boolean} [value=true] Indicates whether the tween should be paused (`true`) or played (`false`).
	 * @return {AbstractTween} This tween instance (for chaining calls)
	 * @protected
	 * @chainable
	 */
	p._setPaused = function(value) {
		createjs.Tween._register(this, value);
		return this;
	};
	p.setPaused = createjs.deprecate(p._setPaused, "AbstractTween.setPaused");
	
	/**
	 * Use the {{#crossLink "AbstractTween/paused:property"}}{{/crossLink}} property instead.
	 * @method _getPaused
	 * @protected
	 */
	p._getPaused = function() {
		return this._paused;
	};
	p.getPaused = createjs.deprecate(p._getPaused, "AbstactTween.getPaused");
	
	/**
	 * Use the {{#crossLink "AbstractTween/currentLabel:property"}}{{/crossLink}} property instead.
	 * @method _getCurrentLabel
	 * @protected
	 * @return {String} The name of the current label or null if there is no label
	 **/
	p._getCurrentLabel = function(pos) {
		var labels = this.getLabels();
		if (pos == null) { pos = this.position; }
		for (var i = 0, l = labels.length; i<l; i++) { if (pos < labels[i].position) { break; } }
		return (i===0) ? null : labels[i-1].label;
	};
	p.getCurrentLabel = createjs.deprecate(p._getCurrentLabel, "AbstractTween.getCurrentLabel");
	
	/**
	 * Pauses or unpauses the tween. A paused tween is removed from the global registry and is eligible for garbage
	 * collection if no other references to it exist.
	 * @property paused
	 * @type Boolean
	 * @readonly
	 **/
	 
	/**
	 * Returns the name of the label on or immediately before the current position. For example, given a tween with
	 * two labels, "first" on frame index 4, and "second" on frame 8, `currentLabel` would return:
	 * <UL>
	 * 		<LI>null if the current position is 2.</LI>
	 * 		<LI>"first" if the current position is 4.</LI>
	 * 		<LI>"first" if the current position is 7.</LI>
	 * 		<LI>"second" if the current position is 15.</LI>
	 * </UL>
	 * @property currentLabel
	 * @type String
	 * @readonly
	 **/
	 
	try {
		Object.defineProperties(p, {
			paused: { set: p._setPaused, get: p._getPaused },
			currentLabel: { get: p._getCurrentLabel }
		});
	} catch (e) {}

// public methods:
	/**
	 * Advances the tween by a specified amount.
	 * @method advance
	 * @param {Number} delta The amount to advance in milliseconds (or ticks if useTicks is true). Negative values are supported.
	 * @param {Number} [ignoreActions=false] If true, actions will not be executed due to this change in position.
	 */
	p.advance = function(delta, ignoreActions) {
		this.setPosition(this.rawPosition+delta*this.timeScale, ignoreActions);
	};
	
	/**
	 * Advances the tween to a specified position.
	 * @method setPosition
	 * @param {Number} rawPosition The raw position to seek to in milliseconds (or ticks if useTicks is true).
	 * @param {Boolean} [ignoreActions=false] If true, do not run any actions that would be triggered by this operation.
	 * @param {Boolean} [jump=false] If true, only actions at the new position will be run. If false, actions between the old and new position are run.
	 * @param {Function} [callback] Primarily for use with MovieClip, this callback is called after properties are updated, but before actions are run.
	 */
	p.setPosition = function(rawPosition, ignoreActions, jump, callback) {
		var d=this.duration, loopCount=this.loop, prevRawPos = this.rawPosition;
		var loop=0, t=0, end=false;
		
		// normalize position:
		if (rawPosition < 0) { rawPosition = 0; }
		
		if (d === 0) {
			// deal with 0 length tweens.
			end = true;
			if (prevRawPos !== -1) { return end; } // we can avoid doing anything else if we're already at 0.
		} else {
			loop = rawPosition/d|0;
			t = rawPosition-loop*d;
			
			end = (loopCount !== -1 && rawPosition >= loopCount*d+d);
			if (end) { rawPosition = (t=d)*(loop=loopCount)+d; }
			if (rawPosition === prevRawPos) { return end; } // no need to update
			
			var rev = !this.reversed !== !(this.bounce && loop%2); // current loop is reversed
			if (rev) { t = d-t; }
		}
		
		// set this in advance in case an action modifies position:
		this.position = t;
		this.rawPosition = rawPosition;
		
		this._updatePosition(jump, end);
		if (end) { this.paused = true; }
		
		callback&&callback(this);
		
		if (!ignoreActions) { this._runActions(prevRawPos, rawPosition, jump, !jump && prevRawPos === -1); }
		
		this.dispatchEvent("change");
		if (end) { this.dispatchEvent("complete"); }
	};
	
	/**
	 * Calculates a normalized position based on a raw position. For example, given a tween with a duration of 3000ms set to loop:
	 * 	console.log(myTween.calculatePosition(3700); // 700
	 * @method calculatePosition
	 * @param {Number} rawPosition A raw position.
	 */
	p.calculatePosition = function(rawPosition) {
		// largely duplicated from setPosition, but necessary to avoid having to instantiate generic objects to pass values (end, loop, position) back.
		var d=this.duration, loopCount=this.loop, loop=0, t=0;
		
		if (d===0) { return 0; }
		if (loopCount !== -1 && rawPosition >= loopCount*d+d) { t = d; loop = loopCount } // end
		else if (rawPosition < 0) { t = 0; }
		else { loop = rawPosition/d|0; t = rawPosition-loop*d;  }
		
		var rev = !this.reversed !== !(this.bounce && loop%2); // current loop is reversed
		return rev ? d-t : t;
	};
	
	/**
	 * Returns a list of the labels defined on this tween sorted by position.
	 * @method getLabels
	 * @return {Array[Object]} A sorted array of objects with label and position properties.
	 **/
	p.getLabels = function() {
		var list = this._labelList;
		if (!list) {
			list = this._labelList = [];
			var labels = this._labels;
			for (var n in labels) {
				list.push({label:n, position:labels[n]});
			}
			list.sort(function (a,b) { return a.position- b.position; });
		}
		return list;
	};
	

	/**
	 * Defines labels for use with gotoAndPlay/Stop. Overwrites any previously set labels.
	 * @method setLabels
	 * @param {Object} labels An object defining labels for using {{#crossLink "Timeline/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Timeline/gotoAndStop"}}{{/crossLink}}
	 * in the form `{myLabelName:time}` where time is in milliseconds (or ticks if `useTicks` is `true`).
	 **/
	p.setLabels = function(labels) {
		this._labels = labels;
		this._labelList = null;
	};

	/**
	 * Adds a label that can be used with {{#crossLink "Timeline/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Timeline/gotoAndStop"}}{{/crossLink}}.
	 * @method addLabel
	 * @param {String} label The label name.
	 * @param {Number} position The position this label represents.
	 **/
	p.addLabel = function(label, position) {
		if (!this._labels) { this._labels = {}; }
		this._labels[label] = position;
		var list = this._labelList;
		if (list) {
			for (var i= 0,l=list.length; i<l; i++) { if (position < list[i].position) { break; } }
			list.splice(i, 0, {label:label, position:position});
		}
	};
	
	/**
	 * Unpauses this timeline and jumps to the specified position or label.
	 * @method gotoAndPlay
	 * @param {String|Number} positionOrLabel The position in milliseconds (or ticks if `useTicks` is `true`)
	 * or label to jump to.
	 **/
	p.gotoAndPlay = function(positionOrLabel) {
		this.paused = false;
		this._goto(positionOrLabel);
	};

	/**
	 * Pauses this timeline and jumps to the specified position or label.
	 * @method gotoAndStop
	 * @param {String|Number} positionOrLabel The position in milliseconds (or ticks if `useTicks` is `true`) or label
	 * to jump to.
	 **/
	p.gotoAndStop = function(positionOrLabel) {
		this.paused = true;
		this._goto(positionOrLabel);
	};
	
	/**
	 * If a numeric position is passed, it is returned unchanged. If a string is passed, the position of the
	 * corresponding frame label will be returned, or `null` if a matching label is not defined.
	 * @method resolve
	 * @param {String|Number} positionOrLabel A numeric position value or label string.
	 **/
	p.resolve = function(positionOrLabel) {
		var pos = Number(positionOrLabel);
		if (isNaN(pos)) { pos = this._labels && this._labels[positionOrLabel]; }
		return pos;
	};
	

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 */
	p.toString = function() {
		return "[AbstractTween]";
	};

	/**
	 * @method clone
	 * @protected
	 */
	p.clone = function() {
		throw("AbstractTween can not be cloned.")
	};


// private methods:
	/**
	 * Shared logic that executes at the end of the subclass constructor.
	 * @method _init
	 * @protected
	 */
	p._init = function(props) {
		if (!props || !props.paused) { this.paused = false; }
		if (props&&(props.position!=null)) { this.setPosition(props.position); }
	};

	/**
	 * @method _updatePosition
	 * @protected
	 */
	p._updatePosition = function(jump, end) {
		// abstract.
	};
	
	/**
	 * @method _goto
	 * @protected
	 **/
	p._goto = function(positionOrLabel) {
		var pos = this.resolve(positionOrLabel);
		if (pos != null) { this.setPosition(pos, false, true); }
	};
	
	/**
	 * @method _runActions
	 * @protected
	 */
	p._runActions = function(startRawPos, endRawPos, jump, includeStart) {
		// runs actions between startPos & endPos. Separated to support action deferral.
		
		//console.log(this.passive === false ? " > Tween" : "Timeline", "run", startRawPos, endRawPos, jump, includeStart);
		
		// if we don't have any actions, and we're not a Timeline, then return:
		// TODO: a cleaner way to handle this would be to override this method in Tween, but I'm not sure it's worth the overhead.
		if (!this._actionHead && !this.tweens) { return; } 
		
		var d=this.duration, reversed=this.reversed, bounce=this.bounce, loopCount=this.loop;
		var loop0, loop1, t0, t1;
		
		if (d === 0) {
			// deal with 0 length tweens:
			loop0 = loop1 = t0 = t1 = 0;
			reversed = bounce = false;
		} else {
			loop0=startRawPos/d|0;
			loop1=endRawPos/d|0;
			t0=startRawPos-loop0*d;
			t1=endRawPos-loop1*d;
		}
		
		// catch positions that are past the end:
		if (loopCount !== -1) {
			if (loop1 > loopCount) { t1=d; loop1=loopCount; }
			if (loop0 > loopCount) { t0=d; loop0=loopCount; }
		}
		
		// special cases:
		if (jump) { return this._runActionsRange(t1, t1, jump, includeStart); } // jump.
		else if (loop0 === loop1 && t0 === t1 && !jump && !includeStart) { return; } // no actions if the position is identical and we aren't including the start
		else if (loop0 === -1) { loop0 = t0 = 0; } // correct the -1 value for first advance, important with useTicks.
		
		var dir = (startRawPos <= endRawPos), loop = loop0;
		do {
			var rev = !reversed !== !(bounce && loop % 2);

			var start = (loop === loop0) ? t0 : dir ? 0 : d;
			var end = (loop === loop1) ? t1 : dir ? d : 0;
			
			if (rev) {
				start = d - start;
				end = d - end;
			}
			
			if (bounce && loop !== loop0 && start === end) { /* bounced onto the same time/frame, don't re-execute end actions */ }
			else if (this._runActionsRange(start, end, jump, includeStart || (loop !== loop0 && !bounce))) { return true; }
				
			includeStart = false;
		} while ((dir && ++loop <= loop1) || (!dir && --loop >= loop1));
	};
	
	p._runActionsRange = function(startPos, endPos, jump, includeStart) {
		// abstract
	};

	createjs.AbstractTween = createjs.promote(AbstractTween, "EventDispatcher");
}());

//##############################################################################
// Tween.js
//##############################################################################

this.createjs = this.createjs||{};

(function() {
	"use strict";


// constructor
	/**
	 * Tweens properties for a single target. Methods can be chained to create complex animation sequences:
	 *
	 * <h4>Example</h4>
	 *
	 *	createjs.Tween.get(target)
	 *		.wait(500)
	 *		.to({alpha:0, visible:false}, 1000)
	 *		.call(handleComplete);
	 *
	 * Multiple tweens can share a target, however if they affect the same properties there could be unexpected
	 * behaviour. To stop all tweens on an object, use {{#crossLink "Tween/removeTweens"}}{{/crossLink}} or pass `override:true`
	 * in the props argument.
	 *
	 * 	createjs.Tween.get(target, {override:true}).to({x:100});
	 *
	 * Subscribe to the {{#crossLink "Tween/change:event"}}{{/crossLink}} event to be notified when the tween position changes.
	 *
	 * 	createjs.Tween.get(target, {override:true}).to({x:100}).addEventListener("change", handleChange);
	 * 	function handleChange(event) {
	 * 		// The tween changed.
	 * 	}
	 *
	 * See the {{#crossLink "Tween/get"}}{{/crossLink}} method also.
	 * @class Tween
	 * @param {Object} target The target object that will have its properties tweened.
	 * @param {Object} [props] The configuration properties to apply to this instance (ex. `{loop:-1, paused:true}`).
	 * Supported props are listed below. These props are set on the corresponding instance properties except where
	 * specified.
	 * @param {boolean} [props.useTicks=false]  See the {{#crossLink "AbstractTween/useTicks:property"}}{{/crossLink}} property for more information.
	 * @param {boolean} [props.ignoreGlobalPause=false] See the {{#crossLink "AbstractTween/ignoreGlobalPause:property"}}{{/crossLink}} for more information.
	 * @param {number|boolean} [props.loop=0] See the {{#crossLink "AbstractTween/loop:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.reversed=false] See the {{#crossLink "AbstractTween/reversed:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.bounce=false] See the {{#crossLink "AbstractTween/bounce:property"}}{{/crossLink}} for more information.
	 * @param {number} [props.timeScale=1] See the {{#crossLink "AbstractTween/timeScale:property"}}{{/crossLink}} for more information.
	 * @param {object} [props.pluginData] See the {{#crossLink "Tween/pluginData:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.paused=false] See the {{#crossLink "AbstractTween/paused:property"}}{{/crossLink}} for more information.
	 * @param {number} [props.position=0] The initial position for this tween. See {{#crossLink "AbstractTween/position:property"}}{{/crossLink}}
	 * @param {Function} [props.onChange] Adds the specified function as a listener to the {{#crossLink "AbstractTween/change:event"}}{{/crossLink}} event
	 * @param {Function} [props.onComplete] Adds the specified function as a listener to the {{#crossLink "AbstractTween/complete:event"}}{{/crossLink}} event
	 * @param {boolean} [props.override=false] Removes all existing tweens for the target when set to `true`.
	 * </UL>
	 * @extends AbstractTween
	 * @constructor
	 */
	function Tween(target, props) {
		this.AbstractTween_constructor(props);
		
	// public properties:
	
		/**
		 * Allows you to specify data that will be used by installed plugins. Each plugin uses this differently, but in general
		 * you specify data by assigning it to a property of `pluginData` with the same name as the plugin.
		 * Note that in many cases, this data is used as soon as the plugin initializes itself for the tween.
		 * As such, this data should be set before the first `to` call in most cases.
		 * @example
		 *	myTween.pluginData.SmartRotation = data;
		 * 
		 * Most plugins also support a property to disable them for a specific tween. This is typically the plugin name followed by "_disabled".
		 * @example
		 *	myTween.pluginData.SmartRotation_disabled = true;
		 * 
		 * Some plugins also store working data in this object, usually in a property named `_PluginClassName`.
		 * See the documentation for individual plugins for more details.
		 * @property pluginData
		 * @type {Object}
		 */
		this.pluginData = null;
	
		/**
		 * The target of this tween. This is the object on which the tweened properties will be changed.
		 * @property target
		 * @type {Object}
		 * @readonly
		 */
		this.target = target;
	
		/**
		 * Indicates the tween's current position is within a passive wait.
		 * @property passive
		 * @type {Boolean}
		 * @default false
		 * @readonly
		 **/
		this.passive = false;
		
		
	// private properties:
	
		/**
		 * @property _stepHead
		 * @type {TweenStep}
		 * @protected
		 */
		this._stepHead = new TweenStep(null, 0, 0, {}, null, true);
		
		/**
		 * @property _stepTail
		 * @type {TweenStep}
		 * @protected
		 */
		this._stepTail = this._stepHead;
		
		/**
		 * The position within the current step. Used by MovieClip.
		 * @property _stepPosition
		 * @type {Number}
		 * @default 0
		 * @protected
		 */
		this._stepPosition = 0;
		
		/**
		 * @property _actionHead
		 * @type {TweenAction}
		 * @protected
		 */
		this._actionHead = null;
		
		/**
		 * @property _actionTail
		 * @type {TweenAction}
		 * @protected
		 */
		this._actionTail = null;
		
		/**
		 * Plugins added to this tween instance.
		 * @property _plugins
		 * @type Array[Object]
		 * @default null
		 * @protected
		 */
		this._plugins = null;
		
		/**
		 * Hash for quickly looking up added plugins. Null until a plugin is added.
		 * @property _plugins
		 * @type Object
		 * @default null
		 * @protected
		 */
		this._pluginIds = null;
		
		/**
		 * Used by plugins to inject new properties.
		 * @property _injected
		 * @type {Object}
		 * @default null
		 * @protected
		 */
		this._injected = null;

		if (props) {
			this.pluginData = props.pluginData;
			if (props.override) { Tween.removeTweens(target); }
		}
		if (!this.pluginData) { this.pluginData = {}; }
		
		this._init(props);
	};

	var p = createjs.extend(Tween, createjs.AbstractTween);

// static properties

	/**
	 * Constant returned by plugins to tell the tween not to use default assignment.
	 * @property IGNORE
	 * @type Object
	 * @static
	 */
	Tween.IGNORE = {};

	/**
	 * @property _listeners
	 * @type Array[Tween]
	 * @static
	 * @protected
	 */
	Tween._tweens = [];

	/**
	 * @property _plugins
	 * @type Object
	 * @static
	 * @protected
	 */
	Tween._plugins = null;
	
	/**
	 * @property _tweenHead
	 * @type Tween
	 * @static
	 * @protected
	 */
	Tween._tweenHead = null;
	
	/**
	 * @property _tweenTail
	 * @type Tween
	 * @static
	 * @protected
	 */
	Tween._tweenTail = null;


// static methods	
	/**
	 * Returns a new tween instance. This is functionally identical to using `new Tween(...)`, but may look cleaner
	 * with the chained syntax of TweenJS.
	 * <h4>Example</h4>
	 *
	 *	var tween = createjs.Tween.get(target).to({x:100}, 500);
	 *	// equivalent to:
	 *	var tween = new createjs.Tween(target).to({x:100}, 500);
	 *
	 * @method get
	 * @param {Object} target The target object that will have its properties tweened.
	 * @param {Object} [props] The configuration properties to apply to this instance (ex. `{loop:-1, paused:true}`).
	 * Supported props are listed below. These props are set on the corresponding instance properties except where
	 * specified.
	 * @param {boolean} [props.useTicks=false]  See the {{#crossLink "AbstractTween/useTicks:property"}}{{/crossLink}} property for more information.
	 * @param {boolean} [props.ignoreGlobalPause=false] See the {{#crossLink "AbstractTween/ignoreGlobalPause:property"}}{{/crossLink}} for more information.
	 * @param {number|boolean} [props.loop=0] See the {{#crossLink "AbstractTween/loop:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.reversed=false] See the {{#crossLink "AbstractTween/reversed:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.bounce=false] See the {{#crossLink "AbstractTween/bounce:property"}}{{/crossLink}} for more information.
	 * @param {number} [props.timeScale=1] See the {{#crossLink "AbstractTween/timeScale:property"}}{{/crossLink}} for more information.
	 * @param {object} [props.pluginData] See the {{#crossLink "Tween/pluginData:property"}}{{/crossLink}} for more information.
	 * @param {boolean} [props.paused=false] See the {{#crossLink "AbstractTween/paused:property"}}{{/crossLink}} for more information.
	 * @param {number} [props.position=0] The initial position for this tween. See {{#crossLink "AbstractTween/position:property"}}{{/crossLink}}
	 * @param {Function} [props.onChange] Adds the specified function as a listener to the {{#crossLink "AbstractTween/change:event"}}{{/crossLink}} event
	 * @param {Function} [props.onComplete] Adds the specified function as a listener to the {{#crossLink "AbstractTween/complete:event"}}{{/crossLink}} event
	 * @param {boolean} [props.override=false] Removes all existing tweens for the target when set to `true`.
	 * @return {Tween} A reference to the created tween.
	 * @static
	 */
	Tween.get = function(target, props) {
		return new Tween(target, props);
	};

	/**
	 * Advances all tweens. This typically uses the {{#crossLink "Ticker"}}{{/crossLink}} class, but you can call it
	 * manually if you prefer to use your own "heartbeat" implementation.
	 * @method tick
	 * @param {Number} delta The change in time in milliseconds since the last tick. Required unless all tweens have
	 * `useTicks` set to true.
	 * @param {Boolean} paused Indicates whether a global pause is in effect. Tweens with {{#crossLink "Tween/ignoreGlobalPause:property"}}{{/crossLink}}
	 * will ignore this, but all others will pause if this is `true`.
	 * @static
	 */
	Tween.tick = function(delta, paused) {
		var tween = Tween._tweenHead;
		while (tween) {
			var next = tween._next; // in case it completes and wipes its _next property
			if ((paused && !tween.ignoreGlobalPause) || tween._paused) { /* paused */ }
			else { tween.advance(tween.useTicks?1:delta); }
			tween = next;
		}
	};

	/**
	 * Handle events that result from Tween being used as an event handler. This is included to allow Tween to handle
	 * {{#crossLink "Ticker/tick:event"}}{{/crossLink}} events from the createjs {{#crossLink "Ticker"}}{{/crossLink}}.
	 * No other events are handled in Tween.
	 * @method handleEvent
	 * @param {Object} event An event object passed in by the {{#crossLink "EventDispatcher"}}{{/crossLink}}. Will
	 * usually be of type "tick".
	 * @private
	 * @static
	 * @since 0.4.2
	 */
	Tween.handleEvent = function(event) {
		if (event.type === "tick") {
			this.tick(event.delta, event.paused);
		}
	};

	/**
	 * Removes all existing tweens for a target. This is called automatically by new tweens if the `override`
	 * property is `true`.
	 * @method removeTweens
	 * @param {Object} target The target object to remove existing tweens from.
	 * @static
	 */
	Tween.removeTweens = function(target) {
		if (!target.tweenjs_count) { return; }
		var tween = Tween._tweenHead;
		while (tween) {
			var next = tween._next;
			if (tween.target === target) { Tween._register(tween, true); }
			tween = next;
		}
		target.tweenjs_count = 0;
	};

	/**
	 * Stop and remove all existing tweens.
	 * @method removeAllTweens
	 * @static
	 * @since 0.4.1
	 */
	Tween.removeAllTweens = function() {
		var tween = Tween._tweenHead;
		while (tween) {
			var next = tween._next;
			tween._paused = true;
			tween.target&&(tween.target.tweenjs_count = 0);
			tween._next = tween._prev = null;
			tween = next;
		}
		Tween._tweenHead = Tween._tweenTail = null;
	};

	/**
	 * Indicates whether there are any active tweens on the target object (if specified) or in general.
	 * @method hasActiveTweens
	 * @param {Object} [target] The target to check for active tweens. If not specified, the return value will indicate
	 * if there are any active tweens on any target.
	 * @return {Boolean} Indicates if there are active tweens.
	 * @static
	 */
	Tween.hasActiveTweens = function(target) {
		if (target) { return !!target.tweenjs_count; }
		return !!Tween._tweenHead;
	};

	/**
	 * Installs a plugin, which can modify how certain properties are handled when tweened. See the {{#crossLink "SamplePlugin"}}{{/crossLink}}
	 * for an example of how to write TweenJS plugins. Plugins should generally be installed via their own `install` method, in order to provide
	 * the plugin with an opportunity to configure itself.
	 * @method _installPlugin
	 * @param {Object} plugin The plugin to install
	 * @static
	 * @protected
	 */
	Tween._installPlugin = function(plugin) {
		var priority = (plugin.priority = plugin.priority||0), arr = (Tween._plugins = Tween._plugins || []);
		for (var i=0,l=arr.length;i<l;i++) {
			if (priority < arr[i].priority) { break; }
		}
		arr.splice(i,0,plugin);
	};

	/**
	 * Registers or unregisters a tween with the ticking system.
	 * @method _register
	 * @param {Tween} tween The tween instance to register or unregister.
	 * @param {Boolean} paused If `false`, the tween is registered. If `true` the tween is unregistered.
	 * @static
	 * @protected
	 */
	Tween._register = function(tween, paused) {
		var target = tween.target;
		if (!paused && tween._paused) {
			// TODO: this approach might fail if a dev is using sealed objects
			if (target) { target.tweenjs_count = target.tweenjs_count ? target.tweenjs_count+1 : 1; }
			var tail = Tween._tweenTail;
			if (!tail) { Tween._tweenHead = Tween._tweenTail = tween; }
			else {
				Tween._tweenTail = tail._next = tween;
				tween._prev = tail;
			}
			if (!Tween._inited && createjs.Ticker) { createjs.Ticker.addEventListener("tick", Tween); Tween._inited = true; }
		} else if (paused && !tween._paused) {
			if (target) { target.tweenjs_count--; }
			var next = tween._next, prev = tween._prev;
			
			if (next) { next._prev = prev; }
			else { Tween._tweenTail = prev; } // was tail
			if (prev) { prev._next = next; }
			else { Tween._tweenHead = next; } // was head.
			
			tween._next = tween._prev = null;
		}
		tween._paused = paused;
	};


// events:

// public methods:
	/**
	 * Adds a wait (essentially an empty tween).
	 * <h4>Example</h4>
	 *
	 *	//This tween will wait 1s before alpha is faded to 0.
	 *	createjs.Tween.get(target).wait(1000).to({alpha:0}, 1000);
	 *
	 * @method wait
	 * @param {Number} duration The duration of the wait in milliseconds (or in ticks if `useTicks` is true).
	 * @param {Boolean} [passive=false] Tween properties will not be updated during a passive wait. This
	 * is mostly useful for use with {{#crossLink "Timeline"}}{{/crossLink}} instances that contain multiple tweens
	 * affecting the same target at different times.
	 * @return {Tween} This tween instance (for chaining calls).
	 * @chainable
	 **/
	p.wait = function(duration, passive) {
		if (duration > 0) { this._addStep(+duration, this._stepTail.props, null, passive); }
		return this;
	};

	/**
	 * Adds a tween from the current values to the specified properties. Set duration to 0 to jump to these value.
	 * Numeric properties will be tweened from their current value in the tween to the target value. Non-numeric
	 * properties will be set at the end of the specified duration.
	 * <h4>Example</h4>
	 *
	 *	createjs.Tween.get(target).to({alpha:0, visible:false}, 1000);
	 *
	 * @method to
	 * @param {Object} props An object specifying property target values for this tween (Ex. `{x:300}` would tween the x
	 * property of the target to 300).
	 * @param {Number} [duration=0] The duration of the tween in milliseconds (or in ticks if `useTicks` is true).
	 * @param {Function} [ease="linear"] The easing function to use for this tween. See the {{#crossLink "Ease"}}{{/crossLink}}
	 * class for a list of built-in ease functions.
	 * @return {Tween} This tween instance (for chaining calls).
	 * @chainable
	 */
	p.to = function(props, duration, ease) {
		if (duration == null || duration < 0) { duration = 0; }
		var step = this._addStep(+duration, null, ease);
		this._appendProps(props, step);
		return this;
	};
	
	/**
	 * Adds a label that can be used with {{#crossLink "Tween/gotoAndPlay"}}{{/crossLink}}/{{#crossLink "Tween/gotoAndStop"}}{{/crossLink}}
	 * at the current point in the tween. For example:
	 * 
	 * 	var tween = createjs.Tween.get(foo)
	 * 					.to({x:100}, 1000)
	 * 					.label("myLabel")
	 * 					.to({x:200}, 1000);
	 * // ...
	 * tween.gotoAndPlay("myLabel"); // would play from 1000ms in.
	 * 
	 * @method addLabel
	 * @param {String} label The label name.
	 * @return {Tween} This tween instance (for chaining calls).
	 * @chainable
	 **/
	p.label = function(name) {
		this.addLabel(name, this.duration);
		return this;
	};

	/**
	 * Adds an action to call the specified function.
	 * <h4>Example</h4>
	 *
	 * 	//would call myFunction() after 1 second.
	 * 	createjs.Tween.get().wait(1000).call(myFunction);
	 *
	 * @method call
	 * @param {Function} callback The function to call.
	 * @param {Array} [params]. The parameters to call the function with. If this is omitted, then the function
	 * will be called with a single param pointing to this tween.
	 * @param {Object} [scope]. The scope to call the function in. If omitted, it will be called in the target's scope.
	 * @return {Tween} This tween instance (for chaining calls).
	 * @chainable
	 */
	p.call = function(callback, params, scope) {
		return this._addAction(scope||this.target, callback, params||[this]);
	};

	/**
	 * Adds an action to set the specified props on the specified target. If `target` is null, it will use this tween's
	 * target. Note that for properties on the target object, you should consider using a zero duration {{#crossLink "Tween/to"}}{{/crossLink}}
	 * operation instead so the values are registered as tweened props.
	 * <h4>Example</h4>
	 *
	 *	myTween.wait(1000).set({visible:false}, foo);
	 *
	 * @method set
	 * @param {Object} props The properties to set (ex. `{visible:false}`).
	 * @param {Object} [target] The target to set the properties on. If omitted, they will be set on the tween's target.
	 * @return {Tween} This tween instance (for chaining calls).
	 * @chainable
	 */
	p.set = function(props, target) {
		return this._addAction(target||this.target, this._set, [props]);
	};

	/**
	 * Adds an action to play (unpause) the specified tween. This enables you to sequence multiple tweens.
	 * <h4>Example</h4>
	 *
	 *	myTween.to({x:100}, 500).play(otherTween);
	 *
	 * @method play
	 * @param {Tween} [tween] The tween to play. Defaults to this tween.
	 * @return {Tween} This tween instance (for chaining calls).
	 * @chainable
	 */
	p.play = function(tween) {
		return this._addAction(tween||this, this._set, [{paused:false}]);
	};

	/**
	 * Adds an action to pause the specified tween.
	 * 
	 * 	myTween.pause(otherTween).to({alpha:1}, 1000).play(otherTween);
	 * 
	 * Note that this executes at the end of a tween update, so the tween may advance beyond the time the pause
	 * action was inserted at. For example:
	 * 
	 * myTween.to({foo:0}, 1000).pause().to({foo:1}, 1000);
	 * 
	 * At 60fps the tween will advance by ~16ms per tick, if the tween above was at 999ms prior to the current tick, it
	 * will advance to 1015ms (15ms into the second "step") and then pause.
	 * 
	 * @method pause
	 * @param {Tween} [tween] The tween to pause. Defaults to this tween.
	 * @return {Tween} This tween instance (for chaining calls)
	 * @chainable
	 */
	p.pause = function(tween) {
		return this._addAction(tween||this, this._set, [{paused:true}]);
	};

	// tiny api (primarily for tool output):
	p.w = p.wait;
	p.t = p.to;
	p.c = p.call;
	p.s = p.set;

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 */
	p.toString = function() {
		return "[Tween]";
	};

	/**
	 * @method clone
	 * @protected
	 */
	p.clone = function() {
		throw("Tween can not be cloned.")
	};


// private methods:
	/**
	 * Adds a plugin to this tween.
	 * @method _addPlugin
	 * @param {Object} plugin
	 * @protected
	 */
	p._addPlugin = function(plugin) {
		var ids = this._pluginIds || (this._pluginIds = {}), id = plugin.ID;
		if (!id || ids[id]) { return; } // already added
		
		ids[id] = true;
		var plugins = this._plugins || (this._plugins = []), priority = plugin.priority || 0;
		for (var i=0,l=plugins.length; i<l; i++) {
			if (priority < plugins[i].priority) {
				plugins.splice(i,0,plugin);
				return;
			}
		}
		plugins.push(plugin);
	};
	
	// Docced in AbstractTween
	p._updatePosition = function(jump, end) {
		var step = this._stepHead.next, t=this.position, d=this.duration;
		if (this.target && step) {
			// find our new step index:
			var stepNext = step.next;
			while (stepNext && stepNext.t <= t) { step = step.next; stepNext = step.next; }
			var ratio = end ? d === 0 ? 1 : t/d : (t-step.t)/step.d; // TODO: revisit this.
			this._updateTargetProps(step, ratio, end);
		}
		this._stepPosition = step ? t-step.t : 0;
	};
	
	/**
	 * @method _updateTargetProps
	 * @param {Object} step
	 * @param {Number} ratio
	 * @param {Boolean} end Indicates to plugins that the full tween has ended.
	 * @protected
	 */
	p._updateTargetProps = function(step, ratio, end) {
		if (this.passive = !!step.passive) { return; } // don't update props.
		
		var v, v0, v1, ease;
		var p0 = step.prev.props;
		var p1 = step.props;
		if (ease = step.ease) { ratio = ease(ratio,0,1,1); }
		
		var plugins = this._plugins;
		proploop : for (var n in p0) {
			v0 = p0[n];
			v1 = p1[n];
			
			// values are different & it is numeric then interpolate:
			if (v0 !== v1 && (typeof(v0) === "number")) {
				v = v0+(v1-v0)*ratio;
			} else {
				v = ratio >= 1 ? v1 : v0;
			}
			
			if (plugins) {
				for (var i=0,l=plugins.length;i<l;i++) {
					var value = plugins[i].change(this, step, n, v, ratio, end);
					if (value === Tween.IGNORE) { continue proploop; }
					if (value !== undefined) { v = value; }
				}
			}
			this.target[n] = v;
		}

	};
	
	/**
	 * @method _runActionsRange
	 * @param {Number} startPos
	 * @param {Number} endPos
	 * @param {Boolean} includeStart
	 * @protected
	 */
	p._runActionsRange = function(startPos, endPos, jump, includeStart) {
		var rev = startPos > endPos;
		var action = rev ? this._actionTail : this._actionHead;
		var ePos = endPos, sPos = startPos;
		if (rev) { ePos=startPos; sPos=endPos; }
		var t = this.position;
		while (action) {
			var pos = action.t;
			if (pos === endPos || (pos > sPos && pos < ePos) || (includeStart && pos === startPos)) {
				action.funct.apply(action.scope, action.params);
				if (t !== this.position) { return true; }
			}
			action = rev ? action.prev : action.next;
		}
	};

	/**
	 * @method _appendProps
	 * @param {Object} props
	 * @protected
	 */
	p._appendProps = function(props, step, stepPlugins) {
		var initProps = this._stepHead.props, target = this.target, plugins = Tween._plugins;
		var n, i, value, initValue, inject;
		var oldStep = step.prev, oldProps = oldStep.props;
		var stepProps = step.props || (step.props = this._cloneProps(oldProps));
		var cleanProps = {}; // TODO: is there some way to avoid this additional object?

		for (n in props) {
			if (!props.hasOwnProperty(n)) { continue; }
			cleanProps[n] = stepProps[n] = props[n];

			if (initProps[n] !== undefined) { continue; }

			initValue = undefined; // accessing missing properties on DOMElements when using CSSPlugin is INSANELY expensive, so we let the plugin take a first swing at it.
			if (plugins) {
				for (i = plugins.length-1; i >= 0; i--) {
					value = plugins[i].init(this, n, initValue);
					if (value !== undefined) { initValue = value; }
					if (initValue === Tween.IGNORE) {
						delete(stepProps[n]);
						delete(cleanProps[n]);
						break;
					}
				}
			}

			if (initValue !== Tween.IGNORE) {
				if (initValue === undefined) { initValue = target[n]; }
				oldProps[n] = (initValue === undefined) ? null : initValue;
			}
		}
		
		for (n in cleanProps) {
			value = props[n];

			// propagate old value to previous steps:
			var o, prev=oldStep;
			while ((o = prev) && (prev = o.prev)) {
				if (prev.props === o.props) { continue; } // wait step
				if (prev.props[n] !== undefined) { break; } // already has a value, we're done.
				prev.props[n] = oldProps[n];
			}
		}
		
		if (stepPlugins !== false && (plugins = this._plugins)) {
			for (i = plugins.length-1; i >= 0; i--) {
				plugins[i].step(this, step, cleanProps);
			}
		}
		
		if (inject = this._injected) {
			this._injected = null;
			this._appendProps(inject, step, false);
		}
	};
	
	/**
	 * Used by plugins to inject properties onto the current step. Called from within `Plugin.step` calls.
	 * For example, a plugin dealing with color, could read a hex color, and inject red, green, and blue props into the tween.
	 * See the SamplePlugin for more info.
	 * @method _injectProp
	 * @param {String} name
	 * @param {Object} value
	 * @protected
	 */
	p._injectProp = function(name, value) {
		var o = this._injected || (this._injected = {});
		o[name] = value;
	};

	/**
	 * @method _addStep
	 * @param {Number} duration
	 * @param {Object} props
	 * @param {Function} ease
	 * @param {Boolean} passive
	 * @protected
	 */
	p._addStep = function(duration, props, ease, passive) {
		var step = new TweenStep(this._stepTail, this.duration, duration, props, ease, passive||false);
		this.duration += duration;
		return this._stepTail = (this._stepTail.next = step);
	};

	/**
	 * @method _addAction
	 * @param {Object} scope
	 * @param {Function} funct
	 * @param {Array} params
	 * @protected
	 */
	p._addAction = function(scope, funct, params) {
		var action = new TweenAction(this._actionTail, this.duration, scope, funct, params);
		if (this._actionTail) { this._actionTail.next = action; }
		else { this._actionHead = action; }
		this._actionTail = action;
		return this;
	};

	/**
	 * @method _set
	 * @param {Object} props
	 * @protected
	 */
	p._set = function(props) {
		for (var n in props) {
			this[n] = props[n];
		}
	};

	/**
	 * @method _cloneProps
	 * @param {Object} props
	 * @protected
	 */
	p._cloneProps = function(props) {
		var o = {};
		for (var n in props) { o[n] = props[n]; }
		return o;
	};

	createjs.Tween = createjs.promote(Tween, "AbstractTween");
	
	function TweenStep(prev, t, d, props, ease, passive) {
		this.next = null;
		this.prev = prev;
		this.t = t;
		this.d = d;
		this.props = props;
		this.ease = ease;
		this.passive = passive;
		this.index = prev ? prev.index+1 : 0;
	};
	
	function TweenAction(prev, t, scope, funct, params) {
		this.next = null;
		this.prev = prev;
		this.t = t;
		this.d = 0;
		this.scope = scope;
		this.funct = funct;
		this.params = params;
	};
}());

//##############################################################################
// Timeline.js
//##############################################################################

this.createjs = this.createjs||{};


(function() {
	"use strict";
	

// constructor	
	/**
	 * The Timeline class synchronizes multiple tweens and allows them to be controlled as a group. Please note that if a
	 * timeline is looping, the tweens on it may appear to loop even if the "loop" property of the tween is false.
	 * 
	 * NOTE: Timeline currently also accepts a param list in the form: `tweens, labels, props`. This is for backwards
	 * compatibility only and will be removed in the future. Include tweens and labels as properties on the props object.
	 * @class Timeline
	 * @param {Object} [props] The configuration properties to apply to this instance (ex. `{loop:-1, paused:true}`).
	 * Supported props are listed below. These props are set on the corresponding instance properties except where
	 * specified.<UL>
	 *    <LI> `useTicks`</LI>
	 *    <LI> `ignoreGlobalPause`</LI>
	 *    <LI> `loop`</LI>
	 *    <LI> `reversed`</LI>
	 *    <LI> `bounce`</LI>
	 *    <LI> `timeScale`</LI>
	 *    <LI> `paused`</LI>
	 *    <LI> `position`: indicates the initial position for this tween.</LI>
	 *    <LI> `onChange`: adds the specified function as a listener to the `change` event</LI>
	 *    <LI> `onComplete`: adds the specified function as a listener to the `complete` event</LI>
	 * </UL>
	 * @extends AbstractTween
	 * @constructor
	 **/
	function Timeline(props) {
		var tweens, labels;
		// handle old params (tweens, labels, props):
		// TODO: deprecated.
		if (props instanceof Array || (props == null && arguments.length > 1)) {
			tweens = props;
			labels = arguments[1];
			props = arguments[2];
		} else if (props) {
			tweens = props.tweens;
			labels = props.labels;
		}
		
		this.AbstractTween_constructor(props);

	// private properties:
		/**
		 * The array of tweens in the timeline. It is *strongly* recommended that you use
		 * {{#crossLink "Tween/addTween"}}{{/crossLink}} and {{#crossLink "Tween/removeTween"}}{{/crossLink}},
		 * rather than accessing this directly, but it is included for advanced uses.
		 * @property tweens
		 * @type Array
		 **/
		this.tweens = [];
		
		if (tweens) { this.addTween.apply(this, tweens); }
		this.setLabels(labels);
		
		this._init(props);
	};
	
	var p = createjs.extend(Timeline, createjs.AbstractTween);

	
// events:
	// docced in AbstractTween.


// public methods:
	/**
	 * Adds one or more tweens (or timelines) to this timeline. The tweens will be paused (to remove them from the
	 * normal ticking system) and managed by this timeline. Adding a tween to multiple timelines will result in
	 * unexpected behaviour.
	 * @method addTween
	 * @param {Tween} ...tween The tween(s) to add. Accepts multiple arguments.
	 * @return {Tween} The first tween that was passed in.
	 **/
	p.addTween = function(tween) {
		if (tween._parent) { tween._parent.removeTween(tween); }
		
		var l = arguments.length;
		if (l > 1) {
			for (var i=0; i<l; i++) { this.addTween(arguments[i]); }
			return arguments[l-1];
		} else if (l === 0) { return null; }
		
		this.tweens.push(tween);
		tween._parent = this;
		tween.paused = true;
		var d = tween.duration;
		if (tween.loop > 0) { d *= tween.loop+1; }
		if (d > this.duration) { this.duration = d; }
		
		if (this.rawPosition >= 0) { tween.setPosition(this.rawPosition); }
		return tween;
	};

	/**
	 * Removes one or more tweens from this timeline.
	 * @method removeTween
	 * @param {Tween} ...tween The tween(s) to remove. Accepts multiple arguments.
	 * @return Boolean Returns `true` if all of the tweens were successfully removed.
	 **/
	p.removeTween = function(tween) {
		var l = arguments.length;
		if (l > 1) {
			var good = true;
			for (var i=0; i<l; i++) { good = good && this.removeTween(arguments[i]); }
			return good;
		} else if (l === 0) { return true; }

		var tweens = this.tweens;
		var i = tweens.length;
		while (i--) {
			if (tweens[i] === tween) {
				tweens.splice(i, 1);
				tween._parent = null;
				if (tween.duration >= this.duration) { this.updateDuration(); }
				return true;
			}
		}
		return false;
	};

	/**
	 * Recalculates the duration of the timeline. The duration is automatically updated when tweens are added or removed,
	 * but this method is useful if you modify a tween after it was added to the timeline.
	 * @method updateDuration
	 **/
	p.updateDuration = function() {
		this.duration = 0;
		for (var i=0,l=this.tweens.length; i<l; i++) {
			var tween = this.tweens[i];
			var d = tween.duration;
			if (tween.loop > 0) { d *= tween.loop+1; }
			if (d > this.duration) { this.duration = d; }
		}
	};

	/**
	* Returns a string representation of this object.
	* @method toString
	* @return {String} a string representation of the instance.
	**/
	p.toString = function() {
		return "[Timeline]";
	};

	/**
	 * @method clone
	 * @protected
	 **/
	p.clone = function() {
		throw("Timeline can not be cloned.")
	};

// private methods:
	
	// Docced in AbstractTween
	p._updatePosition = function(jump, end) {
		var t = this.position;
		for (var i=0, l=this.tweens.length; i<l; i++) {
			this.tweens[i].setPosition(t, true, jump); // actions will run after all the tweens update.
		}
	};
	
	// Docced in AbstractTween
	p._runActionsRange = function(startPos, endPos, jump, includeStart) {
		//console.log("	range", startPos, endPos, jump, includeStart);
		var t = this.position;
		for (var i=0, l=this.tweens.length; i<l; i++) {
			this.tweens[i]._runActions(startPos, endPos, jump, includeStart);
			if (t !== this.position) { return true; } // an action changed this timeline's position.
		}
	};


	createjs.Timeline = createjs.promote(Timeline, "AbstractTween");

}());

//##############################################################################
// Ease.js
//##############################################################################

this.createjs = this.createjs||{};

(function() {
	"use strict";

	/**
	 * The Ease class provides a collection of easing functions for use with TweenJS. It does not use the standard 4 param
	 * easing signature. Instead it uses a single param which indicates the current linear ratio (0 to 1) of the tween.
	 *
	 * Most methods on Ease can be passed directly as easing functions:
	 *
	 *      Tween.get(target).to({x:100}, 500, Ease.linear);
	 *
	 * However, methods beginning with "get" will return an easing function based on parameter values:
	 *
	 *      Tween.get(target).to({y:200}, 500, Ease.getPowIn(2.2));
	 *
	 * Please see the <a href="http://www.createjs.com/Demos/TweenJS/Tween_SparkTable">spark table demo</a> for an
	 * overview of the different ease types on <a href="http://tweenjs.com">TweenJS.com</a>.
	 *
	 * <em>Equations derived from work by Robert Penner.</em>
	 * @class Ease
	 * @static
	 **/
	function Ease() {
		throw "Ease cannot be instantiated.";
	}


// static methods and properties
	/**
	 * @method linear
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.linear = function(t) { return t; };

	/**
	 * Identical to linear.
	 * @method none
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.none = Ease.linear;

	/**
	 * Mimics the simple -100 to 100 easing in Adobe Flash/Animate.
	 * @method get
	 * @param {Number} amount A value from -1 (ease in) to 1 (ease out) indicating the strength and direction of the ease.
	 * @static
	 * @return {Function}
	 **/
	Ease.get = function(amount) {
		if (amount < -1) { amount = -1; }
		else if (amount > 1) { amount = 1; }
		return function(t) {
			if (amount==0) { return t; }
			if (amount<0) { return t*(t*-amount+1+amount); }
			return t*((2-t)*amount+(1-amount));
		};
	};

	/**
	 * Configurable exponential ease.
	 * @method getPowIn
	 * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
	 * @static
	 * @return {Function}
	 **/
	Ease.getPowIn = function(pow) {
		return function(t) {
			return Math.pow(t,pow);
		};
	};

	/**
	 * Configurable exponential ease.
	 * @method getPowOut
	 * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
	 * @static
	 * @return {Function}
	 **/
	Ease.getPowOut = function(pow) {
		return function(t) {
			return 1-Math.pow(1-t,pow);
		};
	};

	/**
	 * Configurable exponential ease.
	 * @method getPowInOut
	 * @param {Number} pow The exponent to use (ex. 3 would return a cubic ease).
	 * @static
	 * @return {Function}
	 **/
	Ease.getPowInOut = function(pow) {
		return function(t) {
			if ((t*=2)<1) return 0.5*Math.pow(t,pow);
			return 1-0.5*Math.abs(Math.pow(2-t,pow));
		};
	};

	/**
	 * @method quadIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quadIn = Ease.getPowIn(2);
	/**
	 * @method quadOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quadOut = Ease.getPowOut(2);
	/**
	 * @method quadInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quadInOut = Ease.getPowInOut(2);

	/**
	 * @method cubicIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.cubicIn = Ease.getPowIn(3);
	/**
	 * @method cubicOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.cubicOut = Ease.getPowOut(3);
	/**
	 * @method cubicInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.cubicInOut = Ease.getPowInOut(3);

	/**
	 * @method quartIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quartIn = Ease.getPowIn(4);
	/**
	 * @method quartOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quartOut = Ease.getPowOut(4);
	/**
	 * @method quartInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quartInOut = Ease.getPowInOut(4);

	/**
	 * @method quintIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quintIn = Ease.getPowIn(5);
	/**
	 * @method quintOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quintOut = Ease.getPowOut(5);
	/**
	 * @method quintInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.quintInOut = Ease.getPowInOut(5);

	/**
	 * @method sineIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.sineIn = function(t) {
		return 1-Math.cos(t*Math.PI/2);
	};

	/**
	 * @method sineOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.sineOut = function(t) {
		return Math.sin(t*Math.PI/2);
	};

	/**
	 * @method sineInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.sineInOut = function(t) {
		return -0.5*(Math.cos(Math.PI*t) - 1);
	};

	/**
	 * Configurable "back in" ease.
	 * @method getBackIn
	 * @param {Number} amount The strength of the ease.
	 * @static
	 * @return {Function}
	 **/
	Ease.getBackIn = function(amount) {
		return function(t) {
			return t*t*((amount+1)*t-amount);
		};
	};
	/**
	 * @method backIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.backIn = Ease.getBackIn(1.7);

	/**
	 * Configurable "back out" ease.
	 * @method getBackOut
	 * @param {Number} amount The strength of the ease.
	 * @static
	 * @return {Function}
	 **/
	Ease.getBackOut = function(amount) {
		return function(t) {
			return (--t*t*((amount+1)*t + amount) + 1);
		};
	};
	/**
	 * @method backOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.backOut = Ease.getBackOut(1.7);

	/**
	 * Configurable "back in out" ease.
	 * @method getBackInOut
	 * @param {Number} amount The strength of the ease.
	 * @static
	 * @return {Function}
	 **/
	Ease.getBackInOut = function(amount) {
		amount*=1.525;
		return function(t) {
			if ((t*=2)<1) return 0.5*(t*t*((amount+1)*t-amount));
			return 0.5*((t-=2)*t*((amount+1)*t+amount)+2);
		};
	};
	/**
	 * @method backInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.backInOut = Ease.getBackInOut(1.7);

	/**
	 * @method circIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.circIn = function(t) {
		return -(Math.sqrt(1-t*t)- 1);
	};

	/**
	 * @method circOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.circOut = function(t) {
		return Math.sqrt(1-(--t)*t);
	};

	/**
	 * @method circInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.circInOut = function(t) {
		if ((t*=2) < 1) return -0.5*(Math.sqrt(1-t*t)-1);
		return 0.5*(Math.sqrt(1-(t-=2)*t)+1);
	};

	/**
	 * @method bounceIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.bounceIn = function(t) {
		return 1-Ease.bounceOut(1-t);
	};

	/**
	 * @method bounceOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.bounceOut = function(t) {
		if (t < 1/2.75) {
			return (7.5625*t*t);
		} else if (t < 2/2.75) {
			return (7.5625*(t-=1.5/2.75)*t+0.75);
		} else if (t < 2.5/2.75) {
			return (7.5625*(t-=2.25/2.75)*t+0.9375);
		} else {
			return (7.5625*(t-=2.625/2.75)*t +0.984375);
		}
	};

	/**
	 * @method bounceInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.bounceInOut = function(t) {
		if (t<0.5) return Ease.bounceIn (t*2) * .5;
		return Ease.bounceOut(t*2-1)*0.5+0.5;
	};

	/**
	 * Configurable elastic ease.
	 * @method getElasticIn
	 * @param {Number} amplitude
	 * @param {Number} period
	 * @static
	 * @return {Function}
	 **/
	Ease.getElasticIn = function(amplitude,period) {
		var pi2 = Math.PI*2;
		return function(t) {
			if (t==0 || t==1) return t;
			var s = period/pi2*Math.asin(1/amplitude);
			return -(amplitude*Math.pow(2,10*(t-=1))*Math.sin((t-s)*pi2/period));
		};
	};
	/**
	 * @method elasticIn
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.elasticIn = Ease.getElasticIn(1,0.3);

	/**
	 * Configurable elastic ease.
	 * @method getElasticOut
	 * @param {Number} amplitude
	 * @param {Number} period
	 * @static
	 * @return {Function}
	 **/
	Ease.getElasticOut = function(amplitude,period) {
		var pi2 = Math.PI*2;
		return function(t) {
			if (t==0 || t==1) return t;
			var s = period/pi2 * Math.asin(1/amplitude);
			return (amplitude*Math.pow(2,-10*t)*Math.sin((t-s)*pi2/period )+1);
		};
	};
	/**
	 * @method elasticOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.elasticOut = Ease.getElasticOut(1,0.3);

	/**
	 * Configurable elastic ease.
	 * @method getElasticInOut
	 * @param {Number} amplitude
	 * @param {Number} period
	 * @static
	 * @return {Function}
	 **/
	Ease.getElasticInOut = function(amplitude,period) {
		var pi2 = Math.PI*2;
		return function(t) {
			var s = period/pi2 * Math.asin(1/amplitude);
			if ((t*=2)<1) return -0.5*(amplitude*Math.pow(2,10*(t-=1))*Math.sin( (t-s)*pi2/period ));
			return amplitude*Math.pow(2,-10*(t-=1))*Math.sin((t-s)*pi2/period)*0.5+1;
		};
	};
	/**
	 * @method elasticInOut
	 * @param {Number} t
	 * @static
	 * @return {Number}
	 **/
	Ease.elasticInOut = Ease.getElasticInOut(1,0.3*1.5);

	createjs.Ease = Ease;

}());

//##############################################################################
// MotionGuidePlugin.js
//##############################################################################

this.createjs = this.createjs||{};

(function() {
	"use strict";

	/**
	 * A TweenJS plugin for working with motion guides. Defined paths which objects can follow or orient along.
	 *
	 * To use the plugin, install the plugin after TweenJS has loaded. To define a path, add
	 *
	 * 		createjs.MotionGuidePlugin.install();
	 *
	 * <h4>Example</h4>
	 *
	 * 		// Using a Motion Guide
	 * 		createjs.Tween.get(target).to({guide:{ path:[0,0, 0,200,200,200, 200,0,0,0] }},7000);
	 * 		// Visualizing the line
	 * 		graphics.moveTo(0,0).curveTo(0,200,200,200).curveTo(200,0,0,0);
	 *
	 * Each path needs pre-computation to ensure there's fast performance. Because of the pre-computation there's no
	 * built in support for path changes mid tween. These are the Guide Object's properties:<UL>
	 * 		<LI> path: Required, Array : The x/y points used to draw the path with a moveTo and 1 to n curveTo calls.</LI>
	 * 		<LI> start: Optional, 0-1 : Initial position, default 0 except for when continuing along the same path.</LI>
	 * 		<LI> end: Optional, 0-1 : Final position, default 1 if not specified.</LI>
	 * 		<LI> orient: Optional, string : "fixed"/"auto"/"cw"/"ccw"<UL>
	 *				<LI>"fixed" forces the object to face down the path all movement (relative to start rotation),</LI>
	 * 				<LI>"auto" rotates the object along the path relative to the line.</LI>
	 * 				<LI>"cw"/"ccw" force clockwise or counter clockwise rotations including Adobe Flash/Animate-like
	 * 				behaviour. This may override your end rotation value.</LI>
	 * 		</UL></LI>
	 * </UL>
	 * Guide objects should not be shared between tweens even if all properties are identical, the library stores
	 * information on these objects in the background and sharing them can cause unexpected behaviour. Values
	 * outside 0-1 range of tweens will be a "best guess" from the appropriate part of the defined curve.
	 *
	 * @class MotionGuidePlugin
	 * @constructor
	 */
	function MotionGuidePlugin() {
		throw("MotionGuidePlugin cannot be instantiated.")
	}
	var s = MotionGuidePlugin;


// static properties:
	/**
	 * @property priority
	 * @protected
	 * @static
	 */
	s.priority = 0; // high priority, should run sooner

	/**
	 * READ-ONLY. A unique identifying string for this plugin. Used by TweenJS to ensure duplicate plugins are not installed on a tween.
	 * @property ID
	 * @type {String}
	 * @static
	 * @readonly
	 */
	s.ID = "MotionGuide";

// static methods
	/**
	 * Installs this plugin for use with TweenJS. Call this once after TweenJS is loaded to enable this plugin.
	 * @method install
	 * @static
	 */
	s.install = function() {
		createjs.Tween._installPlugin(MotionGuidePlugin);
		return createjs.Tween.IGNORE;
	};

	/**
	 * Called by TweenJS when a new property initializes on a tween.
	 * See {{#crossLink "SamplePlugin/init"}}{{/crossLink}} for more info.
	 * @method init
	 * @param {Tween} tween
	 * @param {String} prop
	 * @param {any} value
	 * @return {any}
	 * @static
	 */
	s.init = function(tween, prop, value) {
		if(prop == "guide") {
			tween._addPlugin(s);
		}
	};

	/**
	 * Called when a new step is added to a tween (ie. a new "to" action is added to a tween).
	 * See {{#crossLink "SamplePlugin/step"}}{{/crossLink}} for more info.
	 * @method step
	 * @param {Tween} tween
	 * @param {TweenStep} step
	 * @param {Object} props
	 * @static
	 */
	s.step = function(tween, step, props) {
		for (var n in props) {
			if(n !== "guide") { continue; }

			var guideData = step.props.guide;
			var error = s._solveGuideData(props.guide, guideData);
			guideData.valid = !error;

			var end = guideData.endData;
			tween._injectProp("x", end.x);
			tween._injectProp("y", end.y);

			if(error || !guideData.orient) { break; }

			var initRot = step.prev.props.rotation === undefined ? (tween.target.rotation || 0) : step.prev.props.rotation;

			guideData.startOffsetRot = initRot - guideData.startData.rotation;

			if(guideData.orient == "fixed") {
				// controlled rotation
				guideData.endAbsRot = end.rotation + guideData.startOffsetRot;
				guideData.deltaRotation = 0;
			} else {
				// interpreted rotation

				var finalRot = props.rotation === undefined ? (tween.target.rotation || 0) : props.rotation;
				var deltaRot = (finalRot - guideData.endData.rotation) - guideData.startOffsetRot;
				var modRot = deltaRot % 360;

				guideData.endAbsRot = finalRot;

				switch(guideData.orient) {
					case "auto":
						guideData.deltaRotation = deltaRot;
						break;
					case "cw":
						guideData.deltaRotation = ((modRot + 360) % 360) + (360 * Math.abs((deltaRot/360) |0));
						break;
					case "ccw":
						guideData.deltaRotation = ((modRot - 360) % 360) + (-360 * Math.abs((deltaRot/360) |0));
						break;
				}
			}

			tween._injectProp("rotation", guideData.endAbsRot);
		}
	};

	/**
	 * Called before a property is updated by the tween.
	 * See {{#crossLink "SamplePlugin/change"}}{{/crossLink}} for more info.
	 * @method change
	 * @param {Tween} tween
	 * @param {TweenStep} step
	 * @param {String} prop
	 * @param {any} value
	 * @param {Number} ratio
	 * @param {Boolean} end
	 * @return {any}
	 * @static
	 */
	s.change = function(tween, step, prop, value, ratio, end) {
		var guideData = step.props.guide;

		if(
				!guideData ||							// Missing data
				(step.props === step.prev.props) || 	// In a wait()
				(guideData === step.prev.props.guide) 	// Guide hasn't changed
		) {
			return; // have no business making decisions
		}
		if(
				(prop === "guide" && !guideData.valid) ||		// this data is broken
				(prop == "x" || prop == "y") ||					// these always get over-written
				(prop === "rotation" && guideData.orient)		// currently over-written
		){
			return createjs.Tween.IGNORE;
		}

		s._ratioToPositionData(ratio, guideData, tween.target);
	};

// public methods
	/**
	 * Provide potentially useful debugging information, like running the error detection system, and rendering the path
	 * defined in the guide data.
	 *
	 * NOTE: you will need to transform your context 2D to the local space of the guide if you wish to line it up.
	 * @param {Object} guideData All the information describing the guide to be followed.
	 * @param {DrawingContext2D} [ctx=undefined] The context to draw the object into.
	 * @param {Array} [higlight=undefined] Array of ratio positions to highlight
	 * @returns {undefined|String}
	 */
	s.debug = function(guideData, ctx, higlight) {
		guideData = guideData.guide || guideData;

		// errors
		var err = s._findPathProblems(guideData);
		if(err) {
			console.error("MotionGuidePlugin Error found: \n" + err);
		}

		// drawing
		if(!ctx){ return err; }

		var i;
		var path = guideData.path;
		var pathLength = path.length;
		var width = 3;
		var length = 9;

		ctx.save();
		//ctx.resetTransform();

		ctx.lineCap = "round";
		ctx.lineJoin = "miter";
		ctx.beginPath();

		// curve
		ctx.moveTo(path[0], path[1]);
		for(i=2; i < pathLength; i+=4) {
			ctx.quadraticCurveTo(
				path[i], path[i+1],
				path[i+2], path[i+3]
			);
		}

		ctx.strokeStyle = "black";
		ctx.lineWidth = width*1.5;
		ctx.stroke();
		ctx.strokeStyle = "white";
		ctx.lineWidth = width;
		ctx.stroke();
		ctx.closePath();

		// highlights
		var hiCount = higlight.length;
		if(higlight && hiCount) {
			var tempStore = {};
			var tempLook = {};
			s._solveGuideData(guideData, tempStore);

			for(var i=0; i<hiCount; i++){
				tempStore.orient = "fixed";
				s._ratioToPositionData(higlight[i], tempStore, tempLook);

				ctx.beginPath();

				ctx.moveTo(tempLook.x, tempLook.y);
				ctx.lineTo(
					tempLook.x + Math.cos(tempLook.rotation * 0.0174533) * length,
					tempLook.y + Math.sin(tempLook.rotation * 0.0174533) * length
				);

				ctx.strokeStyle = "black";
				ctx.lineWidth = width*1.5;
				ctx.stroke();
				ctx.strokeStyle = "red";
				ctx.lineWidth = width;
				ctx.stroke();
				ctx.closePath();
			}
		}

		// end draw
		ctx.restore();

		return err;
	};

// private methods
	/**
	 * Calculate and store optimization data about the desired path to improve performance and accuracy of positions.
	 * @param {Object} source The guide data provided to the tween call
	 * @param {Object} storage the guide data used by the step calls and plugin to do the job, will be overwritten
	 * @returns {undefined|String} Can return an error if unable to generate the data.
	 * @private
	 */
	s._solveGuideData = function(source, storage) {
		var err = undefined;
		if(err = s.debug(source)) { return err; }

		var path = storage.path = source.path;
		var orient = storage.orient = source.orient;
		storage.subLines = [];
		storage.totalLength = 0;
		storage.startOffsetRot = 0;
		storage.deltaRotation = 0;
		storage.startData = {ratio: 0};
		storage.endData = {ratio: 1};
		storage.animSpan = 1;

		var pathLength = path.length;

		var precision = 10;
		var sx,sy, cx,cy, ex,ey, i,j, len, temp = {};

		sx = path[0];		sy = path[1];

		// get the data for each curve
		for(i=2; i < pathLength; i+=4) {
			cx = path[i];			cy = path[i+1];
			ex = path[i+2];			ey = path[i+3];

			var subLine = {
				weightings: [],
				estLength: 0,
				portion: 0
			};

			var subX = sx, subY = sy;
			// get the distance data for each point
			for(j=1; j <= precision;j++) {	// we need to evaluate t = 1 not t = 0
				s._getParamsForCurve(sx,sy, cx,cy, ex,ey, j/precision, false, temp);

				var dx = temp.x - subX, dy = temp.y - subY;
				len = Math.sqrt(dx*dx + dy*dy);
				subLine.weightings.push(len);
				subLine.estLength += len;

				subX = temp.x;
				subY = temp.y;
			}

			// figure out full lengths
			storage.totalLength += subLine.estLength;

			// use length to figure out proportional weightings
			for(j=0; j < precision; j++) {
				len = subLine.estLength;
				subLine.weightings[j] = subLine.weightings[j] / len;
			}

			storage.subLines.push(subLine);
			sx = ex;
			sy = ey;
		}

		// use length to figure out proportional weightings
		len = storage.totalLength;
		var l = storage.subLines.length;
		for(i=0; i<l; i++) {
			storage.subLines[i].portion = storage.subLines[i].estLength / len;
		}

		// determine start and end data
		var startRatio = isNaN(source.start) ? 0 : source.start;
		var endRatio = isNaN(source.end) ? 1 : source.end;
		s._ratioToPositionData(startRatio, storage, storage.startData);
		s._ratioToPositionData(endRatio, storage, storage.endData);

		// this has to be done last else the prev ratios will be out of place
		storage.startData.ratio = startRatio;
		storage.endData.ratio = endRatio;
		storage.animSpan = storage.endData.ratio - storage.startData.ratio;
	};

	/**
	 * Convert a percentage along the line into, a local line (start, control, end) t-value for calculation.
	 * @param {Number} ratio The (euclidean distance) percentage into the whole curve.
	 * @param {Object} guideData All the information describing the guide to be followed.
	 * @param {Object} output Object to save output properties of x,y, and rotation onto.
	 * @returns {Object} The output object, useful for isolated calls.
	 * @private
	 */
	s._ratioToPositionData = function(ratio, guideData, output) {
		var lineSegments = guideData.subLines;

		var i,l, t, test, target;

		var look = 0;
		var precision = 10;
		var effRatio = (ratio * guideData.animSpan) + guideData.startData.ratio;

		// find subline
		l = lineSegments.length;
		for(i=0; i<l; i++) {
			test = lineSegments[i].portion;
			if(look + test >= effRatio){ target = i; break; }
			look += test;
		}
		if(target === undefined) { target = l-1;  look -= test; }

		// find midline weighting
		var subLines = lineSegments[target].weightings;
		var portion = test;
		l = subLines.length;
		for(i=0; i<l; i++) {
			test = subLines[i] * portion;
			if(look + test >= effRatio){ break; }
			look += test;
		}

		// translate the subline index into a position in the path data
		target = (target*4) + 2;
		// take the distance we've covered in our ratio, and scale it to distance into the weightings
		t = (i/precision) + (((effRatio-look) / test) * (1/precision));

		// position
		var pathData = guideData.path;
		s._getParamsForCurve(
			pathData[target-2],			pathData[target-1],
			pathData[target],			pathData[target+1],
			pathData[target+2],			pathData[target+3],
			t,
			guideData.orient,
			output
		);

		if(guideData.orient) {
			if(ratio >= 0.99999 && ratio <= 1.00001 && guideData.endAbsRot !== undefined) {
				output.rotation = guideData.endAbsRot;
			} else {
				output.rotation += guideData.startOffsetRot + (ratio * guideData.deltaRotation);
			}
		}

		return output;
	};

	/**
	 * For a given quadratic bezier t-value, what is the position and rotation. Save it onto the output object.
	 * @param {Number} sx Start x.
	 * @param {Number} sy Start y.
	 * @param {Number} cx Control x.
	 * @param {Number} cy Control y.
	 * @param {Number} ex End x.
	 * @param {Number} ey End y.
	 * @param {Number} t T value (parametric distance into curve).
	 * @param {Boolean} orient Save rotation data.
	 * @param {Object} output Object to save output properties of x,y, and rotation onto.
	 * @private
	 */
	s._getParamsForCurve = function(sx,sy, cx,cy, ex,ey, t, orient, output) {
		var inv = 1 - t;

		// finding a point on a bezier curve
		output.x =	inv*inv * sx + 2 * inv * t * cx + t*t * ex;
		output.y =	inv*inv * sy + 2 * inv * t * cy + t*t * ey;

		// finding an angle on a bezier curve
		if(orient) {
			// convert from radians back to degrees
			output.rotation = 57.2957795 * Math.atan2(
				(cy - sy)*inv + (ey - cy)*t,
				(cx - sx)*inv + (ex - cx)*t
			);
		}
	};

	/**
	 * Perform a check to validate path information so plugin can avoid later error checking.
	 * @param {Object} guideData All the information describing the guide to be followed.
	 * @returns {undefined|String} The problem found, or undefined if no problems.
	 * @private
	 */
	s._findPathProblems = function(guideData) {
		var path = guideData.path;
		var valueCount = (path && path.length) || 0;	// ensure this is a number to simplify later logic
		if(valueCount < 6 || (valueCount-2) % 4) {
			var message =	"\tCannot parse 'path' array due to invalid number of entries in path. ";
			message +=		"There should be an odd number of points, at least 3 points, and 2 entries per point (x & y). ";
			message +=		"See 'CanvasRenderingContext2D.quadraticCurveTo' for details as 'path' models a quadratic bezier.\n\n";
			message +=		"Only [ "+ valueCount +" ] values found. Expected: "+ Math.max(Math.ceil((valueCount-2)/4)*4+2, 6); //6, 10, 14,...
			return message;
		}

		for(var i=0; i<valueCount; i++) {
			if(isNaN(path[i])){
				return "All data in path array must be numeric";
			}
		}

		var start = guideData.start;
		if(isNaN(start) && !(start === undefined)/* || start < 0 || start > 1*/) {	// outside 0-1 is unpredictable, but not breaking
			return "'start' out of bounds. Expected 0 to 1, got: "+ start;
		}
		var end = guideData.end;
		if(isNaN(end) && (end !== undefined)/* || end < 0 || end > 1*/) {	// outside 0-1 is unpredictable, but not breaking
			return "'end' out of bounds. Expected 0 to 1, got: "+ end;
		}

		var orient = guideData.orient;
		if(orient) { // mirror the check used elsewhere
			if(orient != "fixed" && orient != "auto" && orient != "cw" && orient != "ccw") {
				return 'Invalid orientation value. Expected ["fixed", "auto", "cw", "ccw", undefined], got: '+ orient;
			}
		}

		return undefined;
	};

	createjs.MotionGuidePlugin = MotionGuidePlugin;

}());

//##############################################################################
// version.js
//##############################################################################

this.createjs = this.createjs || {};

(function() {
	"use strict";

	/**
	 * Static class holding library specific information such as the version and buildDate of
	 * the library.
	 * @class TweenJS
	 **/
	var s = createjs.TweenJS = createjs.TweenJS || {};

	/**
	 * The version string for this release.
	 * @property version
	 * @type String
	 * @static
	 **/
	s.version = /*=version*/"1.0.0"; // injected by build process

	/**
	 * The build date for this release in UTC format.
	 * @property buildDate
	 * @type String
	 * @static
	 **/
	s.buildDate = /*=date*/"Thu, 14 Sep 2017 19:47:47 GMT"; // injected by build process

})();

(function () {
	'use strict';

	var document = typeof window !== 'undefined' && typeof window.document !== 'undefined' ? window.document : {};
	var isCommonjs = typeof module !== 'undefined' && module.exports;

	var fn = (function () {
		var val;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// New WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// Old WebKit
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0; i < val.length; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var eventNameMap = {
		change: fn.fullscreenchange,
		error: fn.fullscreenerror
	};

	var screenfull = {
		request: function (element) {
			return new Promise(function (resolve, reject) {
				var onFullScreenEntered = function () {
					this.off('change', onFullScreenEntered);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenEntered);

				element = element || document.documentElement;

				Promise.resolve(element[fn.requestFullscreen]()).catch(reject);
			}.bind(this));
		},
		exit: function () {
			return new Promise(function (resolve, reject) {
				if (!this.isFullscreen) {
					resolve();
					return;
				}

				var onFullScreenExit = function () {
					this.off('change', onFullScreenExit);
					resolve();
				}.bind(this);

				this.on('change', onFullScreenExit);

				Promise.resolve(document[fn.exitFullscreen]()).catch(reject);
			}.bind(this));
		},
		toggle: function (element) {
			return this.isFullscreen ? this.exit() : this.request(element);
		},
		onchange: function (callback) {
			this.on('change', callback);
		},
		onerror: function (callback) {
			this.on('error', callback);
		},
		on: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.addEventListener(eventName, callback, false);
			}
		},
		off: function (event, callback) {
			var eventName = eventNameMap[event];
			if (eventName) {
				document.removeEventListener(eventName, callback, false);
			}
		},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = {isEnabled: false};
		} else {
			window.screenfull = {isEnabled: false};
		}

		return;
	}

	Object.defineProperties(screenfull, {
		isFullscreen: {
			get: function () {
				return Boolean(document[fn.fullscreenElement]);
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		isEnabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return Boolean(document[fn.fullscreenEnabled]);
			}
		}
	});

	if (isCommonjs) {
		module.exports = screenfull;
	} else {
		window.screenfull = screenfull;
	}
})();


/*!
 * Platform.js <https://mths.be/platform>
 * Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 * Copyright 2011-2013 John-David Dalton
 * Available under MIT license <https://mths.be/mit>
 */
;(function() {
  'use strict';

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as a reference to the global object. */
  var root = (objectTypes[typeof window] && window) || this;

  /** Backup possible global object. */
  var oldRoot = root;

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root`. */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  /**
   * Used as the maximum length of an array-like object.
   * See the [ES6 spec](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
   * for more details.
   */
  var maxSafeInteger = Math.pow(2, 53) - 1;

  /** Regular expression to detect Opera. */
  var reOpera = /\bOpera/;

  /** Possible global object. */
  var thisBinding = this;

  /** Used for native method references. */
  var objectProto = Object.prototype;

  /** Used to check for own properties of an object. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /** Used to resolve the internal `[[Class]]` of values. */
  var toString = objectProto.toString;

  /*--------------------------------------------------------------------------*/

  /**
   * Capitalizes a string value.
   *
   * @private
   * @param {string} string The string to capitalize.
   * @returns {string} The capitalized string.
   */
  function capitalize(string) {
    string = String(string);
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * A utility function to clean up the OS name.
   *
   * @private
   * @param {string} os The OS name to clean up.
   * @param {string} [pattern] A `RegExp` pattern matching the OS name.
   * @param {string} [label] A label for the OS.
   */
  function cleanupOS(os, pattern, label) {
    // Platform tokens are defined at:
    // http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    // http://web.archive.org/web/20081122053950/http://msdn.microsoft.com/en-us/library/ms537503(VS.85).aspx
    var data = {
      '10.0': '10',
      '6.4':  '10 Technical Preview',
      '6.3':  '8.1',
      '6.2':  '8',
      '6.1':  'Server 2008 R2 / 7',
      '6.0':  'Server 2008 / Vista',
      '5.2':  'Server 2003 / XP 64-bit',
      '5.1':  'XP',
      '5.01': '2000 SP1',
      '5.0':  '2000',
      '4.0':  'NT',
      '4.90': 'ME'
    };
    // Detect Windows version from platform tokens.
    if (pattern && label && /^Win/i.test(os) && !/^Windows Phone /i.test(os) &&
        (data = data[/[\d.]+$/.exec(os)])) {
      os = 'Windows ' + data;
    }
    // Correct character case and cleanup string.
    os = String(os);

    if (pattern && label) {
      os = os.replace(RegExp(pattern, 'i'), label);
    }

    os = format(
      os.replace(/ ce$/i, ' CE')
        .replace(/\bhpw/i, 'web')
        .replace(/\bMacintosh\b/, 'Mac OS')
        .replace(/_PowerPC\b/i, ' OS')
        .replace(/\b(OS X) [^ \d]+/i, '$1')
        .replace(/\bMac (OS X)\b/, '$1')
        .replace(/\/(\d)/, ' $1')
        .replace(/_/g, '.')
        .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
        .replace(/\bx86\.64\b/gi, 'x86_64')
        .replace(/\b(Windows Phone) OS\b/, '$1')
        .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
        .split(' on ')[0]
    );

    return os;
  }

  /**
   * An iteration utility for arrays and objects.
   *
   * @private
   * @param {Array|Object} object The object to iterate over.
   * @param {Function} callback The function called per iteration.
   */
  function each(object, callback) {
    var index = -1,
        length = object ? object.length : 0;

    if (typeof length == 'number' && length > -1 && length <= maxSafeInteger) {
      while (++index < length) {
        callback(object[index], index, object);
      }
    } else {
      forOwn(object, callback);
    }
  }

  /**
   * Trim and conditionally capitalize string values.
   *
   * @private
   * @param {string} string The string to format.
   * @returns {string} The formatted string.
   */
  function format(string) {
    string = trim(string);
    return /^(?:webOS|i(?:OS|P))/.test(string)
      ? string
      : capitalize(string);
  }

  /**
   * Iterates over an object's own properties, executing the `callback` for each.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} callback The function executed per own property.
   */
  function forOwn(object, callback) {
    for (var key in object) {
      if (hasOwnProperty.call(object, key)) {
        callback(object[key], key, object);
      }
    }
  }

  /**
   * Gets the internal `[[Class]]` of a value.
   *
   * @private
   * @param {*} value The value.
   * @returns {string} The `[[Class]]`.
   */
  function getClassOf(value) {
    return value == null
      ? capitalize(value)
      : toString.call(value).slice(8, -1);
  }

  /**
   * Host objects can return type values that are different from their actual
   * data type. The objects we are concerned with usually return non-primitive
   * types of "object", "function", or "unknown".
   *
   * @private
   * @param {*} object The owner of the property.
   * @param {string} property The property to check.
   * @returns {boolean} Returns `true` if the property value is a non-primitive, else `false`.
   */
  function isHostType(object, property) {
    var type = object != null ? typeof object[property] : 'number';
    return !/^(?:boolean|number|string|undefined)$/.test(type) &&
      (type == 'object' ? !!object[property] : true);
  }

  /**
   * Prepares a string for use in a `RegExp` by making hyphens and spaces optional.
   *
   * @private
   * @param {string} string The string to qualify.
   * @returns {string} The qualified string.
   */
  function qualify(string) {
    return String(string).replace(/([ -])(?!$)/g, '$1?');
  }

  /**
   * A bare-bones `Array#reduce` like utility function.
   *
   * @private
   * @param {Array} array The array to iterate over.
   * @param {Function} callback The function called per iteration.
   * @returns {*} The accumulated result.
   */
  function reduce(array, callback) {
    var accumulator = null;
    each(array, function(value, index) {
      accumulator = callback(accumulator, value, index, array);
    });
    return accumulator;
  }

  /**
   * Removes leading and trailing whitespace from a string.
   *
   * @private
   * @param {string} string The string to trim.
   * @returns {string} The trimmed string.
   */
  function trim(string) {
    return String(string).replace(/^ +| +$/g, '');
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a new platform object.
   *
   * @memberOf platform
   * @param {Object|string} [ua=navigator.userAgent] The user agent string or
   *  context object.
   * @returns {Object} A platform object.
   */
  function parse(ua) {

    /** The environment context object. */
    var context = root;

    /** Used to flag when a custom context is provided. */
    var isCustomContext = ua && typeof ua == 'object' && getClassOf(ua) != 'String';

    // Juggle arguments.
    if (isCustomContext) {
      context = ua;
      ua = null;
    }

    /** Browser navigator object. */
    var nav = context.navigator || {};

    /** Browser user agent string. */
    var userAgent = nav.userAgent || '';

    ua || (ua = userAgent);

    /** Used to flag when `thisBinding` is the [ModuleScope]. */
    var isModuleScope = isCustomContext || thisBinding == oldRoot;

    /** Used to detect if browser is like Chrome. */
    var likeChrome = isCustomContext
      ? !!nav.likeChrome
      : /\bChrome\b/.test(ua) && !/internal|\n/i.test(toString.toString());

    /** Internal `[[Class]]` value shortcuts. */
    var objectClass = 'Object',
        airRuntimeClass = isCustomContext ? objectClass : 'ScriptBridgingProxyObject',
        enviroClass = isCustomContext ? objectClass : 'Environment',
        javaClass = (isCustomContext && context.java) ? 'JavaPackage' : getClassOf(context.java),
        phantomClass = isCustomContext ? objectClass : 'RuntimeObject';

    /** Detect Java environments. */
    var java = /\bJava/.test(javaClass) && context.java;

    /** Detect Rhino. */
    var rhino = java && getClassOf(context.environment) == enviroClass;

    /** A character to represent alpha. */
    var alpha = java ? 'a' : '\u03b1';

    /** A character to represent beta. */
    var beta = java ? 'b' : '\u03b2';

    /** Browser document object. */
    var doc = context.document || {};

    /**
     * Detect Opera browser (Presto-based).
     * http://www.howtocreate.co.uk/operaStuff/operaObject.html
     * http://dev.opera.com/articles/view/opera-mini-web-content-authoring-guidelines/#operamini
     */
    var opera = context.operamini || context.opera;

    /** Opera `[[Class]]`. */
    var operaClass = reOpera.test(operaClass = (isCustomContext && opera) ? opera['[[Class]]'] : getClassOf(opera))
      ? operaClass
      : (opera = null);

    /*------------------------------------------------------------------------*/

    /** Temporary variable used over the script's lifetime. */
    var data;

    /** The CPU architecture. */
    var arch = ua;

    /** Platform description array. */
    var description = [];

    /** Platform alpha/beta indicator. */
    var prerelease = null;

    /** A flag to indicate that environment features should be used to resolve the platform. */
    var useFeatures = ua == userAgent;

    /** The browser/environment version. */
    var version = useFeatures && opera && typeof opera.version == 'function' && opera.version();

    /** A flag to indicate if the OS ends with "/ Version" */
    var isSpecialCasedOS;

    /* Detectable layout engines (order is important). */
    var layout = getLayout([
      { 'label': 'EdgeHTML', 'pattern': 'Edge' },
      'Trident',
      { 'label': 'WebKit', 'pattern': 'AppleWebKit' },
      'iCab',
      'Presto',
      'NetFront',
      'Tasman',
      'KHTML',
      'Gecko'
    ]);

    /* Detectable browser names (order is important). */
    var name = getName([
      'Adobe AIR',
      'Arora',
      'Avant Browser',
      'Breach',
      'Camino',
      'Electron',
      'Epiphany',
      'Fennec',
      'Flock',
      'Galeon',
      'GreenBrowser',
      'iCab',
      'Iceweasel',
      'K-Meleon',
      'Konqueror',
      'Lunascape',
      'Maxthon',
      { 'label': 'Microsoft Edge', 'pattern': 'Edge' },
      'Midori',
      'Nook Browser',
      'PaleMoon',
      'PhantomJS',
      'Raven',
      'Rekonq',
      'RockMelt',
      { 'label': 'Samsung Internet', 'pattern': 'SamsungBrowser' },
      'SeaMonkey',
      { 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Sleipnir',
      'SlimBrowser',
      { 'label': 'SRWare Iron', 'pattern': 'Iron' },
      'Sunrise',
      'Swiftfox',
      'Waterfox',
      'WebPositive',
      'Opera Mini',
      { 'label': 'Opera Mini', 'pattern': 'OPiOS' },
      'Opera',
      { 'label': 'Opera', 'pattern': 'OPR' },
      'Chrome',
      { 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },
      { 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },
      { 'label': 'Firefox for iOS', 'pattern': 'FxiOS' },
      { 'label': 'IE', 'pattern': 'IEMobile' },
      { 'label': 'IE', 'pattern': 'MSIE' },
      'Safari'
    ]);

    /* Detectable products (order is important). */
    var product = getProduct([
      { 'label': 'BlackBerry', 'pattern': 'BB10' },
      'BlackBerry',
      { 'label': 'Galaxy S', 'pattern': 'GT-I9000' },
      { 'label': 'Galaxy S2', 'pattern': 'GT-I9100' },
      { 'label': 'Galaxy S3', 'pattern': 'GT-I9300' },
      { 'label': 'Galaxy S4', 'pattern': 'GT-I9500' },
      { 'label': 'Galaxy S5', 'pattern': 'SM-G900' },
      { 'label': 'Galaxy S6', 'pattern': 'SM-G920' },
      { 'label': 'Galaxy S6 Edge', 'pattern': 'SM-G925' },
      { 'label': 'Galaxy S7', 'pattern': 'SM-G930' },
      { 'label': 'Galaxy S7 Edge', 'pattern': 'SM-G935' },
      'Google TV',
      'Lumia',
      'iPad',
      'iPod',
      'iPhone',
      'Kindle',
      { 'label': 'Kindle Fire', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
      'Nexus',
      'Nook',
      'PlayBook',
      'PlayStation Vita',
      'PlayStation',
      'TouchPad',
      'Transformer',
      { 'label': 'Wii U', 'pattern': 'WiiU' },
      'Wii',
      'Xbox One',
      { 'label': 'Xbox 360', 'pattern': 'Xbox' },
      'Xoom'
    ]);

    /* Detectable manufacturers. */
    var manufacturer = getManufacturer({
      'Apple': { 'iPad': 1, 'iPhone': 1, 'iPod': 1 },
      'Archos': {},
      'Amazon': { 'Kindle': 1, 'Kindle Fire': 1 },
      'Asus': { 'Transformer': 1 },
      'Barnes & Noble': { 'Nook': 1 },
      'BlackBerry': { 'PlayBook': 1 },
      'Google': { 'Google TV': 1, 'Nexus': 1 },
      'HP': { 'TouchPad': 1 },
      'HTC': {},
      'LG': {},
      'Microsoft': { 'Xbox': 1, 'Xbox One': 1 },
      'Motorola': { 'Xoom': 1 },
      'Nintendo': { 'Wii U': 1,  'Wii': 1 },
      'Nokia': { 'Lumia': 1 },
      'Samsung': { 'Galaxy S': 1, 'Galaxy S2': 1, 'Galaxy S3': 1, 'Galaxy S4': 1 },
      'Sony': { 'PlayStation': 1, 'PlayStation Vita': 1 }
    });

    /* Detectable operating systems (order is important). */
    var os = getOS([
      'Windows Phone',
      'Android',
      'CentOS',
      { 'label': 'Chrome OS', 'pattern': 'CrOS' },
      'Debian',
      'Fedora',
      'FreeBSD',
      'Gentoo',
      'Haiku',
      'Kubuntu',
      'Linux Mint',
      'OpenBSD',
      'Red Hat',
      'SuSE',
      'Ubuntu',
      'Xubuntu',
      'Cygwin',
      'Symbian OS',
      'hpwOS',
      'webOS ',
      'webOS',
      'Tablet OS',
      'Tizen',
      'Linux',
      'Mac OS X',
      'Macintosh',
      'Mac',
      'Windows 98;',
      'Windows '
    ]);

    /*------------------------------------------------------------------------*/

    /**
     * Picks the layout engine from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected layout engine.
     */
    function getLayout(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the manufacturer from an array of guesses.
     *
     * @private
     * @param {Array} guesses An object of guesses.
     * @returns {null|string} The detected manufacturer.
     */
    function getManufacturer(guesses) {
      return reduce(guesses, function(result, value, key) {
        // Lookup the manufacturer by product or scan the UA for the manufacturer.
        return result || (
          value[product] ||
          value[/^[a-z]+(?: +[a-z]+\b)*/i.exec(product)] ||
          RegExp('\\b' + qualify(key) + '(?:\\b|\\w*\\d)', 'i').exec(ua)
        ) && key;
      });
    }

    /**
     * Picks the browser name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected browser name.
     */
    function getName(guesses) {
      return reduce(guesses, function(result, guess) {
        return result || RegExp('\\b' + (
          guess.pattern || qualify(guess)
        ) + '\\b', 'i').exec(ua) && (guess.label || guess);
      });
    }

    /**
     * Picks the OS name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected OS name.
     */
    function getOS(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(ua)
            )) {
          result = cleanupOS(result, pattern, guess.label || guess);
        }
        return result;
      });
    }

    /**
     * Picks the product name from an array of guesses.
     *
     * @private
     * @param {Array} guesses An array of guesses.
     * @returns {null|string} The detected product name.
     */
    function getProduct(guesses) {
      return reduce(guesses, function(result, guess) {
        var pattern = guess.pattern || qualify(guess);
        if (!result && (result =
              RegExp('\\b' + pattern + ' *\\d+[.\\w_]*', 'i').exec(ua) ||
              RegExp('\\b' + pattern + ' *\\w+-[\\w]*', 'i').exec(ua) ||
              RegExp('\\b' + pattern + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)', 'i').exec(ua)
            )) {
          // Split by forward slash and append product version if needed.
          if ((result = String((guess.label && !RegExp(pattern, 'i').test(guess.label)) ? guess.label : result).split('/'))[1] && !/[\d.]+/.test(result[0])) {
            result[0] += ' ' + result[1];
          }
          // Correct character case and cleanup string.
          guess = guess.label || guess;
          result = format(result[0]
            .replace(RegExp(pattern, 'i'), guess)
            .replace(RegExp('; *(?:' + guess + '[_-])?', 'i'), ' ')
            .replace(RegExp('(' + guess + ')[-_.]?(\\w)', 'i'), '$1 $2'));
        }
        return result;
      });
    }

    /**
     * Resolves the version using an array of UA patterns.
     *
     * @private
     * @param {Array} patterns An array of UA patterns.
     * @returns {null|string} The detected version.
     */
    function getVersion(patterns) {
      return reduce(patterns, function(result, pattern) {
        return result || (RegExp(pattern +
          '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(ua) || 0)[1] || null;
      });
    }

    /**
     * Returns `platform.description` when the platform object is coerced to a string.
     *
     * @name toString
     * @memberOf platform
     * @returns {string} Returns `platform.description` if available, else an empty string.
     */
    function toStringPlatform() {
      return this.description || '';
    }

    /*------------------------------------------------------------------------*/

    // Convert layout to an array so we can add extra details.
    layout && (layout = [layout]);

    // Detect product names that contain their manufacturer's name.
    if (manufacturer && !product) {
      product = getProduct([manufacturer]);
    }
    // Clean up Google TV.
    if ((data = /\bGoogle TV\b/.exec(product))) {
      product = data[0];
    }
    // Detect simulators.
    if (/\bSimulator\b/i.test(ua)) {
      product = (product ? product + ' ' : '') + 'Simulator';
    }
    // Detect Opera Mini 8+ running in Turbo/Uncompressed mode on iOS.
    if (name == 'Opera Mini' && /\bOPiOS\b/.test(ua)) {
      description.push('running in Turbo/Uncompressed mode');
    }
    // Detect IE Mobile 11.
    if (name == 'IE' && /\blike iPhone OS\b/.test(ua)) {
      data = parse(ua.replace(/like iPhone OS/, ''));
      manufacturer = data.manufacturer;
      product = data.product;
    }
    // Detect iOS.
    else if (/^iP/.test(product)) {
      name || (name = 'Safari');
      os = 'iOS' + ((data = / OS ([\d_]+)/i.exec(ua))
        ? ' ' + data[1].replace(/_/g, '.')
        : '');
    }
    // Detect Kubuntu.
    else if (name == 'Konqueror' && !/buntu/i.test(os)) {
      os = 'Kubuntu';
    }
    // Detect Android browsers.
    else if ((manufacturer && manufacturer != 'Google' &&
        ((/Chrome/.test(name) && !/\bMobile Safari\b/i.test(ua)) || /\bVita\b/.test(product))) ||
        (/\bAndroid\b/.test(os) && /^Chrome/.test(name) && /\bVersion\//i.test(ua))) {
      name = 'Android Browser';
      os = /\bAndroid\b/.test(os) ? os : 'Android';
    }
    // Detect Silk desktop/accelerated modes.
    else if (name == 'Silk') {
      if (!/\bMobi/i.test(ua)) {
        os = 'Android';
        description.unshift('desktop mode');
      }
      if (/Accelerated *= *true/i.test(ua)) {
        description.unshift('accelerated');
      }
    }
    // Detect PaleMoon identifying as Firefox.
    else if (name == 'PaleMoon' && (data = /\bFirefox\/([\d.]+)\b/.exec(ua))) {
      description.push('identifying as Firefox ' + data[1]);
    }
    // Detect Firefox OS and products running Firefox.
    else if (name == 'Firefox' && (data = /\b(Mobile|Tablet|TV)\b/i.exec(ua))) {
      os || (os = 'Firefox OS');
      product || (product = data[1]);
    }
    // Detect false positives for Firefox/Safari.
    else if (!name || (data = !/\bMinefield\b/i.test(ua) && /\b(?:Firefox|Safari)\b/.exec(name))) {
      // Escape the `/` for Firefox 1.
      if (name && !product && /[\/,]|^[^(]+?\)/.test(ua.slice(ua.indexOf(data + '/') + 8))) {
        // Clear name of false positives.
        name = null;
      }
      // Reassign a generic name.
      if ((data = product || manufacturer || os) &&
          (product || manufacturer || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(os))) {
        name = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(os) ? os : data) + ' Browser';
      }
    }
    // Add Chrome version to description for Electron.
    else if (name == 'Electron' && (data = (/\bChrome\/([\d.]+)\b/.exec(ua) || 0)[1])) {
      description.push('Chromium ' + data);
    }
    // Detect non-Opera (Presto-based) versions (order is important).
    if (!version) {
      version = getVersion([
        '(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))',
        'Version',
        qualify(name),
        '(?:Firefox|Minefield|NetFront)'
      ]);
    }
    // Detect stubborn layout engines.
    if ((data =
          layout == 'iCab' && parseFloat(version) > 3 && 'WebKit' ||
          /\bOpera\b/.test(name) && (/\bOPR\b/.test(ua) ? 'Blink' : 'Presto') ||
          /\b(?:Midori|Nook|Safari)\b/i.test(ua) && !/^(?:Trident|EdgeHTML)$/.test(layout) && 'WebKit' ||
          !layout && /\bMSIE\b/i.test(ua) && (os == 'Mac OS' ? 'Tasman' : 'Trident') ||
          layout == 'WebKit' && /\bPlayStation\b(?! Vita\b)/i.test(name) && 'NetFront'
        )) {
      layout = [data];
    }
    // Detect Windows Phone 7 desktop mode.
    if (name == 'IE' && (data = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(ua) || 0)[1])) {
      name += ' Mobile';
      os = 'Windows Phone ' + (/\+$/.test(data) ? data : data + '.x');
      description.unshift('desktop mode');
    }
    // Detect Windows Phone 8.x desktop mode.
    else if (/\bWPDesktop\b/i.test(ua)) {
      name = 'IE Mobile';
      os = 'Windows Phone 8.x';
      description.unshift('desktop mode');
      version || (version = (/\brv:([\d.]+)/.exec(ua) || 0)[1]);
    }
    // Detect IE 11 identifying as other browsers.
    else if (name != 'IE' && layout == 'Trident' && (data = /\brv:([\d.]+)/.exec(ua))) {
      if (name) {
        description.push('identifying as ' + name + (version ? ' ' + version : ''));
      }
      name = 'IE';
      version = data[1];
    }
    // Leverage environment features.
    if (useFeatures) {
      // Detect server-side environments.
      // Rhino has a global function while others have a global object.
      if (isHostType(context, 'global')) {
        if (java) {
          data = java.lang.System;
          arch = data.getProperty('os.arch');
          os = os || data.getProperty('os.name') + ' ' + data.getProperty('os.version');
        }
        if (rhino) {
          try {
            version = context.require('ringo/engine').version.join('.');
            name = 'RingoJS';
          } catch(e) {
            if ((data = context.system) && data.global.system == context.system) {
              name = 'Narwhal';
              os || (os = data[0].os || null);
            }
          }
          if (!name) {
            name = 'Rhino';
          }
        }
        else if (
          typeof context.process == 'object' && !context.process.browser &&
          (data = context.process)
        ) {
          if (typeof data.versions == 'object') {
            if (typeof data.versions.electron == 'string') {
              description.push('Node ' + data.versions.node);
              name = 'Electron';
              version = data.versions.electron;
            } else if (typeof data.versions.nw == 'string') {
              description.push('Chromium ' + version, 'Node ' + data.versions.node);
              name = 'NW.js';
              version = data.versions.nw;
            }
          }
          if (!name) {
            name = 'Node.js';
            arch = data.arch;
            os = data.platform;
            version = /[\d.]+/.exec(data.version);
            version = version ? version[0] : null;
          }
        }
      }
      // Detect Adobe AIR.
      else if (getClassOf((data = context.runtime)) == airRuntimeClass) {
        name = 'Adobe AIR';
        os = data.flash.system.Capabilities.os;
      }
      // Detect PhantomJS.
      else if (getClassOf((data = context.phantom)) == phantomClass) {
        name = 'PhantomJS';
        version = (data = data.version || null) && (data.major + '.' + data.minor + '.' + data.patch);
      }
      // Detect IE compatibility modes.
      else if (typeof doc.documentMode == 'number' && (data = /\bTrident\/(\d+)/i.exec(ua))) {
        // We're in compatibility mode when the Trident version + 4 doesn't
        // equal the document mode.
        version = [version, doc.documentMode];
        if ((data = +data[1] + 4) != version[1]) {
          description.push('IE ' + version[1] + ' mode');
          layout && (layout[1] = '');
          version[1] = data;
        }
        version = name == 'IE' ? String(version[1].toFixed(1)) : version[0];
      }
      // Detect IE 11 masking as other browsers.
      else if (typeof doc.documentMode == 'number' && /^(?:Chrome|Firefox)\b/.test(name)) {
        description.push('masking as ' + name + ' ' + version);
        name = 'IE';
        version = '11.0';
        layout = ['Trident'];
        os = 'Windows';
      }
      os = os && format(os);
    }
    // Detect prerelease phases.
    if (version && (data =
          /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(version) ||
          /(?:alpha|beta)(?: ?\d)?/i.exec(ua + ';' + (useFeatures && nav.appMinorVersion)) ||
          /\bMinefield\b/i.test(ua) && 'a'
        )) {
      prerelease = /b/i.test(data) ? 'beta' : 'alpha';
      version = version.replace(RegExp(data + '\\+?$'), '') +
        (prerelease == 'beta' ? beta : alpha) + (/\d+\+?/.exec(data) || '');
    }
    // Detect Firefox Mobile.
    if (name == 'Fennec' || name == 'Firefox' && /\b(?:Android|Firefox OS)\b/.test(os)) {
      name = 'Firefox Mobile';
    }
    // Obscure Maxthon's unreliable version.
    else if (name == 'Maxthon' && version) {
      version = version.replace(/\.[\d.]+/, '.x');
    }
    // Detect Xbox 360 and Xbox One.
    else if (/\bXbox\b/i.test(product)) {
      if (product == 'Xbox 360') {
        os = null;
      }
      if (product == 'Xbox 360' && /\bIEMobile\b/.test(ua)) {
        description.unshift('mobile mode');
      }
    }
    // Add mobile postfix.
    else if ((/^(?:Chrome|IE|Opera)$/.test(name) || name && !product && !/Browser|Mobi/.test(name)) &&
        (os == 'Windows CE' || /Mobi/i.test(ua))) {
      name += ' Mobile';
    }
    // Detect IE platform preview.
    else if (name == 'IE' && useFeatures) {
      try {
        if (context.external === null) {
          description.unshift('platform preview');
        }
      } catch(e) {
        description.unshift('embedded');
      }
    }
    // Detect BlackBerry OS version.
    // http://docs.blackberry.com/en/developers/deliverables/18169/HTTP_headers_sent_by_BB_Browser_1234911_11.jsp
    else if ((/\bBlackBerry\b/.test(product) || /\bBB10\b/.test(ua)) && (data =
          (RegExp(product.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(ua) || 0)[1] ||
          version
        )) {
      data = [data, /BB10/.test(ua)];
      os = (data[1] ? (product = null, manufacturer = 'BlackBerry') : 'Device Software') + ' ' + data[0];
      version = null;
    }
    // Detect Opera identifying/masking itself as another browser.
    // http://www.opera.com/support/kb/view/843/
    else if (this != forOwn && product != 'Wii' && (
          (useFeatures && opera) ||
          (/Opera/.test(name) && /\b(?:MSIE|Firefox)\b/i.test(ua)) ||
          (name == 'Firefox' && /\bOS X (?:\d+\.){2,}/.test(os)) ||
          (name == 'IE' && (
            (os && !/^Win/.test(os) && version > 5.5) ||
            /\bWindows XP\b/.test(os) && version > 8 ||
            version == 8 && !/\bTrident\b/.test(ua)
          ))
        ) && !reOpera.test((data = parse.call(forOwn, ua.replace(reOpera, '') + ';'))) && data.name) {
      // When "identifying", the UA contains both Opera and the other browser's name.
      data = 'ing as ' + data.name + ((data = data.version) ? ' ' + data : '');
      if (reOpera.test(name)) {
        if (/\bIE\b/.test(data) && os == 'Mac OS') {
          os = null;
        }
        data = 'identify' + data;
      }
      // When "masking", the UA contains only the other browser's name.
      else {
        data = 'mask' + data;
        if (operaClass) {
          name = format(operaClass.replace(/([a-z])([A-Z])/g, '$1 $2'));
        } else {
          name = 'Opera';
        }
        if (/\bIE\b/.test(data)) {
          os = null;
        }
        if (!useFeatures) {
          version = null;
        }
      }
      layout = ['Presto'];
      description.push(data);
    }
    // Detect WebKit Nightly and approximate Chrome/Safari versions.
    if ((data = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
      // Correct build number for numeric comparison.
      // (e.g. "532.5" becomes "532.05")
      data = [parseFloat(data.replace(/\.(\d)$/, '.0$1')), data];
      // Nightly builds are postfixed with a "+".
      if (name == 'Safari' && data[1].slice(-1) == '+') {
        name = 'WebKit Nightly';
        prerelease = 'alpha';
        version = data[1].slice(0, -1);
      }
      // Clear incorrect browser versions.
      else if (version == data[1] ||
          version == (data[2] = (/\bSafari\/([\d.]+\+?)/i.exec(ua) || 0)[1])) {
        version = null;
      }
      // Use the full Chrome version when available.
      data[1] = (/\bChrome\/([\d.]+)/i.exec(ua) || 0)[1];
      // Detect Blink layout engine.
      if (data[0] == 537.36 && data[2] == 537.36 && parseFloat(data[1]) >= 28 && layout == 'WebKit') {
        layout = ['Blink'];
      }
      // Detect JavaScriptCore.
      // http://stackoverflow.com/questions/6768474/how-can-i-detect-which-javascript-engine-v8-or-jsc-is-used-at-runtime-in-androi
      if (!useFeatures || (!likeChrome && !data[1])) {
        layout && (layout[1] = 'like Safari');
        data = (data = data[0], data < 400 ? 1 : data < 500 ? 2 : data < 526 ? 3 : data < 533 ? 4 : data < 534 ? '4+' : data < 535 ? 5 : data < 537 ? 6 : data < 538 ? 7 : data < 601 ? 8 : '8');
      } else {
        layout && (layout[1] = 'like Chrome');
        data = data[1] || (data = data[0], data < 530 ? 1 : data < 532 ? 2 : data < 532.05 ? 3 : data < 533 ? 4 : data < 534.03 ? 5 : data < 534.07 ? 6 : data < 534.10 ? 7 : data < 534.13 ? 8 : data < 534.16 ? 9 : data < 534.24 ? 10 : data < 534.30 ? 11 : data < 535.01 ? 12 : data < 535.02 ? '13+' : data < 535.07 ? 15 : data < 535.11 ? 16 : data < 535.19 ? 17 : data < 536.05 ? 18 : data < 536.10 ? 19 : data < 537.01 ? 20 : data < 537.11 ? '21+' : data < 537.13 ? 23 : data < 537.18 ? 24 : data < 537.24 ? 25 : data < 537.36 ? 26 : layout != 'Blink' ? '27' : '28');
      }
      // Add the postfix of ".x" or "+" for approximate versions.
      layout && (layout[1] += ' ' + (data += typeof data == 'number' ? '.x' : /[.+]/.test(data) ? '' : '+'));
      // Obscure version for some Safari 1-2 releases.
      if (name == 'Safari' && (!version || parseInt(version) > 45)) {
        version = data;
      }
    }
    // Detect Opera desktop modes.
    if (name == 'Opera' &&  (data = /\bzbov|zvav$/.exec(os))) {
      name += ' ';
      description.unshift('desktop mode');
      if (data == 'zvav') {
        name += 'Mini';
        version = null;
      } else {
        name += 'Mobile';
      }
      os = os.replace(RegExp(' *' + data + '$'), '');
    }
    // Detect Chrome desktop mode.
    else if (name == 'Safari' && /\bChrome\b/.exec(layout && layout[1])) {
      description.unshift('desktop mode');
      name = 'Chrome Mobile';
      version = null;

      if (/\bOS X\b/.test(os)) {
        manufacturer = 'Apple';
        os = 'iOS 4.3+';
      } else {
        os = null;
      }
    }
    // Strip incorrect OS versions.
    if (version && version.indexOf((data = /[\d.]+$/.exec(os))) == 0 &&
        ua.indexOf('/' + data + '-') > -1) {
      os = trim(os.replace(data, ''));
    }
    // Add layout engine.
    if (layout && !/\b(?:Avant|Nook)\b/.test(name) && (
        /Browser|Lunascape|Maxthon/.test(name) ||
        name != 'Safari' && /^iOS/.test(os) && /\bSafari\b/.test(layout[1]) ||
        /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(name) && layout[1])) {
      // Don't add layout details to description if they are falsey.
      (data = layout[layout.length - 1]) && description.push(data);
    }
    // Combine contextual information.
    if (description.length) {
      description = ['(' + description.join('; ') + ')'];
    }
    // Append manufacturer to description.
    if (manufacturer && product && product.indexOf(manufacturer) < 0) {
      description.push('on ' + manufacturer);
    }
    // Append product to description.
    if (product) {
      description.push((/^on /.test(description[description.length - 1]) ? '' : 'on ') + product);
    }
    // Parse the OS into an object.
    if (os) {
      data = / ([\d.+]+)$/.exec(os);
      isSpecialCasedOS = data && os.charAt(os.length - data[0].length - 1) == '/';
      os = {
        'architecture': 32,
        'family': (data && !isSpecialCasedOS) ? os.replace(data[0], '') : os,
        'version': data ? data[1] : null,
        'toString': function() {
          var version = this.version;
          return this.family + ((version && !isSpecialCasedOS) ? ' ' + version : '') + (this.architecture == 64 ? ' 64-bit' : '');
        }
      };
    }
    // Add browser/OS architecture.
    if ((data = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(arch)) && !/\bi686\b/i.test(arch)) {
      if (os) {
        os.architecture = 64;
        os.family = os.family.replace(RegExp(' *' + data), '');
      }
      if (
          name && (/\bWOW64\b/i.test(ua) ||
          (useFeatures && /\w(?:86|32)$/.test(nav.cpuClass || nav.platform) && !/\bWin64; x64\b/i.test(ua)))
      ) {
        description.unshift('32-bit');
      }
    }
    // Chrome 39 and above on OS X is always 64-bit.
    else if (
        os && /^OS X/.test(os.family) &&
        name == 'Chrome' && parseFloat(version) >= 39
    ) {
      os.architecture = 64;
    }

    ua || (ua = null);

    /*------------------------------------------------------------------------*/

    /**
     * The platform object.
     *
     * @name platform
     * @type Object
     */
    var platform = {};

    /**
     * The platform description.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.description = ua;

    /**
     * The name of the browser's layout engine.
     *
     * The list of common layout engines include:
     * "Blink", "EdgeHTML", "Gecko", "Trident" and "WebKit"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.layout = layout && layout[0];

    /**
     * The name of the product's manufacturer.
     *
     * The list of manufacturers include:
     * "Apple", "Archos", "Amazon", "Asus", "Barnes & Noble", "BlackBerry",
     * "Google", "HP", "HTC", "LG", "Microsoft", "Motorola", "Nintendo",
     * "Nokia", "Samsung" and "Sony"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.manufacturer = manufacturer;

    /**
     * The name of the browser/environment.
     *
     * The list of common browser names include:
     * "Chrome", "Electron", "Firefox", "Firefox for iOS", "IE",
     * "Microsoft Edge", "PhantomJS", "Safari", "SeaMonkey", "Silk",
     * "Opera Mini" and "Opera"
     *
     * Mobile versions of some browsers have "Mobile" appended to their name:
     * eg. "Chrome Mobile", "Firefox Mobile", "IE Mobile" and "Opera Mobile"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.name = name;

    /**
     * The alpha/beta release indicator.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.prerelease = prerelease;

    /**
     * The name of the product hosting the browser.
     *
     * The list of common products include:
     *
     * "BlackBerry", "Galaxy S4", "Lumia", "iPad", "iPod", "iPhone", "Kindle",
     * "Kindle Fire", "Nexus", "Nook", "PlayBook", "TouchPad" and "Transformer"
     *
     * @memberOf platform
     * @type string|null
     */
    platform.product = product;

    /**
     * The browser's user agent string.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.ua = ua;

    /**
     * The browser/environment version.
     *
     * @memberOf platform
     * @type string|null
     */
    platform.version = name && version;

    /**
     * The name of the operating system.
     *
     * @memberOf platform
     * @type Object
     */
    platform.os = os || {

      /**
       * The CPU architecture the OS is built for.
       *
       * @memberOf platform.os
       * @type number|null
       */
      'architecture': null,

      /**
       * The family of the OS.
       *
       * Common values include:
       * "Windows", "Windows Server 2008 R2 / 7", "Windows Server 2008 / Vista",
       * "Windows XP", "OS X", "Ubuntu", "Debian", "Fedora", "Red Hat", "SuSE",
       * "Android", "iOS" and "Windows Phone"
       *
       * @memberOf platform.os
       * @type string|null
       */
      'family': null,

      /**
       * The version of the OS.
       *
       * @memberOf platform.os
       * @type string|null
       */
      'version': null,

      /**
       * Returns the OS string.
       *
       * @memberOf platform.os
       * @returns {string} The OS string.
       */
      'toString': function() { return 'null'; }
    };

    platform.parse = parse;
    platform.toString = toStringPlatform;

    if (platform.version) {
      description.unshift(version);
    }
    if (platform.name) {
      description.unshift(name);
    }
    if (os && name && !(os == String(os).split(' ')[0] && (os == name.split(' ')[0] || product))) {
      description.push(product ? '(' + os + ')' : 'on ' + os);
    }
    if (description.length) {
      platform.description = description.join(' ');
    }
    return platform;
  }

  /*--------------------------------------------------------------------------*/

  // Export platform.
  var platform = parse();

  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose platform on the global object to prevent errors when platform is
    // loaded by a script tag in the presence of an AMD loader.
    // See http://requirejs.org/docs/errors.html#mismatch for more details.
    root.platform = platform;

    // Define as an anonymous module so platform can be aliased through path mapping.
    define(function() {
      return platform;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
    // Export for CommonJS support.
    forOwn(platform, function(value, key) {
      freeExports[key] = value;
    });
  }
  else {
    // Export to the global object.
    root.platform = platform;
  }
}.call(this));


function buildIOSMeta(){

    var aMetaTags = [
        { name : "viewport",
          content : 'width=device-width, height=device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no'},
        { name: 'apple-mobile-web-app-capable',
          content: 'yes'},
        { name: 'apple-mobile-web-app-status-bar-style',
          content: 'black'}      
    ];
    
    for( var i = 0; i < aMetaTags.length; i++ ){
        var oNewMeta = document.createElement('meta');
        oNewMeta.name = aMetaTags[i].name;
        oNewMeta.content = aMetaTags[i].content;

        var oOldMeta = window.document.head.querySelector('meta[name="'+oNewMeta.name+'"]');
        if (oOldMeta) {
            oOldMeta.parentNode.removeChild(oOldMeta);
        }
        window.document.head.appendChild(oNewMeta);           
    }
  
};

function hideIOSFullscreenPanel(){   
    jQuery(".xxx-ios-fullscreen-message").css("display","none");
    jQuery(".xxx-ios-fullscreen-scroll").css("display","none");

    jQuery(".xxx-game-iframe-full").removeClass("xxx-game-iframe-iphone-se");
};

function buildIOSFullscreenPanel(){   
    var html = '';

    html += '<div class="xxx-ios-fullscreen-message">';
        html += '<div class="xxx-ios-fullscreen-swipe">';
        html += '</div>';    
    html += '</div>';

    html += '<div class="xxx-ios-fullscreen-scroll">';
    html += '</div>';    

    jQuery("body").append(html);    
};

function showIOSFullscreenPanel(){   
    jQuery(".xxx-ios-fullscreen-message").css("display","block");
    jQuery(".xxx-ios-fullscreen-scroll").css("display","block");
};

function __iosResize(){

    window.scrollTo(0, 0);

	console.log(window.devicePixelRatio);
	console.log(window.innerWidth);
	console.log(window.innerHeight);

    if( platform.product === "iPhone" ){
        switch(window.devicePixelRatio){
            case 2:{
                switch(window.innerWidth){
                    case 568:{
                        //console.log("iPhone 5/5s/5c/se"); 
                        if( window.innerHeight === 320 ){
                            //console.log("fullscreen");   
                            //this.hideIOSFullscreenPanel();
                        }else{                         
                            jQuery(".xxx-game-iframe-full").addClass("xxx-game-iframe-iphone-se");
                            //console.log("windowed"); 
                           // this.showIOSFullscreenPanel();
                        } 
                    }break;
                    case 667:{
                        //console.log("iPhone 6/6s/7/8"); 
                        if( window.innerHeight === 375 ){
                          //  console.log("fullscreen");   
                            hideIOSFullscreenPanel();
                        }else{
                            //console.log("windowed"); 
                            showIOSFullscreenPanel();
                        }                      
                    }break;
                    case 808:{
                         //console.log("iPhone Xr"); 
                        if( window.innerHeight === 414 ){
                            hideIOSFullscreenPanel();
                        }else{
                            showIOSFullscreenPanel();
                        }                     	
                    }break;
                    default:{
                        hideIOSFullscreenPanel();
                    }
                }
            }break;
            case 3:{
                switch(window.innerWidth){
                    case 736:{ 
                        //console.log("iPhone 6/6s/7/8 plus");    
                        if( window.innerHeight === 414 ){
                          //  console.log("fullscreen");   
                            hideIOSFullscreenPanel();
                        }else{
                            showIOSFullscreenPanel();
                        }                            
                    }break;
                    // iphone X
                    case 724:{    
                      //  console.log("iPhone X/Xs"); 
                        if( window.innerHeight === 375 ){
                            hideIOSFullscreenPanel();
                        }else{
                            showIOSFullscreenPanel();
                        }                          
                    }break; 
                    case 808:{
                         //console.log("iPhone Xs Max"); 
                        if( window.innerHeight === 414 ){
                            hideIOSFullscreenPanel();
                        }else{
                            showIOSFullscreenPanel();
                        }                     	
                    }break;                         
                    default:{
                        hideIOSFullscreenPanel();
                    }                
                }                    
            }break;
            default:{
                hideIOSFullscreenPanel();
            }            
        }
    }   
};

function iosResize(){
    __iosResize();

    setTimeout(function(){
        __iosResize();
    },500);
};

function iosInIframe() {
   try {
       return window.self !== window.top;
   } catch (e) {
       return true;
   }
}

function isIOSLessThen13(){
    var oOs = platform.os;
    var szFamily = oOs.family.toLowerCase();
    var iVersion = parseFloat( oOs.version );

    if(szFamily === "ios"){
        if(iVersion < 13){
            return true;
        }
    }
    return false;
}
    
$(document).ready(function () {
    if(platform && 
       platform.product === "iPhone" && 
       platform.name.toLowerCase() === "safari" &&
       ////AND < ver 13
            isIOSLessThen13() &&
       
       !iosInIframe()){
        buildIOSFullscreenPanel();
        buildIOSMeta();     
    } 
});

jQuery(window).resize(function() {

    if(platform && 
       platform.product === "iPhone"  && 
       platform.name.toLowerCase() === "safari" &&
       ////AND < ver 13
			isIOSLessThen13() &&
               
       !iosInIframe()){
        iosResize();   
    }        
}); 

var s_iOffsetX;
var s_iOffsetY;
var s_bIsIphone = false;
var s_bFocus = true;

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 * jQuery.browser.mobile will be true if the browser is a mobile device
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

$(window).resize(function() {
	sizeHandler();
});

function trace(szMsg){
    console.log(szMsg);
}

function getSize(Name) {
       var size;
       var name = Name.toLowerCase();
       var document = window.document;
       var documentElement = document.documentElement;
       if (window["inner" + Name] === undefined) {
               // IE6 & IE7 don't have window.innerWidth or innerHeight
               size = documentElement["client" + Name];
       }
       else if (window["inner" + Name] != documentElement["client" + Name]) {
               // WebKit doesn't include scrollbars while calculating viewport size so we have to get fancy

               // Insert markup to test if a media query will match document.doumentElement["client" + Name]
               var bodyElement = document.createElement("body");
               bodyElement.id = "vpw-test-b";
               bodyElement.style.cssText = "overflow:scroll";
               var divElement = document.createElement("div");
               divElement.id = "vpw-test-d";
               divElement.style.cssText = "position:absolute;top:-1000px";
               // Getting specific on the CSS selector so it won't get overridden easily
               divElement.innerHTML = "<style>@media(" + name + ":" + documentElement["client" + Name] + "px){body#vpw-test-b div#vpw-test-d{" + name + ":7px!important}}</style>";
               bodyElement.appendChild(divElement);
               documentElement.insertBefore(bodyElement, document.head);

               if (divElement["offset" + Name] == 7) {
                       // Media query matches document.documentElement["client" + Name]
                       size = documentElement["client" + Name];
               }
               else {
                       // Media query didn't match, use window["inner" + Name]
                       size = window["inner" + Name];
               }
               // Cleanup
               documentElement.removeChild(bodyElement);
       }
       else {
               // Default to use window["inner" + Name]
               size = window["inner" + Name];
       }
       return size;
};


window.addEventListener("orientationchange", onOrientationChange );


function onOrientationChange(){
    if (window.matchMedia("(orientation: portrait)").matches) {
       // you're in PORTRAIT mode	   
	   sizeHandler();
    }

    if (window.matchMedia("(orientation: landscape)").matches) {
       // you're in LANDSCAPE mode   
	   sizeHandler();
    }
}

function isChrome(){
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    return isChrome;
}

function isMobile(){
    if(isIpad()){
        return true;
    }
    
    return jQuery.browser.mobile;
}


function isIpad() {
    var isIpad = navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;

    if (!isIpad && navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
        return true;
    }

    return isIpad;
}

function isIOS() {
    var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod' 
    ]; 
    
    while (iDevices.length) {
        if (navigator.platform === iDevices.pop()){
            s_bIsIphone = true;
            return true; 
        } 
    } 
    s_bIsIphone = false;
    return false; 
}

function getIOSWindowHeight() {
    // Get zoom level of mobile Safari
    // Note, that such zoom detection might not work correctly in other browsers
    // We use width, instead of height, because there are no vertical toolbars :)
    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;

    // window.innerHeight returns height of the visible area. 
    // We multiply it by zoom and get out real height.
    return window.innerHeight * zoomLevel;
};

// You can also get height of the toolbars that are currently displayed
function getHeightOfIOSToolbars() {
    var tH = (window.orientation === 0 ? screen.height : screen.width) -  getIOSWindowHeight();
    return tH > 1 ? tH : 0;
};

function _checkOrientation(iWidth,iHeight){
    if(s_bMobile && ENABLE_CHECK_ORIENTATION){
        if( iWidth>iHeight ){ 
            if( $(".orientation-msg-container").attr("data-orientation") === "landscape" ){
                $(".orientation-msg-container").css("display","none");
                s_oMain.startUpdate();
            }else{
                $(".orientation-msg-container").css("display","block");
                s_oMain.stopUpdate();
            }  
        }else{
            if( $(".orientation-msg-container").attr("data-orientation") === "portrait" ){
                $(".orientation-msg-container").css("display","none");
                s_oMain.startUpdate();
            }else{
                $(".orientation-msg-container").css("display","block");
                s_oMain.stopUpdate();
            }   
        }
    }
}

//THIS FUNCTION MANAGES THE CANVAS SCALING TO FIT PROPORTIONALLY THE GAME TO THE CURRENT DEVICE RESOLUTION
function sizeHandler() {
	window.scrollTo(0, 1);

	if (!$("#canvas")){
		return;
	} 

	var h;
        if(platform.name !== null && platform.name.toLowerCase() === "safari"){
            h = getIOSWindowHeight();
        }else{ 
            h = getSize("Height");
        }
        
        var w = getSize("Width");
        
        if(s_bFocus){
            _checkOrientation(w,h);
        }
        
	var multiplier = Math.min((h / CANVAS_HEIGHT), (w / CANVAS_WIDTH));

	var destW = Math.round(CANVAS_WIDTH * multiplier);
	var destH = Math.round(CANVAS_HEIGHT * multiplier);
        
        var iAdd = 0;
        if (destH < h){
            iAdd = h-destH;
            destH += iAdd;
            destW += iAdd*(CANVAS_WIDTH/CANVAS_HEIGHT);
        }else  if (destW < w){
            iAdd = w-destW;
            destW += iAdd;
            destH += iAdd*(CANVAS_HEIGHT/CANVAS_WIDTH);
        }

        if(w>h){
                s_bLandscape = true;
               
	}else{
                s_bLandscape = false;
	}
        

        var fOffsetY = ((h / 2) - (destH / 2));
        var fOffsetX = ((w / 2) - (destW / 2));
        var fGameInverseScaling = (CANVAS_WIDTH/destW);

        if( fOffsetX*fGameInverseScaling < -EDGEBOARD_X ||  
            fOffsetY*fGameInverseScaling < -EDGEBOARD_Y ){
            multiplier = Math.min( h / (CANVAS_HEIGHT-(EDGEBOARD_Y*2)), w / (CANVAS_WIDTH-(EDGEBOARD_X*2)));
            destW = Math.round(CANVAS_WIDTH * multiplier);
            destH = Math.round(CANVAS_HEIGHT * multiplier);
            fOffsetY = ( h - destH ) / 2;
            fOffsetX = ( w - destW ) / 2;
            
            fGameInverseScaling = (CANVAS_WIDTH/destW);
        }

        s_iOffsetX = (-1*fOffsetX * fGameInverseScaling);
        s_iOffsetY = (-1*fOffsetY * fGameInverseScaling);
  
        if(fOffsetY >= 0 ){
            s_iOffsetY = 0;
        }
        
        if(fOffsetX >= 0 ){
            s_iOffsetX = 0;
        }
        
        if(s_oGame !== null){
            s_oGame.refreshButtonPos( s_iOffsetX,s_iOffsetY);
        }
        if(s_oMenu !== null){
            s_oMenu.refreshButtonPos( s_iOffsetX,s_iOffsetY);
        }

        $("#canvas").css("width",destW+"px");
        $("#canvas").css("height",destH+"px");
        
        if(fOffsetY < 0){
            $("#canvas").css("top",fOffsetY+"px");
        }else{
            fOffsetY = (h - destH)/2;
            $("#canvas").css("top",fOffsetY+"px");
        }
        
        $("#canvas").css("left",fOffsetX+"px");
        fullscreenHandler();
};

function playSound(szSound,iVolume,bLoop){
    if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){

        s_aSounds[szSound].play();
        s_aSounds[szSound].volume(iVolume);
        s_aSounds[szSound].loop(bLoop);


        return s_aSounds[szSound];
    }
    return null;
}

function stopSound(szSound){
    if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        s_aSounds[szSound].stop();
    }
}   

function setVolume(szSound, iVolume){
    if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        s_aSounds[szSound].volume(iVolume);
    }
}  

function setMute(szSound, bMute){
    if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
        s_aSounds[szSound].mute(bMute);
    }
}

function createBitmap(oSprite, iWidth, iHeight){
	var oBmp = new createjs.Bitmap(oSprite);
	var hitObject = new createjs.Shape();
	
	if (iWidth && iHeight){
		hitObject .graphics.beginFill("#fff").drawRect(0, 0, iWidth, iHeight);
	}else{
		hitObject .graphics.beginFill("#ff0").drawRect(0, 0, oSprite.width, oSprite.height);
	}

	oBmp.hitArea = hitObject;

	return oBmp;
}

function createSprite(oSpriteSheet, szState, iRegX,iRegY,iWidth, iHeight){
	if(szState !== null){
		var oRetSprite = new createjs.Sprite(oSpriteSheet, szState);
	}else{
		var oRetSprite = new createjs.Sprite(oSpriteSheet);
	}
	
	var hitObject = new createjs.Shape();
	hitObject .graphics.beginFill("#000000").drawRect(-iRegX, -iRegY, iWidth, iHeight);

	oRetSprite.hitArea = hitObject;
	
	return oRetSprite;
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function randomFloatBetween(minValue,maxValue,precision){
    if(typeof(precision) === 'undefined'){
        precision = 2;
    }
    return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue).toFixed(precision));
}

function rotateVector2D( iAngle, v) { 
	var iX = v.getX() * Math.cos( iAngle ) + v.getY() * Math.sin( iAngle );
	var iY = v.getX() * (-Math.sin( iAngle )) + v.getY() * Math.cos( iAngle ); 
	v.set( iX, iY );
}

function tweenVectorsOnX( vStart, vEnd, iLerp ){
    var iNewX = vStart + iLerp *( vEnd-vStart);
    return iNewX;
}

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

Array.prototype.sortOn = function(){ 
        var dup = this.slice();
        if(!arguments.length) return dup.sort();
        var args = Array.prototype.slice.call(arguments);
        return dup.sort(function(a,b){
          var props = args.slice();
          var prop = props.shift();
          while(a[prop] == b[prop] && props.length) prop = props.shift();
          return a[prop] == b[prop] ? 0 : a[prop] > b[prop] ? 1 : -1;
        });
}

function bubbleSort(a)
{
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}

function compare(a,b) {
  if (a.index > b.index)
     return -1;
  if (a.index < b.index)
    return 1;
  return 0;
}

//----------------------
		// Linear	
		/**
		 * Interpolates a value between b and c parameters
		 * <p></br><b>Note:</b></br>
		 * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
		 *
		 * @param t Elapsed time
		 * @param b Initial position
		 * @param c Final position
		 * @param d Duration
		 * @return A value between b and c parameters
		 */

function easeLinear (t, b, c, d){
			return c*t/d + b;
}

//----------------------
		// Quad		
		/**
		 * Interpolates a value between b and c parameters
		 * <p></br><b>Note:</b></br>
		 * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
		 *
		 * @param t Elapsed time
		 * @param b Initial position
		 * @param c Final position
		 * @param d Duration
		 * @return A value between b and c parameters
		 */	

function easeInQuad (t, b, c, d){
			return c*(t/=d)*t + b;
		}
//----------------------
		// Sine	
		/**
		 * Interpolates a value between b and c parameters
		 * <p></br><b>Note:</b></br>
		 * &nbsp&nbsp&nbspt and d parameters can be in frames or seconds/milliseconds
		 *
		 * @param t Elapsed time
		 * @param b Initial position
		 * @param c Final position
		 * @param d Duration
		 * @return A value between b and c parameters
		 */	                
                
function easeInSine (t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		}
                
                
                
function easeInCubic (t, b, c, d) {
			return c*(t/=d)*t*t + b;
		};                


function getTrajectoryPoint(t,p){
    var result = new createjs.Point();
    var oneMinusTSq = (1-t) * (1-t);
    var TSq = t*t;
    result.x = oneMinusTSq*p.start.x+2*(1-t)*t*p.traj.x+TSq*p.end.x;
    result.y = oneMinusTSq*p.start.y+2*(1-t)*t*p.traj.y+TSq*p.end.y;
    return result;
}

function formatTime(iTime){	
    iTime/=1000;
    var iMins = Math.floor(iTime/60);
    var iSecs = iTime-(iMins*60);
    iSecs = parseFloat(iSecs).toFixed(1)
    
    var szRet = "";

    if ( iMins < 10 ){
            szRet += "0" + iMins + ":";
    }else{
            szRet += iMins + ":";
    }

    if ( iSecs < 10 ){
            szRet += "0" + iSecs;
    }else{
            szRet += iSecs;
    }	

    return szRet;
}

function degreesToRadians(iAngle){
    return iAngle * Math.PI / 180;
}

function radiantsToDegrees(fRad){
    return fRad * 180 / Math.PI;
}

function checkRectCollision(bitmap1,bitmap2) {
    var b1, b2;
    b1 = getBounds(bitmap1,0.9);
    b2 = getBounds(bitmap2,0.98);
    return calculateIntersection(b1,b2);
}

function calculateIntersection(rect1, rect2){
    // first we have to calculate the
    // center of each rectangle and half of
    // width and height
    var dx, dy, r1={}, r2={};
    r1.cx = rect1.x + (r1.hw = (rect1.width /2));
    r1.cy = rect1.y + (r1.hh = (rect1.height/2));
    r2.cx = rect2.x + (r2.hw = (rect2.width /2));
    r2.cy = rect2.y + (r2.hh = (rect2.height/2));

    dx = Math.abs(r1.cx-r2.cx) - (r1.hw + r2.hw);
    dy = Math.abs(r1.cy-r2.cy) - (r1.hh + r2.hh);

    if (dx < 0 && dy < 0) {
      dx = Math.min(Math.min(rect1.width,rect2.width),-dx);
      dy = Math.min(Math.min(rect1.height,rect2.height),-dy);
      return {x:Math.max(rect1.x,rect2.x),
              y:Math.max(rect1.y,rect2.y),
              width:dx,
              height:dy,
              rect1: rect1,
              rect2: rect2};
    } else {
      return null;
    }
}

function transformRotationRectPoint(pDim,pCenter, iAngle){
    var oTopRight= {x:0, y:0};
    //TOP RIGHT VERTEX:
    oTopRight.x = pCenter.x + ((pDim.width / 2) * Math.cos(iAngle)) - ((pDim.height / 2) * Math.sin(iAngle))
    oTopRight.y = pCenter.y + ((pDim.width / 2) * Math.sin(iAngle)) + ((pDim.height / 2) * Math.cos(iAngle))

    var oTopLeft= {x:0, y:0};
    //TOP LEFT VERTEX:
    oTopLeft.x = pCenter.x - ((pDim.width / 2) * Math.cos(iAngle)) - ((pDim.height / 2) * Math.sin(iAngle))
    oTopLeft.y = pCenter.y - ((pDim.width / 2) * Math.sin(iAngle)) + ((pDim.height / 2) * Math.cos(iAngle))

    var oBotLeft= {x:0, y:0};
   // BOTTOM LEFT VERTEX:
    oBotLeft.x = pCenter.x - ((pDim.width / 2) * Math.cos(iAngle)) + ((pDim.height / 2) * Math.sin(iAngle))
    oBotLeft.y = pCenter.y - ((pDim.width / 2) * Math.sin(iAngle)) - ((pDim.height / 2) * Math.cos(iAngle))

    var oBotRight= {x:0, y:0};
   // BOTTOM RIGHT VERTEX:
    oBotRight.x = pCenter.x + ((pDim.width / 2) * Math.cos(iAngle)) + ((pDim.height / 2) * Math.sin(iAngle))
    oBotRight.y = pCenter.y + ((pDim.width / 2) * Math.sin(iAngle)) - ((pDim.height / 2) * Math.cos(iAngle))


    return [oTopRight, oTopLeft, oBotLeft, oBotRight];
};

function getBounds(obj,iTolerance) {
    var bounds={x:Infinity,y:Infinity,width:0,height:0};
    if ( obj instanceof createjs.Container ) {
      bounds.x2 = -Infinity;
      bounds.y2 = -Infinity;
      var children = obj.children, l=children.length, cbounds, c;
      for ( c = 0; c < l; c++ ) {
        cbounds = getBounds(children[c],1);
        if ( cbounds.x < bounds.x ) bounds.x = cbounds.x;
        if ( cbounds.y < bounds.y ) bounds.y = cbounds.y;
        if ( cbounds.x + cbounds.width > bounds.x2 ) bounds.x2 = cbounds.x + cbounds.width;
        if ( cbounds.y + cbounds.height > bounds.y2 ) bounds.y2 = cbounds.y + cbounds.height;
        //if ( cbounds.x - bounds.x + cbounds.width  > bounds.width  ) bounds.width  = cbounds.x - bounds.x + cbounds.width;
        //if ( cbounds.y - bounds.y + cbounds.height > bounds.height ) bounds.height = cbounds.y - bounds.y + cbounds.height;
      }
      if ( bounds.x == Infinity ) bounds.x = 0;
      if ( bounds.y == Infinity ) bounds.y = 0;
      if ( bounds.x2 == Infinity ) bounds.x2 = 0;
      if ( bounds.y2 == Infinity ) bounds.y2 = 0;
      
      bounds.width = bounds.x2 - bounds.x;
      bounds.height = bounds.y2 - bounds.y;
      delete bounds.x2;
      delete bounds.y2;
    } else {
      var gp,gp2,gp3,gp4,imgr={},sr;
      if ( obj instanceof createjs.Bitmap ) {
        sr = obj.sourceRect || obj.image;

        imgr.width = sr.width * iTolerance;
        imgr.height = sr.height * iTolerance;
      } else if ( obj instanceof createjs.Sprite ) {
        if ( obj.spriteSheet._frames && obj.spriteSheet._frames[obj.currentFrame] && obj.spriteSheet._frames[obj.currentFrame].image ) {
          var cframe = obj.spriteSheet.getFrame(obj.currentFrame);
          imgr.width =  cframe.rect.width;
          imgr.height =  cframe.rect.height;
          imgr.regX = cframe.regX;
          imgr.regY = cframe.regY;
        } else {
          bounds.x = obj.x || 0;
          bounds.y = obj.y || 0;
        }
      } else {
        bounds.x = obj.x || 0;
        bounds.y = obj.y || 0;
      }

      imgr.regX = imgr.regX || 0; imgr.width  = imgr.width  || 0;
      imgr.regY = imgr.regY || 0; imgr.height = imgr.height || 0;
      bounds.regX = imgr.regX;
      bounds.regY = imgr.regY;
      
      gp  = obj.localToGlobal(0         -imgr.regX,0          -imgr.regY);
      gp2 = obj.localToGlobal(imgr.width-imgr.regX,imgr.height-imgr.regY);
      gp3 = obj.localToGlobal(imgr.width-imgr.regX,0          -imgr.regY);
      gp4 = obj.localToGlobal(0         -imgr.regX,imgr.height-imgr.regY);

      bounds.x = Math.min(Math.min(Math.min(gp.x,gp2.x),gp3.x),gp4.x);
      bounds.y = Math.min(Math.min(Math.min(gp.y,gp2.y),gp3.y),gp4.y);
      bounds.width = Math.max(Math.max(Math.max(gp.x,gp2.x),gp3.x),gp4.x) - bounds.x;
      bounds.height = Math.max(Math.max(Math.max(gp.y,gp2.y),gp3.y),gp4.y) - bounds.y;
    }
    return bounds;
}

function checkPointInPolygon (x, y, cornersX, cornersY, iType) {

    var i, j=cornersX.length-1 ;
    var odd = false;

    var pX = cornersX;
    var pY = cornersY;
    
    var pLimitedPoint = null;

    for (i=0; i<cornersX.length; i++) {
        if ((pY[i]< y && pY[j]>=y ||  pY[j]< y && pY[i]>=y)
            && (pX[i]<=x || pX[j]<=x)) {
              odd ^= (pX[i] + (y-pY[i])*(pX[j]-pX[i])/(pY[j]-pY[i])) < x;
              
              var iXi = pX[i];
              var iXj = pX[j];
             
              if(iType  === WALL_ITEMS_ONLY){
                  iXi = pX[j];
                  iXj = pX[i];
              }

                if(iXi > x  && iXj < x){
                  pLimitedPoint = {
                                      edge:{A: {x: pX[i], y: pY[i]}, B: {x: pX[j], y: pY[j]}},
                                      point: {x: x, y: y}
                                  }
                }
        }
        j=i; 
    }
    
    switch (odd)
    {
        case 0: odd = false; break;
        case 1: odd = true;  break;
    }

    return {collided: odd, limited_point: pLimitedPoint};
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function lineIntersect(a,b){

  var m1 = (a[0].y-a[1].y)/(a[0].x-a[1].x);  // slope of line 1
  var m2 = (b[0].y-b[1].y)/(b[0].x-b[1].x);  // slope of line 2

  return m1 - m2 < Number.EPSILON ? null
                                    : { x: (m1 * a[0].x - m2*b[0].x + b[0].y - a[0].y) / (m1 - m2),
                                        y: (m1*m2*(b[0].x-a[0].x) + m2*a[0].y - m1*b[0].y) / (m2 - m1)};
}

function checkLineIntersection(aLine1, aLine2) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((aLine2[1].y - aLine2[0].y) * (aLine1[1].x - aLine1[0].x)) - ((aLine2[1].x - aLine2[0].x) * (aLine1[1].y - aLine1[0].y));
    if (denominator == 0) {
        return result;
    }
    a = aLine1[0].y - aLine2[0].y;
    b = aLine1[0].x - aLine2[0].x;
    numerator1 = ((aLine2[1].x - aLine2[0].x) * a) - ((aLine2[1].y - aLine2[0].y) * b);
    numerator2 = ((aLine1[1].x - aLine1[0].x) * a) - ((aLine1[1].y - aLine1[0].y) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = aLine1[0].x + (a * (aLine1[1].x - aLine1[0].x));
    result.y = aLine1[0].y + (a * (aLine1[1].y - aLine1[0].y));

    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are true
    return result;
};

function closestNumInArrayMaj (iNum, aArray) {
    var aMaj = new Array();
    for (var i = 0; i < aArray.length; i++) {
        if(iNum < aArray[i]){
            aMaj.push(aArray[i]);
        }
    }
    
    var iMin = aMaj[0];
    for (var i = 1; i < aMaj.length; i++) {
        if(iMin > aMaj[i]){
            iMin = aMaj[i];
        }
    }
    
    if(iNum < iMin){
        return iMin;
    }
    
    return iNum;
}

function closestNumInArrayMin (iNum, aArray) {
    var aMin = new Array();
    for (var i = 0; i < aArray.length; i++) {
        if(iNum > aArray[i]){
            aMin.push(aArray[i]);
        }
    }
    var iMax = aMin[0];
    for (var i = 1; i < aMin.length; i++) {
        if(iMax < aMin[i]){
            iMax = aMin[i];
        }
    }
 
    if(iNum > iMax){
        return iMax;
    }
    
    return iNum;
}

function createGraphicCircle(pPos, iDim, iTime, oContainer, szColor){
    var oCircle = new createjs.Shape();
    
    oCircle.graphics.beginFill(szColor).drawCircle(pPos.x, pPos.y, iDim);
    oContainer.addChild(oCircle);
    
    if(iTime !== null){
        createjs.Tween.get(oCircle).to({alpha:0, visible : false}, iTime);
    }
}

function checkPointInRect (x1, x2, y1, y2, pPoint){
        if(pPoint.x > x1  && pPoint.x < x2 && pPoint.y > y1 && pPoint.y <  y2)
        {
            return true;
        }
        return false
}

function checkItemInLimitedArea(aPoints, pPos, aOffset, pCenterPos, iType){
        var pOffset = getItemLimitedAreaOffset(pPos, aOffset, pCenterPos);
      
        var pNormPos = {x: pPos.x + pOffset.x, y: pPos.y + pOffset.y };
        var oResult =  {
                            result: checkPointInPolygon(
                                        pNormPos.x,
                                        pNormPos.y, 
                                        aPoints.x,
                                        aPoints.y,
                                        iType
                                    ),
                            offset: pOffset
                        }
        return oResult
}


function getItemLimitedAreaOffset (pPos, aOffset, pCenterPos){
       var iOffset = 0;
 
        if(pPos.x > pCenterPos.x){
            iOffset+= RIGHT_DIR;
        }

         if(pPos.y > pCenterPos.y){
            iOffset+= DOWN_DIR;
        }

        var pOffset = aOffset[iOffset];
        
        return pOffset;
}

function getPolygonCenterPoint(aPoint){
    var minX, maxX, minY, maxY;
    for (var i = 0; i < aPoint.length; i++)
    {
        minX = (aPoint[i].x < minX || minX == null) ? aPoint[i].x : minX;
        maxX = (aPoint[i].x > maxX || maxX == null) ? aPoint[i].x : maxX;
        minY = (aPoint[i].y < minY || minY == null) ? aPoint[i].y : minY;
        maxY = (aPoint[i].y > maxY || maxY == null) ? aPoint[i].y : maxY;
    }
    return {x: (minX + maxX) / 2, y: (minY + maxY) / 2};

}

function linearFunction(x, x1, x2, y1, y2){

    return ( (x-x1)*(y2-y1)/(x2-x1) ) + y1; 

}

function getDistanceBetweenTwoItems(oItem0, oItem1){
    var pPos0 = oItem0.getPos();
    var pDim0 = oItem0.getNormalizedDimension(); 

    var pPos1 = oItem1.getPos();
    var pDim1 = oItem1.getNormalizedDimension();

    var iX = pPos1.x - pPos0.x;
    var iY = pPos1.y - pPos0.y;

    var iDistance = Math.abs(iX + iY);

    var fRad = Math.atan2(iY, iX);

    iDistance -= Math.abs((
                   ((pDim0.width + pDim1.width)* 0.5) * Math.cos(fRad) + 
                   ((pDim0.height + pDim1.height)*0.5) * Math.sin(fRad)) 
                   );

    return iDistance;
};

function createGenericText(oInfo, oContainer){
    var oOutlineText = null;
        var oText;
        
        var iWidth = oInfo.width;
        var iHeight = oInfo.height;
        
        var iOffsetX = 0;
        var iOffsetY = 0;
        
        if(oInfo.align === CENTER){
            iOffsetX = -iWidth/2;
        }
        iOffsetY = -iHeight/2;
        var iX = oInfo.pos.x + iOffsetX;
        var iY = oInfo.pos.y + iOffsetY;
        if(oInfo.outline){
            oOutlineText = new CTLText(oContainer, 
                        iX, iY, iWidth, iHeight, 
                        oInfo.size, TEXT_ALIGN[oInfo.align], FONT_STROKE, PRIMARY_FONT, 
                        oInfo.line_height, 2, 2,
                        oInfo.text,
                        true, true, oInfo.multiline,
                        false );
            oOutlineText.setOutline(oInfo.outline_size);
        }
        oText = new CTLText(oContainer, 
                    iX, iY, iWidth, iHeight, 
                    oInfo.size, TEXT_ALIGN[oInfo.align], FONT_COLOR, PRIMARY_FONT,
                    oInfo.line_height, 2, 2,
                    oInfo.text,
                    true, true, oInfo.multiline,
                    false );
        return {text: oText, outline: oOutlineText};
}


function NoClickDelay(el) {
	this.element = el;
	if( window.Touch ) this.element.addEventListener('touchstart', this, false);
}
//Fisher-Yates Shuffle
function shuffle(array) {
        var counter = array.length, temp, index;
        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            index = Math.floor(Math.random() * counter);
            // Decrease counter by 1
            counter--;
            // And swap the last element with it
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
}

NoClickDelay.prototype = {
handleEvent: function(e) {
    switch(e.type) {
        case 'touchstart': this.onTouchStart(e); break;
        case 'touchmove': this.onTouchMove(e); break;
        case 'touchend': this.onTouchEnd(e); break;
    }
},
	
onTouchStart: function(e) {
    e.preventDefault();
    this.moved = false;
    
    this.element.addEventListener('touchmove', this, false);
    this.element.addEventListener('touchend', this, false);
},
	
onTouchMove: function(e) {
    this.moved = true;
},
	
onTouchEnd: function(e) {
    this.element.removeEventListener('touchmove', this, false);
    this.element.removeEventListener('touchend', this, false);
    
    if( !this.moved ) {
        var theTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if(theTarget.nodeType == 3) theTarget = theTarget.parentNode;
        
        var theEvent = document.createEvent('MouseEvents');
        theEvent.initEvent('click', true, true);
        theTarget.dispatchEvent(theEvent);
    }
}

};

(function() {
    var hidden = "hidden";

    // Standards:
    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
    // IE 9 and lower:
    else if ('onfocusin' in document)
        document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
        window.onpageshow = window.onpagehide 
            = window.onfocus = window.onblur = onchange;

    function onchange (evt) {
        var v = 'visible', h = 'hidden',
            evtMap = { 
                focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h 
            };

        evt = evt || window.event;
		
        if (evt.type in evtMap){
            document.body.className = evtMap[evt.type];
        }else{        
            document.body.className = this[hidden] ? "hidden" : "visible";

			if(document.body.className === "hidden"){
				s_oMain.stopUpdate();
			}else{
				s_oMain.startUpdate();
			}
		}
    }
})();

function ctlArcadeResume(){
    if(s_oMain !== null){
        s_oMain.startUpdate();
    }
}

function ctlArcadePause(){
    if(s_oMain !== null){
        s_oMain.stopUpdate();
    }
    
}

function getParamValue(paramName){
        var url = window.location.search.substring(1);
        var qArray = url.split('&'); 
        for (var i = 0; i < qArray.length; i++) 
        {
                var pArr = qArray[i].split('=');
                if (pArr[0] == paramName) 
                        return pArr[1];
        }
}

this.clearLocalStorage = function(){
    if(s_bStorageAvailable){
        localStorage.clear();
    }
};

function saveItem(szItem,oValue){
    if(s_bStorageAvailable){
        localStorage.setItem(szItem, oValue);
    } 
}

function getItem(szItem){
    if(s_bStorageAvailable){
        return localStorage.getItem(szItem);
    }
    return null;
}

function randomIntBetween(minValue,maxValue){

    return parseInt(Math.min(minValue + (Math.random() * (maxValue - minValue)),maxValue));
}

function fullscreenHandler(){
	if (!ENABLE_FULLSCREEN || !screenfull.isEnabled){
       return;
    }
	
    s_bFullscreen = screenfull.isFullscreen;

    if (s_oInterface !== null){
        s_oInterface.resetFullscreenBut();
    }

    if (s_oMenu !== null){
        s_oMenu.resetFullscreenBut();
    }
}

if (screenfull.isEnabled) {
    screenfull.on('change', function(){
            s_bFullscreen = screenfull.isFullscreen;

            if (s_oInterface !== null){
                s_oInterface.resetFullscreenBut();
            }
            if (s_oMenu !== null){
                s_oMenu.resetFullscreenBut();
            }
    });
}



function CSpriteLibrary(){

    var _oLibSprites = {};
    var _oSpritesToLoad;
    var _iNumSprites;
    var _iCntSprites;
    var _cbCompleted;
    var _cbTotalCompleted;
    var _cbOwner;
    
    this.init = function( cbCompleted,cbTotalCompleted, cbOwner ){
        _oSpritesToLoad = {};
        _iNumSprites = 0;
        _iCntSprites = 0;
        _cbCompleted = cbCompleted;
        _cbTotalCompleted = cbTotalCompleted;
        _cbOwner     = cbOwner;
    };
    
    this.addSprite = function( szKey, szPath ){
        if ( _oLibSprites.hasOwnProperty(szKey) ){
            return ;
        }
        
        var oImage = new Image();
        _oLibSprites[szKey] = _oSpritesToLoad[szKey] = { szPath:szPath, oSprite: oImage ,bLoaded:false};
        _iNumSprites++;
    };
    
    this.getSprite = function( szKey ){
        if (!_oLibSprites.hasOwnProperty(szKey)){
            return null;
        }else{
            return _oLibSprites[szKey].oSprite;
        }
    };
    
    this._onSpritesLoaded = function(){
        _iNumSprites = 0;
        _cbTotalCompleted.call(_cbOwner);
    };

    this._onSpriteLoaded = function(){
        _cbCompleted.call(_cbOwner);
        if (++_iCntSprites === _iNumSprites) {
            this._onSpritesLoaded();
        }
        
    };    

    this.loadSprites = function(){
        
        for (var szKey in _oSpritesToLoad) {
            
            _oSpritesToLoad[szKey].oSprite["oSpriteLibrary"] = this;
            _oSpritesToLoad[szKey].oSprite["szKey"] = szKey;
            _oSpritesToLoad[szKey].oSprite.onload = function(){
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey);
            };
            _oSpritesToLoad[szKey].oSprite.onerror  = function(evt){
                var oSpriteToRestore = evt.currentTarget;
                
                setTimeout(function(){
                        _oSpritesToLoad[oSpriteToRestore.szKey].oSprite.src = _oSpritesToLoad[oSpriteToRestore.szKey].szPath;
                },500);
            };
            _oSpritesToLoad[szKey].oSprite.src = _oSpritesToLoad[szKey].szPath;
        } 
    };
    
    this.setLoaded = function(szKey){
        _oLibSprites[szKey].bLoaded = true;
    };
    
    this.isLoaded = function(szKey){
        return _oLibSprites[szKey].bLoaded;
    };
    
    this.getNumSprites=function(){
        return _iNumSprites;
    };
}

var CANVAS_WIDTH = 1920;
var CANVAS_HEIGHT = 1080;

var EDGEBOARD_X = 240;
var EDGEBOARD_Y = 100;

var PRIMARY_FONT = "walibi";
var FONT_COLOR = "#fff";
var FONT_STROKE = "#7b0040";
var FONT_OUTLINE = 4;

var FPS           = 60;
var FPS_TIME      = 1000/FPS;
var DISABLE_SOUND_MOBILE = false;
var ENABLE_FULLSCREEN = true;

var SOUNDTRACK_VOLUME_IN_GAME = 0.5;

var STATE_LOADING = 0;
var STATE_MENU = 1;
var STATE_GAME    = 2;

//JSON INFO
var URL_INFO_SETTINGS = "json/info.json";

//EVENTS SETTINGS
var ON_MOUSE_DOWN   = 0;
var ON_MOUSE_UP     = 1;
var ON_MOUSE_OVER   = 2;
var ON_MOUSE_OUT    = 3;
var ON_DRAG_START   = 4;
var ON_DRAG_END     = 5;
var ON_PRESS_DOWN   = 6;
var ON_PRESS_UP     = 7;
var ON_PRESS_MOVE   = 8;
var ON_PRESS_UNDO   = 9;
var ON_PRESS_RESTART= 10;
var ON_PRESS_YES    = 11;
var ON_PRESS_NO     = 12;
var ON_PRESS_SAVE   = 13;
var ON_PRESS_ARROW_LEFT = 14;
var ON_PRESS_ARROW_RIGHT = 15;
var ON_PRESS_COLLIDER = 16;
var ON_PRESSMOVE_COLLIDER = 17;
var ON_RELEASE_COLLIDER = 18;
var ON_PRESSDOWN_EDIT_SCALE   = 19;
var ON_PRESSDOWN_EDIT_ROTATE  = 20;
var ON_PRESSUP_EDIT_SCALE   = 21;
var ON_PRESSUP_EDIT_ROTATE  = 22;
var ON_PRESS_DELETE = 23;
var ON_EDIT_SCALE   = 24;
var ON_EDIT_ROTATE  = 25;
var ON_PRESS_FIELD  = 26;
var ON_PRESS_TOGGLE_GUI = 27;
var ON_PRESS_FORWARD = 28;
var ON_PRESS_BACKWARD = 29;
var ON_SET_TEMP_ITEM = 30;
var ON_PRESS_UP_TEMP = 31;
var ON_PRESS_DOWN_DINAMIC_ITEM = 32;
var ON_PRESS_MOVE_DINAMIC_ITEM = 33;
var ON_PRESS_UP_DINAMIC_ITEM = 34;
var ON_PRESS_DOWN_STATIC_ITEM = 35;
var ON_PRESS_SAVE_IMAGE = 36;
var ON_PRESS_STAMP = 37;
var ON_PRESS_EXIT = 38;
var ON_PRESS_MOVE_EDIT_SCALE = 39;
var ON_END_DINAMIC_ITEM_MOVEMENT = 40;

//CONTROLLER EVENTS
var ON_PRESS_DOWN_KEY_DEL = 0;

//STORIES EVENTS SETTINGS
var PLACED = 0;
var MODDED = 1;
var DELETE = 2;
var MOVED  = 3;
var STATIC_VARIANT = 4;
var OPTIONAL_SUBSTITUTE = 5;
var OPTIONAL_CREATE = 6;
var OPTIONAL_DELETE = 7;

//SAVED GAME EVENTS
var NEW_GAME = 0;
var SAVED_ROOM = 1;

//INTERACTIVE HELP EVENTS
var ON_END_TUTORIAL = 0;

//BARS SETTINGS
var OFFSET_ITEM_SPACE_X = 37;
var OFFSET_MASK_X = 0;
var OFFSET_BAR_DIM_X = 0;
var OFFSET_ARROWS_X = 12;
var SCROLL_LEFT = 1;
var SCROLL_RIGHT = -1;
var ITEMS_POOL_BARS_OFFSET = {x: 0, y: -6};
var OFFSET_POS_SELECTOR = {x: 0, y: 10};
var SCROLL_ITEM_WITH_SWIPE = false;
var DISABLE_DROP_ITEM_BACK_ITEM_POOL_BAR = false;
var RANGE_ITEM_HIDE_BAR_Y = 130;

//GAME SETTINGS
var FIELD_HIT_AREA_PROPIERTIES = {x:0, y: 0, width: CANVAS_WIDTH , height: CANVAS_HEIGHT};
var SELECTED_ITEM_SCALE_RATIO = 1.3;
var OFFSET_POOL_BAR_LIMIT_AREA = {x:-100, y:0, width: 200, height: 0};
var MOBILE_SCALE_PINCH_GESTURE = false;
var PRIORITY_DEPTH_SELECTED_ITEM = false;
var OFFSET_INTERPOLATION_Y = {min: 0, max: 0};
var MS_TIME_ANIAMTION_ITEM_SELECTED = 300;
var PROSPECTIVE_PROPERTY = {min: 618, max: CANVAS_HEIGHT , intensity_y: -0.3, intensity_x: 0.2 };
var MS_TIME_SHAPE_ANIAMATION = 300;
var AUTOMATIC_DRAG_TEMP_ITEM_TO_FIELD = true;
var OFFSET_AUTOMATIC_ITEM_DRAG = {x: 0, y: 0};

//KEYS NAME LOCALSTORAGE 
var SAVE_ROOM_DINAMIC_ITEM = "dreamlike_room_dinamic_item";
var SAVE_ROOM_STATIC_ITEM = "dreamlike_room_static_item";

//HISTORY SETTINGS
var HISTORY_ITEM_MOVED_TOLLERANCE = 4;
var MS_TIME_MOVED_ITEM_STORED_POS = 500;

//ITEMS REG POINTS SETTINGS
var REG_LEFT_UP = 0;
var REG_CENTER = 1;
var REG_LEFT_DOWN = 2;
var REG_CENTER_UP = 3;

//ITEMS TYPE SETTINGS
var FREE_ITEMS = 0;
var FLOOR_ITEMS_ONLY = 1;
var WALL_ITEMS_ONLY = 2;
var OPTIONAL_ITEMS = 3;
var STATIC_ITEMS = 4;

//LIMITED AREA SETTING
var CENTER_AREA_X = 1039;
var CENTER_AREA_Y = 617;
var LIMITED_AREA_POINTS = [
                                {
                                    type: FLOOR_ITEMS_ONLY,
                                    points:[ 
                                            {x: 0, y: 754},
                                            {x: CENTER_AREA_X, y: 617},
                                            {x: CANVAS_WIDTH, y: 893},
                                            {x: CANVAS_WIDTH, y:CANVAS_HEIGHT},
                                            {x: 0, y: CANVAS_HEIGHT}
                                           ],
                                    offset_center: {x : 0, y:0},
                                    show: true
                                },
                                {
                                    type: WALL_ITEMS_ONLY,
                                    points:[ 
                                            {x: 0, y: 0},
                                            {x: CANVAS_WIDTH, y: 0},
                                            {x: CANVAS_WIDTH, y: 893},
                                            {x: CENTER_AREA_X, y:617},    
                                            {x: 0, y: 754}
                                           ],
                                    offset_center: {x : 0, y:0},
                                    show: true
                                }
                            ];
var LEFT_UP = 0;
var RIGHT_UP = 1;
var LEFT_DOWN = 2;
var RIGHT_DOWN = 3;

var DOWN_DIR = 2;
var RIGHT_DIR = 1;

//MANIPULATOR EVENT SETTINGS
var NOT_EDITABLE = 0;
var SCALE_ONLY = 1;
var ROTATION_ONLY = 2;
var FULL_EDITABLE = 3;
var ON_PRESS_DOWN_DELETE = 4;
var ON_PRESS_DOWN_FORWARD = 5;
var ON_PRESS_DOWN_BACKWARD = 6;

//TEXT SETTINGS
var LEFT = 0;
var CENTER = 1;
var RIGHT = 2;
var TEXT_ALIGN = [
                    "left",
                    "center",
                    "right"
                    ];
                    
//INTERACTIVE TUTORIAL SETTINGS
var DEPTH_TUTORIAL = 0;
var SCALE_TUTORIAL = 1;
var ROTATION_TUTORIAL = 2;
var OPTIONAL_TUTORIAL = 3;

//COLLIDER SETTINGS
var COLLIDER_TOP_LEFT = 0;
var COLLIDER_TOP_RIGHT = 1;
var COLLIDER_BOTTOM_LEFT = 2;
var COLLIDER_BOTTOM_RIGHT = 3;
var COLLIDER_PINCH = 4;
var MIN_DIMENSIONS_ITEM = 50;
var TRANSFORM_SCALE = 0;
var TRANSFORM_ROTATE = 1;
var SHAPE_DIMENSION = 30;

var OFFSET_MANIPULATOR_COLLIDER = {x: 20, y: 20};

//DEBUG SETTINGS
var SHOW_FIELD_AREA = false;
var SHOW_LIMTIED_AREA = false;
var SHOW_INTERSECTION_ITEM_DEBUG = false;
var SHOW_BAR_LIMITED_AREA = false;
var SHOW_ITEM_OFFSETS_POINTS = false;
var SHOW_DEBUG_TEXT_RESTORE_DEPTH = false;

var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;
var PRIORITY_DEPTH_SELECTED_ITEM;
var AUTOMATIC_DRAG_TEMP_ITEM_TO_FIELD;

function CMenu(){
    var _oBg;
    var _oButPlay;
    var _oButContinue;
    var _oFade;
    var _oAudioToggle;
    var _oCreditsBut;
    var _oButFullscreen;
    var _oAreYouSurePanel;
    var _oLogo;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _pStartPosCredits;
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    var _pStartPosPlay;
    var _pStartPosContinue;
    
    this._init = function(){
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);
        
        _pStartPosPlay = {x:CANVAS_WIDTH/2,y:CANVAS_HEIGHT/2 + 300};
        
        _oButContinue = null;
        var oSpritePlay = s_oSpriteLibrary.getSprite('but_play');
        
        if(getItem(SAVE_ROOM_STATIC_ITEM) !== null){
            var oSpriteContinue = s_oSpriteLibrary.getSprite('but_continue');
            _pStartPosPlay.x = CANVAS_WIDTH/2 - oSpritePlay.width;
            _pStartPosContinue = {x: CANVAS_WIDTH/2 + oSpritePlay.width, y: _pStartPosPlay.y};
            
            _oButContinue = new CGfxButton(_pStartPosContinue.x, _pStartPosContinue.y, oSpriteContinue, s_oStage);
            _oButContinue.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
            _oButContinue.pulseAnimation();
        }

        _oButPlay = new CGfxButton(_pStartPosPlay.x, _pStartPosPlay.y, oSpritePlay, s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        if(_oButContinue === null){
            _oButPlay.pulseAnimation();
        }
        
        var oSprite = s_oSpriteLibrary.getSprite('but_credits');
        _pStartPosCredits = {x: (oSprite.height/2) + 10, y: (oSprite.height/2) + 10};            
        _oCreditsBut = new CGfxButton(_pStartPosCredits.x, _pStartPosCredits.y, oSprite, s_oStage);
        _oCreditsBut.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this);
        
        var oSpriteLogo = s_oSpriteLibrary.getSprite("logo_menu");
       _oLogo = createBitmap(oSpriteLogo);
       _oLogo.regX = oSpriteLogo.width/2;
       _oLogo.regY = oSpriteLogo.height/2;
       _oLogo.x = CANVAS_WIDTH/2;
       _oLogo.y =  -oSpriteLogo.height/2;
       s_oStage.addChild(_oLogo);
       
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false)
        {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};            
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite, s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);          
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');
            _pStartPosFullscreen = {x: _pStartPosCredits.x + oSprite.width/2 + 10,y:(oSprite.height/2)+10};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        if(!s_bStorageAvailable){
            var oMsgBox = new CMsgBox(20,TEXT_ERR_LS,"",TEXT_OK,"");
            oMsgBox.addEventListener(ON_MSG_BOX_CENTER_BUT,function(){oMsgBox.hide();}, this);
        }
        
        _oAreYouSurePanel = new CAreYouSurePanel(TEXT_SAVE_DELETE);
        _oAreYouSurePanel.addEventListener(ON_PRESS_YES, this._onPressUpButYes, this);
        _oAreYouSurePanel.addEventListener(ON_PRESS_NO, this._onPressUpButNo, this);     
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 1;
        s_oStage.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha:0}, 1000).call(function(){
            
            createjs.Tween.get(_oLogo).to({y: CANVAS_HEIGHT/2 - 200}, 1000, createjs.Ease.bounceOut);
        });  
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        
        if(_oButContinue !== null){
            _oButContinue.unload(); 
            _oButContinue = null;
        }
        
        _oCreditsBut.unload();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
   
        s_oStage.removeChild(_oBg, _oFade, _oLogo);
        _oFade = null;
        _oBg = null;
        s_oMenu = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oCreditsBut.setPosition(_pStartPosCredits.x + iNewX,iNewY + _pStartPosCredits.y);
        
     
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX,_pStartPosFullscreen.y + iNewY);
        }
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onCreditsBut = function(){
        new CCreditsPanel();
    };
    
    this._exitMenu = function(iGameEvent){
        if(_oButContinue !== null){
            _oButContinue.block(true);
        }
        
        _oButPlay.block(true);
        createjs.Tween.get(_oFade).to({alpha:1}, 1000, createjs.Ease.cubicOut).call(function(){
            this.unload();
            s_oMain.gotoGame(iGameEvent);
        }, null, this);   
    };
    
    this._onButPlayRelease = function(){       
        if(getItem(SAVE_ROOM_STATIC_ITEM) === null){
            s_oMenu._exitMenu(NEW_GAME);
        }else{
            _oAreYouSurePanel.show();
        }
    };
    
    this._onPressUpButYes = function(){
        clearLocalStorage();
        s_oMenu._exitMenu(NEW_GAME);
    };
    
    this._onPressUpButNo = function(){
        _oAreYouSurePanel.hide();
    };
    
    this._onButContinueRelease = function(){
        s_oMenu._exitMenu(SAVED_ROOM);
    };
    
    this.resetFullscreenBut = function(){
	_oButFullscreen.setActive(s_bFullscreen);
    };

    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    s_oMenu = this;
    
    this._init();
}

var s_oMenu = null;

//ITEMS NAMES SETTINGS
var BED_TOP = 13;
var BED = 4;
var BLANKET = 15;
var CARPET = 8;
var COURTAIN = 14;
var DESK_OBJECT = 12;
var DESK = 3;
var GARDROBE = 5;
var FLOOR = 1;
var WALL = 0;
var NIGHT_TABLE = 6;
var PILLOW = 9;
var STICKERS = 10;
var TOY = 11;
var LAMP = 7;
var WINDOW = 2;

var ITEMS_PROPERTIES = [];

ITEMS_PROPERTIES[BED_TOP] =    {
                                    id: BED_TOP,
                                    type: OPTIONAL_ITEMS,
                                    start_scale_dragged: 1,
                                    scale_range: null,
                                    editable: NOT_EDITABLE,
                                    position: {x: 176, y: 330},
                                    child_index: 2
                                };
                                
ITEMS_PROPERTIES[BED] = {   
                            id: BED,
                            type: FLOOR_ITEMS_ONLY,
                            start_scale_dragged: 0.9,
                            scale_range: {min: 0.75, max: 1},
                            editable: SCALE_ONLY,
                            limit_area_offset: [ //FROM CENTER LIMITED AREA         
                                                    {x:-422, y: 120}, // LEFT_UP
                                                    {x: 370, y: 120}, // RIGHT_UP
                                                    {x: -422, y: 560}, // LEFT_DOWN
                                                    {x: 370, y: 560} // RIGHT_DOWN
                                               ],                        
                            optional: [BED_TOP, BLANKET],
                            optional_bar_pos: [
                                                {x: -320, y: 40}, //RIGHT FROM CENTER
                                                {x: 320, y: 40} //LEFT FROM CENTER
                                              ]
                       };    
ITEMS_PROPERTIES[BLANKET] = {
                                id: BLANKET,
                                type: OPTIONAL_ITEMS,
                                start_scale_dragged: 1,
                                scale_range: null,
                                editable: NOT_EDITABLE,
                                position: {x: 408, y: 316},
                                child_index: 1
                           };
                               
ITEMS_PROPERTIES[CARPET] = {
                                id: CARPET,
                                type: FLOOR_ITEMS_ONLY,
                                start_scale_dragged: 0.7,
                                scale_range: {min: 0.6, max: 1},
                                editable: FULL_EDITABLE, 
                                limit_area_offset: [ //FROM CENTER LIMITED AREA         
                                                        {x:-426, y: -56}, // LEFT_UP
                                                        {x: 426, y: 14}, // RIGHT_UP
                                                        {x:-406, y: -56}, // LEFT_DOWN
                                                        {x: 399, y: 14} // RIGHT_DOWN
                                               ],
                                optional: null
                           };
                           
ITEMS_PROPERTIES[COURTAIN] = {
                                id: COURTAIN,
                                type: OPTIONAL_ITEMS,
                                start_scale_dragged: 1,
                                scale_range: null,
                                editable: NOT_EDITABLE,
                                position: {x: 191, y: 181},
                                child_index: 1
                             };
                             
ITEMS_PROPERTIES[DESK_OBJECT] = {
                                    id: DESK_OBJECT,
                                    type: FREE_ITEMS,
                                    start_scale_dragged: 0.75,
                                    scale_range: {min:0.5, max: 1},
                                    editable: FULL_EDITABLE,
                                    optional: null
                                };
                                
ITEMS_PROPERTIES[DESK] = {
                            id: DESK,
                            type: FLOOR_ITEMS_ONLY,
                            start_scale_dragged: 0.9,
                            scale_range: {min: 0.8, max: 1},
                            editable: SCALE_ONLY,
                            limit_area_offset: [  //FROM CENTER LIMITED AREA         
                                                        {x:-321, y: 99}, // LEFT_UP
                                                        {x: 291, y: 104}, // RIGHT_UP
                                                        {x:-158, y: 172}, // LEFT_DOWN
                                                        {x: -158, y: 172} // RIGHT_DOWN
                                               ],
                            optional: null
                        };   
                        
ITEMS_PROPERTIES[FLOOR] = {
                            id: FLOOR,
                            type: STATIC_ITEMS,
                            position: {x:0, y:CANVAS_HEIGHT},
                            reg_point: REG_LEFT_DOWN,
                            visible: true,
                            start_variant: 0,
                            editable: SCALE_ONLY,
                            scale_range: null,
                            limited_area: FLOOR_ITEMS_ONLY,
                            optional: null,
                            visibility_settable: false
                          };
                          
ITEMS_PROPERTIES[GARDROBE] = {
                                id: GARDROBE,
                                type: FLOOR_ITEMS_ONLY,
                                start_scale_dragged: 0.95,
                                scale_range: {min: 0.9, max: 1},
                                editable: SCALE_ONLY,
                                limit_area_offset: [  //FROM CENTER LIMITED AREA         
                                                        {x:-236, y: 290}, // LEFT_UP
                                                        {x: 221, y: 307}, // RIGHT_UP
                                                        {x:-236, y: 290}, // LEFT_DOWN
                                                        {x: -100, y: 374} // RIGHT_DOWN
                                                    ],
                                optional: null
                            };
                            
ITEMS_PROPERTIES[LAMP] = {
                            id: LAMP,
                            type: STATIC_ITEMS,
                            position: {x:CANVAS_WIDTH/2, y: 0},
                            reg_point: REG_CENTER_UP,
                            visible: false,
                            start_variant: 0,
                            editable: NOT_EDITABLE,
                            limited_area: null,
                            optional: null,
                            visibility_settable: true
                        };
                        
ITEMS_PROPERTIES[NIGHT_TABLE] = {
                                    id: NIGHT_TABLE,
                                    type: FLOOR_ITEMS_ONLY,
                                    start_scale_dragged: 0.9,
                                    scale_range: {min: 0.7, max: 1},
                                    editable: SCALE_ONLY,
                                    limit_area_offset: [  //FROM CENTER LIMITED AREA         
                                                            {x:-183, y: 70}, // LEFT_UP
                                                            {x: 196, y: 95}, // RIGHT_UP
                                                            {x:-183, y: 70}, // LEFT_DOWN
                                                            {x: 196, y: 95} // RIGHT_DOWN
                                                        ],
                                    optional: null
                                };
                                
ITEMS_PROPERTIES[PILLOW] = {
                                id: PILLOW,
                                type: FREE_ITEMS,
                                start_scale_dragged: 0.9,
                                scale_range: {min:0.5, max: 1},
                                editable: FULL_EDITABLE,
                                optional: null
                            }; 
                            
ITEMS_PROPERTIES[STICKERS] = {
                                id: STICKERS,
                                type: WALL_ITEMS_ONLY,
                                start_scale_dragged: 0.75,
                                scale_range: {min:0.5, max: 1},
                                editable: FULL_EDITABLE,
                                limit_area_offset: [  //FROM CENTER LIMITED AREA         
                                                        {x:-250, y: -50}, // LEFT_UP
                                                        {x: -250, y: -50}, // RIGHT_UP
                                                        {x: -100, y: 250}, // LEFT_DOWN
                                                        {x: -100, y: 250} // RIGHT_DOWN
                                                    ],
                                optional: null
                            }; 
                            
ITEMS_PROPERTIES[TOY] = {
                            id: TOY,
                            type: FREE_ITEMS,
                            start_scale_dragged: 0.7,
                            scale_range: {min:0.5, max: 1},
                            editable: FULL_EDITABLE,
                            optional: null
                        };   
                        
ITEMS_PROPERTIES[WALL] = {
                            id: WALL,
                            type: STATIC_ITEMS,
                            position: {x:0, y:0},
                            reg_point: REG_LEFT_UP,
                            visible: true,
                            start_variant: 0,
                            limited_area: null,
                            editable: NOT_EDITABLE,
                            optional: null,
                            visibility_settable: false
                        };

ITEMS_PROPERTIES[WINDOW] =  {
                                id: WINDOW,
                                type: STATIC_ITEMS,
                                position: {x:610, y: EDGEBOARD_X},
                                reg_point: REG_CENTER,
                                visible: false,
                                start_variant: 0,
                                limited_area: null,
                                editable: NOT_EDITABLE,
                                optional: [COURTAIN],
                                optional_bar_pos: [
                                                {x: 0, y: 250}, //RIGHT
                                                {x: 0, y: 250} //LEFT
                                              ],
                                visibility_settable: true
                            }; 

            
var ITEMS_SETTINGS = [];
ITEMS_SETTINGS[BED_TOP] =  {name: "bed_top", items: 4, property: ITEMS_PROPERTIES[BED_TOP]};
ITEMS_SETTINGS[BED] = {name: "bed", items: 4, property: ITEMS_PROPERTIES[BED]};
ITEMS_SETTINGS[BLANKET] =  {name: "blanket", items: 5, property: ITEMS_PROPERTIES[BLANKET]};
ITEMS_SETTINGS[CARPET] = {name: "carpet", items: 4, property: ITEMS_PROPERTIES[CARPET]};
ITEMS_SETTINGS[COURTAIN] = {name: "courtain", items: 4, property: ITEMS_PROPERTIES[COURTAIN]};
ITEMS_SETTINGS[DESK_OBJECT] =  {name: "desk_object", items: 10, property: ITEMS_PROPERTIES[DESK_OBJECT]};
ITEMS_SETTINGS[DESK] =   {name: "desk", items: 4, property: ITEMS_PROPERTIES[DESK]};
ITEMS_SETTINGS[FLOOR] =  {name: "floor", items: 4, property: ITEMS_PROPERTIES[FLOOR]};
ITEMS_SETTINGS[GARDROBE] =  {name: "gardrobe", items: 5, property: ITEMS_PROPERTIES[GARDROBE]};
ITEMS_SETTINGS[LAMP] =  {name: "lamp", items: 4, property: ITEMS_PROPERTIES[LAMP]};
ITEMS_SETTINGS[NIGHT_TABLE] = {name: "night_table", items: 4, property: ITEMS_PROPERTIES[NIGHT_TABLE]};
ITEMS_SETTINGS[PILLOW] =  {name: "pillow", items: 5, property: ITEMS_PROPERTIES[PILLOW]};
ITEMS_SETTINGS[STICKERS] = {name: "sticker", items: 6, property: ITEMS_PROPERTIES[STICKERS]};
ITEMS_SETTINGS[TOY] =  {name: "toy", items: 9, property: ITEMS_PROPERTIES[TOY]};
ITEMS_SETTINGS[WALL] =  {name: "wall", items: 6, property: ITEMS_PROPERTIES[WALL]};
ITEMS_SETTINGS[WINDOW] = {name: "window", items: 4, property: ITEMS_PROPERTIES[WINDOW]};


var TEXT_ARE_SURE_RESTART = "DO YOU WANT TO CLEAN UP THE ROOM?";
var TEXT_ARE_SURE_EXIT = "DO YOU WANT TO QUIT THE GAME?";
var TEXT_SAVE_DELETE = "DO YOU REALLY WANT TO CONTINUE? YOUR SAVED ROOM WILL BE LOST";
var TEXT_SAVED_ROOM = "ROOM SAVED";


//HELP PANEL
var TEXT_HELP_PAGE_1_WELCOME = "WELCOME";
var TEXT_HELP_PAGE_1_INFO_CLICK = "CLICK THE OBJECTS IN THE SUB-MENU TO TAKE THEM IN THE SCENE";
var TEXT_HELP_PAGE_1_INFO_DRAG = "DRAG THE OBJECTS IN THE SUB-MENU TO THE SCENE";
var TEXT_HELP_PAGE_2_LEGEND = "LEGEND";
var TEXT_HELP_PAGE_2_HIDE_SHOW = "REMOVE BUTTONS AND BARS FOR A WIDE VIEW OF YOU ROOM";
var TEXT_HELP_PAGE_2_UNDO = "UNDO THE LAST ACTION";
var TEXT_HELP_PAGE_2_RESTART = "EMPTY THE ROOM AND RESTART FROM ZERO";
var TEXT_HELP_PAGE_3_LEGEND = "LEGEND";
var TEXT_HELP_PAGE_3_DELETE = "REMOVE THE SELECTED ITEM";
var TEXT_HELP_PAGE_3_DEPTH_FORWARD = "MOVE THE SELECTED ITEM FORWARD";
var TEXT_HELP_PAGE_3_DEPTH_BACKWARD = "MOVE THE SELECTED ITEM BACKWARD";
var TEXT_HELP_PAGE_4_LEGEND = "LEGEND";
var TEXT_HELP_PAGE_4_SAVE_ROOM = "SAVE YOUR ROOM TO RESUME IT WHEN YOU WANT";
var TEXT_HELP_PAGE_4_SAVE_IMG = "TAKE A PHOTO OF YOU ROOM AND DOWNLOAD IT";
var TEXT_INTERACTIVE_HELP_DEPTH = "MOVE THE SELECTED ITEM FORWARD OR BACKWARD";
var TEXT_INTERACTIVE_HELP_SCALE = "MOVE THIS BUTTON TO RESIZE THE SELECTED ITEM";
var TEXT_INTERACTIVE_HELP_ROTATION = "MOVE THIS BUTTON TO ROTATE THE SELECTED ITEM";
var TEXT_INTERACTIVE_HELP_OPTIONAL_0 = "CHOOSE YOUR FAVORITE OPTIONAL BY CLICKING ON IT";
var TEXT_INTERACTIVE_HELP_OPTIONAL_1 = "CLICK AGAIN TO REMOVE IT";

var TEXT_ERR_LS             = "YOUR WEB BROWSER DOES NOT SUPPORT LOCAL STORAGE. IF YOU'RE USING SAFARI, IT MAY BE RELATED TO PRIVATE BROWSING. AS A RESULT, SOME INFO MAY NOT BE SAVED OR SOME FEATURES MAY NOT BE AVAILABLE.";

var TEXT_DEVELOPED = "DEVELOPED BY";
var TEXT_PRELOADER_CONTINUE = "START";

var TEXT_SHARE_IMAGE = "200x200.jpg";
var TEXT_SHARE_TITLE = "Congratulations!";
var TEXT_SHARE_MSG1 = "You collected <strong>";
var TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!";
var TEXT_SHARE_SHARE1 = "My score is ";
var TEXT_SHARE_SHARE2 = " points! Can you do better";

function CPreloader() {
    var _iMaskWidth;
    var _iMaskHeight;
    var _oLoadingText;
    var _oProgressBar;
    var _oMaskPreloader;
    var _oFade;
    var _oIcon;
    var _oIconMask;

    var _oContainer;

    this._init = function () {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");

        s_oSpriteLibrary.loadSprites();

        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
    };

    this.unload = function () {
        _oContainer.removeAllChildren();
    };

    this._onImagesLoaded = function () {

    };

    this._onAllImagesLoaded = function () {
        
        this.attachSprites();

        s_oMain.preloaderReady();
        
    };

    this.attachSprites = function () {
        
        var oBg = new createjs.Shape();
        oBg.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainer.addChild(oBg);

        var oSprite = s_oSpriteLibrary.getSprite('200x200');
        _oIcon = createBitmap(oSprite);
        _oIcon.regX = oSprite.width * 0.5;
        _oIcon.regY = oSprite.height * 0.5;
        _oIcon.x = CANVAS_WIDTH/2;
        _oIcon.y = CANVAS_HEIGHT/2 - 180;
        _oContainer.addChild(_oIcon);

        _oIconMask = new createjs.Shape();
        _oIconMask.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(_oIcon.x - 100, _oIcon.y - 100, 200, 200, 10);
        _oContainer.addChild(_oIconMask);
        
        _oIcon.mask = _oIconMask;

        var oSprite = s_oSpriteLibrary.getSprite('progress_bar');
        _oProgressBar = createBitmap(oSprite);
        _oProgressBar.x = CANVAS_WIDTH/2 - (oSprite.width / 2);
        _oProgressBar.y = CANVAS_HEIGHT/2 + 50;
        _oContainer.addChild(_oProgressBar);

        _iMaskWidth = oSprite.width;
        _iMaskHeight = oSprite.height;
        _oMaskPreloader = new createjs.Shape();
        _oMaskPreloader.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, 1, _iMaskHeight);

        _oContainer.addChild(_oMaskPreloader);

        _oProgressBar.mask = _oMaskPreloader;

        _oLoadingText = new createjs.Text("", "40px " + PRIMARY_FONT, "#fff");
        _oLoadingText.x = CANVAS_WIDTH/2;
        _oLoadingText.y = CANVAS_HEIGHT/2 + 110;
        _oLoadingText.textBaseline = "alphabetic";
        _oLoadingText.textAlign = "center";
        _oContainer.addChild(_oLoadingText);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oContainer.addChild(_oFade);
        
        createjs.Tween.get(_oFade).to({alpha: 0}, 500).call(function () {            
            createjs.Tween.removeTweens(_oFade);
            _oContainer.removeChild(_oFade);
        });      
    };

    this.refreshLoader = function (iPerc) {
        _oLoadingText.text = iPerc + "%";
      
        if (iPerc === 100) {  
            s_oMain._onAllResourcesLoaded();
            _oLoadingText.visible = false;
            _oProgressBar.visible = false;
        };     

        _oMaskPreloader.graphics.clear();
        var iNewMaskWidth = Math.floor((iPerc * _iMaskWidth) / 100);
        _oMaskPreloader.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(_oProgressBar.x, _oProgressBar.y, iNewMaskWidth, _iMaskHeight);
    };

    this._init();
}

function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oGame;

    this.initContainer = function(){     
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
	s_oStage.preventSelection = false;

        createjs.Touch.enable(s_oStage, true);
        
        s_oFlashStage = new createjs.Stage(document.getElementById("flashcanvas"));
		
	s_bMobile = isMobile();
  
        if(s_bMobile === false)
        {
            s_oStage.enableMouseOver(FPS);  
            $('body').on('contextmenu', '#canvas', function(e){ return false; });
        }
        
        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();
        
        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };
    
    this.preloaderReady = function(){
        _bUpdate = true;
        
        s_oMain._loadImages();
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            s_oMain._initSounds();
        }
    };
    
    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);
    };
    
    this._initSounds = function(){
        Howler.mute(!s_bAudioActive);
        
        s_aSoundsInfo = new Array();
        s_aSoundsInfo.push({path: './sounds/',filename:'item_release',loop:false,volume:1, ingamename: 'item_release'});
        s_aSoundsInfo.push({path: './sounds/',filename:'press_but',loop:false,volume:1, ingamename: 'press_but'});
        s_aSoundsInfo.push({path: './sounds/',filename:'photo_click',loop:false,volume:1, ingamename: 'photo_click'});
        s_aSoundsInfo.push({path: './sounds/',filename:'soundtrack',loop:false,volume:1, ingamename: 'soundtrack'});
        RESOURCE_TO_LOAD += s_aSoundsInfo.length;

        s_aSounds = new Array();
        for(var i=0; i<s_aSoundsInfo.length; i++){
            this.tryToLoadSound(s_aSoundsInfo[i], false);
        }
    };  
    
    this.tryToLoadSound = function(oSoundInfo, bDelay){
       setTimeout(function(){        
            s_aSounds[oSoundInfo.ingamename] = new Howl({ 
                                                            src: [oSoundInfo.path+oSoundInfo.filename+'.mp3'],
                                                            autoplay: false,
                                                            preload: true,
                                                            loop: oSoundInfo.loop, 
                                                            volume: oSoundInfo.volume,
                                                            onload: s_oMain.soundLoaded,
                                                            onloaderror: function(szId,szMsg){
                                                                                for(var i=0; i < s_aSoundsInfo.length; i++){
                                                                                     if ( szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id){
                                                                                         s_oMain.tryToLoadSound(s_aSoundsInfo[i], true);
                                                                                         break;
                                                                                     }
                                                                                }
                                                                        },
                                                            onplayerror: function(szId) {
                                                                for(var i=0; i < s_aSoundsInfo.length; i++){
                                                                                     if ( szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id){
                                                                                          s_aSounds[s_aSoundsInfo[i].ingamename].once('unlock', function() {
                                                                                            s_aSounds[s_aSoundsInfo[i].ingamename].play();
                                                                                            if(s_aSoundsInfo[i].ingamename === "soundtrack" && s_oGame !== null){
                                                                                                setVolume("soundtrack",SOUNDTRACK_VOLUME_IN_GAME);
                                                                                            }
                                                                                          });
                                                                                         break;
                                                                                     }
                                                                                 }
                                                                       
                                                            } 
                                                        });

            
        }, (bDelay ? 200 : 0) );
    };
    
    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_help","./sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("ctl_logo","./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_restart","./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_credits","./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_undo","./sprites/but_undo.png");
        s_oSpriteLibrary.addSprite("but_save","./sprites/but_save.png");
        s_oSpriteLibrary.addSprite("but_arrow_left", "./sprites/but_arrow_left.png"); 
        s_oSpriteLibrary.addSprite("but_arrow_right", "./sprites/but_arrow_right.png"); 
        s_oSpriteLibrary.addSprite("but_no","./sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_yes","./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_delete","./sprites/but_delete.png");
        s_oSpriteLibrary.addSprite("but_hide_show","./sprites/but_hide_show.png");
        s_oSpriteLibrary.addSprite("but_backward","./sprites/but_backward.png");
        s_oSpriteLibrary.addSprite("but_forward","./sprites/but_forward.png");
        s_oSpriteLibrary.addSprite("but_save_image","./sprites/but_save_image.png");
        s_oSpriteLibrary.addSprite("but_stamp","./sprites/but_stamp.png");
        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("but_continue","./sprites/but_continue.png");
        s_oSpriteLibrary.addSprite("but_help_left", "./sprites/but_help_left.png");
        s_oSpriteLibrary.addSprite("but_help_right", "./sprites/but_help_right.png");
        s_oSpriteLibrary.addSprite("but_help_hide_show", "./sprites/but_help_hide_show.png");
        s_oSpriteLibrary.addSprite("but_backward_help","./sprites/but_backward_help.png");
        s_oSpriteLibrary.addSprite("but_forward_help","./sprites/but_forward_help.png");
         s_oSpriteLibrary.addSprite("but_delete_help","./sprites/but_delete_help.png");
        
        s_oSpriteLibrary.addSprite("logo_menu","./sprites/logo_menu.png");
        s_oSpriteLibrary.addSprite("rotate_bottom_left","./sprites/rotate_bottom_left.png");
        s_oSpriteLibrary.addSprite("scale_left","./sprites/scale_left.png");
        s_oSpriteLibrary.addSprite("hand","./sprites/hand.png");
        
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("item_selection_bar", "./sprites/item_selection_bar.png");
        s_oSpriteLibrary.addSprite("item_pool_bar", "./sprites/item_pool_bar.png");
        s_oSpriteLibrary.addSprite("item_selector", "./sprites/item_selector.png");
        s_oSpriteLibrary.addSprite("item_optional_bar", "./sprites/item_optional_bar.png");
        s_oSpriteLibrary.addSprite("item_sub_optional_bar", "./sprites/item_sub_optional_bar.png");   

        for (var i = 0; i < ITEMS_SETTINGS.length; i++)
        {
            var iItems = ITEMS_SETTINGS[i].items;
            var szName = ITEMS_SETTINGS[i].name;
            for(var j = 0; j < iItems; j++)
            {
                s_oSpriteLibrary.addSprite(szName +"_" + j,
                    "./sprites/items/" + szName + "/" + szName +"_" + j + ".png");
                  s_oSpriteLibrary.addSprite("thumb_" + szName +"_" + j,
                    "./sprites/thumbs/" + szName + "/"+szName +"_" + j + ".png");
            }
            
        }

        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onAllResourcesLoaded = function(){
        _oPreloader.unload();
        
        try{
            saveItem("ls_available","ok");
        }catch(evt){

            s_bStorageAvailable = false;
        }
       
        s_oSoundTrack = playSound("soundtrack",1,true);  
        this.gotoMenu();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;

        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.clearLocalStorage = function(){
        s_iLastLevel = 1;
        if(s_bStorageAvailable){
            localStorage.clear();
        }
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };

    this.gotoGame = function(iGameEvent){
        _oGame = new CGame(iGameEvent);  
        $(s_oMain).trigger("start_session");
        _iState = STATE_GAME;
    };
    
    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            Howler.mute(true);
        }        
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            if(s_bAudioActive){
                Howler.mute(false);
            }
        }      
    };
    
    this._update = function(event){
        if(_bUpdate === false){
                return;
        }
        
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    
    _oData = oData;
    
    
    ENABLE_FULLSCREEN = oData.fullscreen;
    ENABLE_CHECK_ORIENTATION = oData.check_orientation;
    PRIORITY_DEPTH_SELECTED_ITEM = oData.selected_item_depth_upper_all;
    AUTOMATIC_DRAG_TEMP_ITEM_TO_FIELD = oData.automatic_drag_items_on_field;
    
    s_bAudioActive = oData.audio_enable_on_startup;
    
    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_bFullscreen = false;

var s_oDrawLayer;
var s_oStage;
var s_oFlashStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_oCanvas;
var s_iLastLevel = 1;
var s_bStorageAvailable = true;
var s_aSounds;
var s_aSoundsInfo;
var s_aGameData;

function CTextButton(iXPos, iYPos, oSprite, szText, szFont, szColor, iFontSize,oParentContainer) {

    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oText;
    var _oTextBack;
    var _oListenerMouseDown;
    var _oListenerMouseUp;
    var _oParentContainer;
    
    this._init = function (iXPos, iYPos, oSprite, szText, szFont, szColor, iFontSize) {

        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        var oButtonBg = createBitmap(oSprite);

        var iStepShadow = Math.ceil(iFontSize / 20);

        _oTextBack = new createjs.Text(szText, iFontSize + "px " + PRIMARY_FONT, "#000000");
        _oTextBack.textAlign = "center";
        _oTextBack.textBaseline = "alphabetic";
        var oBounds = _oTextBack.getBounds();
        _oTextBack.x = oSprite.width / 2 + iStepShadow;
        _oTextBack.y = Math.floor((oSprite.height) / 2) + (oBounds.height / 3) + iStepShadow;

        _oText = new createjs.Text(szText, iFontSize + "px " + PRIMARY_FONT, szColor);
        _oText.textAlign = "center";
        _oText.textBaseline = "alphabetic";
        var oBounds = _oText.getBounds();
        _oText.x = oSprite.width / 2;
        _oText.y = Math.floor((oSprite.height) / 2) + (oBounds.height / 3);

        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.regX = oSprite.width / 2;
        _oButton.regY = oSprite.height / 2;
        _oButton.addChild(oButtonBg, _oTextBack, _oText);

        _oParentContainer.addChild(_oButton);

        if (!s_bMobile)
            _oButton.cursor = "pointer";

        this._initListener();
    };

    this.unload = function () {
        _oButton.off("mousedown",_oListenerMouseDown);
        _oButton.off("pressup",_oListenerMouseUp);

        _oParentContainer.removeChild(_oButton);
    };

    this.setVisible = function (bVisible) {
        _oButton.visible = bVisible;
    };

    this._initListener = function () {
        _oListenerMouseDown = _oButton.on("mousedown", this.buttonDown);
        _oListenerMouseUp = _oButton.on("pressup", this.buttonRelease);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.buttonRelease = function () {
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;
        
        playSound("press_but", 1, false);
        
        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP]);
        }
    };

    this.buttonDown = function () {
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
        }
    };

    this.changeText = function(szText){
        _oText.text = szText;
        _oTextBack.text = szText;
    };
    
    this.setTextPosition = function (iY) {
        _oText.y = iY;
        _oTextBack.y = iY + 2;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oButton.x = iXPos;
        _oButton.y = iYPos;
    };

    this.setX = function (iXPos) {
        _oButton.x = iXPos;
    };

    this.setY = function (iYPos) {
        _oButton.y = iYPos;
    };

    this.getButtonImage = function () {
        return _oButton;
    };

    this.getX = function () {
        return _oButton.x;
    };

    this.getY = function () {
        return _oButton.y;
    };
    
    _oParentContainer = oParentContainer;
    this._init(iXPos, iYPos, oSprite, szText, szFont, szColor, iFontSize);

    return this;

}


function CToggle(iXPos, iYPos, oSprite, bActive, oParentContainer) {
    var _bActive;
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _oListenerMouseDown;
    var _oListenerMouseUp;
    var _oParentContainer;

    this._init = function (iXPos, iYPos, oSprite, bActive, oParentContainer) {
        if (oParentContainer !== undefined) {
            _oParentContainer = oParentContainer;
        } else {
            _oParentContainer = s_oStage;
        }

        _aCbCompleted = new Array();
        _aCbOwner = new Array();

        var oData = {
            images: [oSprite],
            // width, height & registration point of each sprite
            frames: {width: oSprite.width / 2, height: oSprite.height, regX: (oSprite.width / 2) / 2, regY: oSprite.height / 2},
            animations: {state_true: [0], state_false: [1]}
        };


        var oSpriteSheet = new createjs.SpriteSheet(oData);

        _bActive = bActive;

        _oButton = createSprite(oSpriteSheet, "state_" + _bActive, (oSprite.width / 2) / 2, oSprite.height / 2, oSprite.width / 2, oSprite.height);

        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.stop();

        if (!s_bMobile)
            _oButton.cursor = "pointer";

        _oParentContainer.addChild(_oButton);

        this._initListener();
    };

    this.unload = function () {
        _oButton.off("mousedown", _oListenerMouseDown);
        _oButton.off("pressup", _oListenerMouseUp);

        _oParentContainer.removeChild(_oButton);
    };

    this._initListener = function () {
        _oListenerMouseDown = _oButton.on("mousedown", this.buttonDown);
        _oListenerMouseUp = _oButton.on("pressup", this.buttonRelease);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.setCursorType = function (szValue) {
        _oButton.cursor = szValue;
    };

    this.setActive = function (bActive) {
        _bActive = bActive;
        _oButton.gotoAndStop("state_" + _bActive);
    };
    
    this.getActive = function() {
        return _bActive;
    };
    
    this.setVisible = function (bVal){
        _oButton.visible = bVal;
    };
    
    this.getVisible = function (){
        return _oButton.visible;
    };

    this.buttonRelease = function () {
        _oButton.scaleX = 1;
        _oButton.scaleY = 1;

        playSound("press_but", 1, false);

        _bActive = !_bActive;
        _oButton.gotoAndStop("state_" + _bActive);

        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP], _bActive);
        }
    };

    this.buttonDown = function () {
        _oButton.scaleX = 0.9;
        _oButton.scaleY = 0.9;

        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
        }
    };

    this.setPosition = function (iX, iY) {
        _oButton.x = iX;
        _oButton.y = iY;
    };

    this._init(iXPos, iYPos, oSprite, bActive, oParentContainer);
}

function CGfxButton(iXPos, iYPos, oSprite, oParentContainer) {
    var _aCbCompleted;
    var _aCbOwner;
    var _oButton;
    var _aParams;
    var _fScaleX;
    var _fScaleY;
    var _oParent;
    var _oTween;
    var _oListenerMouseDown;
    var _oListenerMouseUp;
    var _bBlock;

    var _oParentContainer;

    this._init = function (iXPos, iYPos, oSprite) {

        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _aParams = new Array();

        _oButton = createBitmap(oSprite);
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.regX = oSprite.width / 2;
        _oButton.regY = oSprite.height / 2;

        _fScaleX = 1;
        _fScaleY = 1;

        _bBlock = false;
       
        if (!s_bMobile)
            _oButton.cursor = "pointer";

        _oParentContainer.addChild(_oButton);

        this._initListener();
    };

    this.unload = function () {
        _oButton.off("mousedown", _oListenerMouseDown);
        _oButton.off("pressup", _oListenerMouseUp);

        _oParentContainer.removeChild(_oButton);
    };

    this.setVisible = function (bVisible) {
        _oButton.visible = bVisible;
    };

    this.setCursorType = function (szValue) {
        _oButton.cursor = szValue;
    };

    this._initListener = function () {
        _oListenerMouseDown = _oButton.on("mousedown", this.buttonDown);
        _oListenerMouseUp = _oButton.on("pressup", this.buttonRelease);
    };

    this.addEventListener = function (iEvent, cbCompleted, cbOwner) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };

    this.addEventListenerWithParams = function (iEvent, cbCompleted, cbOwner, aParams) {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams[iEvent] = aParams;
    };

    this.buttonRelease = function () {
        if (_bBlock) {
            return;
        }
       
        if (_fScaleX > 0) {
            _oButton.scaleX = _fScaleX;
        } else {
            _oButton.scaleX = -_fScaleX;
        }
        _oButton.scaleY = _fScaleY;

        playSound("press_but", 1, false);

        if (_aCbCompleted[ON_MOUSE_UP]) {
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP], _aParams[ON_MOUSE_UP]);
        }
    };

    this.buttonDown = function () {
        if (_bBlock) {
            return;
        }
        
        if (_fScaleX > 0) {
            _oButton.scaleX = _fScaleX*0.9;
        } else {
            _oButton.scaleX = -_fScaleX*0.9;
        }
        _oButton.scaleY = _fScaleY*0.9;

        if (_aCbCompleted[ON_MOUSE_DOWN]) {
            _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN], _aParams[ON_MOUSE_DOWN]);
        } 
    };

    this.rotation = function (iRotation) {
        _oButton.rotation = iRotation;
    };

    this.getButton = function () {
        return _oButton;
    };

    this.setPosition = function (iXPos, iYPos) {
        _oButton.x = iXPos;
        _oButton.y = iYPos;
    };

    this.setX = function (iXPos) {
        _oButton.x = iXPos;
    };

    this.setY = function (iYPos) {
        _oButton.y = iYPos;
    };

    this.getButtonImage = function () {
        return _oButton;
    };
    
    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };

    this.block = function (bVal) {
        
        _bBlock = bVal;
        _oButton.scaleX = _fScaleX;
        _oButton.scaleY = _fScaleY;

    };

    this.setScaleX = function (fValue) {
        _oButton.scaleX = fValue;
        _fScaleX = fValue;
    };
    
    this.setScale = function(iScale){
        _fScaleX = iScale;
        _fScaleY = iScale;
         _oButton.scaleX = _oButton.scaleY = iScale;
    };
    
    this.setRotation = function(fVal){
        _oButton.rotation = fVal;
    };
    
    this.getX = function () {
        return _oButton.x;
    };

    this.getY = function () {
        return _oButton.y;
    };
    
    this.setRegPoints = function(pReg){
        _oButton.regX  = pReg.regX;
        _oButton.regY = pReg.regY;
    };

    this.pulseAnimation = function () {
        _oTween = createjs.Tween.get(_oButton).to({scaleX: _fScaleX * 0.9, scaleY: _fScaleY * 0.9}, 850, createjs.Ease.quadOut).to({scaleX: _fScaleX, scaleY: _fScaleY}, 650, createjs.Ease.quadIn).call(function () {
            _oParent.pulseAnimation();
        });
    };

    this.trebleAnimation = function () {
        _oTween = createjs.Tween.get(_oButton).to({rotation: 5}, 75, createjs.Ease.quadOut).to({rotation: -5}, 140, createjs.Ease.quadIn).to({rotation: 0}, 75, createjs.Ease.quadIn).wait(750).call(function () {
            _oParent.trebleAnimation();
        });
    };
    
    this.getGraphic = function (){
        return _oButton;
    };

    this.removeAllTweens = function () {
        createjs.Tween.removeTweens(_oButton);
    };

    if (oParentContainer !== undefined) {

        _oParentContainer = oParentContainer;
    } else {
        _oParentContainer = s_oStage;
    }

    this._init(iXPos, iYPos, oSprite);

    _oParent = this;

    return this;
}

function CGame(iGameState)
{
    var _oInterface;
    
    var _oContainer;
    var _oContainerCategoryBars;
    var _oContainerOptionalBars;
    
    var _oFade;
    var _oAreYouSurePanel;
    var _oHelpPanel;
    var _oCategoryBarItems;
    var _aSubCategoryItemsBar;
    var _oItemsField;
    var _oTweenBars;
    var _bDropBackBar;
    var _oOptionalBar;
    var _oController;
    var _oEffectText;
    var _oBlockShape;
    var _oInteractiveHelp;
    var _aSubOptionalBar;
    var _pOptionalBarDim;
    
    var _iSelectedSubBar;
    var _iLastSelectedSubBar;
    var _iSelectedOptBar;
    var _iLastSelectedOptBar;
    
    this._init = function(iGameState)
    {      
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        _oBlockShape = new createjs.Shape();
        _oBlockShape.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oBlockShape.on("click", function(){});
        _oBlockShape.visible = false;
        _oBlockShape.cache(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        s_oStage.addChild(_oBlockShape);
         
        this.createInterface();

        this.createPanels();
        
        _iSelectedSubBar = _iLastSelectedSubBar = null;
        _iSelectedOptBar = _iLastSelectedOptBar = null;
        
        _oController = new CController();
        _oController.addEventListener(ON_PRESS_DOWN_KEY_DEL, this._onPressKeyDownDel, this);
        
        _oItemsField = new CItemsFieldManagement (_oContainer, iGameState);
        _oItemsField.addEventListener(ON_PRESS_DOWN_DINAMIC_ITEM, this._onPressDownDinamicItemField, this);
        _oItemsField.addEventListener(ON_PRESS_UP_TEMP, this._onPressUpTempItem, this);
        _oItemsField.addEventListener(ON_PRESS_FIELD, this.onPressField, this);
        _oItemsField.addEventListener(ON_SET_TEMP_ITEM, this.onSetTempItem, this);
        _oItemsField.addEventListener(ON_PRESS_MOVE_DINAMIC_ITEM, this._onPressMoveDinamicItemField, this);
        _oItemsField.addEventListener(ON_PRESS_UP_DINAMIC_ITEM, this._onPressUpDinamicItemField, this);
        _oItemsField.addEventListener(ON_PRESS_DOWN_STATIC_ITEM, this._onPressDownStaticItemField, this);
        _oItemsField.addEventListener(ON_PRESS_MOVE_EDIT_SCALE, this._onPressMoveDinamicItemEditScale, this);
        _oItemsField.addEventListener(ON_END_DINAMIC_ITEM_MOVEMENT, this._onEndItemMovement, this);
        
        this.createItemsBars();  
        
        _oTweenBars = null;
        _oEffectText = null;
        _bDropBackBar = false;
        _aSubOptionalBar = null;
        
        var rRect = _aSubCategoryItemsBar[0].getUsableArea();
        var oSubBarContainer = _aSubCategoryItemsBar[0].getContainer();
        rRect.x += oSubBarContainer.x - oSubBarContainer.regX;
        rRect.y += oSubBarContainer.y + oSubBarContainer.regY*2;
        
        _oItemsField.setLimitedBarArea(rRect);
        
        _oController.setInput(false);
        
        _oInteractiveHelp = new CInteractiveHelp(s_oStage);
        _oInteractiveHelp.addEventListener(ON_END_TUTORIAL, this._onEndATutorial, this);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        s_oStage.addChild(_oFade);
        _oFade.on("click", function(){});
        
        createjs.Tween.get(_oFade).to({alpha:0, visible: false}, 1000);
        
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };
    
    this.unload = function()
    {
        _oInterface.unload();
     
        _oAreYouSurePanel.unload();
        
        _oCategoryBarItems.unload();
        
        _oController.unload();
        
        _oBlockShape.removeAllEventListeners();
        _oFade.removeAllEventListeners();
        
        for(var i = 0; i < _aSubCategoryItemsBar.length; i++){
          _aSubCategoryItemsBar[i].unload();
        }
        
        _oOptionalBar.unload();
        
        if(_aSubOptionalBar !== null){
            for(var i = 0; i < _aSubOptionalBar.length; i++){
                _aSubOptionalBar[i].unload();
            }
        }
        
        _oItemsField.unload();
        _oCategoryBarItems.unload();
        _oInterface.unload();

        _oAreYouSurePanel.unload();

        _oContainer.removeAllEventListeners();
        createjs.Tween.removeAllTweens();
        
        s_oStage.removeAllChildren();
        s_oStage.removeAllEventListeners();
        s_oGame = null;
    };
    
    this.createItemsBars = function()
    {
        _oContainerCategoryBars = new createjs.Container();
        _oContainer.addChild(_oContainerCategoryBars);
        
        _oContainerOptionalBars = new createjs.Container();
        _oContainerOptionalBars.visible = false;
        _oContainer.addChild(_oContainerOptionalBars);
        
        var oSpriteSubOptionalBar = s_oSpriteLibrary.getSprite("item_optional_bar");
        var pPosOptionalBar = {x: CANVAS_WIDTH / 2, y: CANVAS_WIDTH / 2};
        _oOptionalBar = new CButtonsBar(_oContainerOptionalBars, oSpriteSubOptionalBar, true, null, pPosOptionalBar);
        _oOptionalBar.setPos(CANVAS_WIDTH*0.5, CANVAS_HEIGHT*0.5);
        _oOptionalBar.createMask(OFFSET_MASK_X);
        _oOptionalBar.setInfo({id: null, type: null});
      
        _aSubCategoryItemsBar = new Array();
        var oSpriteSubBar = s_oSpriteLibrary.getSprite("item_pool_bar");
        var pSubCategoryBarPos = {x: CANVAS_WIDTH / 2, y: oSpriteSubBar.height / 2 + 10};
        
        var iID = 0;
        for (var i = 0 ; i < ITEMS_SETTINGS.length; i++)
        {
              switch(ITEMS_SETTINGS[i].property.type){
                case OPTIONAL_ITEMS:
                    break;
                default:
                    var aSubCategoryItems = new Array();
                    var iVariants = ITEMS_SETTINGS[i].items;
                    var oBar = new CButtonsBar(_oContainerCategoryBars, oSpriteSubBar, false, iID, pSubCategoryBarPos);
                    oBar.setVisible(false);
                    oBar.addEventListener(ON_PRESS_DOWN, this._onPressDownSubCatergoryItem, this);
                    oBar.addEventListener(ON_PRESS_UP, this._onPressUpSubCatergoryItem, this);
                    oBar.createMask(OFFSET_MASK_X);
                    
                    var aVariant = new Array();     
                    for(var j = 0; j < iVariants; j++){
                        aVariant.push(ITEMS_SETTINGS[i]);
                    }
                    
                    aSubCategoryItems.push(aVariant);
                    oBar.createGraphicsItems(aSubCategoryItems);
                    _aSubCategoryItemsBar.push(oBar);
                    iID++;
                break;
            }
        }
        
         var oSpriteSubOptionalBar = s_oSpriteLibrary.getSprite("item_sub_optional_bar");
         _pOptionalBarDim = {
                                width: oSpriteSubOptionalBar.width,
                                height: oSpriteSubOptionalBar.height + oSpriteSubBar.height + 10
                            };
        
        var oSpriteCategoryBar = s_oSpriteLibrary.getSprite("item_selection_bar");
        var pCategoryBarPos = {x: CANVAS_WIDTH / 2, y: oSpriteCategoryBar.height / 2 + 10};
        _oCategoryBarItems = new CButtonsBar(_oContainerCategoryBars, oSpriteCategoryBar, true, 0, pCategoryBarPos);
        _oCategoryBarItems.createMask(OFFSET_MASK_X);
        _oCategoryBarItems.addEventListener(ON_PRESS_DOWN, this._onSelectionItem, this );
        
        var aCategoryItems = new Array();

        for (var i = 0; i < ITEMS_SETTINGS.length; i++)
        {
            switch(ITEMS_SETTINGS[i].property.type){
                case OPTIONAL_ITEMS:
                    break;
                default:
                    aCategoryItems.push([ITEMS_SETTINGS[i]]);
                    break;
            }
        }
      
      _oCategoryBarItems.createGraphicsItems(aCategoryItems);
    };
    
    this.createInterface = function()
    {
      _oInterface = new CInterface();
      //RIGHT SIDE
      _oInterface.addEventListener(ON_PRESS_EXIT, this._onPressUpButtonExit, this);
      _oInterface.addEventListener(ON_PRESS_UNDO, this._onPressUpButtonUndo, this);
      _oInterface.addEventListener(ON_PRESS_RESTART, this._onPressUpRestartButton, this, true);
      _oInterface.addEventListener(ON_PRESS_SAVE, this._onPressUpButtonSave, this, true);
      _oInterface.addEventListener(ON_PRESS_SAVE_IMAGE, this._onPressUpButSaveImage, this);
      //LEFT SIDE
      _oInterface.addEventListener(ON_PRESS_TOGGLE_GUI, this._onPressUpToggleGUI, this);

  };
    
    this.createPanels = function()
    {
        _oAreYouSurePanel = new CAreYouSurePanel(TEXT_ARE_SURE_RESTART);    
        
        var oSpritePanel = s_oSpriteLibrary.getSprite("msg_box");
        _oHelpPanel = new CHelpPanel(oSpritePanel);
        _oHelpPanel.addEventListener(ON_PRESS_YES, this._onPressUpHelpYesButton, this);
    };
    
    this.restartGame = function()
    {
        _oItemsField.resetField();
        _oCategoryBarItems.reset();
        this.hideActiveSubCategoryBar();
        this.hideOptionalBars();
        _iSelectedSubBar = null;
        _iLastSelectedSubBar = null;
        _iLastSelectedOptBar = null;
        _oController.setInput(true);
        
        createjs.Tween.get(_oFade).to({alpha:0, visible: false}, 1000, createjs.Ease.cubicOut);
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("restart_level", 0);
    };
    
    this._exitGame = function(){
        this._onPressUpToggleGUI(false);
        _oFade.visible = true;
        var oTween = createjs.Tween.get(_oFade);
        oTween.to({alpha:1}, 1000, createjs.Ease.cubicIn);
        oTween.call(function(){
            this.unload();
            
            s_oMain.gotoMenu();
            $(s_oMain).trigger("end_level");
            $(s_oMain).trigger("end_session");
            $(s_oMain).trigger("show_interlevel_ad");
            
        }, this, this);
    };

    this._onSelectionItem = function(oInfo)
    {
        var iSelectedBarID = oInfo.id;
        _iSelectedSubBar = iSelectedBarID;
        
        var oCbFunc = {completed: this.onAnotherSelectionItem, scope: this};
        
        this._onMainBarItemSelection(_iSelectedSubBar, _iLastSelectedSubBar, _aSubCategoryItemsBar, oCbFunc);
        
        _oItemsField.hideEditController();
        _iLastSelectedSubBar = iSelectedBarID;   
    };
    
    this.onAnotherSelectionItem = function (iLast)
    {
        //_aSubCategoryItemsBar[iLast].reset();
        _aSubCategoryItemsBar[_iSelectedSubBar].setVisible(true);
        _aSubCategoryItemsBar[_iSelectedSubBar].animationShow();
    };
    
    this.hideActiveSubCategoryBar = function()
    {  
        this.hideActiveSubBar(_aSubCategoryItemsBar, _oCategoryBarItems, _iSelectedSubBar, _iLastSelectedSubBar);
        _iSelectedSubBar = null;
        _iLastSelectedSubBar = null;
    };
    
    this.hideActiveSubOptionalBar = function()
    {  
        this.hideActiveSubBar(_aSubOptionalBar, _oOptionalBar, _iSelectedOptBar, _iLastSelectedOptBar);
        _iSelectedOptBar = null;
        _iLastSelectedOptBar = null;
    };
    
    this._onPressUpHelpYesButton = function()
    {
        _oHelpPanel.hide();
        _oController.setInput(true);
        $(s_oMain).trigger("start_level", 0);
    };

    this._onPressUpButtonUndo = function ()
    {
        _oItemsField.hideEditController();
        _oItemsField.undoAction();
        this.hideActiveSubCategoryBar();
        this.hideOptionalBars();
    };
    
    this._onPressDownStaticItemField = function(oItem){
        this.showOptionalBars(oItem);
        _oItemsField.setVisibleButtonsDepth(false);
    };
    
    this._onPressDownDinamicItemField = function(oItem)
    {
        this.hideOptionalBars();
    };
    
    this._onPressDownSubCatergoryItem = function(oInfo)
    {
        var oPressedItem = _aSubCategoryItemsBar[_iSelectedSubBar].getItemByID(oInfo.id);
        var iLimitedArea = ITEMS_PROPERTIES[oPressedItem.getType()].type;
        switch(iLimitedArea){
            case STATIC_ITEMS:
                    var oItem = _oItemsField.substituteStaticItem(
                                                                        oPressedItem.getType(),
                                                                        oPressedItem.getVariant(),
                                                                        false
                                                                     );
                    if(oItem.getVisible()){
                        this.showOptionalBars(oItem);
                    }else {
                        this.hideOptionalBars();
                    }
                break;
            default:
                if(!AUTOMATIC_DRAG_TEMP_ITEM_TO_FIELD){
                    this.hideCategoryBars();
                }
                this.hideOptionalBars();
                _oItemsField.createTempItemField(oPressedItem, oInfo);
                oPressedItem.setVisible(false);
        }
    };
         
    this._onPressUpSubCatergoryItem = function( oInfo)
    {  
        
        _aSubCategoryItemsBar[oInfo.type].resetDraggedItem(oInfo.id);
        
        this.showCategoryBars();
    };
    
    this.onPressField = function()
    {  
        if(_oContainerCategoryBars.y < 0 && _oTweenBars === null)
        {
            this.showCategoryBars();
        }else if(_oTweenBars === null)
        {
            this.hideCategoryBars();
            this.hideOptionalBars();
        }
 
     
        _oItemsField.hideEditController();
    };
    
    this._onPressUpTempItem = function(oInfo){
        if(oInfo.item_field){
            this.showOptionalBars(oInfo.item);
        }
    };
    
    this._onPressMoveDinamicItemField = function(oInfo){
        
    };
    
    this._onPressUpDinamicItemField = function(oInfo){
          this.showOptionalBars(oInfo.item);
    };
    
    this._onPressUpToggleGUI = function(bVal)
    {
        _oInterface.setVisibleInterface(bVal);
        if(bVal)
        {//SHOW INTERFACE GUI
            _oBlockShape.visible = false;
            this.showCategoryBars();
            
        }else
        {// HIDE INTERFACE GUI
           _oBlockShape.visible = true;
            this.hideCategoryBars();
            this.hideActiveSubCategoryBar();
            this.hideOptionalBars();
            _oItemsField.hideEditController();
        }
        _oBlockShape.updateCache();
    };
    
    this.showOptionalBars = function(oItem){
        var oProperty = ITEMS_SETTINGS[oItem.getType()].property;
        if(oProperty.optional === null){
            return;
        }
        
        var oInfo = _oOptionalBar.getInfo();
        if(oItem.getID() !== oInfo.id || oItem.getType() !== oInfo.type){
            if(oInfo.id !== null){
                this.deleteOptionalBars();
            }
            
            this.createOptionalBar(oItem, oProperty);
            _oContainerOptionalBars.scaleX = _oContainerOptionalBars.scaleY = 0;
        }
        _oContainerOptionalBars.visible = true;
        
        this.refreshContainerOptionalPos(oItem);
       
        var oTween = createjs.Tween.get(_oContainerOptionalBars, {override: true});
            oTween.to({scaleX: 1, scaleY:1}, 500, createjs.Ease.bounceOut);
    };
    
    this.hideOptionalBars = function(){
    
        if(!_oContainerOptionalBars.visible){
            return;
        }
        
       var oTween = createjs.Tween.get(_oContainerOptionalBars, {override: true});
       oTween.to({scaleX: 0, scaleY: 0, visible: false}, 300, createjs.Ease.backIn);
    };
    
    this._onPressKeyDownDel = function(){
     
        if(!_oInteractiveHelp.exeTutorial()){
            _oItemsField._onPressUpButtonDelete();
        }
    };
    
    this._onPressMoveDinamicItemEditScale = function(oItem){
        this.refreshContainerOptionalPos(oItem);
    };
    
    this._onEndItemMovement = function(oInfo){
        var evt = oInfo.evt;
        var oItem = oInfo.item;
        
        this._checkInteractiveTutorial(oItem);
    };
    
    this._checkInteractiveTutorial = function(oItem){
        if(oItem === undefined){
            return;
        }
        var bRun = false;
        if(_oInteractiveHelp.toExecuteTutorial(ROTATION_TUTORIAL) 
               && (oItem.getEditType()  === ROTATION_ONLY 
               || oItem.getEditType() === FULL_EDITABLE)){
            _oItemsField.triggerRotationTutorial(_oInteractiveHelp);
            bRun = true;
        }
        
        if(_oInteractiveHelp.toExecuteTutorial(SCALE_TUTORIAL) 
               && (oItem.getEditType()  === SCALE_ONLY 
               || oItem.getEditType() === FULL_EDITABLE)){
             _oItemsField.triggerScaleTutorial(_oInteractiveHelp); 
             bRun = true;
        }
        
        if(_oInteractiveHelp.toExecuteTutorial(DEPTH_TUTORIAL)){
            var bDepth = _oItemsField.triggerDepthTutorial(_oInteractiveHelp);
            
            bRun = bRun ? bRun : bDepth;
        }
        
        var oProperty = ITEMS_SETTINGS[oItem.getType()].property;
      
        if(_oInteractiveHelp.toExecuteTutorial(OPTIONAL_TUTORIAL)
                && oProperty.optional !== null){
            this.triggerOptionalTutorial(oItem);  
            bRun = true;
        }      
        
        if(bRun){
            this._hideBars();
        }
    };
    
    this.triggerOptionalTutorial = function (oItem){
        var oInfo = {
                        tutorial: OPTIONAL_TUTORIAL, 
                        info: {
                                optional_bar: _oOptionalBar,
                                sub_optional_bar: _aSubOptionalBar,
                                cb_show_optional_bar: this.showOptionalBars,
                                cb_hide_sub_bar: this.hideActiveSubOptionalBar,
                                cb_scope: this,
                                movement: false,
                                pos:{x:0,y:0},
                                item: oItem
                              }       
                    };
                    
        _oInteractiveHelp.startTutorial(oInfo);
    };
    
    this._onPressDownOptionalItem = function(oInfo){
        _iSelectedOptBar = oInfo.id;
       
        var oCbFunc = {completed: this.onAnotherOptionalSelection, scope: this};
        
        this._onMainBarItemSelection(_iSelectedOptBar, _iLastSelectedOptBar, _aSubOptionalBar, oCbFunc);
        
        _iLastSelectedOptBar = _iSelectedOptBar;
    };
    
    this._onPressDownSubOptionalItem = function(oInfo){
        _oItemsField.setItemOptional(oInfo.id, oInfo.type);  
    };
    
    this.onAnotherOptionalSelection = function (iLast)
    {   
        _aSubOptionalBar[iLast].reset();
        _aSubOptionalBar[_iSelectedOptBar].setVisible(true);
        _aSubOptionalBar[_iSelectedOptBar].animationShow();
    };
    
    this.closeOpenedSubOptionalBar = function(){
        _aSubOptionalBar[_iLastSelectedOptBar].reset();
    };
    
    this.showCategoryBars = function()
    { 
        _oTweenBars = createjs.Tween.get(_oContainerCategoryBars, {override: true});
        _oTweenBars.to({y: s_iOffsetY }, 300, createjs.Ease.backOut).call(function(){
            _oTweenBars = null;
            _bDropBackBar = true;
        });
    };
    
    this.hideCategoryBars = function ()
    {
        _bDropBackBar = true;
        var iYPos = - _oContainerCategoryBars.getBounds().height - _oContainerCategoryBars.getBounds().y;
        _oTweenBars = createjs.Tween.get(_oContainerCategoryBars, {override: true});
        _oTweenBars.to({y: iYPos}, 300, createjs.Ease.backIn).call(function(){
            _oTweenBars = null;
            _bDropBackBar = false;
        });;
    };
    
    this.getDropBackBar = function(){
        return _bDropBackBar;
    };
    
    this.hideActiveSubBar = function(aSubBar, oMainBar, iSelection, iLastSelection){
        if(iSelection === null)
        {
            return;
        }
        aSubBar[iSelection].animationHide(function(iSel){
            //_aSubCategoryItemsBar[iSel].reset();
        }, this, iSelection);
        oMainBar.hideSelector();
        iLastSelection = null;
    };
    
    
    this._onMainBarItemSelection = function(iSelection, iLastSelection, aSubBar, oCbFunc){
        if(iLastSelection !== null)
        {
            if(iLastSelection === iSelection)
            {
                return;
            } 
       
            aSubBar[iLastSelection].animationHide(oCbFunc.completed, oCbFunc.scope, iLastSelection);
        }else{
            aSubBar[iSelection].setVisible(true);
            aSubBar[iSelection].animationShow();
        }
    };
    
    this.createOptionalBar  = function(oItem, oProperty){
        var aOptional = oProperty.optional;

        //MAIN OPTIONAL BAR
        var aOptionalItems = new Array();
        
        for (var i = 0; i < aOptional.length; i++)
        {
            aOptionalItems.push([ITEMS_SETTINGS[aOptional[i]]]); 
        }
        
        _oOptionalBar.setPos(0, 0);
        _oOptionalBar.createGraphicsItems(aOptionalItems);
        _oOptionalBar.setVisible(true);
        _oOptionalBar.setInfo({id: oItem.getID(), type: oItem.getType()});
        _oOptionalBar.addEventListener(ON_PRESS_DOWN, this._onPressDownOptionalItem, this);
        _oOptionalBar.hideSelector();
        
        _aSubOptionalBar = new Array();
        
        var oSpriteSubOptionalBar = s_oSpriteLibrary.getSprite("item_sub_optional_bar");
        var pPosSubOptinalBar = {x: 0, y: 0};
        for(var i = 0; i < aOptional.length; i++){
            var iVariants = ITEMS_SETTINGS[aOptional[i]].items;
            var oBar = new CButtonsBar(_oContainerOptionalBars, oSpriteSubOptionalBar, false, i, pPosSubOptinalBar);
            _oContainerOptionalBars.setChildIndex(oBar.getContainer(),0);
            oBar.setVisible(false);

            oBar.addEventListener(ON_PRESS_DOWN, this._onPressDownSubOptionalItem, this);
            
            var aSubOptionalItems = new Array();
            
            var aVariant = new Array();     
            for(var j = 0; j < iVariants; j++){
                aVariant.push(ITEMS_SETTINGS[aOptional[i]]);
            }

            aSubOptionalItems.push(aVariant);
            oBar.createGraphicsItems(aSubOptionalItems);
            _aSubOptionalBar.push(oBar);
        }
        
        this.refreshContainerOptionalPos(oItem);   
    };
    
    this.deleteOptionalBars = function(){
        _iSelectedOptBar = null;
        _iLastSelectedOptBar = null;
        
        _oOptionalBar.removeGraphicItem();
        _oOptionalBar.setInfo({id: null, type: null});
        
        for(var i = 0; i < _aSubOptionalBar.length; i++){
            _aSubOptionalBar[i].unload();
        }
        _aSubOptionalBar = null;
    };

    this.refreshContainerOptionalPos = function(oItem){
        if(!_oContainerOptionalBars.visible){
            return;
        }

        var oProperty = ITEMS_SETTINGS[oItem.getType()].property;
        var pPosBar = oProperty.optional_bar_pos[0];
        var pItemPos = oItem.getPos();
        var fScale = oItem.getGraphic().scaleX;
      
        if(pItemPos.x < CANVAS_WIDTH*0.5){
            pPosBar = oProperty.optional_bar_pos[1];
        }
        
        _oContainerOptionalBars.x = pItemPos.x  + (pPosBar.x* fScale);
        _oContainerOptionalBars.y = pItemPos.y  + (pPosBar.y* fScale);
        
        var iCurContainerY = _oContainerOptionalBars.y + _pOptionalBarDim.height;
        var iCanvasY = CANVAS_HEIGHT - s_iOffsetY;
        if(iCurContainerY > iCanvasY){
            _oContainerOptionalBars.y -=  iCurContainerY - iCanvasY;
        }
    };
     
    this.refreshButtonPos = function (iNewX, iNewY)
    {
        _oInterface.refreshButtonPos(iNewX, iNewY);
        _oItemsField.refreshFieldArea(iNewX,iNewY);
        _oContainerCategoryBars.y = iNewY;
        _oItemsField.refreshManipulatorButtonsPositionOffsets();
    };
    
    this._onEndATutorial = function(){
        this.showCategoryBars();
    };
    
    this._onPressUpButtonExit = function(){
        _oAreYouSurePanel.setText(TEXT_ARE_SURE_EXIT);
        _oAreYouSurePanel.show();
        _oAreYouSurePanel.addEventListener(ON_PRESS_YES, this._onPressUpButYesExit, this);
        _oAreYouSurePanel.addEventListener(ON_PRESS_NO, this._onPressUpButNoExit, this);     
        _oController.setInput(false);
    };
    
    
    this._onPressUpRestartButton = function (){
        _oAreYouSurePanel.setText(TEXT_ARE_SURE_RESTART);
        _oAreYouSurePanel.show();
        _oAreYouSurePanel.addEventListener(ON_PRESS_YES, this._onPressUpButYesRestart, this);
        _oAreYouSurePanel.addEventListener(ON_PRESS_NO, this._onPressUpButNoRestart, this);     
        _oController.setInput(false);
    };
    
    
    this._onPressUpButNoExit = function (){
        _oAreYouSurePanel.hide();
        _oController.setInput(true);
    };
    
    this._onPressUpButYesExit = function (){
        _oAreYouSurePanel.hide();
        this._exitGame();
    };
    
    this._onPressUpButNoRestart = function (){
        _oAreYouSurePanel.hide();
        _oController.setInput(true);
    };
    
    this._onPressUpButYesRestart = function (){
        _oAreYouSurePanel.hide();
        _oFade.visible = true;
        createjs.Tween.get(_oFade).to({alpha:1}, 1000, createjs.Ease.cubicOut).call(function(){
            this.restartGame();
        }, null, this);
    };
    
    this._onPressUpButtonSave = function (){
        if(_oEffectText === null){
            _oItemsField.saveField();
            _oEffectText = new CEffectText(TEXT_SAVED_ROOM,
                                           80,
                                           false,
                                           null,
                                          s_oStage);
            _oEffectText.addEventListener(ON_EFFECT_TEXT_END, this._onEndEffectText, this);
            _oEffectText.startAnimation(); 
        }
    };
    
    this._onPressUpButSaveImage = function(){
        this.prepareForOutput(this.saveImg, this);
    };
    
    this._onEndEffectText = function(){
        _oEffectText.unload();
        _oEffectText = null;
    };
    
    this.prepareForOutput = function(cbCompleted, cbOwner){
        var oFlash = new createjs.Shape();
        
        oFlash.graphics.beginFill("#fff").drawRect(
                                                    0,
                                                    0,
                                                    CANVAS_WIDTH,
                                                    CANVAS_HEIGHT
                                                  );
        oFlash.x = oFlash.regX = CANVAS_WIDTH*0.5;
        oFlash.y = oFlash.regY = CANVAS_HEIGHT*0.5;
        
        oFlash.scaleX = oFlash.scaleY = 0;
        oFlash.alpha = 0;
        s_oFlashStage.addChild(oFlash);
        
        var oTweenFlash = createjs.Tween.get(oFlash,{override: true}).to({scaleX:1, scaleY:1, alpha:1 }, 100);
        oTweenFlash.on("change", function(){
            s_oFlashStage.update();
        });
        playSound("photo_click", 1, false);
        oTweenFlash.call(function(){
            _oInterface.setVisible(false);
            _oContainerCategoryBars.visible = false;
            _oContainerOptionalBars.visible = false;
            _oItemsField.hideEditController();
            this.hideOptionalBars();
            if(_oEffectText !== null){
                this._onEndEffectText();
            }
        }, null, this);
        
        oTweenFlash.wait(FPS).call(function(){
            cbCompleted.call(cbOwner);
            _oInterface.setVisible(true);
            _oContainerCategoryBars.visible = true;
        }, null, this);
        
       oTweenFlash.to({alpha: 0 }, 50).call(function(){
           s_oFlashStage.removeChild(oFlash);
           s_oFlashStage.update();
           oTweenFlash.removeAllEventListeners();
       });
    };
    
    this._hideBars = function(){
        
        this.hideCategoryBars();
        this.hideActiveSubCategoryBar();
    };
    
    this.saveImg = function(){
        try{
            //Save image
            var link = document.createElement('a'); 
            document.body.appendChild(link); // Firefox requires the link to be in the body
            var szImageName = "room" + pad(Math.round(Math.random()*1000), 4)+".png";
            link.download = szImageName;
            link.href = s_oStage.toDataURL("image/png");
            link.click();
        }catch(e){
            console.log(e);
        }
    };

    this.update = function()
    {

    };

    s_oGame = this;

    this._init(iGameState);
}

var s_oGame = null;



function CInterface()
{
    var _oContainer;
    var _oContainerRight;
    var _oContainerLeft;
    var _oButRestart;
    var _oButExit;
    var _oButUndo;
    var _oButSave;
    var _oButSaveImage;
    var _oToggleGUI;
    var _oButFullscreen;
    var _rContainerRightBounds;

    var _oAudioToggle;
    var _bSettings;
  
    var _pStartPosToogleGUI;
    
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _bVisibleInterface;
    
    var _iContainerWidth;

    var _aCbCompleted;
    var _aCbOwner;
    var _aParams;
    
    this._init = function()
    {     
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        
        _bSettings = false;
        
        var oSpriteToogleGUI = s_oSpriteLibrary.getSprite("but_hide_show");
        _pStartPosToogleGUI = {x: (oSpriteToogleGUI.height/2) + 10, y: oSpriteToogleGUI.height /2 + 10};
        _oToggleGUI = new CToggle(_pStartPosToogleGUI.x, _pStartPosToogleGUI.y, oSpriteToogleGUI, false, _oContainer);
        _oToggleGUI.addEventListener(ON_MOUSE_UP,this._onToggleGUI, this);
        _oToggleGUI.setActive(true);
        _bVisibleInterface = true;
        
        _oContainerRight = new createjs.Container();
        _oContainer.addChild(_oContainerRight);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        var pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2) - 10, y: oSprite.height /2 + 10};
        _oButExit = new CGfxButton(pStartPosExit.x, pStartPosExit.y, oSprite, _oContainerRight);
        _oButExit.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_EXIT);
        
        _oAudioToggle = null;
        var pStartPosFullScreen;
        var pStartPosAudioToggle = {x: pStartPosExit.x, y: pStartPosExit.y + oSprite.height + 10};
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false)
        {
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _oAudioToggle = new CToggle(pStartPosAudioToggle.x, pStartPosAudioToggle.y,oSprite,s_bAudioActive, _oContainerRight);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);   
            pStartPosFullScreen = {x: pStartPosAudioToggle.x,y: pStartPosAudioToggle.y + oSprite.height + 10};
        }else{
            pStartPosFullScreen = {x: pStartPosExit.x, y: pStartPosExit.y + oSprite.height  + 10};
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        _oButFullscreen = null;
        var pStartPosRestart;
       
        if (_fRequestFullScreen && screenfull.isEnabled){
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen");
            
            _oButFullscreen = new CToggle(pStartPosFullScreen.x,pStartPosFullScreen.y,oSprite,s_bFullscreen,_oContainerRight);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreen, this);
            pStartPosRestart = {x:pStartPosFullScreen.x, y:pStartPosFullScreen.y + oSprite.height + 10};
        }else{
            oSprite =  s_oSpriteLibrary.getSprite('but_restart');
            if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
                pStartPosRestart = {x: pStartPosExit.x, y: pStartPosExit.y + oSprite.height + 10};
            }else{
                pStartPosRestart = {x: pStartPosAudioToggle.x, y: pStartPosAudioToggle.y + oSprite.height + 10};
            }
        }

        oSprite =  s_oSpriteLibrary.getSprite('but_restart');
        _oButRestart = new CGfxButton(pStartPosRestart.x, pStartPosRestart.y, oSprite, _oContainerRight);
        _oButRestart.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_RESTART);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_undo');
        var pStartPosUndo = {x: pStartPosRestart.x, y: pStartPosRestart.y + oSprite.height + 10};
        _oButUndo = new CGfxButton(pStartPosUndo.x, pStartPosUndo.y, oSprite, _oContainerRight);
        _oButUndo.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_UNDO);
        
        var pStartPosSaveImage = {x:pStartPosUndo.x, y:pStartPosUndo.y + oSprite.height + 10}
        oSprite =  s_oSpriteLibrary.getSprite('but_save_image');
        _oButSaveImage = new CGfxButton(pStartPosSaveImage.x, pStartPosSaveImage.y, oSprite, _oContainerRight);
        _oButSaveImage.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_SAVE_IMAGE);
        
        if(s_bStorageAvailable){
            var pStartPosSave = {x:pStartPosSaveImage.x, y:pStartPosSaveImage.y + oSprite.height + 10};;
            oSprite =  s_oSpriteLibrary.getSprite('but_save');
            _oButSave = new CGfxButton(pStartPosSave.x, pStartPosSave.y, oSprite, _oContainerRight);
            _oButSave.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_SAVE);
        }
        
        _oContainerLeft = new createjs.Container();
        _oContainer.addChild(_oContainerLeft);
        
        _rContainerRightBounds = new createjs.Rectangle();
        _rContainerRightBounds.copy(_oContainerRight.getBounds());
        
        _iContainerWidth = _rContainerRightBounds.width*2 + 10;
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _aParams = new Array();
    };
    
    this.unload = function()
    {
        _oButRestart.unload();
        _oButUndo.unload();
        if(s_bStorageAvailable){
            _oButSave.unload();
        }
        if(_oAudioToggle !== null){
            _oAudioToggle.unload();
        }
        if(_oButFullscreen !== null){
            _oButFullscreen.unload();
        }
    };
    
    this.refreshButtonPos = function(iNewX, iNewY)
    {
        _oContainerRight.x = -iNewX;
        _oContainerRight.y = iNewY;

        _oToggleGUI.setPosition(_pStartPosToogleGUI.x + iNewX, _pStartPosToogleGUI.y + iNewY);
    };

    this.setVisibleInterface = function(bVal)
    {
        if(_bVisibleInterface === bVal)
        {
            return;
        }
                 
        _bVisibleInterface = bVal;
        if(bVal)
        {
            createjs.Tween.get(_oContainerRight, {override: true}).to({x: -s_iOffsetX }, 300, createjs.Ease.backOut);
        }else{
         
            createjs.Tween.get(_oContainerRight, {override: true}).to({x: s_iOffsetX + _iContainerWidth}, 300, createjs.Ease.backIn);
        }
    };
    
    this._onToggleGUI = function(bActive)
    {
        if(_aCbCompleted[ON_PRESS_TOGGLE_GUI])
        {
           _aCbCompleted[ON_PRESS_TOGGLE_GUI].call(_aCbOwner[ON_PRESS_TOGGLE_GUI], bActive);
        }
    };
    
    this.resetFullscreenBut = function()
    {
	_oButFullscreen.setActive(s_bFullscreen);
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onFullscreen = function(){
        if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    this.getContainerRightBounds = function(){
        return _rContainerRightBounds;
    };
    
    this.getActiveGUI = function()
    {
        return _oToggleGUI.getActive();
    };

    this.setToggleGUI = function(bVal)
    {
        _oToggleGUI.setActive(bVal);
    };
    
    this.setVisible = function(bVal){
        _oContainer.visible = bVal;
    };
  
    this.triggerEvent = function(iEvent)
    {
        if(_aCbCompleted[iEvent])
        {
            _aCbCompleted[iEvent].call(_aCbOwner[iEvent], _aParams[iEvent]);
        }      
    };
    
    this.addEventListener = function (iEvent, cbCompleted, cbOwner, aParams)
    {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams[iEvent] = aParams;
        
    };

    this._init();
    s_oInterface = this;
    
    return this;
}

s_oInterface = null;

function CAreYouSurePanel(szText) {

    var _oButYes;
    var _oButNo;
    var _oFade;
    var _oContainer;
    var _oParent;
    var _oText;
    var _oOutlineText;
    
    var _pStartPanelPos;
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams;

    this._init = function (szText) 
    {
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.on("click", function(){});
        _oFade.visible = false;
        _oContainer = new createjs.Container();        
        s_oStage.addChild(_oFade, _oContainer);
            
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        var oPanel = createBitmap(oSprite);        
        oPanel.regX = oSprite.width/2;
        oPanel.regY = oSprite.height/2;
        oPanel.x = -20;
        _oContainer.addChild(oPanel);
        
        _oContainer.x = CANVAS_WIDTH/2;
        _oContainer.y = CANVAS_HEIGHT + oSprite.height/2;  
        _pStartPanelPos = {x: _oContainer.x, y: _oContainer.y};
        
        var iWidth = oSprite.width-300;
        var iHeight = 120;
        var iX = 0;
        var iY = -oSprite.height/2 + 170;
        _oOutlineText = new CTLText(_oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    54, "center", FONT_STROKE, PRIMARY_FONT, 1,
                    2, 2,
                    szText,
                    true, true, true,
                    false );
        _oOutlineText.setOutline(FONT_OUTLINE);
        _oText = new CTLText(_oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    54, "center", FONT_COLOR, PRIMARY_FONT, 1,
                    2, 2,
                    szText,
                    true, true, true,
                    false );

        var iY = 130;
        _oButYes = new CGfxButton(160, iY, s_oSpriteLibrary.getSprite('but_yes'), _oContainer);
        _oButYes.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_YES);

        _oButNo = new CGfxButton(-160, iY, s_oSpriteLibrary.getSprite('but_no'), _oContainer);
        _oButNo.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_NO);
        _oButNo.pulseAnimation();
        
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _aParams = new Array();
    };
    
    this.show = function()
    {
        _oFade.alpha = 0;
        _oContainer.x = _pStartPanelPos.x;
        _oContainer.y = _pStartPanelPos.y;  
        _oContainer.visible = true;
        _oFade.visible = true;
        createjs.Tween.get(_oContainer).to({y:CANVAS_HEIGHT/2 - 40}, 500, createjs.Ease.quartIn);
        createjs.Tween.get(_oFade).to({alpha:0.7}, 500);
        this.blockButtons(false);
    };
    
    this.hide = function()
    {
        _oFade.visible = false;
        _oContainer.visible = false;
        this.blockButtons(true);
    };
    
    this.setText = function(szText){
        _oOutlineText.refreshText(szText);
        _oText.refreshText(szText);
    };
    
    this.blockButtons = function(bVal){
        _oButNo.block(bVal);
        _oButYes.block(bVal);
    };
    
    this.triggerEvent = function(iEvent)
    {   
        if(_aCbCompleted[iEvent])
        {
            _aCbCompleted[iEvent].call(_aCbOwner[iEvent], _aParams[iEvent]);
        }      
    };
  
    this.addEventListener = function (iEvent, cbCompleted, cbOwner, aParams)
    {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams[iEvent] = aParams;
        
    };

    this.unload = function () {
        _oButNo.unload();
        _oButYes.unload();

        s_oStage.removeChild(_oFade);
        s_oStage.removeChild(_oContainer);

        _oFade.removeAllEventListeners();
    };

    _oParent = this;
    this._init(szText);
}



CTLText.prototype = {
    
    constructor : CTLText,
    
    __autofit : function(){
        if(this._bFitText){
            
            var iFontSize = this._iFontSize;            

            while(
                    this._oText.getBounds().height > (this._iHeight -this._iPaddingV*2) ||
                    this._oText.getBounds().width > (this._iWidth-this._iPaddingH*2)                
                 ){
                iFontSize--;
                   
                this._oText.font = iFontSize+"px "+this._szFont;
                this._oText.lineHeight = Math.round(iFontSize*this._fLineHeightFactor);   
                
                this.__updateY();        
                this.__verticalAlign();                                
         
                if ( iFontSize < 8 ){
                    break;
                }
            };
            
            this._iFontSize = iFontSize;
        }       
        
        //trace(this._oText.text + "-->fontsizedebug:"+iFontSize);
    },
    
    __verticalAlign : function(){
        if(this._bVerticalAlign){
            var iCurHeight = this._oText.getBounds().height;          
            this._oText.y -= (iCurHeight-this._iHeight)/2 + (this._iPaddingV);            
        }        
    },

    __updateY : function(){

        this._oText.y = this._y + this._iPaddingV;

        switch(this._oText.textBaseline){
            case "middle":{
                this._oText.y += (this._oText.lineHeight/2) +
                                 (this._iFontSize*this._fLineHeightFactor-this._iFontSize);                    
            }break;
        }
    },

    __createText : function(szMsg){
        
        if (this._bDebug){
            this._oDebugShape = new createjs.Shape();
            this._oDebugShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(
                    this._x, this._y, this._iWidth, this._iHeight);
            this._oContainer.addChild(this._oDebugShape);
        }

        this._oText = new createjs.Text(szMsg, this._iFontSize+"px "+this._szFont, this._szColor);
        this._oText.textBaseline = "middle";
        this._oText.lineHeight = Math.round(this._iFontSize*this._fLineHeightFactor);
        this._oText.textAlign = this._szAlign;
        
        
        if ( this._bMultiline ){
            this._oText.lineWidth = this._iWidth - (this._iPaddingH*2);
        }else{
            this._oText.lineWidth = null;
        }
        
        switch(this._szAlign){
            case "center":{
                this._oText.x = this._x+(this._iWidth/2);
            }break;
            case "left":{
                this._oText.x = this._x+this._iPaddingH;
            }break;   
            case "right":{
                this._oText.x = this._x+this._iWidth-this._iPaddingH;
            }break;       
        }

        this._oContainer.addChild(this._oText);  
        
        this.refreshText(szMsg);

    },    
    
    setVerticalAlign : function( bVerticalAlign ){
        this._bVerticalAlign = bVerticalAlign;
    },
    
    setVisible : function( bVisible ){
        this._oText.visible = bVisible;
    },
    
    setOutline : function(iSize){
        if ( this._oText !== null ){
            this._oText.outline = iSize;
        }
    },
    
    setShadow : function(szColor,iOffsetX,iOffsetY,iBlur){
        if ( this._oText !== null ){
            this._oText.shadow = new createjs.Shadow(szColor, iOffsetX,iOffsetY,iBlur);
        }
    },
    
    setColor : function(szColor){
        this._oText.color = szColor;
    },
    
    setAlpha : function(iAlpha){
        this._oText.alpha = iAlpha;
    },
    
    setY : function(iNewY){
        this._oText.y = iNewY;
        this._y = iNewY;
        this.updateDebug();
    },
    
    setX : function(iNewX){
        this._oText.x = iNewX;
        this._x = iNewX;
        this.updateDebug();
    },
    
    updateDebug : function(){
        if(!this._bDebug){
            return;
        }
        this._oDebugShape.graphics.command.x = this._x;
        this._oDebugShape.graphics.command.y = this._y;
    },
    
    removeTweens : function(){
        createjs.Tween.removeTweens(this._oText);
    },
    
    getText : function(){
        return this._oText;
    },
    
    getX : function(){
        return this._x;
    },
    
    getY : function(){
        return this._y;
    },
    
    getFontSize : function(){
        return this._iFontSize;
    },
    
    getBounds : function(){
        return this._oText.getBounds();
    },
    
    refreshText : function(szMsg){    
        if(szMsg === ""){
            szMsg = " ";
        }
        if ( this._oText === null ){
            this.__createText(szMsg);
        }
        
        this._oText.text = szMsg;

        this._oText.font = this._iFontSize+"px "+this._szFont;
        this._oText.lineHeight = Math.round(this._iFontSize*this._fLineHeightFactor);   
        
        this.__autofit();
        this.__updateY();        
        this.__verticalAlign();
        
    }
}; 

function CTLText( oContainer, 
                    x, y, iWidth, iHeight, 
                    iFontSize, szAlign, szColor, szFont,iLineHeightFactor,
                    iPaddingH, iPaddingV,
                    szMsg,
                    bFitText, bVerticalAlign, bMultiline,
                    bDebug ){

    this._oContainer = oContainer;

    this._x = x;
    this._y = y;
    this._iWidth  = iWidth;
    this._iHeight = iHeight;
    
    this._bMultiline = bMultiline;

    this._iFontSize = iFontSize;
    this._szAlign   = szAlign;
    this._szColor   = szColor;
    this._szFont    = szFont;

    this._iPaddingH = iPaddingH;
    this._iPaddingV = iPaddingV;

    this._bVerticalAlign = bVerticalAlign;
    this._bFitText       = bFitText;
    this._bDebug         = bDebug;
    //this._bDebug         = true;

    // RESERVED
    this._oDebugShape = null; 
    this._fLineHeightFactor = iLineHeightFactor;
    
    this._oText = null;
    if ( szMsg ){
        this.__createText(szMsg);
        
    }
}

/* global window, exports, define */

!function() {
    'use strict'

    var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[+-]/
    }

    function sprintf(key) {
        // `arguments` is not an array, but should be fine for this call
        return sprintf_format(sprintf_parse(key), arguments)
    }

    function vsprintf(fmt, argv) {
        return sprintf.apply(null, [fmt].concat(argv || []))
    }

    function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, ph, pad, pad_character, pad_length, is_positive, sign
        for (i = 0; i < tree_length; i++) {
            if (typeof parse_tree[i] === 'string') {
                output += parse_tree[i]
            }
            else if (typeof parse_tree[i] === 'object') {
                ph = parse_tree[i] // convenience purposes only
                if (ph.keys) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < ph.keys.length; k++) {
                        if (arg == undefined) {
                            throw new Error(sprintf('[sprintf] Cannot access property "%s" of undefined value "%s"', ph.keys[k], ph.keys[k-1]))
                        }
                        arg = arg[ph.keys[k]]
                    }
                }
                else if (ph.param_no) { // positional argument (explicit)
                    arg = argv[ph.param_no]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (re.not_type.test(ph.type) && re.not_primitive.test(ph.type) && arg instanceof Function) {
                    arg = arg()
                }

                if (re.numeric_arg.test(ph.type) && (typeof arg !== 'number' && isNaN(arg))) {
                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
                }

                if (re.number.test(ph.type)) {
                    is_positive = arg >= 0
                }

                switch (ph.type) {
                    case 'b':
                        arg = parseInt(arg, 10).toString(2)
                        break
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10))
                        break
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10)
                        break
                    case 'j':
                        arg = JSON.stringify(arg, null, ph.width ? parseInt(ph.width) : 0)
                        break
                    case 'e':
                        arg = ph.precision ? parseFloat(arg).toExponential(ph.precision) : parseFloat(arg).toExponential()
                        break
                    case 'f':
                        arg = ph.precision ? parseFloat(arg).toFixed(ph.precision) : parseFloat(arg)
                        break
                    case 'g':
                        arg = ph.precision ? String(Number(arg.toPrecision(ph.precision))) : parseFloat(arg)
                        break
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8)
                        break
                    case 's':
                        arg = String(arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 't':
                        arg = String(!!arg)
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0
                        break
                    case 'v':
                        arg = arg.valueOf()
                        arg = (ph.precision ? arg.substring(0, ph.precision) : arg)
                        break
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16)
                        break
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
                        break
                }
                if (re.json.test(ph.type)) {
                    output += arg
                }
                else {
                    if (re.number.test(ph.type) && (!is_positive || ph.sign)) {
                        sign = is_positive ? '+' : '-'
                        arg = arg.toString().replace(re.sign, '')
                    }
                    else {
                        sign = ''
                    }
                    pad_character = ph.pad_char ? ph.pad_char === '0' ? '0' : ph.pad_char.charAt(1) : ' '
                    pad_length = ph.width - (sign + arg).length
                    pad = ph.width ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
                    output += ph.align ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output
    }

    var sprintf_cache = Object.create(null)

    function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
            return sprintf_cache[fmt]
        }

        var _fmt = fmt, match, parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree.push(match[0])
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree.push('%')
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1])
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else {
                                throw new SyntaxError('[sprintf] failed to parse named argument key')
                            }
                        }
                    }
                    else {
                        throw new SyntaxError('[sprintf] failed to parse named argument key')
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
                }

                parse_tree.push(
                    {
                        placeholder: match[0],
                        param_no:    match[1],
                        keys:        match[2],
                        sign:        match[3],
                        pad_char:    match[4],
                        align:       match[5],
                        width:       match[6],
                        precision:   match[7],
                        type:        match[8]
                    }
                )
            }
            else {
                throw new SyntaxError('[sprintf] unexpected placeholder')
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return sprintf_cache[fmt] = parse_tree
    }

    /**
     * export to either browser or node.js
     */
    /* eslint-disable quote-props */
    if (typeof exports !== 'undefined') {
        exports['sprintf'] = sprintf
        exports['vsprintf'] = vsprintf
    }
    if (typeof window !== 'undefined') {
        window['sprintf'] = sprintf
        window['vsprintf'] = vsprintf

        if (typeof define === 'function' && define['amd']) {
            define(function() {
                return {
                    'sprintf': sprintf,
                    'vsprintf': vsprintf
                }
            })
        }
    }
    /* eslint-enable quote-props */
}(); // eslint-disable-line

(function() {
  "use strict"

  // default browser scroll bar width
  const SCROLL_BAR_SIZE = 17
  const BAR_COLOR = "rgb(241, 241, 241)"
  const ARROW_COLOR = "rgb(80, 80, 80)"
  const ARROW_DISABLED_COLOR = "rgb(163, 163, 163)"
  const ARROW_HILIGHT = "#fff"
  const ARROWBG_HOVER_COLOR = "#d2d2d2"
  const ARROWBG_ACTIVE_COLOR = "#787878"
  const HANDLE_COLOR = "rgb(193, 193, 193)"
  const HANDLE_HOVER_COLOR = "#a8a8a8"
  const HANDLE_ACTIVE_COLOR = "#787878"
  const UNIT_INCREMENT = 120
  const BLOCK_INCREMENT = 240

  const ScrollBarOrientaion = {
    HORIZONTAL: 0,
    VERTICAL: 1
  }

  const ButtonState = {
    NORMAL: 0,
    HOVER: 1,
    ACTIVE: 2,
    DISABLE: 3
  }

  class ShapeButton extends createjs.Shape {
    constructor() {
      super()
      this.setBounds(0, 0, 0, 0)
      this._state = ButtonState.NORMAL
      this._enable = true
      this.foregroundColors = ["red", "green", "yellow", "blue"]
      this.backgroundColors = ["blue", "red", "green", "yellow"]
      this.on("mouseover", e => {
        this.state = ButtonState.HOVER
      })
      this.on("mouseout", e => {
        this.state = ButtonState.NORMAL
      })
      this.on("mousedown", e => {
        this.state = ButtonState.ACTIVE
      })
      this.on("pressup", e => {
        this.state = e.target.hitTest(e.localX, e.localY) ? 
          ButtonState.HOVER : ButtonState.NORMAL
      })
    }

    set enable(enable) {
      this._enable = enable
      this.state = this._state
    }

    get isEnabled() {
      return this._enable
    }

    get state() {
      return this._state
    }

    set state(state) {
      this._state = this.isEnabled ? state : ButtonState.DISABLE
      this.redraw()
    }

    redraw() {
      this.graphics
        .clear()
        .beginFill(this.backgroundColors[this.state])
        .rect(0, 0, this.getBounds().width, this.getBounds().height)
      this.drawForeground(this.foregroundColors[this.state])
    }

    drawForeground(color) {
      // override
    }

    setForegroundColor(state, color) {
      this.foregroundColors[state] = color
      this.redraw()
    }

    setBackgroundColor(state, color) {
      this.backgroundColors[state] = color
      this.redraw()
    }
  }

  class ArrowButton extends ShapeButton {
    constructor(arrowRotation) {
      super()
      this.arrowRotation = arrowRotation
      this.arrowWidth = 10
      this.arrowHeight = 5
    }

    drawForeground(color) {
      function drawPoints(g, mat, points) {
        points.forEach((point, i) => {
          const p = mat.transformPoint(point[0], point[1])
          p.x = Math.floor(p.x)
          p.y = Math.floor(p.y)
          if (i == 0) {
            g.moveTo(p.x, p.y)
          } else {
            g.lineTo(p.x, p.y)
          }
        })
      }

      const b = this.getBounds()
      const mat = new createjs.Matrix2D()
        .translate(b.width / 2, b.height / 2)
        .rotate(this.arrowRotation)

      const g = this.graphics.beginFill(color)
      drawPoints(g, mat, [
        [0, -this.arrowHeight / 2],
        [this.arrowWidth / 2, this.arrowHeight / 2],
        [-this.arrowWidth / 2, this.arrowHeight / 2]
      ])
    }
  }

  class ScrollBar extends createjs.Container {
    constructor(orientation) {
      super()

      this._size = {
        width: 0,
        height: 0
      }
      this._contentLength = 0
      this._value = 0
      this.unitIncrement = 120
      this.blockIncrement = 240
      this.orientation = orientation

      this.background = new createjs.Shape
      this.background.on("mousedown", e => {
        const pos = this.isVertical ? e.localY : e.localX
        const b = this.handle.getBounds()
        const handleHead = this.isVertical ? this.handle.y : this.handle.x
        const handleTail = this.isVertical ? this.handle.y + b.height : this.handle.x + b.width
        if (pos < handleHead) {
          this._changeValue(e, this.value + this.blockIncrement)
        }
        if (pos > handleTail) {
          this._changeValue(e, this.value - this.blockIncrement)
        }
      })
      this.addChild(this.background)

      const rot = this.isVertical ? 0 : -90

      this.headArrow = new ArrowButton(rot)
      this.headArrow.setBackgroundColor(ButtonState.NORMAL, BAR_COLOR)
      this.headArrow.setBackgroundColor(ButtonState.HOVER, ARROWBG_HOVER_COLOR)
      this.headArrow.setBackgroundColor(ButtonState.ACTIVE, ARROWBG_ACTIVE_COLOR)
      this.headArrow.setForegroundColor(ButtonState.NORMAL, ARROW_COLOR)
      this.headArrow.setForegroundColor(ButtonState.HOVER, ARROW_COLOR)
      this.headArrow.setForegroundColor(ButtonState.ACTIVE, ARROW_HILIGHT)
      this.headArrow.on("mousedown", e => {
        this._changeValue(e, this.value + this.unitIncrement)
      })
      this.addChild(this.headArrow)

      this.tailArrow = new ArrowButton(rot + 180)
      this.tailArrow.setBackgroundColor(ButtonState.NORMAL, BAR_COLOR)
      this.tailArrow.setBackgroundColor(ButtonState.HOVER, ARROWBG_HOVER_COLOR)
      this.tailArrow.setBackgroundColor(ButtonState.ACTIVE, ARROWBG_ACTIVE_COLOR)
      this.tailArrow.setForegroundColor(ButtonState.NORMAL, ARROW_COLOR)
      this.tailArrow.setForegroundColor(ButtonState.HOVER, ARROW_COLOR)
      this.tailArrow.setForegroundColor(ButtonState.ACTIVE, ARROW_HILIGHT)
      this.tailArrow.on("mousedown", e => {
        this._changeValue(e, this.value - this.unitIncrement)
      })
      this.addChild(this.tailArrow)

      this.handle = new ShapeButton
      this.handle.setBackgroundColor(ButtonState.NORMAL, HANDLE_COLOR)
      this.handle.setBackgroundColor(ButtonState.HOVER, HANDLE_HOVER_COLOR)
      this.handle.setBackgroundColor(ButtonState.ACTIVE, HANDLE_ACTIVE_COLOR)
      this.handle.on("mousedown", e => {
        this.startPos = {
          x: e.stageX,
          y: e.stageY,
          value: this.value
        }

      })
      this.handle.on("pressmove", e => {
        const delta = this.isVertical ? this.startPos.y - e.stageY : this.startPos.x - e.stageX

        this._changeValue(e, this.startPos.value + this._positionToValue(delta))
      })
      this.addChild(this.handle)
    }

    _changeValue(e, value) {
      const oldValue = this._value
      this.value = value
      

      if (oldValue != this.value ) this.dispatchEvent("change", e)
    }

    get value() {
      return this._value
    }

    set value(value) {
        
      this._value = Math.floor(Math.max(Math.min(0, value), this.maxValue));
      this.redraw();
    }
    
    set valueNoRedraw(value) {
      this._value = value;
    }

    get contentLength() {
      return this._contentLength
    }

    set contentLength(length) {
      this._contentLength = length
      this.redraw()
    }

    redraw() {
      const b = this.getBounds()
      this.background.graphics
        .clear()
        .beginFill(BAR_COLOR)
        .rect(0, 0, b.width, b.height)

      this._drawArrows()
      this._drawHandle()
    }

    get barWidth() {
      return this.isVertical ? this.getBounds().width : this.getBounds().height
    }

    get barLength() {
      return !this.isVertical ? this.getBounds().width : this.getBounds().height
    }

    set barWidth(w) {
      const b = this.getBounds()
      !this.isVertical ? 
        this.setBounds(0, 0, b.width, w) :
        this.setBounds(0, 0, w, b.height)
      this.redraw()
    }

    set barLength(len) {
      const b = this.getBounds()
      this.isVertical ? 
        this.setBounds(0, 0, b.width, len) :
        this.setBounds(0, 0, len, b.height)
      this.redraw()
    }

    get isVertical() {
      return this.orientation == ScrollBarOrientaion.VERTICAL
    }

    get maxValue() {
      return Math.min(0.001, this.barLength - this._contentLength)
    }

    _positionToValue(pos) {
      return pos * this._contentLength / (this.barLength - 2 * this.barWidth)
    }

    _drawHandle() {
      function normalize(v) {
        return Math.max(0, Math.min(1, v))
      }
      const maxLength = this.barLength - this.barWidth * 2

      const handleSize = [
        this.barWidth * 0.8,
        maxLength * normalize(this.barLength / this._contentLength)
      ]

      const handlePos = [
        (this.barWidth - handleSize[0]) / 2,
        this.barWidth + maxLength * (1 - normalize(this.barLength / this._contentLength)) * normalize(this.value / this.maxValue)
      ]
      
      const px = this.isVertical ? 0 : 1
      const py = this.isVertical ? 1 : 0

      this.handle.x = handlePos[px]
      this.handle.y = handlePos[py]

      this.handle.setBounds(0, 0, handleSize[px], handleSize[py])
      this.handle.redraw()
    }

    _drawArrows() {
      const size = this.barWidth
      const px = this.isVertical ? 0 : 1
      const py = this.isVertical ? 1 : 0

      const tailPos = [0, this.barLength - size]
      this.tailArrow.x = tailPos[px]
      this.tailArrow.y = tailPos[py]

      this.headArrow.setBounds(0, 0, size, size)
      this.tailArrow.setBounds(0, 0, size, size)
      this.headArrow.arrowWidth = size / 2
      this.headArrow.arrowHeight = size / 4
      this.tailArrow.arrowWidth = size / 2
      this.tailArrow.arrowHeight = size / 4
      this.headArrow.redraw()
      this.tailArrow.redraw()
    }
  }

  class ScrollContainer extends createjs.Container {
    constructor(canvas) {
      super()
      this.container = new createjs.Container()
      this.container.setBounds(0, 0, 0, 0)
      this.addChild(this.container)

      this.scrollBarV = new ScrollBar(ScrollBarOrientaion.VERTICAL)
      this.scrollBarV.unitIncrement = UNIT_INCREMENT
      this.scrollBarV.blockIncrement = BLOCK_INCREMENT
      this.scrollBarV.barWidth = SCROLL_BAR_SIZE
      this.scrollBarV.visible = false;
      this.addChild(this.scrollBarV)
      
      this.scrollBarV.on("change", e => {
        this.container.y = e.target.value
        this.dispatchEvent("scroll")
      })
      
      
      this.scrollBarH = new ScrollBar(ScrollBarOrientaion.HORIZONTAL)
      this.scrollBarH.unitIncrement = UNIT_INCREMENT
      this.scrollBarH.blockIncrement = BLOCK_INCREMENT
      this.scrollBarH.barWidth = SCROLL_BAR_SIZE
      this.scrollBarH.visible = false;
      this.addChild(this.scrollBarH)

//      this.scrollBarH.on("change", e => {
//        this.container.x = e.target.value
//        this.dispatchEvent("scroll")
//      })
//
//      canvas.addEventListener("mousewheel", e => {
//        const h = this.contentSize.height - this.getBounds().height
//        const w = this.contentSize.width - this.getBounds().width
//        this.scrollY += e.wheelDeltaY
//        this.scrollX += e.wheelDeltaX
//      })

      this.superAddChild = this.addChild

      this.addChild = child => {
        this.container.addChild(child)
      }
    }

    get scrollX() {
      return this.container.x
    }

    set scrollX(x) {
      const w = this.contentSize.width - this.getBounds().width
      this.container.x = Math.min(0, Math.floor(Math.max(x, -w - SCROLL_BAR_SIZE)))

      this.scrollBarH.value = x
      this.dispatchEvent("scroll")
    }

    get scrollY() {
      return this.container.y
    }

    set scrollY(y) {
      const h = this.contentSize.height - this.getBounds().height
      this.container.y = Math.min(0, Math.max(y, -h - SCROLL_BAR_SIZE))
      this.scrollBarV.value = y
      this.dispatchEvent("scroll")
    }
    
    set forceScrollX(x) {
      
      this.container.x = x;

      this.scrollBarH.value = x
      this.dispatchEvent("scroll")
    }

    set contentSize(size) {
      this.container.setBounds(0, 0, size.width, size.height)
      this.scrollBarH.contentLength = size.width
      this.scrollBarV.contentLength = size.height
    }
    
    set contentSizeHeight(iHeight){
        
        //this.container.setBounds(0, 0, this.container.getBounds().width, iHeight)
        this.scrollBarV.contentLength = iHeight;
        
        if(this.container.getBounds().height >= iHeight){
            this.scrollBarV.visible = false;
            this.container.y = 0;
        }else{
            this.scrollBarV.visible = true;
        }
    };
    
    set contentSizeWidth(iWidth){
        this.container.setBounds(0, 0, iWidth, this.container.getBounds().height)
       
        this.scrollBarH.contentLength = iWidth;
        
        
        if(this.contentSize.width >= iWidth){
            this.scrollBarH.visible = false;
        }else{
            this.scrollBarH.visible = true;
        }
    };
    
    get contentSize() {
      return {
        width: this.container.getBounds().width,
        height: this.container.getBounds().height,
      }
    }

    setBounds(x, y, iWidth, iHeight) {
      super.setBounds(x, y, iWidth, iHeight)
      
      this.contentSize = {
        width: Math.max(iWidth, this.contentSize.width), 
        height: Math.max(iHeight, this.contentSize.height)
      }

      this.container.mask = new createjs.Shape
      this.container.mask.graphics.beginFill("#efefef").rect(x, y, iWidth, iHeight)

      this.scrollBarV.x = iWidth - SCROLL_BAR_SIZE
      this.scrollBarV.barLength = iHeight - SCROLL_BAR_SIZE

      this.scrollBarH.y = iHeight - SCROLL_BAR_SIZE
      this.scrollBarH.barLength = iWidth - SCROLL_BAR_SIZE
    }
    
    set handlePosX(iX){
        this.scrollBarH.handle.x = iX;
        this.scrollBarH.valueNoRedraw = iX;
        
    }
    
    set handlePosY(iY){
        this.scrollBarV.handle.y = iY;
        this.scrollBarV.valueNoRedraw = iY;
    }
    
  }

  createjs.ScrollContainer = ScrollContainer
})()


function CItem ()
{
    this._oParentContainer;
    this._oContainer;

    this._iVariant;
    this._iType;
    this._iID;
    this._iAreaLimit;
    this._iEditType;
    this._fDraggedScale;
    this._pLimitAreaOffset;
    this._bTemp;
    this._fScale;
    this._rRect;
    this._aOptional = new Array();
    this._aHistoryID = new Array();

    this._aCbCompleted = new Array();
    this._aCbOwner = new Array();
    this._aParams = new Array();
    this._aListeners = new Array();
    
    this._pMaxDimension;
}  

CItem.prototype.setPos = function(iXPos, iYPos){
    this._oContainer.x = iXPos;
    this._oContainer.y = iYPos;
};

CItem.prototype.getPos = function(){
    return {x: this._oContainer.x, y: this._oContainer.y};
};

CItem.prototype.getReg = function(){
    return {regX: this._oContainer.regX, regY: this._oContainer.regY};
};

CItem.prototype.setVisible = function (bVal){
    this._oContainer.visible = bVal;
};

CItem.prototype.setChildIndex = function(iVal){
    this._oContainer.parent.setChildIndex(this._oContainer, iVal);
};

CItem.prototype.setRotate = function(fVal){
    this._oContainer.rotation = fVal;
};

CItem.prototype.setGraphicScale = function (fVal){
    this._oContainer.scaleX = this._oContainer.scaleY = fVal;
};

CItem.prototype.animationHide = function (cbCompleted, cbOwner, oValue){
    createjs.Tween.get(this._oContainer, {override:true}).to({alpha:0, scaleX:0, scaleY:0}, 500, createjs.Ease.backIn).call(function()
    {
        this._oContainer.alpha = 1;
        this._oContainer.scaleX =  this._oContainer.scaleY =  this.getItemScaleBar();
        cbCompleted.call(cbOwner, oValue);
    }, null, this);
};

CItem.prototype.animationShow = function (fScale, cbFunc, cbOwner){
    this._oContainer.visible = true;

    var oTween  = createjs.Tween.get(this._oContainer, {override:true});
    oTween.to({alpha:1, scaleX:fScale, scaleY: fScale}, 500, createjs.Ease.backOut);
    oTween.on("change", function()
                                    {   
                                        if(cbFunc !== null){
                                            cbFunc.call(cbOwner);
                                        }
                                    });
};

CItem.prototype.animationMovement = function (pPos, iTime){
    return createjs.Tween.get(this._oContainer).to({x:pPos.x, y: pPos.y}, iTime, createjs.Ease.backOut);
};

CItem.prototype.animationUndo = function (fScale, fRot){
    createjs.Tween.get(this._oContainer, {override:true})
            .to({scaleX: fScale, scaleY: fScale, rotation: fRot}, 500, createjs.Ease.backOut);
};

CItem.prototype.removeTweens = function(){
  createjs.Tween.removeTweens(this._oContainer);
};

CItem.prototype.getRotate = function (){
    return this._oContainer.rotation;
};

CItem.prototype.getScaleX = function (){
    return this._oContainer.scaleX;
};

CItem.prototype.getVisible = function(){
    return this._oContainer.visible;
};

CItem.prototype.getGraphic = function(){
    return this._oContainer;
};

CItem.prototype.getVariant = function () {
    return this._iVariant;
};

CItem.prototype.getID = function () {
    return this._iID;
};

CItem.prototype.getType = function () {
    return this._iType;
};

CItem.prototype.getEditType = function () {
    return this._iEditType;
};

CItem.prototype.getGlobalPosItem = function(){
    return this._oParentContainer.localToGlobal(this._oContainer.x, this._oContainer.y);
};

CItem.prototype.getMaxDimension = function (){
    return this._pMaxDimension;
};

CItem.prototype.getNormalizedDimension = function(){
    var pNormalized = {
                        width: this._pMaxDimension.width * this. _oContainer.scaleX,
                        height: this._pMaxDimension.height * this._oContainer.scaleY
                        };
    return pNormalized;
};

CItem.prototype.getChildIndex = function(){
    return this._oParentContainer.getChildIndex(this._oContainer);
};

CItem.prototype.setChildIndex = function(iVal){
    this._oParentContainer.setChildIndex(this._oContainer, iVal);
};

CItem.prototype.swapChildren = function(iVal){
    var iIndex = this.getChildIndex();
    this._oParentContainer.swapChildren(iIndex, iVal);
};

CItem.prototype.setAlpha = function (fVal){
    this._oContainer.alpha = fVal;
};

CItem.prototype.getTemp = function(){
    return this._bTemp;
};

CItem.prototype.setTemp = function(bVal){
    this._bTemp = bVal;
};

CItem.prototype.setEditType = function (iVal) {
    this._iEditType = iVal;
};

CItem.prototype.getLimitedAreaType = function(){
    return this._iAreaLimit;
};

CItem.prototype.getItemScaleBar = function(){
    return ITEMS_PROPERTIES[this._iType].item_bar_scale;
};

CItem.prototype.getDraggedScale = function() {
    return this._fDraggedScale;
};

CItem.prototype.getScale = function() {
    return this._fScale;
};

CItem.prototype.setScale = function(fVal) {
    this._fScale = fVal;
};

CItem.prototype.setOptional = function(iVariant, iType){
    var iOptional = ITEMS_PROPERTIES[this._iType].optional[iType];
    var oOptional;
    
    var oAction = {
                    type: OPTIONAL_CREATE,
                    id: this.getID(),
                    opt_type: iType,
                    variant: iVariant,
                    area_type: this._iAreaLimit
                };
    
    if(this._aOptional.length > 0){
        oOptional = this.getAOptionalByType(iType).optional;
        
        if(oOptional !== null){
            if(oOptional.variant === iVariant){
                var oInfo = this.removeAOptional(iType);
                
                oAction.type = OPTIONAL_DELETE;
                oAction.opt_type = oInfo[0].type;
                oAction.variant = oInfo[0].variant;
                return oAction;
            }else{
                this.removeAOptional(iType);
                oAction.type = OPTIONAL_SUBSTITUTE;
                oAction.variant = oOptional.variant;
            }
        }
    }

    var oOptionalProperty = ITEMS_PROPERTIES[iOptional];
    var pPos = oOptionalProperty.position;
    
    var oOptionalSettings = ITEMS_SETTINGS[iOptional];
    var oSprite = s_oSpriteLibrary.getSprite(oOptionalSettings.name + "_" + iVariant);
    var oBitmap = createBitmap(oSprite);
    oBitmap.x = pPos.x;
    oBitmap.y = pPos.y;
    oBitmap.regX = oSprite.width/2;
    oBitmap.regY = oSprite.height/2;
    
    var iChildIndex = oOptionalProperty.child_index;
    if(this._oContainer.numChildren < iChildIndex){
        iChildIndex = this._oContainer.numChildren;
    }
    this._oContainer.addChildAt(oBitmap, iChildIndex);
    
    oOptional = {bitmap: oBitmap, variant: iVariant, type: iType};
    
    this._aOptional.push(oOptional);
    
    return oAction;
};

CItem.prototype.removeAOptional = function(iType){
    var oInfo = this.getAOptionalByType(iType);
    var iID = oInfo.id;
    var oOptional = oInfo.optional;

    this._oContainer.removeChild(oOptional.bitmap);
    return this._aOptional.splice(iID,1);
};

CItem.prototype.getAOptionalByType = function(iType){
    for(var i = 0; i < this._aOptional.length; i++){
        if(this._aOptional[i].type === iType){
            return {optional: this._aOptional[i], id: i};
        }
    }
    return {optional: null, id: null};
};

CItem.prototype.getOptionals = function(){
    return this._aOptional;
};

CItem.prototype.getStockLimitAreaOffset = function(){
    return this._pLimitAreaOffset;
};

CItem.prototype.triggerEvent = function(oEvt, iEvent){     
    if(this._aCbCompleted[iEvent])
    {
        this._aCbCompleted[iEvent].call(this._aCbOwner[iEvent], this._aParams[iEvent], oEvt);
    }      
};

CItem.prototype.addEventListener = function (szEvt, iEvent, cbCompleted, cbOwner, aParams){
    
    this._aCbCompleted[iEvent] = cbCompleted;
    this._aCbOwner[iEvent] = cbOwner;
    this._aParams[iEvent] = aParams;
    this._aListeners[iEvent] = this._oContainer.on(szEvt, this.triggerEvent, this, false, iEvent);
  
};

CItem.prototype.removeEventListener = function (szEvt, iEvent){
    this._aCbCompleted[iEvent] = null;
    this._aCbOwner[iEvent] = null;
    this._aParams[iEvent] = null;
    this._oContainer.off(szEvt, this._aListeners[iEvent]);
    this._aListeners [iEvent] = null;
};

CItem.prototype.unload = function(){
    if(this._oContainer === null){
        return null;
    }
    
    this._oContainer.removeAllEventListeners();
    this._oContainer.parent.removeChild(this._oContainer);
    this._oContainer = null;
    this._rRect = null;
    
    this._aCbCompleted = null;
    this._aCbOwner = null;
    this._aParams = null;
    this._aListeners = null;
    this._aOptional = null;
    this._aHistoryID = null;
};


function CBar (){
    
    this._oParentContainer;
    this._oContainer;
    this._oMaskeredContainer;
    
    this._aGraphicItems;
    this._oGraphicBar;
    
    this._oMask;
    this._oArrowLeft;
    this._oArrowRight;
    this._oInfo;
    
    this._iType;
    this._iOffsetXItems;
    this._iNextScrollPosX;
    this._iOffsetMask;
    this._iOffsetItem;

    this._aCbCompleted;
    this._aCbOwner;
    this._aParams;
}

CBar.prototype._initBar = function(oParentContainer, oSpriteBar, pPos)
{
    this._oParentContainer = oParentContainer;

    this._oContainer = new createjs.Container();
    this._oParentContainer.addChild(this._oContainer);

    this._oGraphicBar = createBitmap(oSpriteBar);
    this._oContainer.x = pPos.x; 
    this._oContainer.y = pPos.y;
    this._oContainer.regX = oSpriteBar.width / 2;
    this._oContainer.regY = oSpriteBar.height / 2;
    this._oGraphicBar.on("click", function(){});
    this._oContainer.addChild(this._oGraphicBar);

    var oSpriteArrowLeft = s_oSpriteLibrary.getSprite("but_arrow_left");

    this._oArrowLeft = new CGfxButton( oSpriteArrowLeft.width - OFFSET_ARROWS_X,
                                       this._oGraphicBar.y + this._oContainer.regY,
                                       oSpriteArrowLeft,
                                       this._oContainer);
    this._oArrowLeft.addEventListenerWithParams(ON_MOUSE_DOWN, this.triggerEvent, this, ON_PRESS_ARROW_LEFT);
    this._oArrowLeft.setVisible(false);
    
    var oSpriteArrowRight = s_oSpriteLibrary.getSprite("but_arrow_right");
    this._oArrowRight = new CGfxButton(this._oContainer.regX*2 - oSpriteArrowRight.width + OFFSET_ARROWS_X,
                                      this._oGraphicBar.y + this._oContainer.regY, 
                                      oSpriteArrowRight,
                                      this._oContainer);
    this._oArrowRight.addEventListenerWithParams(ON_MOUSE_DOWN, this.triggerEvent, this, ON_PRESS_ARROW_RIGHT);
    this._oArrowRight.setVisible(false);

    this._oMaskeredContainer = new createjs.ScrollContainer(s_oCanvas);
    this._oMaskeredContainer.y = this._oContainer.regY;
    this._oContainer.addChild(this._oMaskeredContainer);
    this.createMask(OFFSET_MASK_X);
   
    this._aGraphicItems = null;
   
    this._aCbCompleted = new Array();
    this._aCbOwner = new Array();
    this._aParams = new Array();
};

CBar.prototype.getPos = function ()
{
    return {x: this._oContainer.x, y:  this._oContainer.y};
};

CBar.prototype.reset = function()
{
   this._oMaskeredContainer.scrollX = 0;  
};

CBar.prototype.checkNeedArrows = function (iOffsetX)
{   
    if (iOffsetX > this._oMask.x + this._oMask.width)
    {
        this._oArrowRight.setVisible(true);
    }else{
        this._oArrowRight.setVisible(false);
    }
};

CBar.prototype._onPressDownArrowLeftSelection = function()
{
    this.scrollItems(SCROLL_LEFT);
};

CBar.prototype._onPressDownArrowRightSelection = function()
{
    this.scrollItems(SCROLL_RIGHT);
};
    
CBar.prototype.createMask = function(iOffset)
{
    this._iOffsetMask = iOffset;
    
    var pRect = this.getUsableArea();
    this._oMask = new createjs.Rectangle(
                                           pRect.x -  this._iOffsetMask,
                                           pRect.y + pRect.height * 0.5,
                                           pRect.width +  this._iOffsetMask * 2,
                                           pRect.height*2 
                                        );
};
    
CBar.prototype.getUsableArea = function ()
{
    var oButLeft = this._oArrowLeft.getButton();
    var oButRight = this._oArrowRight.getButton();
    var iX = oButLeft.x + OFFSET_ARROWS_X +  oButLeft.regX + OFFSET_BAR_DIM_X;
    var iY = this._oGraphicBar.y - this._oContainer.regY;
    var iWidth = (oButRight.x - OFFSET_ARROWS_X - oButRight.regX - OFFSET_BAR_DIM_X) - iX;
            
    var iHeight = (this._oGraphicBar.y + this._oContainer.regY) - iY;
    
   var oRect = {
                    x: iX,
                    y: iY,
                    width: iWidth,
                    height: iHeight
                };

    return oRect;
};

CBar.prototype.scrollItems = function (iDir)
{
    var iPrevScrollX = Math.round(this._iNextScrollPosX + this._iOffsetXItems * iDir);
    var iToScroll = this._iNextScrollPosX;
    
    switch (iDir)
    {
        case SCROLL_LEFT:
        {        
            if(this._iNextScrollPosX < 0)                
            { 
                iToScroll = this._iNextScrollPosX = iPrevScrollX;
                this._oArrowRight.setVisible(true);
                if(iPrevScrollX >= 0 )
                {
                    iToScroll = 0;
                    this._oArrowLeft.setVisible(false);
                }
            }
            break;
        }
        case SCROLL_RIGHT:
        {
            var iLimitScroll = this._oMaskeredContainer.contentSize.width - this._oMask.width;
          
            if(-iLimitScroll < iPrevScrollX )
             {
                iToScroll = this._iNextScrollPosX = iPrevScrollX;
             
                this._oArrowLeft.setVisible(true);
                if(-iLimitScroll > iPrevScrollX + this._iOffsetXItems * iDir)
                {
                    iToScroll = -iLimitScroll;
                    this._oArrowRight.setVisible(false);
                }
             }
            break;
        }
    }
  
    createjs.Tween.get(this._oMaskeredContainer, {override: true})
                                  .to({scrollX: iToScroll}, 200, createjs.Ease.cubicOut);
};

CBar.prototype.adjustItemsPosition = function()
{
    var iOffsetWidthMax = 0;
    for (var i = 0; i < this._aGraphicItems.length; i++)
    {
        var iWidth = this._aGraphicItems[i].getGraphic().regX * this._aGraphicItems[i].getScaleX();
        if(iWidth > iOffsetWidthMax)
        {
            iOffsetWidthMax = iWidth;
        }
    }
    iOffsetWidthMax += OFFSET_ITEM_SPACE_X;
    
    var oRect = this.getUsableArea();

    var iStartX = oRect.x + (iOffsetWidthMax -  this._iOffsetMask) ;
    
    var iOffsetX = iStartX;
    
    this._aGraphicItems[0].setPos(iOffsetX, this._oGraphicBar.y);
    
    for (var i = 1; i < this._aGraphicItems.length; i++)
    {
        var iPreSpaceX = this._aGraphicItems[i-1].getGraphic().regX *0.5;
        var iSpace = this._aGraphicItems[i].getGraphic().regX + iPreSpaceX;
        iOffsetX += iSpace + iOffsetWidthMax;
        this._aGraphicItems[i].setPos(iOffsetX, this._oGraphicBar.y);
    }
    
    this._iOffsetXItems = iOffsetX  / this._aGraphicItems.length;
    
    var pBounds = {
                    x:this._oMask.x,
                    y: this._oMask.y - this._oMask.height*0.5,
                    width: this._oMask.width,
                    height: this._oMask.height
                  };
    
    var oLastItem = this._aGraphicItems[this._aGraphicItems.length -1].getGraphic();
    var iTotWidth = oLastItem.x + oLastItem.regX ;

    if(iTotWidth < this._oContainer.regX * 2 - OFFSET_ARROWS_X){
        this._oMaskeredContainer.x = - iStartX * 0.5;
        pBounds.x = 0;
        pBounds.width = this._oContainer.regX * 2 - this._oMaskeredContainer.x;
        pBounds.height = this._oContainer.regY * 4;
    }else{
        this.checkNeedArrows (iTotWidth);
    }
    
    this._oMaskeredContainer.setBounds(
                                        pBounds.x ,
                                        pBounds.y ,
                                        pBounds.width,
                                        pBounds.height
                                       );
 
    this._oMaskeredContainer.contentSizeWidth = iOffsetX ;     

    this._iNextScrollPosX = this._oMaskeredContainer.scrollX;
    
};

CBar.prototype.setPos = function(iX, iY){
    this._oContainer.x = iX;
    this._oContainer.y = iY;
};

CBar.prototype.getContainer = function()
{
    return this._oContainer;
};

CBar.prototype.getMaskerdContainer = function()
{
    return this._oMaskeredContainer;
};

CBar.prototype.getArrows = function(){
    return {left: this._oArrowLeft, right: this._oArrowRight};
}; 
 
CBar.prototype.getMask = function ()
{
    return this._oMask;
}; 

CBar.prototype.getOffsetMask = function(){
    return this._iOffsetMask;
};

CBar.prototype.getGraphicBar = function(){
    return this._oGraphicBar;
};

CBar.prototype.getType = function(){
    return this._iType;
};

CBar.prototype.setType = function(iVal){
    this._iType = iVal;
};

CBar.prototype.getInfo = function(){
    return this._oInfo;
};

CBar.prototype.setInfo = function(oObj){
    this._oInfo = oObj;
};

CBar.prototype.getBarArea = function ()
{
    var rRect = new createjs.Rectangle(this._oGraphicBar.x - this._oContainer.regX,
                                       this._oGraphicBar.y + this._oContainer.regY,
                                       this._oContainer.regX*2,
                                       this._oContainer.regY*2);
    return rRect;
};

CBar.prototype.setVisible = function(bVal){
    this._oContainer.visible = bVal;
};

CBar.prototype.getVisible = function(){
    return this._oContainer.visible;
};

CBar.prototype.setScale = function(fVal){
    this._oContainer.x = this._oContainer.y = fVal;
};

CBar.prototype.getGlobalPosItem = function(iID){
    var oGraphic = this._aGraphicItems[iID].getGraphic();
    return this._oContainer.localToGlobal(
                                            oGraphic.x,
                                            oGraphic.y
                                         );
};

CBar.prototype.getPosItem = function(iID){
    var oGraphic = this._aGraphicItems[iID].getGraphic();
    return {x: oGraphic.x, y: oGraphic.y};
};

CBar.prototype.unload = function(){
    this._oArrowLeft.unload();
    this._oArrowRight.unload();
    
    this._oGraphicBar.removeAllEventListeners();
    
    if(this._aGraphicItems !== null){ 
        for(var i = 0; i  < this._aGraphicItems.length; i++){
            this._aGraphicItems[i].unload();
        }
    }
    
    this._aGraphicItems = null;
    
    this._oParentContainer.removeChild(this._oContainer);
};

CBar.prototype.triggerEvent = function(iEvent)
{
    if( this._aCbCompleted[iEvent])
    {
         this._aCbCompleted[iEvent].call( this._aCbOwner[iEvent],  this._aParams[iEvent]);
    }      
};

CBar.prototype.addEventListener = function (iEvent, cbCompleted, cbOwner, aParams)
{   
    this._aCbCompleted[iEvent] = cbCompleted;
    this._aCbOwner[iEvent] = cbOwner;
    this._aParams[iEvent] = aParams;
};

var MS_TIME_BAR_SHOW = 250;
function CButtonsBar (oParentContainer, oSpriteBar, bSelector, iType, pPos){
    this._oSelector;
    this._pEndPos;
    this._pStartPos;
    this._oTween;
    this._oListenerStageMove;
    this._oListenerPressUp;
    this._bSelector;
    
    CBar.call(this);
    
    this._init(oParentContainer, oSpriteBar, bSelector, iType, pPos);
}       

CButtonsBar.prototype = Object.create(CBar.prototype); 

CButtonsBar.prototype._init = function(oParentContainer, oSpriteBar, bSelector, iType, pPos){
    
    this._oTween = null;

    this._pStartPos = pPos;
    this._initBar(oParentContainer, oSpriteBar, pPos);
    
    this._oSelector = null;
    this._oInfo = null;
    this._bSelector = bSelector;

    this._pEndPos = {x: 0 , y: pPos.y + oSpriteBar.height + 10};
    this._iType = iType; 
    
    this.addEventListener(ON_PRESS_ARROW_LEFT, this._onPressDownArrowLeftSelection, this);
    this.addEventListener(ON_PRESS_ARROW_RIGHT, this._onPressDownArrowRightSelection, this);
};

CButtonsBar.prototype.createGraphicsItems = function(oItemsData)
{
    this._aGraphicItems = new Array();
    
    var iID = 0;
    for (var i = 0; i < oItemsData.length; i++)
    { 
        for(var j = 0; j < oItemsData[i].length; j++){
            var iType = oItemsData[i][j].property.id;

            var oItem = new CThumbItem(this._oMaskeredContainer, oItemsData[i][j], iType, j, iID); //oParentContainer, oSprite, iType, iVariant, iID
            oItem.addEventListener("mousedown", ON_PRESS_DOWN, this.onPressDownItem, this, iID);
            iID++;
            this._aGraphicItems.push(oItem);     
        }
    }
    this.adjustItemsPosition();
    
    if(this._bSelector && this._oSelector === null){
        var oSpriteSelector = s_oSpriteLibrary.getSprite("item_selector");
        this._oSelector = new CSelector(oSpriteSelector, this._oMaskeredContainer);
    }
};

CButtonsBar.prototype.animationHide = function (cbCompleted, cbOwner, iVal, bVal)
{   
    this._bVisible = bVal;

    if(this._bVisible === null)
    {
        this._bVisible = false;
    }

    if(this._oTween !== null)
    {
        return ;
    }
   
    this._oTween = createjs.Tween.get(this._oContainer);
    this._oTween.to({y: this._pStartPos.y, visible: bVal}, MS_TIME_BAR_SHOW, createjs.Ease.backIn).call(function (){
        cbCompleted.call(cbOwner, iVal);
        this._oTween = null;
    }, null, this); 
};

CButtonsBar.prototype.animationShow = function ()
{
    this._bVisible = this._oContainer.visible = true;
    createjs.Tween.get(this._oContainer).to({y:this._pEndPos.y}, MS_TIME_BAR_SHOW, createjs.Ease.backOut); 
};    

CButtonsBar.prototype.resetDraggedItem = function (iID)
{
    this._aGraphicItems[iID].setVisible(true);
    if(AUTOMATIC_DRAG_TEMP_ITEM_TO_FIELD){
        var oItem = this._aGraphicItems[iID].getGraphic();
        this._aGraphicItems[iID].setBlockInput(true);
        oItem.scaleX = oItem.scalY = 0;
        oItem.alpha = 0;
        var oTween  = createjs.Tween.get(oItem, {override:true});
        oTween.to({alpha:1, scaleX:1, scaleY: 1}, 500, createjs.Ease.backOut);
        oTween.call(function(){
            this._aGraphicItems[iID].setBlockInput(false);
        },this, this);
    }
};

CButtonsBar.prototype.onPressDownItem = function(iID, oInfo)
{    
    if(this._bSelector){
        this._oSelector.show(this._aGraphicItems[iID].getPos());
    }

   var iXOffset =  this._oMaskeredContainer.scrollX;
    
    var oItem = this._aGraphicItems[iID].getGraphic();
    
    this._oListenerPressUp = oItem.on("pressup", this.onPressUpItem, this, null, iID);
    
    playSound("press_but", 1, false);
    this._aParams[ON_PRESS_DOWN] = {id: iID, offset: iXOffset, evt: oInfo, type: this._iType};
    this.triggerEvent(ON_PRESS_DOWN);
};

CButtonsBar.prototype.onPressUpItem = function(oEvt, iID){
    this._aParams[ON_PRESS_UP] = {
                                        evt: oEvt,
                                        item: this._aGraphicItems[iID],
                                        id: iID,
                                        type: this._iType
                                    };
    this.triggerEvent(ON_PRESS_UP);
    var oItem = this._aGraphicItems[iID].getGraphic();
    
    oItem.off("pressup", this. _oListenerPressUp);
};

CButtonsBar.prototype.hideSelector = function()
{
     this._oSelector.hide();
};

CButtonsBar.prototype.getItems = function(){
     return this._aGraphicItems;
};

CButtonsBar.prototype.getItemByID = function(iID){
    return this._aGraphicItems[iID];
};

CButtonsBar.prototype.removeGraphicItem = function(){
    for (var i = 0; i < this._aGraphicItems.length; i++){
        this._aGraphicItems[i].unload();
    }
};

CButtonsBar.prototype.getEndAnimPos = function(){
    return this._pEndPos;
};



function CItemsFieldManagement (oParentContainer, iGameState)
{
    var _oParent;
    var _oParentContainer;
    var _oContainerField;
    var _oContainerDinamic;
    var _oContainerManipolator;
    var _oContainerDebug;
    var _oTempItem;
    var _oShapeField;  
    var _rField;
    var _rLimit;
    var _oSelectedItem;
    var _oItemManipulator;
    var _iItemsID;
    var _fScale;
    var _fRotation;
    
    var _aItemsStored;
    var _aStaticItem;
    var _aActionsStories;
    var _aLimitedArea;
    
    var _pMouseOffset;
    var _pStartMousePos;
    var _pStartItemPos;
    var _pStartLimitArea;
    var _oListenerStageMove;
    var _oListenerStageUp;
    var _oTweenDinamicItemMovement;
    
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams;
    
    this._init = function(oParentContainer, iGameState)
    {
        _oParentContainer = oParentContainer;
        
        _oContainerField = new createjs.Container();
        _oParentContainer.addChild(_oContainerField);
        
        _oContainerDinamic = new createjs.Container();
        
        _oContainerManipolator = new createjs.Container();
        _oParentContainer.addChild(_oContainerManipolator);
        
        _aItemsStored = new Array();
        _aStaticItem = new Array();
        _aActionsStories = new Array();
        _aLimitedArea = new Array();
       
        _rField = new createjs.Rectangle(FIELD_HIT_AREA_PROPIERTIES.x, FIELD_HIT_AREA_PROPIERTIES.y,
                                        FIELD_HIT_AREA_PROPIERTIES.width,FIELD_HIT_AREA_PROPIERTIES.height);
        
        _oShapeField = new createjs.Shape();
        _oShapeField.graphics.beginFill("rgba(0,0,0,0.01)").drawRect( _rField.x, _rField.y,
                            _rField.width , _rField.height);
        _oShapeField.on("click", this.onPressField);

        _oContainerField.addChild(_oShapeField);
              
        _iItemsID = 0;
        _fScale = 0.0;
        _fRotation = 0.0;
        _pMouseOffset = {x: 0, y: 0};
        _pStartMousePos = {x: 0, y: 0};
        _pStartLimitArea = {x: 0, y: 0};
        
        _oTempItem = _oSelectedItem = null;
        _oTweenDinamicItemMovement = null;
        _rLimit = null;
        
        
        _oItemManipulator = new CItemManipulator(_oContainerManipolator);
        _oItemManipulator.addEventListener(ON_PRESSDOWN_EDIT_SCALE, this.onPressDownDinamicItemEditScale, this);
        _oItemManipulator.addEventListener(ON_PRESSDOWN_EDIT_ROTATE, this.onPressDownDinamicItemEditRotate, this);
        _oItemManipulator.addEventListener(ON_PRESS_MOVE_EDIT_SCALE, this.onPressMoveDinamicItemEditScale, this);
        _oItemManipulator.addEventListener(ON_PRESSUP_EDIT_SCALE, this.onPressUpEditScale, this);
        _oItemManipulator.addEventListener(ON_PRESSUP_EDIT_ROTATE, this.onPressUpEditRotate, this);
        _oItemManipulator.addEventListener(ON_PRESS_DELETE, this._onPressUpButtonDelete, this);
        _oItemManipulator.addEventListener(ON_PRESS_FORWARD, this._onPressUpButForward, this);
        _oItemManipulator.addEventListener(ON_PRESS_BACKWARD, this._onPressUpButBackward, this);
            
        this.refreshFieldArea(s_iOffsetX, s_iOffsetY);
        
        this.createDefaultItems();
        this.setLimtedArea();
        
        _oContainerField.addChild(_oContainerDinamic);
        
        _oContainerDebug = new createjs.Container();
        s_oStage.addChild(_oContainerDebug);
        
        for(var i = 0; i < _aStaticItem.length; i++){
           
            if(_aStaticItem[i].getType() === LAMP){
              _aStaticItem[i].setChildIndex(_oContainerField.numChildren - 1);
            }
        }
        
        if(iGameState === SAVED_ROOM){
            this.restoreSavedRoom();
        }
        
        _oListenerStageMove = null;
        _oListenerStageUp = null;
        
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _aParams = new Array();
    }; 
            
    this.createDefaultItems = function(){
        var iID = 0;
        for(var i = 0; i < ITEMS_SETTINGS.length; i++){
            var iType = ITEMS_SETTINGS[i].property.type;
            if(iType === STATIC_ITEMS)
            {
                var iVariant = ITEMS_SETTINGS[i].property.start_variant;
                var bVisibilitySettable = ITEMS_SETTINGS[i].property.visibility_settable;
                var oStaticObject = new CStaticItem(_oContainerField, ITEMS_SETTINGS[i], iID, iVariant);
                if(bVisibilitySettable){
                    oStaticObject.addEventListener("mousedown", ON_PRESS_DOWN_STATIC_ITEM, this._onPressDownStaticItem, this, iID);
                }
                
                _aStaticItem.push(oStaticObject);
                iID++;
            }
        }
    };
    
    this.substituteStaticItem = function(iTypeID, iNewVariant, bIgnoreMod){
        var bMod = false;
        for(var i = 0; i < _aStaticItem.length; i++){
            var iType = _aStaticItem[i].getType();
        
            var iVariant = _aStaticItem[i].getVariant();
            var bVisible = _aStaticItem[i].getVisible();
            if(iType === iTypeID){

                if(iVariant !== iNewVariant){
                    _aStaticItem[i].substituteNewVariant(iNewVariant);
                    bMod = true;
                    if(!bVisible){
                    _aStaticItem[i].setVisible(true);
                    bMod = true;
                }
                }else{
                    if(ITEMS_PROPERTIES[iType].visibility_settable){
                       
                        bVisible = !bVisible;
                        _aStaticItem[i].setVisible(bVisible);
                        bMod = true;
                    }
                }
                
                if(bMod && !bIgnoreMod){
                    _oSelectedItem =_aStaticItem[i];
                    this.setStaticItemActionHistory(i, STATIC_VARIANT, iVariant, bVisible);
                }
               
                break;
            }
        }
        return _aStaticItem[i];
    };
    
    this.setLimtedArea = function(){   
                    
        for(var i = 0; i < LIMITED_AREA_POINTS.length; i++){
            var aPoint = LIMITED_AREA_POINTS[i].points;
            var aPointX = new Array();
            var aPointY = new Array();
            var iType = LIMITED_AREA_POINTS[i].type;
            var oCenterPoint = getPolygonCenterPoint(aPoint);
            oCenterPoint.x += LIMITED_AREA_POINTS[i].offset_center.x;
            oCenterPoint.y += LIMITED_AREA_POINTS[i].offset_center.y;
        
            var oLine = new createjs.Shape();
            oLine.graphics.setStrokeStyle(10)
                         .beginFill("#f00")
                         .moveTo(aPoint[0].x, aPoint[0].y);
            var pMax = {x:aPoint[0].x, y: aPoint[0].y};
            var pMin = {x:aPoint[0].x, y: aPoint[0].y};
            for(var j = 1; j < aPoint.length; j++){
                oLine.graphics.lineTo(aPoint[j].x, aPoint[j].y);
                if(aPoint[j].x > pMax.x){
                    pMax.x = aPoint[j].x;
                }
                if(aPoint[j].x < pMin.x){
                    pMin.x = aPoint[j].x;
                }
              
                if(aPoint[j].y > pMax.y){
                    pMax.y = aPoint[j].y;
                }
                if(aPoint[j].y < pMin.y){
                    pMin.y = aPoint[j].y;
                }
              
            }
            
            oLine.alpha = 0.0;
            oLine.visible = false;
            oLine.cache(pMin.x, pMin.y, pMax.x -  pMin.x, pMax.y - pMin.y);
            _oContainerField.addChild(oLine);
            
            if(SHOW_LIMTIED_AREA && LIMITED_AREA_POINTS[i].show){
                 var oCircle = new createjs.Shape();
                oCircle.graphics.beginFill("#000").drawCircle(oCenterPoint.x, oCenterPoint.y, 20); 
                
                _oContainerField.addChild(oCircle);
            }
            
            
            for(var j = 0; j < aPoint.length; j++){
                aPointX.push(aPoint[j].x);
                aPointY.push(aPoint[j].y);
            }
          
            _aLimitedArea.push(
                                    {
                                        limit: {x: aPointX, y: aPointY},
                                        type: iType, 
                                        center: oCenterPoint,
                                        shape: oLine
                                    }
                                );
        }
    };
    
    this.checkItemDraggedInField = function (pPos, iType, aDimOffset, bWithBar)
    {   
        if(bWithBar)
        {
            if(pPos.x > _rLimit.x  && pPos.x < _rLimit.x + _rLimit.width &&
            pPos.y > _rLimit.y && pPos.y <  _rLimit.y + _rLimit.height)
            {
                return {result: {collided: false, limited_point: null }};
            }
        }
        
        switch (iType){
            case WALL_ITEMS_ONLY:
            case FLOOR_ITEMS_ONLY:{
                
                    return this.checkItemDraggedInLimitedArea(pPos, iType, aDimOffset);
                break;
            }
            
            default:{
                if(pPos.x > _rField.x  && pPos.x < _rField.width &&
                        pPos.y > _rField.y && pPos.y < _rField.height)
                {
                    return {result: {collided:true, limited_point: null }};
                }
            break;
            }
        }
        return {result: {collided:true, limited_point: null}};
    };
    
    this.checkItemDraggedInLimitedArea = function(pPos, iType, aDimOffset){
        for(var i = 0; i < _aLimitedArea.length; i++ ){
           if(iType === _aLimitedArea[i].type){
              
               return checkItemInLimitedArea(
                                               _aLimitedArea[i].limit,
                                                pPos,
                                                aDimOffset,
                                                _aLimitedArea[i].center,
                                                _aLimitedArea[i].type
                                            );
           }
        }
        return {result: {collided:false, limited_point: null }};
    };
    
    this.createTempItemField = function (oDraggedItem, oInfo)
    {
        if(_oTempItem !== null){
           return;
        }
        var oEvt = oInfo.evt;
        var iType = oDraggedItem.getType();
        var iVariant = oDraggedItem.getVariant();
        var pPos = {x: oDraggedItem.getGlobalPosItem().x, y: oDraggedItem.getGlobalPosItem().y};
        var fStartedScale = ITEMS_PROPERTIES[iType].start_scale_dragged;

        _oTempItem = new CDinamicItem(_oContainerDinamic, ITEMS_SETTINGS[iType], _iItemsID, iType, iVariant);
        _oTempItem.setPos(pPos.x + oInfo.offset, pPos.y);
        _oTempItem.setTemp(true);
        _oTempItem.setEditType(ITEMS_SETTINGS[iType].property.editable);
        _oTempItem.setScale(fStartedScale);
        _oTempItem.setGraphicScale(0);
        
        var cbFunc = _oItemManipulator.refreshEditController;
        var cbOwner = _oItemManipulator;
        
        _oTempItem.animationShow(fStartedScale + _oTempItem.prospectiveScale(), cbFunc, cbOwner);
        
        if(!AUTOMATIC_DRAG_TEMP_ITEM_TO_FIELD){
            this.onPressDownDinamicItem(null, oEvt);
        }else{
            this.automaticTempItemToCenterLimitedArea();
        }
    };
    
    this.setTempItemOnField = function(){
        _oSelectedItem = _oTempItem;
        _oSelectedItem.setChildIndex(_oContainerDinamic.numChildren - 1);
        this.showEditController();

        _aItemsStored.push(_oTempItem);
        _oTempItem.setScale(_oTempItem.getDraggedScale());
        _oTempItem.addEventListener(
                                        "mousedown",
                                        ON_PRESS_DOWN_DINAMIC_ITEM,
                                        this.onPressDownDinamicItem,
                                        this,
                                        _iItemsID
                                    );
        _oTempItem.setTemp(false);
        
        this.setDinamicItemActionHistory(
                                            _iItemsID,
                                            PLACED,
                                            null
                                        );
        
        _iItemsID++;
        _oTempItem = null;
        
        _aParams[ON_SET_TEMP_ITEM] = _oSelectedItem;
        this.triggerEvent(null, ON_SET_TEMP_ITEM);
    };
    
    this.deleteTempItem = function (){
        _oTempItem.animationHide(function(oItem){
                                    oItem.unload();
                                }, this, _oTempItem);
        _oTempItem = null;
    };
    
    this.getTempItem = function(){
        return _oTempItem;
    };
    
    this.setLimitedBarArea = function(rRect)
    {            
        _rLimit = rRect;
        
        _rLimit.height += OFFSET_POOL_BAR_LIMIT_AREA.height;
        _rLimit.width += OFFSET_POOL_BAR_LIMIT_AREA.width;
        
        _pStartLimitArea.x =_rLimit.x += OFFSET_POOL_BAR_LIMIT_AREA.x;
        _pStartLimitArea.y = _rLimit.y += OFFSET_POOL_BAR_LIMIT_AREA.y;
        
        if(SHOW_BAR_LIMITED_AREA){
            var oRect = new createjs.Shape();
            oRect.graphics.beginFill("black").drawRect(_rLimit.x,_rLimit.y,_rLimit.width,_rLimit.height);
            oRect.alpha = 1;
            s_oStage.addChild(oRect);
        }
    };
    
    this.setDinamicItemActionHistory = function (iID, iTypeAction, oItemInfo)
    {        
        
        var oHistory = {
                        type: iTypeAction,
                        id: iID,
                        info: oItemInfo
                    };
        _aActionsStories.push(oHistory);
    };
    
    this.setStaticItemActionHistory = function (iID, iTypeAction, iVariant, bVisible)
    {        
        var oHistory = {
                        type: iTypeAction,
                        id: iID,
                        variant: iVariant,
                        visible: bVisible
                    };
    
        _aActionsStories.push(oHistory);
    };
    
    this.undoAction = function()
    {
        if( _aActionsStories.length < 1)
        {
            return;
        }

        var oAction = _aActionsStories.pop();
        
        switch (oAction.type)
        {
            case PLACED:
            {
                var aItem = _aItemsStored.splice(oAction.id, 1);
                _iItemsID = aItem[0].getID();
                aItem[0].animationHide(aItem[0].unload, aItem[0]);
                _oSelectedItem = null;
                break;
            }
            case MODDED:
            {   
                var oInfo = oAction.info;
                var fScale = _aItemsStored[oAction.id].prospectiveScale();
                _aItemsStored[oAction.id].animationUndo(oInfo.scale + fScale, oInfo.rotate);
                break;
            }
            case DELETE:
            {   
                var oInfo = oAction.info;

                var oItem = this.restoreItem(
                                                oAction.id,
                                                oInfo.type,
                                                oInfo.variant,
                                                oInfo.scale,
                                                0,
                                                oInfo.pos,
                                                oInfo.optional
                                            );
                
                oItem.animationUndo(oInfo.pro_scale, oInfo.rotation);
                oItem.setChildIndex(oInfo.depth);     
                
                _aItemsStored.splice(oAction.id, 1, oItem);
                
                break;
            }
            case MOVED:
            {   
                var oInfo = oAction.info;
                var oItem = _aItemsStored[oAction.id];
                var oTween = oItem.animationMovement(oInfo.pos, MS_TIME_MOVED_ITEM_STORED_POS);
                
                oTween.on("change", function(){
                    var fScale = oItem.getScale();

                    fScale += oItem.prospectiveScale();
                    
                    oItem.setGraphicScale(fScale);
               });
               
               oTween.on("complete", function(){
                    var fScale = oItem.getScale();
                    fScale += oItem.prospectiveScale();
                    oItem.setGraphicScale(fScale);
                    
                    oTween.removeAllEventListeners();
               });
                
                break;
            }
            case STATIC_VARIANT:
            {
                _aStaticItem[oAction.id].substituteNewVariant(oAction.variant);
                _aStaticItem[oAction.id].setVisible(oAction.visible);
                break;
            }
            case OPTIONAL_CREATE:
            {
                _aItemsStored[oAction.id].removeAOptional(oAction.opt_type);
                break;
            }
            case OPTIONAL_DELETE:
            case OPTIONAL_SUBSTITUTE:
            {
                if(oAction.area_type === STATIC_ITEMS){
                    _aStaticItem[oAction.id].setOptional(oAction.variant, oAction.opt_type);
                }else{
                    _aItemsStored[oAction.id].setOptional(oAction.variant, oAction.opt_type);
                }
               
                break;
            }
        };
        return oAction.type;
    };
    
    this._onPressDownStaticItem = function(iID, oEvt){

        _oSelectedItem = _aStaticItem[iID];
        _aParams[ON_PRESS_DOWN_STATIC_ITEM] = _oSelectedItem;
        this.triggerEvent(oEvt, ON_PRESS_DOWN_STATIC_ITEM);
        this.showEditController();
        _oItemManipulator.refreshEditController();
        _oItemManipulator.hideCollidersScale();
    };
       
    this.onPressDownDinamicItem = function (iID, oEvt)
    {   
        var oItem;

        if(iID !== null){
            _pStartItemPos = _aItemsStored[iID].getPos();
            oItem = _aItemsStored[iID];
            
        }else{
            oItem = _oTempItem;
            _pStartItemPos = _oTempItem.getPos();
            this.animShowLimitedAreaShapes(_oTempItem.getLimitedAreaType());
        }
     
        _pMouseOffset.x = _pStartItemPos.x - oEvt.stageX;
        _pMouseOffset.y = _pStartItemPos.y - oEvt.stageY;

        _oSelectedItem = oItem;
        if(PRIORITY_DEPTH_SELECTED_ITEM){
            _oSelectedItem.setChildIndex(_oContainerDinamic.numChildren - 1);
        }
        
        this.showEditController();
        var cbCompleted = _oItemManipulator.refreshEditController;
        var cbOwner = _oItemManipulator;

        _oListenerStageMove = s_oStage.on(
                                            "stagemousemove",
                                            this.onPressMoveDinamicItem,
                                            this,
                                            null,
                                            {cb: cbCompleted, scope: cbOwner});
        _oListenerStageUp = s_oStage.on("stagemouseup", this.onPressUpDinamicItem, this);  
        
        _pStartMousePos.x = oEvt.stageX + _pMouseOffset.x;
        _pStartMousePos.y = oEvt.stageY + _pMouseOffset.y;
       
        playSound("press_but", 1, false);
        
        this.checkNeedButtonsDepthSelItem();
        
        _aParams[ON_PRESS_DOWN_DINAMIC_ITEM] = _oSelectedItem;
        this.triggerEvent(oEvt, ON_PRESS_DOWN_DINAMIC_ITEM);
    };
    
    this.onPressMoveDinamicItem = function(oEvt, oInfo){        
        this.itemDragMovement(
                                    oEvt,
                                    _oSelectedItem,
                                    _pMouseOffset,
                                    !_oSelectedItem.getTemp(),
                                    oInfo.cb,
                                    oInfo.scope
                                );
    };
    
    this.onPressUpDinamicItem = function(oEvt, iID)
    {
        s_oStage.off("stagemousemove",_oListenerStageMove);
        s_oStage.off("stagemouseup",_oListenerStageUp);
        _oListenerStageMove = null;
        _oListenerStageUp = null;
        if(_oTweenDinamicItemMovement !== null){
            _oTweenDinamicItemMovement.call(function(oTween){
                _oParent._onEndDinamiItemMovement(oTween);
             });
         }

        if(_oSelectedItem.getTemp()){
            var bItemInField = this.checkItemDraggedInField(
                                                                _oSelectedItem.getGlobalPosItem(),
                                                                _oSelectedItem.getLimitedAreaType(),
                                                                _oSelectedItem.getLimitAreaOffset(),
                                                                s_oGame.getDropBackBar()
                                                            ).result.collided;
      
            if(bItemInField)
            {
               this.setTempItemOnField();
               playSound("item_release", 1, false);
            }else{
                this.deleteTempItem();
                this.hideEditController();
            }
            this.animHideLimitedAreaShapes();
            _aParams[ON_PRESS_UP_TEMP] = {evt: oEvt, item_field: bItemInField, item: _oSelectedItem};
            this.triggerEvent(oEvt, ON_PRESS_UP_TEMP)
            return;
        }
        
        var iDistance = Math.abs((_pStartMousePos.x - _oSelectedItem.getPos().x) + (_pStartMousePos.y - _oSelectedItem.getPos().y));
        if(iDistance > HISTORY_ITEM_MOVED_TOLLERANCE)
        {
            var oItemInfo = {
                                pos: _pStartItemPos
                            };    
           
            _oParent.setDinamicItemActionHistory(
                                        _oSelectedItem.getID(),
                                        MOVED,
                                        oItemInfo
                                     );
        }
        _aParams[ON_PRESS_UP_DINAMIC_ITEM] = {evt: oEvt, item: _oSelectedItem};
        this.triggerEvent(oEvt, ON_PRESS_UP_DINAMIC_ITEM)
    };
    
    this.itemDragMovement = function(oEvt, oDraggedItem, pMouseOffset, bCheckLimitedArea, cbFunc, cbOwner){
        var pPos = {x:oEvt.stageX + pMouseOffset.x, y: oEvt.stageY + pMouseOffset.y};
        var pPosInterpolated = pPos;
        var pReg = oDraggedItem.getReg();
        var oGraphicItem = oDraggedItem.getGraphic();
       
        if(s_bMobile)
        {
            var pHitArea = {height: FIELD_HIT_AREA_PROPIERTIES.height - s_iOffsetY,
                            y: FIELD_HIT_AREA_PROPIERTIES.y + s_iOffsetY};

            var iRegY = pReg.regY * oDraggedItem.getGraphic().scaleX;
            var iYInterpolation = ((pPos.y - pHitArea.height) * ((OFFSET_INTERPOLATION_Y.max + iRegY) - 
                    (OFFSET_INTERPOLATION_Y.min - iRegY))) / (pHitArea.height - pHitArea.y);

            pPosInterpolated = {x:pPos.x, y: pPos.y +iYInterpolation};
        }
        if(bCheckLimitedArea){
            var oInLimit =  this.checkItemDraggedInField(
                                                            pPosInterpolated,
                                                            oDraggedItem.getLimitedAreaType(),
                                                            oDraggedItem.getLimitAreaOffset(),
                                                            false
                                                        );        
                                                 
            var oResult = oInLimit.result;
            if(!oResult.collided){
               var oColPoints = oResult.limited_point;
               
               if(oResult.limited_point === null){
                    return false;
                }
             
                var pNorm = {x:  oColPoints.point.x, y: pPosInterpolated.y};
                var aEdge = [oColPoints.edge.A, oColPoints.edge.B];
                var aItem = [oColPoints.point, pNorm];
                var oIntersection = checkLineIntersection(aEdge, aItem);      
 
                if(oIntersection === null){
                      return false;
                }

                pPosInterpolated.x = oIntersection.x - oInLimit.offset.x;
                pPosInterpolated.y = oIntersection.y - oInLimit.offset.y;     
                
                if(SHOW_INTERSECTION_ITEM_DEBUG){
                    createGraphicCircle(pPosInterpolated, 10, 2000, _oContainerField, "rgba(255,0,0,0.5)");
                    createGraphicCircle(pNorm, 10, 2000, _oContainerField, "rgba(0,255,0,0.5)");
                    createGraphicCircle(oIntersection, 10, 2000, _oContainerField, "rgba(255,255,0,0.5)");
                    createGraphicCircle(pPosInterpolated, 10, 2000, _oContainerField, "rgba(0,0,255,0.5)");
                 }
            }
        }
       
        _oTweenDinamicItemMovement = createjs.Tween.get(oGraphicItem, {override: true})
                      .to(
                                {x: pPosInterpolated.x,
                                y: pPosInterpolated.y},
                                MS_TIME_ANIAMTION_ITEM_SELECTED,
                                createjs.Ease.backOut
                           );
        _oTweenDinamicItemMovement.on("change", function()
                        {   
                            if(cbFunc !== null){
                                cbFunc.call(cbOwner);
                            }
                             var fScale = oDraggedItem.getDraggedScale();

                            if(!oDraggedItem.getTemp()){
                                fScale = oDraggedItem.getScale();
                                this.checkNeedButtonsDepthSelItem();
                            }

                            fScale += oDraggedItem.prospectiveScale();

                            oGraphicItem.scaleX = oGraphicItem.scaleY = fScale;

                            _aParams[ON_PRESS_MOVE_DINAMIC_ITEM] = {item: oDraggedItem};
                            
                            oDraggedItem.refreshRect();
                            
                            this.triggerEvent(oEvt, ON_PRESS_MOVE_DINAMIC_ITEM);

                        }, this);
        

        return true;
    };
    
    this.onPressField = function(oEvt)
    {
        _oParent.triggerEvent(oEvt, ON_PRESS_FIELD);
    };
    
    this._onScaleItem = function()
    {
        _oItemManipulator.startScale(_oSelectedItem);
    };
    
    this._onRotateItem = function()
    {
        _oItemManipulator.startRotate(_oSelectedItem);
    };
    
    this.triggerRotationTutorial = function(oInteractiveHelp){
        var oOnMovement = {
                            cb: _oItemManipulator.refreshEditController,
                            scope: _oItemManipulator
                          };
    
        var oInfo = {
                        tutorial: ROTATION_TUTORIAL, 
                        info: {
                                but_rot: _oItemManipulator.getButRotation(),
                                movement: false,
                                pos:{x:0,y:0},
                                item: _oSelectedItem,
                                cb_movement : oOnMovement
                              }       
                    };
        
        var bOnGui = false;
        
        var oGraphicButtonRot = oInfo.info.but_rot.getGraphic();
        var iLimitX = s_iOffsetX + 100;
        var iXManipulatorButtons = oGraphicButtonRot.x;
        var pPos = _oSelectedItem.getPos();
        
        if(iXManipulatorButtons < iLimitX){
            var iX = pPos.x + (iLimitX - iXManipulatorButtons );
            pPos.x = iX;
            bOnGui = true;
        }
        
        if(bOnGui){
            oInfo.info.movement = true;
            oInfo.info.pos = pPos;
        }

        oInteractiveHelp.startTutorial(oInfo);
    };
    
    this.triggerScaleTutorial = function(oInteractiveHelp){
        var oOnMovement = {
                            cb: _oItemManipulator.refreshEditController,
                            scope: _oItemManipulator
                          };
    
        var oInfo = {
                        tutorial: SCALE_TUTORIAL, 
                        info: {
                                but_scale: _oItemManipulator.getButScale(),
                                movement: false,
                                pos:{x:0,y:0},
                                item: _oSelectedItem,
                                cb_movement : oOnMovement
                              }       
                    };

        var bOnGui = false;
        
        var oGraphicButtonScale = oInfo.info.but_scale.getGraphic();
        var oContainerButtons = oGraphicButtonScale.parent;
        var oButtonsRightBounds = s_oInterface.getContainerRightBounds();
        var iLimitX = oButtonsRightBounds.x - oButtonsRightBounds.width;
        var iXManipulatorButtons = oContainerButtons.x +200;
        var pPos = _oSelectedItem.getPos();

        if(iXManipulatorButtons > iLimitX){
            var iX = pPos.x - (iXManipulatorButtons - iLimitX);
            pPos.x = iX;
            bOnGui = true;
        }
        
        if(bOnGui){
            oInfo.info.movement = true;
            oInfo.info.pos = pPos;
        }

        oInteractiveHelp.startTutorial(oInfo);
    };
    
    this.triggerDepthTutorial = function(oInteractiveHelp){
        var oCollided = this.checkNeedButtonsDepthSelItem();
        if(oCollided.collided){
            var pSelPos = _oSelectedItem.getPos();
            var oOnMovement = {
                                cb: _oItemManipulator.refreshEditController,
                                scope: _oItemManipulator
                              };

            var oInfo = {
                            tutorial: DEPTH_TUTORIAL, 
                            info: {
                                    but_forward: _oItemManipulator.getButForward(),
                                    but_backward: _oItemManipulator.getButBackward(),
                                    movement: false,
                                    start_pos: pSelPos,
                                    pos:{x:0,y:0},
                                    item: _oSelectedItem,
                                    cb_movement : oOnMovement
                                  }       
                        };
            var iSelAreaType = _oSelectedItem.getLimitedAreaType();
            var iItemColAraType = _aItemsStored[oCollided.id].getLimitedAreaType();
            
            if(iSelAreaType === iItemColAraType || 
               iSelAreaType === FREE_ITEMS){
                var pPos = _aItemsStored[oCollided.id].getPos();
                var pItemColDim = _aItemsStored[oCollided.id].getNormalizedDimension();
                var pSelDim = _oSelectedItem.getNormalizedDimension();
                var oLimitedArea;
                iSelAreaType = _aItemsStored[oCollided.id].getLimitedAreaType();
                 for(var i = 0; i < _aLimitedArea.length; i++ ){
                    if(iSelAreaType === _aLimitedArea[i].type){
                        oLimitedArea = _aLimitedArea[i];
                        break;
                    }
                }                
               
                var iWidthOffset = Math.abs(((pItemColDim.width *0.5) - (pSelDim.width*0.5))  );
                var iHeightOffset = Math.abs(((pItemColDim.height *0.5) - (pSelDim.height*0.5))) ;
                if(pPos.x > oLimitedArea.center.x){
                    pPos.x -= iWidthOffset;
                }else{
                    pPos.x += iWidthOffset;
                }
                
                if(iSelAreaType === FLOOR_ITEMS_ONLY){              
                    if(pPos.y  > oLimitedArea.center.y){
                        pPos.y -= iHeightOffset;
                    }else if (iHeightOffset > iWidthOffset){       
                         pPos.y += iHeightOffset;
                    }
                }
                
                var oGraphicButtonForward = oInfo.info.but_forward.getButton();
                var oContainerButtons = oGraphicButtonForward.parent;
                var oButtonsRightBounds = s_oInterface.getContainerRightBounds();
                var iLimitX = oButtonsRightBounds.x - oButtonsRightBounds.width;
                var iXManipulatorButtons = oContainerButtons.x + oGraphicButtonForward.regX*2 + 10;

                if(iXManipulatorButtons > iLimitX){
                    var iX = iLimitX - pSelDim.width *0.5 - (iXManipulatorButtons - iLimitX);
                    pPos.x = iX;
                }
                oInfo.info.movement = true;
                oInfo.info.pos = pPos;     
            }
            
            var oOnEnd = {
                cb: oInteractiveHelp.startTutorial,
                scope: oInteractiveHelp,
                param: oInfo
            };
            
            oOnEnd.cb.call(oOnEnd.scope, oOnEnd.param);
        }
        return oCollided.collided;
    };
    
    this.resetField = function ()
    {
        for (var i = 0; i < _aItemsStored.length; i++)
        {
            _aItemsStored[i].unload();
        }
        
        for(var i = 0; i < _aStaticItem.length; i++){
            var iType = _aStaticItem[i].getType();
            var oInfo = ITEMS_PROPERTIES[_aStaticItem[i].getType()];
            var iVariant = oInfo.start_variant;
            this.substituteStaticItem(iType, iVariant, true);
            _aStaticItem[i].setVisible(oInfo.visible);
            
            var aOptionals = _aStaticItem[i].getOptionals();
            
            for(var j = 0; j < aOptionals.length; j++){
                _aStaticItem[i].removeAOptional(aOptionals[j].type);
            };
            
        }
        
        _aItemsStored = new Array();
        _aActionsStories = new Array();
        _iItemsID = 0;
        _oSelectedItem = null;
        this.hideEditController();
    };
    
    this.hideEditController = function()
    {
        _oItemManipulator.hideEditController();  
        _oItemManipulator.hideCollidersScale();
        _oItemManipulator.hideCollidersRotate();
  
        _oSelectedItem = null;
    };
    
    this.showEditController = function()
    {
        _oItemManipulator.showEditController(_oSelectedItem);
        
        switch(_oSelectedItem.getEditType()){
            case SCALE_ONLY:
                _oItemManipulator.showCollidersScale();
                _oItemManipulator.hideCollidersRotate();
                break;
            case ROTATION_ONLY:   
                _oItemManipulator.showCollidersRotate();
                _oItemManipulator.hideCollidersScale();
                break;
            case FULL_EDITABLE:
                _oItemManipulator.showCollidersScale();
                _oItemManipulator.showCollidersRotate();
                break;
            case NOT_EDITABLE:
                _oItemManipulator.hideCollidersRotate();
                _oItemManipulator.hideCollidersScale();
                break;
        }
    };
    
    this._onDeleteItem = function ()
    {
        if(_oSelectedItem === null || _oListenerStageUp !== null)
        {
            return;
        }
      
        if(_oSelectedItem.getLimitedAreaType() === STATIC_ITEMS){
            this.setStaticItemActionHistory(
                                                _oSelectedItem.getID(),
                                                STATIC_VARIANT,
                                                _oSelectedItem.getVariant(),
                                                true
                                            );
            _oSelectedItem.animationHide(
                                            function(oItem){
                                                oItem.setVisible(false);
                                                oItem.setGraphicScale(1);
                                            },
                                            _oSelectedItem,
                                            _oSelectedItem
                                        );
        }else{
            var aOptional = new Array();
            var aItemOptional = _oSelectedItem.getOptionals();

            for(var j = 0; j < aItemOptional.length; j++){
                aOptional.push({
                                   type: aItemOptional[j].type,
                                   variant: aItemOptional[j].variant
                               });
            }

            var oItemInfo = {
                    type: _oSelectedItem.getType(),
                    scale:  _oSelectedItem.getScale(),
                    rotation: _oSelectedItem.getRotate(),
                    pos: _oSelectedItem.getPos(),
                    depth: _oSelectedItem.getChildIndex(),
                    variant: _oSelectedItem.getVariant(),
                    pro_scale: _oSelectedItem.getScaleX(),
                    optional: aOptional
            };       

            this.setDinamicItemActionHistory(
                                                _oSelectedItem.getID(),
                                                DELETE,
                                                oItemInfo
                                            );

            _oSelectedItem.animationHide(_oSelectedItem.unload, _oSelectedItem, false);
        }
        this.hideEditController();
      
        _oSelectedItem = null;
    };
    
    this._onPressDepthModifier = function(iDir){
        if(_oSelectedItem === null)
        {
            return;
        }
     
        var iSelDepth = _oSelectedItem.getChildIndex();
        var iSelID = _oSelectedItem.getID();
        var rSelRect = _oSelectedItem.getRect(); 
        var bCollided = false;
        
        var aCollided = new Array();
        for(var i = 0; i < _aItemsStored.length; i++){
            var rRect = _aItemsStored[i].getRect();
            if(rRect === null || _aItemsStored[i].getID() === iSelID){
                continue;
            }
            var iDepth = _aItemsStored[i].getChildIndex();
           
            bCollided = rSelRect.intersects(rRect);
                                
            if(bCollided){     
               aCollided.push( iDepth);
            }
        }
        
        if(aCollided.length <= 0){
            return;
        }
        
        var iNewDepth = null;
        var iCheckDepth = iSelDepth + iDir;
        
        if(iDir > 0){
           iNewDepth = closestNumInArrayMaj(iCheckDepth, aCollided);
        }else{
            iNewDepth = closestNumInArrayMin(iCheckDepth, aCollided);
        }
       // console.log(iNewDepth);
        if(iNewDepth !== null){
            _oSelectedItem.setChildIndex(iNewDepth );
        }
    };
    
    this.setVisibleButtonsDepth = function(bVal){
        _oItemManipulator.setVisibleButtonsDepth(bVal);
    };
    
    this.setItemOptional = function(iIDOptional, iTypeOptional){
       var oHistory = _oSelectedItem.setOptional(iIDOptional, iTypeOptional);
       
        _aActionsStories.push(oHistory);
       
    };
    
    this.onPressDownDinamicItemEditRotate = function()
    {
        _fRotation = _oSelectedItem.getRotate();
    };
    
    this.onPressDownDinamicItemEditScale = function ()
    {
        _fScale = _oSelectedItem.getScale();
    };
    
    this.onPressMoveDinamicItemEditScale = function(){
        _aParams[ON_PRESS_MOVE_EDIT_SCALE] = _oSelectedItem;
 
        this.triggerEvent(null, ON_PRESS_MOVE_EDIT_SCALE);
    };
    
    this.onPressUpEditScale = function ()
    {
       
        var oItemInfo = {
                scale: _oSelectedItem.getScale(),
                rotation: _fRotation
        };  
           
        if(_fScale !== _oSelectedItem.getScale())
        {
            this.setDinamicItemActionHistory(
                                                _oSelectedItem.getID(),
                                                MODDED,
                                                oItemInfo
                                            );
        }
    };
    
    this.onPressUpEditRotate = function ()
    {
        var oItemInfo = {
                scale: _oSelectedItem.getScale(),
                rotation: _fRotation
        };  
        
        if(_fRotation !== _oSelectedItem.getRotate())
        {       
            this.setDinamicItemActionHistory(
                                                _oSelectedItem.getID(),
                                                MODDED,
                                                oItemInfo
                                            );
        } 
    };
    
    this._onPressUpButtonDelete = function()
    {
        this._onDeleteItem();
        s_oGame.hideOptionalBars();
    };
    
    this._onPressUpButForward = function(){
        this._onPressDepthModifier(1);
    };
    
    this._onPressUpButBackward = function(){
        this._onPressDepthModifier(-1);
    };
    
    this._interactiveHelp = function(){
        _oParent.triggerScaleTutorial();
        _oParent.triggerRotationTutorial();
        _oParent.triggerDepthTutorial();
    };
    
    this.animShowLimitedAreaShapes = function(iNotShow){
        if(iNotShow === FREE_ITEMS){
            return;
        }
        
        for(var i = 0; i < _aLimitedArea.length; i++){
            if(iNotShow !== _aLimitedArea[i].type){
                var oShape = _aLimitedArea[i].shape;
                var oTween = createjs.Tween.get(oShape, {override: true});
                oShape.visible = true;
                oTween.to({alpha: 0.5}, MS_TIME_SHAPE_ANIAMATION, createjs.Ease.cubicIn);
                oTween.on("change", function(){
                    oShape.updateCache();
                });
                oTween.call(function(oCbTween){
                    oCbTween.target.updateCache();
                    oCbTween.removeAllEventListeners();
                });
            }
        }
    };  
    
    this.animHideLimitedAreaShapes = function(){
        for(var i = 0; i < _aLimitedArea.length; i++){
            var oShape = _aLimitedArea[i].shape;
            if(oShape.visible){
                var oTween = createjs.Tween.get(oShape, {override: true});
                oTween.to({alpha: 0.0, visible: true}, MS_TIME_SHAPE_ANIAMATION, createjs.Ease.cubicIn);
                oTween.on("change", function(){
                    oShape.updateCache();
                });
                oTween.call(function(oCbTween){
                    oCbTween.target.updateCache();
                    oCbTween.removeAllEventListeners();
                });
            }
        }
    };
    
    this.refreshFieldArea = function (iXOffset, iYOffset)
    {
        _rField.x = FIELD_HIT_AREA_PROPIERTIES.x + iXOffset;
        _rField.y = FIELD_HIT_AREA_PROPIERTIES.y + iYOffset;
        _rField.width = FIELD_HIT_AREA_PROPIERTIES.width - iXOffset;
        _rField.height = FIELD_HIT_AREA_PROPIERTIES.height - iYOffset;
        
        if(_rLimit !== null)
        {
            _rLimit.y = _pStartLimitArea.y + iYOffset;
      
        }   
        if (SHOW_FIELD_AREA)
        {
            _oShapeField.graphics.command.x = _rField.x ;
            _oShapeField.graphics.command.y = _rField.y ;
            _oShapeField.graphics.command.w = _rField.width;
            _oShapeField.graphics.command.h = _rField.height;
        }
    };
    
    this.saveField = function(){
        var oJSONStaticItem;
        var oJSONDinamicItem;
        
        var aDinamicItemToStored = new Array();
        var aStaticItemToStored = new Array();
       _oContainerDebug.removeAllChildren();
        for(var i = 0; i < _aItemsStored.length; i++){
            if(_aItemsStored[i].getGraphic() === null){
                continue;
            }

            var oItem = _aItemsStored[i];

            var aOptional = new Array();
            var aItemOptional = oItem.getOptionals();

            for(var j = 0; j < aItemOptional.length; j++){
                aOptional.push({
                                   type: aItemOptional[j].type,
                                   variant: aItemOptional[j].variant
                               });
            }

            var oInfo ={
                          id: oItem.getID(),
                          pos: oItem.getPos(),
                          type: oItem.getType(),
                          variant: oItem.getVariant(),
                          scale: oItem.getScale(),
                          rotation: oItem.getRotate(),
                          pro_scale: oItem.getScaleX(),
                          depth: oItem.getChildIndex() ,
                          optional: aOptional
                        };
            createGenericText({
                        pos: oInfo.pos,
                        size: 80,
                        text:  oInfo.depth,
                        outline: true,
                        outline_size: 3,
                        multiline: true,
                        width: 100,
                        height: 100 ,
                        align: CENTER,
                        line_height: 1
                    }, _oContainerDebug);
                    

            aDinamicItemToStored.push(oInfo);

        }
        
        oJSONDinamicItem = JSON.stringify(aDinamicItemToStored);
        
        for(var i = 0; i < _aStaticItem.length; i++){
            var oItem = _aStaticItem[i];
            var aOptional = new Array();
            var aItemOptional = oItem.getOptionals();
            
            for(var j = 0; j < aItemOptional.length; j++){
                aOptional.push({
                                   type: aItemOptional[j].type,
                                   variant: aItemOptional[j].variant
                               });
            }
            var oInfo ={
                          id: oItem.getID(),
                          type: oItem.getType(),
                          variant: oItem.getVariant(),
                          visible:  oItem.getVisible(),
                          optional: aOptional
                        };
            aStaticItemToStored.push(oInfo);   
        }
        oJSONStaticItem = JSON.stringify(aStaticItemToStored);
        
        saveItem(SAVE_ROOM_STATIC_ITEM, oJSONStaticItem);
        saveItem(SAVE_ROOM_DINAMIC_ITEM, oJSONDinamicItem);
    };
    
    this.restoreSavedRoom = function(){
        var oJSONDinamicItem = getItem(SAVE_ROOM_DINAMIC_ITEM);
        var oJSONStaticItem = getItem(SAVE_ROOM_STATIC_ITEM);
        
        var aDinamicItemSaved = JSON.parse(oJSONDinamicItem);
        var aStaticItemSaved = JSON.parse(oJSONStaticItem);
        
        for(var i = 0; i < aDinamicItemSaved.length; i++){
            var oSavedItem = aDinamicItemSaved[i];
            var iType = oSavedItem.type;
            var iVariant = oSavedItem.variant;
            var fScale = oSavedItem.scale;
            var fProspectiveScale = oSavedItem.pro_scale;
            var pPos = oSavedItem.pos;
            var aOptionals = oSavedItem.optional;
            var fRotation = oSavedItem.rotation;
            
            var oItem = this.restoreItem(
                                            _iItemsID,
                                            iType,
                                            iVariant,
                                            fScale,
                                            fProspectiveScale,
                                            pPos,
                                            aOptionals,
                                            fRotation
                                        );
                                

                                        
            _aItemsStored.push(oItem);
            _iItemsID++;
        }
      
        for (var i = 0; i < _aStaticItem.length; i++){
            var oItem = _aStaticItem[i];
            
            for(var j = 0; j < aStaticItemSaved.length; j++){
                if(oItem.getType() === aStaticItemSaved[j].type){
                    var oSavedItem = aStaticItemSaved[j];
                    if(oSavedItem.visible === false){
                        break;
                    }
                    this.substituteStaticItem(oItem.getType(), oSavedItem.variant, true);
                    if(oSavedItem.optional.length > 0){
                        var aOptionals = oSavedItem.optional;
                        for(var k = 0; k < aOptionals.length; k++){
                            oItem.setOptional(aOptionals[k].variant, aOptionals[k].type);
                        }
                    }
                    break;
                }
            }
        }
        
        for(var j = 0; j < 2; j++){
            //DEPTH DINAMIC ITEM ADJUSTMENT
            for(var i = 0; i < aDinamicItemSaved.length; i++){
                var iDepth = aDinamicItemSaved[i].depth;
                var pPos = aDinamicItemSaved[i].pos;
                _aItemsStored[i].setChildIndex(iDepth);
                
                if(j === 0 && SHOW_DEBUG_TEXT_RESTORE_DEPTH){
                    var szText = "TYPE " + _aItemsStored[i].getType() + " DEPTH " + iDepth;

                    createGenericText({
                        pos: pPos,
                        size: 52,
                        text: szText,
                        outline: true,
                        outline_size: 3,
                        multiline: true,
                        width: 80,
                        height: 120,
                        align: CENTER,
                        line_height: 1
                    }, _oContainerDebug);
                }
            }
        }
    };
    
    this.restoreItem = function(iID, iType, iVariant, fScale, fProspScale, pPos, aOptionals, fRotation){
        var oItem = new CDinamicItem(_oContainerDinamic, ITEMS_SETTINGS[iType], iID, iType, iVariant);
        oItem.setPos(pPos.x, pPos.y);
        oItem.setEditType(ITEMS_SETTINGS[iType].property.editable);
        oItem.setScale(fScale);
        oItem.setGraphicScale(fProspScale);
        oItem.setRotate(fRotation);
        oItem.addEventListener("mousedown", ON_PRESS_DOWN_DINAMIC_ITEM, this.onPressDownDinamicItem, this, iID);
        oItem.refreshRect();
      
        for(var k = 0; k < aOptionals.length; k++){
            oItem.setOptional(aOptionals[k].variant, aOptionals[k].type);
        }
        
        return oItem;
    };
    
    this.checkNeedButtonsDepthSelItem = function(){
        var iSelID = _oSelectedItem.getID();
        var rSelRect = _oSelectedItem.getRect(); 
        var bCollided = false;
        var iID = 0;
        for(var i = 0; i < _aItemsStored.length; i++){
            var rRect = _aItemsStored[i].getRect();
            if(rRect === null || _aItemsStored[i].getID() === iSelID){
                continue;
            }

           bCollided = rSelRect.intersects(rRect);
                 
            if(bCollided){
                iID = i;
                break;
            }
        }
        _oItemManipulator.setVisibleButtonsDepth(bCollided);
        return {collided: bCollided, id: iID};
    };

    this.automaticTempItemToCenterLimitedArea = function(){
        var iLimitedArea = _oTempItem.getLimitedAreaType();
        var pCenter = {x: CANVAS_WIDTH*0.5, y: CANVAS_HEIGHT*0.5} ;
        var pOffset = {x: OFFSET_AUTOMATIC_ITEM_DRAG.x, y:OFFSET_AUTOMATIC_ITEM_DRAG.y};
        
        switch(iLimitedArea){
            case WALL_ITEMS_ONLY:
            case FLOOR_ITEMS_ONLY:
                   for(var i = 0; i < _aLimitedArea.length; i++ ){
                    if(iLimitedArea === _aLimitedArea[i].type){
                        pCenter = {x:_aLimitedArea[i].center.x, y:_aLimitedArea[i].center.y};
                        var aLimitOffset = _oTempItem.getStockLimitAreaOffset();
                        pCenter.y -= aLimitOffset[0].y;
                        
                        break;
                    }
                }      
                break;
        }
        
        var oEvt = {
                        stageX: pCenter.x + pOffset.x,
                        stageY: pCenter.y + pOffset.y
                    };
                    
        this.itemDragMovement(oEvt, _oTempItem, {x:0,y:0}, false, null, null);
         _oSelectedItem = _oTempItem;
        _oTweenDinamicItemMovement.on("complete", function(oEvt){
            _oParent.onPressUpDinamicItem(null, null);
            _oParent._onEndDinamiItemMovement(oEvt.target);
        });
    };
    
    this._onEndDinamiItemMovement = function(oTween){
        oTween.removeAllEventListeners();
        oTween = null;
        _aParams[ON_END_DINAMIC_ITEM_MOVEMENT] = {item: _oSelectedItem};
        _oParent.triggerEvent(null, ON_END_DINAMIC_ITEM_MOVEMENT);
    };
    
    this.refreshManipulatorButtonsPositionOffsets = function(){
        _oItemManipulator.buttonsPositionOffset();
    };
    
    this.unload = function (){
        for(var i = 0; i < _aItemsStored.length; i++){
            _aItemsStored[i].unload();
        }
        
        for(var i = 0; i < _aStaticItem.length; i++){
            _aStaticItem[i].unload();
        }
        _oShapeField.removeAllEventListeners();
        _oItemManipulator.unload();
    };
    
    this.triggerEvent = function(oEvt, iEvent)
    {     
        if(_aCbCompleted[iEvent])
        {
            _aCbCompleted[iEvent].call(_aCbOwner[iEvent], _aParams[iEvent], oEvt);
        }      
    };
  
    this.addEventListener = function (iEvent, cbCompleted, cbOwner, aParams)
    {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams[iEvent] = aParams;
    };
    
    _oParent = this; 
    this._init(oParentContainer, iGameState);
}

function CGenericCollider(iX,iY,iType,bCursor,oSprite, pRegPoint, oParentContainer){
    var _iType = iType;
    var _aCbCompleted;
    var _aCbOwner;
    var _oListenerDown;
    var _oListenerPressMove;
    var _oListenerUp;
    
    var _oSprite;
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init = function(iX,iY, bCursor,oSprite, pRegPoint){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
       
        _oContainer.cursor = "pointer";

        _oParentContainer.addChild(_oContainer);
        
        if(oSprite === null){
            _oSprite = new createjs.Shape();
            _oSprite.graphics.beginFill("rgba(255,255,255,0.4)").drawRect(-SHAPE_DIMENSION/2, -SHAPE_DIMENSION/2, SHAPE_DIMENSION, SHAPE_DIMENSION);
        }else{
            _oSprite = createBitmap(oSprite);
            _oContainer.regX = pRegPoint.regX;
            _oContainer.regY = pRegPoint.regY;
        }
        
        _oContainer.addChild(_oSprite);
        _oListenerDown = _oSprite.on("mousedown",this._onPress,this);
    };
    
    this.unload = function(){
        _oSprite.off("mousedown",_oListenerDown);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.setVisible = function(bVisible){
        _oContainer.visible = bVisible;
    };
    
    this.setPos = function(iX,iY){
        _oContainer.x = iX;
        _oContainer.y = iY;
    };
    
    this._onPress = function(evt){
        if(_aCbCompleted[ON_PRESS_COLLIDER]){
            _aCbCompleted[ON_PRESS_COLLIDER].call(_aCbOwner[ON_PRESS_COLLIDER],evt,_iType,{x:_oContainer.x,y:_oContainer.y});
        }
        
        _oListenerPressMove = _oSprite.on("pressmove",this._onPressMove,this);
        _oListenerUp = _oSprite.on("pressup",this._onRelease,this);
        
    };
    
    this._onPressMove = function(evt){
        if(_aCbCompleted[ON_PRESSMOVE_COLLIDER]){
            _aCbCompleted[ON_PRESSMOVE_COLLIDER].call(_aCbOwner[ON_PRESSMOVE_COLLIDER],evt,_iType);
        }
    };
    
    this._onRelease = function(){
        _oSprite.off("pressmove",_oListenerPressMove);
        _oSprite.off("pressup",_oListenerUp);
        
        if(_aCbCompleted[ON_RELEASE_COLLIDER]){
            _aCbCompleted[ON_RELEASE_COLLIDER].call(_aCbOwner[ON_RELEASE_COLLIDER],_iType);
        }
    };
    
    this.getGraphic = function(){
        return _oContainer;
    };
    
    this.setScale = function(fScale)
    {
        _oContainer.scaleX = _oContainer.scaleY = fScale;
    };
    
    this.getX = function(){
        return _oContainer.x;
    };
    
    this.getY = function(){
        return _oContainer.y;
    };
    
    this._init(iX,iY,bCursor,oSprite, pRegPoint);
}

function CEditController(iX,iY,oParentContainer){
    var _bShowing;
    var _aCbCompleted;
    var _aCbOwner;

    var _oShape;
    
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init = function(iX,iY){
        _bShowing = false;
        _aCbCompleted = new Array();
        _aCbOwner =new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oParentContainer.addChild(_oContainer);

        _oShape = new createjs.Shape();
        _oContainer.addChild(_oShape);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.unload = function(){
        _oParentContainer.removeChild(_oContainer);
    };
    
    this.show = function(iX,iY,iWidth,iHeight){
        _bShowing = true;
        _oShape.graphics.clear();
        _oShape.graphics.beginStroke("rgba(0,0,0,0.7)").setStrokeStyle(1).beginFill("rgba(0,0,0,0.01)").drawRect(-10,-10,iWidth+20,iHeight+20);
        
        _oContainer.x = iX;
        _oContainer.y = iY;
        
        _oContainer.alpha = 0;
        _oContainer.visible = true;
        createjs.Tween.get(_oContainer).to({alpha:1}, 500, createjs.Ease.cubicOut); 
    };
    
    this.setVisible = function(bVisible){
        _oContainer.visible = bVisible;
    };
    
    this.hide = function(){
        _bShowing = false;
        _oContainer.visible = false;
    };
    
    this.refreshDrawing = function(iX,iY,iWidth,iHeight){
        _oContainer.x = iX;
        _oContainer.y = iY;
     
        _oShape.graphics.clear();
        _oShape.graphics.beginStroke("rgba(0,0,0,0.7)").setStrokeStyle(1).beginFill("rgba(0,0,0,0.01)").drawRect(-10,-10,iWidth+20,iHeight+20);
    };
    
    this.changeRotContainer = function(iRot){
        _oContainer.rotation = iRot;
    };
    
    this.setPos = function(iX,iY){
        _oContainer.x = iX;
        _oContainer.y = iY;
    };

    this.isVisible = function(){
        return _bShowing;
    };
    
    this._init(iX,iY);
}

function CItemManipulator (oParentContainer)
{
    var _oParentContainer;
    var _oContainerEdit;
    var _oSelectedItem;
    var _oColliderScale;
    var _oColliderRotate;
    var _oButDelete;
    var _oButForward;
    var _oButBackward;
    var _pPressPoint;
    var _rStartingRect;
    var _oTmpRect;
    var _oEditController;
    var _iCurRot;
    var _iOffsetAngle;
    var _oParent;
    
    var _iScaleManipulatorFactor;
    var _rContainerEditBounds;
    
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams;
    
    this._init = function(oParentContainer)
    {
        _oParentContainer = oParentContainer;
        
        _oContainerEdit = new createjs.Container();
        _oParentContainer.addChild(_oContainerEdit);
     
        var oSpriteScale = s_oSpriteLibrary.getSprite("scale_left");
        
        var pRegPoint = {regX: oSpriteScale.width/2, regY: oSpriteScale.height/2};
        
        _oColliderScale = new CGenericCollider(0, 0, COLLIDER_TOP_RIGHT , true, oSpriteScale, pRegPoint, _oContainerEdit);
        _oColliderScale.setVisible(false);
        
        var pStartPosDelete = {x: 0, y:  oSpriteScale.height + 10 };

        var oSpriteDelete = s_oSpriteLibrary.getSprite("but_delete");
        var pStartPosDelete = {x: 0, y:  oSpriteScale.height + 10 };
        _oButDelete = new CGfxButton(pStartPosDelete.x, pStartPosDelete.y, oSpriteDelete, _oContainerEdit);
        _oButDelete.addEventListener(ON_MOUSE_UP,this._onDelete, this);
        
        var oSpriteButForward = s_oSpriteLibrary.getSprite("but_forward");
        var pStartPosButForward = {x: pStartPosDelete.x, y: pStartPosDelete.y + oSpriteDelete.height + 10};
        _oButForward = new CGfxButton(pStartPosButForward.x, pStartPosButForward.y, oSpriteButForward, _oContainerEdit);
        _oButForward.addEventListener(ON_MOUSE_UP, this._onPressUpForward, this);
        
        var oSpriteButBackward = s_oSpriteLibrary.getSprite("but_backward");
        var pStartPosButBackward = {x: pStartPosButForward.x, y: pStartPosButForward.y + oSpriteButForward.height + 10};
        _oButBackward = new CGfxButton(pStartPosButBackward.x, pStartPosButBackward.y, oSpriteButBackward, _oContainerEdit);
        _oButBackward.addEventListener(ON_MOUSE_UP, this._onPressUpBackward, this);
  
        _oColliderScale.addEventListener(ON_PRESS_COLLIDER, this._onPressColliderScale, this);
        _oColliderScale.addEventListener(ON_PRESSMOVE_COLLIDER, this._onPressMoveColliderScale, this);
        _oColliderScale.addEventListener(ON_RELEASE_COLLIDER, this._onReleaseColliderScale, this);        
        
        var oSpriteRotate = s_oSpriteLibrary.getSprite("rotate_bottom_left");
        var pRegPoint = {regX: oSpriteRotate.width + 15, regY: -15};
        _oColliderRotate = new CGenericCollider(0, 0, COLLIDER_BOTTOM_LEFT, false , oSpriteRotate, pRegPoint ,_oParentContainer);
        _oColliderRotate.setVisible(false);
        _oColliderRotate.addEventListener(ON_PRESS_COLLIDER, this._onPressColliderRotate,this);
        _oColliderRotate.addEventListener(ON_PRESSMOVE_COLLIDER, this._onPressMoveColliderRotate,this);
        _oColliderRotate.addEventListener(ON_RELEASE_COLLIDER, this._onReleaseColliderRotate,this);
        
        _iScaleManipulatorFactor = 1;
        if(!s_bMobile)
        {
             _iScaleManipulatorFactor = _oContainerEdit.scaleX = _oContainerEdit.scaleY = 0.75;
            _oColliderRotate.setScale(0.75);
        }
     
        _oContainerEdit.regX = -oSpriteScale.width/2 + (-OFFSET_MANIPULATOR_COLLIDER.x * _oContainerEdit.scaleX);
        _oContainerEdit.regY = oSpriteScale.height/2 + (+ OFFSET_MANIPULATOR_COLLIDER.y * _oContainerEdit.scaleX);
        _oContainerEdit.visible = false;

       _rContainerEditBounds = new createjs.Rectangle();
       _rContainerEditBounds.copy(_oContainerEdit.getBounds());
        
        _oEditController = new CEditController(0 ,0, _oParentContainer);
        _oEditController.hide();
        
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _aParams = new Array();
    };
    
    this._onPressColliderScale = function(evt, iType)
    { 
        _oParent.startEventScale(evt);
    };
    
    this.startEventScale = function(evt){
        
        var oGraphicItem = _oSelectedItem.getGraphic();
        var fScale = _oSelectedItem.getScale();
        _pPressPoint = {x: evt.stageX, y: evt.stageY};
   
        _rStartingRect = new createjs.Rectangle(oGraphicItem.x - oGraphicItem.regX * fScale, oGraphicItem.y - oGraphicItem.regY * fScale,
                                                (oGraphicItem.regX * 2)* fScale, (oGraphicItem.regY * 2)* fScale);
        _oTmpRect = new createjs.Rectangle(0, 0, oGraphicItem.getBounds().width, oGraphicItem.getBounds().height);
        
        _iCurRot = oGraphicItem.rotation;

        this.triggerEvent(ON_PRESSDOWN_EDIT_SCALE);
    };
    
    this._onPressMoveColliderScale = function(evt, iType){
        
        var pCurPoint = {x: evt.stageX, y: evt.stageY};

        this.scaleCalculation(pCurPoint, iType);    
        this.triggerEvent(ON_PRESS_MOVE_EDIT_SCALE);
    };
    
    this.scaleCalculation = function(pCurPoint, iType)
    {
        var iDiffX = 0;
        var iDiffY = 0;
        
        if(_oContainerEdit.scaleX > 0){
            iDiffX = pCurPoint.x-_pPressPoint.x;
        }else{
            iDiffX = _pPressPoint.x - pCurPoint.x;
        }
        iDiffY = iDiffX;
        
        _oTmpRect.setValues(_rStartingRect.x-iDiffX, _rStartingRect.y-iDiffY,_rStartingRect.width+iDiffX ,_rStartingRect.height+iDiffY);

        var oScaleRange = ITEMS_PROPERTIES[_oSelectedItem.getType()].scale_range;
        
        var fProspScale = _oSelectedItem.prospectiveScale();
        
        var iMinScale = oScaleRange.min + fProspScale;
        var iMaxScale = oScaleRange.max + fProspScale;
        
        var pMaxItemDimension = _oSelectedItem.getMaxDimension();
        
        var fActualScale = (_oTmpRect.width / pMaxItemDimension.width) + fProspScale;
            
        if( fActualScale< iMinScale )
        {
            fActualScale = iMinScale;
        }else if (fActualScale > iMaxScale){
            fActualScale = iMaxScale;
        }
        
        var oItemGraphic = _oSelectedItem.getGraphic();
        
        _oSelectedItem.setScale(fActualScale - fProspScale);
        
        oItemGraphic.scaleX = oItemGraphic.scaleY = fActualScale ;
     
        var oNewRect = oItemGraphic.getTransformedBounds();  

        _oEditController.refreshDrawing(oNewRect.x,oNewRect.y,oNewRect.width,oNewRect.height);

        this.refreshCollidersAfterTransform(oNewRect);
    };

    this._onPressColliderRotate = function(evt)
    {
        _pPressPoint = {x:evt.stageX,y:evt.stageY};
        this.triggerEvent(ON_PRESSDOWN_EDIT_ROTATE);
        _iCurRot = _oSelectedItem.getGraphic().rotation;
        _iOffsetAngle = this.getAngle(evt);
    };
    
    this._onPressMoveColliderRotate = function(evt)
    {  
        var iAngle = _iCurRot + this.getAngle(evt) - _iOffsetAngle;
        
        _oSelectedItem.getGraphic().rotation = iAngle;
        
        var oNewRect = _oSelectedItem.getGraphic().getTransformedBounds();
        _oEditController.refreshDrawing(oNewRect.x,oNewRect.y,oNewRect.width,oNewRect.height);
        this.refreshCollidersAfterTransform(oNewRect);
    };
    
    this.getAngle = function(evt){
        var oGraphicItem = _oSelectedItem.getGraphic();
        
        var pGlobalPos = _oParentContainer.localToGlobal(oGraphicItem.x,oGraphicItem.y);
        
        var adj = evt.stageX - pGlobalPos.x;
        var opp = evt.stageY - pGlobalPos.y;

        var fRad = Math.atan2(opp, adj);
     
        var iAngle = fRad/(Math.PI / 180);
        return iAngle;
    };
    
    this._onReleaseColliderRotate = function()
    {
        _iCurRot = _oSelectedItem.getGraphic().rotation;
        this.triggerEvent(ON_PRESSUP_EDIT_ROTATE);
        var oNewRect = _oSelectedItem.getGraphic().getTransformedBounds();
        this.refreshCollidersAfterTransform(oNewRect);
    };

    this._onReleaseColliderScale = function(iType)
    {
        this.triggerEvent(ON_PRESSUP_EDIT_SCALE);
    };
    
    this.startRotate = function()
    {
        var oNewRect = _oSelectedItem.getGraphic().getTransformedBounds();

        _oEditController.refreshDrawing(oNewRect.x,oNewRect.y,oNewRect.width,oNewRect.height);
        
        this.refreshCollidersAfterTransform(oNewRect);
    };

    this.startScale = function()
    {  
        var oNewRect= _oSelectedItem.getGraphic().getTransformedBounds();
        
        _oEditController.refreshDrawing(oNewRect.x,oNewRect.y,oNewRect.width,oNewRect.height);
    
        this.refreshCollidersAfterTransform(oNewRect);
    };
    
    
    this.showCollidersScale = function()
    {
        _oColliderScale.setVisible(true);
        
        this.startScale();
    };
    
    this.hideCollidersScale = function()
    {     
        _oColliderScale.setVisible(false);

    };
    
    this.showCollidersRotate = function()
    {
        _oColliderRotate.setVisible(true);
        this.startRotate();
    };
    
    this.hideCollidersRotate = function()
    {
        _oColliderRotate.setVisible(false);
    };
    
    this.hideEditController = function ()
    {
        _oEditController.hide();
        _oContainerEdit.visible = false;
    };
    
    this.showEditController = function(oItem)
    {
        _oSelectedItem = oItem;
        var oNewRect = _oSelectedItem.getGraphic().getTransformedBounds();
       _oEditController.show(oNewRect.x,oNewRect.y,oNewRect.width,oNewRect.height);
       _oContainerEdit.visible = true;
    };
    
    this.refreshEditController = function()
    {
        var oNewRect = _oSelectedItem.getGraphic().getTransformedBounds();
        _oEditController.refreshDrawing(oNewRect.x,oNewRect.y,oNewRect.width,oNewRect.height);
        this.refreshCollidersAfterTransform(oNewRect);
        return oNewRect;
    };

    this.refreshCollidersAfterTransform = function(oRect)
    {
        _oColliderRotate.setPos(oRect.x, oRect.y + oRect.height);
        _oContainerEdit.x = oRect.x + oRect.width;
        _oContainerEdit.y = oRect.y;
        this.buttonsPositionOffset(oRect);
      
    };
    
    this.buttonsPositionOffset = function(oRect){

        var iYUpLimit = _oContainerEdit.y  -_oContainerEdit.regY;
        if(iYUpLimit < s_iOffsetY){
           _oContainerEdit.y+= s_iOffsetY - iYUpLimit;
        }
        
        var oRotateGraphic = _oColliderRotate.getGraphic();
        var iYDownLimit =  oRotateGraphic.y + 50;
        if(iYDownLimit > CANVAS_HEIGHT - s_iOffsetY){
            var iNewY  = oRotateGraphic.y +  (CANVAS_HEIGHT - s_iOffsetY) - iYDownLimit;
            _oColliderRotate.setPos(oRotateGraphic.x, iNewY);
        }
        
        if(oRect === undefined){
            return;
        }
        
        var oRightBounds = s_oInterface.getContainerRightBounds();
        var iXContainerEdit = _oContainerEdit.x ;
        var iXRightInterface = oRightBounds.x - oRightBounds.width*2;

        if(iXContainerEdit > iXRightInterface + 20){
          
            _oContainerEdit.scaleX = -_iScaleManipulatorFactor;
            if(_rContainerEditBounds.height*_oContainerEdit.scaleY > oRect.height){
                var oGraphic = _oColliderRotate.getGraphic();
                _oColliderRotate.setPos(
                                            oGraphic.x + _rContainerEditBounds.width,
                                            oGraphic.y
                                        );
            }
        }else if(iXContainerEdit < iXRightInterface - 20){
                _oContainerEdit.scaleX = _iScaleManipulatorFactor;
        }
        
        if(_oContainerEdit.scaleX < 0){
              _oContainerEdit.x = oRect.x;
        }
    };
    
    this.setVisibleButtonsDepth = function(bVal){
        _oButBackward.setVisible(bVal);
        _oButForward.setVisible(bVal);
    };
    
    this.getButForward = function(){
        return _oButForward;
    };
    
    this.getButBackward = function(){
        return _oButBackward;
    };
    
    this.getButScale = function(){
        return _oColliderScale;
    };
    
    this.getButRotation = function(){
        return _oColliderRotate;
    };
    
    this._onPressUpBackward = function ()
    {
        if(_aCbCompleted[ON_PRESS_BACKWARD]){
           _aCbCompleted[ON_PRESS_BACKWARD].call(_aCbOwner[ON_PRESS_BACKWARD]);
        }
    };

    this._onPressUpForward = function ()
    {
        if(_aCbCompleted[ON_PRESS_FORWARD]){
           _aCbCompleted[ON_PRESS_FORWARD].call(_aCbOwner[ON_PRESS_FORWARD]);
        }
    };

    this._onDelete = function ()
    {
        if(_aCbCompleted[ON_PRESS_DELETE]){
           _aCbCompleted[ON_PRESS_DELETE].call(_aCbOwner[ON_PRESS_DELETE]);
        }
    };
    
    this.unload = function(){
        _oButBackward.unload();
        _oButForward.unload();
        _oButDelete.unload();
        _oColliderRotate.unload();
        _oColliderScale.unload();
    };
    
    this.triggerEvent = function(iEvent)
    {
        if(_aCbCompleted[iEvent])
        {
            _aCbCompleted[iEvent].call(_aCbOwner[iEvent], _aParams[iEvent]);
        }      
    };
    
    this.addEventListener = function (iEvent, cbCompleted, cbOwner, aParams)
    {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams[iEvent] = aParams;
        
    };
    
    _oParent = this;
    this._init(oParentContainer);
 
}

//HELP SETTINGS
var TEXT = 0;
var IMAGE = 1;
var INFO = 2;
var FUNCTION = 3;
var CB_FUNCTION = 4;

var HELP_PAGES_INFO = [
                            [ // PAGE 1
                                [ //TEXTS
                                    {
                                        pos: {x: CANVAS_WIDTH/2, y: (CANVAS_HEIGHT/2) - 230},
                                        size: 48,
                                        text: TEXT_HELP_PAGE_1_WELCOME,
                                        outline: true,
                                        outline_size: 3,
                                        multiline: false,
                                        width: 450,
                                        height: 100,
                                        align: CENTER,
                                         line_height: 1.2
                                    },
                                    {
                                        pos: {x:  CANVAS_WIDTH/2 - 100, y: (CANVAS_HEIGHT/2) - 40},
                                        size: 40,
                                        text: TEXT_HELP_PAGE_1_INFO_DRAG,
                                        outline: true,
                                        outline_size: 3,
                                        multiline: true,
                                        width: 450,
                                        height: 150,
                                        align: LEFT,
                                        line_height: 1.2
                                    }
                                ],
                                [   //IMAGES

                                ],
                                {first_page:true, end_page: false}   
                            ],
                            [ // PAGE 2
                                [//TEXTS
                                    {
                                        pos: {x: CANVAS_WIDTH/2, y: (CANVAS_HEIGHT/2) - 230},
                                        size: 48,
                                        text: TEXT_HELP_PAGE_2_LEGEND,
                                        outline: true,
                                        outline_size: 3,
                                        multiline: false,
                                        width: 450,
                                        height: 100,
                                        align: CENTER,
                                        line_height: 1
                                    },
                                    {
                                        pos: {x: CANVAS_WIDTH/2 - 200, y: (CANVAS_HEIGHT/2) - 140},
                                        size: 30,
                                        text: TEXT_HELP_PAGE_2_HIDE_SHOW,
                                        outline: true,
                                        outline_size: 3,
                                        multiline: true,
                                        width: 580,
                                        height: 100,
                                        align: LEFT,
                                        line_height: 1.2
                                    },
                                    {
                                        pos: {x: CANVAS_WIDTH/2 - 200, y: CANVAS_HEIGHT/2 - 20},
                                        size: 30,
                                        text: TEXT_HELP_PAGE_2_UNDO,
                                        outline: true,
                                        outline_size: 3,
                                        multiline: true,
                                        width: 580,
                                        height: 100,
                                        align: LEFT,
                                        line_height: 1.2
                                    },
                                    {
                                        pos: {x: CANVAS_WIDTH/2 - 200, y: CANVAS_HEIGHT/2 + 115},
                                        size: 30,
                                        text: TEXT_HELP_PAGE_2_RESTART,
                                        outline: true,
                                        outline_size: 3,
                                        multiline: true,
                                        width: 580,
                                        height: 100,
                                        align: LEFT,
                                        line_height: 1.2
                                    }
                                ],
                                [//IMAGES
                                    {
                                        sprite: "but_help_hide_show",
                                        pos:{x: CANVAS_WIDTH/2 - 300, y: (CANVAS_HEIGHT/2) - 135}
                                    },
                                    {
                                        sprite: "but_undo",
                                        pos:{x: CANVAS_WIDTH/2 - 300, y: CANVAS_HEIGHT/2 - 15}
                                    },
                                    {
                                        sprite: "but_restart",
                                        pos:{x: CANVAS_WIDTH/2 - 300, y: CANVAS_HEIGHT/2 + 115}
                                    }
                                ],
                                {first_page:false, end_page: false}   
                            ],
                            [ // PAGE 3
                                [//TEXTS
                                    {
                                        pos: {x: CANVAS_WIDTH/2, y: (CANVAS_HEIGHT/2) - 230},
                                        size: 48,
                                        text: TEXT_HELP_PAGE_3_LEGEND,
                                        outline: true,
                                        outline_size: 3,
                                        multiline: false,
                                        width: 450,
                                        height: 100,
                                        align: CENTER,
                                        line_height: 1
                                    },
                                    {
                                        pos: {x: CANVAS_WIDTH/2 - 200, y: (CANVAS_HEIGHT/2) - 140},
                                        size: 30,
                                        text: TEXT_HELP_PAGE_3_DELETE,
                                        outline: true,
                                        outline_size: 3,
                                        multiline: true,
                                        width: 580,
                                        height: 100,
                                        align: LEFT,
                                        line_height: 1.2
                                    },
                                    {
                                        pos: {x: CANVAS_WIDTH/2 - 200, y: CANVAS_HEIGHT/2 - 15},
                                        size: 30,
                                        text: TEXT_HELP_PAGE_3_DEPTH_FORWARD,
                                        outline: true,
                                        outline_size: 3,
                                        multiline: true,
                                        width: 580,
                                        height: 100,
                                        align: LEFT,
                                        line_height: 1.2
                                    },
                                    {
                                        pos: {x: CANVAS_WIDTH/2 - 200, y: CANVAS_HEIGHT/2 + 115},
                                        size: 30,
                                        text: TEXT_HELP_PAGE_3_DEPTH_BACKWARD,
                                        outline: true,
                                        outline_size: 3,
                                        multiline: true,
                                        width: 580,
                                        height: 100,
                                        align: LEFT,
                                        line_height: 1.2
                                    }
                                ],
                                [//IMAGES
                                    {
                                        sprite: "but_delete_help",
                                        pos:{x: CANVAS_WIDTH/2 - 300, y: (CANVAS_HEIGHT/2) - 140}
                                    },
                                    {
                                        sprite: "but_forward_help",
                                        pos:{x: CANVAS_WIDTH/2 - 300, y: CANVAS_HEIGHT/2 - 10}
                                    },
                                    {
                                        sprite: "but_backward_help",
                                        pos:{x: CANVAS_WIDTH/2 - 300, y: CANVAS_HEIGHT/2 + 120}
                                    }
                                ],
                                {first_page:false, end_page: false}   
                            ],
                            [ // PAGE 4
                                [//TEXTS
                                    {
                                        pos: {x: CANVAS_WIDTH/2, y: (CANVAS_HEIGHT/2) - 230},
                                        size: 48,
                                        text: TEXT_HELP_PAGE_4_LEGEND,
                                        outline: true,
                                        outline_size: 3,
                                        multiline: false,
                                        width: 450,
                                        height: 100,
                                        align: CENTER,
                                        line_height: 1
                                    },
                                    {
                                        pos: {x: CANVAS_WIDTH/2 - 200, y: (CANVAS_HEIGHT/2) - 140},
                                        size: 30,
                                        text: TEXT_HELP_PAGE_4_SAVE_ROOM,
                                        outline: true,
                                        outline_size: 3,
                                        multiline: true,
                                        width: 550,
                                        height: 100,
                                        align: LEFT,
                                        line_height: 1.2
                                    },
                                    {
                                        pos: {x: CANVAS_WIDTH/2 - 200, y: CANVAS_HEIGHT/2 - 10},
                                        size: 30,
                                        text: TEXT_HELP_PAGE_4_SAVE_IMG,
                                        outline: true,
                                        outline_size: 3,
                                        multiline: true,
                                        width: 580,
                                        height: 100,
                                        align: LEFT,
                                        line_height: 1.2
                                    }
                                ],
                                [//IMAGES
                                    {
                                        sprite: "but_save",
                                        pos:{x: CANVAS_WIDTH/2 - 300, y: (CANVAS_HEIGHT/2) - 140}
                                    },
                                    {
                                        sprite: "but_save_image",
                                        pos:{x: CANVAS_WIDTH/2 - 300, y: CANVAS_HEIGHT/2 - 10}
                                    }
//                                    {
//                                        sprite: "but_stamp",
//                                        pos:{x: CANVAS_WIDTH/2 - 300, y: CANVAS_HEIGHT/2 + 120}
//                                    }
                                ],
                                {first_page:false, end_page: true}   
                            ]
                        ];

function CHelpPanel(){
    var _oFade;
    var _oButExit;
    var _oButYes;
    var _oContainer;
    var _oContainerPanel;
    var _oContainerPage;
    var _oContainerBars;
    var _oParent;
    var _oSelector;
    var _oArrowRight;
    var _oArrowLeft;
    var _oTweenPage;
    var _iPageID;
    
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams;

    this._init = function()
    {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0.01;
        _oFade.on("click",function(){});
        _oContainer.addChild(_oFade);
        
        _oContainerPanel = new createjs.Container();
        _oContainerPanel.y = CANVAS_HEIGHT;
        _oContainer.addChild(_oContainerPanel);

        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        var oPanel = createBitmap(oSprite);        
        oPanel.regX = oSprite.width/2;
        oPanel.regY = oSprite.height/2;
        oPanel.x = CANVAS_WIDTH/2;
        oPanel.y = CANVAS_HEIGHT/2;
        _oContainerPanel.addChild(oPanel);
        
        _oContainerPage = new createjs.Container();
        _oContainerPanel.addChild(_oContainerPage);
        
        var oSpriteArrowRight = s_oSpriteLibrary.getSprite("but_help_right");
        _oArrowRight = new CGfxButton(CANVAS_WIDTH/2 + oSprite.width/2 - oSpriteArrowRight.width/2 - 30, 
                                    CANVAS_HEIGHT/2 + oSprite.height/2 - oSpriteArrowRight.height/2 - 38,
                                    oSpriteArrowRight, _oContainerPanel);
        _oArrowRight.addEventListenerWithParams(ON_MOUSE_UP, this._onPressArrowRight, this);
        _oArrowRight.setVisible(false);
        
        var oSpriteArrowLeft = s_oSpriteLibrary.getSprite("but_help_left");
        _oArrowLeft = new CGfxButton(CANVAS_WIDTH/2 - oSprite.width/2 + oSpriteArrowLeft.width/2 + 30, 
                                    CANVAS_HEIGHT/2 + oSprite.height/2 - oSpriteArrowLeft.height/2 - 38,
                                    oSpriteArrowLeft, _oContainerPanel);
        
        _oArrowLeft.setVisible(false);
        
        var oSpriteBut = s_oSpriteLibrary.getSprite("but_yes"); 
        _oButYes = new CGfxButton(CANVAS_WIDTH/2 + oSprite.width/2 - oSpriteBut.width/2 - 30, 
                                    CANVAS_HEIGHT/2 + oSprite.height/2 - oSpriteBut.height/2 - 30,
                                    oSpriteBut, _oContainerPanel);
                                    
        _oButYes.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_YES);
        _oButYes.setVisible(false);
        _oButYes.pulseAnimation();
        
        var oSpriteBut = s_oSpriteLibrary.getSprite("but_exit"); 
        _oButExit = new CGfxButton(CANVAS_WIDTH/2 + oSprite.width/2 - oSpriteBut.width/2 - 30, 
                                    CANVAS_HEIGHT/2 - oSprite.height/2 + oSpriteBut.height/2 + 30,
                                    oSpriteBut, _oContainerPanel);
                                    
        _oButExit.addEventListenerWithParams(ON_MOUSE_UP, this.triggerEvent, this, ON_PRESS_YES);
        
        _oTweenPage = null;
        _iPageID = 0;
        if(AUTOMATIC_DRAG_TEMP_ITEM_TO_FIELD){
            HELP_PAGES_INFO[0][TEXT][1].text = TEXT_HELP_PAGE_1_INFO_CLICK;
        }
        
        HELP_PAGES_INFO[0][FUNCTION] = [this.createBarsAndItemPag1];
        HELP_PAGES_INFO[0][CB_FUNCTION] = function (){
                                                        _oContainerBars.removeAllChildren();
                                                      };
        this.createPage(HELP_PAGES_INFO[_iPageID], _oContainerPage);

        createjs.Tween.get(_oContainerPanel).to({y:0}, 1000,createjs.Ease.backOut);
        createjs.Tween.get(_oFade).to({alpha:0.7}, 500);
        
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _aParams = new Array();
    };
        
    this.createPage = function(aPage, oContainer){
        var aTexts = aPage[TEXT];
        var aImages = aPage[IMAGE];
        var aFunction = aPage[FUNCTION];
        var oCbFunction = aPage[CB_FUNCTION];
        var bFirstPage = aPage[INFO].first_page;
        var bEndPage = aPage[INFO].end_page;
        
        //CREATE PAGE TEXTS
        var aCreatedTexts = new Array();
        for(var i = 0; i < aTexts.length; i++){

            var oText = createGenericText(aTexts[i], oContainer);
            aCreatedTexts.push(oText);
        }
        
        //CREATE PAGE IMAGES
        var aCreatedImage = new Array();
        for(var i = 0; i < aImages.length; i++){
            var oImg = this.createImage(aImages[i], oContainer);
            aCreatedImage.push(oImg);
        }
        
        // CALL INNER FUNCTION
        if(aFunction !== undefined){
            for(var i = 0; i < aFunction.length; i++){
                aFunction[i].call(this);
            }
        }
        
        _oArrowLeft.setVisible(!bFirstPage);
        if(!bFirstPage){
           
            _oArrowLeft.addEventListenerWithParams(
                                                        ON_MOUSE_UP,
                                                        this._onPressArrowLeft,
                                                        this,
                                                        oCbFunction
                                                    );
   
        }
        
        _oArrowRight.setVisible(!bEndPage);
        if(!bEndPage){ 
            _oArrowRight.addEventListenerWithParams(
                                                        ON_MOUSE_UP,
                                                        this._onPressArrowRight,
                                                        this,
                                                        oCbFunction
                                                    );
            _oButYes.setVisible(false);
        }else{
            _oButYes.setVisible(true);
        }
    };
    
    this.createImage = function(oInfo, oContainer){
        var oSprite = s_oSpriteLibrary.getSprite(oInfo.sprite);
        var oItem = createBitmap(oSprite);

        oItem.x = oInfo.pos.x;
        oItem.y = oInfo.pos.y;
        oItem.regX = oSprite.width/2;
        oItem.regY = oSprite.height/2;
        oContainer.addChild(oItem);
        
        return oItem;
    };
    
    this._onPressArrowLeft = function(cbFunction){
        if(_oTweenPage !== null){
            return;
        }
        
        _iPageID--;
        this.goToPage(_iPageID, cbFunction);
    };
    
    this._onPressArrowRight = function(cbFunction){
        if(_oTweenPage !== null){
            return;
        }
        
        _iPageID++;
        this.goToPage(_iPageID, cbFunction);
       
    };
    
    this.goToPage = function(iNewPage, cbFunction){
        var iTotTimeAnim = 1000 * 0.5;
        _oTweenPage = createjs.Tween.get(_oContainerPage);
        _oTweenPage.to({alpha:0}, iTotTimeAnim, createjs.Ease.cubicIn);
        _oTweenPage.call(function(){
            _oContainerPage.removeAllChildren();
            this.createPage(HELP_PAGES_INFO[iNewPage], _oContainerPage);
            if(cbFunction !== undefined){
                cbFunction.call(this);
            }
            var oTween = createjs.Tween.get(_oContainerPage);
            oTween.to({alpha:1}, iTotTimeAnim, createjs.Ease.cubicOut).call(function(){
                _oContainerPage.removeAllEventListeners();
                createjs.Tween.removeTweens(_oContainerPage);
                _oTweenPage = null;           
            });
        }, null, this);
    };
    
    this.createBarsAndItemPag1 = function()
    {
        _oContainerBars = new createjs.Container();
        _oContainerPage.addChild(_oContainerBars);
        
        var oSelectionBar;
        var oItemBar;
        
         var oContainerItemPoolBar = new createjs.Container();
        _oContainerBars.addChild(oContainerItemPoolBar);
        _oContainerBars.x = 0;
         
        var oSpriteBar = s_oSpriteLibrary.getSprite("item_pool_bar");
        oItemBar = createBitmap(oSpriteBar);
        oItemBar.x = CANVAS_WIDTH/2 - 700;
        oItemBar.y = CANVAS_HEIGHT/2  + 25;
        oItemBar.regX = oSpriteBar.width / 2;
        oItemBar.regY = oSpriteBar.height / 2;
        oContainerItemPoolBar.addChild(oItemBar);
        
        oSpriteBar = s_oSpriteLibrary.getSprite("item_selection_bar");
        oSelectionBar = createBitmap(oSpriteBar);
        oSelectionBar.x = oItemBar.x;
        oSelectionBar.y = CANVAS_HEIGHT/2 - 100;
        oSelectionBar.regX = oSpriteBar.width / 2;
        oSelectionBar.regY = oSpriteBar.height / 2;
        _oContainerBars.addChild(oSelectionBar);
        
        var iXStartPos = 540;
        var iLast;
        var aType = [STICKERS, TOY];
        
        for(var i = 0; i < aType.length; i++)
        {
            var iType = aType[i];
            var szItem = ITEMS_SETTINGS[iType].name;
            var fScale = 1;
            var oSprite =  s_oSpriteLibrary.getSprite("thumb_" + szItem + "_" + 0);
            var oSelItem = createBitmap(oSprite);
            oSelItem.regX = oSprite.width / 2;
            oSelItem.regY = oSprite.height / 2;
            oSelItem.scaleX = fScale;
            oSelItem.scaleY = fScale;
            oSelItem.x = iXStartPos;
            oSelItem.y = 440;
            iXStartPos += oSelItem.regX * fScale + OFFSET_ITEM_SPACE_X;
            _oContainerBars.addChild(oSelItem);

            iLast = i;
        }
   
        iXStartPos = 540;
        var iType = aType[1];
        for(var i = 0; i < 2; i++)
        {
            var oSprite =  s_oSpriteLibrary.getSprite("thumb_" + szItem + "_" + i);
            var fScale = 1;
            var oDragItem = createBitmap(oSprite);
            oDragItem.regX = oSprite.width / 2;
            oDragItem.regY = oSprite.height / 2;
            oDragItem.scaleX = fScale;
            oDragItem.scaleY = fScale;
           
            oDragItem.x = iXStartPos;
            oDragItem.y = 560;
            iXStartPos += oSelItem.regX * fScale + OFFSET_ITEM_SPACE_X;
            oContainerItemPoolBar.addChild(oDragItem);
        }
        
        var oMask = new createjs.Shape();
        oMask.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(CANVAS_WIDTH/2 - 486, 0, 1000, 802);
        //_oContainerBars.addChild(oMask);
        _oContainerBars.mask = oMask;
        
        var oSpriteSelector = s_oSpriteLibrary.getSprite("item_selector");
        _oSelector = new CSelector(oSpriteSelector, _oContainerBars);
        
        var oSprite = s_oSpriteLibrary.getSprite("hand");
        var oHand = createBitmap(oSprite);
        oHand.regX = oSprite.width/2;
        oHand.regY = 18;
        oHand.x = oSelItem.x;
        oHand.y = oSelItem.y;
        oHand.scaleX = oHand.scaleY = 1;
        _oContainerBars.addChild(oHand);
        
        var pStartPos = {x:oDragItem.x, y:oDragItem.y};
        this.animationPag1(oSelItem, oContainerItemPoolBar, oDragItem, oHand, 1000, pStartPos, fScale);
    };

    this.animationPag1 = function(oSelItem, oContainerItemPoolBar, oDragItem, oHand, iWait, pStartPosDragged, fStartScale)
    {
        oDragItem.x = pStartPosDragged.x;
        oDragItem.y = pStartPosDragged.y;
        oDragItem.scaleX = oDragItem.scaleY = fStartScale;
        oContainerItemPoolBar.y = -119;
       
        var oTween = createjs.Tween.get(oHand, {loop:-1}).wait(iWait);
        oTween.to({scaleX: 0.8, scaleY: 0.8}, 250);
        oTween.call(function() // SELECT ITEM
        {
            oTween.paused = true;
            _oSelector.show({x:oSelItem.x, y:oSelItem.y});
            createjs.Tween.get(oHand).to({scaleX: 1, scaleY: 1}, 250);
            createjs.Tween.get(oContainerItemPoolBar).to({y:0}, 250).call(function(){
                createjs.Tween.get(oHand).wait(100).to({x: oDragItem.x, y: oDragItem.y}, 250).call(function(){
                    createjs.Tween.get(oHand).to({scaleX: 0.8, scaleY: 0.8}, 250).call(function(){ // CLICK DRAG ITEM 
                        if(!AUTOMATIC_DRAG_TEMP_ITEM_TO_FIELD){
                            createjs.Tween.get(oHand).to({x: CANVAS_WIDTH/2, y: CANVAS_HEIGHT/2 + 160}, 250);
                        }else{
                            createjs.Tween.get(oHand).to({scaleX: 1, scaleY: 1}, 200);
                        }
                        createjs.Tween.get(oDragItem).to({x: CANVAS_WIDTH/2, y: CANVAS_HEIGHT/2 + 160}, 250).call(function(){
                            createjs.Tween.get(oHand).to({scaleX: 1, scaleY: 1}, 250).call(function(){
                                createjs.Tween.get(oHand).to({x: oSelItem.x, y: oSelItem.y}, 500);
                                createjs.Tween.get(oDragItem).wait(400).to({scaleX: 0, scaleY: 0}, 300).call(function(){
                                    _oSelector.hide();
                                    createjs.Tween.get(oContainerItemPoolBar).to({y: -119}, 250).call(function(){
                                        oDragItem.x = pStartPosDragged.x;
                                        oDragItem.y = pStartPosDragged.y;
                                        oDragItem.scaleX = oDragItem.scaleY = fStartScale;
                                        oContainerItemPoolBar.y = -119;
                                        iWait = 150;
                                        oTween.paused = false;
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    
    this.hide = function()
    {
       var oParent = this;
       createjs.Tween.get(_oContainerPanel).to({y:CANVAS_HEIGHT}, 1000,createjs.Ease.backOut).call(function(){
           oParent.unload();
       });
       createjs.Tween.get(_oFade).to({alpha:0.0}, 500);  
     };
   
    this.unload = function()
    {
        _oFade.removeAllEventListeners();
        _oContainerBars.removeAllEventListeners();
        _oButExit.unload();
        _oArrowLeft.unload();
        _oArrowRight.unload();
       
        s_oStage.removeChild(_oContainer);
    };
    
    this.triggerEvent = function(iEvent)
    {
        if(_aCbCompleted[iEvent])
        {
            _aCbCompleted[iEvent].call(_aCbOwner[iEvent], _aParams[iEvent]);
        }      
    };
  
    this.addEventListener = function (iEvent, cbCompleted, cbOwner, aParams)
    {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams[iEvent] = aParams;
    };
    
    _oParent=this;
    this._init();

}


function CSelector(oSprite, oParentContainer)
{
    var _oParentContainer;
    var _oSelector;
    
    this._init = function (oSprite, oParentContainer)
    {
        _oParentContainer = oParentContainer;
        _oSelector = createBitmap(oSprite);
        _oSelector.regX = oSprite.width / 2;
        _oSelector.regY = oSprite.height / 2;
        _oSelector.visible = false;
        _oSelector.alpha = 0.0;
        _oParentContainer.addChild(_oSelector);  
    };    
    
    this.show = function(pPos)
    { 
        pPos.x +=  OFFSET_POS_SELECTOR.x;
        pPos.y +=  OFFSET_POS_SELECTOR.y;
        
        if(!_oSelector.visible)
        {
            _oSelector.visible = true;
            _oSelector.x = pPos.x  ;
            _oSelector.y = pPos.y ;
            createjs.Tween.get(_oSelector).to({alpha: 1}, 300, createjs.Ease.cubicOut);
        }else{
            createjs.Tween.get(_oSelector).to({x: pPos.x, y: pPos.y}, 300, createjs.Ease.cubicOut);        
        }
    };
    
    this.hide = function()
    {
        createjs.Tween.get(_oSelector, {override:true}).to({alpha: 0}, 300, createjs.Ease.cubicOut).call(function(){
            _oSelector.visible = false;
        });
    };

    
    this._init(oSprite, oParentContainer);
}

function CStaticItem (oParentContainer, oData, iID, iVariant)
{
    this._oItem;
    this._iLimitedAreaType;
    this._szName; 
    
    CItem.call(this);
   
    this._init(oParentContainer, oData, iID, iVariant);
}

CStaticItem.prototype = Object.create(CItem.prototype);

CStaticItem.prototype._init = function(oParentContainer, oData, iID, iVariant){
    this._oParentContainer = oParentContainer;
    
    this._oContainer = new createjs.Container();

    var oProperty = oData.property;
    this._iAreaLimit = oProperty.type;
    this._szName = oData.name;
    
    this.substituteNewVariant(iVariant);
    var oSprite = s_oSpriteLibrary.getSprite(this._szName + "_" + this._iVariant);
    
    switch (oProperty.reg_point){
        case REG_LEFT_UP:
                this._oContainer.regX = 0;
                this._oContainer.regY = 0;
            break;
        case REG_CENTER:
                this._oContainer.regX = oSprite.width/2;
                this._oContainer.regY = oSprite.height/2;
            break;
        case REG_LEFT_DOWN:
                this._oContainer.regX = 0;
                this._oContainer.regY = oSprite.height;
            break;
        case REG_CENTER_UP:
                this._oContainer.regX = oSprite.width/2;
           break;
    }
    this._oContainer.x = oProperty.position.x;

    this._oContainer.y = oProperty.position.y;
    this._iType = oProperty.id;
    
    this._iID = iID;
    this._iLimitedAreaType = oProperty.limited_area;

    this._oContainer.visible = oProperty.visible;

    this._oParentContainer.addChild(this._oContainer);

    this._pMaxDimension = {width: oSprite.width, height: oSprite.height};
    
    this._aCbCompleted = new Array();
    this._aCbOwner = new Array();
    this._aParams = new Array();
    this._aListeners = new Array();
};


CStaticItem.prototype.substituteNewVariant = function(iVariant){
    this._oContainer.removeChild(this._oItem);
    
    this._iVariant = iVariant;
    var oSprite = s_oSpriteLibrary.getSprite(this._szName + "_" + this._iVariant);
    this._oItem = createBitmap(oSprite);
    
    this._oContainer.addChildAt(this._oItem, 0);  
};


CStaticItem.prototype.getBounds = function(){
    return this._oContainer.getBounds();
};

function CDinamicItem(oParentContainer, oData, iID, iType, iVariant){

    this._iProspectiveScaleY;
    this._oShape;
    
    CItem.call(this);

    this._init(oParentContainer, oData, iID, iType, iVariant);
}

CDinamicItem.prototype = Object.create(CItem.prototype);

CDinamicItem.prototype._init = function(oParentContainer, oData, iID, iType, iVariant){
    this._oParentContainer = oParentContainer;
    
    this._oContainer = new createjs.Container();
    this._oParentContainer.addChild(this._oContainer);
    
    this._iVariant = iVariant;
    var oProperty = oData.property;
    
    this._iAreaLimit = oProperty.type;
    
    var oSprite = s_oSpriteLibrary.getSprite(oData.name + "_" + this._iVariant);
    this._oItem = createBitmap(oSprite);
    this._oContainer.regX = oSprite.width/2;
    this._oContainer.regY = oSprite.height/2;
    this._oContainer.addChild(this._oItem);
    this._bTemp = false;
   
    this._iType = iType;
    this._iID = iID;
    this._fDraggedScale = oProperty.start_scale_dragged;

    this._pLimitAreaOffset = oProperty.limit_area_offset;
    this._iProspectiveScaleY = null;

    this._pMaxDimension = {width: oSprite.width, height: oSprite.height};
    
    this._rRect = new createjs.Rectangle();
    
    this._oShape = new createjs.Shape();
    
    s_oStage.addChild(this._oShape);
    
};

CDinamicItem.prototype.getLimitAreaOffset = function(){
    if(this._iAreaLimit === FREE_ITEMS){
        return null;
    }
    var aNormalizedPoints = new Array;
    for(var i = 0; i < this._pLimitAreaOffset.length; i++){
        var pPoint =  this._pLimitAreaOffset[i];
        var pNormalizedPoints = {x: pPoint.x * this._oContainer.scaleX, y: pPoint.y * this._oContainer.scaleY};
        aNormalizedPoints.push(pNormalizedPoints);
    }
    return aNormalizedPoints;
};

CDinamicItem.prototype.prospectiveScale = function(){
    
    var pWallLeft = {A: LIMITED_AREA_POINTS[1].points[4], B: LIMITED_AREA_POINTS[1].points[3]};
    var pWallRight =  {A: LIMITED_AREA_POINTS[1].points[3], B: LIMITED_AREA_POINTS[1].points[2]};
    
    var iX  = this._oContainer.x;
    var fFactY = (this._pMaxDimension.height  * 0.5) * this._oContainer.scaleX;
    var iY = this._oContainer.y + fFactY;

    var iOnWallLeft = 1;
    var iOnWallRight = 1;
    if(iX < pWallLeft.B.x){
        iOnWallLeft = Math.sign( // DETECT STRAIGHT SIDE OF A POINT
                                      (pWallLeft.B.x - pWallLeft.A.x) * (iY - pWallLeft.A.y)
                                      - (pWallLeft.B.y - pWallLeft.A.y) * (iX - pWallLeft.A.x)
                                    );
      
    }else{
         iOnWallRight = Math.sign(
                                    (pWallRight.B.x - pWallRight.A.x) * (iY - pWallRight.A.y)
                                    - (pWallRight.B.y - pWallRight.A.y) * (iX - pWallRight.A.x)
                                );
    
    }
    
    var oIntersection = {x: iX, y: iY};
    
    if(iOnWallRight === -1 || iOnWallLeft === -1){ // INTERSECT TO STRAIGHT WALL FOR GREAT PROSPECTIVE ILLUSION
        var aToIntersect = [pWallRight.A, pWallRight.B];

        if(iX < pWallLeft.B.x){ 
            aToIntersect = [pWallLeft.A, pWallLeft.B];
        }

        var aItem = [{x: iX, y: iY}, {x: pWallLeft.B.x, y: CANVAS_HEIGHT }];

        oIntersection = checkLineIntersection(aToIntersect, aItem);
    }
   
    this._iProspectiveScaleY = linearFunction(
                                                oIntersection.y,
                                                PROSPECTIVE_PROPERTY.min , PROSPECTIVE_PROPERTY.max ,
                                                PROSPECTIVE_PROPERTY.intensity_y, 0        
                                            );

                            
    var iX = Math.abs(oIntersection.x - pWallLeft.B.x);
    
    var iProspScaleX = linearFunction(
                                        iX,
                                        0, pWallLeft.B.x,
                                        0, PROSPECTIVE_PROPERTY.intensity_x
            
                                     );
    var iProspScale  =  this._iProspectiveScaleY + iProspScaleX;                         
    if(iProspScale < PROSPECTIVE_PROPERTY.intensity_y){
        iProspScale = PROSPECTIVE_PROPERTY.intensity_y;
    }
    return iProspScale;
};

CDinamicItem.prototype.refreshRect = function(){
    var pDim = this.getNormalizedDimension();
    
    var iWidth = pDim.width*0.5 ;
    var iHeight = pDim.height*0.5;
    this._rRect.x = this._oContainer.x -iWidth;
    this._rRect.y = this._oContainer.y -iHeight;
    this._rRect.width = pDim.width;
    this._rRect.height = pDim.height;
    
    if(SHOW_ITEM_OFFSETS_POINTS){
        this._oShape.graphics.clear();
        this._oShape.graphics.beginFill("rgba(255,0,0,0.5").drawRect(
                                                                        this._rRect.x,
                                                                        this._rRect.y,
                                                                        this._rRect.width,
                                                                        this._rRect.height
                                                                     );
    }
    
};

CDinamicItem.prototype.getRect = function(){
    return this._rRect;
};

CDinamicItem.prototype.showDebugOffsetsPoints = function(){
    if(!SHOW_ITEM_OFFSETS_POINTS){
       return;
    }  
   
    for (var i = 0; i < this._aBounds.length; i++){
        this._aBounds[i].x += this._oContainer.regX ;
        this._aBounds[i].y += this._oContainer.regY ;
       createGraphicCircle(this._aBounds[i], 10, null, this._oContainer, "rgba(0,0,0,0.5)");
    }
};

CDinamicItem.prototype.animMovement = function(pPos, oCbEnd, oCbChange, iTime){
    
    var iAnimTime = iTime === undefined ? 300 : iTime;
    var oTween = createjs.Tween.get(this._oContainer);
    oTween.to({x: pPos.x, y: pPos.y}, iAnimTime, createjs.Ease.cubicIn);
    if(oCbEnd !== undefined && oCbEnd!== null){
        oTween.on("complete", function(){
            oCbEnd.cb.call(oCbEnd.scope, oCbEnd.param);
            oTween.removeAllEventListeners();
        });
    }
    if(oCbChange !== undefined){
        oTween.on("change", function(){
            oCbChange.cb.call(oCbChange.scope, oCbChange.param);
            var fScale = this.getScale();

            fScale += this.prospectiveScale();
            this._oContainer.scaleX = this._oContainer.scaleY = fScale;
        },this);
    }
    
};

function CCreditsPanel(){
    var _oListener;
    var _oHitArea;
    var _oFade;
    var _oPanelContainer;
    var _oButExit;
    var _oLogo;
    
    var _pStartPanelPos;
    
    this._init = function(){
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0;
        _oFade.on("mousedown",function(){});
        s_oStage.addChild(_oFade);
        
        new createjs.Tween.get(_oFade).to({alpha:0.7},500);
        
        _oPanelContainer = new createjs.Container();        
        s_oStage.addChild(_oPanelContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('bg_help');
        var oPanel = createBitmap(oSprite);        
        oPanel.x = 0;
        oPanel.y = 0;
        oPanel.regX = oSprite.width/2;
        oPanel.regY = oSprite.height/2;
        _oPanelContainer.addChild(oPanel);
        
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = CANVAS_HEIGHT + oSprite.height/2;  
        _pStartPanelPos = {x: _oPanelContainer.x, y: _oPanelContainer.y};
        new createjs.Tween.get(_oPanelContainer).to({y:CANVAS_HEIGHT/2},500, createjs.Ease.quartIn);
        
        var iWidth = oSprite.width;
        var iHeight = 42;
        var iX = 0;
        var iY = -90;
        var oTitleOutline = new CTLText(_oPanelContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    48, "center", FONT_STROKE, PRIMARY_FONT, 1,
                    2, 2,
                    TEXT_DEVELOPED,
                    true, true, false,
                    false );
        oTitleOutline.setOutline(FONT_OUTLINE);
        var oTitle = new CTLText(_oPanelContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    48, "center", FONT_COLOR, PRIMARY_FONT, 1,
                    2, 2,
                    TEXT_DEVELOPED,
                    true, true, false,
                    false );

        var iY = 90;
        var oLinkOutline = new CTLText(_oPanelContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    40, "center", FONT_STROKE, PRIMARY_FONT, 1,
                    2, 2,
                    "codethislab",
                    true, true, false,
                    false );
        oLinkOutline.setOutline(FONT_OUTLINE);
        var oLink = new CTLText(_oPanelContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    40, "center", FONT_COLOR, PRIMARY_FONT, 1,
                    2, 2,
                    "codethislab",
                    true, true, false,
                    false );

        var oSprite = s_oSpriteLibrary.getSprite('ctl_logo');
        _oLogo = createBitmap(oSprite);
        _oLogo.on("click", this._onLogoButRelease);
        _oLogo.regX = oSprite.width/2;
        _oLogo.regY = oSprite.height/2;
        _oLogo.y = 0;
        _oPanelContainer.addChild(_oLogo);
      
        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("#0f0f0f").drawRect(-CANVAS_WIDTH/2, -CANVAS_HEIGHT/2, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.alpha = 0.01;
        _oListener = _oHitArea.on("click", this._onLogoButRelease);
        _oPanelContainer.addChild(_oHitArea);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _oButExit = new CGfxButton(oPanel.x + oPanel.regX - oSprite.width/2 - 20,
                                  oPanel.y - oPanel.regY + oSprite.height/2 + 20, oSprite, _oPanelContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);
    };
    
    this.unload = function(){
        _oHitArea.off("click", _oListener);

        _oButExit.block();
        
        new createjs.Tween.get(_oFade).to({alpha:0},500);
        new createjs.Tween.get(_oPanelContainer).to({y:_pStartPanelPos.y},400, createjs.Ease.backIn).call(function(){
            s_oStage.removeChild(_oFade);
            s_oStage.removeChild(_oPanelContainer);

            _oButExit.unload();
        }); 
        
        _oFade.removeAllEventListeners();
        _oLogo.removeAllEventListeners();     
    };
    
    this._onLogoButRelease = function(){
        
    };
    
    this._init();
    
    
};




var MS_FADE_ANIMATION_TIME = 500;
var MS_WAIT_FADE_ANIMATION_TIME = 700;
var ON_EFFECT_TEXT_END = 0; 

function CEffectText (szText, iSize, bStrobe, iStrobeSet, oParentContainer){
    var _oParentContainer;
    var _oContainer;
    var _oText;
    var _oFade;
    var _oOutlineText;
    var _iStepStrobe;
    
    var _aCbCompleted;
    var _aCbOwner;
    
    this._init = function(szText, iSize, bStrobe, iStrobeSet, oParentContainer){
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        
        _oParentContainer = oParentContainer;
        _oParentContainer.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = 0.75;
        _oContainer.addChild(_oFade);
        _oFade.on("click", function(){});
            
        _iStepStrobe = 0;
        
        var iWidth = 600;
        var iHeight = 120;
        var iX = CANVAS_WIDTH/2;
        var iY = CANVAS_HEIGHT/2;
        _oOutlineText = new CTLText(_oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    iSize, "center", FONT_STROKE, PRIMARY_FONT, 1,
                    2, 2,
                    szText,
                    true, true, false,
                    false );
        _oOutlineText.setOutline(5);
        _oText = new CTLText(_oContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    iSize, "center", FONT_COLOR, PRIMARY_FONT, 1,
                    2, 2,
                    szText,
                    true, true, false,
                    false );
        
        _oContainer.alpha = 0;
        
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
    };
    
    this.startAnimation = function()
    {  
        _oContainer.visible = true;
        var oParent = this;

        var iStepTime = MS_FADE_ANIMATION_TIME;
        var oTween =  createjs.Tween.get(_oContainer);
        oTween.to({alpha:1}, iStepTime, createjs.Ease.cubicOut);
        oTween.wait(MS_WAIT_FADE_ANIMATION_TIME)
        oTween.call(function(){
            var oInTween = createjs.Tween.get(_oContainer);
            oInTween.to({alpha:0}, iStepTime, createjs.Ease.cubicIn);
            oInTween.call(function(){ 
                oParent.triggerEvent(ON_EFFECT_TEXT_END);
            }); 
        });  
    };
    
    this.strobeText = function (oStrobeSet) {
        createjs.Tween.get(_oText.getText(), {loop:-1}).wait(30).call(function () {
            if (_iStepStrobe < oStrobeSet.length - 1) {
                _iStepStrobe++;
            } else {
                _iStepStrobe = 0;
            }
            _oText.setColor(oStrobeSet[_iStepStrobe]);
        });
    };
    
    this.triggerEvent = function(iEvent)
    {
        if(_aCbCompleted[iEvent])
        {
            _aCbCompleted[iEvent].call(_aCbOwner[iEvent]);
        }      
    };
  
    this.addEventListener = function (iEvent, cbCompleted, cbOwner)
    {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
    };
	
    this.unload = function()
    {
        _oText.removeTweens();
        createjs.Tween.removeTweens(_oContainer);
        _oFade.removeAllEventListeners();
        s_oStage.removeChild(_oContainer);
    };
	
    this._init(szText, iSize, bStrobe, iStrobeSet, oParentContainer);
}

function CController ()
{
    var _oParent;
    
    var _bInput;
    
    var _aKeyDown;
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams;

    this._init = function(){
        _bInput = true;

        _aKeyDown = new Array();
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _aParams = new Array();
        
        if (!s_bMobile ) {
            document.onkeydown = onKeyDown;
            document.onkeyup = onKeyUp;
        }
    };
    
    this.setInput = function(bInput){
        _bInput = bInput;
    };
    
    function onKeyDown (evt){
        if (!evt) 
        {
            evt = window.event;
        }
        evt.preventDefault();
    
        if (!_bInput || _aKeyDown[evt.keyCode]){ 
            return;
        }
        
        var iEvent = null;
        switch (evt.keyCode) 
         {
            case 46:
                iEvent = ON_PRESS_DOWN_KEY_DEL;
                break;
 
        }
        _aKeyDown[evt.keyCode] = true;
        _oParent.triggerEvent(evt, iEvent);
    }
    
    function onKeyUp (evt){
        if (!evt) 
        {
            evt = window.event;
        }
        evt.preventDefault();
        
        _aKeyDown[evt.keyCode] = false;

    };
   
    this.unload = function(){
        if (!s_bMobile ) {
            document.onkeydown = null;
            document.onkeyup = null;
        }
    };

    this.triggerEvent = function(oEvt, iEvent){
        if(_aCbCompleted[iEvent])
        {
            _aCbCompleted[iEvent].call(_aCbOwner[iEvent], _aParams[iEvent]);
        }
        
    };
  
    this.addEventListener = function (iEvent, cbCompleted, cbOwner, aParams){
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams[iEvent] = aParams;
        
    };
    
    _oParent = this;
    this._init();
    
}


function CThumbItem (oParentContainer, oData, iType, iVariant, iID){
    var _oParentContainer;
    var _oThumb;
    var _iType;
    var _iVariant;
    var _iID;
    var _bBlockInput;
    
    var _aCbCompleted = new Array();
    var _aCbOwner = new Array();
    var _aParams = new Array();
    var _aListeners = new Array();

   this._init = function(oParentContainer, oData, iType, iVariant, iID){
       _oParentContainer = oParentContainer;
       
        var oSprite = s_oSpriteLibrary.getSprite("thumb_" + oData.name + "_" + iVariant);
       
       _oThumb = createBitmap(oSprite);
       
       _oThumb.regX = oSprite.width/2;
       _oThumb.regY = oSprite.height/2;
       
       _oParentContainer.addChild(_oThumb);
       
       _bBlockInput = false;
       
       _iType = iType;
       _iVariant = iVariant;
       _iID = iID;
    };
   
    this.setPos = function(iXPos, iYPos){
        _oThumb.x = iXPos;
        _oThumb.y = iYPos;
    };

    this.getPos = function(){
        return {x: _oThumb.x, y: _oThumb.y};
    };
    
    this.getID = function(){
        return _iID;
    };
    
    this.getVariant = function(){
        return _iVariant;
    };
    
    this.getType = function(){
        return _iType;
    };
    
    this.getGraphic = function(){
        return _oThumb;
    };
    
    this.getScaleX = function(){
        return _oThumb.scaleX;
    };
    
    this.setVisible = function(bVal){
        _oThumb.visible = bVal;
    };
    
    this.getGlobalPosItem = function(){
        return _oParentContainer.localToGlobal(_oThumb.x, _oThumb.y);
    };
    
    this.setBlockInput = function(bVal){
        _bBlockInput = bVal;
    };
   
    this.unload = function(){
        _oThumb.removeAllEventListeners();  
        _oThumb.parent.removeChild(_oThumb);

        _oThumb = null;
    };
    
   this.triggerEvent = function(oEvt, iEvent){     
        if(_aCbCompleted[iEvent] && !_bBlockInput)
        {
            _aCbCompleted[iEvent].call(_aCbOwner[iEvent], _aParams[iEvent], oEvt);
        }      
    };

   this.addEventListener = function (szEvt, iEvent, cbCompleted, cbOwner, aParams){

        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams[iEvent] = aParams;
        _aListeners[iEvent] = _oThumb.on(szEvt, this.triggerEvent, this, false, iEvent);

    };

   this.removeEventListener = function (szEvt, iEvent){
        _aCbCompleted[iEvent] = null;
        _aCbOwner[iEvent] = null;
        _aParams[iEvent] = null;
        _oThumb.off(szEvt, _aListeners[iEvent]);
        _aListeners[iEvent] = null;
    };
    
    this._init(oParentContainer, oData, iType, iVariant, iID);
}

var INTERACTIVE_ALPHA_FADE = 0.5;
function CInteractiveHelp(oParentContainer){
    var _oParentContainer;
    var _oContainer;
    var _oFade;
    var _bInExe;
    var _iTutorial;
    
    var _aInteractiveHelp;
    var _aQueue;
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams;
    
    this._init = function(oParentContainer){
        _oParentContainer = oParentContainer;
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        _oFade.alpha = INTERACTIVE_ALPHA_FADE;
        _oContainer.addChild(_oFade);
        _oContainer.alpha = 0.0;
        
        _aInteractiveHelp = new Array();
        
        _aInteractiveHelp[DEPTH_TUTORIAL] = true;
        _aInteractiveHelp[SCALE_TUTORIAL] = true;
        _aInteractiveHelp[ROTATION_TUTORIAL] = true;
        _aInteractiveHelp[OPTIONAL_TUTORIAL] = true;
        
        _bInExe = false;
        
        _aQueue = new Array();
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _aParams = new Array();
    };
    
    this.startTutorial = function(oInfo){
        var iTutorial = oInfo.tutorial;
      
        if(!_aInteractiveHelp[iTutorial]){
            return;
        }
        
        if(_bInExe){
            _aQueue.push({info: oInfo.info, tutorial: iTutorial});
            return;
        }
        
        var fAlpha = INTERACTIVE_ALPHA_FADE;
        var oFuncToCall;
        switch (iTutorial){
            case DEPTH_TUTORIAL:
                oFuncToCall = this.depthTutorial;
                break;
            case SCALE_TUTORIAL:
                oFuncToCall = this.scaleTutorial;
                break;
            case ROTATION_TUTORIAL:
                oFuncToCall = this.rotationTutorial;
                break;
            case OPTIONAL_TUTORIAL:
                oFuncToCall = this.optionalTutorial;
                 fAlpha = 0.01;
                break;
        }
        var oTween = createjs.Tween.get(_oContainer, {override: true}); 
        oTween.to({alpha:1}, 500, createjs.Ease.cubicOut);
        
        createjs.Tween.get(_oFade, {override:true})
                .to({alpha: fAlpha}, 500, createjs.Ease.cubicIn);
        var oOnEnd = {
                cb: oFuncToCall,
                scope: this,
                param: oInfo.info
            };
   
        _iTutorial = iTutorial;
        _aInteractiveHelp[iTutorial] = false;
        _bInExe = true;
        if(oInfo.info.movement){
            oInfo.info.item.animMovement(oInfo.info.pos, oOnEnd, oInfo.info.cb_movement);
        }else{
            oOnEnd.cb.call(oOnEnd.scope, oOnEnd.param);
        }
    };
    
    this.depthTutorial = function(oInfo){
        var oButForward = oInfo.but_forward;
        var oButBackward = oInfo.but_backward;
        
        var iTime = 500;
        
        var oGraphicButtonForward = oButForward.getButton();
        var oGraphicButtonBackward = oButBackward.getButton();
        var oParentContainerButtons = oGraphicButtonForward.parent;
        
        var oContainer = new createjs.Container();
        _oContainer.addChild(oContainer);
        
        var oContainerButtons = new createjs.Container();
        oContainer.addChild(oContainerButtons);
        oContainerButtons.regX = oParentContainerButtons.regX;
        oContainerButtons.regY = oParentContainerButtons.regY;
        oContainerButtons.x = oParentContainerButtons.x;
        oContainerButtons.y = oParentContainerButtons.y;
        oContainerButtons.scaleX = oParentContainerButtons.scaleX;
        oContainerButtons.scaleY = oParentContainerButtons.scaleY;
      
        var oButBack = createBitmap(s_oSpriteLibrary.getSprite("but_backward"));
        oButBack.x = oGraphicButtonBackward.x;
        oButBack.y = oGraphicButtonBackward.y;
        oButBack.regX = oGraphicButtonBackward.regX;
        oButBack.regY = oGraphicButtonBackward.regY;
        var oButFor = createBitmap(s_oSpriteLibrary.getSprite("but_forward"));
        oButFor.x = oGraphicButtonForward.x;
        oButFor.y = oGraphicButtonForward.y;
        oButFor.regX = oGraphicButtonForward.regX;
        oButFor.regY = oGraphicButtonForward.regY;
        
        oContainerButtons.addChild(oButBack, oButFor);

        var oTween = createjs.Tween.get(this, {loop:-1, override:true});
        oTween.call(function(){
            oButBackward.buttonDown();
            oButBack.scaleX = oButBack.scaleY = oGraphicButtonBackward.scaleX;
        }, oButBackward);
        oTween.wait(iTime);
        oTween.call(function(){
            oButBackward.buttonRelease();
            oButBack.scaleX = oButBack.scaleY = oGraphicButtonBackward.scaleX;
        }, oButBackward);
      
        oTween.call(function(){
            oButForward.buttonDown();
            oButFor.scaleX = oButFor.scaleY = oGraphicButtonForward.scaleX;
        }, oButForward);
        oTween.wait(iTime);
        oTween.call(function(){
            oButForward.buttonRelease();
            oButFor.scaleX = oButFor.scaleY = oGraphicButtonForward.scaleX;
        }, oButForward);
        
        _oFade.removeAllEventListeners();
        _oFade.on("click", function(){
            this.endTutorial(oContainer);
            oContainer.removeChild(oContainerButtons);
            createjs.Tween.removeTweens(this);
            oButForward.buttonRelease();
            _oFade.removeAllEventListeners();
            oInfo.item.animMovement(oInfo.start_pos, null, oInfo.cb_movement);
            _oFade.on("click", function(){

            }); 
        }, this, false, oContainer);
        
   
        var iWidthText =  600 ;
        var iHeightText = 200 ;
        var iXOffset = iWidthText*0.5;
        var pPosText = {x: oContainerButtons.x + iXOffset, y: oContainerButtons.y -iHeightText +130};
        
        if(oContainerButtons.x > CANVAS_WIDTH * 0.5){
            pPosText.x = oContainerButtons.x - iXOffset;
        }
        
        createGenericText({
                            pos: pPosText,
                            size: 80,
                            text: TEXT_INTERACTIVE_HELP_DEPTH,
                            outline: true,
                            outline_size: 3,
                            multiline: true,
                            width: iWidthText,
                            height: iHeightText ,
                            align: CENTER,
                            line_height: 1
                        }, oContainer);
        
    };
    
    this.scaleTutorial = function(oInfo){
        var oEditorButScale = oInfo.but_scale;
        var oParentContainerButtons = oEditorButScale.getGraphic().parent;
        
        var oContainer = new createjs.Container();
        _oContainer.addChild(oContainer);

        var oContainerButtons = new createjs.Container();
        oContainerButtons.regX = oParentContainerButtons.regX;
        oContainerButtons.regY = oParentContainerButtons.regY;
        oContainerButtons.x = oParentContainerButtons.x;
        oContainerButtons.y = oParentContainerButtons.y;
        oContainerButtons.scaleX = oParentContainerButtons.scaleX;
        oContainerButtons.scaleY = oParentContainerButtons.scaleY;
        oContainer.addChild(oContainerButtons);

        
        var oSprite = s_oSpriteLibrary.getSprite("scale_left");
        var oButScale = createBitmap(oSprite);
        oButScale.regX = oSprite.width*0.5;
        oButScale.regY = oSprite.height * 0.5;
        oContainerButtons.addChild(oButScale);
        
        var pStartPos = {x: oButScale.x, y:oButScale.y};
        var fRad = degreesToRadians(-45);
        var iDistance = 25;
        var iXDist = iDistance * Math.cos(fRad);
        var iYDist = iDistance * Math.sin(fRad);
        
        var pPointTween = {
                        x: oButScale.x,
                        y: oButScale.y
                    };
        
        var pPosMax = {
                        x:oButScale.x + iXDist ,
                        y:oButScale.y + iYDist
                      };
        var pPosMin = {
                        x:oButScale.x - iXDist ,
                        y:oButScale.y - iYDist
                      };
                      
        var pGlobalPos = oParentContainerButtons.localToGlobal(pPointTween.x,pPointTween.y);
        oEditorButScale._onPress({stageX: pGlobalPos.x, stageY: pGlobalPos.y});
        oEditorButScale.getGraphic().visible = false;   
        
        var oHand = this.createHand();
        oHand.x = pPointTween.x ;
        oHand.y = pPointTween.y;
        oHand.regY += oContainerButtons.regY -10;
        oContainer.addChild(oHand);
        
        if(oParentContainerButtons.scaleX > 0){
            oHand.regX += oContainerButtons.regX +5;
           
        }else{
            oHand.regX -= oContainerButtons.regX +13;
           
        }
        
        var cbMovement = function(){
                        var pGlobalPos = oParentContainerButtons.localToGlobal(pPointTween.x,pPointTween.y);
                        oEditorButScale._onPressMove({stageX: pGlobalPos.x, stageY: pGlobalPos.y});
                        oHand.x = oContainerButtons.x = oParentContainerButtons.x;
                        oHand.y = oContainerButtons.y = oParentContainerButtons.y;
                     };
           
        var oTween = createjs.Tween.get(pPointTween);
        oTween.to(pPosMin, 500, createjs.Ease.cubicOut);
        oTween.call(function(){
            oTween.removeAllEventListeners();
            oTween = createjs.Tween.get(pPointTween, {loop: -1, override:true, reverse:true});
            oTween.to(pPosMax, 500, createjs.Ease.cubicOut);
            oTween.to(pPosMin, 500, createjs.Ease.cubicOut); 
            oTween.on("change", cbMovement);
        });
        
        oTween.on("change", cbMovement);
        
        var iWidthText =  600 ;
        var iHeightText = 200 ;
        var iXOffset = iWidthText*0.5 + 20;
        var pPosText = {x: oContainerButtons.x + iXOffset, y: oContainerButtons.y - 200 };
        
        if(oContainerButtons.x > CANVAS_WIDTH * 0.5){
            pPosText.x = oContainerButtons.x - iXOffset;
            pPosText.y = oContainerButtons.y - 130;
        }
        
        if((pPosText.y - iHeightText*0.5) < s_iOffsetY){
            pPosText.y = oContainerButtons.y + 200;
        }
        
        createGenericText({
                            pos: pPosText,
                            size: 80,
                            text: TEXT_INTERACTIVE_HELP_SCALE,
                            outline: true,
                            outline_size: 3,
                            multiline: true,
                            width: iWidthText,
                            height: iHeightText ,
                            align: CENTER,
                            line_height: 1
                        }, oContainer);
        
        
        var oParent = this;
        _oFade.removeAllEventListeners();
        _oFade.on("click", function(){
            var oTween = createjs.Tween.get(pPointTween, {override:true});
            var oListener = oTween.on("change", cbMovement);
            oTween.to(pStartPos, 400, createjs.Ease.cubicOut);
            oTween.call(function(){
                oEditorButScale.getGraphic().visible = true;
                oContainer.removeChild(oContainerButtons);
                oTween.off("change", oListener);
                oParent.endTutorial(oContainer);
                createjs.Tween.removeTweens(pPointTween);
            });
            _oFade.removeAllEventListeners();
            _oFade.on("click", function(){

            }); 
        }, this);
    };
    
    this.rotationTutorial = function(oInfo){
        var oEditorButRotation = oInfo.but_rot;
        var oGraphicRotButton = oEditorButRotation.getGraphic();
        
        var oContainer = new createjs.Container();
        _oContainer.addChild(oContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite("rotate_bottom_left");
        var oButRotation = createBitmap(oSprite);
        oButRotation.x = oGraphicRotButton.x;
        oButRotation.y = oGraphicRotButton.y;
        oButRotation.regX = oGraphicRotButton.regX;
        oButRotation.regY = oGraphicRotButton.regY;
        oButRotation.scaleX = oGraphicRotButton.scaleX;
        oButRotation.scaleY = oGraphicRotButton.scaleY;
        
        oContainer.addChild(oButRotation);
        var pStartPos = {x: oButRotation.x, y: oButRotation.y};
        
        var pPointTween = {
                            x:pStartPos.x,
                            y:pStartPos.y
                          };
                          
        var oHand = this.createHand();
        oHand.x = pPointTween.x ;
        oHand.y = pPointTween.y;
        oHand.regX += 40;
        oHand.regY += -40;
        oContainer.addChild(oHand);
        
        var iDist = 40;
        var pMin = {x:pPointTween.x , y: pPointTween.y - iDist};
        var pMax = {x:pPointTween.x + iDist, y: pPointTween.y};
        
        oEditorButRotation._onPress({stageX: oButRotation.x, stageY: oButRotation.y});
        oEditorButRotation.getGraphic().visible = false;    
        
        var cbMovement =  function(){
            oEditorButRotation._onPressMove({stageX: pPointTween.x, stageY: pPointTween.y});
            oButRotation.x = oGraphicRotButton.x;
            oButRotation.y = oGraphicRotButton.y;
            oHand.x = pPointTween.x;
            oHand.y = pPointTween.y;
        };
        
        var iTime = 600;
        var oTween = createjs.Tween.get(pPointTween);
        oTween.to(pMin, iTime, createjs.Ease.cubicOut);
        oTween.call(function(){
            oTween.removeAllEventListeners();
            oTween = createjs.Tween.get(pPointTween, {loop: -1, override:true, reverse:true});
            oTween.to(pMax, iTime, createjs.Ease.cubicOut);
            oTween.to(pMin, iTime, createjs.Ease.cubicOut); 
            oTween.on("change", cbMovement);
        });
        
        oTween.on("change", cbMovement);
        
        var iWidthText =  600 ;
        var iHeightText = 200 ;
        var iXOffset = iWidthText*0.5 + 20;
        var pPosText = {x: oButRotation.x + iXOffset, y: oButRotation.y -260 };
        
        if(oButRotation.x > CANVAS_WIDTH * 0.5){
            pPosText.x = oButRotation.x - iXOffset;
            pPosText.y = oButRotation.y -100;
        }
        
        if((pPosText.y - iHeightText*0.5) < s_iOffsetY){
            pPosText.y = oButRotation.y +100;
        }
        
        createGenericText({
                            pos: pPosText,
                            size: 80,
                            text: TEXT_INTERACTIVE_HELP_ROTATION,
                            outline: true,
                            outline_size: 3,
                            multiline: true,
                            width: iWidthText,
                            height: iHeightText ,
                            align: CENTER,
                            line_height: 1
                        }, oContainer);
        
        var oParent = this;
        _oFade.removeAllEventListeners();
        
        _oFade.on("click", function(){
            var oTween = createjs.Tween.get(pPointTween, {override:true});
            var oListener = oTween.on("change", cbMovement);
            oTween.to(pStartPos, 400, createjs.Ease.cubicOut);
            oTween.call(function(){
                oEditorButRotation.getGraphic().visible = true;
                oContainer.removeChild(oButRotation);
                oTween.off("change", oListener);
                oParent.endTutorial(oContainer);
                createjs.Tween.removeTweens(pPointTween);
            });
            _oFade.removeAllEventListeners();
            _oFade.on("click", function(){

            }); 
            oHand.visible = false;      
        }, this);
    };
    
    this.optionalTutorial = function(oInfo){

        var oOptionalBar = oInfo.optional_bar;
        var aSubOptionalBar = oInfo.sub_optional_bar;
        var oItem = oInfo.item;
        
        var oContainer = new createjs.Container;
        _oContainer.addChild(oContainer);
        
        oInfo.cb_show_optional_bar.call(oInfo.cb_scope, oItem);
        
        var iIDOpt = 0;
        
        var oOptBarContainer = oOptionalBar.getContainer();
        var oOptBarMaskContainer = oOptionalBar.getMaskerdContainer();
        var oMainOptCoinatiner = oOptBarContainer.parent;
        
        var oHand = this.createHand();
        oMainOptCoinatiner.addChild(oHand);
        
        var pOptItemPos = oOptionalBar.getPosItem(iIDOpt);
        pOptItemPos.x += -oOptBarContainer.regX + oOptBarMaskContainer.x;
        oHand.x = pOptItemPos.x;
        oHand.y = pOptItemPos.y;
        
        createGraphicCircle(oHand, 10, null, oContainer, "rgba(0,0,0,0.5)");
        
        var iIDSubOpt = 0;
        var oSubOptBarContainer = aSubOptionalBar[iIDSubOpt].getContainer();
        var oSubOptBarMaskContainer = aSubOptionalBar[iIDSubOpt].getMaskerdContainer();
        
        var iIDSubOptItem = 0;
        var pSubOptItemPos = aSubOptionalBar[iIDSubOpt].getPosItem(iIDSubOptItem);
        pSubOptItemPos.x += -oSubOptBarContainer.regX + oSubOptBarMaskContainer.x;
        pSubOptItemPos.y += aSubOptionalBar[iIDSubOpt].getEndAnimPos().y; 
        
        var oContainerText = new createjs.Container();
        oContainer.addChild(oContainerText);
        
        var pPosText = {
                            x: oMainOptCoinatiner.x,
                            y: oMainOptCoinatiner.y - 200
                        };

        var iWidthText =  600 ;
        var iHeightText = 200 ;
        
        var oText = createGenericText({
                                        pos: pPosText,
                                        size: 50,
                                        text: TEXT_INTERACTIVE_HELP_OPTIONAL_0,
                                        outline: true,
                                        outline_size: 3,
                                        multiline: true,
                                        width: iWidthText,
                                        height: iHeightText ,
                                        align: CENTER,
                                        line_height: 1
                                    }, oContainerText);
        
        var iClickTime = 150;
        var iMoveTime = 400;
        var iTextTransaction = 500;
        var oParent = this;
        
        var cbTextAnimation = function(oInfo){
            createjs.Tween.get(oHand).pause(oInfo.tween);
            var oTextTween = createjs.Tween.get(oContainerText);
            oTextTween.to({alpha:0}, iTextTransaction, createjs.Ease.cubicIn);
            oTextTween.call(function(){
                oText.text.refreshText(oInfo.text);
                oText.outline.refreshText(oInfo.text);
            });
            oTextTween.to({alpha:1}, iTextTransaction, createjs.Ease.cubicIn);
            oTextTween.call(function(){
                createjs.Tween.get(oHand).play(oInfo.tween);
            });
        };
        
        var cbFirstClickOptItem = function (){
            oOptionalBar.onPressDownItem(iIDOpt);
        };
        
        var cbSecondClickSubOptItem = function(oTween){
            aSubOptionalBar[iIDSubOpt].onPressDownItem(iIDSubOptItem);
            cbTextAnimation.call(oParent, {tween: oTween, text: TEXT_INTERACTIVE_HELP_OPTIONAL_1});
        };
        
        var cbThirdClickSubOptItem = function(oTween){
            aSubOptionalBar[iIDSubOpt].onPressDownItem(iIDSubOptItem);
        };
        
        var cbRepeat = function(oTween){
            oInfo.cb_hide_sub_bar.call(oInfo.cb_scope);
            cbTextAnimation.call(oParent, {tween: oTween, text: TEXT_INTERACTIVE_HELP_OPTIONAL_0});
        };
        
        var cbClickAnimation = function(oInfo){
            oInfo.tween.to({scaleX: 0.9, scaleY: 0.9}, iClickTime);
            oInfo.tween.call(oInfo.cb);
            oInfo.tween.to({scaleX: 1, scaleY: 1}, iClickTime);
        };
        
        var cbAnimation = function(){
                //FIRST CLICK
                var oTween = createjs.Tween.get(oHand, {loop:-1, override:true});
                cbClickAnimation.call(oParent, {tween: oTween, cb:cbFirstClickOptItem});
                //SECOND CLICK
                oTween.to(pSubOptItemPos, iMoveTime, createjs.Ease.cubicIn);
                cbClickAnimation.call(oParent, {tween: oTween, cb:cbSecondClickSubOptItem});
                //THIRD CLICK
                cbClickAnimation.call(oParent, {tween: oTween, cb:cbThirdClickSubOptItem});
                //RETURN 
                oTween.to(pOptItemPos, iMoveTime, createjs.Ease.cubicIn);
                oTween.call(cbRepeat);
        };
        
        createjs.Tween.get(this).wait(MS_TIME_BAR_SHOW*2).call(cbAnimation);   
        
        _oFade.removeAllEventListeners();
        _oFade.on("click", function(){
            createjs.Tween.removeTweens(oHand);
            createjs.Tween.removeTweens(oContainerText);
            createjs.Tween.removeAllTweens();
            this.endTutorial(oContainer);
            oContainer.removeChild(oContainerText);
            
            oInfo.cb_hide_sub_bar.call(oInfo.cb_scope);
            _oFade.removeAllEventListeners();
            _oFade.on("click", function(){

            }); 
            oHand.visible = false;
        }, this, false, oContainer);
    };
    
    this.removeTweens = function(){
        createjs.Tween.removeTweens(_oContainer);
    };
    
    this.toExecuteTutorial = function(iType){
        return _aInteractiveHelp[iType];
    };
    
    this.exeTutorial = function(){
        return _bInExe;
    };
    
    this.endTutorial = function(oContainerTutorial){
        
        var oParent = this;
        var oTween = createjs.Tween.get(_oContainer);
        if(_aQueue.length < 1){
            _bInExe  = false;
            oTween.to({alpha:0}, 500, createjs.Ease.cubicIn);
            oTween.call(function(){
                _oFade.removeAllEventListeners();
                _oContainer.removeChild(oContainerTutorial);
            });
            _aParams[ON_END_TUTORIAL] = _iTutorial;
            this.triggerEvent(ON_END_TUTORIAL)
        }else{
            var oTween = createjs.Tween.get(oContainerTutorial);
            oTween.to({alpha:0}, 500, createjs.Ease.cubicIn);
            oTween.call(function(){
                _bInExe = false;
                oParent.startTutorial(_aQueue.shift());
            });
        }
    };
    
    this.createHand = function(){
        var oSprite = s_oSpriteLibrary.getSprite("hand");
        var oHand = createBitmap(oSprite);
        oHand.regX = oSprite.width/2;
        oHand.regY = 18;
        return oHand;
    };
    
    this.triggerEvent = function(iEvent)
    {
        if(_aCbCompleted[iEvent])
        {
            _aCbCompleted[iEvent].call(_aCbOwner[iEvent], _aParams[iEvent]);
        }      
    };
  
    this.addEventListener = function (iEvent, cbCompleted, cbOwner, aParams)
    {
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams[iEvent] = aParams;
    };
    
    
    this._init(oParentContainer);
}

