var dns = require('dns');
var os = require('os');

exports.findIP = function(_callback){
	var hostname = os.hostname();
	var ip;
	dns.lookup(hostname, function(err, add, fam){
		if(err){
			console.error("Error finding IP : "+err);
			_callback(err);
			return;
		}

		var ip = add;
		
		_callback(null, ip, hostname);

	})
}
