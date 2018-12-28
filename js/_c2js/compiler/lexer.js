const EOF = 0;
const PERCENT = 1;
const LOGICAL_AND = 2;
const PARAN_OPEN = 3;
const PARAN_CLOSE = 4;
const MULTIPLY = 5;
const ADD = 6;
const COMMA = 7;
const SUBTRACT = 8;
const DOT = 9;
const DIVIDE = 10;
const COLON = 11;
const SEMICOLON = 12;
const ANGLE_OPEN = 13;
const EQUALS = 14;
const ANGLE_CLOSE = 15;
const QUESTION = 16;
const ADD_ASSIGN = 17;
const AND_ASSIGN = 18;
const AND_OP = 19;
const AUTO = 20;
const BREAK = 21;
const CASE = 22;
const CHAR = 23;
const CONST = 24;
const CONSTANT = 25;
const CONTINUE = 26;
const DEC_OP = 27;
const DEFAULT = 28;
const DIV_ASSIGN = 29;
const DO = 30;
const DOUBLE = 31;
const ELLIPSIS = 32;
const ELSE = 33;
const ENUM = 34;
const EQ_OP = 35;
const EXTERN = 36;
const FLOAT = 37;
const FOR = 38;
const GE_OP = 39;
const GOTO = 40;
const IDENTIFIER = 41;
const IF = 42;
const INC_OP = 43;
const INT = 44;
const LEFT_ASSIGN = 45;
const LEFT_OP = 46;
const LE_OP = 47;
const LONG = 48;
const MOD_ASSIGN = 49;
const MUL_ASSIGN = 50;
const NE_OP = 51;
const NOT_OP = 52;
const OR_ASSIGN = 53;
const OR_OP = 54;
const PTR_OP = 55;
const REGISTER = 56;
const RETURN = 57;
const RIGHT_ASSIGN = 58;
const RIGHT_OP = 59;
const SHORT = 60;
const SIGNED = 61;
const SIZEOF = 62;
const STATIC = 63;
const STRING_LITERAL = 64;
const STRUCT = 65;
const SUB_ASSIGN = 66;
const SWITCH = 67;
const TYPEDEF = 68;
const L_TYPE_NAME = 69;
const UNION = 70;
const UNSIGNED = 71;
const VOID = 72;
const VOLATILE = 73;
const WHILE = 74;
const XOR_ASSIGN = 75;
const SQUARE_OPEN = 76;
const SQUARE_CLOSE = 77;
const XOR = 78;
const CURLY_OPEN = 79;
const LOGICAL_OR = 80;
const CURLY_CLOSE = 81;
const TILDA = 82;

var keywords = [];
keywords["auto"] = AUTO;
keywords["break"] = BREAK;
keywords["case"] = CASE;
keywords["char"] = CHAR;
keywords["const"] = CONST;
keywords["continue"] = CONTINUE;
keywords["default"] = DEFAULT;
keywords["do"] = DO;
keywords["double"] = DOUBLE;
keywords["else"] = ELSE;
keywords["enum"] = ENUM;
keywords["extern"] = EXTERN;
keywords["float"] = FLOAT;
keywords["for"] = FOR;
keywords["goto"] = GOTO;
keywords["if"] = IF;
keywords["int"] = INT;
keywords["long"] = LONG;
keywords["register"] = REGISTER;
keywords["return"] = RETURN;
keywords["short"] = SHORT;
keywords["signed"] = SIGNED;
keywords["sizeof"] = SIZEOF;
keywords["static"] = STATIC;
keywords["struct"] = STRUCT;
keywords["switch"] = SWITCH;
keywords["typedef"] = TYPEDEF;
keywords["union"] = UNION;
keywords["unsigned"] = UNSIGNED;
keywords["void"] = VOID;
keywords["volatile"] = VOLATILE;
keywords["while"] = WHILE;

function inRange(c, x, y) {
    if (c >= x && c <= y) {
        return true;
    }
    return false;
}

function isLetter(c) {
    if ((c >= 'a' && c <= 'z') ||
		 (c >= 'A' && c <= 'Z')) {
        return true;
    }

    return false;
}

function isDigit(c) {
    if (c >= '0' && c <= '9') {
        return true;
    }

    return false;
}

function isHex(c) {
    if ((c >= 'a' && c <= 'f') ||
		 (c >= 'A' && c <= 'F') ||
		 isDigit(c)) {
        return true;
    }

    return false;
}

function isAlphaNum(c) {
    return isDigit(c) || isLetter(c);
}

function error(num) {
    var cols = i % rows;
    var out = document.getElementById("diagnostic");
    out.value = "LEXER ERROR: \n\t";
    //out.value += "Error at row " + rows + " and column " + cols + " : " + input.substr(lastIndex, currentOffset);
    out.value += "Error in row #" + rows + ",  -> " + input.substr(lastIndex, currentOffset);
}

function retract(s) {
    ////console.log(">>>>RET:" + lastIndex + ":" + currentOffset + ":" + s);
    var lexeme = input.substr(lastIndex, currentOffset);
    lastIndex += currentOffset;
    currentOffset = -1;

    state = 0;
    i--;
    lexemes.push(lexeme);
    tokenize(s, lexeme.trim());
}

function isKeyword(ID) {
    for (var kw = 0; kw < keywords.length; kw++) {
        if (keywords[kw] == ID)
            return true;
    }
    return false;
}

function stateToToken(state) {
    var token = "";

    switch (state) {

        case 1: case 3: case 4: case 5: case 6: case 7:
            token = "I_CONSTANT";
            break;

        case 8: case 9: case 12: case 13:
            token = "F_CONSTANT";
            break;

        case 14:
            token = "IDENTIFIER";
            break;

        case 18:
            token = "C_CONSTANT";
            break;

        case 22:
            token = "STRING_LITERAL";
            break;

        case 23:
            token = ".";
            break;

        case 25:
            token = "ELLIPSIS";
            break;

        case 26:
            token = "<";
            break;

        case 27:
            token = "LE_OP";
            break;

        case 28:
            token = "LEFT_OP";
            break;

        case 29:
            token = "LEFT_ASSIGN";
            break;

        case 30:
            token = ">";
            break;

        case 31:
            token = "GE_OP";
            break;

        case 32:
            token = "RIGHT_OP";
            break;

        case 33:
            token = "RIGHT_ASSIGN";
            break;

        case 34:
            token = "+";
            break;

        case 35:
            token = "INC_OP";
            break;

        case 36:
            token = "ADD_ASSIGN";
            break;

        case 37:
            token = "-";
            break;

        case 38:
            token = "DEC_OP";
            break;

        case 39:
            token = "SUB_ASSIGN";
            break;

        case 40:
            token = "PTR_OP";
            break;

        case 41:
            token = "/";
            break;

        case 42:
            token = "DIV_ASSIGN";
            break;

        case 43:
            token = "*";
            break;

        case 44:
            token = "MUL_ASSIGN";
            break;

        case 45:
            token = "%";
            break;

        case 46:
            token = "MOD_ASSIGN";
            break;

        case 47:
            token = "&";
            break;

        case 48:
            token = "AND_OP";
            break;

        case 49:
            token = "AND_ASSIGN";
            break;

        case 50:
            token = "|";
            break;

        case 51:
            token = "OR_OP";
            break;

        case 52:
            token = "OR_ASSIGN";
            break;

        case 53:
            token = "^";
            break;

        case 54:
            token = "XOR_ASSIGN";
            break;

        case 55:
            token = "=";
            break;

        case 56:
            token = "EQ_OP";
            break;

        case 57:
            token = "!";
            break;

        case 58:
            token = "NE_OP";
            break;

        case 59:
            token = ";";
            break;

        case 60:
            token = "{";
            break;

        case 61:
            token = "}";
            break;

        case 62:
            token = ",";
            break;

        case 63:
            token = ":";
            break;

        case 64:
            token = "(";
            break;

        case 65:
            token = ")";
            break;

        case 66:
            token = "[";
            break;

        case 67:
            token = "]";
            break;

        case 68:
            token = "~";
            break;

        case 69:
            token = "?";
            break;

        default:
            alert("Unknown state!");
            break;

    }

    return token;
}



function stateToConst(state) {
    var token = "";

    switch (state) {

        case 1: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 12: case 13: case 18:
            token = CONSTANT;
            break;

        case 14:
            token = IDENTIFIER;
            break;

        case 22:
            token = STRING_LITERAL;
            break;

        case 23:
            token = DOT;
            break;

        case 25:
            token = ELLIPSIS;
            break;

        case 26:
            token = ANGLE_OPEN;
            break;

        case 27:
            token = LE_OP;
            break;

        case 28:
            token = LEFT_OP;
            break;

        case 29:
            token = LEFT_ASSIGN;
            break;

        case 30:
            token = ANGLE_CLOSE;
            break;

        case 31:
            token = GE_OP;
            break;

        case 32:
            token = RIGHT_OP;
            break;

        case 33:
            token = RIGHT_ASSIGN;
            break;

        case 34:
            token = ADD;
            break;

        case 35:
            token = INC_OP;
            break;

        case 36:
            token = ADD_ASSIGN;
            break;

        case 37:
            token = SUBTRACT;
            break;

        case 38:
            token = DEC_OP;
            break;

        case 39:
            token = SUB_ASSIGN;
            break;

        case 40:
            token = PTR_OP;
            break;

        case 41:
            token = DIVIDE;
            break;

        case 42:
            token = DIV_ASSIGN;
            break;

        case 43:
            token = MULTIPLY;
            break;

        case 44:
            token = MUL_ASSIGN;
            break;

        case 45:
            token = PERCENT;
            break;

        case 46:
            token = MOD_ASSIGN;
            break;

        case 47:
            token = LOGICAL_AND;
            break;

        case 48:
            token = AND_OP;
            break;

        case 49:
            token = AND_ASSIGN;
            break;

        case 50:
            token = LOGICAL_OR;
            break;

        case 51:
            token = OR_OP;
            break;

        case 52:
            token = OR_ASSIGN;
            break;

        case 53:
            token = XOR;
            break;

        case 54:
            token = XOR_ASSIGN;
            break;

        case 55:
            token = EQUALS;
            break;

        case 56:
            token = EQ_OP;
            break;

        case 57:
            token = NOT_OP;
            break;

        case 58:
            token = NE_OP;
            break;

        case 59:
            token = SEMICOLON;
            break;

        case 60:
            token = CURLY_OPEN;
            break;

        case 61:
            token = CURLY_CLOSE;
            break;

        case 62:
            token = COMMA;
            break;

        case 63:
            token = COLON;
            break;

        case 64:
            token = PARAN_OPEN;
            break;

        case 65:
            token = PARAN_CLOSE;
            break;

        case 66:
            token = SQUARE_OPEN;
            break;

        case 67:
            token = SQUARE_CLOSE;
            break;

        case 68:
            token = TILDA;
            break;

        case 69:
            token = QUESTION;
            break;

        default:
            alert("Unknown state!");
            break;

    }

    return token;
}

function toke(s, l) {

    var tok = stateToToken(s);

    if (tok == "IDENTIFIER" && isKeyword(l)) {
        tokens.push(l.toUpperCase());
    }

    else {
        tokens.push(tok);
    }
}

function tokenize(s, l) {

    var des = keywords[l];
    var tok_class = stateToToken(s);

    if (des) {
        tokens.push([des, l, tok_class]);
    }
    else {
        var tok = stateToConst(s);
        tokens.push([tok, l, tok_class]);
    }
}

var state = 0;
var lastIndex = 0;
var currentOffset = 0;
var i = 0;
var input = "";
var lexemes = [];
var tokens = [];
var rows = 0;


function start() {
    //console.clear();
    var out = document.getElementById("diagnostic");
    out.value = "";

    state = 0;
    lastIndex = 0;
    currentOffset = 0;
    i = 0;
    input = "";
    lexemes = [];
    tokens = [];
    rows = 0;

    input = document.getElementById("codeArea").value + "\0";

    //console.log(input);

    var lines = input.split("\n");

    var libs = [];
    var x;

    for (x = 0; x < lines.length; x++) {

        var line = lines[x].trim();

        if (line[0] == "#") {
            line = line.replace(/\s+/g, '');
            line = line.replace("#include", '');
            line = line.replace("<", '');
            line = line.replace(">", '');
            libs.push(line);
        } else {
         break;   
        }

    }

    //console.log(libs);

    input = "";

    for (x; x < lines.length; x++) {
        input += (lines[x] + "\n");
    }

    for (i = 0; i < input.length; i++) {
        var c = input[i];
        ////console.log(state + ":" + c);

        switch (state) {

            case 0:

                if (c == '0') {
                    state = 1;
                }

                else if (inRange(c, '1', '9')) {
                    state = 7;
                }

                else if (isLetter(c) || c == '_') {
                    state = 14;
                }

                else if (c == '\'') {
                    state = 15;
                }

                else if (c == 'L') {
                    state = 19;
                }

                else if (c == '"') {
                    state = 20;
                }

                else if (c == '.') {
                    state = 23;
                }

                else if (c == '<') {
                    state = 26;
                }

                else if (c == '>') {
                    state = 30;
                }

                else if (c == '+') {
                    state = 34;
                }

                else if (c == '-') {
                    state = 37;
                }

                else if (c == '/') {
                    state = 41;
                }

                else if (c == '*') {
                    state = 43;
                }

                else if (c == '%') {
                    state = 45;
                }

                else if (c == '&') {
                    state = 47;
                }

                else if (c == '|') {
                    state = 50;
                }

                else if (c == '^') {
                    state = 53;
                }

                else if (c == '=') {
                    state = 55;
                }

                else if (c == '!') {
                    state = 57;
                }

                else if (c == ';') {
                    state = 59;
                }

                else if (c == '{') {
                    state = 60;
                }

                else if (c == '}') {
                    state = 61;
                }

                else if (c == ',') {
                    state = 62;
                }

                else if (c == ':') {
                    state = 63;
                }

                else if (c == '(') {
                    state = 64;
                }

                else if (c == ')') {
                    state = 65;
                }

                else if (c == '[') {
                    state = 66;
                }

                else if (c == ']') {
                    state = 67;
                }

                else if (c == '~') {
                    state = 68;
                }

                else if (c == '?') {
                    state = 69;
                }

                else {
                    if (c == '\n') rows++;
                    if (c != '\n' && c != '\t' && c != '\b' && c != '\0' && c != '\v' && c != '\f' && c != ' ')
                    {
                        error(0);
                    }
                    lastIndex = i + 1;
                    currentOffset = -1;
                    // ignore!
                }

                break;

            case 1:

                if (c == 'x' || c == 'X') {
                    state = 2;
                }

                else if (inRange(c, '0', '7')) {
                    state = 6;
                }

                else if (c == '.') {
                    state = 8;
                }

                else {
                    retract(1);
                }

                break;

            case 2:

                if (isHex(c)) {
                    state = 3;
                }

                else {
                    error(2);
                }

                break;

            case 3:

                if (isHex(c)) {
                    state = 3;
                }

                else if (c == 'u' || c == 'U' || c == 'l' || c == 'L') {
                    state = 4;
                }

                else {
                    retract(3);
                }

                break;

            case 4:

                if (c == 'l' || c == 'L') {
                    state = 5;
                }

                else {
                    retract(4);
                }

                break;

            case 5:

                retract(5);

                break;


            case 6:

                if (inRange(c, '0', '7')) {
                    state = 6;
                }

                else if (c == 'u' || c == 'U' || c == 'l' || c == 'L') {
                    state = 4;
                }

                else {
                    retract(6);
                }

                break;

            case 7:

                if (isDigit(c)) {
                    state = 7;
                }

                else if (c == '.') {
                    state = 8;
                }

                else {
                    retract(7);
                }

                break;

            case 8:

                if (isDigit(c)) {
                    state = 9;
                }

                else {
                    retract(8);
                }

                break;

            case 9:

                if (isDigit(c)) {
                    state = 9;
                }

                else if (c == 'e') {
                    state = 10;
                }

                else {
                    retract(9);
                }

                break;

            case 10:

                if (isDigit(c)) {
                    state = 12;
                }

                else if (c == '+' || c == '-') {
                    state = 11;
                }
                else {
                    error(10);
                }

                break;

            case 11:

                if (isDigit(c)) {
                    state = 12;
                }

                else {
                    error(11);
                }

                break;

            case 12:

                if (isDigit(c)) {
                    state = 12;
                }

                else if (c == 'f' || c == 'F') {
                    state = 13;
                }

                else {
                    retract(12);
                }

                break;

            case 13:

                retract(13);

                break;

            case 14:

                if (isAlphaNum(c) || c == '_') {
                    state = 14;
                }
                else {
                    retract(14);
                }

                break;

            case 15:

                if (c == '\\') {
                    state = 17;
                }
                else if (c == '\'' || c == '\n') {
                    error(15);
                }
                else {
                    state = 16;
                }

                break;

            case 16:

                if (c == '\'') {
                    state = 18;
                }
                else if (c == '\n') {
                    error(16);
                }
                else if (c == '\\') {
                    state = 17;
                }
                else {
                    state = 16;
                }

                break;

            case 17:

                if (c == '\n') {
                    error(17);
                }
                else {
                    state = 16;
                }

                break;

            case 18:

                retract(18);

                break;

            case 19:

                if (c == '\'') {
                    state = 15;
                }

                else if (c == '"') {
                    state = 20;
                }
                else {
                    error(19);
                }

                break;

            case 20:

                if (c == '"') {
                    state = 22;
                }
                else if (c == '\\') {
                    state = 21;
                }
                else if (c == '\n') {
                    error(20);
                }
                else {
                    state = 20;
                }

                break;

            case 21:

                state = 20;

                break;

            case 22:

                retract(22);

                break;

            case 23:

                if (c == '.') {
                    state = 24;
                }
                else {
                    retract(23);
                }

                break;

            case 24:

                if (c == '.') {
                    state = 25;
                }
                else {
                    error(24);
                }
                break;

            case 25:

                retract(25);

                break;

            case 26:

                if (c == '=') {
                    state = 27;
                }
                else if (c == '<') {

                    state = 28;
                }
                else {
                    retract(26);
                }

                break;

            case 27:

                retract(27);

                break;

            case 28:

                if (c == '=') {
                    state = 29;
                }
                else {
                    retract(28);
                }

                break;

            case 29:

                retract(29);

                break;

            case 30:

                if (c == '=') {
                    state = 31;
                }
                else if (c == '>') {

                    state = 32;
                }
                else {
                    retract(30);
                }

                break;

            case 31:

                retract(31);

                break;

            case 32:

                if (c == '=') {
                    state = 33;
                }
                else {
                    retract(32);
                }

                break;

            case 33:

                retract(33);

                break;

            case 34:

                if (c == '+') {
                    state = 35;
                }

                else if (c == '=') {
                    state = 36;
                }

                else {
                    retract(34);
                }

                break;

            case 35:

                retract(35);

                break;

            case 36:

                retract(36);

                break;

            case 37:

                if (c == '-') {
                    state = 38;
                }

                else if (c == '=') {
                    state = 39;
                }

                else if (c == '>') {
                    state = 40;
                }

                else {
                    retract(37);
                }

                break;

            case 38:

                retract(38);

                break;

            case 39:

                retract(39);

                break;

            case 40:

                retract(40);

                break;

            case 41:

                if (c == '=') {
                    state = 42;
                }

                else if (c == '/') {
                    state = 411;
                }

                else if (c == '*') {
                    state = 412;
                }

                else {
                    retract(41);
                }

                break;

            case 42:
                retract(42);
                break;

            case 411:
                while (input[i] != '\n') i++;
                lastIndex = i;
                currentOffset = 0;
                state = 0;
                break;

            case 412:
                if (c == '*') {
                    state = 413;
                }
                else {
                    state = 412;
                }
                break;

            case 413:
                if (c == '/') {
                    lastIndex = i;
                    currentOffset = 0;
                    state = 0;
                }
                else {
                    state = 412;
                }
                break;

            case 43:
                if (c == '=') {
                    state = 44;
                }
                else {
                    retract(43);
                }
                break;

            case 44:
                retract(44);
                break;

            case 45:
                if (c == '=') {
                    state = 46;
                }
                else {
                    retract(45);
                }
                break;

            case 46:
                retract(46);
                break;

            case 47:

                if (c == '&') {
                    state = 48;
                }

                else if (c == '=') {
                    state = 49;
                }

                else {
                    retract(47);
                }

                break;

            case 48:

                retract(48);

                break;

            case 49:

                retract(49);

                break;

            case 50:

                if (c == '|') {
                    state = 51;
                }

                else if (c == '=') {
                    state = 52;
                }

                else {
                    retract(50);
                }

                break;
//changed from
            case 51:

                retract(51);

                break;

            case 52:

                retract(52);

                break;
//changed till
            case 53:
                if (c == '=') {
                    state = 54;
                }
                else {
                    retract(53);
                }
                break;

            case 54:
                retract(54);
                break;

            case 55:
                if (c == '=') {
                    state = 56;
                }
                else {
                    retract(55);
                }
                break;

            case 56:
                retract(56);
                break;

            case 57:

                if (c == '=') {
                    state = 58;
                }
                else {
                    retract(57);
                }

                break;

            case 58:
                retract(58);
                break;

            case 59:
                retract(59);
                break;

            case 60:
                retract(60);
                break;

            case 61:
                retract(61);
                break;

            case 62:
                retract(62);
                break;

            case 63:
                retract(63);
                break;

            case 64:
                retract(64);
                break;

            case 65:
                retract(65);
                break;

            case 66:
                retract(66);
                break;

            case 67:
                retract(67);
                break;

            case 68:
                retract(68);
                break;

            case 69:
                retract(69);
                break;

            default:
                alert("Error el Grande!");
                break;
        }

        currentOffset++;
    }

    tokens.push([EOF, "\\EOF"]);

    // var out = document.getElementById("tokens");
    // out.value = "";

    // for (var k = 0; k < tokens.length; k++) {
    //     out.value += (tokens[k][0] + " : " + tokens[k][1] + " : " + tokens[k][2] + "\n");
    // }

    //console.clear();
    p_start(tokens, libs);
}