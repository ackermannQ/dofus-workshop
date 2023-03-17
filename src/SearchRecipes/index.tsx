import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React from "react";

import { apiUrl } from "../config/apiConfig";
import CurrentRecipeIngredients, { IIngredients } from "../CurrentRecipeIngredients";
import TotalIngredients from "../TotalIngredients";

interface IEquipment {    
    name: string;
    recipe: IIngredients[];
}

export default function SearchRecipes() {
    const [equipments, setEquipments] = React.useState<IEquipment[]>([]);
    const [recipe, setRecipe] = React.useState<IIngredients[]>([]);
    const [totalIngredients, setIngredients] = React.useState<IIngredients[]>([]);
    const [equipmentsNames, setEquipmentsNames] = React.useState<string[]>([]);

    React.useEffect(() => {
        fetchObject().then((equipments: IEquipment[] | undefined) => {
            if (!equipments) {
                return;
            }

            setEquipments(equipments);
            setEquipmentsNames(equipments.map((equipment: IEquipment) => equipment.name));
        });
    }, []);

    return <>
        <h1 style={{color:"#EBEEF1"}}>Atelier</h1>
        <Stack direction="row" spacing={2}>
            <Autocomplete
                style={{borderColor: "white"}}
                disablePortal
                options={equipmentsNames}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Recette à trouver pour ..." />}
                onInputChange={(event, newInputValue) => setEquipmentRecipe(newInputValue)}
            />
            <Button color="secondary" variant="contained" onClick={addToTotalIngredients}>Add</Button>
        </Stack>
        <h3>Recette</h3>
        {recipe?.length > 0 && <CurrentRecipeIngredients recipe={recipe} />}

        <h3>Total des ingredients</h3>
        {totalIngredients?.length > 0 && <TotalIngredients ingredients={totalIngredients} />}
    </>;

    async function fetchObject(): Promise<IEquipment[] | undefined> {
        try {
            const response = await axios.get(`${apiUrl}/equipments`);
            return response.data;
        } catch(error) {
            console.log(error);
            return;
        }
    }

    function setEquipmentRecipe(equipmentName: string): void {       
        const equipment = equipments.filter(equipment => equipment.name === equipmentName)[0];
        const ingredients: IIngredients[] = equipment.recipe.map((ingredient) => {
            const name = Object.keys(ingredient);
            const ingredientData = Object.values(ingredient);
            
            return {
                name: name[0],
                quantity: ingredientData[0].quantity
            };
        });

        setRecipe(ingredients);
    }

    function addToTotalIngredients() {
        const allIngredients: IIngredients[] = [];

        for(let i = 0; i < recipe.length; i++) {

            if (totalIngredients.length === 0) {
                allIngredients.push(recipe[i]);
            }

            for(let j = 0; j < totalIngredients.length; j++) {
                if(totalIngredients[j] === recipe[i]) {
                    allIngredients.push({name:  totalIngredients[j].name, quantity: totalIngredients[j].quantity += recipe[i].quantity});
                    break;
                } else {
                    allIngredients.push(recipe[i]);
                    break;
                }
            }
        }

        // setIngredients([...totalIngredients, ...recipe]);
        setIngredients(allIngredients);
    }
}
