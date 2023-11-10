const sql = require("./db.js");

const Review = function(review) {
  this.user_id = review.user_id;
  this.restaurant_id = review.restaurant_id;
  this.rating = review.rating;
  this.comment = review.comment;
  this.review_date = review.review_date;
};

Review.create = (newReview, result) => {
  sql.query("INSERT INTO SJP_db.Reviews SET ?", newReview, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created review: ", { id: res.insertId, ...newReview });
    result(null, { id: res.insertId, ...newReview });
  });
};

Review.findById = (id, result) => {
  sql.query(`SELECT * FROM SJP_db.Reviews WHERE review_id = ${id}`, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found review: ", res[0]);
      result(null, res[0]);
      return;
    }

    // Review with the given ID not found
    result({ kind: "not_found" }, null);
  });
};

Review.getAll = (result) => {
  sql.query("SELECT * FROM SJP_db.Reviews", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log("Reviews: ", res);
    result(null, res);
  });
};

Review.updateById = (id, review, result) => {
  sql.query(
    "UPDATE SJP_db.Reviews SET user_id = ?, restaurant_id = ?, rating = ?, comment = ?, review_date = ? WHERE review_id = ?",
    [review.user_id, review.restaurant_id, review.rating, review.comment, review.review_date, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // Review with the given ID not found
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated review: ", { id: id, ...review });
      result(null, { id: id, ...review });
    }
  );
};

Review.remove = (id, result) => {
  sql.query("DELETE FROM SJP_db.Reviews WHERE review_id = ?", id, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // Review with the given ID not found
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted review with review_id: ", id);
    result(null, res);
  });
};

Review.removeAll = (result) => {
  sql.query("DELETE FROM SJP_db.Reviews", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }

    console.log(`Deleted ${res.affectedRows} reviews`);
    result(null, res);
  });
};

module.exports = Review;