import { Recipe } from '../types/Recipe';

const STORAGE_KEY = 'food_recipes';

export const getRecipes = (): Recipe[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const recipes = JSON.parse(stored);
    return recipes.map((recipe: any) => ({
      ...recipe,
      createdAt: new Date(recipe.createdAt),
      updatedAt: new Date(recipe.updatedAt),
    }));
  } catch (error) {
    console.error('Error loading recipes:', error);
    return [];
  }
};

export const saveRecipes = (recipes: Recipe[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch (error) {
    console.error('Error saving recipes:', error);
  }
};

export const addRecipe = (recipe: Omit<Recipe, 'id' | 'createdAt' | 'updatedAt'>): Recipe => {
  const newRecipe: Recipe = {
    ...recipe,
    category: recipe.category || 'Main Course',
    difficulty: recipe.difficulty || 'Medium',
    rating: recipe.rating || 0,
    isFavorite: recipe.isFavorite || false,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  const recipes = getRecipes();
  recipes.push(newRecipe);
  saveRecipes(recipes);
  
  return newRecipe;
};

export const updateRecipe = (id: string, updates: Partial<Recipe>): Recipe | null => {
  const recipes = getRecipes();
  const index = recipes.findIndex(recipe => recipe.id === id);
  
  if (index === -1) return null;
  
  const updatedRecipe = {
    ...recipes[index],
    ...updates,
    updatedAt: new Date(),
  };
  
  recipes[index] = updatedRecipe;
  saveRecipes(recipes);
  
  return updatedRecipe;
};

export const deleteRecipe = (id: string): boolean => {
  const recipes = getRecipes();
  const filteredRecipes = recipes.filter(recipe => recipe.id !== id);
  
  if (filteredRecipes.length === recipes.length) return false;
  
  saveRecipes(filteredRecipes);
  return true;
};