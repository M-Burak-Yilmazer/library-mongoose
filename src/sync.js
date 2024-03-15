"use strict";
const User = require("./models/user.model")

const { Book ,BookCategory} = require("./models/library.model");

module.exports = async () => {
  /* BlogCategory */

  // Get first bookCategory:
  // const bookCategory = await BookCategory.findOne();
  // console.log(blogCategory._id)

  // if (bookCategory) {
  //   Book.updateMany(
  //     {
  //       //? Filter:
  //       bookCategoryId: { $exists: false }, // field yok ise
  //     },
  //     {
  //       //? Update:
  //       bookCategoryId: bookCategory._id, // kaydı ata
  //     }
  //   ).catch((err) => console.log(err));
  // }

  /* Exampla Data */
  // Deleted All Records:
  await User.deleteMany().then(() => console.log(" - User Deleted All"));
  await BookCategory.deleteMany().then(() =>
    console.log(" - BlogCategory Deleted All")
  );
  await Book.deleteMany().then(() =>
    console.log(" - BlogPost Deleted All")
  );

  // Example User:
  const user = await User.create({
    email: "test@test.com",
    password: "12345678",
    firstName: "Test",
    lastName: "Test",
  });
  // Example Category:
  const bookCategory = await BookCategory.create({
    name: "Test Category",
  });
  // Example Posts:
  for (let key in [...Array(200)]) {
    await Book.create({
      userId: user._id,
      bookCategoryId: bookCategory._id,
      title: `test ${key} title`,
      author: `test ${key} author`,
      publicationYear: 2012,
      ISBN: `${key}`,
      genre: `test ${key} genre`,
      image: `https://picsum.photos/id/${key}/200/300`,
      published: Boolean(key % 2),
    });
  }
  

  // End:
  console.log("* Synchronized *");
  /* Finished */
};
