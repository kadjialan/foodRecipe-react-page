import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  placeholder = "Add recipe image"
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size should be less than 5MB.');
      return;
    }

    try {
      setIsLoading(true);
      const base64 = await handleFileToBase64(file);
      onChange(base64);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const clearImage = () => {
    onChange('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-700">Image URL:</span>
        <div className="flex-1 relative">
          <input
            type="url"
            value={value && !value.startsWith('data:') ? value : ''}
            onChange={handleUrlChange}
            placeholder="https://example.com/recipe-image.jpg"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          {value && (
            <button
              onClick={clearImage}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="text-center text-gray-500">or</div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          isDragOver
            ? 'border-orange-400 bg-orange-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
          id="image-upload"
          disabled={isLoading}
        />

        {value ? (
          <div className="space-y-4">
            <div className="relative inline-block">
              <img
                src={value}
                alt="Preview"
                className="max-w-full max-h-48 rounded-lg shadow-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <button
                onClick={clearImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <label
              htmlFor="image-upload"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 cursor-pointer transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Change Image</span>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                {isLoading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent"></div>
                ) : (
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="image-upload"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5" />
                <span>{isLoading ? 'Uploading...' : 'Upload Image'}</span>
              </label>
            </div>
            <p className="text-sm text-gray-500">
              Drop an image here, or click to browse<br />
              <span className="text-xs">Max size: 5MB • PNG, JPG, GIF</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};