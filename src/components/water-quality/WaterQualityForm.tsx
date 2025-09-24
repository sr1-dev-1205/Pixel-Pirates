import React, { useState } from 'react';
import { X, Droplets } from 'lucide-react';
import { Village } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';

interface WaterQualityFormProps {
  villages: Village[];
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const WaterQualityForm: React.FC<WaterQualityFormProps> = ({
  villages,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    village_id: '',
    reporter_id: 'asha_worker_1',
    test_date: new Date().toISOString().split('T')[0],
    ph_level: 7.0,
    turbidity: 5.0,
    chlorine_level: 0.5,
    bacterial_presence: false,
    source_type: 'well' as 'well' | 'borehole' | 'surface' | 'piped',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span>New Water Quality Test</span>
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Village
                </label>
                <select
                  value={formData.village_id}
                  onChange={(e) => handleChange('village_id', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Village</option>
                  {villages.map(village => (
                    <option key={village.id} value={village.id}>
                      {village.name} - {village.district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Test Date
                </label>
                <input
                  type="date"
                  value={formData.test_date}
                  onChange={(e) => handleChange('test_date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water Source Type
              </label>
              <select
                value={formData.source_type}
                onChange={(e) => handleChange('source_type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="well">Well</option>
                <option value="borehole">Borehole</option>
                <option value="surface">Surface Water</option>
                <option value="piped">Piped Water</option>
              </select>
            </div>

            {/* Water Quality Parameters */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Water Quality Parameters</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    pH Level (6.5-8.5 is safe)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={formData.ph_level}
                    onChange={(e) => handleChange('ph_level', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    Current: {formData.ph_level} - {
                      formData.ph_level < 6.5 || formData.ph_level > 8.5 ? 
                      <span className="text-red-600">Outside safe range</span> :
                      <span className="text-green-600">Within safe range</span>
                    }
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Turbidity (NTU) (&lt;10 is acceptable)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.turbidity}
                    onChange={(e) => handleChange('turbidity', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    Current: {formData.turbidity} NTU - {
                      formData.turbidity > 10 ? 
                      <span className="text-red-600">High turbidity</span> :
                      <span className="text-green-600">Acceptable</span>
                    }
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chlorine Level (mg/L) (&gt;0.2 is safe)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={formData.chlorine_level}
                    onChange={(e) => handleChange('chlorine_level', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="mt-1 text-xs text-gray-500">
                    Current: {formData.chlorine_level} mg/L - {
                      formData.chlorine_level < 0.2 ? 
                      <span className="text-red-600">Low chlorine</span> :
                      <span className="text-green-600">Adequate</span>
                    }
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bacterial Presence
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="bacterial_presence"
                        checked={!formData.bacterial_presence}
                        onChange={() => handleChange('bacterial_presence', false)}
                        className="mr-2"
                      />
                      Not Detected
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="bacterial_presence"
                        checked={formData.bacterial_presence}
                        onChange={() => handleChange('bacterial_presence', true)}
                        className="mr-2"
                      />
                      Detected
                    </label>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    {formData.bacterial_presence ? 
                      <span className="text-red-600">Bacteria detected - unsafe</span> :
                      <span className="text-green-600">No bacteria detected</span>
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Overall Assessment */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Overall Assessment</h4>
              <div className="text-sm">
                {(() => {
                  const issues = [];
                  if (formData.ph_level < 6.5 || formData.ph_level > 8.5) issues.push('pH');
                  if (formData.turbidity > 10) issues.push('Turbidity');
                  if (formData.chlorine_level < 0.2) issues.push('Chlorine');
                  if (formData.bacterial_presence) issues.push('Bacteria');

                  if (issues.length === 0) {
                    return <span className="text-green-600 font-medium">✓ Water source appears safe</span>;
                  } else if (issues.length <= 2) {
                    return (
                      <span className="text-yellow-600 font-medium">
                        ⚠ Caution required - Issues with: {issues.join(', ')}
                      </span>
                    );
                  } else {
                    return (
                      <span className="text-red-600 font-medium">
                        ⚠ Unsafe water source - Multiple issues detected: {issues.join(', ')}
                      </span>
                    );
                  }
                })()}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Submit Water Test
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterQualityForm;