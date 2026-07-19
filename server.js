import {fastify} from 'fastify';
// import {DatabaseMemory} from './database-memory.js'
import { STATUS_CODES } from 'node:http';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

// const database = new DatabaseMemory();

// Request Body

const database = new DatabasePostgres();

server.post("/videos", async(request, response) => {

    const { title, description, duration } = request.body;

    await database.create({
        title,
        description,
        duration,
    });

    return response.status(201).send();

});
server.get("/videos", async (request, response) => {
    const search = request.query.search;

    console.log(search);
    const videos = await database.list(search);

    console.log(videos);

    return videos;

});
server.put("/videos/:id", async (request, response) => {
    const videoId = request.params.id;
    const {title, description, duration} = request.body;

    await database.update(videoId, {
        title,
        description,
        duration,

    })

    return response.status(204).send();


});

server.delete("/videos/:id", (request, response) => {
    const videoId = request.params.id;

    database.delete(videoId);

    return response.status(204).send();
})


server.listen({
    port: process.env.PORT ?? 3333,
});



