// --- KPI Data ---
// Metrics derived from the uploaded "Core Pricing KPIs" and "Inventory & Risk KPIs" documents.
export const generateKPIData = () => {
    return [
        {
            id: 'gross-margin-percent',
            label: 'Gross Margin %',
            value: '42.8%',
            change: '+2.4%',
            trend: 'up', // up = good
            description: 'Margin after pricing actions. Ensures profitability.',
        },
        {
            id: 'revenue-uplift',
            label: 'Revenue Uplift',
            value: 124500,
            type: 'currency',
            change: '+8.1%',
            trend: 'up',
            description: 'Incremental revenue vs baseline pricing.',
        },
        {
            id: 'conversion-rate',
            label: 'Conversion Rate',
            value: '3.2%',
            change: '-0.4%',
            trend: 'down',
            description: 'Orders per product view.',
        },
        {
            id: 'avg-order-value',
            label: 'Avg Order Value (AOV)',
            value: 85.20,
            type: 'currency',
            change: '+1.2%',
            trend: 'up',
            description: 'Average spend per checkout.',
        },
        {
            id: 'inventory-aging',
            label: 'Inv. Aging (>60 Days)',
            value: '12%',
            change: '-1.5%',
            trend: 'up', // decrease in aging is good, visually mapping logic handled in component
            isInverse: true, // Specific flag for "down is good" metrics
            description: 'Stock health and capital lock-up.',
        },
        {
            id: 'stock-out-rate',
            label: 'Stock-out Rate',
            value: '2.1%',
            change: '+0.5%',
            trend: 'down', // increase is bad
            isInverse: true,
            description: 'Lost sales risk due to pricing.',
        },
    ];
};

// --- Chart Data ---
// Sales Trend vs Margin
export const generateSalesData = (days = 30) => {
    const data = [];
    const today = new Date();
    for (let i = days; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        // Randomize realistic patterns without external libs
        const revenue = Math.floor(Math.random() * (9000 - 4000 + 1)) + 4000;
        const margin = parseFloat((Math.random() * (50 - 35) + 35).toFixed(1));

        data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            revenue,
            margin,
        });
    }
    return data;
};

// Inventory Distribution (Aging Buckets)
export const generateInventoryData = () => {
    return [
        { name: '0-30 Days', value: 65, fill: '#10b981' }, // Emerald-500
        { name: '31-60 Days', value: 20, fill: '#f59e0b' }, // Amber-500
        { name: '61-90 Days', value: 10, fill: '#f97316' }, // Orange-500
        { name: '>90 Days', value: 5, fill: '#ef4444' },    // Red-500
    ];
};

// --- Product Table Data ---
const PRODUCT_NAMES = [
    'Wireless Headphones', 'Smart Watch Series 5', 'Running Shoes', 'Cotton T-Shirt', 'Leather Wallet',
    'Gaming Mouse', 'Mechanical Keyboard', '4K Monitor', 'USB-C Hub', 'Laptop Stand',
    'Bluetooth Speaker', 'Fitness Tracker', 'Yoga Mat', 'Water Bottle', 'Backpack',
    'Sunglasses', 'Denim Jeans', 'Sneakers', 'Hoodie', 'Smart Light Bulb'
];

const DEPARTMENTS = ['Electronics', 'Fashion', 'Home & Office', 'Sports'];
const STATUSES = ['Active', 'Low Stock', 'Out of Stock'];
const VELOCITIES = ['High', 'Medium', 'Low'];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generateProductData = (count = 20) => {
    const products = [];
    for (let i = 0; i < count; i++) {
        products.push({
            id: `prod-${i + 1}`,
            name: PRODUCT_NAMES[i % PRODUCT_NAMES.length] + (i > 19 ? ` ${i}` : ''),
            category: randomItem(DEPARTMENTS),
            price: parseFloat((Math.random() * (200 - 10) + 10).toFixed(2)),
            stock: Math.floor(Math.random() * 150),
            status: randomItem(STATUSES),
            margin: Math.floor(Math.random() * (60 - 20) + 20), // %
            salesVelocity: randomItem(VELOCITIES),
        });
    }
    return products;
};
