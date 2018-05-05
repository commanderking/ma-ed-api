const allDistricts = [
  {
    "name": "Abby Kelley Foster Charter Public (District)",
    "code": 4450000
  },
  {
    "name": "Abington",
    "code": 10000
  },
  {
    "name": "Academy Of the Pacific Rim Charter Public (District)",
    "code": 4120000
  },
  {
    "name": "Acton-Boxborough",
    "code": 6000000
  },
  {
    "name": "Acushnet",
    "code": 30000
  },
  {
    "name": "Adams-Cheshire",
    "code": 6030000
  },
  {
    "name": "Advanced Math and Science Academy Charter (District)",
    "code": 4300000
  },
  {
    "name": "Agawam",
    "code": 50000
  },
  {
    "name": "Alma del Mar Charter School (District)",
    "code": 4090000
  },
  {
    "name": "Amesbury",
    "code": 70000
  },
  {
    "name": "Amherst",
    "code": 80000
  },
  {
    "name": "Amherst-Pelham",
    "code": 6050000
  },
  {
    "name": "Andover",
    "code": 90000
  },
  {
    "name": "Argosy Collegiate Charter School (District)",
    "code": 35090000
  },
  {
    "name": "Arlington",
    "code": 100000
  },
  {
    "name": "Ashburnham-Westminster",
    "code": 6100000
  },
  {
    "name": "Ashland",
    "code": 140000
  },
  {
    "name": "Athol-Royalston",
    "code": 6150000
  },
  {
    "name": "Atlantis Charter (District)",
    "code": 4910000
  },
  {
    "name": "Attleboro",
    "code": 160000
  },
  {
    "name": "Auburn",
    "code": 170000
  },
  {
    "name": "Avon",
    "code": 180000
  },
  {
    "name": "Ayer Shirley School District",
    "code": 6160000
  },
  {
    "name": "Barnstable",
    "code": 200000
  },
  {
    "name": "Barnstable Community Horace Mann Charter Public (District)",
    "code": 4270000
  },
  {
    "name": "Baystate Academy Charter Public School (District)",
    "code": 35020000
  },
  {
    "name": "Bedford",
    "code": 230000
  },
  {
    "name": "Belchertown",
    "code": 240000
  },
  {
    "name": "Bellingham",
    "code": 250000
  },
  {
    "name": "Belmont",
    "code": 260000
  },
  {
    "name": "Benjamin Banneker Charter Public (District)",
    "code": 4200000
  },
  {
    "name": "Benjamin Franklin Classical Charter Public (District)",
    "code": 4470000
  },
  {
    "name": "Bentley Academy Charter School (District)",
    "code": 35110000
  },
  {
    "name": "Berkley",
    "code": 270000
  },
  {
    "name": "Berkshire Arts and Technology Charter Public (District)",
    "code": 4140000
  },
  {
    "name": "Berkshire Hills",
    "code": 6180000
  },
  {
    "name": "Berlin",
    "code": 280000
  },
  {
    "name": "Berlin-Boylston",
    "code": 6200000
  },
  {
    "name": "Beverly",
    "code": 300000
  },
  {
    "name": "Billerica",
    "code": 310000
  },
  {
    "name": "Blackstone-Millville",
    "code": 6220000
  },
  {
    "name": "Boston",
    "code": 350000
  },
  {
    "name": "Boston Collegiate Charter (District)",
    "code": 4490000
  },
  {
    "name": "Boston Green Academy Horace Mann Charter School (District)",
    "code": 4110000
  },
  {
    "name": "Boston Preparatory Charter Public (District)",
    "code": 4160000
  },
  {
    "name": "Boston Renaissance Charter Public (District)",
    "code": 4810000
  },
  {
    "name": "Bourne",
    "code": 360000
  },
  {
    "name": "Boxford",
    "code": 380000
  },
  {
    "name": "Boylston",
    "code": 390000
  },
  {
    "name": "Braintree",
    "code": 400000
  },
  {
    "name": "Brewster",
    "code": 410000
  },
  {
    "name": "Bridge Boston Charter School (District)",
    "code": 4170000
  },
  {
    "name": "Bridgewater-Raynham",
    "code": 6250000
  },
  {
    "name": "Brimfield",
    "code": 430000
  },
  {
    "name": "Brockton",
    "code": 440000
  },
  {
    "name": "Brooke Charter School (District)",
    "code": 4280000
  },
  {
    "name": "Brookfield",
    "code": 450000
  },
  {
    "name": "Brookline",
    "code": 460000
  },
  {
    "name": "Burlington",
    "code": 480000
  },
  {
    "name": "Cambridge",
    "code": 490000
  },
  {
    "name": "Canton",
    "code": 500000
  },
  {
    "name": "Cape Cod Lighthouse Charter (District)",
    "code": 4320000
  },
  {
    "name": "Carlisle",
    "code": 510000
  },
  {
    "name": "Carver",
    "code": 520000
  },
  {
    "name": "Central Berkshire",
    "code": 6350000
  },
  {
    "name": "Chelmsford",
    "code": 560000
  },
  {
    "name": "Chelsea",
    "code": 570000
  },
  {
    "name": "Chesterfield-Goshen",
    "code": 6320000
  },
  {
    "name": "Chicopee",
    "code": 610000
  },
  {
    "name": "Christa McAuliffe Charter Public (District)",
    "code": 4180000
  },
  {
    "name": "Clarksburg",
    "code": 630000
  },
  {
    "name": "Clinton",
    "code": 640000
  },
  {
    "name": "Codman Academy Charter Public (District)",
    "code": 4380000
  },
  {
    "name": "Cohasset",
    "code": 650000
  },
  {
    "name": "Collegiate Charter School of Lowell (District)",
    "code": 35030000
  },
  {
    "name": "Community Charter School of Cambridge (District)",
    "code": 4360000
  },
  {
    "name": "Community Day Charter Public School - Gateway (District)",
    "code": 4260000
  },
  {
    "name": "Community Day Charter Public School - Prospect (District)",
    "code": 4400000
  },
  {
    "name": "Community Day Charter Public School - R. Kingman Webster (District)",
    "code": 4310000
  },
  {
    "name": "Concord",
    "code": 670000
  },
  {
    "name": "Conservatory Lab Charter (District)",
    "code": 4390000
  },
  {
    "name": "Conway",
    "code": 680000
  },
  {
    "name": "Danvers",
    "code": 710000
  },
  {
    "name": "Dartmouth",
    "code": 720000
  },
  {
    "name": "Dedham",
    "code": 730000
  },
  {
    "name": "Deerfield",
    "code": 740000
  },
  {
    "name": "Dennis-Yarmouth",
    "code": 6450000
  },
  {
    "name": "Dighton-Rehoboth",
    "code": 6500000
  },
  {
    "name": "Douglas",
    "code": 770000
  },
  {
    "name": "Dover",
    "code": 780000
  },
  {
    "name": "Dover-Sherborn",
    "code": 6550000
  },
  {
    "name": "Dracut",
    "code": 790000
  },
  {
    "name": "Dudley Street Neighborhood Charter School (District)",
    "code": 4070000
  },
  {
    "name": "Dudley-Charlton Reg",
    "code": 6580000
  },
  {
    "name": "Duxbury",
    "code": 820000
  },
  {
    "name": "East Bridgewater",
    "code": 830000
  },
  {
    "name": "East Longmeadow",
    "code": 870000
  },
  {
    "name": "Eastham",
    "code": 850000
  },
  {
    "name": "Easthampton",
    "code": 860000
  },
  {
    "name": "Easton",
    "code": 880000
  },
  {
    "name": "Edgartown",
    "code": 890000
  },
  {
    "name": "Erving",
    "code": 910000
  },
  {
    "name": "Everett",
    "code": 930000
  },
  {
    "name": "Excel Academy Charter (District)",
    "code": 4100000
  },
  {
    "name": "Fairhaven",
    "code": 940000
  },
  {
    "name": "Fall River",
    "code": 950000
  },
  {
    "name": "Falmouth",
    "code": 960000
  },
  {
    "name": "Farmington River Reg",
    "code": 6620000
  },
  {
    "name": "Fitchburg",
    "code": 970000
  },
  {
    "name": "Florida",
    "code": 980000
  },
  {
    "name": "Four Rivers Charter Public (District)",
    "code": 4130000
  },
  {
    "name": "Foxborough",
    "code": 990000
  },
  {
    "name": "Foxborough Regional Charter (District)",
    "code": 4460000
  },
  {
    "name": "Framingham",
    "code": 1000000
  },
  {
    "name": "Francis W. Parker Charter Essential (District)",
    "code": 4780000
  },
  {
    "name": "Franklin",
    "code": 1010000
  },
  {
    "name": "Freetown-Lakeville",
    "code": 6650000
  },
  {
    "name": "Frontier",
    "code": 6700000
  },
  {
    "name": "Gardner",
    "code": 1030000
  },
  {
    "name": "Gateway",
    "code": 6720000
  },
  {
    "name": "Georgetown",
    "code": 1050000
  },
  {
    "name": "Gill-Montague",
    "code": 6740000
  },
  {
    "name": "Global Learning Charter Public (District)",
    "code": 4960000
  },
  {
    "name": "Gloucester",
    "code": 1070000
  },
  {
    "name": "Grafton",
    "code": 1100000
  },
  {
    "name": "Granby",
    "code": 1110000
  },
  {
    "name": "Greenfield",
    "code": 1140000
  },
  {
    "name": "Greenfield Commonwealth Virtual District",
    "code": 39010000
  },
  {
    "name": "Groton-Dunstable",
    "code": 6730000
  },
  {
    "name": "Hadley",
    "code": 1170000
  },
  {
    "name": "Halifax",
    "code": 1180000
  },
  {
    "name": "Hamilton-Wenham",
    "code": 6750000
  },
  {
    "name": "Hampden Charter School of Science East (District)",
    "code": 4990000
  },
  {
    "name": "Hampden-Wilbraham",
    "code": 6800000
  },
  {
    "name": "Hampshire",
    "code": 6830000
  },
  {
    "name": "Hancock",
    "code": 1210000
  },
  {
    "name": "Hanover",
    "code": 1220000
  },
  {
    "name": "Harvard",
    "code": 1250000
  },
  {
    "name": "Hatfield",
    "code": 1270000
  },
  {
    "name": "Haverhill",
    "code": 1280000
  },
  {
    "name": "Hawlemont",
    "code": 6850000
  },
  {
    "name": "Helen Y. Davis Leadership Academy Charter Public (District)",
    "code": 4190000
  },
  {
    "name": "Hill View Montessori Charter Public (District)",
    "code": 4550000
  },
  {
    "name": "Hilltown Cooperative Charter Public (District)",
    "code": 4500000
  },
  {
    "name": "Hingham",
    "code": 1310000
  },
  {
    "name": "Holbrook",
    "code": 1330000
  },
  {
    "name": "Holland",
    "code": 1350000
  },
  {
    "name": "Holliston",
    "code": 1360000
  },
  {
    "name": "Holyoke",
    "code": 1370000
  },
  {
    "name": "Holyoke Community Charter (District)",
    "code": 4530000
  },
  {
    "name": "Hopedale",
    "code": 1380000
  },
  {
    "name": "Hopkinton",
    "code": 1390000
  },
  {
    "name": "Hudson",
    "code": 1410000
  },
  {
    "name": "Hull",
    "code": 1420000
  },
  {
    "name": "Innovation Academy Charter (District)",
    "code": 4350000
  },
  {
    "name": "Ipswich",
    "code": 1440000
  },
  {
    "name": "KIPP Academy Boston Charter School (District)",
    "code": 4630000
  },
  {
    "name": "KIPP Academy Lynn Charter (District)",
    "code": 4290000
  },
  {
    "name": "King Philip",
    "code": 6900000
  },
  {
    "name": "Kingston",
    "code": 1450000
  },
  {
    "name": "Lanesborough",
    "code": 1480000
  },
  {
    "name": "Lawrence",
    "code": 1490000
  },
  {
    "name": "Lawrence Family Development Charter (District)",
    "code": 4540000
  },
  {
    "name": "Lee",
    "code": 1500000
  },
  {
    "name": "Leicester",
    "code": 1510000
  },
  {
    "name": "Lenox",
    "code": 1520000
  },
  {
    "name": "Leominster",
    "code": 1530000
  },
  {
    "name": "Leverett",
    "code": 1540000
  },
  {
    "name": "Lexington",
    "code": 1550000
  },
  {
    "name": "Lincoln",
    "code": 1570000
  },
  {
    "name": "Littleton",
    "code": 1580000
  },
  {
    "name": "Longmeadow",
    "code": 1590000
  },
  {
    "name": "Lowell",
    "code": 1600000
  },
  {
    "name": "Lowell Community Charter Public (District)",
    "code": 4560000
  },
  {
    "name": "Ludlow",
    "code": 1610000
  },
  {
    "name": "Lunenburg",
    "code": 1620000
  },
  {
    "name": "Lynn",
    "code": 1630000
  },
  {
    "name": "Lynnfield",
    "code": 1640000
  },
  {
    "name": "MATCH Charter Public School (District)",
    "code": 4690000
  },
  {
    "name": "Malden",
    "code": 1650000
  },
  {
    "name": "Manchester Essex Regional",
    "code": 6980000
  },
  {
    "name": "Mansfield",
    "code": 1670000
  },
  {
    "name": "Marblehead",
    "code": 1680000
  },
  {
    "name": "Marblehead Community Charter Public (District)",
    "code": 4640000
  },
  {
    "name": "Marion",
    "code": 1690000
  },
  {
    "name": "Marlborough",
    "code": 1700000
  },
  {
    "name": "Marshfield",
    "code": 1710000
  },
  {
    "name": "Martha's Vineyard Charter (District)",
    "code": 4660000
  },
  {
    "name": "Martin Luther King Jr. Charter School of Excellence (District)",
    "code": 4920000
  },
  {
    "name": "Masconomet",
    "code": 7050000
  },
  {
    "name": "Mashpee",
    "code": 1720000
  },
  {
    "name": "Mattapoisett",
    "code": 1730000
  },
  {
    "name": "Maynard",
    "code": 1740000
  },
  {
    "name": "Medfield",
    "code": 1750000
  },
  {
    "name": "Medford",
    "code": 1760000
  },
  {
    "name": "Medway",
    "code": 1770000
  },
  {
    "name": "Melrose",
    "code": 1780000
  },
  {
    "name": "Mendon-Upton",
    "code": 7100000
  },
  {
    "name": "Methuen",
    "code": 1810000
  },
  {
    "name": "Middleborough",
    "code": 1820000
  },
  {
    "name": "Middleton",
    "code": 1840000
  },
  {
    "name": "Milford",
    "code": 1850000
  },
  {
    "name": "Millbury",
    "code": 1860000
  },
  {
    "name": "Millis",
    "code": 1870000
  },
  {
    "name": "Milton",
    "code": 1890000
  },
  {
    "name": "Mohawk Trail",
    "code": 7170000
  },
  {
    "name": "Monomoy Regional School District",
    "code": 7120000
  },
  {
    "name": "Monson",
    "code": 1910000
  },
  {
    "name": "Mount Greylock",
    "code": 7150000
  },
  {
    "name": "Mystic Valley Regional Charter (District)",
    "code": 4700000
  },
  {
    "name": "Nahant",
    "code": 1960000
  },
  {
    "name": "Nantucket",
    "code": 1970000
  },
  {
    "name": "Narragansett",
    "code": 7200000
  },
  {
    "name": "Nashoba",
    "code": 7250000
  },
  {
    "name": "Natick",
    "code": 1980000
  },
  {
    "name": "Nauset",
    "code": 6600000
  },
  {
    "name": "Needham",
    "code": 1990000
  },
  {
    "name": "Neighborhood House Charter (District)",
    "code": 4440000
  },
  {
    "name": "New Bedford",
    "code": 2010000
  },
  {
    "name": "New Heights Charter School of Brockton (District)",
    "code": 35130000
  },
  {
    "name": "New Salem-Wendell",
    "code": 7280000
  },
  {
    "name": "Newburyport",
    "code": 2040000
  },
  {
    "name": "Newton",
    "code": 2070000
  },
  {
    "name": "Norfolk",
    "code": 2080000
  },
  {
    "name": "North Adams",
    "code": 2090000
  },
  {
    "name": "North Andover",
    "code": 2110000
  },
  {
    "name": "North Attleborough",
    "code": 2120000
  },
  {
    "name": "North Brookfield",
    "code": 2150000
  },
  {
    "name": "North Middlesex",
    "code": 7350000
  },
  {
    "name": "North Reading",
    "code": 2170000
  },
  {
    "name": "Northampton",
    "code": 2100000
  },
  {
    "name": "Northborough",
    "code": 2130000
  },
  {
    "name": "Northbridge",
    "code": 2140000
  },
  {
    "name": "Norton",
    "code": 2180000
  },
  {
    "name": "Norwell",
    "code": 2190000
  },
  {
    "name": "Norwood",
    "code": 2200000
  },
  {
    "name": "Oak Bluffs",
    "code": 2210000
  },
  {
    "name": "Old Rochester",
    "code": 7400000
  },
  {
    "name": "Orange",
    "code": 2230000
  },
  {
    "name": "Orleans",
    "code": 2240000
  },
  {
    "name": "Oxford",
    "code": 2260000
  },
  {
    "name": "Palmer",
    "code": 2270000
  },
  {
    "name": "Peabody",
    "code": 2290000
  },
  {
    "name": "Pelham",
    "code": 2300000
  },
  {
    "name": "Pembroke",
    "code": 2310000
  },
  {
    "name": "Pentucket",
    "code": 7450000
  },
  {
    "name": "Petersham",
    "code": 2340000
  },
  {
    "name": "Pioneer Charter School of Science (District)",
    "code": 4940000
  },
  {
    "name": "Pioneer Charter School of Science II (PCSS-II) (District)",
    "code": 35060000
  },
  {
    "name": "Pioneer Valley",
    "code": 7500000
  },
  {
    "name": "Pioneer Valley Chinese Immersion Charter (District)",
    "code": 4970000
  },
  {
    "name": "Pioneer Valley Performing Arts Charter Public (District)",
    "code": 4790000
  },
  {
    "name": "Pittsfield",
    "code": 2360000
  },
  {
    "name": "Plainville",
    "code": 2380000
  },
  {
    "name": "Plymouth",
    "code": 2390000
  },
  {
    "name": "Plympton",
    "code": 2400000
  },
  {
    "name": "Prospect Hill Academy Charter (District)",
    "code": 4870000
  },
  {
    "name": "Provincetown",
    "code": 2420000
  },
  {
    "name": "Quabbin",
    "code": 7530000
  },
  {
    "name": "Quaboag Regional",
    "code": 7780000
  },
  {
    "name": "Quincy",
    "code": 2430000
  },
  {
    "name": "Ralph C Mahar",
    "code": 7550000
  },
  {
    "name": "Randolph",
    "code": 2440000
  },
  {
    "name": "Reading",
    "code": 2460000
  },
  {
    "name": "Revere",
    "code": 2480000
  },
  {
    "name": "Richmond",
    "code": 2490000
  },
  {
    "name": "Rising Tide Charter Public (District)",
    "code": 4830000
  },
  {
    "name": "River Valley Charter (District)",
    "code": 4820000
  },
  {
    "name": "Rochester",
    "code": 2500000
  },
  {
    "name": "Rockland",
    "code": 2510000
  },
  {
    "name": "Rockport",
    "code": 2520000
  },
  {
    "name": "Rowe",
    "code": 2530000
  },
  {
    "name": "Roxbury Preparatory Charter (District)",
    "code": 4840000
  },
  {
    "name": "Sabis International Charter (District)",
    "code": 4410000
  },
  {
    "name": "Salem",
    "code": 2580000
  },
  {
    "name": "Salem Academy Charter (District)",
    "code": 4850000
  },
  {
    "name": "Sandwich",
    "code": 2610000
  },
  {
    "name": "Saugus",
    "code": 2620000
  },
  {
    "name": "Savoy",
    "code": 2630000
  },
  {
    "name": "Scituate",
    "code": 2640000
  },
  {
    "name": "Seekonk",
    "code": 2650000
  },
  {
    "name": "Seven Hills Charter Public (District)",
    "code": 4860000
  },
  {
    "name": "Sharon",
    "code": 2660000
  },
  {
    "name": "Sherborn",
    "code": 2690000
  },
  {
    "name": "Shrewsbury",
    "code": 2710000
  },
  {
    "name": "Shutesbury",
    "code": 2720000
  },
  {
    "name": "Silver Hill Horace Mann Charter (District)",
    "code": 4770000
  },
  {
    "name": "Silver Lake",
    "code": 7600000
  },
  {
    "name": "Sizer School: A North Central Charter Essential (District)",
    "code": 4740000
  },
  {
    "name": "Somerset",
    "code": 2730000
  },
  {
    "name": "Somerville",
    "code": 2740000
  },
  {
    "name": "South Hadley",
    "code": 2780000
  },
  {
    "name": "South Shore Charter Public (District)",
    "code": 4880000
  },
  {
    "name": "Southampton",
    "code": 2750000
  },
  {
    "name": "Southborough",
    "code": 2760000
  },
  {
    "name": "Southbridge",
    "code": 2770000
  },
  {
    "name": "Southern Berkshire",
    "code": 7650000
  },
  {
    "name": "Southwick-Tolland-Granville Regional School District",
    "code": 7660000
  },
  {
    "name": "Spencer-E Brookfield",
    "code": 7670000
  },
  {
    "name": "Springfield",
    "code": 2810000
  },
  {
    "name": "Stoneham",
    "code": 2840000
  },
  {
    "name": "Stoughton",
    "code": 2850000
  },
  {
    "name": "Sturbridge",
    "code": 2870000
  },
  {
    "name": "Sudbury",
    "code": 2880000
  },
  {
    "name": "Sunderland",
    "code": 2890000
  },
  {
    "name": "Sutton",
    "code": 2900000
  },
  {
    "name": "Swampscott",
    "code": 2910000
  },
  {
    "name": "Swansea",
    "code": 2920000
  },
  {
    "name": "TEC Connections Academy Commonwealth Virtual School District",
    "code": 39020000
  },
  {
    "name": "Tantasqua",
    "code": 7700000
  },
  {
    "name": "Taunton",
    "code": 2930000
  },
  {
    "name": "Tewksbury",
    "code": 2950000
  },
  {
    "name": "Tisbury",
    "code": 2960000
  },
  {
    "name": "Topsfield",
    "code": 2980000
  },
  {
    "name": "Triton",
    "code": 7730000
  },
  {
    "name": "Truro",
    "code": 3000000
  },
  {
    "name": "Tyngsborough",
    "code": 3010000
  },
  {
    "name": "UP Academy Charter School of Boston (District)",
    "code": 4800000
  },
  {
    "name": "UP Academy Charter School of Dorchester (District)",
    "code": 35050000
  },
  {
    "name": "Up-Island Regional",
    "code": 7740000
  },
  {
    "name": "Uxbridge",
    "code": 3040000
  },
  {
    "name": "Veritas Preparatory Charter School (District)",
    "code": 4980000
  },
  {
    "name": "Wachusett",
    "code": 7750000
  },
  {
    "name": "Wakefield",
    "code": 3050000
  },
  {
    "name": "Wales",
    "code": 3060000
  },
  {
    "name": "Walpole",
    "code": 3070000
  },
  {
    "name": "Waltham",
    "code": 3080000
  },
  {
    "name": "Ware",
    "code": 3090000
  },
  {
    "name": "Wareham",
    "code": 3100000
  },
  {
    "name": "Watertown",
    "code": 3140000
  },
  {
    "name": "Wayland",
    "code": 3150000
  },
  {
    "name": "Webster",
    "code": 3160000
  },
  {
    "name": "Wellesley",
    "code": 3170000
  },
  {
    "name": "Wellfleet",
    "code": 3180000
  },
  {
    "name": "West Boylston",
    "code": 3220000
  },
  {
    "name": "West Bridgewater",
    "code": 3230000
  },
  {
    "name": "West Springfield",
    "code": 3320000
  },
  {
    "name": "Westborough",
    "code": 3210000
  },
  {
    "name": "Westfield",
    "code": 3250000
  },
  {
    "name": "Westford",
    "code": 3260000
  },
  {
    "name": "Westhampton",
    "code": 3270000
  },
  {
    "name": "Weston",
    "code": 3300000
  },
  {
    "name": "Westport",
    "code": 3310000
  },
  {
    "name": "Westwood",
    "code": 3350000
  },
  {
    "name": "Weymouth",
    "code": 3360000
  },
  {
    "name": "Whately",
    "code": 3370000
  },
  {
    "name": "Whitman-Hanson",
    "code": 7800000
  },
  {
    "name": "Williamsburg",
    "code": 3400000
  },
  {
    "name": "Williamstown",
    "code": 3410000
  },
  {
    "name": "Wilmington",
    "code": 3420000
  },
  {
    "name": "Winchendon",
    "code": 3430000
  },
  {
    "name": "Winchester",
    "code": 3440000
  },
  {
    "name": "Winthrop",
    "code": 3460000
  },
  {
    "name": "Woburn",
    "code": 3470000
  },
  {
    "name": "Worcester",
    "code": 3480000
  },
  {
    "name": "Worthington",
    "code": 3490000
  },
  {
    "name": "Wrentham",
    "code": 3500000
  },
  {
    "name": "State",
    "code": 0
  },
]

module.exports = allDistricts;
