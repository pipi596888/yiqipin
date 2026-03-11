const API_BASE_URL = "http://localhost:8080";
const WS_BASE_URL = "ws://localhost:8080";

// Set all mock flags to false to use real backend API
const FEATURE_FLAGS = {
  useMockAuth: false,
  useMockProduct: false,
  useMockOrder: false,
  useMockUser: false,
  useMockGrowth: false
};

const API_PATHS = {
  growth: {
    campaigns: "/api/marketing/campaigns",
    recommendations: "/api/recommendation/home",
    analytics: "/api/analytics/overview"
  }
};

export default {
  API_BASE_URL,
  WS_BASE_URL,
  FEATURE_FLAGS,
  API_PATHS
};
