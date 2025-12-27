import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import PricingEngine from './pages/PricingEngine';
import Customers from './pages/Customers';
import Promotions from './pages/Promotions';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import './index.css'; // Ensure Tailwind directives are applied

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevent excessive refetches during dev
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/pricing" element={<PricingEngine />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </CurrencyProvider>
    </QueryClientProvider>
  );
}

export default App;
