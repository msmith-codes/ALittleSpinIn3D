'use strict';

function Reset(object) {   
    object.tz = .75
    object.ty = 0 
    object.tz = .55 
    object.rx = 270 
    object.ry = 0
    object.rz = 0
    object.FrontOn()
    object.BackOff()
}

function Redisplay(object) {
    object.Display(canvas.GL(), mat4(), canvas.Translate());
}