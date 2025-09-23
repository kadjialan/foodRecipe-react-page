import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Filter, ChefHat } from 'lucide-react';
import { Recipe } from './types/Recipe';
import { getRecipes, addRecipe, updateRecipe, deleteRecipe } from './utils/localStorage';
import { RecipeCard } from './components/RecipeCard';
import { RecipeModal } from './components/RecipeModal';
import { RecipeDetailModal } from './components/RecipeDetailModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';

function App() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const loadedRecipes = getRecipes();
    setRecipes(loadedRecipes);
  }, []);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          recipe.ingredients.some(ingredient => 
                            ingredient.toLowerCase().includes(searchTerm.toLowerCase())
                          ) ||
                          recipe.tags.some(tag => 
                            tag.toLowerCase().includes(searchTerm.toLowerCase())
                          );
      
      const matchesCategory = !filterCategory || recipe.category.toLowerCase().includes(filterCategory.toLowerCase());
      
      return matchesSearch && matchesCategory;
    });
  }, [recipes, searchTerm, filterCategory]);

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
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add Recipe</span>
            </button>
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
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
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
        </div>
      </div>

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
    </div>
  );
}

export default App;