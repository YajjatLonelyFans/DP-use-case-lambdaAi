import { useQuery } from '@tanstack/react-query';
import { generateKPIData, generateSalesData, generateInventoryData, generateProductData } from './mockData';

// Simulated API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const useDashboardMetrics = () => {
    return useQuery({
        queryKey: ['dashboardMetrics'],
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
