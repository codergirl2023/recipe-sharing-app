import { connectToDB } from "../../../utils/database";
import Recipe from "../../../models/recipe";

export const POST = async (req: Request, res: Response) => {
  const {
    userId,
    description,
    tag,
    title,
    ingredients,
    steps,
    photo,
    servings,
    timeToDo,
    nutrition,
  } = await req.json();

  try {
    await connectToDB();

    const newRecipe = new Recipe({
      creator: userId,
      title,
      description,
      tag,
      ingredients,
      steps,
      photo,
      servings,
      timeToDo,
      nutrition,
    });

    await newRecipe.save();

    return new Response(JSON.stringify(newRecipe), { status: 201 });
  } catch (error) {
    return new Response("Failed to create recipe", { status: 500 });
  }
};
