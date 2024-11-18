'use strict'

class Canvas {
    constructor (width, height) {
        this.height = height
        this.width = width

        this.MakeCanvas()

        this.SetupGL()
        this.MakeShaders()

        this.Init()

        var eye = lookAt([0,0,-1],[0,0,0],[0,1,0])
	    var proj =  this.Frustum(-0.5,0.5,-0.5,0.5,1,20)
   	    proj = mult(proj,eye)
        this.gl.uniformMatrix4fv(this.projLoc, false,flatten(proj))
    }

    Frustum(l,r,b,t,n,f) {
       var m =  mat4(1)
       m[0][0] = 2 * n / (r - l)
       m[0][1] = 0
       m[0][2] = (r + l) / (r - l)
       m[0][3] = 0

       m[1][0] = 0
       m[1][1] = 2 * n / (t - b)
       m[1][2] = (t + b) / (t - b)
       m[1][3] = 0

       m[2][0] = 0
       m[2][1] = 0
       m[2][2] = -(f + n) / (f - n)
       m[2][3] = -2 * f * n / (f - n)

       m[3][0] = 0
       m[3][1] = 0
       m[3][2] = -1
       m[3][3] = 0

       return m
    }

    MakeCanvas() {
        if (this.width == undefined || this.width < 0) {
           this.width = 300
        }

        if (this.height == undefined || this.height < 0) {
           this.height = 300
        }

        this.canvas = document.createElement('canvas')
        this.canvas.tabIndex=0
        this.canvas.height = this.height
        this.canvas.width = this.width
	    this.canvas.style.border = '1px solid #000'
        document.body.appendChild(this.canvas)
    }

    SetupGL() {
        this.gl = WebGLUtils.setupWebGL(this.canvas)
        if (!this.gl) {
            alert ("WebGL isn't available")
	    return;
        }
	    this.gl.getExtension('OES_standard_derivatives')
    }

    MakeShaders() {
      var gl = this.gl
      this.program = initShaders(gl, "vertex-shader","fragment-shader")
      gl.useProgram(this.program)

	  this.projLoc = gl.getUniformLocation(this.program, "uniformProject")
  	  this.transLoc = gl.getUniformLocation(this.program, "uniformTransform")
	  this.colorLoc = gl.getUniformLocation(this.program, "uniformEdgeColor")
    }

    Init() {
    var gl = this.gl

        gl.clearColor(1.0, 1.0, 1.0, 1.0)
        gl.viewport(0,0, this.width, this.height)

    	gl.enable(gl.BLEND)
    	//suggested here https://limnu.com/webgl-blending-youre-probably-wrong/
    	gl.blendFuncSeparate(gl.SRC_ALPHA,
	               gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

	    // From https://learnopengl.com/Advanced-OpenGL/Depth-testing
        gl.enable(gl.DEPTH_TEST)

        gl.frontFace(gl.CW)

        // set the default edge color for everything
	    this.NewEdgeColor([1.0, 0.0, 0.0, 1.0])
    }


    NewEdgeColor(c) {
        this.gl.uniform4fv(this.colorLoc, c)
    }

    Program() {
       return this.program
    }

    GL() {
       return this.gl
    }

    Translate() {
       return this.transLoc
    }

    Clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    }
}