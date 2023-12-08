import app from "./app"

//  Funcion principal que se vincula con app.js y muestra por consola el puerto que escucha el servidor
const main=()=>{
    app.listen(app.get("port"));
    console.log(`Server on port ${app.get("port")}`)
};


main();