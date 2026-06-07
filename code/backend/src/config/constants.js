const CONSTANTS = {
  PROJECT_STATUS: { UNDER_CONSTRUCTION: 'UNDER_CONSTRUCTION', READY_TO_MOVE: 'READY_TO_MOVE', NEW_LAUNCH: 'NEW_LAUNCH' },
  PROPERTY_TYPE:  { FLAT: 'FLAT', SHOP: 'SHOP', PLOT: 'PLOT', STUDIO_APARTMENT: 'STUDIO_APARTMENT' },
  ENQUIRY_STATUS: { NEW: 'NEW', CONTACTED: 'CONTACTED', CLOSED: 'CLOSED' },
  ENQUIRY_SOURCE: { HERO: 'hero', PROJECT_DETAIL: 'project_detail', PROPERTY_DETAIL: 'property_detail', STICKY_WIDGET: 'sticky_widget', CONTACT_PAGE: 'contact_page' },
  SETTING_KEYS:   { YEARS_OF_EXCELLENCE: 'years_of_excellence', SQFT_SOLD: 'sqft_sold', INVENTORY_SOLD_CR: 'inventory_sold_cr', TEAM_SIZE: 'team_size', PHONE: 'phone', WHATSAPP: 'whatsapp', EMAIL: 'email', ADDRESS_NOIDA: 'address_noida', ADDRESS_GZB: 'address_gzb', OFFICE_HOURS: 'office_hours', SOCIAL_FACEBOOK: 'social_facebook', SOCIAL_INSTAGRAM: 'social_instagram', SOCIAL_LINKEDIN: 'social_linkedin', SOCIAL_YOUTUBE: 'social_youtube', SOCIAL_WHATSAPP: 'social_whatsapp', GTM_ID: 'gtm_id', META_PIXEL_ID: 'meta_pixel_id' },
  PAGINATION:     { DEFAULT_PAGE: 1, DEFAULT_LIMIT: 12, MAX_LIMIT: 50 },
  S3_FOLDERS:     { PROJECTS: 'projects', PROPERTIES: 'properties' },
  HTTP_STATUS:    { OK: 200, CREATED: 201, NO_CONTENT: 204, BAD_REQUEST: 400, UNAUTHORIZED: 401, FORBIDDEN: 403, NOT_FOUND: 404, CONFLICT: 409, UNPROCESSABLE: 422, INTERNAL_ERROR: 500 },
};
module.exports = CONSTANTS;
