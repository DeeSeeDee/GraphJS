$(function(){
	
	var makeGraph = function(){
		var testEdges = {
		edges: [
				{'v': 0, 'w': 5},
				{'v': 4, 'w': 3},
				{'v': 0, 'w': 1},
				{'v': 9, 'w': 12},
				{'v': 6, 'w': 4},
				{'v': 5, 'w': 4},
				{'v': 0, 'w': 2},
				{'v': 11, 'w': 12},
				{'v': 9, 'w': 10},
				{'v': 0, 'w': 6},
				{'v': 7, 'w': 8},
				{'v': 9, 'w': 11},
				{'v': 5, 'w': 3}
			]
		};
		var testGraph = new Graph(testEdges.edges);	
	return testGraph;
	}
	
	test( "Sanity Check", function() {
		ok(4 % 2 === 0, "Two is an even number." );
	});

	module("Basic Graph Functionality");
	test("Edges and Vertices", function(){
		var testGraph = makeGraph();
		equal(testGraph.E(), 13, "Graph has 13 edges.");
		equal(testGraph.V(), 13, "Graph has 13 vertices.");
		equal(testGraph.degree(0), 4, "Vertex 0 has a degree of four.");
		equal(testGraph.degree(7), 1, "Vertex 1 has a degree of one.");
		equal(testGraph.maxDegree(), 4, "Graph has a max degree of four.");
		equal(testGraph.averageDegree(), 2.0, "Graph has an average degree of 2.0");
	});
	
	test("Adding Edges Using Existing Vertices", function(){
		var testGraph = makeGraph();
		testGraph.addEdge(11, 10);
		equal(testGraph.E(), 14, "Graph has 14 edges.");
		equal(testGraph.V(), 13, "Graph still has 13 vertices.");
		equal(testGraph.degree(10), 2, "Vertex 10 has a degree of two.");
		testGraph.addEdge(13,0);
		equal(testGraph.maxDegree(), 5, "After adding a vertex and an edge connecting it to zero, max degree is now five.");
		equal(testGraph.V(), 14, "And the number of vertices is now 14.");
	});
	
	test("Self Loops", function(){
		var testGraph = makeGraph();
		equal(testGraph.numSelfLoops(), 0, "Test Graph has zero self loops");
		testGraph.addEdge(0,0);
		equal(testGraph.numSelfLoops(), 1, "Add a single self loop and check that it's detected.");
		equal(testGraph.degree(0), 5, "A self loop increases the degree of a vertex.");
	});
	
	module("Depth Searching");
	test("Basic Depth Searching", function(){
		var testGraph = makeGraph();
		var firstDfs = new DepthFirstSearch(testGraph, 0);
		deepEqual(firstDfs.hasPathTo(5), true, "There's a path from zero to five.");
		deepEqual(firstDfs.hasPathTo(3), true, "There's a path from zero to three.");
		deepEqual(firstDfs.hasPathTo(10), false, "There's not a path from zero to ten.");
		var secondDfs = new DepthFirstSearch(testGraph, 5);
		deepEqual(secondDfs.hasPathTo(4), true, "There's a path from four to zero.");
		var thirdDfs = new DepthFirstSearch(testGraph, 10);
		deepEqual(thirdDfs.hasPathTo(12), true, "There's a path from ten to twelve.");
	});
	
	test("PathFinding - DepthSearch", function(){
		var testGraph = makeGraph();
		var firstPathSearch = new DepthFirstPaths(testGraph, 0);
		deepEqual(firstPathSearch.pathTo(4), "4,5,0", "Test the path from zero to four.");
		var secondPathSearch = new DepthFirstPaths(testGraph, 10);
		deepEqual(secondPathSearch.pathTo(11), '11,12,9,10', "Test the path from 11 to 10.");
	});
	
	test("PathFinding - BreadthSearch", function(){
		var testGraph = makeGraph();
		var firstPathSearch = new BreadthFirstPaths(testGraph,0);
		deepEqual(firstPathSearch.pathTo(3), "3,5,0", "Test the path from zero to four.");
	});
});