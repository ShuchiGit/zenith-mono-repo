const dp = require('../dataProviders/enquiry.dataProvider');
const { createHttpError } = require('../middlewares/errorHandler');
const { HTTP_STATUS } = require('../config/constants');
const { sendLeadNotification } = require('../utils/mailer');

const submitEnquiry = async (data) => {
  const enquiry = await dp.create(data);
  // Fire-and-forget — never block the API response waiting for email
  sendLeadNotification(enquiry);
  return enquiry;
};

const listEnquiries       = (f, pg)    => dp.findAll(f, pg);
const getEnquiry          = (id)       => dp.findById(id);
const updateEnquiryStatus = async (id, status) => { if (!await dp.findById(id)) throw createHttpError(`Enquiry with ID ${id} not found.`, HTTP_STATUS.NOT_FOUND); return dp.update(id, { status }); };
const updateEnquiryNotes  = async (id, notes)  => { if (!await dp.findById(id)) throw createHttpError(`Enquiry with ID ${id} not found.`, HTTP_STATUS.NOT_FOUND); return dp.update(id, { notes }); };

module.exports = { submitEnquiry, listEnquiries, getEnquiry, updateEnquiryStatus, updateEnquiryNotes };
