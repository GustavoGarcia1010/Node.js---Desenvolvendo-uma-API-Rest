import sql from './db.js';

sql `
    CREATE TABLE videos(
        title TEXT,
        description TEXT,
        durartion INTEGER  
    
    );
` .then( () =>{
    console.log("Tabela criada!")
})