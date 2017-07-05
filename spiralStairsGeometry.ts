class ThreeJSStairs {

    constructor( N, periods, rMin, rMax, stairsStep ) {

        this.geometry = new THREE.Geometry();
        var alpha = Math.PI * 2 * periods / N;

        var geometry = this.geometry;

        var normal = new THREE.Vector3( 0, 1, 0 ); //optional
        var color = new THREE.Color( 0xffaa00 ); //optional
        var materialIndex = 0; //optional

        var addTopFace = function ( i, x1, x2, x3, z1, z2, z3, height) {

            geometry.vertices.push( new THREE.Vector3( x1, z1, height) );
            geometry.vertices.push( new THREE.Vector3( x2, z2, height) );
            geometry.vertices.push( new THREE.Vector3( x3, z3, height) );
            geometry.vertices.push( new THREE.Vector3( x4, z4, height) );

            geometry.faces.push( new THREE.Face3( i, i+1, i+2, normal, color, materialIndex) );
            geometry.faces.push( new THREE.Face3( i+2, i+3, i+1 , normal, color, materialIndex) );

        }

        var addSideTopFace = function ( i ) {

            geometry.faces.push( new THREE.Face3( i, i + 2, i + 4, normal, color, materialIndex) );
            geometry.faces.push( new THREE.Face3( i + 2, i + 4, i + 6, normal, color, materialIndex) );

        }


        var addSideBottom = function ( i ) {

            geometry.faces.push( new THREE.Face3( i + 1, i + 3, i + 5, normal, color, materialIndex) );
            geometry.faces.push( new THREE.Face3( i + 5, i + 3, i + 7, normal, color, materialIndex) );

        }

        var addSideRight = function ( i ) {

            geometry.faces.push( new THREE.Face3( i, i + 1, i + 4, normal, color, materialIndex) );
            geometry.faces.push( new THREE.Face3( i + 4, i + 1, i + 5, normal, color, materialIndex) );

        }

        var addSideLeft = function ( i ) {

            geometry.faces.push( new THREE.Face3( i + 2, i + 3, i + 6, normal, color, materialIndex) );
            geometry.faces.push( new THREE.Face3( i + 3, i + 6, i + 7, normal, color, materialIndex) );

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

        this.geometry.computeFaceNormals();
        this.geometry.computeVertexNormals();
    }

};