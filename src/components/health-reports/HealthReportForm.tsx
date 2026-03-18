import React, { useState, useEffect } from 'react';
import { X, FileText, AlertTriangle, CheckCircle } from 'lucide-react';
import { Village } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

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

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [warnings, setWarnings] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Auto-calculate risk warnings
    useEffect(() => {
        const newWarnings = [];
        if (formData.symptoms.diarrhea > 10) newWarnings.push('High diarrhea cases detected - Potential Cholera risk');
        if (formData.symptoms.vomiting > 10) newWarnings.push('High vomiting cases detected');
        if (formData.symptoms.dehydration > 5) newWarnings.push('Significant dehydration cases');
        if (formData.total_cases > 30) newWarnings.push('Unusually high total cases for one day');
        
        // Check if symptoms sum exceeds total
        const symptomsSum = Object.values(formData.symptoms).reduce((sum, val) => sum + val, 0);
        if (symptomsSum > formData.total_cases && formData.total_cases > 0) {
            newWarnings.push('Sum of symptoms exceeds total cases - Please verify data');
        }
        
        setWarnings(newWarnings);
    }, [formData.symptoms, formData.total_cases]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        
        if (!formData.village_id) {
            newErrors.village_id = 'Please select a village';
        }
        
        if (!formData.report_date) {
            newErrors.report_date = 'Report date is required';
        }
        
        if (formData.total_cases < 0) {
            newErrors.total_cases = 'Total cases cannot be negative';
        }
        
        Object.entries(formData.symptoms).forEach(([symptom, value]) => {
            if (value < 0) {
                newErrors[`symptoms.${symptom}`] = `${symptom} cannot be negative`;
            }
            if (value > formData.total_cases && formData.total_cases > 0) {
                newErrors[`symptoms.${symptom}`] = `${symptom} cases cannot exceed total cases`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsSubmitting(true);
        
        try {
            await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
            onSubmit(formData);
            toast.success('Health report submitted successfully!');
            onClose();
        } catch (error) {
            toast.error('Failed to submit report. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSymptomChange = (symptom: string, value: number) => {
        const newValue = Math.max(0, value);
        setFormData(prev => ({
            ...prev,
            symptoms: {
                ...prev.symptoms,
                [symptom]: newValue
            }
        }));
        
        const errorKey = `symptoms.${symptom}`;
        if (errors[errorKey]) {
            setErrors(prev => ({ ...prev, [errorKey]: '' }));
        }
    };

    const symptomsSum = Object.values(formData.symptoms).reduce((sum, val) => sum + val, 0);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <Card className="w-full max-w-3xl my-8 mx-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
                <CardHeader className="sticky top-0 bg-white border-b z-10">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <span>New Daily Health Report</span>
                        </CardTitle>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={onClose}
                            disabled={isSubmitting}
                            aria-label="Close form"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-2">
                                    Village <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="village"
                                    value={formData.village_id}
                                    onChange={(e) => handleChange('village_id', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.village_id ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    required
                                    disabled={isSubmitting}
                                >
                                    <option value="">Select Village</option>
                                    {villages.map(village => (
                                        <option key={village.id} value={village.id}>
                                            {village.name} - {village.district}
                                        </option>
                                    ))}
                                </select>
                                {errors.village_id && (
                                    <p className="mt-1 text-xs text-red-600">{errors.village_id}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="report_date" className="block text-sm font-medium text-gray-700 mb-2">
                                    Report Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="report_date"
                                    type="date"
                                    value={formData.report_date}
                                    onChange={(e) => handleChange('report_date', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                        errors.report_date ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    required
                                    disabled={isSubmitting}
                                />
                                {errors.report_date && (
                                    <p className="mt-1 text-xs text-red-600">{errors.report_date}</p>
                                )}
                            </div>
                        </div>

                        {/* Total Cases */}
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <label htmlFor="total_cases" className="block text-sm font-medium text-gray-900 mb-2">
                                Total Patients Seen Today <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="total_cases"
                                type="number"
                                min="0"
                                value={formData.total_cases}
                                onChange={(e) => handleChange('total_cases', parseInt(e.target.value) || 0)}
                                className={`w-full px-3 py-2 border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold ${
                                    errors.total_cases ? 'border-red-500' : ''
                                }`}
                                required
                                disabled={isSubmitting}
                            />
                            <p className="text-xs text-blue-600 mt-1">
                                Enter total number of individuals reporting illness today.
                            </p>
                            {errors.total_cases && (
                                <p className="mt-1 text-xs text-red-600">{errors.total_cases}</p>
                            )}
                        </div>

                        {/* Symptoms Breakdown */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Symptom Breakdown</h3>
                            <p className="text-sm text-gray-500 -mt-2">
                                Enter number of cases for each symptom. Total: <span className="font-semibold">{symptomsSum}</span>
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="diarrhea" className="block text-sm font-medium text-gray-700 mb-2">
                                        Diarrhea
                                    </label>
                                    <input
                                        id="diarrhea"
                                        type="number"
                                        min="0"
                                        value={formData.symptoms.diarrhea}
                                        onChange={(e) => handleSymptomChange('diarrhea', parseInt(e.target.value) || 0)}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${
                                            errors['symptoms.diarrhea'] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        disabled={isSubmitting}
                                    />
                                    {errors['symptoms.diarrhea'] && (
                                        <p className="mt-1 text-xs text-red-600">{errors['symptoms.diarrhea']}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="fever" className="block text-sm font-medium text-gray-700 mb-2">
                                        Fever
                                    </label>
                                    <input
                                        id="fever"
                                        type="number"
                                        min="0"
                                        value={formData.symptoms.fever}
                                        onChange={(e) => handleSymptomChange('fever', parseInt(e.target.value) || 0)}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                            errors['symptoms.fever'] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        disabled={isSubmitting}
                                    />
                                    {errors['symptoms.fever'] && (
                                        <p className="mt-1 text-xs text-red-600">{errors['symptoms.fever']}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="vomiting" className="block text-sm font-medium text-gray-700 mb-2">
                                        Vomiting
                                    </label>
                                    <input
                                        id="vomiting"
                                        type="number"
                                        min="0"
                                        value={formData.symptoms.vomiting}
                                        onChange={(e) => handleSymptomChange('vomiting', parseInt(e.target.value) || 0)}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                                            errors['symptoms.vomiting'] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        disabled={isSubmitting}
                                    />
                                    {errors['symptoms.vomiting'] && (
                                        <p className="mt-1 text-xs text-red-600">{errors['symptoms.vomiting']}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="dehydration" className="block text-sm font-medium text-gray-700 mb-2">
                                        Dehydration
                                    </label>
                                    <input
                                        id="dehydration"
                                        type="number"
                                        min="0"
                                        value={formData.symptoms.dehydration}
                                        onChange={(e) => handleSymptomChange('dehydration', parseInt(e.target.value) || 0)}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                            errors['symptoms.dehydration'] ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        disabled={isSubmitting}
                                    />
                                    {errors['symptoms.dehydration'] && (
                                        <p className="mt-1 text-xs text-red-600">{errors['symptoms.dehydration']}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                                Field Notes
                            </label>
                            <textarea
                                id="notes"
                                value={formData.notes}
                                onChange={(e) => handleChange('notes', e.target.value)}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Any additional observations..."
                                disabled={isSubmitting}
                            />
                        </div>

                        {/* Dynamic Warnings */}
                        {warnings.length > 0 && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                                <div className="flex items-start space-x-3">
                                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-red-800">Risk Warning</h4>
                                        <ul className="mt-1 text-sm text-red-700 list-disc list-inside space-y-1">
                                            {warnings.map((w, i) => (
                                                <li key={i}>{w}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Success Message Preview */}
                        {warnings.length === 0 && formData.total_cases > 0 && (
                            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-sm font-medium text-green-800">Data Looks Good</h4>
                                        <p className="text-sm text-green-700 mt-1">
                                            No unusual patterns detected. Ready to submit.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="w-full sm:w-auto"
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                loading={isSubmitting}
                                className="w-full sm:w-auto"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Report'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default HealthReportForm;
