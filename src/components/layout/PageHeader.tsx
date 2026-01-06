import React from 'react';
import { useLayout } from '../../contexts/LayoutContext';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, action }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 animate-in slide-in-from-top-2 duration-300">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    {title}
                </h1>
                {subtitle && (
                    <p className="text-sm md:text-base text-gray-500 mt-1 font-medium">
                        {subtitle}
                    </p>
                )}
            </div>
            {action && (
                <div className="flex-shrink-0">
                    {action}
                </div>
            )}
        </div>
    );
};

export default PageHeader;
