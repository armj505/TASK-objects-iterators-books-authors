const authors = require("./authors.json");
const books = require("./books.json");

/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  // Your code goes here
  filteredBook = books.find((x) => x.id == bookId);
  return filteredBook;
}

console.log(getBookById(12, books));

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  // Your code goes here
  findAuthor = authors.find((x) => x.name == authorName);
  return findAuthor;
}
console.log(getAuthorByName("J.K. Rowling", authors));

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  const bookCount = authors.map((x) => {
    return {
      author: x.name,
      bookCount: x.books.length,
    };
  });
  return bookCount;
}
console.log(bookCountsByAuthor(authors));

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colorValue = [...new Set(books.map((x) => x.color))];
  const colorObj = colorValue.reduce((acc, val) => {
    return { ...acc, [val]: [] };
  }, {});
  books.forEach((x) => {
    for (i = 0; i < colorValue.length; i++) {
      if (x.color == colorValue[i]) {
        colorObj[colorValue[i]].push(x.title);
      }
    }
  });
  return colorObj;
}

// return colors;
console.log(booksByColor(books));

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
  authArr = [];
  const author = getAuthorByName(authorName, authors);
  books.forEach((x) => {
    if (author.books.includes(x.id)) {
      authArr.push(x.title);
    }
  });
  return authArr;
}

console.log(titlesByAuthorName("George R.R. Martin", authors, books));

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  // Your code goes here
  const bookTotal = [...new Set(authors.map((x) => x.books.length))];
  let bookMax = Math.max(...bookTotal);
  return authors.find((x) => bookMax == x.books.length).name;
}
console.log(mostProlificAuthor(authors));

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  // Your code goes here
  const titleArr = [];
  const authorFind = books
    .find((x) => x.id == bookId)
    .authors.map((x) => x.name);
  for (i = 0; i < authorFind.length; i++) {
    titlesByAuthorName(authorFind[i], authors, books).forEach((x) =>
      titleArr.push(x)
    );
  }
  const titleUnique = [...new Set(titleArr)];
  return titleUnique;
}
console.log(relatedBooks(50, authors, books));

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // Your code goes here
  // Get co-authored book IDs
  coAuthBooks = authors
    .map((x) => x.books)
    .flat()
    .filter((e, i, a) => a.indexOf(e) !== i);
  // Get author Objects with co-authored books
  coAuth = authors.filter((x) => {
    return x.books.some((x) => coAuthBooks.indexOf(x) >= 0);
  });
  // Add co-authered book counts
  coAuth.forEach((x) => (x.coAuthorCount = 0));
  for (i = 0; i < coAuth.length; i++) {
    for (j = 0; j < coAuthBooks.length; j++) {
      if (coAuth[i].books.includes(coAuthBooks[j])) {
        coAuth[i].coAuthorCount++;
      }
    }
  }
  // find book authored with the most co-authored books
  mostCoAuthor = Math.max(...[...new Set(coAuth.map((x) => x.coAuthorCount))]);
  return coAuth.find((X) => mostCoAuthor === X.coAuthorCount).name;
}
console.log(friendliestAuthor(authors));

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor,
};
