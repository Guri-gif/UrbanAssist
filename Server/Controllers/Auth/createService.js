const ServiceProvider = require("../../Models/service_model");
const {
  createServiveValidation,
} = require("../../Services/createServiceValidation");
const sendEmail = require("../../Utils/sendMail");

const createService = async (req, res, next) => {
  try {
    const createServiceValues = await createServiveValidation.validateAsync(
      req.body
    );
    const {
      name,
      location_type,
      basePrice,
      serviceProviderName,
      serviceProviderEmail,
      serviceProviderId,
    } = createServiceValues;

    const newService = new ServiceProvider({
      _id: serviceProviderId,
      name,
      location_type,
      basePrice,
      serviceProviderEmail,
      serviceProviderName,
      serviceProviderId,
    });

    await newService.save();

    await sendEmail(
      newService.email,
      `
              <h2>Hi there!</h2>
              <p>Your service has been created successfully on <strong>UrbanAssist</strong>.</p>
              <ul>
                <li><strong>Service:</strong> ${newService.service}</li>
                <li><strong>Location Type:</strong> ${newService.location_type}</li>
                <li><strong>Base Price:</strong> ₹${newService.basePrice}</li>
              </ul>
              <p>We're excited to help you reach more customers 🚀</p>
            `
    );
    res.status(201).json({
      success: true,
      message: "service created successfully!",
      data: {
        service: newService,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = createService;
