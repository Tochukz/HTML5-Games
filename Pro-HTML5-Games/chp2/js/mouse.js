const mouse = {
    x: 0,
    y: 0,
    down: false,
    dragging: false,
    init: function() {
        const canvas = document.getElementById("gamecanvas");
        canvas.addEventListener("mousemove", mouse.mousemovehandler, false);
        canvas.addEventListener("mousedown", mouse.mousedownhandler, false);
        canvas.addEventListener("mouseup", mouse.mouseuphandler, false);
        canvas.addEventListener("mouseout", mouse.mouseuphandler, false);
    },
    mousemovehandler: function(ev) {
        const offset = game.canvas.getBoundingClientRect();
        mouse.x = ev.clientX - offset.left;
        mouse.y = ev.clientY - offset.top;

        if (mouse.down) {
            mouse.dragging = true;
        }
        ev.preventDefault();
    },
    mousedownhandler: function(ev) {
        mouse.down = true;
        ev.preventDefault();
    },
    mouseuphandler: function(ev) {
        mouse.down = false;
        mouse.dragging = false;

        ev.preventDefault();
    }
};