import React, { useState } from 'react';
import { FileText, Image as ImageIcon, Upload, X } from 'lucide-react';

const UploadPage = () => {
  const [documents, setDocuments] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDocuments(prev => [...prev, ...files]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(prev => [...prev, ...files]);
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-purple-800 mb-8">Upload Documents</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Documents Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Documents</h2>
          </div>
          
          <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center mb-6">
            <input
              type="file"
              id="document-upload"
              className="hidden"
              multiple
              accept=".doc,.docx,.pdf"
              onChange={handleDocumentUpload}
            />
            <label
              htmlFor="document-upload"
              className="cursor-pointer flex flex-col items-center gap-4"
            >
              <Upload className="w-12 h-12 text-purple-400" />
              <div>
                <p className="text-lg font-medium text-gray-700">
                  Upload Documents
                </p>
                <p className="text-sm text-gray-500">
                  Drag and drop or click to upload Word documents or PDFs
                </p>
              </div>
            </label>
          </div>

          {/* Document List */}
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-purple-50 p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <span className="text-gray-700 truncate">{doc.name}</span>
                </div>
                <button
                  onClick={() => removeDocument(index)}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Images Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Images</h2>
          </div>
          
          <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center mb-6">
            <input
              type="file"
              id="image-upload"
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center gap-4"
            >
              <Upload className="w-12 h-12 text-purple-400" />
              <div>
                <p className="text-lg font-medium text-gray-700">
                  Upload Images
                </p>
                <p className="text-sm text-gray-500">
                  Drag and drop or click to upload images
                </p>
              </div>
            </label>
          </div>

          {/* Image List */}
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-red-600" />
                </button>
                <p className="text-sm text-gray-600 mt-1 truncate">{image.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;