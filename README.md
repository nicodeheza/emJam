# emJam

Musical chat app

## About The Project

EmJam is a full-stack web application that allows you to play music with other people in real time.

It has two instruments, a synthesizer and a drum set. Both of them were made with the browser audiocontext api. The synthesizer works with oscillators and the drums with samples.

Each chat room has a capacity of five members. If the room is full and the server receives a new connection, a new room will be created automatically.

One circle is shown for each player and a larger one for the local player. When the player begins to play an instrument the shape of the circle changes based on data which comes from the audiocontext API's sound analyzer.

You can try the live demo [here](https://emjam.nicolasdeheza.com)

## Built With

Here are some of the technologies I used to build this project:

- React js
- Redux
- React Router
- Node js (server)
- ws(Web socket)
