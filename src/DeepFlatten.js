"use strict"
/*
 * gl.bufferData(gl.ARRAY_BUFFER,
 *               DeepFlatten("cubeMODEL_Vertex"), gl.STATIC_DRAW);
*/

function DeepFlatten(struct) {
    let size = 0;

    for (let item of struct[0]) {
       size += item.length;
    }

    size *= struct.length

    let i = 0;
    let rv = new Float32Array(size);
    for(let data of struct) {
       for (let item of data) {
          for(let num of item) {
              rv[i] = num;
              ++i;
          }
       }
    }

    return rv;
}
