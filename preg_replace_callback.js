function preg_replace_callback(pattern, callback, subject, limit){
	// Perform a regular expression search and replace using a callback
	// 
	// discuss at: http://geekfg.net/
	// +   original by: Francois-Guillaume Ribreau (http://fgribreau)
	// *     example 1: preg_replace_callback("/(\\@[^\\s,\\.]*)/ig",function(matches){return matches[0].toLowerCase();},'#FollowFriday @FGRibreau @GeekFG',1);
	// *     returns 1: "#FollowFriday @fgribreau @GeekFG"
	// *     example 2: preg_replace_callback("/(\\@[^\\s,\\.]*)/ig",function(matches){return matches[0].toLowerCase();},'#FollowFriday @FGRibreau @GeekFG');
	// *     returns 2: "#FollowFriday @fgribreau @geekfg"

	limit = !limit?-1:limit;

	var _flag = pattern.substr(pattern.lastIndexOf(pattern[0])+1),
		_pattern = pattern.substr(1,pattern.lastIndexOf(pattern[0])-1),
		reg = new RegExp(_pattern,_flag),
		rs = null,
		res = [],
		x = 0,
		ret = subject;
		
	if(limit === -1){
		var tmp = [];
		
		do{
			tmp = reg.exec(subject);
			if(tmp !== null){
				res.push(tmp);
			}
		}while(tmp !== null && _flag.indexOf('g') !== -1)
	}
	else{
		res.push(reg.exec(subject));
	}
	
	for(x = res.length-1; x > -1; x--){//explore match
		ret = ret.replace(res[x][0],callback(res[x]));
	}
	return ret;
}