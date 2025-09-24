import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Filter, ChefHat, Settings, Timer, FileText, Sliders } from 'lucide-react';
import { Recipe } from './types/Recipe';
import { getRecipes, addRecipe, updateRecipe, deleteRecipe } from './utils/localStorage';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { ShareModal } from './components/ShareModal';
import { CookingTimer } from './components/CookingTimer';
import { ImportExport } from './components/ImportExport';
import { AdvancedFilters, FilterState } from './components/AdvancedFilters';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);

  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
    category: '',
    difficulty: '',
    minRating: 0,
    maxPrepTime: 0,
    maxCookTime: 0,
    servings: 0,
    showFavoritesOnly: false,
    tags: []
  });

  useEffect(() => {
    const loadedRecipes = getRecipes();
    setRecipes(loadedRecipes);
  }, []);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    recipes.forEach(recipe => {
      recipe.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [recipes]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Basic search
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.ingredients.some(ingredient =>
                            ingredient.toLowerCase().includes(searchTerm.toLowerCase())
                          ) ||
                          recipe.tags.some(tag =>
                            tag.toLowerCase().includes(searchTerm.toLowerCase())
                          );

      if (!matchesSearch) return false;

      // Advanced filters
      if (advancedFilters.category && recipe.category.toLowerCase() !== advancedFilters.category.toLowerCase()) {
        return false;
      }

      if (advancedFilters.difficulty && recipe.difficulty !== advancedFilters.difficulty) {
        return false;
      }

      if (advancedFilters.minRating > 0 && recipe.rating < advancedFilters.minRating) {
        return false;
      }

      if (advancedFilters.maxPrepTime > 0 && recipe.prepTime > advancedFilters.maxPrepTime) {
        return false;
      }

      if (advancedFilters.maxCookTime > 0 && recipe.cookTime > advancedFilters.maxCookTime) {
        return false;
      }

      if (advancedFilters.servings > 0 && recipe.servings !== advancedFilters.servings) {
        return false;
      }

      if (advancedFilters.showFavoritesOnly && !recipe.isFavorite) {
        return false;
      }

      if (advancedFilters.tags.length > 0) {
        const hasMatchingTag = advancedFilters.tags.some(filterTag =>
          recipe.tags.includes(filterTag)
        );
        if (!hasMatchingTag) return false;
      }

      return true;
    });
  }, [recipes, searchTerm, advancedFilters]);

  const handleAddRecipe = (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRecipe = addRecipe(recipeData);
    setRecipes(prev => [...prev, newRecipe]);
  };

  const handleEditRecipe = (recipeData: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!selectedRecipe) return;
    
    const updatedRecipe = updateRecipe(selectedRecipe.id, recipeData);
    if (updatedRecipe) {
      setRecipes(prev => prev.map(recipe => 
        recipe.id === selectedRecipe.id ? updatedRecipe : recipe
      ));
    }
  };

  const handleDeleteRecipe = () => {
    if (!selectedRecipe) return;
    
    const success = deleteRecipe(selectedRecipe.id);
    if (success) {
      setRecipes(prev => prev.filter(recipe => recipe.id !== selectedRecipe.id));
    }
  };

  const openEditModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsEditModalOpen(true);
  };

  const openDetailModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDetailModalOpen(true);
  };

  const openDeleteModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsDeleteModalOpen(true);
  };

  const openShareModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsShareModalOpen(true);
  };

  const handleToggleFavorite = (recipe: Recipe) => {
    const updatedRecipe = updateRecipe(recipe.id, { isFavorite: !recipe.isFavorite });
    if (updatedRecipe) {
      setRecipes(prev => prev.map(r => r.id === recipe.id ? updatedRecipe : r));
    }
  };

  const handleImportRecipes = (importedRecipes: Recipe[]) => {
    setRecipes(prev => [...prev, ...importedRecipes]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-rose-400 rounded-2xl flex items-center justify-center">
                <ChefHat className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Recipe Collection</h1>
                <p className="text-gray-600">Discover and manage your favorite recipes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowTimer(!showTimer)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  showTimer ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Timer className="w-5 h-5" />
                <span>Timer</span>
              </button>

              <button
                onClick={() => setShowImportExport(!showImportExport)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  showImportExport ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>Import/Export</span>
              </button>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Add Recipe</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search recipes, ingredients, tags..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`flex items-center space-x-2 px-4 py-3 border rounded-xl transition-colors ${
              showAdvancedFilters
                ? 'border-orange-500 bg-orange-50 text-orange-700'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Sliders className="w-5 h-5" />
            <span>Advanced Filters</span>
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <AdvancedFilters
            filters={advancedFilters}
            onFiltersChange={setAdvancedFilters}
            availableTags={availableTags}
          />
        </div>
      )}

      {/* Timer */}
      {showTimer && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <CookingTimer
            initialTime={1500} // 25 minutes default
            label="Cooking Timer"
            onComplete={() => alert('Timer finished!')}
          />
        </div>
      )}

      {/* Import/Export */}
      {showImportExport && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <ImportExport recipes={recipes} onImport={handleImportRecipes} />
        </div>
      )}

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="bg-gradient-to-r from-orange-50 to-rose-50 rounded-2xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{recipes.length}</div>
              <div className="text-gray-600">Total Recipes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">{filteredRecipes.length}</div>
              <div className="text-gray-600">Matching Search</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">
                {recipes.reduce((acc, recipe) => acc + recipe.ingredients.length, 0)}
              </div>
              <div className="text-gray-600">Total Ingredients</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ChefHat className="w-12 h-12 text-gray-400" />
            </div>
            {recipes.length === 0 ? (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No recipes yet</h3>
                <p className="text-gray-600 mb-8">Start building your recipe collection by adding your first recipe!</p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Your First Recipe</span>
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No matching recipes</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                onView={openDetailModal}
                onToggleFavorite={handleToggleFavorite}
                onShare={openShareModal}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <RecipeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddRecipe}
        mode="add"
      />

      <RecipeModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedRecipe(null);
        }}
        onSave={handleEditRecipe}
        recipe={selectedRecipe || undefined}
        mode="edit"
      />

      <RecipeDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedRecipe(null);
        }}
        recipe={selectedRecipe}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRecipe(null);
        }}
        onConfirm={handleDeleteRecipe}
        recipe={selectedRecipe}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => {
          setIsShareModalOpen(false);
          setSelectedRecipe(null);
        }}
        recipe={selectedRecipe}
      />
    </div>
  );
}

export default App;