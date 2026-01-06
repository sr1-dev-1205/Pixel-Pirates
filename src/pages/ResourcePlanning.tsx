import React, { useState } from 'react';
import {
  Package,
  Truck,
  Users,
  MapPin,
  Calendar,
  Plus,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Download,
  Upload,
  Filter,
  Search,
  BarChart3,
  Activity,
  Target,
  Zap
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useMockData } from '../hooks/useMockData';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import PageHeader from '../components/layout/PageHeader';

interface Resource {
  id: string;
  name: string;
  type: 'medicine' | 'equipment' | 'personnel' | 'supplies';
  current_stock: number;
  required_stock: number;
  unit: string;
  location: string;
  cost_per_unit: number;
  supplier: string;
  expiry_date?: string;
  last_updated: string;
  status: 'available' | 'low_stock' | 'out_of_stock' | 'expired';
}

interface Deployment {
  id: string;
  village_id: string;
  resource_type: string;
  quantity: number;
  deployed_date: string;
  expected_arrival: string;
  status: 'planned' | 'in_transit' | 'deployed' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assigned_personnel: string;
  transport_method: 'vehicle' | 'helicopter' | 'boat' | 'foot';
  cost: number;
}

interface EmergencyKit {
  id: string;
  name: string;
  contents: string[];
  villages_covered: number;
  last_deployed: string;
  status: 'ready' | 'deployed' | 'maintenance';
}

const ResourcePlanning: React.FC = () => {
  const { t } = useLanguage();
  const { villages, loading } = useMockData();
  const [activeTab, setActiveTab] = useState<'inventory' | 'deployments' | 'planning' | 'analytics' | 'emergency'>('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'medicine' | 'equipment' | 'personnel' | 'supplies'>('all');

  // Enhanced mock resource data
  const resources: Resource[] = [
    {
      id: '1',
      name: 'ORS Packets',
      type: 'medicine',
      current_stock: 2500,
      required_stock: 5000,
      unit: 'packets',
      location: 'District Medical Store',
      cost_per_unit: 15,
      supplier: 'MedSupply India Ltd',
      expiry_date: '2025-12-31',
      last_updated: new Date().toISOString(),
      status: 'low_stock',
    },
    {
      id: '2',
      name: 'Water Purification Tablets',
      type: 'supplies',
      current_stock: 800,
      required_stock: 2000,
      unit: 'tablets',
      location: 'District Medical Store',
      cost_per_unit: 2,
      supplier: 'AquaClean Solutions',
      expiry_date: '2026-06-30',
      last_updated: new Date().toISOString(),
      status: 'low_stock',
    },
    {
      id: '3',
      name: 'Medical Officers',
      type: 'personnel',
      current_stock: 12,
      required_stock: 20,
      unit: 'officers',
      location: 'District Hospital',
      cost_per_unit: 50000,
      supplier: 'Health Department',
      last_updated: new Date().toISOString(),
      status: 'available',
    },
    {
      id: '4',
      name: 'Water Testing Kits',
      type: 'equipment',
      current_stock: 15,
      required_stock: 30,
      unit: 'kits',
      location: 'Public Health Lab',
      cost_per_unit: 1200,
      supplier: 'LabTech Equipment',
      expiry_date: '2027-03-15',
      last_updated: new Date().toISOString(),
      status: 'available',
    },
    {
      id: '5',
      name: 'Antibiotics (Ciprofloxacin)',
      type: 'medicine',
      current_stock: 0,
      required_stock: 1000,
      unit: 'tablets',
      location: 'District Medical Store',
      cost_per_unit: 8,
      supplier: 'Pharma Solutions',
      expiry_date: '2025-09-30',
      last_updated: new Date().toISOString(),
      status: 'out_of_stock',
    },
    {
      id: '6',
      name: 'Portable Generators',
      type: 'equipment',
      current_stock: 5,
      required_stock: 10,
      unit: 'units',
      location: 'Equipment Warehouse',
      cost_per_unit: 25000,
      supplier: 'PowerGen Industries',
      last_updated: new Date().toISOString(),
      status: 'available',
    },
  ];

  const deployments: Deployment[] = [
    {
      id: '1',
      village_id: '1',
      resource_type: 'ORS Packets',
      quantity: 500,
      deployed_date: new Date().toISOString(),
      expected_arrival: new Date(Date.now() + 86400000).toISOString(),
      status: 'in_transit',
      priority: 'critical',
      assigned_personnel: 'Dr. Anita Sharma',
      transport_method: 'vehicle',
      cost: 7500,
    },
    {
      id: '2',
      village_id: '5',
      resource_type: 'Medical Officers',
      quantity: 2,
      deployed_date: new Date(Date.now() - 86400000).toISOString(),
      expected_arrival: new Date(Date.now() - 43200000).toISOString(),
      status: 'deployed',
      priority: 'high',
      assigned_personnel: 'Health Team Alpha',
      transport_method: 'helicopter',
      cost: 15000,
    },
    {
      id: '3',
      village_id: '2',
      resource_type: 'Water Testing Kits',
      quantity: 3,
      deployed_date: new Date(Date.now() + 172800000).toISOString(),
      expected_arrival: new Date(Date.now() + 259200000).toISOString(),
      status: 'planned',
      priority: 'medium',
      assigned_personnel: 'Lab Technician Team',
      transport_method: 'vehicle',
      cost: 3600,
    },
  ];

  const emergencyKits: EmergencyKit[] = [
    {
      id: '1',
      name: 'Cholera Response Kit',
      contents: ['ORS Packets (200)', 'IV Fluids (50)', 'Antibiotics (100)', 'Disinfectants (10L)'],
      villages_covered: 3,
      last_deployed: '2024-01-15',
      status: 'ready',
    },
    {
      id: '2',
      name: 'Water Contamination Kit',
      contents: ['Water Testing Kits (5)', 'Purification Tablets (1000)', 'Portable Filters (10)'],
      villages_covered: 5,
      last_deployed: '2024-01-10',
      status: 'deployed',
    },
    {
      id: '3',
      name: 'Emergency Medical Kit',
      contents: ['First Aid Supplies', 'Basic Medicines', 'Medical Equipment', 'Communication Device'],
      villages_covered: 2,
      last_deployed: '2024-01-20',
      status: 'maintenance',
    },
  ];

  const getStockStatus = (current: number, required: number) => {
    const percentage = (current / required) * 100;
    if (current === 0) return { status: 'out_of_stock', color: 'danger', text: 'Out of Stock' };
    if (percentage < 25) return { status: 'critical', color: 'danger', text: 'Critical' };
    if (percentage < 50) return { status: 'low', color: 'warning', text: 'Low Stock' };
    if (percentage < 80) return { status: 'adequate', color: 'info', text: 'Adequate' };
    return { status: 'good', color: 'success', text: 'Good Stock' };
  };

  const getVillageName = (villageId: string) => {
    const village = villages.find(v => v.id === villageId);
    return village ? village.name : 'Unknown Village';
  };

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'medicine':
        return '💊';
      case 'equipment':
        return '🔬';
      case 'personnel':
        return '👨‍⚕️';
      case 'supplies':
        return '📦';
      default:
        return '📋';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || resource.type === filterType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6">
        <PageHeader
          title={t('resources')}
          subtitle="Comprehensive resource management for health emergency response"
        />

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'inventory', name: 'Inventory', icon: Package },
                { id: 'deployments', name: 'Deployments', icon: Truck },
                { id: 'planning', name: 'Planning', icon: Users },
                { id: 'analytics', name: 'Analytics', icon: BarChart3 },
                { id: 'emergency', name: 'Emergency Kits', icon: Zap },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Inventory Tab */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-900">Resource Inventory</h2>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="medicine">Medicine</option>
                  <option value="equipment">Equipment</option>
                  <option value="personnel">Personnel</option>
                  <option value="supplies">Supplies</option>
                </select>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Resource</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>

            {/* Resource Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Resources</p>
                      <p className="text-3xl font-bold text-gray-900">{resources.length}</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                      <p className="text-3xl font-bold text-yellow-600">
                        {resources.filter(r => r.status === 'low_stock').length}
                      </p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                      <p className="text-3xl font-bold text-red-600">
                        {resources.filter(r => r.status === 'out_of_stock').length}
                      </p>
                    </div>
                    <XCircle className="w-8 h-8 text-red-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Value</p>
                      <p className="text-3xl font-bold text-green-600">
                        ₹{resources.reduce((sum, r) => sum + (r.current_stock * r.cost_per_unit), 0).toLocaleString()}
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => {
                const stockStatus = getStockStatus(resource.current_stock, resource.required_stock);
                return (
                  <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-2xl">{getResourceIcon(resource.type)}</div>
                        <div className="flex space-x-2">
                          <Badge variant={stockStatus.color as any}>
                            {stockStatus.text}
                          </Badge>
                          <Button size="sm" variant="ghost" className="p-1">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <h3 className="font-semibold text-gray-900 mb-2">{resource.name}</h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Current Stock:</span>
                          <span className="font-medium">{resource.current_stock} {resource.unit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Required:</span>
                          <span className="font-medium">{resource.required_stock} {resource.unit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Cost per unit:</span>
                          <span className="font-medium">₹{resource.cost_per_unit}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Supplier:</span>
                          <span className="font-medium text-xs">{resource.supplier}</span>
                        </div>
                        {resource.expiry_date && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Expires:</span>
                            <span className="font-medium text-xs">
                              {new Date(resource.expiry_date).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div
                          className={`h-2 rounded-full ${stockStatus.status === 'out_of_stock' ? 'bg-red-500' :
                            stockStatus.status === 'critical' ? 'bg-red-500' :
                              stockStatus.status === 'low' ? 'bg-yellow-500' :
                                stockStatus.status === 'adequate' ? 'bg-blue-500' :
                                  'bg-green-500'
                            }`}
                          style={{
                            width: `${Math.min(100, (resource.current_stock / resource.required_stock) * 100)}%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-xs text-gray-500">
                          {Math.round((resource.current_stock / resource.required_stock) * 100)}% of required
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            Reorder
                          </Button>
                          <Button size="sm">
                            Deploy
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Resource Analytics & Insights</h2>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span>Usage Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">ORS Packets</span>
                      <span className="text-sm font-medium text-red-600">↑ 45% this month</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Water Test Kits</span>
                      <span className="text-sm font-medium text-green-600">↓ 12% this month</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Medical Officers</span>
                      <span className="text-sm font-medium text-blue-600">→ Stable</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <span>Efficiency Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Deployment Speed</span>
                      <span className="text-sm font-medium">2.3 days avg</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Success Rate</span>
                      <span className="text-sm font-medium text-green-600">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Cost Efficiency</span>
                      <span className="text-sm font-medium text-blue-600">₹1,250/village</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span>Predictions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Next Month Demand</span>
                      <span className="text-sm font-medium text-orange-600">↑ 23% increase</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Budget Required</span>
                      <span className="text-sm font-medium">₹2.4L additional</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Critical Shortage Risk</span>
                      <span className="text-sm font-medium text-red-600">High (3 items)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resource Utilization Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Resource utilization chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Emergency Kits Tab */}
        {activeTab === 'emergency' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Emergency Response Kits</h2>
              <Button className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Emergency Kit</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {emergencyKits.map((kit) => (
                <Card key={kit.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl">🚨</div>
                      <Badge
                        variant={
                          kit.status === 'ready' ? 'success' :
                            kit.status === 'deployed' ? 'warning' :
                              'default'
                        }
                      >
                        {kit.status.toUpperCase()}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-3">{kit.name}</h3>

                    <div className="space-y-2 mb-4">
                      <div className="text-sm font-medium text-gray-700">Contents:</div>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {kit.contents.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Villages Covered:</span>
                        <span className="font-medium">{kit.villages_covered}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Last Deployed:</span>
                        <span className="font-medium">{new Date(kit.last_deployed).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit Kit
                      </Button>
                      <Button size="sm" className="flex-1" disabled={kit.status === 'deployed'}>
                        Deploy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Deployments Tab - Enhanced */}
        {activeTab === 'deployments' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Resource Deployments</h2>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </Button>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>New Deployment</span>
                </Button>
              </div>
            </div>

            {/* Deployment Status Summary */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              {[
                { status: 'planned', count: 3, color: 'bg-blue-100 text-blue-800' },
                { status: 'in_transit', count: 1, color: 'bg-yellow-100 text-yellow-800' },
                { status: 'deployed', count: 2, color: 'bg-green-100 text-green-800' },
                { status: 'completed', count: 8, color: 'bg-gray-100 text-gray-800' },
                { status: 'cancelled', count: 1, color: 'bg-red-100 text-red-800' },
              ].map((item) => (
                <div key={item.status} className={`p-4 rounded-lg ${item.color}`}>
                  <div className="text-2xl font-bold">{item.count}</div>
                  <div className="text-sm font-medium capitalize">{item.status.replace('_', ' ')}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {deployments.map((deployment) => (
                <Card key={deployment.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Truck className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">
                          {deployment.resource_type} Deployment
                        </h3>
                        <Badge
                          variant={
                            deployment.priority === 'critical' ? 'danger' :
                              deployment.priority === 'high' ? 'warning' :
                                'info'
                          }
                        >
                          {deployment.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <Badge
                        variant={
                          deployment.status === 'completed' ? 'success' :
                            deployment.status === 'deployed' ? 'info' :
                              deployment.status === 'in_transit' ? 'warning' :
                                deployment.status === 'cancelled' ? 'danger' :
                                  'default'
                        }
                      >
                        {deployment.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <span className="text-gray-600">Destination:</span>
                        <p className="font-medium">{getVillageName(deployment.village_id)}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Quantity:</span>
                        <p className="font-medium">{deployment.quantity}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Deployed:</span>
                        <p className="font-medium">{new Date(deployment.deployed_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Expected Arrival:</span>
                        <p className="font-medium">{new Date(deployment.expected_arrival).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Personnel:</span>
                        <p className="font-medium">{deployment.assigned_personnel}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Transport:</span>
                        <p className="font-medium capitalize">{deployment.transport_method}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Cost:</span>
                        <p className="font-medium">₹{deployment.cost.toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          Track
                        </Button>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>
                          {deployment.status === 'planned' ? '0%' :
                            deployment.status === 'in_transit' ? '50%' :
                              deployment.status === 'deployed' ? '75%' :
                                deployment.status === 'completed' ? '100%' : '0%'}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${deployment.status === 'completed' ? 'bg-green-500' :
                            deployment.status === 'deployed' ? 'bg-blue-500' :
                              deployment.status === 'in_transit' ? 'bg-yellow-500' :
                                'bg-gray-400'
                            }`}
                          style={{
                            width: deployment.status === 'planned' ? '0%' :
                              deployment.status === 'in_transit' ? '50%' :
                                deployment.status === 'deployed' ? '75%' :
                                  deployment.status === 'completed' ? '100%' : '0%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Planning Tab - Enhanced */}
        {activeTab === 'planning' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Strategic Resource Planning</h2>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="p-4 h-auto flex flex-col items-center space-y-2">
                <Target className="w-6 h-6" />
                <span>Auto-Allocate Resources</span>
              </Button>
              <Button variant="outline" className="p-4 h-auto flex flex-col items-center space-y-2">
                <Activity className="w-6 h-6" />
                <span>Generate Forecast</span>
              </Button>
              <Button variant="outline" className="p-4 h-auto flex flex-col items-center space-y-2">
                <Upload className="w-6 h-6" />
                <span>Import Requirements</span>
              </Button>
              <Button variant="outline" className="p-4 h-auto flex flex-col items-center space-y-2">
                <Download className="w-6 h-6" />
                <span>Export Plan</span>
              </Button>
            </div>

            {/* High Priority Villages */}
            <Card>
              <CardHeader>
                <CardTitle>High Priority Villages - Immediate Action Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {villages
                    .filter(v => v.risk_level === 'high')
                    .map(village => (
                      <div key={village.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                        <div className="flex-1">
                          <h4 className="font-medium text-red-800">{village.name}</h4>
                          <p className="text-sm text-red-600">
                            Population: {village.population.toLocaleString()} | District: {village.district}
                          </p>
                          <div className="mt-2 flex space-x-4 text-xs text-red-700">
                            <span>• Estimated ORS needed: {Math.ceil(village.population * 0.05)}</span>
                            <span>• Medical officers required: {Math.ceil(village.population / 5000)}</span>
                            <span>• Water test kits: {Math.ceil(village.population / 2000)}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm">
                            Auto-Deploy
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Resource Allocation Matrix */}
            <Card>
              <CardHeader>
                <CardTitle>Resource Allocation Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Village</th>
                        <th className="text-left py-2">Risk Level</th>
                        <th className="text-left py-2">Population</th>
                        <th className="text-left py-2">Medical Staff</th>
                        <th className="text-left py-2">Medicines</th>
                        <th className="text-left py-2">Equipment</th>
                        <th className="text-left py-2">Estimated Cost</th>
                        <th className="text-left py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {villages.slice(0, 5).map(village => {
                        const estimatedCost = village.risk_level === 'high' ? 50000 :
                          village.risk_level === 'medium' ? 25000 : 10000;
                        return (
                          <tr key={village.id} className="border-b">
                            <td className="py-3 font-medium">{village.name}</td>
                            <td className="py-3">
                              <Badge
                                variant={
                                  village.risk_level === 'high' ? 'danger' :
                                    village.risk_level === 'medium' ? 'warning' :
                                      'success'
                                }
                              >
                                {village.risk_level}
                              </Badge>
                            </td>
                            <td className="py-3">{village.population.toLocaleString()}</td>
                            <td className="py-3">
                              {village.risk_level === 'high' ? '2 needed' :
                                village.risk_level === 'medium' ? '1 needed' :
                                  'Adequate'}
                            </td>
                            <td className="py-3">
                              {village.risk_level === 'high' ? '500 ORS' :
                                village.risk_level === 'medium' ? '200 ORS' :
                                  'Standard stock'}
                            </td>
                            <td className="py-3">
                              {village.risk_level === 'high' ? '2 test kits' :
                                village.risk_level === 'medium' ? '1 test kit' :
                                  'Adequate'}
                            </td>
                            <td className="py-3 font-medium">₹{estimatedCost.toLocaleString()}</td>
                            <td className="py-3">
                              <Button size="sm" variant="outline">
                                Plan Deployment
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Budget Planning */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Planning & Forecasting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">₹12.5L</div>
                    <div className="text-sm text-blue-700">Current Month Budget</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">₹8.2L</div>
                    <div className="text-sm text-green-700">Spent This Month</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">₹15.8L</div>
                    <div className="text-sm text-orange-700">Next Month Forecast</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcePlanning;