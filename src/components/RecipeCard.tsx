import React from 'react';
import { Clock, Users, ChefHat, Edit, Trash2, Heart, Share2 } from 'lucide-react';
import { Recipe } from '../types/Recipe';
import { StarRating } from './StarRating';

interface RecipeCardProps {
  recipe: Recipe;
  onEdit: (recipe: Recipe) => void;
  onDelete: (recipe: Recipe) => void;
  onView: (recipe: Recipe) => void;
  onToggleFavorite: (recipe: Recipe) => void;
  onShare: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onEdit, onDelete, onView, onToggleFavorite, onShare }) => {
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default: 
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCategory = (category: string) => {
    if (!category) return 'Main Course';
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
      <div onClick={() => onView(recipe)}>
        <div className="h-48 relative overflow-hidden">
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
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white mb-1 truncate">{recipe.name}</h3>
            <p className="text-white text-opacity-90 text-sm line-clamp-2">{recipe.description}</p>
          </div>
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(recipe);
              }}
              className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                recipe.isFavorite
                  ? 'bg-red-500 text-white'
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              <Heart className={`w-5 h-5 ${recipe.isFavorite ? 'fill-current' : ''}`} />
            </button>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recipe.difficulty)} backdrop-blur-sm`}>
              {recipe.difficulty}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{recipe.prepTime + recipe.cookTime}m</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{recipe.servings}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {recipe.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {tag}
              </span>
            ))}
            {recipe.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{recipe.tags.length - 3} more
              </span>
            )}
          </div>
          
          <div className="mb-4">
            <StarRating rating={recipe.rating} readonly size="sm" />
          </div>

          <div className="text-sm text-gray-500 mb-4">
            <strong>{recipe.ingredients.length}</strong> ingredients • <strong>{recipe.instructions.length}</strong> steps
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(recipe);
            }}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare(recipe);
            }}
            className="flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(recipe);
          }}
          className="flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};