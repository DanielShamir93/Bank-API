const User = require("../../../db/models/userModel");

const makeDeposit = async (req, res) => {
  try {
    if (req.body.hasOwnProperty("amount")) {
      const { amount } = req.body;
      const { id } = req.params;

      if (+amount > 0) {
        const prevData = await User.findById(id).select("cash");
        const updatedCash = prevData.cash + +amount;
        const updatedDoc = await User.findByIdAndUpdate(id, {
          cash: updatedCash,
        });

        res.status(200).send(`user: ${id} updated.\ncash = ${updatedDoc.cash}`);
      } else {
        res.status(200).send("Amount must be positive.");
      }
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = makeDeposit;
