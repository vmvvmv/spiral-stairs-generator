class ThreeJSStairs {

    constructor( N, periods, rMin, rMax, stairsStep ) {

        this.geometry = new THREE.Geometry();
        this.bufferGeometry = new THREE.BufferGeometry();
        var alpha = Math.PI * 2 * periods / N;

        var geometry = this.geometry;

        var normal = new THREE.Vector3( 0, 1, 0 ); //optional
        var color = new THREE.Color( 0xffaa00 ); //optional
        var materialIndex = 0; //optional

        var bufferVertices = [];

        var addBuffVertice = function ( index ) {

            var tempVertice = geometry.vertices[index];

            bufferVertices.push( tempVertice.x );
            bufferVertices.push( tempVertice.y );
            bufferVertices.push( tempVertice.z );

        }

        var addTopFace = function ( i, x1, x2, x3, z1, z2, z3, height) {

            geometry.vertices.push( new THREE.Vector3( x1, z1, height) );
            geometry.vertices.push( new THREE.Vector3( x2, z2, height) );
            geometry.vertices.push( new THREE.Vector3( x3, z3, height) );
            geometry.vertices.push( new THREE.Vector3( x4, z4, height) );

            geometry.faces.push( new THREE.Face3( i, i+1, i+2, normal, color, materialIndex) );
            geometry.faces.push( new THREE.Face3( i+2, i+3, i+1 , normal, color, materialIndex) );

            addBuffVertice( i );
            addBuffVertice( i + 1 );
            addBuffVertice( i + 2 );
            addBuffVertice( i + 2 );
            addBuffVertice( i + 3 );
            addBuffVertice( i + 1 );



        }

        var addSideTopFace = function ( i ) {

            geometry.faces.push( new THREE.Face3( i, i + 2, i + 4, normal, color, materialIndex) );
            geometry.faces.push( new THREE.Face3( i + 2, i + 4, i + 6, normal, color, materialIndex) );

            addBuffVertice( i );
            addBuffVertice( i + 2 );
            addBuffVertice( i + 4 );
            addBuffVertice( i + 2 );
            addBuffVertice( i + 4 );
            addBuffVertice( i + 6 );

        }


        var addSideBottom = function ( i ) {

            geometry.faces.push( new THREE.Face3( i + 1, i + 3, i + 5, normal, color, materialIndex) );
            geometry.faces.push( new THREE.Face3( i + 5, i + 3, i + 7, normal, color, materialIndex) );

            addBuffVertice( i + 1 );
            addBuffVertice( i + 3 );
            addBuffVertice( i + 5 );
            addBuffVertice( i + 5 );
            addBuffVertice( i + 3 );
            addBuffVertice( i + 7 );

        }

        var addSideRight = function ( i ) {

            geometry.faces.push( new THREE.Face3( i, i + 1, i + 4, normal, color, materialIndex) );
            geometry.faces.push( new THREE.Face3( i + 4, i + 1, i + 5, normal, color, materialIndex) );

            addBuffVertice( i );
            addBuffVertice( i + 1 );
            addBuffVertice( i + 4 );
            addBuffVertice( i + 4 );
            addBuffVertice( i + 1 );
            addBuffVertice( i + 5 );

        }

        var addSideLeft = function ( i ) {

            geometry.faces.push( new THREE.Face3( i + 2, i + 3, i + 6, normal, color, materialIndex) );
            geometry.faces.push( new THREE.Face3( i + 3, i + 6, i + 7, normal, color, materialIndex) );

            addBuffVertice( i + 2 );
            addBuffVertice( i + 3 );
            addBuffVertice( i + 6 );
            addBuffVertice( i + 3 );
            addBuffVertice( i + 6 );
            addBuffVertice( i + 7 );

        }


        var help = 0;

        for ( var i = 0; i < N + 1; i++  ) {

            var cRot = alpha * ( i );
            var nextCrot = alpha * ( i + 1 );

            var height = stairsStep * ( i );

            var x1 = rMin * Math.cos( cRot );
            var x2 = rMax * Math.cos( cRot );

            var z1 = rMin * Math.sin( cRot );
            var z2 = rMax * Math.sin( cRot );

            var x3 = rMin * Math.cos( nextCrot );
            var x4 = rMax * Math.cos( nextCrot );

            var z3 = rMin * Math.sin( nextCrot );
            var z4 = rMax * Math.sin( nextCrot ); 

            //Top
            addTopFace ( help, x1, x2, x3, z1, z2, z3, height);

            //Bottom
            addTopFace ( help + 4, x1, x2, x3, z1, z2, z3, height + stairsStep);

            addSideTopFace( help );
            addSideBottom( help );
            addSideRight ( help );
            addSideLeft ( help );
            help += 4;

        }

        // console.log( this.geometry );
        // console.log( bufferVertices );
        //var verticesFloarArray = new Float32Array( bufferVertices );
        var standart = [
	    -1.0, -1.0,  1.0,
	     1.0, -1.0,  1.0,
	     1.0,  1.0,  1.0,
     
	     1.0,  1.0,  1.0,
	    -1.0,  1.0,  1.0,
	    -1.0, -1.0,  1.0
        ]

        var verticesFloarArray = new Float32Array( standart );

        this.bufferGeometry.addAttribute( 'position', new THREE.BufferAttribute( verticesFloarArray, 3 ) );

        this.geometry.computeFaceNormals();
        this.geometry.computeVertexNormals();
    }

};