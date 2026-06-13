export const companies = [
  { id: 'baby-shop', name: 'Baby Shop Ltd.', code: 'BSL', outlets: 62, color: '#2563eb' },
  { id: 'sns', name: 'SNS', code: 'SNS', outlets: 18, color: '#7c3aed' },
];

export const companyData = {
  'baby-shop': {
    revenue: 28450000,
    revenueChange: 12.5,
    expenses: 19200000,
    profit: 9250000,
    activeOrders: 156,
    pendingApprovals: 23,
    totalEmployees: 1240,
    totalProducts: 3420,
    totalOutlets: 62,
    inventoryValue: 78500000,
  },
  'sns': {
    revenue: 12300000,
    revenueChange: 8.3,
    expenses: 8700000,
    profit: 3600000,
    activeOrders: 68,
    pendingApprovals: 11,
    totalEmployees: 480,
    totalProducts: 1560,
    totalOutlets: 18,
    inventoryValue: 34200000,
  },
};

export const products = [
  { id: 'STY-001', name: 'Baby Cotton Bodysuit', category: 'Bodysuit', season: 'Summer', gender: 'Unisex', ageGroup: '0-6m', status: 'Active', margin: 42, price: 450, stock: 1240 },
  { id: 'STY-002', name: 'Toddler Fleece Romper', category: 'Romper', season: 'Winter', gender: 'Unisex', ageGroup: '6-12m', status: 'Active', margin: 38, price: 890, stock: 860 },
  { id: 'STY-003', name: 'Newborn Gift Set', category: 'Set', season: 'All Season', gender: 'Unisex', ageGroup: '0-3m', status: 'Active', margin: 45, price: 1650, stock: 520 },
  { id: 'STY-004', name: 'Girls Floral Dress', category: 'Dress', season: 'Summer', gender: 'Girl', ageGroup: '12-24m', status: 'Active', margin: 52, price: 1200, stock: 340 },
  { id: 'STY-005', name: 'Boys Denim Jacket', category: 'Jacket', season: 'Spring', gender: 'Boy', ageGroup: '2-4y', status: 'Seasonal', margin: 35, price: 1500, stock: 210 },
  { id: 'STY-006', name: 'Baby Sleepsuit', category: 'Bodysuit', season: 'All Season', gender: 'Unisex', ageGroup: '0-6m', status: 'Active', margin: 40, price: 550, stock: 980 },
  { id: 'STY-007', name: 'Girls Party Frock', category: 'Dress', season: 'Eid', gender: 'Girl', ageGroup: '2-4y', status: 'Sample', margin: 55, price: 2200, stock: 0 },
];

export const styleLifecycle = ['Draft', 'Sample', 'Approved', 'Active', 'Seasonal', 'Clearance', 'Discontinued'];

export const inventory = [
  { sku: 'CBS-001-WHT-0M', style: 'Baby Cotton Bodysuit', location: 'Central Warehouse', quantity: 520, minStock: 100, status: 'OK' },
  { sku: 'CBS-001-WHT-0M', style: 'Baby Cotton Bodysuit', location: 'Factory Store', quantity: 320, minStock: 50, status: 'OK' },
  { sku: 'CBS-001-WHT-0M', style: 'Baby Cotton Bodysuit', location: 'Dhanmondi Outlet', quantity: 45, minStock: 30, status: 'OK' },
  { sku: 'TFR-002-GRY-6M', style: 'Toddler Fleece Romper', location: 'Central Warehouse', quantity: 180, minStock: 100, status: 'LOW' },
  { sku: 'TFR-002-GRY-6M', style: 'Toddler Fleece Romper', location: 'Uttara Outlet', quantity: 12, minStock: 20, status: 'CRITICAL' },
  { sku: 'NGS-003-PNK-0M', style: 'Newborn Gift Set', location: 'Central Warehouse', quantity: 420, minStock: 50, status: 'OK' },
  { sku: 'GFD-004-PNK-12M', style: 'Girls Floral Dress', location: 'Gulshan Outlet', quantity: 8, minStock: 15, status: 'CRITICAL' },
];

export const bankDeposits = [
  { id: 'DEP-001', outlet: 'Dhanmondi', amount: 142500, bank: 'DBBL', date: '2026-06-13', status: 'Verified', slipRef: 'DBBL-1306-001' },
  { id: 'DEP-002', outlet: 'Uttara', amount: 98500, bank: 'BKash', date: '2026-06-13', status: 'Pending', slipRef: 'BKA-1306-042' },
  { id: 'DEP-003', outlet: 'Gulshan', amount: 156200, bank: 'DBBL', date: '2026-06-12', status: 'Verified', slipRef: 'DBBL-1206-089' },
  { id: 'DEP-004', outlet: 'Mirpur', amount: 72300, bank: 'Nagad', date: '2026-06-12', status: 'Pending', slipRef: 'NGD-1206-031' },
  { id: 'DEP-005', outlet: 'Banani', amount: 118900, bank: 'DBBL', date: '2026-06-13', status: 'Mismatch', slipRef: 'DBBL-1306-112' },
  { id: 'DEP-006', outlet: 'Mohakhali', amount: 0, bank: '-', date: '2026-06-13', status: 'Overdue', slipRef: '-' },
  { id: 'DEP-007', outlet: 'Shymoli', amount: 89400, bank: 'City Bank', date: '2026-06-11', status: 'Verified', slipRef: 'CTY-1106-025' },
  { id: 'DEP-008', outlet: 'Sylhet', amount: 167300, bank: 'DBBL', date: '2026-06-13', status: 'Verified', slipRef: 'DBBL-1306-156' },
];

export const employees = [
  { id: 'EMP-001', name: 'Rahim Uddin', department: 'Factory', role: 'Line Supervisor', grade: 'Grade-4', status: 'Active', salary: 45000, attendance: 95 },
  { id: 'EMP-002', name: 'Fatima Begum', department: 'Outlet', role: 'Outlet Manager', grade: 'Grade-5', status: 'Active', salary: 55000, attendance: 98 },
  { id: 'EMP-003', name: 'Hasan Mahmud', department: 'HQ', role: 'Accounts Manager', grade: 'Grade-7', status: 'Active', salary: 85000, attendance: 100 },
  { id: 'EMP-004', name: 'Nusrat Jahan', department: 'HQ', role: 'HR Manager', grade: 'Grade-7', status: 'Active', salary: 80000, attendance: 97 },
  { id: 'EMP-005', name: 'Kamal Hossain', department: 'Factory', role: 'QC Inspector', grade: 'Grade-4', status: 'Active', salary: 35000, attendance: 92 },
  { id: 'EMP-006', name: 'Shahin Ahmed', department: 'Factory', role: 'Machine Operator', grade: 'Grade-2', status: 'Active', salary: 18000, attendance: 88 },
  { id: 'EMP-007', name: 'Rabeya Akter', department: 'Outlet', role: 'Cashier', grade: 'Grade-2', status: 'Probation', salary: 15000, attendance: 85 },
  { id: 'EMP-008', name: 'Tanvir Hasan', department: 'HQ', role: 'IT Executive', grade: 'Grade-5', status: 'Active', salary: 50000, attendance: 96 },
];

export const payrollPeriods = [
  { id: 'PRL-2026-05', period: 'May 2026', status: 'Locked', totalEmployees: 1240, grossPay: 52400000, deductions: 4200000, netPay: 48200000 },
  { id: 'PRL-2026-06', period: 'June 2026', status: 'Processing', totalEmployees: 1240, grossPay: 52400000, deductions: 4200000, netPay: 48200000 },
];

export const attendance = [
  { employee: 'Rahim Uddin', department: 'Factory', status: 'Present', inTime: '08:55', outTime: '18:02', overtime: 1.5 },
  { employee: 'Fatima Begum', department: 'Outlet', status: 'Present', inTime: '09:30', outTime: '20:45', overtime: 2.25 },
  { employee: 'Hasan Mahmud', department: 'HQ', status: 'Present', inTime: '09:00', outTime: '18:00', overtime: 0 },
  { employee: 'Kamal Hossain', department: 'Factory', status: 'Late', inTime: '09:20', outTime: '18:15', overtime: 0.5 },
  { employee: 'Shahin Ahmed', department: 'Factory', status: 'Present', inTime: '08:30', outTime: '17:00', overtime: 0 },
  { employee: 'Rabeya Akter', department: 'Outlet', status: 'Absent', inTime: '-', outTime: '-', overtime: 0 },
  { employee: 'Tanvir Hasan', department: 'HQ', status: 'Present', inTime: '08:45', outTime: '17:30', overtime: 0 },
];

export const productionOrders = [
  { id: 'PO-2026-001', style: 'Baby Cotton Bodysuit', targetQty: 5000, completedQty: 3200, stage: 'Sewing', status: 'In Progress', dueDate: '2026-06-20', priority: 'High' },
  { id: 'PO-2026-002', style: 'Toddler Fleece Romper', targetQty: 3000, completedQty: 3000, stage: 'Packaging', status: 'Completed', dueDate: '2026-06-15', priority: 'Medium' },
  { id: 'PO-2026-003', style: 'Newborn Gift Set', targetQty: 2000, completedQty: 0, stage: 'Cutting', status: 'In Progress', dueDate: '2026-06-25', priority: 'High' },
  { id: 'PO-2026-004', style: 'Girls Floral Dress', targetQty: 1500, completedQty: 1400, stage: 'QC Check', status: 'In Progress', dueDate: '2026-06-18', priority: 'Urgent' },
];

export const productionStages = [
  { name: 'Pattern & Cutting', status: 'completed' },
  { name: 'Sewing / Stitching', status: 'in-progress' },
  { name: 'Embroidery', status: 'pending' },
  { name: 'Washing & Dyeing', status: 'pending' },
  { name: 'Quality Control', status: 'pending' },
  { name: 'Finishing & Ironing', status: 'pending' },
  { name: 'Packaging', status: 'pending' },
  { name: 'Finished Goods Transfer', status: 'pending' },
];

export const subcontractors = [
  { id: 'SUB-001', name: 'Dhaka Stitching Ltd.', specialty: 'Sewing', activeJobs: 3, onTimeRate: 92, qcPassRate: 95, balance: 450000 },
  { id: 'SUB-002', name: 'Chattogram Embroidery', specialty: 'Embroidery', activeJobs: 1, onTimeRate: 88, qcPassRate: 90, balance: 180000 },
  { id: 'SUB-003', name: 'Sylhet Wash Works', specialty: 'Washing', activeJobs: 2, onTimeRate: 95, qcPassRate: 97, balance: 290000 },
  { id: 'SUB-004', name: 'Savar Stitch Craft', specialty: 'Sewing', activeJobs: 0, onTimeRate: 78, qcPassRate: 82, balance: 65000 },
];

export const jobWorkOrders = [
  { id: 'JWO-001', subcontractor: 'Dhaka Stitching Ltd.', style: 'Baby Cotton Bodysuit', quantity: 2000, rate: 25, status: 'In Progress', dueDate: '2026-06-22' },
  { id: 'JWO-002', subcontractor: 'Chattogram Embroidery', style: 'Girls Floral Dress', quantity: 500, rate: 15, status: 'Completed', dueDate: '2026-06-14' },
  { id: 'JWO-003', subcontractor: 'Sylhet Wash Works', style: 'Toddler Fleece Romper', quantity: 1500, rate: 12, status: 'Pending', dueDate: '2026-06-28' },
];

export const purchaseRequisitions = [
  { id: 'PR-001', requester: 'Rahim Uddin', department: 'Factory', item: 'Cotton Fabric - White', quantity: 500, unit: 'rolls', amount: 750000, status: 'Pending', urgency: 'High' },
  { id: 'PR-002', requester: 'Fatima Begum', department: 'Outlet', item: 'POS Thermal Paper Rolls', quantity: 200, unit: 'pcs', amount: 24000, status: 'Approved', urgency: 'Low' },
  { id: 'PR-003', requester: 'Hasan Mahmud', department: 'HQ', item: 'Office Stationery', quantity: 1, unit: 'lot', amount: 15000, status: 'Converted to PO', urgency: 'Low' },
  { id: 'PR-004', requester: 'Nusrat Jahan', department: 'HQ', item: 'Biometric Device - New Outlet', quantity: 2, unit: 'pcs', amount: 45000, status: 'Pending', urgency: 'Medium' },
  { id: 'PR-005', requester: 'Kamal Hossain', department: 'Factory', item: 'Polyester Thread - Blue', quantity: 100, unit: 'cones', amount: 8500, status: 'Rejected', urgency: 'Medium' },
];

export const approvals = [
  { id: 'APR-001', type: 'Purchase Requisition', requester: 'Rahim Uddin', amount: 750000, date: '2026-06-13', status: 'Pending', urgency: 'High' },
  { id: 'APR-002', type: 'Leave Application', requester: 'Shahin Ahmed', amount: 0, date: '2026-06-13', status: 'Pending', urgency: 'Low' },
  { id: 'APR-003', type: 'Discount Override', requester: 'Gulshan Outlet', amount: 12500, date: '2026-06-12', status: 'Approved', urgency: 'Medium' },
  { id: 'APR-004', type: 'Stock Transfer', requester: 'Warehouse Manager', amount: 0, date: '2026-06-12', status: 'Pending', urgency: 'High' },
  { id: 'APR-005', type: 'Payroll', requester: 'HR Manager', amount: 48200000, date: '2026-06-11', status: 'Pending', urgency: 'Urgent' },
  { id: 'APR-006', type: 'Job Work Order', requester: 'Factory Manager', amount: 50000, date: '2026-06-10', status: 'Approved', urgency: 'Medium' },
  { id: 'APR-007', type: 'New Style Activation', requester: 'Merchandiser', amount: 0, date: '2026-06-10', status: 'Rejected', urgency: 'Low' },
];

export const actionItems = [
  { id: 'ACT-001', task: 'Stock Transfer Note pending approval', assignee: 'Rahim Uddin', priority: 'High', due: 'Today' },
  { id: 'ACT-002', task: 'Bank deposit overdue - Mohakhali Outlet', assignee: 'Hasan Mahmud', priority: 'High', due: 'Today' },
  { id: 'ACT-003', task: 'QC failure >15% - PO-2026-004', assignee: 'Kamal Hossain', priority: 'Urgent', due: 'Today' },
  { id: 'ACT-004', task: 'Sub-contractor JWO-002 return pending', assignee: 'Factory Manager', priority: 'Medium', due: 'Tomorrow' },
  { id: 'ACT-005', task: 'Minimum stock alert - Romper (Uttara)', assignee: 'Warehouse Manager', priority: 'High', due: 'Today' },
  { id: 'ACT-006', task: 'Payroll June review pending approval', assignee: 'Nusrat Jahan', priority: 'Urgent', due: 'Tomorrow' },
  { id: 'ACT-007', task: 'Sales target gap - Mirpur Outlet (-15%)', assignee: 'Area Manager', priority: 'Medium', due: 'This Week' },
];

export const ecommerceOrders = [
  { id: 'ECO-001', customer: 'Ayesha Khatun', items: 3, total: 2450, payment: 'bKash', status: 'Picked', date: '2026-06-13', fulfillment: 'Central WH' },
  { id: 'ECO-002', customer: 'Mizanur Rahman', items: 1, total: 890, payment: 'COD', status: 'Packed', date: '2026-06-13', fulfillment: 'Central WH' },
  { id: 'ECO-003', customer: 'Shamima Akter', items: 5, total: 4200, payment: 'Card', status: 'Shipped', date: '2026-06-12', fulfillment: 'Central WH' },
  { id: 'ECO-004', customer: 'Jahidul Islam', items: 2, total: 1100, payment: 'Nagad', status: 'Pending', date: '2026-06-13', fulfillment: 'Central WH' },
  { id: 'ECO-005', customer: 'Nadia Sultana', items: 4, total: 3800, payment: 'bKash', status: 'Delivered', date: '2026-06-11', fulfillment: 'Central WH' },
  { id: 'ECO-006', customer: 'Arif Hossain', items: 1, total: 1500, payment: 'COD', status: 'Return Initiated', date: '2026-06-10', fulfillment: 'Nearest Outlet' },
];

export const ecommerceReturns = [
  { id: 'RET-001', order: 'ECO-006', customer: 'Arif Hossain', item: 'Boys Denim Jacket', reason: 'Size mismatch', condition: 'Resaleable', status: 'Item Received', refundAmount: 1500 },
  { id: 'RET-002', order: 'ECO-003', customer: 'Shamima Akter', item: 'Girls Floral Dress', reason: 'Color variation', condition: 'Defective', status: 'Pending Inspection', refundAmount: 1200 },
];

export const outlets = [
  { name: 'Dhanmondi', city: 'Dhaka', type: 'Flagship', todaySales: 142500, target: 150000, depositStatus: 'Verified', stockHealth: 85 },
  { name: 'Uttara', city: 'Dhaka', type: 'Flagship', todaySales: 98500, target: 120000, depositStatus: 'Pending', stockHealth: 62 },
  { name: 'Gulshan', city: 'Dhaka', type: 'Standard', todaySales: 156200, target: 130000, depositStatus: 'Verified', stockHealth: 90 },
  { name: 'Mirpur', city: 'Dhaka', type: 'Standard', todaySales: 72300, target: 85000, depositStatus: 'Pending', stockHealth: 75 },
  { name: 'Banani', city: 'Dhaka', type: 'Standard', todaySales: 118900, target: 100000, depositStatus: 'Mismatch', stockHealth: 70 },
  { name: 'Mohakhali', city: 'Dhaka', type: 'Small', todaySales: 82000, target: 70000, depositStatus: 'Overdue', stockHealth: 45 },
  { name: 'Shymoli', city: 'Dhaka', type: 'Standard', todaySales: 89400, target: 95000, depositStatus: 'Verified', stockHealth: 80 },
  { name: 'Sylhet', city: 'Sylhet', type: 'Flagship', todaySales: 167300, target: 140000, depositStatus: 'Verified', stockHealth: 92 },
  { name: 'Chittagong', city: 'Chittagong', type: 'Flagship', todaySales: 145000, target: 160000, depositStatus: 'Pending', stockHealth: 78 },
  { name: 'Rajshahi', city: 'Rajshahi', type: 'Standard', todaySales: 56000, target: 60000, depositStatus: 'Verified', stockHealth: 65 },
  { name: 'Khulna', city: 'Khulna', type: 'Standard', todaySales: 72000, target: 65000, depositStatus: 'Pending', stockHealth: 72 },
  { name: 'Barisal', city: 'Barisal', type: 'Small', todaySales: 38000, target: 40000, depositStatus: 'Verified', stockHealth: 60 },
];

export const efficiencyData = {
  lineEfficiency: 78.5,
  targetEfficiency: 85,
  bottleneckStage: 'Sewing',
  avgCostPerMinute: 0.45,
  operatorPerformance: 82,
  machineUtilization: 76,
};

export const aiContextResponses = {
  'top-selling': 'Based on last week\'s data, the top 3 selling styles were: 1) Baby Cotton Bodysuit (1,240 units), 2) Toddler Fleece Romper (860 units), 3) Newborn Gift Set (520 units). Dhanmondi and Gulshan outlets showed the highest sell-through rates.',
  'low-margin': 'Styles with margin below 30%: Boys Denim Jacket (35% - approaching threshold). No styles currently below 30% margin. The closest is Toddler Fleece Romper at 38%.',
  'outlet-performance': 'Outlet Performance Overview: Gulshan (120% of target) and Sylhet (119%) are outperforming. Mohakhali is 17% below target. Uttara needs attention at 82% of target.',
  'attendance': 'Today\'s attendance (as of 2:00 PM): Factory - 92%, Outlets - 88%, HQ - 96%. 3 employees marked late, 1 absent (Rabeya Akter - notified).',
  'production-status': 'Active Production Orders: PO-2026-001 (Cotton Bodysuit) at 64% - Sewing stage, PO-2026-003 (Gift Set) at 0% - Cutting stage. PO-2026-004 (Floral Dress) at 93% - QC stage.',
  'deposit-overdue': 'Mohakhali Outlet deposit is overdue (amount: ~82,000 BDT). Banani deposit shows a mismatch (sales: 118,900 vs deposited: 112,000). 3 deposits pending verification.'
};
