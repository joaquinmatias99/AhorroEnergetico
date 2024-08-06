import app from "./app";
const PORT = process.env.PORT || 4012;
const main = () => {
    app.listen(PORT);
    console.log(`Server on port ${PORT}`);
};

main();
