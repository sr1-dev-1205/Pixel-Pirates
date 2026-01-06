import React, { useState, useEffect } from 'react';
import { X, FileText, AlertTriangle } from 'lucide-react';
import { Village } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';

interface HealthReportFormProps {
    villages: Village[];
    onSubmit: (data: any) => void;
    onClose: () => void;
}

const HealthReportForm: React.FC<HealthReportFormProps> = ({
    villages,
    onSubmit,
    onClose,
}) => {
    const [formData, setFormData] = useState({
        village_id: '',
        reporter_id: 'asha_worker_1',
        report_date: new Date().toISOString().split('T')[0],
        symptoms: {
            diarrhea: 0,
            fever: 0,
            vomiting: 0,
            dehydration: 0,
        },
        total_cases: 0,
        notes: '',
    });

    const [warnings, setWarnings] = useState<string[]>([]);

    // Auto-calculate risk warnings
    useEffect(() => {
        const newWarnings = [];
        if (formData.symptoms.diarrhea > 10) newWarnings.push('High diarrhea cases detected - Potential Cholera risk');
        if (formData.symptoms.vomiting > 10) newWarnings.push('High vomiting cases detected');
        if (formData.symptoms.dehydration > 5) newWarnings.push('Significant dehydration cases');
        if (formData.total_cases > 30) newWarnings.push('Unusually high total cases for one day');
        setWarnings(newWarnings);
    }, [formData.symptoms, formData.total_cases]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSymptomChange = (symptom: string, value: number) => {
        setFormData(prev => ({
            ...prev,
            symptoms: {
                ...prev.symptoms,
                [symptom]: Math.max(0, value)
            }
        }));
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <span>New Daily Health Report</span>
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
                                    Report Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.report_date}
                                    onChange={(e) => handleChange('report_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Total Cases */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Total Patients Seen Today
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={formData.total_cases}
                                onChange={(e) => handleChange('total_cases', parseInt(e.target.value) || 0)}
                                className="w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
                                required
                            />
                            <p className="text-xs text-blue-600 mt-1">
                                Enter total number of individuals reporting illness today.
                            </p>
                        </div>

                        {/* Symptoms Breakdown */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Symptom Breakdown</h3>
                            <p className="text-sm text-gray-500 -mt-2">Enter number of cases for each symptom.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Diarrhea
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.symptoms.diarrhea}
                                        onChange={(e) => handleSymptomChange('diarrhea', parseInt(e.target.value) || 0)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Fever
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.symptoms.fever}
                                        onChange={(e) => handleSymptomChange('fever', parseInt(e.target.value) || 0)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Vomiting
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.symptoms.vomiting}
                                        onChange={(e) => handleSymptomChange('vomiting', parseInt(e.target.value) || 0)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Dehydration
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={formData.symptoms.dehydration}
                                        onChange={(e) => handleSymptomChange('dehydration', parseInt(e.target.value) || 0)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Field Notes
                            </label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => handleChange('notes', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Any additional observations..."
                            />
                        </div>

                        {/* Dynamic Warnings */}
                        {warnings.length > 0 && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                                <div className="flex items-start space-x-3">
                                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                                    <div>
                                        <h4 className="text-sm font-medium text-red-800">Risk Warning</h4>
                                        <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
                                            {warnings.map((w, i) => (
                                                <li key={i}>{w}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-3 pt-4 border-t">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Submit Report
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default HealthReportForm;
