import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = "Processing..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="h-12 w-12 text-white animate-spin mb-4" />
      <p className="text-white text-lg font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
