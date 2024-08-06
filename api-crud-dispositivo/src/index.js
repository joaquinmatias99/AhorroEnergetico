import app from "./app";
const PORT = process.env.PORT || 4009;
const main = () => {
    app.listen(PORT);
    console.log(`Server on port ${PORT}`);
};

main();
