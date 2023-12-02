# test-notes-codeAble-api

## Description API
this is a siple RESTful API built using bunJS is a CRUD of all the life actually is my first api
so it is really quite simple and it is not very complex. I know it lacks more layers and routes 
such as authentication but for now I will leave it like this. Here I have used the MVC model even 
though I don't know how much of the model I actually used and I have seen how powerful it is.

the entry point of the application is the main.ts even though it is the server.ts
 that creates the Express instance and manages the different routes, even though 
 in this case there is only one.

## Created with
I created it with moongose with database manager, express as the framework that will,
 handle the http requests among other things, and finally zod as validator of the data,
 sent by the user when performing the various operations of the crud. 

Commands you can run in the terminal
* dev
* start

```bash 
bun install
```
```bash
bun run dev
```
```bash
bun run start
```
This project was created using `bun init` in bun v1.0.7. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
