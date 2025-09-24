import React from 'react';
import { X, Link, Twitter, Facebook, Mail } from 'lucide-react';
import { Recipe } from '../types/Recipe';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, recipe }) => {
  if (!isOpen || !recipe) return null;

  const recipeText = `${recipe.name} - ${recipe.description}`;
  const recipeData = {
    name: recipe.name,
    description: recipe.description,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    servings: recipe.servings,
    category: recipe.category,
    difficulty: recipe.difficulty,
    rating: recipe.rating,
    tags: recipe.tags
  };

  const handleCopyLink = async () => {
    const recipeJson = JSON.stringify(recipeData, null, 2);
    try {
      await navigator.clipboard.writeText(recipeJson);
      alert('Recipe data copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(`Check out this ${recipe.difficulty.toLowerCase()} ${recipe.category.toLowerCase()} recipe: ${recipe.name}!`);
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, '_blank');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(recipeText)}`;
    window.open(url, '_blank');
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(`Recipe: ${recipe.name}`);
    const body = encodeURIComponent(`
I wanted to share this ${recipe.difficulty.toLowerCase()} ${recipe.category.toLowerCase()} recipe with you:

${recipe.name}
${recipe.description}

Prep Time: ${recipe.prepTime} minutes
Cook Time: ${recipe.cookTime} minutes
Servings: ${recipe.servings}
Difficulty: ${recipe.difficulty}

Ingredients:
${recipe.ingredients.map((ingredient, index) => `${index + 1}. ${ingredient}`).join('\n')}

Instructions:
${recipe.instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join('\n\n')}

Tags: ${recipe.tags.join(', ')}
    `);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Share Recipe</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{recipe.name}</h3>
            <p className="text-gray-600 text-sm">{recipe.description}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Link className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Copy Recipe Data</div>
                <div className="text-sm text-gray-600">Copy JSON data to clipboard</div>
              </div>
            </button>

            <button
              onClick={handleShareTwitter}
              className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-blue-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Twitter className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Share on Twitter</div>
                <div className="text-sm text-gray-600">Tweet about this recipe</div>
              </div>
            </button>

            <button
              onClick={handleShareFacebook}
              className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-blue-50 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Facebook className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Share on Facebook</div>
                <div className="text-sm text-gray-600">Post to your timeline</div>
              </div>
            </button>

            <button
              onClick={handleShareEmail}
              className="w-full flex items-center space-x-3 p-4 border border-gray-200 rounded-xl hover:bg-green-50 transition-colors"
            >
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-gray-900">Share via Email</div>
                <div className="text-sm text-gray-600">Send recipe by email</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};