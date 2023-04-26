const canvas = document.createElement( 'canvas' ),
	  ctx = canvas.getContext( '2d' );
	  canvas.width = 600;
	  canvas.height = 600;
	  document.body.appendChild( canvas );

let cells = [];

( function init() {

	ctx.scale( 6, 6 );
	ctx.fillStyle = 'white';
	ctx.fillRect( 0, 0, 100, 100 );

	for ( let i = 0; i < 100; i++ ) {
		cells[ i ] = [];
		for ( let j = 0; j < 100; j++ ) {
			cells[ i ][ j ] = Math.floor( ( Math.random() * 4 )+ 1 );
			draw( cells[ i ][ j ], i, j );
		}
	}

	run( );
} )();

function run() {

	const cells_copy = JSON.parse( JSON.stringify( cells ) );

	for ( let i = 0; i < 100; i++ ) {
		for ( let j = 0; j < 100; j++ ) {

			let neighbors = 0,
				t = cells_copy[ i ][ j ] == 4 ? 1 : cells_copy[ i ][ j ]+ 1;

			if ( t == cells_copy[ i==99 ? 0 : i+1 ][ j ] ) { neighbors++; }
			if ( t == cells_copy[ i==0 ? 99 : i-1 ][ j ] ) { neighbors++; }
			if ( t == cells_copy[ i ][ j==99 ? 0 : j+1 ] ) { neighbors++; }
			if ( t == cells_copy[ i ][ j==0 ? 99 : j-1 ] ) { neighbors++; }
			if ( t == cells_copy[ i==99 ? 0 : i+1 ][ j==99 ? 0 : j+1 ] ) { neighbors++; }
			if ( t == cells_copy[ i==0 ? 99 : i-1 ][ j==0 ? 99 : j-1 ] ) { neighbors++; }
			if ( t == cells_copy[ i==99 ? 0 : i+1 ][ j==0 ? 99 : j-1 ] ) { neighbors++; }
			if ( t == cells_copy[ i==0 ? 99 : i-1 ][ j==99 ? 0 : j+1 ] ) { neighbors++; }

			if (cells_copy[i][j] < 4 && neighbors >= 3) {
				cells[i][j] += 1;
			}
			else if (cells_copy[i][j] == 4 && neighbors >= 3) {
				cells[i][j] = 1;
			}

			draw( cells[ i ][ j ], i, j );
		}
	}

	setTimeout( run, 30 );
}

function draw( cell, i, j ) {
	switch ( cell ) {
		case 1:
			ctx.fillStyle = '#f23a9b';
			ctx.fillRect( i, j, 1, 1 );
			break;
		case 2:
			ctx.fillStyle = '#f6f146';
			ctx.fillRect( i, j, 1, 1 );
			break;
		case 3:
			ctx.fillStyle = '#53f9a1';
			ctx.fillRect( i, j, 1, 1 );
			break;
		case 4:
			ctx.fillStyle = '#5f64fc';
			ctx.fillRect( i, j, 1, 1 );
			break;
	}
}