import React from 'react';
import { X, Star, Clock, Users } from 'lucide-react';

export interface FilterState {
  category: string;
  difficulty: string;
  minRating: number;
  maxPrepTime: number;
  maxCookTime: number;
  servings: number;
  showFavoritesOnly: boolean;
  tags: string[];
}

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableTags: string[];
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFiltersChange,
  availableTags
}) => {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: '',
      difficulty: '',
      minRating: 0,
      maxPrepTime: 0,
      maxCookTime: 0,
      servings: 0,
      showFavoritesOnly: false,
      tags: []
    });
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    updateFilter('tags', newTags);
  };

  const hasActiveFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'tags') return (value as string[]).length > 0;
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') return value !== '';
    return value > 0;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center space-x-2 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Category & Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => updateFilter('category', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">All Categories</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="dessert">Dessert</option>
              <option value="appetizer">Appetizer</option>
              <option value="snack">Snack</option>
              <option value="beverage">Beverage</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
            <select
              value={filters.difficulty}
              onChange={(e) => updateFilter('difficulty', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Rating: {filters.minRating > 0 ? filters.minRating : 'Any'}
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={filters.minRating}
              onChange={(e) => updateFilter('minRating', parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(filters.minRating / 5) * 100}%, #e5e7eb ${(filters.minRating / 5) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-medium text-gray-700">{filters.minRating}</span>
            </div>
          </div>
        </div>

        {/* Time Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Prep Time: {filters.maxPrepTime > 0 ? `${filters.maxPrepTime} min` : 'Any'}
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="180"
                step="15"
                value={filters.maxPrepTime}
                onChange={(e) => updateFilter('maxPrepTime', parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <Clock className="w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Cook Time: {filters.maxCookTime > 0 ? `${filters.maxCookTime} min` : 'Any'}
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="240"
                step="15"
                value={filters.maxCookTime}
                onChange={(e) => updateFilter('maxCookTime', parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <Clock className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Servings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Servings: {filters.servings > 0 ? filters.servings : 'Any'}
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="0"
              max="12"
              step="1"
              value={filters.servings}
              onChange={(e) => updateFilter('servings', parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">{filters.servings}</span>
            </div>
          </div>
        </div>

        {/* Favorites Only */}
        <div>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.showFavoritesOnly}
              onChange={(e) => updateFilter('showFavoritesOnly', e.target.checked)}
              className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-2 focus:ring-orange-500"
            />
            <span className="text-sm font-medium text-gray-700">Show favorites only</span>
          </label>
        </div>

        {/* Tags */}
        {availableTags.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Tags</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.tags.includes(tag)
                      ? 'bg-orange-100 text-orange-800 border-2 border-orange-300'
                      : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                Category: {filters.category}
              </span>
            )}
            {filters.difficulty && (
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                Difficulty: {filters.difficulty}
              </span>
            )}
            {filters.minRating > 0 && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                Rating: ≥{filters.minRating}★
              </span>
            )}
            {filters.maxPrepTime > 0 && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                Prep: ≤{filters.maxPrepTime}min
              </span>
            )}
            {filters.maxCookTime > 0 && (
              <span className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-xs">
                Cook: ≤{filters.maxCookTime}min
              </span>
            )}
            {filters.servings > 0 && (
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                Serves: {filters.servings}
              </span>
            )}
            {filters.showFavoritesOnly && (
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                Favorites
              </span>
            )}
            {filters.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                Tag: {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};