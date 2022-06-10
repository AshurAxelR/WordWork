
var g4, g5;

function buildGraph(words) {
	let out = [];
	for(let i=0; i<words.length; i++) {
		let e = [];
		let wi = words[i];
		let len = wi.length;
		for(let j=0; j<words.length; j++) {
			let wj = words[j];
			let diff = 0;
			for(let d=0; d<len; d++) {
				if(wi.charAt(d)!=wj.charAt(d))
					diff++;
			}
			if(diff==1)
				e.push(j);
		}
		out.push(e);
	}
	return out;
}

function sssp(g, i0, i1) {
	let n = g.length;
	let vis = [];
	for(let i=0; i<n; i++)
		vis.push(false);
	vis[i0] = true;
	
	let tokens = [{'id':i0, 'res':[i0]}];
	while(tokens.length>0) {
		let t = tokens.shift();
		if(t.id==i1)
			return t.res;
		
		let e = g[t.id];
		for(let j=0; j<e.length; j++) {
			let i = e[j];
			if(vis[i]==false) {
				vis[i] = true;
				let res = [... t.res]
				res.push(i);
				tokens.push({'id':i, 'res':res});
			}
		}
	}
	return [];
}

self.onmessage = function(e) {
	if(e.data.fn=='words4') {
		g4 = buildGraph(e.data.words);
		self.postMessage({'fn':e.data.fn});
	}
	else if(e.data.fn=='words5') {
		g5 = buildGraph(e.data.words);
		self.postMessage({'fn':e.data.fn});
	}
	else if(e.data.fn=='solve4') {
		let res = sssp(g4, e.data.i0, e.data.i1);
		self.postMessage({'fn':e.data.fn, 'res':res});
	}
	else if(e.data.fn=='solve5') {
		let res = sssp(g5, e.data.i0, e.data.i1);
		self.postMessage({'fn':e.data.fn, 'res':res});
	}
}
