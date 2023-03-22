const validate = (req, res, next) => {
  const { name, image, life_span, height, weight, temps } = req.body;
  if (!name || !image || !life_span || !height || !weight) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (!temps.length)
    return res
      .status(400)
      .json({ message: "The breed must have at least one temperament" });
  next();
};
module.exports = validate;
