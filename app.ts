import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { Prisma, PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Listing Team Members
app.get("/users", async (req: Request, res: Response) => {
    const users = await prisma.member.findMany()
    res.json(users)
})

// Adding a Team Member
app.post("/users", async (req: Request, res: Response) => {
    const userData:Prisma.MemberCreateInput = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        role: req.body.role
    }
    
    const user = await prisma.member.create({
        data: {...userData}
    })

    res.json(user) 
})


// Editing a Team Member
app.put("/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const userData = req.body
    
    const user = await prisma.member.update({
        where: {
            id: Number(id)
        },
        data: {...userData}
    })

    res.json(user)
})


// Deleting a Team Member
app.delete("/users/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await prisma.member.delete({
        where: {
            id: Number(id)
        }
    })
    res.sendStatus(200)
})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
