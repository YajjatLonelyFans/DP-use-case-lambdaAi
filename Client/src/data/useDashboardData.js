import { useQuery } from '@tanstack/react-query';
import {
    generateKPIData,
    generateSalesData,
    generateInventoryData,
    generateProductData,
    generateElasticityData,
    generatePerformanceStats,
    generateCategoryPerformance,
    generatePricingRules,
    generatePricingActions,
    generateInventoryStats,
    generatePromotions
} from './mockData';

// Simulated API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useDashboardMetrics = (currency) => {
    return useQuery({
        queryKey: ['dashboardMetrics', currency],
        queryFn: async () => {
            await delay(800); // Simulate network latency
            return {
                kpis: generateKPIData(),
                salesTrend: generateSalesData(30),
                inventoryDist: generateInventoryData(),
                products: generateProductData(15),
            };
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};

export const useAnalyticsData = (currency) => {
    return useQuery({
        queryKey: ['analyticsData', currency],
        queryFn: async () => {
            await delay(800);
            return {
                elasticity: generateElasticityData(),
                performance: generatePerformanceStats(),
                categoryPerformance: generateCategoryPerformance(),
            };
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const usePricingData = (currency) => {
    return useQuery({
        queryKey: ['pricingData', currency],
        queryFn: async () => {
            await delay(600);
            return {
                rules: generatePricingRules(),
                actions: generatePricingActions(),
            };
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const useInventoryData = (currency) => {
    return useQuery({
        queryKey: ['inventoryData', currency],
        queryFn: async () => {
            await delay(600);
            return {
                stats: generateInventoryStats(),
                products: generateProductData(30), // More items for inventory view
            };
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const usePromotionsData = (currency) => {
    return useQuery({
        queryKey: ['promotionsData', currency],
        queryFn: async () => {
            await delay(600);
            return {
                promos: generatePromotions(),
            };
        },
        staleTime: 1000 * 60 * 5,
    });
};
