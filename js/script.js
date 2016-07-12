/**	
	Abel HZO 2016
	Code Javascript Angular for the admin of the form and the table.
*/

angular.module("contact", []).
service("myService", ["$http", function(h) {

	this.lista = [];

	this.getApi = function() {
		return h.get("js/users.json");
	}

	this.addPost = function(ele) {
		return h.post("js/users.json", ele);
	}

	this.add = function(ele) {
		this.lista.push(ele);
	}

	this.setList = function(list) {
		this.lista = list;
	}

	this.getAll = function() {
		return this.lista;
	}

}]).
controller("myControl", ["$scope", "myService", function(s, serv) {

	s.onlyWords = "[A-Za-z]+";
	s.wordAndNumber = "[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ,.¿?¡!\s ]+";

	serv.getApi().
		success(function(data) {
			serv.setList(data);
			s.users = serv.getAll(); //Place inside of function success because the callback asynchronous 
									 //brings order in the sequece.		
		}).
		error(function(error) {
			console.log(error);
		});

	s.add = function() {

		serv.addPost(s.contact).
		success(function(data) {
			serv.add(s.contact);
			s.contact = {};
			s.frm.$setPristine();
		}).
		error(function(error) {
			console.log(error);
		});

	} 

}]);