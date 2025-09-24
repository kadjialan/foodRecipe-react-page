import React, { useState } from 'react';
import { Download, Upload, FileText, AlertCircle } from 'lucide-react';
import { Recipe } from '../types/Recipe';

interface ImportExportProps {
  recipes: Recipe[];
  onImport: (recipes: Recipe[]) => void;
}

export const ImportExport: React.FC<ImportExportProps> = ({ recipes, onImport }) => {
  const [isImporting, setIsImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const exportRecipes = () => {
    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      recipes: recipes
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `recipes-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importRecipes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);

        // Validate the imported data structure
        if (!data.recipes || !Array.isArray(data.recipes)) {
          throw new Error('Invalid file format: recipes array not found');
        }

        const importedRecipes: Recipe[] = data.recipes.map((recipe: any) => ({
          ...recipe,
          id: crypto.randomUUID(), // Generate new IDs to avoid conflicts
          createdAt: new Date(recipe.createdAt || new Date()),
          updatedAt: new Date(recipe.updatedAt || new Date()),
          // Ensure all required fields exist with defaults
          difficulty: recipe.difficulty || 'Medium',
          rating: recipe.rating || 0,
          isFavorite: recipe.isFavorite || false,
          category: recipe.category || 'Main Course',
          tags: recipe.tags || [],
          ingredients: recipe.ingredients || [],
          instructions: recipe.instructions || []
        }));

        // Validate each recipe has required fields
        for (const recipe of importedRecipes) {
          if (!recipe.name || !recipe.description) {
            throw new Error(`Invalid recipe: missing name or description`);
          }
        }

        onImport(importedRecipes);
        alert(`Successfully imported ${importedRecipes.length} recipes!`);
      } catch (error) {
        console.error('Import error:', error);
        setImportError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setIsImporting(false);
        event.target.value = ''; // Reset input
      }
    };

    reader.onerror = () => {
      setImportError('Error reading file');
      setIsImporting(false);
    };

    reader.readAsText(file);
  };

  const exportSingleRecipe = (recipe: Recipe) => {
    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      recipes: [recipe]
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${recipe.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <FileText className="w-5 h-5" />
        <span>Import & Export Recipes</span>
      </h3>

      <div className="space-y-4">
        {/* Export Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Export Recipes</h4>
          <p className="text-sm text-gray-600 mb-3">
            Download all your recipes as a JSON file for backup or sharing.
          </p>
          <button
            onClick={exportRecipes}
            disabled={recipes.length === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export All Recipes ({recipes.length})</span>
          </button>
        </div>

        {/* Import Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">Import Recipes</h4>
          <p className="text-sm text-gray-600 mb-3">
            Upload a JSON file containing recipes to add them to your collection.
          </p>

          <div className="space-y-3">
            <label
              htmlFor="recipe-import"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                isImporting
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>{isImporting ? 'Importing...' : 'Choose File'}</span>
            </label>

            <input
              id="recipe-import"
              type="file"
              accept=".json,application/json"
              onChange={importRecipes}
              disabled={isImporting}
              className="hidden"
            />

            {importError && (
              <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Import Error</p>
                  <p className="text-sm text-red-700">{importError}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Format Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-2">File Format</h4>
          <p className="text-sm text-gray-600">
            Import files should be JSON format containing a recipes array.
            Each recipe should have at minimum: name, description, ingredients, and instructions.
            The app will automatically generate IDs and set defaults for missing optional fields.
          </p>
        </div>
      </div>
    </div>
  );
};