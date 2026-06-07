require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding...');

  const hash = await bcrypt.hash('admin@zenith2024', 12);
  await prisma.admin.upsert({ where: { email:'admin@zenithestate.in' }, update:{}, create:{ email:'admin@zenithestate.in', passwordHash:hash, name:'Super Admin' } });
  console.log('✅ Admin: admin@zenithestate.in / admin@zenith2024');

  const settings = [
    {key:'years_of_excellence',value:'5',label:'Years of Excellence'},
    {key:'sqft_sold',value:'2',label:'Mn. Sq. Ft. Sold'},
    {key:'inventory_sold_cr',value:'500',label:'Cr. Inventory Sold'},
    {key:'team_size',value:'25',label:'Team Size'},
    {key:'phone',value:'+919999999999',label:'Phone'},
    {key:'whatsapp',value:'+919999999999',label:'WhatsApp'},
    {key:'email',value:'info@zenithestate.in',label:'Email'},
    {key:'address_noida',value:'4th Floor, Sector 107, Noida, UP',label:'Address (Noida)'},
    {key:'address_gzb',value:'',label:'Address (Ghaziabad)'},
    {key:'office_hours',value:'Mon–Sat: 10:00 AM – 7:30 PM',label:'Office Hours'},
    {key:'social_facebook',value:'',label:'Facebook URL'},
    {key:'social_instagram',value:'',label:'Instagram URL'},
    {key:'social_linkedin',value:'',label:'LinkedIn URL'},
    {key:'social_youtube',value:'',label:'YouTube URL'},
    {key:'social_whatsapp',value:'',label:'WhatsApp URL'},
    {key:'gtm_id',value:'',label:'GTM ID'},
    {key:'meta_pixel_id',value:'',label:'Meta Pixel ID'},
  ];
  for (const s of settings) await prisma.setting.upsert({ where:{key:s.key}, update:{label:s.label}, create:s });
  console.log('✅ Settings seeded');

  const projects = [
    { name:'Zenith Sky Residences', slug:'zenith-sky-residences', location:'Sector 150', sector:'Sector 150', city:'Noida', bhkTypes:'3 BHK,4 BHK', priceMin:1.85, priceMax:3.20, status:'READY_TO_MOVE', description:'Premium residences with panoramic city views and world-class amenities in Noida Expressway.', highlights:JSON.stringify(['Panoramic Views','5-Star Clubhouse','Olympic Pool','EV Charging']), amenities:JSON.stringify(['Gym','Swimming Pool','Clubhouse','Jogging Track','Children Play Area']), builderName:'Zenith Developers', reraNumber:'UPRERAPRJ000001', totalUnits:320, isActive:true, isFeatured:true, metaTitle:'Zenith Sky Residences – 3 & 4 BHK in Sector 150 Noida', metaDesc:'Luxury ready-to-move in Sector 150. From ₹1.85 Cr.' },
    { name:'Zenith Green Valley', slug:'zenith-green-valley', location:'Greater Noida West', sector:'Sector 16', city:'Greater Noida', bhkTypes:'2 BHK,3 BHK', priceMin:0.85, priceMax:1.45, status:'UNDER_CONSTRUCTION', description:'Eco-conscious township with green landscapes and modern 2 & 3 BHK homes.', highlights:JSON.stringify(['Vastu Compliant','Green Building','Smart Home Ready']), amenities:JSON.stringify(['Gym','Yoga Deck','Amphitheatre','Mini Theatre']), builderName:'Zenith Developers', reraNumber:'UPRERAPRJ000002', totalUnits:580, isActive:true, isFeatured:true, metaTitle:'Zenith Green Valley – 2 & 3 BHK Greater Noida West', metaDesc:'Under construction eco homes. From ₹85 Lakhs.' },
  ];
  for (const p of projects) await prisma.project.upsert({ where:{slug:p.slug}, update:{}, create:p });
  console.log('✅ Sample projects seeded');
  console.log('🎉 Done!');
}

main().catch(e => { console.error('❌',e); process.exit(1); }).finally(() => prisma.$disconnect());
