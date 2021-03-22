console.log('Hello from index.js!')

let test_val = $("#test-val")
let socket = io();

socket.on('test message', (msg) => {
    let elm = $("#sock-msg")
    elm.html(msg)
})

test_val.html("POOP")

$.get("/test/update", (data) => {
    test_val.html(data.value)
})