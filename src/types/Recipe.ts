export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number; // 1-5 stars
  image?: string;
  tags: string[];
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}