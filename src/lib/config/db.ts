import mongoose from "mongoose";


export const ConnectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return mongoose.connections[0].readyState;
    }

    try {
        await mongoose.connect('mongodb+srv://AgredaTech:estoesunblog@blognextjsyt.sau5ags.mongodb.net/blog-nextjs?retryWrites=true&w=majority')
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
};