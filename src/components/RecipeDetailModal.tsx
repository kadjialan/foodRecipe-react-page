import React from 'react';
import { X, Clock, Users, ChefHat } from 'lucide-react';
import { Recipe } from '../types/Recipe';
import { StarRating } from './StarRating';

interface RecipeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ 
  isOpen, 
  onClose, 
  recipe 
}) => {
  if (!isOpen || !recipe) return null;

  const getCategoryColor = (category: string) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
    ];
    const hash = category.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length] || 'bg-gray-100 text-gray-800';
  };

  const formatCategory = (category: string) => {
    if (!category) return 'Main Course';
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl">
          <div className="h-64 relative overflow-hidden rounded-t-2xl">
            {recipe.image ? (
              <img 
                src={recipe.image} 
                alt={recipe.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
            ) : null}
            <div className={`absolute inset-0 bg-gradient-to-br from-orange-400 to-rose-400 ${recipe.image ? 'hidden' : ''}`}></div>
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{recipe.name}</h1>
                  <p className="text-white text-opacity-90 text-lg">{recipe.description}</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(recipe.category)}`}>
                  {formatCategory(recipe.category)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-orange-50 p-4 rounded-xl text-center">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Prep Time</div>
              <div className="text-xl font-bold text-gray-900">{recipe.prepTime}m</div>
            </div>
            <div className="bg-emerald-50 p-4 rounded-xl text-center">
              <Clock className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Cook Time</div>
              <div className="text-xl font-bold text-gray-900">{recipe.cookTime}m</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-sm text-gray-600">Servings</div>
              <div className="text-xl font-bold text-gray-900">{recipe.servings}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl text-center">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white text-sm font-bold">{formatCategory(recipe.category).charAt(0)}</span>
              </div>
              <div className="text-sm text-gray-600">Category</div>
              <div className="text-xl font-bold text-gray-900">{formatCategory(recipe.category)}</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl text-center">
              <div className="mb-2">
                <StarRating rating={recipe.rating} readonly size="sm" />
              </div>
              <div className="text-sm text-gray-600">Rating</div>
              <div className="text-lg font-bold text-gray-900">{recipe.difficulty}</div>
            </div>
          </div>

          {recipe.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h3>
              <div className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h3>
              <div className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            Created on {recipe.createdAt.toLocaleDateString()} • 
            Last updated {recipe.updatedAt.toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};