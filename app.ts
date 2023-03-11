import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { Prisma, PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

/**
 * Handle an ID not found error thrown by Prisma client
 * @param e error object
 * @param res HTTP response object to send to
 */
const handleIdError = (e: any, res: Response) => {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e.message)
        res.status(404).json(e.meta)
    }
    console.error(e)
}

/**
 * Fetch all team members and return as JSON array.
 */
app.get("/users", async (req: Request, res: Response) => {
    const users = await prisma.member.findMany()
    res.json(users)
})

/**
 * Add a new team member, using fields from the request's body. 
 * 
 * If is missing any required fields, fields have the wrong type or
 * the email is already in use, the request will return a 400 error.
 */
app.post("/users", async (req: Request, res: Response) => {
    try {
        const userData:Prisma.MemberCreateInput = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            role: req.body.role
        }
        
        const user = await prisma.member.create({
            data: userData
        })
    
        res.json(user)
    }
    catch (e) {
        res.status(400).send("Error in adding user")
    }
})


/**
 * Edit the team member with the given ID, using fields from the request's body.
 * 
 * Fields included in the body will be edited, the rest will remain unchanged.
 * Entire edited user is returned in the response.
 * 
 * If a team member with the given ID does not exist, 
 * the request will return a 404 error.
 */
app.put("/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const userData = req.body

    try {
        const user = await prisma.member.update({
            where: {
                id: Number(id)
            },
            data: {...userData}
        })
        res.json(user)
    }
    catch(e) {
        handleIdError(e, res)
    }    
})


// Deleting a Team Member


/**
 * Delete the team member with the given ID.
 * 
 * If a team member with the given ID does not exist, 
 * the request will return a 404 error.
 */
app.delete("/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const user = await prisma.member.delete({
            where: {
                id: Number(id)
            }
        })
        res.sendStatus(200)
    }
    catch(e) {
        handleIdError(e, res)
    }
    
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});