var accounts = [
	{id:0, user:"korgankd", password:"password", name:"Kent Korgan", description: "This is the description of the Kent Korgan account. It should give some information about this user.", availability:"Kent's availability", media:"Kent's media", location:"11257 Ramrod Road, Woodbridge VA", image:"http://i.huffpost.com/gen/964776/images/o-CATS-KILL-BILLIONS-facebook.jpg"},
	{id:1, user:"kentcl", password:"password", name:"Clark Kent", description: "This is the description of the Clark Kent account. It should give some information about this user.", availability:"Clark's availability", media:"Clark's media", location:"North Pole Fortress of Solitude", image:"http://i.huffpost.com/gen/964776/images/o-CATS-KILL-BILLIONS-facebook.jpg"}
];

exports.findAll = function(req, res, next) {
	res.send(accounts);
};

exports.findById = function(req, res, next) {
	var id = req.params.id;
	res.send(accounts[id]);
};