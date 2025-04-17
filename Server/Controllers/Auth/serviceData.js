const ServiceProvider = require("../../Models/service_model");

const servicedata = async (req, res, next) => {
  try {
    const services = await ServiceProvider.find();
    res.json(services);
  } catch (error) {
    console.error(error);
  }
};


module.exports = servicedata