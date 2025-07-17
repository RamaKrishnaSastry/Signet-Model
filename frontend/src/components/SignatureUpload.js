import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image } from 'lucide-react';

const SignatureUpload = ({ onImageUpload, label, image, onClear }) => {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target.result;
        setPreview(result);
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp']
    },
    multiple: false
  });

  const handleClear = () => {
    setPreview(null);
    onClear();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      
      {preview || image ? (
        <div className="relative">
          <div className="signature-canvas active p-4 flex flex-col items-center justify-center min-h-48">
            <img 
              src={preview || image} 
              alt="Signature preview" 
              className="max-w-full max-h-40 object-contain rounded-lg"
            />
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`signature-canvas cursor-pointer p-8 flex flex-col items-center justify-center min-h-48 ${
            isDragActive ? 'active' : ''
          }`}
        >
          <input {...getInputProps()} />
          <Image className="h-12 w-12 text-gray-400 mb-4" />
          {isDragActive ? (
            <p className="text-gray-600 text-center">Drop the signature image here...</p>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-2">Drag & drop a signature image here</p>
              <p className="text-sm text-gray-500">or click to select</p>
              <div className="mt-4 flex items-center justify-center">
                <Upload className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">Upload Image</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SignatureUpload;
