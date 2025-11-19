#ifndef SALES_ITEM_H
#define SALES_ITEM_H

#include <iostream>
#include <string>

class Sales_item {
 public:
  // default constructor
  Sales_item() = default;
  // constructor that reads from an input stream
  Sales_item(std::istream &is) { is >> *this; }
  // constructor that initializes from ISBN, units sold, and revenue
  Sales_item(const std::string &book, unsigned units, double sold_price)
      : bookNo(book), units_sold(units), revenue(units * sold_price) {}

  // member functions to get and set data members
  std::string isbn() const { return bookNo; }
  Sales_item &operator+=(const Sales_item &);
  Sales_item &operator-=(const Sales_item &);
  Sales_item &operator*=(double);
  Sales_item &operator/=(double);
  double avg_price() const;

  // input and output operators
  friend std::istream &operator>>(std::istream &, Sales_item &);
  friend std::ostream &operator<<(std::ostream &, const Sales_item &);
  friend bool operator==(const Sales_item &, const Sales_item &);
  friend bool operator!=(const Sales_item &, const Sales_item &);
  friend bool operator<(const Sales_item &, const Sales_item &);
  friend bool operator>(const Sales_item &, const Sales_item &);
  friend bool operator<=(const Sales_item &, const Sales_item &);
  friend bool operator>=(const Sales_item &, const Sales_item &);
  friend Sales_item operator+(const Sales_item &, const Sales_item &);

 private:
  std::string bookNo;       // ISBN
  unsigned units_sold = 0;  // number of copies sold
  double revenue = 0.0;     // total revenue from sales
};

// member function definitions
inline double Sales_item::avg_price() const {
  return units_sold ? revenue / units_sold : 0;
}

// nonmember function definitions
std::istream &operator>>(std::istream &is, Sales_item &item) {
  double price = 0;
  is >> item.bookNo >> item.units_sold >> price;
  if (is)
    item.revenue = item.units_sold * price;
  else
    item = Sales_item();  // input failed: reset object to default state
  return is;
}

std::ostream &operator<<(std::ostream &os, const Sales_item &item) {
  os << item.isbn() << " " << item.units_sold << " " << item.revenue << " "
     << item.avg_price();
  return os;
}

bool operator==(const Sales_item &lhs, const Sales_item &rhs) {
  return lhs.units_sold == rhs.units_sold && lhs.revenue == rhs.revenue &&
         lhs.isbn() == rhs.isbn();
}

bool operator!=(const Sales_item &lhs, const Sales_item &rhs) {
  return !(lhs == rhs);
}

bool operator<(const Sales_item &lhs, const Sales_item &rhs) {
  return lhs.isbn() < rhs.isbn();
}

bool operator>(const Sales_item &lhs, const Sales_item &rhs) {
  return rhs < lhs;
}

bool operator<=(const Sales_item &lhs, const Sales_item &rhs) {
  return !(rhs < lhs);
}

bool operator>=(const Sales_item &lhs, const Sales_item &rhs) {
  return !(lhs < rhs);
}

Sales_item &Sales_item::operator+=(const Sales_item &rhs) {
  units_sold += rhs.units_sold;
  revenue += rhs.revenue;
  return *this;
}

// Define the + operator in terms of +=
Sales_item operator+(const Sales_item &lhs, const Sales_item &rhs) {
  Sales_item result = lhs;
  result += rhs;
  return result;
}

#endif  // SALES_ITEM_H
