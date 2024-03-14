"use strict";


const { Book ,BookCategory} = require("./models/library.model");

module.exports = async () => {
  /* BlogCategory */

  // Get first blogCategory:
  const bookCategory = await BookCategory.findOne();
  // console.log(blogCategory._id)

  if (bookCategory) {
    Book.updateMany(
      {
        //? Filter:
        bookCategoryId: { $exists: false }, // field yok ise
      },
      {
        //? Update:
        bookCategoryId: bookCategory._id, // kaydı ata
      }
    ).catch((err) => console.log(err));
  }

  // End:
  console.log("* Synchronized *");
  /* Finished */
};
