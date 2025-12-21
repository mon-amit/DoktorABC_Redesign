/**
 * Event Mapper Module
 * Provides runtime mapping from CSV event names to Mixpanel event names
 * Handles property transformations and maintains backward compatibility
 */

class EventMapper {
  constructor() {
    this.mappings = new Map();
    this.propertyMappings = new Map();
    this.unmappedEvents = new Set();
    this.initialized = false;
  }

  /**
   * Initialize the mapper with configuration data
   * @param {Object} config - Event tracking configuration
   */
  initialize(config) {
    if (!config.mixpanel_mappings) {
      console.warn('⚠️  No Mixpanel mappings found in configuration');
      return;
    }

    // Load mappings
    Object.entries(config.mixpanel_mappings).forEach(([csvEvent, mapping]) => {
      this.mappings.set(csvEvent, {
        mixpanelEvent: mapping.mixpanel_event_name,
        confidence: mapping.confidence_score,
        status: mapping.status,
        propertyMapping: mapping.property_mapping || {},
        metadata: {
          page: mapping.csv_page,
          platform: mapping.csv_platform,
          rca: mapping.csv_rca_description
        }
      });

      // Store property mappings
      if (mapping.property_mapping && Object.keys(mapping.property_mapping).length > 0) {
        this.propertyMappings.set(csvEvent, mapping.property_mapping);
      }
    });

    // Load new events to create (mark as unmapped for now)
    if (config.new_events_to_create) {
      config.new_events_to_create.forEach(event => {
        this.unmappedEvents.add(event.event_name);
      });
    }

    this.initialized = true;
    console.log(`✅ Event mapper initialized with ${this.mappings.size} mappings`);
  }

  /**
   * Get the Mixpanel event name for a CSV event
   * @param {string} csvEventName - Original CSV event name
   * @returns {string|null} - Mixpanel event name or null if unmapped
   */
  getMixpanelEvent(csvEventName) {
    if (!this.initialized) {
      console.error('❌ Event mapper not initialized');
      return csvEventName; // Fallback to original name
    }

    const mapping = this.mappings.get(csvEventName);

    if (mapping) {
      // Log mapping for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log(`🔄 Mapped: ${csvEventName} → ${mapping.mixpanelEvent} (${mapping.confidence}% confidence)`);
      }
      return mapping.mixpanelEvent;
    }

    // Check if it's a known unmapped event
    if (this.unmappedEvents.has(csvEventName)) {
      console.warn(`⚠️  Event "${csvEventName}" requires new Mixpanel event creation`);
      return null; // Explicitly unmapped
    }

    // Unknown event - log and fallback
    console.warn(`⚠️  Unknown event "${csvEventName}" - no mapping found, using original name`);
    this.logUnmappedEvent(csvEventName);
    return csvEventName; // Fallback to original name
  }

  /**
   * Map CSV event properties to Mixpanel properties
   * @param {string} csvEventName - Original CSV event name
   * @param {Object} csvProperties - Original CSV properties
   * @returns {Object} - Mapped Mixpanel properties
   */
  mapProperties(csvEventName, csvProperties) {
    if (!this.initialized) {
      console.error('❌ Event mapper not initialized');
      return csvProperties; // Fallback to original properties
    }

    const propertyMapping = this.propertyMappings.get(csvEventName);

    if (!propertyMapping || Object.keys(propertyMapping).length === 0) {
      // No property mapping needed
      return csvProperties;
    }

    const mappedProperties = {};

    // Apply property mappings
    Object.entries(csvProperties).forEach(([csvProp, value]) => {
      const mixpanelProp = propertyMapping[csvProp];

      if (mixpanelProp) {
        // Property name transformation
        mappedProperties[mixpanelProp] = value;

        if (process.env.NODE_ENV === 'development') {
          console.log(`🔄 Property mapped: ${csvProp} → ${mixpanelProp}`);
        }
      } else {
        // Keep original property name
        mappedProperties[csvProp] = value;
      }
    });

    // Add standard properties
    mappedProperties.timestamp = new Date().toISOString();
    mappedProperties.event_source = 'csv_mapped';

    return mappedProperties;
  }

  /**
   * Check if an event is mapped
   * @param {string} csvEventName - CSV event name
   * @returns {boolean} - True if mapped
   */
  isEventMapped(csvEventName) {
    return this.mappings.has(csvEventName);
  }

  /**
   * Get mapping metadata for an event
   * @param {string} csvEventName - CSV event name
   * @returns {Object|null} - Mapping metadata or null
   */
  getMappingMetadata(csvEventName) {
    return this.mappings.get(csvEventName) || null;
  }

  /**
   * Get all mapped events
   * @returns {Array} - Array of mapped event names
   */
  getMappedEvents() {
    return Array.from(this.mappings.keys());
  }

  /**
   * Get all unmapped events
   * @returns {Array} - Array of unmapped event names
   */
  getUnmappedEvents() {
    return Array.from(this.unmappedEvents);
  }

  /**
   * Get mapping statistics
   * @returns {Object} - Statistics object
   */
  getStatistics() {
    const stats = {
      total_mappings: this.mappings.size,
      unmapped_events: this.unmappedEvents.size,
      confidence_distribution: {
        high: 0,    // >= 90%
        medium: 0,  // 70-89%
        low: 0     // < 70%
      },
      status_distribution: {}
    };

    this.mappings.forEach(mapping => {
      // Confidence distribution
      if (mapping.confidence >= 90) stats.confidence_distribution.high++;
      else if (mapping.confidence >= 70) stats.confidence_distribution.medium++;
      else stats.confidence_distribution.low++;

      // Status distribution
      stats.status_distribution[mapping.status] = (stats.status_distribution[mapping.status] || 0) + 1;
    });

    return stats;
  }

  /**
   * Log unmapped events for monitoring
   * @param {string} eventName - Unmapped event name
   */
  logUnmappedEvent(eventName) {
    // In production, you might want to send this to a monitoring service
    if (typeof window !== 'undefined' && window.mixpanel) {
      // Track unmapped events in Mixpanel for monitoring
      window.mixpanel.track('unmapped_event_detected', {
        unmapped_event: eventName,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent
      });
    }
  }

  /**
   * Validate a mapping
   * @param {string} csvEventName - CSV event name
   * @param {string} mixpanelEventName - Expected Mixpanel event name
   * @returns {boolean} - True if mapping is valid
   */
  validateMapping(csvEventName, mixpanelEventName) {
    const mapping = this.mappings.get(csvEventName);
    return mapping && mapping.mixpanelEvent === mixpanelEventName;
  }

  /**
   * Reload mappings from configuration
   * Useful for hot-reloading in development
   * @param {Object} config - New configuration
   */
  reloadMappings(config) {
    this.mappings.clear();
    this.propertyMappings.clear();
    this.unmappedEvents.clear();
    this.initialized = false;
    this.initialize(config);
  }
}

// Singleton instance
const eventMapper = new EventMapper();

// Export for both Node.js and browser environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = eventMapper;
} else if (typeof window !== 'undefined') {
  window.EventMapper = eventMapper;
}

// Auto-initialize if config is available (browser environment)
if (typeof window !== 'undefined' && window.eventTrackingConfig) {
  eventMapper.initialize(window.eventTrackingConfig);
}
