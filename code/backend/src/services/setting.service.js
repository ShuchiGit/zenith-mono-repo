const dp = require('../dataProviders/setting.dataProvider');
const getAllSettings    = async () => { const s = await dp.findAll(); return s.reduce((a,x) => { a[x.key]=x.value; return a; }, {}); };
const getAllSettingsMeta = () => dp.findAll();
const updateSettings   = async (updates) => { await Promise.all(updates.map(({key,value}) => dp.upsert(key,value))); return getAllSettings(); };
module.exports = { getAllSettings, getAllSettingsMeta, updateSettings };
