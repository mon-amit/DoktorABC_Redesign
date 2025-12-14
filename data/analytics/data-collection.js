/**
 * DoktorABC_Redesign Data Collection Utilities
 * Provides utilities for collecting and managing analytics data
 */

// Load event tracking configuration
const eventConfig = require('./event-tracking-config.json');

/**
 * Event Tracking Class
 * Handles event collection and validation
 */
class EventTracker {
  constructor() {
    this.events = [];
    this.config = eventConfig;
  }

  /**
   * Track a user event
   * @param {string} eventName - Name of the event
   * @param {Object} properties - Event properties
   * @param {string} userId - User identifier
   */
  trackEvent(eventName, properties = {}, userId = null) {
    const event = {
      event: eventName,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        distinct_id: userId || this.generateAnonymousId()
      }
    };

    // Validate event against configuration
    if (this.validateEvent(event)) {
      this.events.push(event);
      console.log(`✅ Event tracked: ${eventName}`, event.properties);

      // Here you would send to Mixpanel MCP server
      // mixpanel_track_event(event);

      return event;
    } else {
      console.error(`❌ Invalid event: ${eventName}`);
      return null;
    }
  }

  /**
   * Track page view
   * @param {string} pageUrl - Page URL
   * @param {string} pageTitle - Page title
   * @param {string} userId - User identifier
   */
  trackPageView(pageUrl, pageTitle = '', userId = null) {
    return this.trackEvent('page_view', {
      page_url: pageUrl,
      page_title: pageTitle,
      referrer: document?.referrer || ''
    }, userId);
  }

  /**
   * Track user login
   * @param {string} userId - User identifier
   * @param {string} loginMethod - Login method (email, google, etc.)
   * @param {string} deviceType - Device type (desktop, mobile, tablet)
   */
  trackUserLogin(userId, loginMethod = 'email', deviceType = 'desktop') {
    return this.trackEvent('user_login', {
      login_method: loginMethod,
      device_type: deviceType
    }, userId);
  }

  /**
   * Track feature interaction
   * @param {string} featureName - Name of the feature
   * @param {string} interactionType - Type of interaction (click, hover, etc.)
   * @param {string} userId - User identifier
   * @param {string} elementId - DOM element ID (optional)
   */
  trackFeatureInteraction(featureName, interactionType, userId, elementId = null) {
    return this.trackEvent('feature_interacted', {
      feature_name: featureName,
      interaction_type: interactionType,
      element_id: elementId
    }, userId);
  }

  /**
   * Track error occurrence
   * @param {string} errorType - Type of error
   * @param {string} errorMessage - Error message
   * @param {string} pageUrl - Current page URL
   * @param {string} userId - User identifier
   */
  trackError(errorType, errorMessage, pageUrl, userId = null) {
    return this.trackEvent('error_occurred', {
      error_type: errorType,
      error_message: errorMessage,
      page_url: pageUrl
    }, userId);
  }

  /**
   * Validate event against configuration
   * @param {Object} event - Event object to validate
   * @returns {boolean} - Whether event is valid
   */
  validateEvent(event) {
    const eventType = this.getEventType(event.event);
    if (!eventType) {
      console.warn(`Unknown event type: ${event.event}`);
      return false;
    }

    // Check required properties
    const requiredProps = eventType.required || [];
    for (const prop of requiredProps) {
      if (!(prop in event.properties)) {
        console.error(`Missing required property: ${prop} for event: ${event.event}`);
        return false;
      }
    }

    return true;
  }

  /**
   * Get event configuration
   * @param {string} eventName - Event name
   * @returns {Object} - Event configuration
   */
  getEventType(eventName) {
    for (const category of Object.values(this.config.events)) {
      if (category[eventName]) {
        return category[eventName];
      }
    }
    return null;
  }

  /**
   * Generate anonymous user ID
   * @returns {string} - Anonymous user identifier
   */
  generateAnonymousId() {
    return 'anon_' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Get all tracked events
   * @returns {Array} - Array of tracked events
   */
  getEvents() {
    return this.events;
  }

  /**
   * Clear all tracked events
   */
  clearEvents() {
    this.events = [];
  }

  /**
   * Export events to JSON
   * @param {string} filename - Output filename
   */
  exportEvents(filename = 'events_export.json') {
    const fs = require('fs');
    fs.writeFileSync(filename, JSON.stringify(this.events, null, 2));
    console.log(`📄 Events exported to ${filename}`);
  }
}

// Create global instance
const eventTracker = new EventTracker();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EventTracker, eventTracker };
}

// Browser usage example
if (typeof window !== 'undefined') {
  window.EventTracker = EventTracker;
  window.eventTracker = eventTracker;
}

console.log('🎯 DoktorABC_Redesign Data Collection initialized');
console.log('📊 Available methods: trackEvent, trackPageView, trackUserLogin, trackFeatureInteraction, trackError');
console.log('📈 Configuration loaded for', Object.keys(eventConfig.events).length, 'event categories');
