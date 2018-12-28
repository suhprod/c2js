# c2js
A compiler that converts C language to JavaScript code.

A totally client-side coded compiler that converts your c code to javascript code. 
Really, nothing more defination needed than that! 


====

By:
  Shabbir,
  Danish,
  Usman.
  
====

# Sample C Code
#Declaration
int main()
{

int a, b;
char c;
char d;
long lg1 = 12345, lg2 = 9876;
float f1 = 0.187;
double darr[10];
short s[4] = {1, 2, 3, 4};
char *nm = "ucp";

printf("%s", "Hello World");

}

#Arithmetic
int main()
{

int a = 3, b = 2, c = 1, d = 0;
c = a * b;
d = (a % b);

printf("%d", c);
printf("%d", d);

c = a + b;
d = b - a;

printf("%d", c);
printf("%d", d);

}

#Conditions
int main()
{

int a[5] = {1, 2, 3, 4, 5};

int i = 0, sum = 0;

for (i = 0; i < 5; i++) {

    sum += a[i];
    printf("%d", a[i]);

    if (i == 3) {
       printf("i = 3");
    }

}
printf("%d", sum);

switch (i) {
case 1:
sum = 10;
break;

case 2:
sum = 20;
break;

case 3:
sum = 30;
break;

case 4:
sum = 40;
break;

case 5:
sum = 50;
break;
}

printf("%d", sum);


}

#Loop
int main()
{

int a[5] = {1, 2, 3, 4, 5};

int i = 0, sum = 0;

for (i = 0; i < 5; i++) {

    sum += a[i];
    printf("%d", a[i]);

    if (i == 3) {
       printf("i = 3");
    }

}

printf("%d", sum);
}

#Strings
###include <string.h>

int main()
{
char *a = "University of";
char *b = "University of Punjab";
char *c = "Central Punjab";
int res = 0;

char *d = strcat(a,c);
printf(d);

res = strcmp(b, c);
printf("%d", res);

res = strncmp(a, b, 8);
printf("%d", res);

res = strlen(a);
printf("%d", res);

}

#LinkList
##include <stdio.h>

struct node
{
int data;
struct node *next;
};

void print(struct node root) 
{
struct node tmp = root;
while(tmp != NULL)
{
	printf("%d", tmp.data);
	tmp = tmp.next;
}
}

int  main() 
{
struct node nodes[3];
int i = 0, x = 0;

for (i = 0; i < 2; i++) {


	printf("%s", "Enter data: ");
	scanf("%d", &x);

nodes[i].data = x;
nodes[i].next = nodes[i+1];

}
printf("%s", "Enter data: ");
scanf("%d", &x);
nodes[i].data = x;
nodes[i].next = NULL;

print(nodes[0]);

}

#Structs
struct myS {
int s_roll;
char *s_name;
};


int main()
{
struct myS std;

std.roll = 257;
std.s_name = "john";

printf("%d", std.roll);
printf(std.s_name);

}

#Regex
##include <regex.h>
##include <stdio.h>

int main()
{
char *s = "";
int x = 0;
scanf("%s",  s);
x = match("^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$", s);

printf("%d", x);

}