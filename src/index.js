const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Hello World");
})

app.get("/category", async (req, res) => {
    const category = await prisma.category.findMany();
    res.send(category);
})

app.post("/category", async (req, res) => {
    const newCategory = req.body;

    const categoryPost = await prisma.category.create({
        data : {
            nama_category : newCategory.nama_category,
            id_status : newCategory.id_status
        },
    });
    res.send({
        data: categoryPost,
        message: "create data success"
    });
})

app.delete("/category/:idCategory", async (req, res) => {
    const categoryId = req.params.idCategory // masih bertipe string

    await prisma.category.delete({
        where: {
            id_category : parseInt(categoryId)
        },
    });

    res.send("category deleted");
})

app.listen(PORT, () => {
    console.log("Express API running in port: " + PORT);
})