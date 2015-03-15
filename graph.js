function Graph(edges){
	this.adj = {}
	
	//return the number of vertices
	this.V = function(){
		return Object.keys(this.adj).length;
	};
		
	//return the number of edges
	this.E = function(){
		var edgeCount = 0;
		Object.keys(this.adj).forEach(function(key){
			edgeCount += this.adj[key].length;
		}.bind(this));
		return edgeCount/2;
	};
	
	this.addEdge = function(v, w){
		if(this.adj.hasOwnProperty(v)){
		  if(this.adj[v].indexOf(w) === -1){
				this.adj[v].push(w);
			}
		} else {
			this.adj[v] = [w];
		}
		if(this.adj.hasOwnProperty(w)){
			if(this.adj[w].indexOf(v) === -1){
				this.adj[w].push(v);
			}
		} else {
			this.adj[w] = [v];
		}
	};
	
	this.degree = function(v){
		if(!this.adj.hasOwnProperty(v)){
			return 0;
		}
		return this.adj[v].length;
	};
	
	this.maxDegree = function(){
		max = 0;
		for(var v in this.adj){
			max = this.degree(v) > max ? this.degree(v) : max;
		}
		return max;
	};
	
	this.averageDegree = function(){
		return ( (2 * this.E())/this.V() );
	};
	
	this.numSelfLoops = function(){
		var numSL = 0;
		var that = this;
		for(var v in this.adj){
			that.adj[v].forEach(function(edge){
				if(edge == v){
					numSL++;
				}
			});
		}
		return numSL;
	}
	
	//if edges are passed to the Graph, add them
	edges.forEach(function(edge){
		this.addEdge(edge.v, edge.w);
	}.bind(this));
};

function DepthFirstSearch(graph, startVertex){
	this.marked = {};
	this.count = 0;
	
	for(var vertex in Object.keys(graph.adj)){
		this.marked[vertex] = false;
	}
	
	this.dfs = function(graph, vertex){
		this.marked[vertex] = true;
		this.count++;
		graph.adj[vertex].forEach(function(v){
			if(!this.marked[v]){
				this.dfs(graph, v);
			}
		}.bind(this));
		console.log("Done with " + vertex);
	}

	this.hasPathTo = function(vertex){
		if(this.marked[vertex]){
			return true;
		}
		return false;
	};
	
	this.dfs(graph, startVertex);
};

function DepthFirstPaths(graph, startVertex){
	this.marked = {};
	this.edgeTo = {};
	this.source = startVertex;
	
	for(var vertex in Object.keys(graph.adj)){
		this.marked[vertex] = false;
	}
	
	this.dfs = function(graph, vertex){
		this.marked[vertex] = true;
		graph.adj[vertex].forEach(function(v){
			if(!this.marked[v]){
				this.edgeTo[v] = vertex;
				this.dfs(graph, v);
			}
		}.bind(this));
	};
	
	this.hasPathTo = function(vertex){
		if(this.marked[vertex]){
			return true;
		}
		return false;
	};
	
	this.pathTo = function(vertex){
		if(!this.hasPathTo(vertex)){
			return false;
		}
		var path = [];
		for (var x = vertex; x != this.source; x = this.edgeTo[x]){
			path.push(x);
		}
		path.push(this.source);
		return path.join(',');
	};
	
	this.dfs(graph, startVertex);	
};