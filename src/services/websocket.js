// ===================================
// WebSocket Service for Real-time Updates
// ===================================
import { io } from 'socket.io-client';
import { generateMockMarketUpdate } from '../data/mockData';

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:5000';
// Force mock mode if env var is 'true' OR if undefined (safer default)
const MOCK_MODE = import.meta.env.VITE_MOCK_MODE !== 'false';
const DEBUG_MODE = import.meta.env.VITE_DEBUG_MODE === 'true';

// Log initialization for debugging
if (DEBUG_MODE) {
  console.log('🔌 WebSocket Service Init:', {
    MOCK_MODE,
    WEBSOCKET_URL,
    ENV_VAR: import.meta.env.VITE_MOCK_MODE,
  });
}

let socket = null;
let mockUpdateInterval = null;
let eventHandlers = new Map();

// ===================================
// WebSocket Connection Management
// ===================================

export const connectWebSocket = () => {
  // Always use mock mode in development without backend
  if (MOCK_MODE) {
    console.log('🔌 WebSocket: MOCK_MODE enabled - simulating real-time updates');
    console.log('💡 To use real WebSocket, set VITE_MOCK_MODE=false in .env and restart dev server');
    startMockUpdates();
    return;
  }

  if (socket?.connected) {
    if (DEBUG_MODE) {
      console.log('🔌 WebSocket: Already connected');
    }
    return;
  }

  console.log('🔌 WebSocket: Attempting connection to', WEBSOCKET_URL);

  try {
    socket = io(WEBSOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      // Suppress console errors if backend is not available
      autoConnect: true,
    });

    socket.on('connect', () => {
      if (DEBUG_MODE) {
        console.log('✅ WebSocket: Connected to', WEBSOCKET_URL);
      }
    });

    socket.on('disconnect', (reason) => {
      if (DEBUG_MODE) {
        console.log('❌ WebSocket: Disconnected -', reason);
      }
    });

    socket.on('connect_error', (error) => {
      // Only log if in debug mode - suppress normal connection failures
      if (DEBUG_MODE) {
        console.warn('⚠️ WebSocket: Connection error (backend may not be running)', error.message);
      }
    });

    socket.on('error', (error) => {
      // Only log if in debug mode
      if (DEBUG_MODE) {
        console.error('❌ WebSocket Error:', error);
      }
    });

    socket.on('reconnect', (attemptNumber) => {
      if (DEBUG_MODE) {
        console.log('🔄 WebSocket: Reconnected after', attemptNumber, 'attempts');
      }
    });

    // Real-time market data
    socket.on('market:update', (data) => {
      if (DEBUG_MODE) {
        console.log('📊 Market Update:', data);
      }
      triggerEvent('market:update', data);
    });

    // Portfolio updates
    socket.on('portfolio:update', (data) => {
      if (DEBUG_MODE) {
        console.log('💼 Portfolio Update:', data);
      }
      triggerEvent('portfolio:update', data);
    });

    // Trade execution updates
    socket.on('trade:executed', (data) => {
      if (DEBUG_MODE) {
        console.log('✅ Trade Executed:', data);
      }
      triggerEvent('trade:executed', data);
    });

    // Order status updates
    socket.on('order:update', (data) => {
      if (DEBUG_MODE) {
        console.log('📝 Order Update:', data);
      }
      triggerEvent('order:update', data);
    });

    // AI analysis updates
    socket.on('ai:insight', (data) => {
      if (DEBUG_MODE) {
        console.log('🤖 AI Insight:', data);
      }
      triggerEvent('ai:insight', data);
    });

  } catch (error) {
    console.error('❌ WebSocket Connection Error:', error);
  }
};

export const disconnectWebSocket = () => {
  if (MOCK_MODE) {
    stopMockUpdates();
    return;
  }

  if (socket) {
    socket.disconnect();
    socket = null;
    if (DEBUG_MODE) {
      console.log('🔌 WebSocket: Disconnected');
    }
  }
};

export const isConnected = () => {
  if (MOCK_MODE) {
    return mockUpdateInterval !== null;
  }
  return socket?.connected || false;
};

// ===================================
// Event Subscription System
// ===================================

export const subscribe = (eventName, handler) => {
  if (!eventHandlers.has(eventName)) {
    eventHandlers.set(eventName, []);
  }

  const handlers = eventHandlers.get(eventName);
  handlers.push(handler);

  if (DEBUG_MODE) {
    console.log(`📡 Subscribed to ${eventName} (${handlers.length} handlers)`);
  }

  // Return unsubscribe function
  return () => {
    const handlers = eventHandlers.get(eventName);
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
    if (DEBUG_MODE) {
      console.log(`📡 Unsubscribed from ${eventName}`);
    }
  };
};

export const unsubscribe = (eventName, handler) => {
  const handlers = eventHandlers.get(eventName);
  if (handlers) {
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }
};

const triggerEvent = (eventName, data) => {
  const handlers = eventHandlers.get(eventName);
  if (handlers) {
    handlers.forEach((handler) => {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error in ${eventName} handler:`, error);
      }
    });
  }
};

// ===================================
// Mock Updates (for development without backend)
// ===================================

const startMockUpdates = () => {
  if (mockUpdateInterval) {
    return; // Already running
  }

  // Send mock market updates every 3 seconds
  mockUpdateInterval = setInterval(() => {
    const mockData = generateMockMarketUpdate();
    triggerEvent('market:update', mockData);

    if (DEBUG_MODE && Math.random() < 0.2) {
      console.log('📊 Mock Market Update:', mockData);
    }
  }, 3000);

  if (DEBUG_MODE) {
    console.log('🔄 Mock WebSocket updates started');
  }
};

const stopMockUpdates = () => {
  if (mockUpdateInterval) {
    clearInterval(mockUpdateInterval);
    mockUpdateInterval = null;
    if (DEBUG_MODE) {
      console.log('🛑 Mock WebSocket updates stopped');
    }
  }
};

// ===================================
// Outgoing Messages (Client to Server)
// ===================================

export const sendMessage = (event, data) => {
  if (MOCK_MODE) {
    if (DEBUG_MODE) {
      console.log('📤 Mock Send:', event, data);
    }
    return;
  }

  if (socket?.connected) {
    socket.emit(event, data);
    if (DEBUG_MODE) {
      console.log('📤 Sent:', event, data);
    }
  } else {
    console.warn('⚠️ WebSocket not connected. Message not sent:', event);
  }
};

// ===================================
// Specific WebSocket Actions
// ===================================

export const subscribeToMarket = (symbols) => {
  sendMessage('market:subscribe', { symbols });
};

export const unsubscribeFromMarket = (symbols) => {
  sendMessage('market:unsubscribe', { symbols });
};

export const subscribeToPortfolio = () => {
  sendMessage('portfolio:subscribe', {});
};

export const unsubscribeFromPortfolio = () => {
  sendMessage('portfolio:unsubscribe', {});
};

// ===================================
// Export WebSocket Service
// ===================================
export default {
  connect: connectWebSocket,
  disconnect: disconnectWebSocket,
  isConnected,
  subscribe,
  unsubscribe,
  sendMessage,
  subscribeToMarket,
  unsubscribeFromMarket,
  subscribeToPortfolio,
  unsubscribeFromPortfolio,
};

// Auto-connect on module load (optional - you may want to do this in App.jsx instead)
// connectWebSocket();
