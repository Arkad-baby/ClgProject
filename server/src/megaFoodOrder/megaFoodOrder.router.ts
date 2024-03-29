import prisma from "../utils/db.server";

import express, { NextFunction, Request, Response } from "express"

export const megaFoodOrderRouter = express.Router();


//To get all the mega food orders of today which are not completed
megaFoodOrderRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get today's date
        let today = new Date();

        // Set hours, minutes, and seconds to 0 to get the start of the day
        today.setHours(0, 0, 0, 0);

        // Set the end of the day
        let endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999);

        // Query for orders created between start and end of today
        const getMegaFoodOrder = await prisma.megaFoodOrder.findMany({
            where: {
                created_at: {
                    gte: today,
                    lte: endOfDay
                }
            },
            include: {
                FoodOrder: {
                    where: {
                        completed: false
                    },
                    select: {
                        id: true,
                        created_at: true,
                        food:true,
                        foodQuantity: true,
                        description: true,
                        completed: true,
                    }
                }
            }
        });

        if (!getMegaFoodOrder || getMegaFoodOrder.length === 0) {
            return res.status(400).json({success:false,errorMessage:"No mega orders found for today."})
        }

        return res.status(200).json({success:true,data:getMegaFoodOrder});
    } catch (error) {
        next(error);
    }
});

// To get a mega food Order


megaFoodOrderRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {


        const id: string = req.params.id

        const megFoodOrder = await prisma.megaFoodOrder.findUnique({
            where: {

                id: id
            },
            include: {
                FoodOrder: {
                    select: {
                        id: true,
                        created_at: true,
                        food: true,
                        foodQuantity: true, 
                        description: true,
                        completed: true,
                    }
                }


            }
        })

        if (!megFoodOrder) {
            return res.status(400).json({success:false,errorMessage:`No megaOrder of id ${id} was found.`})
        }
        return res.status(200).json({success:true,data:megFoodOrder});
 
    } catch (error) {
        next(error);
    }
})
