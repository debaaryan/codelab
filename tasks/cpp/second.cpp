// No declarations/initializations within {} block produce error because of
// jumping
#include <iostream>
using namespace std;

int main() {
  bool isArray = false;

  switch (isArray) {
    case true: {
      int ival;
      int jval = 0;
      string user_name;
      string file_name = "file.txt";
    }
      cout << "It is an Array" << endl;
      break;
    case false:
      cout << "Not an Array" << endl;
  }
}

/*
Not an Array
 */
