-- Zenith Estate — seed real projects & properties from 360propguide.com data
-- Run: mysql -u zenith_user -pZenith@12345 zenith_estate < seed_data.sql

SET NAMES utf8mb4;

-- ─── Clear existing project/property data (keep Admin, Settings, Enquiries) ───
DELETE FROM Property;
DELETE FROM Project;

-- ─── PROJECTS ───────────────────────────────────────────────────────────────

INSERT INTO Project
  (name, slug, location, sector, city, bhkTypes, priceMin, priceMax, status,
   description, highlights, amenities,
   reraNumber, builderName, totalUnits,
   isActive, isFeatured,
   metaTitle, metaDesc, createdAt, updatedAt)
VALUES

-- 1. Godrej Tropical Isle
('Godrej Tropical Isle',
 'godrej-tropical-isle',
 'Sector 146', 'Sector 146', 'Noida',
 '3 BHK,4 BHK',
 2.90, 4.39,
 'UNDER_CONSTRUCTION',
 'Godrej Tropical Isle is a premium residential project at Sector 146, Noida Expressway, inspired by the finest island resorts of the world. Offering spacious 3 & 4 BHK apartments with breathtaking views of the Yamuna floodplains and access to an extensive sports and leisure zone.',
 '["Noida Expressway Location","Yamuna Floodplain Views","Island-Inspired Architecture","Extensive Sports Zone","Vastu Compliant","Gated Community"]',
 '["Olympic-Size Swimming Pool","Tennis Courts","Basketball Court","Gymnasium","Spa & Wellness","Amphitheatre","Jogging Track","Kids Play Area","Clubhouse","24x7 Security"]',
 'UPRERAPRJ303390', 'Godrej Properties', 840,
 1, 1,
 'Godrej Tropical Isle Sector 146 Noida — 3 & 4 BHK from ₹2.90 Cr',
 'Godrej Tropical Isle at Sector 146, Noida Expressway. Premium 3 & 4 BHK apartments from ₹2.90 Cr. RERA registered.',
 NOW(), NOW()),

-- 2. ACE Golfshire
('ACE Golfshire',
 'ace-golfshire',
 'Sector 150', 'Sector 150', 'Noida',
 '2 BHK,3 BHK,4 BHK',
 1.09, 2.90,
 'READY_TO_MOVE',
 'ACE Golfshire is a ready-to-move luxury residential project located in the prestigious Sector 150, Noida Expressway. Designed by renowned architect Hafeez Contractor with landscaping by renowned designer Gauri Khan, it offers 2, 3 & 4 BHK apartments with golf course views.',
 '["Ready to Move","Golf Course Views","Hafeez Contractor Design","Gauri Khan Landscaping","Noida Expressway","RERA Registered"]',
 '["9-Hole Golf Course","Infinity Pool","Gymnasium","Clubhouse","Tennis Courts","Cricket Ground","Yoga Deck","Party Hall","Concierge Services","EV Charging"]',
 'UPRERAPRJ147823', 'ACE Group', 1472,
 1, 1,
 'ACE Golfshire Sector 150 Noida — Ready to Move 2/3/4 BHK from ₹1.09 Cr',
 'ACE Golfshire at Sector 150 Noida Expressway. Ready to move 2, 3 & 4 BHK luxury apartments from ₹1.09 Cr.',
 NOW(), NOW()),

-- 3. M3M The Cullinan
('M3M The Cullinan',
 'm3m-the-cullinan',
 'Sector 94', 'Sector 94', 'Noida',
 '3 BHK,4 BHK,5 BHK',
 5.89, 13.23,
 'UNDER_CONSTRUCTION',
 'M3M The Cullinan redefines ultra-luxury living in Sector 94, Noida. Drawing inspiration from the world-famous Cullinan diamond, this iconic high-rise development features premium 3, 4 & 5 BHK residences with panoramic city views, world-class amenities, and impeccable design.',
 '["Ultra Luxury High-Rise","Panoramic City Views","World-Class Amenities","Prime Sector 94 Location","Smart Home Technology","Concierge Services"]',
 '["Rooftop Infinity Pool","Sky Lounge","Private Theatre","Cigar Lounge","State-of-the-art Gymnasium","Squash Court","Indoor Games","Business Centre","Valet Parking","Helipad"]',
 'UPRERAPRJ294801', 'M3M India', 520,
 1, 1,
 'M3M The Cullinan Sector 94 Noida — Ultra Luxury 3/4/5 BHK from ₹5.89 Cr',
 'M3M The Cullinan at Sector 94 Noida. Ultra luxury 3, 4 & 5 BHK high-rise apartments from ₹5.89 Cr.',
 NOW(), NOW()),

-- 4. Trump Towers Noida
('Trump Towers Noida',
 'trump-towers-noida',
 'Sector 94', 'Sector 94', 'Noida',
 '4 BHK,5 BHK',
 13.23, 19.70,
 'NEW_LAUNCH',
 'Trump Towers Noida is the most prestigious address in Delhi NCR, co-developed by Tribeca Developers and Trump Organization. Featuring iconic architecture, 4 & 5 BHK super-luxury residences in Sector 94, Noida with unmatched views, white-glove services, and Trump-branded hospitality.',
 '["Trump Branded Residence","Iconic Architecture","White-Glove Services","Sector 94 Prime Location","Panoramic Views","Branded Interiors"]',
 '["Trump-Brand Concierge","Rooftop Pool & Bar","Private Cinema","Wine Cellar","Cigar Lounge","Valet Parking","Helipad","Business Centre","Spa","Butler Service"]',
 'UPRERAPRJ318940', 'Tribeca Developers', 270,
 1, 1,
 'Trump Towers Noida Sector 94 — Super Luxury 4 & 5 BHK from ₹13.23 Cr',
 'Trump Towers Noida at Sector 94. Super luxury 4 & 5 BHK branded residences from ₹13.23 Cr by Tribeca Developers.',
 NOW(), NOW()),

-- 5. Sobha Rivana
('Sobha Rivana',
 'sobha-rivana',
 'Sector 1, Greater Noida West', 'Sector 1', 'Greater Noida',
 '3 BHK,4 BHK',
 1.80, 3.57,
 'NEW_LAUNCH',
 'Sobha Rivana is a new-age luxury residential township in Sector 1, Greater Noida West by the renowned Sobha Group. Offering meticulously crafted 3 & 4 BHK residences amidst 6 acres of lush landscaped greens with premium amenities and Sobha''s legendary quality construction.',
 '["Sobha Quality Construction","6 Acres Green Landscape","RERA Registered","Prime Greater Noida West","FMC Standards","High-Rise Tower"]',
 '["Swimming Pool","Clubhouse","Gymnasium","Yoga & Meditation Deck","Kids Play Area","Jogging Track","Sports Courts","Senior Citizens Zone","Party Lawn","EV Charging"]',
 'UPRERAPRJ412075', 'Sobha Ltd', 680,
 1, 0,
 'Sobha Rivana Greater Noida West — New Launch 3 & 4 BHK from ₹1.80 Cr',
 'Sobha Rivana at Sector 1 Greater Noida West. New launch luxury 3 & 4 BHK residences from ₹1.80 Cr by Sobha Group.',
 NOW(), NOW()),

-- 6. Godrej Woods
('Godrej Woods',
 'godrej-woods',
 'Sector 43', 'Sector 43', 'Noida',
 '3 BHK,4 BHK,5 BHK',
 2.45, 5.89,
 'UNDER_CONSTRUCTION',
 'Godrej Woods in Sector 43, Noida is a forest-themed luxury residential development that lets you live amidst a natural forest with 1,100 trees within the campus. Offering premium 3, 4 & 5 BHK residences with sustainable design, zero chemicals policy, and a biophilic architecture.',
 '["1100 Trees on Campus","Zero Chemicals Policy","Biophilic Architecture","Forest Theme","Central Noida Location","Godrej Trust"]',
 '["Forest Walking Trail","Organic Garden","Swimming Pool","Gymnasium","Basketball Court","Yoga Pavilion","Kids Nature Zone","Amphitheatre","Dog Park","EV Charging"]',
 'UPRERAPRJ248613', 'Godrej Properties', 790,
 1, 0,
 'Godrej Woods Sector 43 Noida — Forest Living 3/4/5 BHK from ₹2.45 Cr',
 'Godrej Woods at Sector 43 Noida. Forest-themed luxury 3, 4 & 5 BHK homes from ₹2.45 Cr amidst 1100 trees.',
 NOW(), NOW()),

-- 7. Ace Parkway
('Ace Parkway',
 'ace-parkway',
 'Sector 150', 'Sector 150', 'Noida',
 '2 BHK,3 BHK,4 BHK',
 1.46, 2.90,
 'READY_TO_MOVE',
 'Ace Parkway is a ready-to-move residential project at Sector 150, Noida Expressway with 2, 3 & 4 BHK premium apartments. The project offers lush green surroundings, modern amenities, and excellent connectivity to Delhi, Noida, and Greater Noida via the expressway.',
 '["Ready to Move","Sector 150 Expressway","Lush Greenery","RERA Registered","24x7 Security","Investment Ready"]',
 '["Swimming Pool","Clubhouse","Gymnasium","Badminton Court","Table Tennis","Jogging Track","Kids Play Area","Amphitheatre","Party Lawn","Multipurpose Hall"]',
 'UPRERAPRJ189234', 'ACE Group', 1240,
 1, 0,
 'Ace Parkway Sector 150 Noida — Ready to Move 2/3/4 BHK from ₹1.46 Cr',
 'Ace Parkway at Sector 150 Noida Expressway. Ready to move 2, 3 & 4 BHK apartments from ₹1.46 Cr.',
 NOW(), NOW()),

-- 8. Gaur NYC Residences
('Gaur NYC Residences',
 'gaur-nyc-residences',
 'Sector 16C, Greater Noida West', 'Sector 16C', 'Greater Noida',
 '2 BHK,3 BHK,4 BHK',
 0.95, 2.10,
 'NEW_LAUNCH',
 'Gaur NYC Residences is an ultra-modern residential township in Greater Noida West, inspired by the iconic New York City skyline. Offering meticulously designed 2, 3 & 4 BHK apartments with New York-themed architecture, vibrant community spaces, and world-class amenities.',
 '["NYC-Inspired Architecture","Greater Noida West","Upcoming Metro Connectivity","RERA Registered","Commercial Precinct","Smart Township"]',
 '["Rooftop Lounge","Swimming Pool","Gymnasium","Basketball Court","Skate Park","Co-working Space","Cafeteria","Retail High Street","Kids Zone","24x7 Security"]',
 'UPRERAPRJ389147', 'Gaur Group', 1850,
 1, 1,
 'Gaur NYC Residences Greater Noida West — 2/3/4 BHK from ₹95 Lakh',
 'Gaur NYC Residences at Sector 16C Greater Noida West. New launch 2, 3 & 4 BHK apartments from ₹95 Lakh.',
 NOW(), NOW());


-- ─── PROPERTIES (individual resale / ready units) ────────────────────────────

INSERT INTO Property
  (name, slug, location, sector, city, bhkType, price, type, status,
   description, highlights,
   carpetArea, superArea, floor, totalFloors,
   isActive, isFeatured,
   metaTitle, metaDesc, createdAt, updatedAt)
VALUES

-- 1. 3 BHK in Sector 150
('Spacious 3 BHK in ACE Golfshire, Sector 150',
 'spacious-3bhk-ace-golfshire-sector-150',
 'Sector 150', 'Sector 150', 'Noida',
 '3 BHK', 2.15, 'FLAT', 'READY_TO_MOVE',
 'Well-maintained east-facing 3 BHK apartment on high floor in ACE Golfshire, Sector 150, Noida Expressway. Features modular kitchen, premium flooring, and stunning greens view. Ready to move.',
 '["East Facing","High Floor","Modular Kitchen","Greens View","Semi-Furnished","Vastu Compliant"]',
 1350, 1825, 18, 30,
 1, 1,
 '3 BHK Flat in Sector 150 Noida — ₹2.15 Cr | Ready to Move',
 'Spacious 3 BHK apartment in ACE Golfshire, Sector 150 Noida. East facing, high floor, 1825 sqft. ₹2.15 Cr.',
 NOW(), NOW()),

-- 2. 2 BHK in Greater Noida West
('Modern 2 BHK in Sector 1, Greater Noida West',
 'modern-2bhk-sector-1-greater-noida-west',
 'Sector 1, Greater Noida West', 'Sector 1', 'Greater Noida',
 '2 BHK', 0.72, 'FLAT', 'READY_TO_MOVE',
 'Bright and airy 2 BHK apartment in Sector 1, Greater Noida West. Fully furnished with premium fittings, facing open greens. Ideal for first-time buyers and investors. Ready to move with all amenities.',
 '["Fully Furnished","Open Greens View","Ground Floor Lobby","Power Backup","24x7 Water Supply","Gated Society"]',
 890, 1150, 7, 22,
 1, 0,
 '2 BHK Flat in Greater Noida West — ₹72 Lakh | Ready to Move',
 '2 BHK apartment in Sector 1, Greater Noida West. 1150 sqft, fully furnished, ready to move. ₹72 Lakh.',
 NOW(), NOW()),

-- 3. 4 BHK in Sector 76
('Premium 4 BHK Penthouse in Sector 76, Noida',
 'premium-4bhk-penthouse-sector-76-noida',
 'Sector 76', 'Sector 76', 'Noida',
 '4 BHK', 3.45, 'FLAT', 'READY_TO_MOVE',
 'Stunning 4 BHK penthouse on the top floor in Sector 76, Noida with private terrace and 360-degree city views. Premium imported marble flooring, modular wardrobes, luxury bathrooms. Includes 2 covered parking spaces.',
 '["Top Floor Penthouse","Private Terrace","360° City Views","Imported Marble","Luxury Bathrooms","2 Car Parking"]',
 2100, 2850, 24, 24,
 1, 1,
 '4 BHK Penthouse in Sector 76 Noida — ₹3.45 Cr | Ready to Move',
 'Premium 4 BHK penthouse in Sector 76 Noida. Top floor with private terrace, 2850 sqft. ₹3.45 Cr.',
 NOW(), NOW()),

-- 4. Commercial Shop in Sector 18
('Prime Shop in Sector 18, Noida (Atta Market)',
 'prime-shop-sector-18-noida-atta-market',
 'Sector 18, Atta Market', 'Sector 18', 'Noida',
 'Commercial', 1.80, 'SHOP', 'READY_TO_MOVE',
 'Prime commercial shop in the heart of Sector 18, Noida (Atta Market area). Ground floor, high footfall location, ideal for retail, showroom, or office. Strong rental yield potential. Immediate possession available.',
 '["Ground Floor","High Footfall","Atta Market Area","Main Road Facing","Retail Frontage","Strong Rental Yield"]',
 480, 520, 0, 3,
 1, 0,
 'Commercial Shop in Sector 18 Noida — ₹1.80 Cr | Ready',
 'Prime ground floor shop in Sector 18 Noida (Atta Market). 520 sqft, main road facing. ₹1.80 Cr.',
 NOW(), NOW()),

-- 5. Studio Apartment in Indirapuram
('Studio Apartment in Indirapuram, Ghaziabad',
 'studio-apartment-indirapuram-ghaziabad',
 'Indirapuram', 'Abhay Khand', 'Ghaziabad',
 'Studio', 0.48, 'STUDIO_APARTMENT', 'READY_TO_MOVE',
 'Compact and well-designed studio apartment in the prime Indirapuram locality, Ghaziabad. Ideal for working professionals and students. Close to NH-9, metro station, and all daily conveniences. High rental demand area.',
 '["Near Metro Station","NH-9 Connectivity","High Rental Demand","Furnished Option Available","24x7 Security","Power Backup"]',
 420, 540, 5, 14,
 1, 0,
 'Studio Apartment in Indirapuram Ghaziabad — ₹48 Lakh',
 'Compact studio apartment in Indirapuram, Ghaziabad. 540 sqft, near metro. ₹48 Lakh. Ideal investment.',
 NOW(), NOW()),

-- 6. Plot in Yamuna Expressway
('Residential Plot in Sector 22D, Yamuna Expressway',
 'residential-plot-sector-22d-yamuna-expressway',
 'Sector 22D, Yamuna Expressway', 'Sector 22D', 'Greater Noida',
 'Residential', 0.65, 'PLOT', 'READY_TO_MOVE',
 'East-facing freehold residential plot in Sector 22D along the Yamuna Expressway. Clear title, YEIDA approved, all utilities available. Excellent long-term investment opportunity in this rapidly developing corridor near Jewar International Airport.',
 '["YEIDA Approved","Freehold Title","Near Jewar Airport","East Facing","All Utilities Available","Fast Appreciation Zone"]',
 NULL, 200, NULL, NULL,
 1, 0,
 'Residential Plot in Sector 22D Yamuna Expressway — ₹65 Lakh',
 'Freehold 200 sqyd residential plot in Sector 22D, Yamuna Expressway. YEIDA approved, near Jewar Airport. ₹65 Lakh.',
 NOW(), NOW()),

-- 7. 3 BHK in Raj Nagar Extension, Ghaziabad
('3 BHK Flat in Raj Nagar Extension, Ghaziabad',
 '3bhk-flat-raj-nagar-extension-ghaziabad',
 'Raj Nagar Extension', 'Raj Nagar Extension', 'Ghaziabad',
 '3 BHK', 0.92, 'FLAT', 'READY_TO_MOVE',
 'Spacious 3 BHK apartment in a gated society in Raj Nagar Extension, Ghaziabad. Well-maintained, semi-furnished with modular kitchen. Easy access to NH-58 and upcoming metro connectivity. High rental potential.',
 '["Semi-Furnished","Gated Society","Modular Kitchen","NH-58 Proximity","Metro Accessible","Investor Friendly"]',
 1100, 1420, 9, 18,
 1, 0,
 '3 BHK Flat in Raj Nagar Extension Ghaziabad — ₹92 Lakh',
 '3 BHK apartment in Raj Nagar Extension, Ghaziabad. 1420 sqft, semi-furnished, ready to move. ₹92 Lakh.',
 NOW(), NOW()),

-- 8. 4 BHK in M3M Cullinan, Sector 94
('Luxury 4 BHK in M3M The Cullinan, Sector 94',
 'luxury-4bhk-m3m-cullinan-sector-94',
 'Sector 94', 'Sector 94', 'Noida',
 '4 BHK', 9.75, 'FLAT', 'UNDER_CONSTRUCTION',
 'Premium 4 BHK ultra-luxury apartment in M3M The Cullinan, Sector 94, Noida. Features custom Italian marble, smart home automation, dedicated servant room, private foyer and panoramic views of the Noida skyline. Expected possession 2026.',
 '["Italian Marble","Smart Home Automation","Panoramic Skyline View","Private Foyer","Servant Room","Expected Possession 2026"]',
 2850, 3650, 32, 55,
 1, 1,
 'Luxury 4 BHK in M3M The Cullinan Sector 94 Noida — ₹9.75 Cr',
 '4 BHK ultra-luxury apartment in M3M The Cullinan, Sector 94 Noida. 3650 sqft, smart home, skyline view. ₹9.75 Cr.',
 NOW(), NOW());

-- ─── Update isFeatured for top projects ──────────────────────────────────────
UPDATE Project SET isFeatured = 1 WHERE slug IN (
  'godrej-tropical-isle', 'ace-golfshire', 'm3m-the-cullinan', 'gaur-nyc-residences'
);

SELECT CONCAT('Seeded ', COUNT(*), ' projects') AS result FROM Project;
SELECT CONCAT('Seeded ', COUNT(*), ' properties') AS result FROM Property;
