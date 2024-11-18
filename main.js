"use strict";

const canvas = document.getElementById('glCanvas');
const gl = canvas.getContext('webgl');

function main()
{
    if(!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}