'use strict'

class Canvas {
    vpx = 0;
    vpy = 0;
    constructor (width, height, vshader, fshader) {
        this.height = height;
        this.width = width;

        this.vph = height;
        this.vpw = width;

        this.MakeCanvas();
        this.SetupGL();
        this.MakeShaders(vshader, fshader);
	this.SetupVBO();

        this.gl.viewport(this.vpx, this.vpy, this.vpw, this.vph);

        this.Init();

        return this;
    }

    UpdateViewport(x,y,w,h) {
       this.vpx = x;
       this.vpy = y;
       this.vpw = w;
       this.vph = h;

       this.gl.viewport(this.vpx, this.vpy, this.vpw, this.vph);
    }

    SetPointSize(size) {
        this.gl.uniform1f(this.pointSizeLoc, size);
    }

    MakeCanvas() {
        if (this.width == undefined || this.width < 0) {
           this.width = 300;
        }

        if (this.height == undefined || this.height < 0) {
           this.height = 300;
        }

         this.canvas = document.createElement('canvas')
         this.canvas.height = this.height;
         this.canvas.width = this.width;
         this.canvas.style="border:1px solid #000000;"
         this.canvas.tabIndex = 0;
         document.body.appendChild(this.canvas);
    }

    SetupGL() {
        this.gl = WebGLUtils.setupWebGL(this.canvas);
        if (!this.gl) {
            alert ("WebGL isn't available");
	    return;
        }
	this.gl.getExtension('OES_standard_derivatives');
    }

    MakeShaders(vshader, fshader) {
        this.program = initShaders(this.gl, vshader,fshader);
        this.gl.useProgram(this.program);
    }

    SetupVBO() {
        let gl = this.gl;

        let bufferID = gl.createBuffer();


        gl.bindBuffer(gl.ARRAY_BUFFER, bufferID);

        let vPosition = gl.getAttribLocation(this.program, "vPosition");
        gl.vertexAttribPointer(vPosition,2,gl.FLOAT, false,0,0);
        gl.enableVertexAttribArray(vPosition);

        this.pointSizeLoc = gl.getUniformLocation(this.program,"userPointSize");
    }

    Init() {
	this.list= [];

        this.gl.clearColor(1.0, 1.0, 1.0, 1.0);

        this.shape = '0';
	this.MakePoints();

        let gl = this.gl;
	gl.bufferData(gl.ARRAY_BUFFER,flatten(this.list),gl.STATIC_DRAW);
    }

    MakePoints() {
        this.count = 15;

        let x, y, r;
	let theta=0;

	let dtheta = Math.PI/this.count * 2;
 
        r = .75;

        for (let i=0; i<this.count; i++) {
            let tmp = vec2(r*Math.cos(theta), r*Math.sin(theta));
	    theta += dtheta;
	    this.list.push(tmp);
	}
	return;
    }

    SetShape(shape) {
         this.shape = shape;
	 return;
    }

    Display() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        let type;

	switch(this.shape) {
	   case '1':
	       type = this.gl.LINE_STRIP; break
	   case '2':
	       type = this.gl.LINE_LOOP; break
	   case '3':
	       type = this.gl.LINES; break
	   case '4':
	       type = this.gl.TRIANGLE_STRIP; break
	   case '5':
	       type = this.gl.TRIANGLE_FAN; break
	   case '6':
	       type = this.gl.TRIANGLES; break
	   default:
	   case '0':
	       type = this.gl.POINTS; break
	}
	this.gl.drawArrays(type, 0, this.count);
        return;
    }
};