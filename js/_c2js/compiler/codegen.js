var syms = [];
var funcs = [];
var includes = [];
syms["NULL"]  = "YES";
function r_struct_declarator(struct_declarator) {

	if (struct_declarator.children[0].name == "declarator") {
		
		var declarator = struct_declarator.children[0];
		return r_declarator(declarator);

	}
}

function r_declarator(declarator) {
	
	if (declarator.children[0].name == "direct_declarator") {

		var direct_declarator = declarator.children[0];
		return r_direct_declarator(direct_declarator);
		
	} else if (declarator.children[0].name == "pointer") {

		var dd2 = declarator.children[1];

		if (dd2.children[0].name == "IDENTIFIER") {

			var id = dd2.children[0];
			var name = id.children[0].name;

			var pair = {"dec_type": "pointer", "name": name};

			syms[name] = "PTR";

			return pair;

		}

		return res;

	}
}

function r_direct_declarator(direct_declarator) {

	if (direct_declarator.children[0].name == "IDENTIFIER") {

		var id = direct_declarator.children[0];
		var name = id.children[0].name;

		return {"dec_type": "var", "name": name};

	} else if (direct_declarator.children[0].name == "direct_declarator" 
		&& direct_declarator.children[2].name == "constant_expression" ) {

		var dd2 = direct_declarator.children[0];
		var id = dd2.children[0];
		var name = id.children[0].name;
		var constant_expression = direct_declarator.children[2];
		var size = r_const_expr(constant_expression);

		syms[name] = "ARRAY";

		return {"dec_type": "array", "name": name, "size": size};

	} else if (direct_declarator.children[0].name == "direct_declarator" 
		&& direct_declarator.children[1].name == "(" 
		&& direct_declarator.children[direct_declarator.children.length-1].name == ")") {

		var params = [];

		var dd2 = direct_declarator.children[0];
		var id = dd2.children[0];
		var name = id.children[0].name;

		if (direct_declarator.children[2].name == "parameter_type_list") {
			parameter_type_list = direct_declarator.children[2];
			params = r_parameter_type_list(parameter_type_list);
		}

		funcs[name] = "FUNC";

		return {"dec_type": "function_def", "name": name, "params": params};

	}
}

function r_parameter_type_list(parameter_type_list) {

	if (parameter_type_list.children.length == 1) {

		parameter_list = parameter_type_list.children[0];

		return r_parameter_list(parameter_list);

	}

}

function r_parameter_list(parameter_list) {

	var results = [];

	if (parameter_list.children.length == 1) {

		results.push(r_parameter_declaration(parameter_list.children[0]));

	} else {

		var ress = r_parameter_list(parameter_list.children[0]);
		for (var i = 0; i < ress.length; i++) {

			results.push(ress[i]);

		};

		results.push(r_parameter_declaration(parameter_list.children[2]));

	}

	return results;

}

function r_parameter_declaration(parameter_declaration) {

	if (parameter_declaration.children[0].name == "declaration_specifiers"
		&& parameter_declaration.children[1].name == "declarator") {

		var declaration_specifiers = parameter_declaration.children[0];
		var type = r_declaration_specifiers(declaration_specifiers);

		var declarator = parameter_declaration.children[1];
		var decs = r_declarator(declarator);

		// if(type["dec_type"] != undefined) {
		// 	structs[decs.name] = "YES";
		// }

		return {"type": type, "decs": decs};
	
	}

}

function r_struct_declarator_list(struct_declarator_list) {

	var results = [];

	if (struct_declarator_list.children.length == 1) {

		results.push(r_struct_declarator(struct_declarator_list.children[0]));

	} else {

		var ress = r_struct_declarator_list(struct_declarator_list.children[0]);
		for (var i = 0; i < ress.length; i++) {

			results.push(ress[i]);

		};

		results.push(r_struct_declarator(struct_declarator_list.children[2]));

	}

	return results;

}

function r_function_definition(function_definition) {

	var type = "";
	var name = "";

	if (function_definition.children[0].name == "declaration_specifiers") {

		var declaration_specifiers = function_definition.children[0];
		type = r_declaration_specifiers(declaration_specifiers);

		if (function_definition.children[1].name == "declarator") {

			var declarator = function_definition.children[1];
			name = r_declarator(declarator);

		}

		if (function_definition.children[2].name == "compound_statement") {

			var compound_statement = function_definition.children[3];

		}

	} 

	//syms[name] = "FUNC";

	return {"type": type, "name": name};

}

function r_struct_declaration(struct_declaration) {

	var type = "";
	var ids = [];

	if (struct_declaration.children[0].name == "specifier_qualifier_list") {

		var specifier_qualifier_list = struct_declaration.children[0];

		if (specifier_qualifier_list.children[0].name == "type_specifier") {

			var type_specifier = specifier_qualifier_list.children[0];

			if (type_specifier.children[0].name == "IDENTIFIER") {

				var id = type_specifier.children[0];
				type = id.children[0].name;

			} else if (type_specifier.children[0].name == "struct_or_union_specifier") {

				var struct_or_union_specifier = type_specifier.children[0];
				type = r_struct_or_union_specifier(struct_or_union_specifier);

			}

		}

	}

	if (struct_declaration.children[1].name == "struct_declarator_list") {

		var struct_declarator_list = struct_declaration.children[1];
		ids = r_struct_declarator_list(struct_declarator_list);

	}

	for (var i = 0; i < ids.length; i++) {
		syms[ids[i].name] = "VAR";
	}

	return {"data_type": type, "ids": ids};

}

function r_struct_declaration_list(struct_declaration_list) {

	var results = [];

	if (struct_declaration_list.children.length == 1) {

		results.push(r_struct_declaration(struct_declaration_list.children[0]));

	} else {

		var ress = r_struct_declaration_list(struct_declaration_list.children[0]);
		for (var i = 0; i < ress.length; i++) {

			results.push(ress[i]);

		}

		results.push(r_struct_declaration(struct_declaration_list.children[1]));

	}

	return results;

}

function r_struct_or_union_specifier(struct_or_union_specifier) {

	var struct_or_union = struct_or_union_specifier.children[0];
	var id = struct_or_union.children[0];
	var token = id.children[0].name;

	if (token == "struct") {

		var id2 = struct_or_union_specifier.children[1];
		var name = id2.children[0].name;

		if (struct_or_union_specifier.children.length == 2) {

			syms[name] = "STRUCT_DEC";

			return {"dec_type": "struct_dec", "name": name};

		} else if (struct_or_union_specifier.children[3].name == "struct_declaration_list") {

			var struct_declaration_list = struct_or_union_specifier.children[3];
			var decs = r_struct_declaration_list(struct_declaration_list);

			return {"dec_type": "struct_def", "name": name, "members": decs};

		}

	}

}

function r_enum_specifier(enum_specifier) {

	var id = enum_specifier.children[0];
	var token = id.children[0].name;

	var id2 = enum_specifier.children[1];
	var name = id2.children[0].name;

	if (token == "enum") {

		if (enum_specifier.children.length == 2) {

			return {"dec_type": "enum_dec", "name": name};

		} else if (enum_specifier.children[3].name == "enumerator_list") {

			var enumerator_list = enum_specifier.children[3];
			var decs = r_enumerator_list(enumerator_list);

			return {"dec_type": "enum_def", "name": name, "members": decs};

		}

	}

}

function r_enumerator(enumerator) {

	var id = enumerator.children[0];
	var tag = id.children[0].name;

	if (enumerator.children.length > 1) {

		var constant_expression = enumerator.children[2]; 
		var ival = r_const_expr(constant_expression);

		return {"tag": tag, "ival": ival}

	}

	return {"tag": tag};

}

function r_enumerator_list(enumerator_list) {

	var results = [];

	if (enumerator_list.children.length == 1) {

		results.push(r_enumerator(enumerator_list.children[0]));

	} else {

		var ress = r_enumerator_list(enumerator_list.children[0]);
		for (var i = 0; i < ress.length; i++) {

			results.push(ress[i]);

		}

		results.push(r_enumerator(enumerator_list.children[2]));

	}

	return results;

}

function r_const_expr(constant_expression) {

	var data_type = "", val = "", type = "";

	var conditional_expression = constant_expression.children[0];
	var logical_or_expression = conditional_expression.children[0];
	var logical_and_expression = logical_or_expression.children[0];;
	var inclusive_or_expression = logical_and_expression.children[0];;
	var exclusive_or_expression = inclusive_or_expression.children[0];;
	var and_expression = exclusive_or_expression.children[0];;
	var equality_expression = and_expression.children[0];;
	var relational_expression = equality_expression.children[0];;
	var shift_expression = relational_expression.children[0];;
	var additive_expression = shift_expression.children[0];;
	var multiplicative_expression = additive_expression.children[0];;
	var cast_expression = multiplicative_expression.children[0];;
	var unary_expression = cast_expression.children[0];;

	if (unary_expression.children[0].name == "postfix_expression") {

		var postfix_expression = unary_expression.children[0];;
		var primary_expression = postfix_expression.children[0];;
		data_type = primary_expression.children[0];
		val = data_type.children[0].name;
		type = "val";

	} else {

		var cast_expression2 = unary_expression.children[1];
		var unary_expression2 = cast_expression2.children[0];
		var postfix_expression2 = unary_expression2.children[0];
		var primary_expression2 = postfix_expression2.children[0];
		data_type = primary_expression2.children[0];
		val = data_type.children[0].name;
		type = "ref";

	}

	return {"rval": val, "type": type, "data_type": data_type.name};

}

function r_assignment_expr(assignment_expression) {

	var data_type = "", val = "", type = "";

	var conditional_expression = assignment_expression.children[0];
	var logical_or_expression = conditional_expression.children[0];
	var logical_and_expression = logical_or_expression.children[0];;
	var inclusive_or_expression = logical_and_expression.children[0];;
	var exclusive_or_expression = inclusive_or_expression.children[0];;
	var and_expression = exclusive_or_expression.children[0];;
	var equality_expression = and_expression.children[0];;
	var relational_expression = equality_expression.children[0];;
	var shift_expression = relational_expression.children[0];;
	var additive_expression = shift_expression.children[0];;
	var multiplicative_expression = additive_expression.children[0];;
	var cast_expression = multiplicative_expression.children[0];;
	var unary_expression = cast_expression.children[0];


	if (unary_expression.children[0].name == "postfix_expression") {

		var postfix_expression = unary_expression.children[0];;
		var primary_expression = postfix_expression.children[0];;
		data_type = primary_expression.children[0];
		val = data_type.children[0].name;
		type = "val";

	} else {

		var cast_expression2 = unary_expression.children[1];
		var unary_expression2 = cast_expression2.children[0];
		var postfix_expression2 = unary_expression2.children[0];
		var primary_expression2 = postfix_expression2.children[0];
		data_type = primary_expression2.children[0];
		val = data_type.children[0].name;
		type = "ref";

	}

	return {"rval": val, "type": type, "data_type": data_type.name};

}

function r_declaration(declaration) {

	var declaration_specifiers = declaration.children[0];
	var type  = r_declaration_specifiers(declaration_specifiers);

	if (declaration.children[1].name == "init_declarator_list") {

		var init_declarator_list = declaration.children[1];
		var ids = r_init_declarator_list(init_declarator_list);

		for (var i = 0 ; i < ids.length; i++) {
			syms[ids[i].tag.name] = "VAR";
		}

		return {"data_type": type, "ids": ids};

	}

	return {"data_type": type};

}

function r_declaration_specifiers(declaration_specifiers) {

	if (declaration_specifiers.children[0].name == "type_specifier") {

		var type_specifier = declaration_specifiers.children[0];
		return r_type_specifier(type_specifier);

	}

}

function r_type_specifier(type_specifier) {

	var type = "";

	if (type_specifier.children[0].name == "IDENTIFIER") {

		var id = type_specifier.children[0];
		type = id.children[0].name;

	} else if (type_specifier.children[0].name == "struct_or_union_specifier") {

		var struct_or_union_specifier = type_specifier.children[0];
		type = 	r_struct_or_union_specifier(struct_or_union_specifier);

	} else if (type_specifier.children[0].name == "enum_specifier") {

		var enum_specifier = type_specifier.children[0];
		type = 	r_enum_specifier(enum_specifier);

	} 

	return type;

}

function r_declaration_list(declaration_list) {

	var results = [];

	if (declaration_list.children.length == 1) {

		results.push(r_declaration(declaration_list.children[0]));

	} else {

		var ress = r_declaration_list(declaration_list.children[0]);
		for (var i = 0; i < ress.length; i++) {

			results.push(ress[i]);

		}

		results.push(r_declaration(declaration_list.children[1]));

	}

	return results;

}

function emit_declaration_list(declaration_list) {

	var decs = r_declaration_list(declaration_list);

	var main = "";

	for (var i = 0; i < decs.length; i++) {

		var code = "var ";
		var data_type = (decs[i])["data_type"];
		var ids = (decs[i])["ids"];

		for (var j = 0; j < ids.length; j++) {

			var id = ids[j];
			var tag = id["tag"];
			var ival = id["ival"];

			var dec_type = tag["dec_type"];
			var name = tag["name"];

			code += name;

			if (dec_type == "var" || dec_type == "pointer") {

				if (data_type["dec_type"] != undefined) {
					if (data_type["dec_type"] == "struct_dec") {
					
						var tname = data_type["name"];
						if (id["ival"] != undefined) {

							code += (" = " + ival);
					
						}
						else code += (" = new " + tname + "()");
					
					} else if (data_type["dec_type"] == "enum_dec") {
					
						var tname = data_type["name"];
						if (id["ival"] != undefined) {

							//alert('hey');

							//var rval = ival["rval"];
							code += (" = " + tname + "." + ival);
					
						} 
					} 

				} else if (id["ival"] != undefined) {

					//alert(u);

					var rval = ival["rval"];
					code += (" = (" + ival + ")");
				}
				

			} else if (dec_type == "array") {

				if (id["ival"] != undefined) {

					code += " = [";

					var ivals = id["ival"];

					for (var x = 0; x < ivals.length; x++) {

						code += ("(" + ivals[x] + ")");

						if (x < ivals.length-1) {
							code += ", ";
						}

					}

					code += "]";

				} else {

					code += " = new Array(";

					if (data_type["dec_type"] != undefined) {
						if (data_type["dec_type"] == "struct_dec" 
							|| data_type["dec_type"] == "enum_dec") {
						
							var tname = data_type["name"];
							var asize = (tag["size"])["rval"];
							var stitch = "";

							for (var x = 0; x < asize; x++) {
								stitch += ("new " + tname + "()");
								if (x < asize-1) {
									stitch += ", ";
								}
							}

							code += (stitch + ")");
						
						} else if (data_type["dec_type"] == "enum_dec") {
						
							var tname = data_type["name"];
							if (id["ival"] != undefined) {

								var rval = ival["rval"];
								code += (" = " + tname + "." + rval);
						
							} 
						} 

					} else {
						code += ((tag["size"])["rval"] + ")");
					}
	 
				}

			}  else if (dec_type == "pointer") {

			} 

			if (j < ids.length-1) {
				code += ", ";
			}

		}

		code += ";\n";
		main += code;
	}

	return main;
}

function emit_function_definition(function_definition) {

	var def = r_function_definition(function_definition);
	var code = "function ";

	var signature = def["name"];
	var name = signature["name"];
	var params = signature["params"];

	code += (name + "(");

	for (var i = 0; i < params.length; i++) {
		var param = (params[i])["decs"];
		var pname = param["name"];

		code += pname;

		if (i < params.length-1) {
			code += ", ";
		}

	}

	code += ") ";
	return code;

}


function emit_declaration(declaration) {

	var code = "";
	var dec = r_declaration(declaration);

	var data_type = dec["data_type"];
	var members = data_type["members"];

	var dec_type = data_type["dec_type"];
	var dname = data_type["name"];


	if (dec_type == "struct_def") {
	code += ("function " + dname + " () \n{");

		for (var i = 0; i < members.length; i++) {

			var memcode = "this.";

			var mem = members[i];

			var data_type = mem["data_type"];
			var ids = mem["ids"];
			
			for (var j = 0; j < ids.length; j++) {

				var dec_type = (ids[j])["dec_type"];
				var idname = (ids[j])["name"];

				if (dec_type == "var" || dec_type == "pointer") {

					var dt = mem["data_type"];
					memcode += idname;

					if (dt["dec_type"] != undefined) {

						// var type = dt["dec_type"];

						// if (type == "struct_dec" || type == "enum_dec") {
						// 	var tname = dt["name"];
						// 	memcode += (" = new " + tname + "()");
						// }

					}
		

				} else if (dec_type == "array") {

					var dt = mem["data_type"];
					var asize = ((ids[j])["size"])["rval"];

					if (dt["dec_type"] != undefined) {

						var type = dt["dec_type"];

						if (type == "struct_dec" || type == "enum_dec") {
							var tname = dt["name"];
							memcode += (idname + " = new Array (");
							for (var x = 0; x < asize; x++) {
								memcode += ("new " + tname + "()");
								if (x < asize-1) {
									memcode += ", ";
								}
							}
							memcode += ")";
						}

					} else {
						memcode += (idname + " = new Array(" + asize + ")");
					}

				}

				if (j < ids.length-1) {
					memcode += ", ";
				}

			}

			memcode += ";";
			code += "\n" + memcode;

		}
		code += "\n}\n\n";
	} else if (dec_type == "enum_def") {
		code = "var " + dname + " = {";

		var pval = -1;

		for (var i = 0; i < members.length; i++) {

			var mem = members[i];
			var tag = mem["tag"];

			if (mem["ival"] != undefined) {

				var ival = mem["ival"];
				var rval = ival["rval"];
				pval = parseInt(rval);
				code += (tag + " : " + pval);

			} else {
				code += (tag + " : " + (++pval));
			}

			if (i < members.length-1) {
				code += ", ";
			}

		}
		code += "};\n\n";

	}

	return code;
}

function r_init_declarator(init_declarator) {

	var initvals = "";
	var declarator = init_declarator.children[0];
	var dec = r_declarator(declarator);

	if (init_declarator.children.length > 1) {

		var initializer = init_declarator.children[2];
		var assignment_expression = initializer.children[0];
		initvals = r_initializer(initializer);

	// 	if (dec["dec_type"] == "struct_dec") {

	// 	structs[dec.name] = "VAR";
	// }

		return {"tag": dec, "ival": initvals};

	}

	// if (dec["dec_type"] == "struct_dec") {

	// 	structs[dec.name] = "VAR";
	// }


	return {"tag": dec};

}

function r_init_declarator_list(init_declarator_list) {

	var results = [];

	if (init_declarator_list.children.length == 1) {

		results.push(r_init_declarator(init_declarator_list.children[0]));

	} else {

		var ress = r_init_declarator_list(init_declarator_list.children[0]);
		for (var i = 0; i < ress.length; i++) {

			results.push(ress[i]);

		}

		results.push(r_init_declarator(init_declarator_list.children[2]));

	}

	return results;

}

function r_initializer(initializer) {

	if (initializer.children[0].name == "assignment_expression") {

		assignment_expression = initializer.children[0];
		//return r_assignment_expr(assignment_expression);
		var yc =  yield_code(assignment_expression);
		//alert(yc);
		return yc;

	} else if (initializer.children[1].name == "initializer_list") {

		initializer_list = initializer.children[1];
		return r_initializer_list(initializer_list);

	}

}

function r_initializer_list(initializer_list) {

	var results = [];

	if (initializer_list.children.length == 1) {

		results.push(r_initializer(initializer_list.children[0]));

	} else {

		var ress = r_initializer_list(initializer_list.children[0]);
		for (var i = 0; i < ress.length; i++) {

			results.push(ress[i]);

		}

		results.push(r_initializer(initializer_list.children[2]));

	}

	return results;

}

function emit_translation_unit(translation_unit) {

	var code = "";

	if (translation_unit.children[0].name == "external_declaration") {

		code += emit_external_declaration(translation_unit.children[0]);

	} else if (translation_unit.children[0].name == "translation_unit") {

		code += emit_translation_unit(translation_unit.children[0]);
		code += emit_external_declaration(translation_unit.children[1]);

	}

	return code;

}

function emit_external_declaration(external_declaration) {

	var code = "";

	if (external_declaration.children[0].name == "function_definition") {
		var function_definition = external_declaration.children[0]
		code += emit_function_definition(function_definition);
	//console.log(function_definition.children[2]);
		code += emit_compound_statement(function_definition.children[2]);
	} else if (external_declaration.children[0].name == "declaration") {
		code += emit_declaration(external_declaration.children[0]);
	}
	return code;
}

function emit_compound_statement(compound_statement) {

	var code = "\n{\n";

	if (compound_statement.children.length == 2) {

	} else if (compound_statement.children.length == 3) {

		if (compound_statement.children[1].name == "statement_list") {
			code += yield_code(compound_statement.children[1]);
		} else if (compound_statement.children[1].name == "declaration_list") {
			code += emit_declaration_list(compound_statement.children[1]);
		}

	} else if (compound_statement.children.length == 4) {

		code +=  emit_declaration_list(compound_statement.children[1]);
		//console.log(code);
		code += yield_code(compound_statement.children[2]);
	}
	code += "}\n\n";
	return code;
}

function yield_code(statement_list) {

	//////console.log(statement_list);
	var x = traverse(statement_list, []);
	return emit(x);

}

function traverse(node, x) {

	if (node.children.length == 0) {
		////////console.log(node.name);
		x.push(node.name);
		return;
	}

	for (var i = 0; i < node.children.length; i++) {

		/*if (node.name == "cast_expression") {
			
			var cast_expression = node;
			if (cast_expression.children.length == 1) {
				var unary_expression = cast_expression.children[0];
				if (unary_expression.children[0].name == "postfix_expression") {
					var postfix_expression = unary_expression.children[0];
					if (postfix_expression.children.length == 1) {
						var primary_expression = postfix_expression.children[0];
						if (primary_expression.children[0].name == "IDENTIFIER") {
							var id = primary_expression.children[0];
							var name = id.children[0].name;
							x.push(name + ".val");
							continue;
						}
					}
				}
			} 
		} else if (node.name == "assignment_expression") {
			if (node.children[0].name == "unary_expression") {
				var unary_expression = node.children[0];
				if (unary_expression.children[0].name == "postfix_expression") {
					var postfix_expression = unary_expression.children[0];
					if (postfix_expression.children.length == 1) {
						var primary_expression = postfix_expression.children[0];
						if (primary_expression.children[0].name == "IDENTIFIER") {
							var id = primary_expression.children[0];
							var name = id.children[0].name;
							x.push(name + ".val");
							continue;
						}
					}
				}
			}

		}*/

		if (node.name == "PTR_OP") {

			x.push(".");
			continue;

		} 
		// else if (node.name == "primary_expression") {

		// 	var primary_expression = node;

		// 	if (primary_expression.children[0].name == "IDENTIFIER") {

		// 		var id = primary_expression.children[0].children[0].name;

		// 		alert(id);

		// 		if (syms[id] == undefined) {

		// 			var out = document.getElementById("diagnostic");
		//     		out.value = "SEMANTIC ERROR: Undeclared Variable\n\t";
		//             return;	

		// 		} 
		// 	}

		// }
		// else if (node.name == "postfix_expression") {

		// 	var postfix_expression = node;

		// 	if (postfix_expression.children.length > 1 && postfix_expression.children[1].name == "(") {

		// 		postfix_expression = postfix_expression.children[0];

		// 		if (postfix_expression.children[0].name == "primary_expression") {

		// 			var primary_expression = postfix_expression.children[0];

		// 			if (primary_expression.children[0].name == "IDENTIFIER") {

		// 				var id = primary_expression.children[0].children[0].name;
		// 				funcs[id] = "FUNC";

		// 			}
		// 		}
		// 	}

		// } else if (node.name == "primary_expression") {
		// 	var primary_expression = node;
		// 	if (primary_expression.children[0].name == "IDENTIFIER") {

		// 				var id = primary_expression.children[0].children[0].name;
		// 				funcs[id] = "FUNC";

		// 	}
		// }
		// else if (node.name == "unary_expression") {
		// 	var unary_expression = node;
		// 	if (unary_expression.children[0].name == "postfix_expression") {
		// 		var postfix_expression = unary_expression.children[0];
		// 		if (postfix_expression.children.length == 1) {
		// 			var primary_expression = postfix_expression.children[0];
		// 			if (primary_expression.children[0].name == "IDENTIFIER") {
		// 				var id = primary_expression.children[0];
		// 				var name = id.children[0].name;
		// 				//console.log(structs);
		// 				if (syms[name] == undefined && structs[name] == undefined) {
		// 					x.push(name + ".v");
		// 				} else {
		// 					x.push(name);
		// 				}
		// 				continue;
		// 			}
		// 		} else if (postfix_expression.children[1].name == ".") {

		// 		}
		// 	} else if (unary_expression.children[0].name == "unary_operator") {

		// 		var unary_operator = unary_expression.children[0];
		// 		if (unary_operator.children[0].name == "&") {

		// 			var cast_expression = unary_expression.children[1];
		// 			unary_expression = cast_expression.children[0];

		// 			if (unary_expression.children[0].name == "postfix_expression") {
		// 				var postfix_expression = unary_expression.children[0];
		// 				if (postfix_expression.children.length == 1) {
		// 					var primary_expression = postfix_expression.children[0];
		// 					if (primary_expression.children[0].name == "IDENTIFIER") {
		// 						var id = primary_expression.children[0];
		// 						var name = id.children[0].name;
		// 						x.push(name);
		// 						i++;
		// 						continue;
		// 					}
		// 				}
		// 			}

		// 		} else 
		// 		if (unary_operator.children[0].name == "*") {

		// 			var cast_expression = unary_expression.children[1];
		// 			unary_expression = cast_expression.children[0];

		// 			if (unary_expression.children[0].name == "postfix_expression") {
		// 				var postfix_expression = unary_expression.children[0];
		// 				if (postfix_expression.children.length == 1) {
		// 					var primary_expression = postfix_expression.children[0];
		// 					if (primary_expression.children[0].name == "IDENTIFIER") {
		// 						var id = primary_expression.children[0];
		// 						var name = id.children[0].name;
		// 						x.push(name+".v.v");
		// 						i++;
		// 						continue;
		// 					}
		// 				}
		// 			}

		// 		}

		// 	}
		// } 

		traverse(node.children[i], x);
	}
	return x;
}

function emit(x) {

	var code = "";
	var open = false;
	var ilevel = 0;

	for (var i = 0; i < x.length; i++) {
		
		if (x[i] == "{") {
			ilevel++;
			code += "\n{\n";
			code += indent(ilevel, x[i+1]);
		} else if (x[i] == "}") {
			ilevel--;
			code += "}\n";
			code += indent(ilevel, x[i+1]);
		} else if (x[i] == "(") {
			code += "(";
			open = true;
		}  else if (x[i] == ")") {
			code += ")";
			open = false;
		} else if (x[i] == ";") {
			code += ";"	
			if (open == false) {
				code += "\n";
				code += indent(ilevel, x[i+1]);
			} else {
				code += " ";
			}
		}

		else {

			switch(x[i]) {

				case "==": case "=": case "!=": case "*":
				case "%": case "/": case "-": case "+":
				case "<": case ">": case "<=": case ">=":
				case "<<": case ">>": case "&": case "|":
				case "&&": case "||": case "^": case "?":
				case ":": case "*=": case "/=": case "%=":
				case "+=": case "-=": case "<<=": case ">>=":
				case "&=": case "|=": case "^=": case "|=":

				code += (" "+ x[i] + " ");
				break;


				case ",":
				code += (" "+ x[i]);
				break;

				case "return": case "case":
				code += (x[i] + " ");
				break;

				case "else":
				code += (x[i] + " ");
				break;

				case "printf":
				code += ("console.log(");
				if (x[i+2][1] == '%') {i += 3;}
				else {i++;}
				break;

				case "scanf":
				if (x[i+4] == "&") {
				var cc = x[i+5] + " = scanf(" + x[i+2] + ")";
				code += cc;
				i+=6;
			}
				else {
				var cc = x[i+4] + " = scanf(" + x[i+2] + ")";
				code += cc;
				i+=5;
				}
				break;

				default:
				code += x[i];
				break;


			}
			
		}

	}

	return code;

}

function indent(ilevel, nxt) {
	if (nxt == "}") return "";
	var code = "";
	for (var i = 0; i < ilevel; i++) {
		code += "\t";
	}
	return code;
}



function cg_start(ast, libs) {

	var code = emit_translation_unit(ast);
    includes = libs;
	//console.log(code);

	$('#executeCode').attr("disabled", false);

	var out = document.getElementById("resultArea");
    out.value = code;


}

function runJS(){

	//console.clear();

	//console.log(includes);

	var libraries = [];

	libraries ["ctype.h"] = "function isalnum(ch){ return (isdigit(ch) || isalpha(ch)); } function isalpha(ch){ charCode = ch.charCodeAt(0); if(((charCode > 64) && (charCode < 91)) || ((charCode > 96) && (charCode < 123))){ return true; } return false; } function iscntrl(ch){ } function isdigit(ch){ charCode = ch.charCodeAt(0); if((charCode > 47) && (charCode < 58)){ return true; } return false; } function isgraph(ch){ charCode = ch.charCodeAt(0); if((charCode > 32) && (charCode < 127)){ return true; } return false; } function isprint(ch){ charCode = ch.charCodeAt(0); if((charCode > 31) && (charCode < 127)){ return true; } return false; } function islower(ch){ charCode = ch.charCodeAt(0); if((charCode > 96) && (charCode < 123)){ return true; } return false; } function tolower(ch){ charCode = ch.charCodeAt(0); if((charCode > 96) && (charCode < 123)){ ch.charCodeAt(0) = charCode - 32; } return ch; } function isupper(ch){ charCode = ch.charCodeAt(0); if((charCode > 64) && (charCode < 91)){ return true; } return false; } function toupper(ch){ charCode = ch.charCodeAt(0); if((charCode > 64) && (charCode < 91)){ ch.charCodeAt(0) = charCode - 32; } return ch; } function isspace(ch){ charCode = ch.charCodeAt(0); if((charCode == 32)){ return true; } return false; } function ispunct(ch){ return (isgraph(ch) && !(isalnum(ch))); } function isA2F(ch){ charCode = ch.charCodeAt(0); if(((charCode > 64) && (charCode < 71)) || ((charCode > 96) && (charCode < 103))){ return true; } return false; } function isxdigit(ch){ return (isdigit(ch) || isA2F(ch)); }";
	libraries ["errno.h"] = "var EDOM = 0; var ERANGE = 0; var errno = 0;";
	libraries ["float.h"] = "var FLT_RADIX = 2; var FLT_MANT_DIG = 6; var DBL_MANT_DIG = 6; var LDBL_MANT_DIG = 9; var FLT_DIG = 6; var DBL_DIG = 10; var LDBL_DIG = 10; var FLT_MIN_EXP = 2; var DBL_MIN_EXP = 2; var LDBL_MIN_EXP = 4; var FLT_MIN_10_EXP = -37; var DBL_MIN_10_EXP = -37; var LDBL_MIN_10_EXP = -37; var FLT_MAX_EXP =; var DBL_MAX_EXP =; var LDBL_MAX_EXP =; var FLT_MAX_10_EXP = +37; var DBL_MAX_10_EXP = +37; var LDBL_MAX_10_EXP = +37; var FLT_MAX = 1E+37; var DBL_MAX = 1E+37; var LDBL_MAX = 1E+37; var FLT_EPSILON = 1E-5; var DBL_EPSILON = 1E-9; var LDBL_EPSILON = 1E-9; var FLT_MIN = 1E-37; var DBL_MIN = 1E-37; var LDBL_MIN = 1E-37;";
	libraries ["limits.h"] = "var CHAR_BIT = 8; var SCHAR_MIN = -127; var SCHAR_MAX = +127; var UCHAR_MAX = 255; var CHAR_MIN = 0; var CHAR_MAX = 255; var MB_LEN_MAX = 1; var SHRT_MIN = -32767; var SHRT_MAX = +32767; var USHRT_MAX = 65535; var INT_MIN = -32767; var INT_MAX = +32767; var UINT_MAX = 65535; var LONG_MIN = -2147483647; var LONG_MAX = +2147483647; var ULONG_MAX = 4294967295;";
	libraries ["math.h"] = "function acos(num){ return Math.acos(num); } function abs(num){ return Math.abs(num); } function asin(num){ return Math.asin(num); } function atan(num){ return Math.atan(num); } function atan2(num){ return Math.atan2(num); } function cos(num){ return Math.cos(num); } function cosec(num){ return 1/Math.sin(num); } function cosh(num){ var term1 = Math.pow(Math.E, num); var term2 = Math.pow(Math.E, -num); return (term1 + term2) / 2; } function sinh(num){ var term1 = Math.pow(Math.E, num); var term2 = Math.pow(Math.E, -num); return (term1 - term2) / 2; } function cot(num){ return 1/Math.tan(num); } function tan(num) { return Math.tan(num); } function exp(num){ return Math.exp(num); } function floor(num){ return Math.floor(num); } function ceil(num){ return Math.ceil(num); } function log(num){ return Math.log(num); } function log10(){ return Math.LN10; } function sin(num){ return Math.sin(num); } function round(num){ return Math.round(num); } function power(num1, num2){ return Math.pow(num1, num2); } function sqrt(num){ return Math.sqrt(num); }";
	libraries ["stdlib.h"] = "function abort(){ throw new Error('Program aborted'); } function abs(num){ return Math.abs(num); } function labs(num){ return Math.abs(num); } function atexit(funcName){ object.onunload = function(){ funcName(); }; } function exit(){ throw new Error('Program exited'); } function atof(str){ return parseFloat(str); } function atoi(str){ return parseInt(str); } function atol(str){ return parseInt(str); } function div(nume, denom){ var div = Math.floor(nume/denom); var rem = nume % denom; var result = {divisionResult:div, remainderResult:rem}; return result; } function ldiv(nume, denom){ var div = Math.floor(nume/denom); var rem = nume % denom; var result = {divisionResult:div, remainderResult:rem}; return result; } function rand(){ return Math.random() * 4294967295; } function qsort(arr){ return arr.sort(); }";
	libraries ["string.h"] = "function strcat(str1, str2){ return str1 + str2; } function strncat(str1, str2, len){ str1 = str1.substring(0, len); str2 = str2.substring(0, len); return str1 + str2; } function strcmp(str1,str2){ return ( ( str1 == str2 ) ? 0 : ( ( str1 > str2 ) ? 1 : -1 ) ); } function strncmp(str1,str2, len){ str1 = str1.substring(0, len); str2 = str2.substring(0, len); return ( ( str1 == str2 ) ? 0 : (( str1 > str2 ) ? 1 : -1 )); } function strlen(str){ return str.length; } function strcpy(str1, str2){ str1 = str1 + str2; return str1; } function strncpy(str1, str2, len){ str1 = str1.substring(0, len); str2 = str2.substring(0, len); str1 = str1 + str2; return str1; } function strrchr(str, ch){ return str.lastIndexOf(ch); }";
	libraries ["time.h"] = "var CLOCKS_PER_SEC; clock(){ }";
	libraries ["stdio.h"] = "function scanf(type){ var input = window.prompt(); if(type == '%i' || type == '%l'){ input = parseInt(input); }else if(type == '%f'){ input = parseFloat(input); } return input; }";
	libraries ["regex.h"] = "function match(re, string) { var regex = new RegExp(re); return regex.test(string); }";

	var libcode = "";
	for (var i = 0; i < includes.length; i++) {
		libcode += (libraries[includes[i].trim()] + "\n" );

	}

	var code = document.getElementById("resultArea").value;
	code = libcode + "\nconst NULL = null;\nfunction $(v) {return {'v':v};}\n" + code + "\nmain()";
	//console.log(code);
	eval(code);

	delete syms;
	delete funcs;
}