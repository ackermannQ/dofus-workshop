import React from "react";
import Card from "../components/Card";

export interface IIngredients {
    name: string;
    quantity: number;
}

interface IngredientsProps {
    recipe: IIngredients[]
}

export default function CurrentRecipeIngredients(props: IngredientsProps) {
  return <Card style={{ backgroundColor: "#000000" }} variant="outlined">
    {props.recipe.map(ingredient => 
      <p key={`${ingredient.name} + currentRecipe`}>{ingredient.name} - {ingredient.quantity}</p>)}
  </Card>;
}
