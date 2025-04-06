import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import RecommendationCard from './RecommendationCard';
import feature1 from '../images/feature1.jpg';
import feature2 from '../images/feature2.jpg';
import feature3 from '../images/feature3.jpg';

export const skincareData = {
  male: {
    oily: {
        morning: [
            { name: "Oil-Control Face Wash", url: "https://www.amazon.in/s?k=Oil-Control+Face+Wash&crid=SH24Q02HNU83&sprefix=oil-control+face+wash%2Caps%2C326&ref=nb_sb_noss_2" },
            { name: "Oil-Free Moisturizer", url: "https://www.amazon.in/s?k=Oil-Free+Moisturizer&crid=2VK3TGWUWN7WK&sprefix=oil-free+moisturizer%2Caps%2C349&ref=nb_sb_noss_1" },
            { name: "Sunscreen SPF 50", url: "https://www.amazon.in/s?k=unscreen+SPF+50&crid=3FW5C419ZSUR1&sprefix=unscreen+spf+50%2Caps%2C310&ref=nb_sb_noss_2" }
        ],
        afternoon: [
            {name:"Blotting Paper", url: "https://www.amazon.in/s?k=Blotting+Paper&crid=1VBZQBDHRQ24E&sprefix=blotting+paper%2Caps%2C348&ref=nb_sb_noss_2"},
            {name: "Oil-Free Hydration Mist", url:"https://www.amazon.in/s?k=Oil-Free+Hydration+Mist&crid=3S7EXG4KXS5GS&sprefix=oil-free+hydration+mist%2Caps%2C301&ref=nb_sb_noss"}
        ],
        evening: [
           {name: "Gentle Cleanser",url:"https://www.amazon.in/s?k=Gentle+Cleanser&crid=2FABKDK1D0AO&sprefix=gentle+cleanser%2Caps%2C326&ref=nb_sb_noss_2"},
           {name:"Light Refreshing Moisturizer",url:"https://www.amazon.in/s?k=Light+Refreshing+Moisturizer&crid=2M321QXNCZ7C2&sprefix=light+refreshing+moisturizer%2Caps%2C337&ref=nb_sb_noss"}
        ],
        night: [
           {name:"Charcoal Cleanser",url:"https://www.amazon.in/s?k=Charcoal+Cleanser&crid=1YTM7KDLEDQPJ&sprefix=charcoal+cleanser%2Caps%2C392&ref=nb_sb_noss_1"},
             {name:"Retinol Serum",url:"https://www.amazon.in/s?k=Retinol+Serum&crid=H0E2YWTWPCVJ&sprefix=retinol+serum%2Caps%2C353&ref=nb_sb_noss_2"}, 
            { name:"Light Moisturizer",url:"https://www.amazon.in/s?k=Light+Moisturizer&crid=T9JVIDJQYYM3&sprefix=light+moisturizer%2Caps%2C319&ref=nb_sb_noss_1"}
             ],
        preOutdoor: [
            {name:"Mattifying Sunscreen SPF 50",url:"https://www.amazon.in/s?k=Mattifying+Sunscreen+SPF+50&crid=2CHQE49DLUNC2&sprefix=mattifying+sunscreen+spf+50%2Caps%2C405&ref=nb_sb_noss_1"}, 
            {name:"Oil-Control Primer", url:"https://www.amazon.in/s?k=Oil-Control+Primer&crid=2GW40H355M2A7&sprefix=oil-control+primer%2Caps%2C307&ref=nb_sb_noss_2"}
        ],
        postOutdoor: [
            {name:"Soothing Cleanser",url:"https://www.amazon.in/s?k=Soothing+Cleanser&crid=2Z5FFHX36CDWT&sprefix=soothing+cleanser%2Caps%2C324&ref=nb_sb_noss_1" },
            {name:"Aloe Vera Gel",url:"https://www.amazon.in/s?k=Aloe+Vera+Gel&crid=22ZVUMAK01O7N&sprefix=soothing+cleanser%2Caps%2C406&ref=nb_sb_noss_1"}
        ]
    },
    dry: {
        morning: [
           {name: "Hydrating Cleanser",url:"https://www.amazon.in/s?k=Hydrating+Cleanser&crid=2TP6KZHSWDZ4Q&sprefix=hydrating+cleanser%2Caps%2C312&ref=nb_sb_noss_1"},
            {name:"Hyaluronic Acid Serum", url:"https://www.amazon.in/s?k=Hyaluronic+Acid+Serum&crid=2FVAJXULDBDV9&sprefix=hyaluronic+acid+serum%2Caps%2C323&ref=nb_sb_noss_2"},
            {name:"SPF 30 Moisturizer",url:"https://www.amazon.in/s?k=SPF+30+Moisturizer&crid=1AU7XSSNC63I7&sprefix=spf+30+moisturizer%2Caps%2C313&ref=nb_sb_noss_1"}
        ],
        afternoon: [
           {name:"Hydration Mist",url:"https://www.amazon.in/s?k=Hydration+Mist&crid=3FV8FWNU5RNTH&sprefix=hydration+mist%2Caps%2C502&ref=nb_sb_noss_1"},
            {name:"SPF Touch-Up Stick",url:"https://www.amazon.in/s?k=SPF+Touch-Up+Stick&crid=14BJ6BB4RE0T0&sprefix=spf+touch-up+stick%2Caps%2C346&ref=nb_sb_noss"}
        ],
        evening: [
            {name:"Gentle Cleanser", url:"https://www.amazon.in/s?k=Gentle+Cleanser&crid=2FABKDK1D0AO&sprefix=gentle+cleanser%2Caps%2C326&ref=nb_sb_noss_2"},
            {name:"Nourishing Face Oil",url:"https://www.amazon.in/s?k=Nourishing+Face+Oil&crid=5J0BE0JSSF2G&sprefix=nourishing+face+oil%2Caps%2C390&ref=nb_sb_noss_1"}
        ],
        night: [
            {name:"Shea Butter Night Cream",url:"https://www.amazon.in/s?k=Shea+Butter+Night+Cream&crid=3FWBKRI6BQUWY&sprefix=shea+butter+night+cream%2Caps%2C375&ref=nb_sb_noss_1"},
            {name:"Lip Balm",url:"https://www.amazon.in/s?k=Lip+Balm&crid=1FL1WD3MRZ2C7&sprefix=lip+balm%2Caps%2C359&ref=nb_sb_noss_2"}
        ],
        preOutdoor: [
            {name:"Moisturizing Sunscreen",url:"https://www.amazon.in/s?k=Moisturizing+Sunscreen&crid=M09I8TU7V1BT&sprefix=moisturizing+sunscreen%2Caps%2C354&ref=nb_sb_noss_1"},
            {name:"Hydrating Lip Balm",url:"https://www.amazon.in/s?k=Hydrating+Lip+Balm&crid=32CSK31CG9QLK&sprefix=hydrating+lip+balm%2Caps%2C298&ref=nb_sb_noss_1"}
        ],
        postOutdoor: [
           {name: "Aloe-Infused Cleanser",url:"https://www.amazon.in/s?k=Aloe-Infused+Cleanser&crid=3PH7DHQ1I4SBO&sprefix=aloe-infused+cleanser%2Caps%2C339&ref=nb_sb_noss"},
            {name:"Deep Moisture Cream",url:"https://www.amazon.in/s?k=Deep+Moisture+Cream&crid=4Y0R4Q9E0Z4K&sprefix=deep+moisture+cream%2Caps%2C381&ref=nb_sb_noss_1"}
        ]
    },
    combination: {
        morning: [
            {name:"Balanced Face Wash", url:"https://www.amazon.in/s?k=Balanced+Face+Wash&crid=3ADYAJDG53JLP&sprefix=balanced+face+wash%2Caps%2C411&ref=nb_sb_noss_2"},
            {name:"Hydrating Gel", url:"https://www.amazon.in/s?k=Hydrating+Gel&crid=1RFT8DMZT8RKJ&sprefix=hydrating+gel%2Caps%2C365&ref=nb_sb_noss_1"},
            {name:"Sunscreen SPF 40",url:"https://www.amazon.in/s?k=Sunscreen+SPF+40&crid=2VPOSA0Y20E01&sprefix=sunscreen+spf+40%2Caps%2C341&ref=nb_sb_noss_1"}
        ],
        afternoon: [
            {name:"Mattifying Powder",url:"https://www.amazon.in/s?k=Mattifying+Powder&crid=3EECXJEWZBY0H&sprefix=mattifying+powder%2Caps%2C321&ref=nb_sb_noss_1"}, 
            {name:"Soothing Face Mist", url:"https://www.amazon.in/s?k=Soothing+Face+Mist&crid=2MH1UM7EVO7RO&sprefix=soothing+face+mist%2Caps%2C336&ref=nb_sb_noss_1"}
        ],
        evening: [
            {name:"Mild Cleanser", url:"https://www.amazon.in/s?k=Mild+Cleanser&crid=359P1OEC5MHGV&sprefix=soothing+face+mist%2Caps%2C353&ref=nb_sb_noss_1"},
            {name:"Vitamin C Serum",url:"https://www.amazon.in/s?k=Vitamin+C+Serum&crid=18R77NM1I2GHN&sprefix=vitamin+c+serum%2Caps%2C329&ref=nb_sb_noss_2"}
        ],
        night: [
            {name:"Balancing Night Cream",url:"https://www.amazon.in/s?k=Balancing+Night+Cream&crid=2VDG7ESOEEHI6&sprefix=balancing+night+cream%2Caps%2C353&ref=nb_sb_noss_2"},
            {name:"Lip Balm",url:"https://www.amazon.in/s?k=Lip+Balm&crid=1FL1WD3MRZ2C7&sprefix=lip+balm%2Caps%2C359&ref=nb_sb_noss_2"}
        ],
        preOutdoor: [
            {name:"SPF Moisturizer",url:"https://www.amazon.in/s?k=SPF+Moisturize&crid=13FHW64HZ7Y2Y&sprefix=spf+moisturize%2Caps%2C346&ref=nb_sb_noss_2"},
            {name:"Hydrating Sunscreen",url:"https://www.amazon.in/s?k=Hydrating+Sunscreen&crid=NZDSYSJ02QIB&sprefix=hydrating+sunscreen%2Caps%2C360&ref=nb_sb_noss_1"}
        ],
        postOutdoor: [
            {name:"Cooling Aloe Gel", url:"https://www.amazon.in/s?k=Cooling+Aloe+Gel&crid=2CU4KMLYALKF4&sprefix=cooling+aloe+gel%2Caps%2C342&ref=nb_sb_noss_2"},
            {name:"Skin Recovery Balm",url:"https://www.amazon.in/s?k=Skin+Recovery+Balm&crid=YS0SMK4Y2Y5O&sprefix=skin+recovery+balm%2Caps%2C295&ref=nb_sb_noss_2"}
        ]
    },
    sensitive: {
        morning: [
            {name:"Vanicream Gentle Facial Cleanser",url:"https://www.amazon.in/s?k=Vanicream+Gentle+Facial+Cleanser&crid=1SH6Y2TQNIC7G&sprefix=skin+recovery+balm%2Caps%2C317&ref=nb_sb_noss_2"}, 
            {name:"Soothing Serum", url:"https://www.amazon.in/s?k=Soothing+Serum&crid=269UGE2M7OTLV&sprefix=soothing+serum%2Caps%2C358&ref=nb_sb_noss_1"},
            {name:"Blue Lizard Sensitive Mineral Sunscreen SPF 30",url:"https://www.amazon.in/s?k=Blue+Lizard+Sensitive+Mineral+Sunscreen+SPF+30&crid=36L26009LC4BV&sprefix=blue+lizard+sensitive+mineral+sunscreen+spf+30%2Caps%2C328&ref=nb_sb_noss_1"}
        ],
        afternoon: [
            {name:"Hydrating Spray",url:"https://www.amazon.in/s?k=Hydrating+Spray&crid=270FBGAAER47G&sprefix=hydrating+spray%2Caps%2C283&ref=nb_sb_noss_1"}, 
            {name:"SPF Balm",url:"https://www.amazon.in/s?k=SPF+Balm&crid=3RMUQ2N71ILHG&sprefix=spf+balm%2Caps%2C303&ref=nb_sb_noss_1"}
        ],
        evening: [
            {name:"Avene Tolerance Extreme Cream", url:"https://www.amazon.in/s?k=Avene+Tolerance+Extreme+Cream&crid=1RGMCDQ59QHL8&sprefix=avene+tolerance+extreme+cream%2Caps%2C300&ref=nb_sb_noss_1"},
            {name:"Anti-Redness Serum",url:"https://www.amazon.in/s?k=Anti-Redness+Serum&crid=IM09SJT23D0R&sprefix=anti-redness+serum%2Caps%2C328&ref=nb_sb_noss_2"}
        ],
        night: [
            {name:"Soothing Cleanser", url:"https://www.amazon.in/s?k=Soothing+Cleanser&crid=3AGH24YBKB4OR&sprefix=soothing+cleanser%2Caps%2C320&ref=nb_sb_noss_"},
            {name:"La Roche-Posay Toleriane Double Repair Face Moisturizer", url:"https://www.amazon.in/s?k=La+Roche-Posay+Toleriane+Double+Repair+Face+Moisturizer&crid=1P2WM41OMRN3F&sprefix=la+roche-posay+toleriane+double+repair+face+moisturizer%2Caps%2C356&ref=nb_sb_noss_1"},
            {name:"Overnight Hydrating Mask",url:"https://www.amazon.in/s?k=Overnight+Hydrating+Mask&crid=264QV4BBXZDA8&sprefix=overnight+hydrating+mask%2Caps%2C292&ref=nb_sb_noss_1"}
        ],
        preOutdoor: [
            {name:"SPF 50 Mineral Sunscreen", url:"https://www.amazon.in/s?k=SPF+50+Mineral+Sunscreen&crid=2VKJD4QH3306R&sprefix=overnight+hydrating+mask%2Caps%2C327&ref=nb_sb_noss_1"},
            {name:"Lip Balm",url:"https://www.amazon.in/s?k=Lip+Balm&crid=1FL1WD3MRZ2C7&sprefix=lip+balm%2Caps%2C359&ref=nb_sb_noss_2"}
        ],
        postOutdoor: [
            {name:"Aloe Vera Mask", url:"https://www.amazon.in/s?k=Aloe+Vera+Mask&crid=2VZB6VH9NZHUV&sprefix=aloe+vera+mask%2Caps%2C377&ref=nb_sb_noss_1"},
            {name:"Calming Night Serum",url:"https://www.amazon.in/s?k=Calming+Night+Serum&crid=14I986IZQO5P6&sprefix=calming+night+serum%2Caps%2C295&ref=nb_sb_noss"}
        ]
    },
    normal: {
        morning: [
            {name:"CeraVe Foaming Facial Cleanser", url:"https://www.amazon.in/s?k=CeraVe+Foaming+Facial+Cleanser&crid=25ZZFAC2OPFL9&sprefix=cerave+foaming+facial+cleanser%2Caps%2C292&ref=nb_sb_noss_2"},
            {name:"Hyaluronic Acid Serum",url:"https://www.amazon.in/s?k=Hyaluronic+Acid+Serum&crid=1T1QS1MNK6AJ6&sprefix=hyaluronic+acid+serum%2Caps%2C345&ref=nb_sb_noss_2"}, 
            {name:"La Roche-Posay Anthelios Melt-in Milk SPF 60",url:"https://www.amazon.in/s?k=La+Roche-Posay+Anthelios+Melt-in+Milk+SPF+60&crid=24RIM4E6AC89V&sprefix=hyaluronic+acid+serum%2Caps%2C365&ref=nb_sb_noss_1"}
        ],
        afternoon: [
            {name:"Hydrating Spray", url:"https://www.amazon.in/s?k=Hydrating+Spray&crid=3SA5K4P3UBNH5&sprefix=hydrating+spray%2Caps%2C290&ref=nb_sb_noss_1"},
            {name:"SPF Balm",url:"https://www.amazon.in/s?k=SPF+Balm&crid=2KRDNAF759PON&sprefix=spf+balm%2Caps%2C319&ref=nb_sb_noss_1"}
        ],
        evening: [
            {name:"Neutrogena Hydro Boost Water Gel",url:"https://www.amazon.in/s?k=Neutrogena+Hydro+Boost+Water+Gel&crid=2880TFDDE9DOT&sprefix=neutrogena+hydro+boost+water+gel%2Caps%2C333&ref=nb_sb_noss_2"},
            {name:"Brightening Serum",url:"https://www.amazon.in/s?k=Brightening+Serum&ref=nb_sb_noss"}
        ],
        night: [
            {name:"Soothing Cleanser", url:"https://www.amazon.in/s?k=Soothing+Cleanser&crid=3AGH24YBKB4OR&sprefix=soothing+cleanser%2Caps%2C320&ref=nb_sb_noss_1"},
            {name:"Kiehl's Ultra Facial Cream", url:"https://www.amazon.in/s?k=Kiehl%27s+Ultra+Facial+Cream&crid=IC0RJ77B85EP&sprefix=kiehl%27s+ultra+facial+cream%2Caps%2C423&ref=nb_sb_noss_1"},
            {name:"Overnight Hydrating Mask", url:"https://www.amazon.in/s?k=Overnight+Hydrating+Mask&crid=J1YY5PLYBWL9&sprefix=overnight+hydrating+mask%2Caps%2C313&ref=nb_sb_noss_1"}
        ],
        preOutdoor: [
            {name:"SPF 50 Hydrating Sunscreen", url:"https://www.amazon.in/s?k=SPF+50+Hydrating+Sunscreen&crid=2P9QHQUUZDSV2&sprefix=spf+50+hydrating+sunscreen%2Caps%2C384&ref=nb_sb_noss_1"},
            {name:"Lip Balm", url:"https://www.amazon.in/s?k=Lip+Balm&crid=1FL1WD3MRZ2C7&sprefix=lip+balm%2Caps%2C359&ref=nb_sb_noss_2"}
        ],
        postOutdoor: [
            {name:"Aloe Vera Mask", url:"https://www.amazon.in/s?k=Aloe+Vera+Mask&crid=2VZB6VH9NZHUV&sprefix=aloe+vera+mask%2Caps%2C377&ref=nb_sb_noss_1"},
            {name:"Calming Night Serum", url:"https://www.amazon.in/s?k=Calming+Night+Serum&crid=14I986IZQO5P6&sprefix=calming+night+serum%2Caps%2C295&ref=nb_sb_noss"}
        ]
    }
  },
  female: {
    oily: {
        morning: [
            { name: "Salicylic Acid Cleanser", url: "https://www.amazon.in/s?k=Salicylic+Acid+Cleanser&crid=E1WIS67EK1BB&sprefix=salicylic+acid+cleanser%2Caps%2C302&ref=nb_sb_noss_2" },
            { name: "Mattifying Moisturizer", url: "https://www.amazon.in/s?k=Mattifying+Moisturizer&crid=1FG3882YPYPJ0&sprefix=salicylic+acid+cleanser%2Caps%2C547&ref=nb_sb_noss_1" },
            { name: "Sunscreen SPF 50", url: "https://www.amazon.in/s?k=unscreen+SPF+50&crid=3FW5C419ZSUR1&sprefix=unscreen+spf+50%2Caps%2C310&ref=nb_sb_noss_2" }
        ],
        afternoon: [
            {name:"Oil-Control Face Mist", url:"https://www.amazon.in/s?k=Oil-Control+Face+Mist&crid=2VFMEZVZD9BUP&sprefix=oil-control+face+mist%2Caps%2C368&ref=nb_sb_noss_2"},
           {name:"SPF Compact Powder", url:"https://www.amazon.in/s?k=SPF+Compact+Powder&crid=1P7TMBHC5JUFI&sprefix=spf+compact+powder%2Caps%2C323&ref=nb_sb_noss_1"}
        ],
        evening: [
            {name:"Gentle Foaming Cleanser", url:"https://www.amazon.in/s?k=Gentle+Foaming+Cleanser&crid=XZ1CGHRI3RLM&sprefix=spf+compact+powder%2Caps%2C484&ref=nb_sb_noss_1"},
            {name:"Hydrating Toner",url:"https://www.amazon.in/s?k=Hydrating+Toner&crid=6BOPATHQ92HL&sprefix=gentle+foaming+cleanser%2Caps%2C378&ref=nb_sb_noss_1"}
        ],
        night: [
            {name:"Oil-Free Face Wash",url:"https://www.amazon.in/s?k=Oil-Free+Face+Wash&crid=1UUDUQ2CB9LL&sprefix=oil-free+face+wash%2Caps%2C347&ref=nb_sb_noss_2"},
            {name:"Niacinamide Serum", url:"https://www.amazon.in/s?k=Niacinamide+Serum&crid=1LZJ5DUU2C8&sprefix=niacinamide+serum%2Caps%2C333&ref=nb_sb_noss_2"},
            {name:"Gel-Based Night Cream",url:"https://www.amazon.in/s?k=Gel-Based+Night+Cream&crid=3FG6MGO7KKIRO&sprefix=niacinamide+serum%2Caps%2C364&ref=nb_sb_noss_2"}
        ],
        preOutdoor: [
           {name: "Sunscreen SPF 50", url:"https://www.amazon.in/s?k=unscreen+SPF+50&crid=3FW5C419ZSUR1&sprefix=unscreen+spf+50%2Caps%2C310&ref=nb_sb_noss_2"},
           {name: "Matte Primer",url:"https://www.amazon.in/s?k=Matte+Primer&crid=UAXC1QKCMQHK&sprefix=matte+primer%2Caps%2C339&ref=nb_sb_noss_1"}
        ],
        postOutdoor: [
            {name:"Cooling Face Pack",url:"https://www.amazon.in/s?k=Cooling+Face+Pack&crid=G1LXQMP5KIK&sprefix=matte+primer%2Caps%2C345&ref=nb_sb_noss_1"}, 
            {name:"Soothing Toner",url:"https://www.amazon.in/s?k=Soothing+Toner&crid=3U8YOIIC5NLVH&sprefix=soothing+toner%2Caps%2C443&ref=nb_sb_noss_1"}
        ]
    },
    dry: {
        morning: [
            {name:"Creamy Hydrating Cleanser",url:"https://www.amazon.in/s?k=Creamy+Hydrating+Cleanser&crid=MFHIK57923ZK&sprefix=creamy+hydrating+cleanser%2Caps%2C299&ref=nb_sb_noss_2"},
            {name:"Hyaluronic Acid Serum", url:"https://www.amazon.in/s?k=Hyaluronic+Acid+Serum&crid=1T1QS1MNK6AJ6&sprefix=hyaluronic+acid+serum%2Caps%2C345&ref=nb_sb_noss_2"},
            {name: "SPF 30 Moisturizer",url:"https://www.amazon.in/s?k=SPF+30+Moisturizer&crid=1AU7XSSNC63I7&sprefix=spf+30+moisturizer%2Caps%2C313&ref=nb_sb_noss_1"}
        ],
        afternoon: [
            {name:"Hydrating Spray", url:"https://www.amazon.in/s?k=Hydrating+Spray&crid=270FBGAAER47G&sprefix=hydrating+spray%2Caps%2C283&ref=nb_sb_noss_1"},
            {name:"SPF Balm" , url:"https://www.amazon.in/s?k=SPF+Balm&crid=3RMUQ2N71ILHG&sprefix=spf+balm%2Caps%2C303&ref=nb_sb_noss_1"}
        ],
        evening: [
            {name:"Moisturizing Cleanser", url:"https://www.amazon.in/s?k=Moisturizing+Cleanser&crid=21DSFB39GDD1K&sprefix=moisturizing+cleanser%2Caps%2C297&ref=nb_sb_noss_1"},
            {name:"Brightening Serum", url:"https://www.amazon.in/s?k=Brightening+Serum&crid=3R6LLIHX1LRL8&sprefix=moisturizing+cleanser%2Caps%2C355&ref=nb_sb_noss_1"}
        ],
        night: [
            {name:"Soothing Cleanser", url:"https://www.amazon.in/s?k=Soothing+Cleanser&crid=2Z5FFHX36CDWT&sprefix=soothing+cleanser%2Caps%2C324&ref=nb_sb_noss_1"},
            {name:"Rich Night Cream",url:"https://www.amazon.in/s?k=Rich+Night+Cream&crid=24OX3R4DKUABK&sprefix=rich+night+cream%2Caps%2C331&ref=nb_sb_noss_1"}, 
            {name:"Overnight Hydrating Mask",url:"https://www.amazon.in/s?k=Overnight+Hydrating+Mask&crid=J1YY5PLYBWL9&sprefix=overnight+hydrating+mask%2Caps%2C313&ref=nb_sb_noss_1"}
        ],
        preOutdoor: [
            {name:"SPF 50 Hydrating Sunscreen", url:"https://www.amazon.in/s?k=SPF+50+Hydrating+Sunscreen&crid=2P9QHQUUZDSV2&sprefix=spf+50+hydrating+sunscreen%2Caps%2C384&ref=nb_sb_noss_1"},
            {name:"Lip Balm", url:"https://www.amazon.in/s?k=Lip+Balm&crid=1FL1WD3MRZ2C7&sprefix=lip+balm%2Caps%2C359&ref=nb_sb_noss_2"}
        ],
        postOutdoor: [
            {name:"Aloe Vera Mask", url:"https://www.amazon.in/s?k=Aloe+Vera+Mask&crid=2VZB6VH9NZHUV&sprefix=aloe+vera+mask%2Caps%2C377&ref=nb_sb_noss_1"},
            {name:"Calming Night Serum", url:"https://www.amazon.in/s?k=Calming+Night+Serum&crid=14I986IZQO5P6&sprefix=calming+night+serum%2Caps%2C295&ref=nb_sb_noss"}
        ]
    },
    normal: {
        morning: [
            {name:"Cetaphil Daily Facial Cleanser", url:"https://www.amazon.in/s?k=Cetaphil+Daily+Facial+Cleanser&crid=21IXFVPJAQC53&sprefix=cetaphil+daily+facial+cleanser%2Caps%2C330&ref=nb_sb_noss_2"},
            {name:"Hyaluronic Acid Serum", url:"https://www.amazon.in/s?k=Hyaluronic+Acid+Serum&crid=1T1QS1MNK6AJ6&sprefix=hyaluronic+acid+serum%2Caps%2C345&ref=nb_sb_noss_2"},
            {name:"EltaMD UV Clear Broad-Spectrum SPF 46", url:"https://www.amazon.in/s?k=EltaMD+UV+Clear+Broad-Spectrum+SPF+46&crid=1EKDR14KP6EQP&sprefix=eltamd+uv+clear+broad-spectrum+spf+46%2Caps%2C337&ref=nb_sb_noss_1"}
        ],
        afternoon: [
            {name:"Hydrating Mist",url:"https://www.amazon.in/s?k=Hydrating+Mist&crid=3UWYET4ZL99AN&sprefix=eltamd+uv+clear+broad-spectrum+spf+46%2Caps%2C381&ref=nb_sb_noss_1"},
            {name:"SPF Balm", url:"https://www.amazon.in/s?k=SPF+Balm&crid=2KRDNAF759PON&sprefix=spf+balm%2Caps%2C319&ref=nb_sb_noss_1"}
        ],
        evening: [
            {name:"Clinique Moisture Surge 100H Auto-Replenishing Hydrator",url:"https://www.amazon.in/s?k=Clinique+Moisture+Surge+100H+Auto-Replenishing+Hydrator&crid=2IWEOAR83OYZ8&sprefix=clinique+moisture+surge+100h+auto-replenishing+hydrator%2Caps%2C312&ref=nb_sb_noss_1"},
            {name:"Brightening Serum", url:"https://www.amazon.in/s?k=Brightening+Serum&crid=1CSXIUVGA13R0&sprefix=brightening+serum%2Caps%2C314&ref=nb_sb_noss_1"}
        ],
        night: [
            {name:"Soothing Cleanser",url:"https://www.amazon.in/s?k=Soothing+Cleanser&crid=3AGH24YBKB4OR&sprefix=soothing+cleanser%2Caps%2C320&ref=nb_sb_noss_1"},
            {name:"Olay Regenerist Retinol24 Night Moisturizer",url:"https://www.amazon.in/s?k=Olay+Regenerist+Retinol24+Night+Moisturizer&crid=3O7B9KWXKJMNN&sprefix=olay+regenerist+retinol24+night+moisturizer%2Caps%2C322&ref=nb_sb_noss_1"},
            {name:"Overnight Hydrating Mask",url:"https://www.amazon.in/s?k=Overnight+Hydrating+Mask&crid=35ZWDZ0H8D0AR&sprefix=olay+regenerist+retinol24+night+moisturizer%2Caps%2C393&ref=nb_sb_noss_1"}
        ],
        preOutdoor: [
            {name:"SPF 50 Hydrating Sunscreen", url:"https://www.amazon.in/s?k=SPF+50+Hydrating+Sunscreen&crid=2P9QHQUUZDSV2&sprefix=spf+50+hydrating+sunscreen%2Caps%2C384&ref=nb_sb_noss_1"},
            {name:"Lip Balm", url:"https://www.amazon.in/s?k=Lip+Balm&crid=1FL1WD3MRZ2C7&sprefix=lip+balm%2Caps%2C359&ref=nb_sb_noss_2"}
        ],
        postOutdoor: [
            {name:"Aloe Vera Mask", url:"https://www.amazon.in/s?k=Aloe+Vera+Mask&crid=2VZB6VH9NZHUV&sprefix=aloe+vera+mask%2Caps%2C377&ref=nb_sb_noss_1"},
            {name:"Calming Night Serum", url:"https://www.amazon.in/s?k=Calming+Night+Serum&crid=14I986IZQO5P6&sprefix=calming+night+serum%2Caps%2C295&ref=nb_sb_noss"}
        ]
    },
    combination: {
        morning: [
            {name:"Balancing Cleanser", url:"https://www.amazon.in/s?k=Balancing+Night+Cream&crid=2VDG7ESOEEHI6&sprefix=balancing+night+cream%2Caps%2C353&ref=nb_sb_noss_2"},
            {name:"Hydrating Serum", url:"https://www.amazon.in/s?k=Hydrating+Serum&crid=2OQO8KOJR4X34&sprefix=hydrating+serum%2Caps%2C257&ref=nb_sb_noss_1"},
            {name:"SPF 40 Moisturizer",url:"https://www.amazon.in/s?k=SPF+40+Moisturizer&crid=1TUQNPS4YKMOO&sprefix=spf+40+moisturizer%2Caps%2C356&ref=nb_sb_noss_1"}
        ],
        afternoon: [
            {name:"Skin Refreshing Mist",url:"https://www.amazon.in/s?k=Skin+Refreshing+Mist&crid=3DEQ0DEQ78AD5&sprefix=skin+refreshing+mist%2Caps%2C291&ref=nb_sb_noss"},
            {name:"Mattifying Powder",url:"https://www.amazon.in/s?k=Mattifying+Powder&ref=nb_sb_noss"}
        ],
        evening: [
            {name:"Toning Gel", url:"https://www.amazon.in/s?k=Toning+Gel&crid=3K1C9ZYU6NEBJ&sprefix=toning+gel%2Caps%2C340&ref=nb_sb_noss_1"},
            {name:"Vitamin C Booster",url:"https://www.amazon.in/s?k=Vitamin+C+Booster&crid=29RAKEJIZ50Z2&sprefix=vitamin+c+booster%2Caps%2C334&ref=nb_sb_noss_1"}
        ],
        night: [
            {name:"Overnight Hydration Cream", url:"https://www.amazon.in/s?k=Overnight+Hydration+Cream&crid=3N9S1C5MKB04J&sprefix=overnight+hydration+cream%2Caps%2C328&ref=nb_sb_noss_1"},
            {name:"Lip Treatment" , url:"https://www.amazon.in/s?k=Lip+Treatment&crid=GX2QBQBT0TZ8&sprefix=lip+treatment%2Caps%2C334&ref=nb_sb_noss_1"}
        ],
        preOutdoor: [
            {name:"Protective SPF 50",url:"https://www.amazon.in/s?k=Protective+SPF+50&crid=1ONXVUO1YTSOD&sprefix=lip+treatment%2Caps%2C292&ref=nb_sb_noss_1"},
            {name:"Oil-Free Base", url:"https://www.amazon.in/s?k=Oil-Free+Base&crid=2RUETLWHZVVFM&sprefix=oil-free+base%2Caps%2C433&ref=nb_sb_noss_2"}
        ],
        postOutdoor: [
            {name:"Nourishing Face Mask", url:"https://www.amazon.in/s?k=Nourishing+Face+Mask&crid=3IO39LOFCZM3Q&sprefix=nourishing+face+mas%2Caps%2C310&ref=nb_sb_noss_2"},
            {name:"Cooling Moisturizer", url:"https://www.amazon.in/s?k=Cooling+Moisturizer&crid=3ULUGL5G75GVQ&sprefix=%2Caps%2C289&ref=nb_sb_noss_2"}
        ]
    },
    sensitive: {
        morning: [
            {name:"Eucerin Redness Relief Soothing Cleanser", url:"https://www.amazon.in/s?k=Eucerin+Redness+Relief+Soothing+Cleanser&crid=3DCC4ZD2L8U1H&sprefix=eucerin+redness+relief+soothing+cleanser%2Caps%2C351&ref=nb_sb_noss_2"},
            {name:"Calming Serum", url:"https://www.amazon.in/s?k=Calming+Serum&crid=2QG29LCCVK41S&sprefix=calming+serum%2Caps%2C263&ref=nb_sb_noss_1"},
            {name:"ISDIN Eryfotona Actinica Mineral Sunscreen SPF 50+",url:"https://www.amazon.in/s?k=ISDIN+Eryfotona+Actinica+Mineral+Sunscreen+SPF+50%2B&crid=3EG4MOJ3IYWQU&sprefix=isdin+eryfotona+actinica+mineral+sunscreen+spf+50%2B%2Caps%2C308&ref=nb_sb_noss_1"}
        ],
        afternoon: [
            {name:"Hydrating Mist", url:"https://www.amazon.in/s?k=Hydrating+Mist&crid=3UWYET4ZL99AN&sprefix=eltamd+uv+clear+broad-spectrum+spf+46%2Caps%2C381&ref=nb_sb_noss_1"},
            {name:"SPF Balm", url:"https://www.amazon.in/s?k=SPF+Balm&crid=3RMUQ2N71ILHG&sprefix=spf+balm%2Caps%2C303&ref=nb_sb_noss_1"}
        ],
        evening: [
            {name:"Drunk Elephant Lala Retro Whipped Cream", url:"https://www.amazon.in/s?k=Drunk+Elephant+Lala+Retro+Whipped+Cream&crid=1JTBXEIGADLF1&sprefix=hydrating+mist%2Caps%2C392&ref=nb_sb_noss_1"},
            {name:"Soothing Serum",url:"https://www.amazon.in/s?k=Soothing+Serum&crid=269UGE2M7OTLV&sprefix=soothing+serum%2Caps%2C358&ref=nb_sb_noss_1"}
        ],
        night: [
            {name:"Gentle Cleanser", url:"https://www.amazon.in/s?k=Gentle+Cleanser&crid=2FABKDK1D0AO&sprefix=gentle+cleanser%2Caps%2C326&ref=nb_sb_noss_2"},
            {name:"First Aid Beauty Ultra Repair Cream", url:"https://www.amazon.in/s?k=First+Aid+Beauty+Ultra+Repair+Cream&crid=28PNEICIGAMKN&sprefix=drunk+elephant+lala+retro+whipped+cream%2Caps%2C413&ref=nb_sb_noss_1"},
            {name:"Overnight Hydrating Mask",url:"https://www.amazon.in/s?k=Overnight+Hydrating+Mask&crid=35ZWDZ0H8D0AR&sprefix=olay+regenerist+retinol24+night+moisturizer%2Caps%2C393&ref=nb_sb_noss_1"}
        ],
        preOutdoor: [
            {name:"SPF 50 Mineral Sunscreen", url:"https://www.amazon.in/s?k=SPF+50+Mineral+Sunscreen&crid=2VKJD4QH3306R&sprefix=overnight+hydrating+mask%2Caps%2C327&ref=nb_sb_noss_1"},
            {name:"Lip Balm", url:"https://www.amazon.in/s?k=Lip+Balm&crid=1FL1WD3MRZ2C7&sprefix=lip+balm%2Caps%2C359&ref=nb_sb_noss_2"}
        ],
        postOutdoor: [
            {name:"Aloe Vera Mask", url:"https://www.amazon.in/s?k=Aloe+Vera+Mask&crid=2VZB6VH9NZHUV&sprefix=aloe+vera+mask%2Caps%2C377&ref=nb_sb_noss_1"},
            {name:"Calming Night Serum", url:"https://www.amazon.in/s?k=Calming+Night+Serum&crid=14I986IZQO5P6&sprefix=calming+night+serum%2Caps%2C295&ref=nb_sb_noss"}
        ]
    }
  }
};

const Home = () => {
  const [recommendationData, setRecommendationData] = useState({
    gender: '',
    skinType: '',
    timeOfDay: ''
  });
  const [recommendation, setRecommendation] = useState('');

  const handleRecommendationChange = (e) => {
    setRecommendationData({
      ...recommendationData,
      [e.target.name]: e.target.value
    });
  };

  const handleGetRecommendation = () => {
    if (recommendationData.gender && recommendationData.skinType && recommendationData.timeOfDay) {
      const genderData = skincareData[recommendationData.gender];
      if (!genderData) {
        setRecommendation('Sorry, we currently only have recommendations for male and female skin types.');
        return;
      }

      const skinTypeData = genderData[recommendationData.skinType];
      if (!skinTypeData) {
        setRecommendation(`Sorry, we currently only have recommendations for oily skin type for ${recommendationData.gender}. More skin types coming soon!`);
        return;
      }

      const routine = skinTypeData;
      let routineText = '';
      
      if (recommendationData.timeOfDay === 'fullDay') {
        Object.keys(routine).forEach(time => {
          routineText += `<strong>${time.charAt(0).toUpperCase() + time.slice(1)}:</strong> `;
          routineText += routine[time].map(product => 
            `<a href="${product.url}" target="_blank" style="color: #3498db; text-decoration: none;">${product.name}</a>`
          ).join(', ') + '<br/>';
        });
      } else {
        const time = recommendationData.timeOfDay;
        if (!routine[time]) {
          setRecommendation(`Sorry, we don't have recommendations for ${time} routine at the moment. Please try another time of day.`);
          return;
        }
        routineText = `<strong>${time.charAt(0).toUpperCase() + time.slice(1)}:</strong> `;
        routineText += routine[time].map(product => 
          `<a href="${product.url}" target="_blank" style="color: #3498db; text-decoration: none;">${product.name}</a>`
        ).join(', ');
      }
      setRecommendation(routineText);
    } else {
      setRecommendation('Please select gender, skin type, and time of day.');
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>Discover Your Perfect Skincare Routine</h1>
          <p>Get personalized skincare recommendations based on your skin type and concerns</p>
          
        </div>
      </div>

      <section className="recommendation-section">
        <div className="container">
          <h2>Get Personalized Recommendations</h2>
          <div className="recommendation-form">
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={recommendationData.gender}
                onChange={handleRecommendationChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="skinType">Skin Type</label>
              <select
                id="skinType"
                name="skinType"
                value={recommendationData.skinType}
                onChange={handleRecommendationChange}
              >
                <option value="">Select Skin Type</option>
                <option value="oily">Oily</option>
                <option value="dry">Dry</option>
                <option value="combination">Combination</option>
                <option value="sensitive">Sensitive</option>
                <option value="normal">Normal</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="timeOfDay">Time of Day</label>
              <select
                id="timeOfDay"
                name="timeOfDay"
                value={recommendationData.timeOfDay}
                onChange={handleRecommendationChange}
              >
                <option value="">Select Time of Day</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
                <option value="preOutdoor">Pre-Outdoor</option>
                <option value="postOutdoor">Post-Outdoor</option>
                <option value="fullDay">Full Day</option>
              </select>
            </div>
            <button 
              onClick={handleGetRecommendation}
              className="recommendation-btn"
              disabled={!recommendationData.gender || !recommendationData.skinType || !recommendationData.timeOfDay}
            >
              Get Recommendation
            </button>
          </div>
          {recommendation && <RecommendationCard recommendation={recommendation} />}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Our Services</h2>
          <div className="features-grid">
            <div className="feature-card">
              <img src={feature1} alt="Personalized Skincare" />
              <h3>Personalized Skincare</h3>
              <p>Customized routines designed for your unique skin type and concerns</p>
            </div>
            <div className="feature-card">
              <img src={feature2} alt="Expert Consultation" />
              <h3>Expert Consultation</h3>
              <p>Professional advice from experienced dermatologists and skincare specialists</p>
              <div className="coming-soon-badge">Coming Soon</div>
            </div>
            <div className="feature-card">
              <img src={feature3} alt="Skin Analysis" />
              <h3>Skin Analysis</h3>
              <p>Advanced AI-powered skin analysis to identify your skin type and concerns</p>
              <div className="coming-soon-badge">Coming Soon</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>About Me</h2>
              <p>Hey there! I'm a BTech student who created this platform because I understand the struggle of finding a proper skincare routine. Like many of you, I've watched countless videos and read numerous articles, but nothing seemed clear or personalized enough.</p>
              <p>I created this website to simplify skincare for everyone. Whether you're just starting your skincare journey or looking to improve your existing routine, this platform is designed to provide personalized recommendations based on your skin type and concerns.</p>
              <p>My goal is to make skincare accessible and understandable for everyone, especially those who feel overwhelmed by the vast amount of information out there. I believe that everyone deserves to have healthy, glowing skin without the confusion and complexity.</p>
              <Link to="/about" className="cta-button">Learn More</Link>
            </div>
            <div className="about-image">
              <img src={feature1} alt="About the creator" />
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .features {
          padding: 80px 0;
          background-color: #f9f9f9;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        h2 {
          text-align: center;
          margin-bottom: 40px;
          font-size: 2.5rem;
          color: #333;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        .feature-card {
          background: white;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .feature-card:hover {
          transform: translateY(-5px);
        }
        .feature-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .feature-card h3 {
          margin: 15px 0;
          color: #333;
          font-size: 1.5rem;
        }
        .feature-card p {
          color: #666;
          line-height: 1.6;
        }
        .coming-soon-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #ff6b6b;
          color: white;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 0.8rem;
          font-weight: bold;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Home; 