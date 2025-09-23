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
  image?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}