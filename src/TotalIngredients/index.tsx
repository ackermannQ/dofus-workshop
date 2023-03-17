import React from "react";
import { IIngredients } from "../CurrentRecipeIngredients";

interface TotalIngredientsProps {
    ingredients: IIngredients[]
}

export default function TotalIngredients(props: TotalIngredientsProps) {
  return <div>{props.ingredients.map(ingredient => 
    <p key={`${ingredient.name} + totalIngredients`}>{ingredient.name} - {ingredient.quantity}</p>
  )}</div>;
}
