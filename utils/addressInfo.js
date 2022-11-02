const regiones = [
    {
        codigo: "15",
        nombre: "Arica y Parinacota",
        codigo_padre: "00"
    },
    {
        codigo: "01",
        nombre: "Tarapacá",
        codigo_padre: "00"
    },
    {
        codigo: "02",
        nombre: "Antofagasta",
        codigo_padre: "00"
    },
    {
        codigo: "03",
        nombre: "Atacama",
        codigo_padre: "00"
    },
    {
        codigo: "04",
        nombre: "Coquimbo",
        codigo_padre: "00"
    },
    {
        codigo: "05",
        nombre: "Valparaíso",
        codigo_padre: "00"
    },
    {
        codigo: "13",
        nombre: "Metropolitana de Santiago",
        codigo_padre: "00"
    },
    {
        codigo: "06",
        nombre: "Del Libertador Gral. Bernardo O’Higgins",
        codigo_padre: "00"
    },
    {
        codigo: "07",
        nombre: "Del Maule",
        codigo_padre: "00"
    },
    {
        codigo: "08",
        nombre: "Del Biobío",
        codigo_padre: "00"
    },
    {
        codigo: "09",
        nombre: "De la Araucanía",
        codigo_padre: "00"
    },
    {
        codigo: "14",
        nombre: "De los Ríos",
        codigo_padre: "00"
    },
    {
        codigo: "10",
        nombre: "De los Lagos",
        codigo_padre: "00"
    },
    {
        codigo: "11",
        nombre: "Aysén del Gral. Carlos Ibáñez del Campo",
        codigo_padre: "00"
    },
    {
        codigo: "12",
        nombre: "Magallanes y de la Antártica Chilena",
        codigo_padre: "00"
    },
    {
        codigo: "16",
        nombre: "Ñuble",
        codigo_padre: "00"
    }
]

const provincias = [
    {
        codigo: "122",
        nombre: "Antártica Chilena",
        codigo_padre: "12"
    },
    {
        codigo: "021",
        nombre: "Antofagasta",
        codigo_padre: "02"
    },
    {
        codigo: "082",
        nombre: "Arauco",
        codigo_padre: "08"
    },
    {
        codigo: "151",
        nombre: "Arica",
        codigo_padre: "15"
    },
    {
        codigo: "112",
        nombre: "Aysén",
        codigo_padre: "11"
    },
    {
        codigo: "083",
        nombre: "Biobío",
        codigo_padre: "08"
    },
    {
        codigo: "061",
        nombre: "Cachapoal",
        codigo_padre: "06"
    },
    {
        codigo: "113",
        nombre: "Capitán Prat",
        codigo_padre: "11"
    },
    {
        codigo: "062",
        nombre: "Cardenal Caro",
        codigo_padre: "06"
    },
    {
        codigo: "072",
        nombre: "Cauquenes",
        codigo_padre: "07"
    },
    {
        codigo: "091",
        nombre: "Cautín",
        codigo_padre: "09"
    },
    {
        codigo: "133",
        nombre: "Chacabuco",
        codigo_padre: "13"
    },
    {
        codigo: "032",
        nombre: "Chañaral",
        codigo_padre: "03"
    },
    {
        codigo: "102",
        nombre: "Chiloé",
        codigo_padre: "10"
    },
    {
        codigo: "042",
        nombre: "Choapa",
        codigo_padre: "04"
    },
    {
        codigo: "111",
        nombre: "Coihaique",
        codigo_padre: "11"
    },
    {
        codigo: "063",
        nombre: "Colchagua",
        codigo_padre: "06"
    },
    {
        codigo: "081",
        nombre: "Concepción",
        codigo_padre: "08"
    },
    {
        codigo: "031",
        nombre: "Copiapó",
        codigo_padre: "03"
    },
    {
        codigo: "132",
        nombre: "Cordillera",
        codigo_padre: "13"
    },
    {
        codigo: "073",
        nombre: "Curicó",
        codigo_padre: "07"
    },
    {
        codigo: "161",
        nombre: "Diguillín",
        codigo_padre: "16"
    },
    {
        codigo: "022",
        nombre: "El Loa",
        codigo_padre: "02"
    },
    {
        codigo: "041",
        nombre: "Elqui",
        codigo_padre: "04"
    },
    {
        codigo: "114",
        nombre: "General Carrera",
        codigo_padre: "11"
    },
    {
        codigo: "033",
        nombre: "Huasco",
        codigo_padre: "03"
    },
    {
        codigo: "011",
        nombre: "Iquique",
        codigo_padre: "01"
    },
    {
        codigo: "052",
        nombre: "Isla de Pascua",
        codigo_padre: "05"
    },
    {
        codigo: "162",
        nombre: "Itata",
        codigo_padre: "16"
    },
    {
        codigo: "043",
        nombre: "Limarí",
        codigo_padre: "04"
    },
    {
        codigo: "074",
        nombre: "Linares",
        codigo_padre: "07"
    },
    {
        codigo: "101",
        nombre: "Llanquihue",
        codigo_padre: "10"
    },
    {
        codigo: "053",
        nombre: "Los Andes",
        codigo_padre: "05"
    },
    {
        codigo: "121",
        nombre: "Magallanes",
        codigo_padre: "12"
    },
    {
        codigo: "134",
        nombre: "Maipo",
        codigo_padre: "13"
    },
    {
        codigo: "092",
        nombre: "Malleco",
        codigo_padre: "09"
    },
    {
        codigo: "058",
        nombre: "Marga Marga",
        codigo_padre: "05"
    },
    {
        codigo: "135",
        nombre: "Melipilla",
        codigo_padre: "13"
    },
    {
        codigo: "103",
        nombre: "Osorno",
        codigo_padre: "10"
    },
    {
        codigo: "104",
        nombre: "Palena",
        codigo_padre: "10"
    },
    {
        codigo: "152",
        nombre: "Parinacota",
        codigo_padre: "15"
    },
    {
        codigo: "054",
        nombre: "Petorca",
        codigo_padre: "05"
    },
    {
        codigo: "163",
        nombre: "Punilla",
        codigo_padre: "16"
    },
    {
        codigo: "055",
        nombre: "Quillota",
        codigo_padre: "05"
    },
    {
        codigo: "142",
        nombre: "Ranco",
        codigo_padre: "14"
    },
    {
        codigo: "056",
        nombre: "San Antonio",
        codigo_padre: "05"
    },
    {
        codigo: "057",
        nombre: "San Felipe de Aconcagua",
        codigo_padre: "05"
    },
    {
        codigo: "131",
        nombre: "Santiago",
        codigo_padre: "13"
    },
    {
        codigo: "136",
        nombre: "Talagante",
        codigo_padre: "13"
    },
    {
        codigo: "071",
        nombre: "Talca",
        codigo_padre: "07"
    },
    {
        codigo: "014",
        nombre: "Tamarugal",
        codigo_padre: "01"
    },
    {
        codigo: "123",
        nombre: "Tierra del Fuego",
        codigo_padre: "12"
    },
    {
        codigo: "023",
        nombre: "Tocopilla",
        codigo_padre: "02"
    },
    {
        codigo: "124",
        nombre: "Última Esperanza",
        codigo_padre: "12"
    },
    {
        codigo: "141",
        nombre: "Valdivia",
        codigo_padre: "14"
    },
    {
        codigo: "051",
        nombre: "Valparaíso",
        codigo_padre: "05"
    }
]

const comunas = [
    {
        codigo: "05602",
        nombre: "Algarrobo",
        codigo_padre: "056"
    },
    {
        codigo: "13502",
        nombre: "Alhué",
        codigo_padre: "135"
    },
    {
        codigo: "08314",
        nombre: "Alto Biobío",
        codigo_padre: "083"
    },
    {
        codigo: "03302",
        nombre: "Alto del Carmen",
        codigo_padre: "033"
    },
    {
        codigo: "01107",
        nombre: "Alto Hospicio",
        codigo_padre: "011"
    },
    {
        codigo: "10202",
        nombre: "Ancud",
        codigo_padre: "102"
    },
    {
        codigo: "04103",
        nombre: "Andacollo",
        codigo_padre: "041"
    },
    {
        codigo: "09201",
        nombre: "Angol",
        codigo_padre: "092"
    },
    {
        codigo: "12202",
        nombre: "Antártica",
        codigo_padre: "122"
    },
    {
        codigo: "02101",
        nombre: "Antofagasta",
        codigo_padre: "021"
    },
    {
        codigo: "08302",
        nombre: "Antuco",
        codigo_padre: "083"
    },
    {
        codigo: "08202",
        nombre: "Arauco",
        codigo_padre: "082"
    },
    {
        codigo: "15101",
        nombre: "Arica",
        codigo_padre: "151"
    },
    {
        codigo: "11201",
        nombre: "Aysén",
        codigo_padre: "112"
    },
    {
        codigo: "13402",
        nombre: "Buin",
        codigo_padre: "134"
    },
    {
        codigo: "16102",
        nombre: "Bulnes",
        codigo_padre: "161"
    },
    {
        codigo: "05402",
        nombre: "Cabildo",
        codigo_padre: "054"
    },
    {
        codigo: "12201",
        nombre: "Cabo de Hornos",
        codigo_padre: "122"
    },
    {
        codigo: "08303",
        nombre: "Cabrero",
        codigo_padre: "083"
    },
    {
        codigo: "02201",
        nombre: "Calama",
        codigo_padre: "022"
    },
    {
        codigo: "10102",
        nombre: "Calbuco",
        codigo_padre: "101"
    },
    {
        codigo: "03102",
        nombre: "Caldera",
        codigo_padre: "031"
    },
    {
        codigo: "05502",
        nombre: "Calera",
        codigo_padre: "055"
    },
    {
        codigo: "13403",
        nombre: "Calera de Tango",
        codigo_padre: "134"
    },
    {
        codigo: "05302",
        nombre: "Calle Larga",
        codigo_padre: "053"
    },
    {
        codigo: "15102",
        nombre: "Camarones",
        codigo_padre: "151"
    },
    {
        codigo: "01402",
        nombre: "Camiña",
        codigo_padre: "014"
    },
    {
        codigo: "04202",
        nombre: "Canela",
        codigo_padre: "042"
    },
    {
        codigo: "08203",
        nombre: "Cañete",
        codigo_padre: "082"
    },
    {
        codigo: "09102",
        nombre: "Carahue",
        codigo_padre: "091"
    },
    {
        codigo: "05603",
        nombre: "Cartagena",
        codigo_padre: "056"
    },
    {
        codigo: "05102",
        nombre: "Casablanca",
        codigo_padre: "051"
    },
    {
        codigo: "10201",
        nombre: "Castro",
        codigo_padre: "102"
    },
    {
        codigo: "05702",
        nombre: "Catemu",
        codigo_padre: "057"
    },
    {
        codigo: "07201",
        nombre: "Cauquenes",
        codigo_padre: "072"
    },
    {
        codigo: "13102",
        nombre: "Cerrillos",
        codigo_padre: "131"
    },
    {
        codigo: "13103",
        nombre: "Cerro Navia",
        codigo_padre: "131"
    },
    {
        codigo: "10401",
        nombre: "Chaitén",
        codigo_padre: "104"
    },
    {
        codigo: "03201",
        nombre: "Chañaral",
        codigo_padre: "032"
    },
    {
        codigo: "07202",
        nombre: "Chanco",
        codigo_padre: "072"
    },
    {
        codigo: "06302",
        nombre: "Chépica",
        codigo_padre: "063"
    },
    {
        codigo: "08103",
        nombre: "Chiguayante",
        codigo_padre: "081"
    },
    {
        codigo: "11401",
        nombre: "Chile Chico",
        codigo_padre: "114"
    },
    {
        codigo: "16101",
        nombre: "Chillán",
        codigo_padre: "161"
    },
    {
        codigo: "16103",
        nombre: "Chillán Viejo",
        codigo_padre: "161"
    },
    {
        codigo: "06303",
        nombre: "Chimbarongo",
        codigo_padre: "063"
    },
    {
        codigo: "09121",
        nombre: "Cholchol",
        codigo_padre: "091"
    },
    {
        codigo: "10203",
        nombre: "Chonchi",
        codigo_padre: "102"
    },
    {
        codigo: "11202",
        nombre: "Cisnes",
        codigo_padre: "112"
    },
    {
        codigo: "16202",
        nombre: "Cobquecura",
        codigo_padre: "162"
    },
    {
        codigo: "10103",
        nombre: "Cochamó",
        codigo_padre: "101"
    },
    {
        codigo: "11301",
        nombre: "Cochrane",
        codigo_padre: "113"
    },
    {
        codigo: "06102",
        nombre: "Codegua",
        codigo_padre: "061"
    },
    {
        codigo: "16203",
        nombre: "Coelemu",
        codigo_padre: "162"
    },
    {
        codigo: "11101",
        nombre: "Coihaique",
        codigo_padre: "111"
    },
    {
        codigo: "16302",
        nombre: "Coihueco",
        codigo_padre: "163"
    },
    {
        codigo: "06103",
        nombre: "Coinco",
        codigo_padre: "061"
    },
    {
        codigo: "07402",
        nombre: "Colbún",
        codigo_padre: "074"
    },
    {
        codigo: "01403",
        nombre: "Colchane",
        codigo_padre: "014"
    },
    {
        codigo: "13301",
        nombre: "Colina",
        codigo_padre: "133"
    },
    {
        codigo: "09202",
        nombre: "Collipulli",
        codigo_padre: "092"
    },
    {
        codigo: "06104",
        nombre: "Coltauco",
        codigo_padre: "061"
    },
    {
        codigo: "04302",
        nombre: "Combarbalá",
        codigo_padre: "043"
    },
    {
        codigo: "08101",
        nombre: "Concepción",
        codigo_padre: "081"
    },
    {
        codigo: "13104",
        nombre: "Conchalí",
        codigo_padre: "131"
    },
    {
        codigo: "05103",
        nombre: "Concón",
        codigo_padre: "051"
    },
    {
        codigo: "07102",
        nombre: "Constitución",
        codigo_padre: "071"
    },
    {
        codigo: "08204",
        nombre: "Contulmo",
        codigo_padre: "082"
    },
    {
        codigo: "03101",
        nombre: "Copiapó",
        codigo_padre: "031"
    },
    {
        codigo: "04102",
        nombre: "Coquimbo",
        codigo_padre: "041"
    },
    {
        codigo: "08102",
        nombre: "Coronel",
        codigo_padre: "081"
    },
    {
        codigo: "14102",
        nombre: "Corral",
        codigo_padre: "141"
    },
    {
        codigo: "09103",
        nombre: "Cunco",
        codigo_padre: "091"
    },
    {
        codigo: "09203",
        nombre: "Curacautín",
        codigo_padre: "092"
    },
    {
        codigo: "13503",
        nombre: "Curacaví",
        codigo_padre: "135"
    },
    {
        codigo: "10204",
        nombre: "Curaco de Vélez",
        codigo_padre: "102"
    },
    {
        codigo: "08205",
        nombre: "Curanilahue",
        codigo_padre: "082"
    },
    {
        codigo: "09104",
        nombre: "Curarrehue",
        codigo_padre: "091"
    },
    {
        codigo: "07103",
        nombre: "Curepto",
        codigo_padre: "071"
    },
    {
        codigo: "07301",
        nombre: "Curicó",
        codigo_padre: "073"
    },
    {
        codigo: "10205",
        nombre: "Dalcahue",
        codigo_padre: "102"
    },
    {
        codigo: "03202",
        nombre: "Diego de Almagro",
        codigo_padre: "032"
    },
    {
        codigo: "06105",
        nombre: "Doñihue",
        codigo_padre: "061"
    },
    {
        codigo: "13105",
        nombre: "El Bosque",
        codigo_padre: "131"
    },
    {
        codigo: "16104",
        nombre: "El Carmen",
        codigo_padre: "161"
    },
    {
        codigo: "13602",
        nombre: "El Monte",
        codigo_padre: "136"
    },
    {
        codigo: "05604",
        nombre: "El Quisco",
        codigo_padre: "056"
    },
    {
        codigo: "05605",
        nombre: "El Tabo",
        codigo_padre: "056"
    },
    {
        codigo: "07104",
        nombre: "Empedrado",
        codigo_padre: "071"
    },
    {
        codigo: "09204",
        nombre: "Ercilla",
        codigo_padre: "092"
    },
    {
        codigo: "13106",
        nombre: "Estación Central",
        codigo_padre: "131"
    },
    {
        codigo: "08104",
        nombre: "Florida",
        codigo_padre: "081"
    },
    {
        codigo: "09105",
        nombre: "Freire",
        codigo_padre: "091"
    },
    {
        codigo: "03303",
        nombre: "Freirina",
        codigo_padre: "033"
    },
    {
        codigo: "10104",
        nombre: "Fresia",
        codigo_padre: "101"
    },
    {
        codigo: "10105",
        nombre: "Frutillar",
        codigo_padre: "101"
    },
    {
        codigo: "10402",
        nombre: "Futaleufú",
        codigo_padre: "104"
    },
    {
        codigo: "14202",
        nombre: "Futrono",
        codigo_padre: "142"
    },
    {
        codigo: "09106",
        nombre: "Galvarino",
        codigo_padre: "091"
    },
    {
        codigo: "15202",
        nombre: "General Lagos",
        codigo_padre: "152"
    },
    {
        codigo: "09107",
        nombre: "Gorbea",
        codigo_padre: "091"
    },
    {
        codigo: "06106",
        nombre: "Graneros",
        codigo_padre: "061"
    },
    {
        codigo: "11203",
        nombre: "Guaitecas",
        codigo_padre: "112"
    },
    {
        codigo: "05503",
        nombre: "Hijuelas",
        codigo_padre: "055"
    },
    {
        codigo: "10403",
        nombre: "Hualaihué",
        codigo_padre: "104"
    },
    {
        codigo: "07302",
        nombre: "Hualañé",
        codigo_padre: "073"
    },
    {
        codigo: "08112",
        nombre: "Hualpén",
        codigo_padre: "081"
    },
    {
        codigo: "08105",
        nombre: "Hualqui",
        codigo_padre: "081"
    },
    {
        codigo: "01404",
        nombre: "Huara",
        codigo_padre: "014"
    },
    {
        codigo: "03304",
        nombre: "Huasco",
        codigo_padre: "033"
    },
    {
        codigo: "13107",
        nombre: "Huechuraba",
        codigo_padre: "131"
    },
    {
        codigo: "04201",
        nombre: "Illapel",
        codigo_padre: "042"
    },
    {
        codigo: "13108",
        nombre: "Independencia",
        codigo_padre: "131"
    },
    {
        codigo: "01101",
        nombre: "Iquique",
        codigo_padre: "011"
    },
    {
        codigo: "13603",
        nombre: "Isla de Maipo",
        codigo_padre: "136"
    },
    {
        codigo: "05201",
        nombre: "Isla de Pascua",
        codigo_padre: "052"
    },
    {
        codigo: "05104",
        nombre: "Juan Fernández",
        codigo_padre: "051"
    },
    {
        codigo: "13109",
        nombre: "La Cisterna",
        codigo_padre: "131"
    },
    {
        codigo: "05504",
        nombre: "La Cruz",
        codigo_padre: "055"
    },
    {
        codigo: "06202",
        nombre: "La Estrella",
        codigo_padre: "062"
    },
    {
        codigo: "13110",
        nombre: "La Florida",
        codigo_padre: "131"
    },
    {
        codigo: "13111",
        nombre: "La Granja",
        codigo_padre: "131"
    },
    {
        codigo: "04104",
        nombre: "La Higuera",
        codigo_padre: "041"
    },
    {
        codigo: "05401",
        nombre: "La Ligua",
        codigo_padre: "054"
    },
    {
        codigo: "13112",
        nombre: "La Pintana",
        codigo_padre: "131"
    },
    {
        codigo: "13113",
        nombre: "La Reina",
        codigo_padre: "131"
    },
    {
        codigo: "04101",
        nombre: "La Serena",
        codigo_padre: "041"
    },
    {
        codigo: "14201",
        nombre: "La Unión",
        codigo_padre: "142"
    },
    {
        codigo: "14203",
        nombre: "Lago Ranco",
        codigo_padre: "142"
    },
    {
        codigo: "11102",
        nombre: "Lago Verde",
        codigo_padre: "111"
    },
    {
        codigo: "12102",
        nombre: "Laguna Blanca",
        codigo_padre: "121"
    },
    {
        codigo: "08304",
        nombre: "Laja",
        codigo_padre: "083"
    },
    {
        codigo: "13302",
        nombre: "Lampa",
        codigo_padre: "133"
    },
    {
        codigo: "14103",
        nombre: "Lanco",
        codigo_padre: "141"
    },
    {
        codigo: "06107",
        nombre: "Las Cabras",
        codigo_padre: "061"
    },
    {
        codigo: "13114",
        nombre: "Las Condes",
        codigo_padre: "131"
    },
    {
        codigo: "09108",
        nombre: "Lautaro",
        codigo_padre: "091"
    },
    {
        codigo: "08201",
        nombre: "Lebu",
        codigo_padre: "082"
    },
    {
        codigo: "07303",
        nombre: "Licantén",
        codigo_padre: "073"
    },
    {
        codigo: "05802",
        nombre: "Limache",
        codigo_padre: "058"
    },
    {
        codigo: "07401",
        nombre: "Linares",
        codigo_padre: "074"
    },
    {
        codigo: "06203",
        nombre: "Litueche",
        codigo_padre: "062"
    },
    {
        codigo: "05703",
        nombre: "Llaillay",
        codigo_padre: "057"
    },
    {
        codigo: "10107",
        nombre: "Llanquihue",
        codigo_padre: "101"
    },
    {
        codigo: "13115",
        nombre: "Lo Barnechea",
        codigo_padre: "131"
    },
    {
        codigo: "13116",
        nombre: "Lo Espejo",
        codigo_padre: "131"
    },
    {
        codigo: "13117",
        nombre: "Lo Prado",
        codigo_padre: "131"
    },
    {
        codigo: "06304",
        nombre: "Lolol",
        codigo_padre: "063"
    },
    {
        codigo: "09109",
        nombre: "Loncoche",
        codigo_padre: "091"
    },
    {
        codigo: "07403",
        nombre: "Longaví",
        codigo_padre: "074"
    },
    {
        codigo: "09205",
        nombre: "Lonquimay",
        codigo_padre: "092"
    },
    {
        codigo: "08206",
        nombre: "Los Álamos",
        codigo_padre: "082"
    },
    {
        codigo: "05301",
        nombre: "Los Andes",
        codigo_padre: "053"
    },
    {
        codigo: "08301",
        nombre: "Los Ángeles",
        codigo_padre: "083"
    },
    {
        codigo: "14104",
        nombre: "Los Lagos",
        codigo_padre: "141"
    },
    {
        codigo: "10106",
        nombre: "Los Muermos",
        codigo_padre: "101"
    },
    {
        codigo: "09206",
        nombre: "Los Sauces",
        codigo_padre: "092"
    },
    {
        codigo: "04203",
        nombre: "Los Vilos",
        codigo_padre: "042"
    },
    {
        codigo: "08106",
        nombre: "Lota",
        codigo_padre: "081"
    },
    {
        codigo: "09207",
        nombre: "Lumaco",
        codigo_padre: "092"
    },
    {
        codigo: "06108",
        nombre: "Machalí",
        codigo_padre: "061"
    },
    {
        codigo: "13118",
        nombre: "Macul",
        codigo_padre: "131"
    },
    {
        codigo: "14105",
        nombre: "Máfil",
        codigo_padre: "141"
    },
    {
        codigo: "13119",
        nombre: "Maipú",
        codigo_padre: "131"
    },
    {
        codigo: "06109",
        nombre: "Malloa",
        codigo_padre: "061"
    },
    {
        codigo: "06204",
        nombre: "Marchihue",
        codigo_padre: "062"
    },
    {
        codigo: "02302",
        nombre: "María Elena",
        codigo_padre: "023"
    },
    {
        codigo: "13504",
        nombre: "María Pinto",
        codigo_padre: "135"
    },
    {
        codigo: "14106",
        nombre: "Mariquina",
        codigo_padre: "141"
    },
    {
        codigo: "07105",
        nombre: "Maule",
        codigo_padre: "071"
    },
    {
        codigo: "10108",
        nombre: "Maullín",
        codigo_padre: "101"
    },
    {
        codigo: "02102",
        nombre: "Mejillones",
        codigo_padre: "021"
    },
    {
        codigo: "09110",
        nombre: "Melipeuco",
        codigo_padre: "091"
    },
    {
        codigo: "13501",
        nombre: "Melipilla",
        codigo_padre: "135"
    },
    {
        codigo: "07304",
        nombre: "Molina",
        codigo_padre: "073"
    },
    {
        codigo: "04303",
        nombre: "Monte Patria",
        codigo_padre: "043"
    },
    {
        codigo: "06110",
        nombre: "Mostazal",
        codigo_padre: "061"
    },
    {
        codigo: "08305",
        nombre: "Mulchén",
        codigo_padre: "083"
    },
    {
        codigo: "08306",
        nombre: "Nacimiento",
        codigo_padre: "083"
    },
    {
        codigo: "06305",
        nombre: "Nancagua",
        codigo_padre: "063"
    },
    {
        codigo: "12401",
        nombre: "Natales",
        codigo_padre: "124"
    },
    {
        codigo: "06205",
        nombre: "Navidad",
        codigo_padre: "062"
    },
    {
        codigo: "08307",
        nombre: "Negrete",
        codigo_padre: "083"
    },
    {
        codigo: "16204",
        nombre: "Ninhue",
        codigo_padre: "162"
    },
    {
        codigo: "16303",
        nombre: "Ñiquén",
        codigo_padre: "163"
    },
    {
        codigo: "05506",
        nombre: "Nogales",
        codigo_padre: "055"
    },
    {
        codigo: "09111",
        nombre: "Nueva Imperial",
        codigo_padre: "091"
    },
    {
        codigo: "13120",
        nombre: "Ñuñoa",
        codigo_padre: "131"
    },
    {
        codigo: "06111",
        nombre: "Olivar",
        codigo_padre: "061"
    },
    {
        codigo: "02202",
        nombre: "Ollagüe",
        codigo_padre: "022"
    },
    {
        codigo: "05803",
        nombre: "Olmué",
        codigo_padre: "058"
    },
    {
        codigo: "10301",
        nombre: "Osorno",
        codigo_padre: "103"
    },
    {
        codigo: "04301",
        nombre: "Ovalle",
        codigo_padre: "043"
    },
    {
        codigo: "11302",
        nombre: "O’Higgins",
        codigo_padre: "113"
    },
    {
        codigo: "13604",
        nombre: "Padre Hurtado",
        codigo_padre: "136"
    },
    {
        codigo: "09112",
        nombre: "Padre las Casas",
        codigo_padre: "091"
    },
    {
        codigo: "04105",
        nombre: "Paiguano",
        codigo_padre: "041"
    },
    {
        codigo: "14107",
        nombre: "Paillaco",
        codigo_padre: "141"
    },
    {
        codigo: "13404",
        nombre: "Paine",
        codigo_padre: "134"
    },
    {
        codigo: "10404",
        nombre: "Palena",
        codigo_padre: "104"
    },
    {
        codigo: "06306",
        nombre: "Palmilla",
        codigo_padre: "063"
    },
    {
        codigo: "14108",
        nombre: "Panguipulli",
        codigo_padre: "141"
    },
    {
        codigo: "05704",
        nombre: "Panquehue",
        codigo_padre: "057"
    },
    {
        codigo: "05403",
        nombre: "Papudo",
        codigo_padre: "054"
    },
    {
        codigo: "06206",
        nombre: "Paredones",
        codigo_padre: "062"
    },
    {
        codigo: "07404",
        nombre: "Parral",
        codigo_padre: "074"
    },
    {
        codigo: "13121",
        nombre: "Pedro Aguirre Cerda",
        codigo_padre: "131"
    },
    {
        codigo: "07106",
        nombre: "Pelarco",
        codigo_padre: "071"
    },
    {
        codigo: "07203",
        nombre: "Pelluhue",
        codigo_padre: "072"
    },
    {
        codigo: "16105",
        nombre: "Pemuco",
        codigo_padre: "161"
    },
    {
        codigo: "13605",
        nombre: "Peñaflor",
        codigo_padre: "136"
    },
    {
        codigo: "13122",
        nombre: "Peñalolén",
        codigo_padre: "131"
    },
    {
        codigo: "07107",
        nombre: "Pencahue",
        codigo_padre: "071"
    },
    {
        codigo: "08107",
        nombre: "Penco",
        codigo_padre: "081"
    },
    {
        codigo: "06307",
        nombre: "Peralillo",
        codigo_padre: "063"
    },
    {
        codigo: "09113",
        nombre: "Perquenco",
        codigo_padre: "091"
    },
    {
        codigo: "05404",
        nombre: "Petorca",
        codigo_padre: "054"
    },
    {
        codigo: "06112",
        nombre: "Peumo",
        codigo_padre: "061"
    },
    {
        codigo: "01405",
        nombre: "Pica",
        codigo_padre: "014"
    },
    {
        codigo: "06113",
        nombre: "Pichidegua",
        codigo_padre: "061"
    },
    {
        codigo: "06201",
        nombre: "Pichilemu",
        codigo_padre: "062"
    },
    {
        codigo: "16106",
        nombre: "Pinto",
        codigo_padre: "161"
    },
    {
        codigo: "13202",
        nombre: "Pirque",
        codigo_padre: "132"
    },
    {
        codigo: "09114",
        nombre: "Pitrufquén",
        codigo_padre: "091"
    },
    {
        codigo: "06308",
        nombre: "Placilla",
        codigo_padre: "063"
    },
    {
        codigo: "16205",
        nombre: "Portezuelo",
        codigo_padre: "162"
    },
    {
        codigo: "12301",
        nombre: "Porvenir",
        codigo_padre: "123"
    },
    {
        codigo: "01401",
        nombre: "Pozo Almonte",
        codigo_padre: "014"
    },
    {
        codigo: "12302",
        nombre: "Primavera",
        codigo_padre: "123"
    },
    {
        codigo: "13123",
        nombre: "Providencia",
        codigo_padre: "131"
    },
    {
        codigo: "05105",
        nombre: "Puchuncaví",
        codigo_padre: "051"
    },
    {
        codigo: "09115",
        nombre: "Pucón",
        codigo_padre: "091"
    },
    {
        codigo: "13124",
        nombre: "Pudahuel",
        codigo_padre: "131"
    },
    {
        codigo: "13201",
        nombre: "Puente Alto",
        codigo_padre: "132"
    },
    {
        codigo: "10101",
        nombre: "Puerto Montt",
        codigo_padre: "101"
    },
    {
        codigo: "10302",
        nombre: "Puerto Octay",
        codigo_padre: "103"
    },
    {
        codigo: "10109",
        nombre: "Puerto Varas",
        codigo_padre: "101"
    },
    {
        codigo: "06309",
        nombre: "Pumanque",
        codigo_padre: "063"
    },
    {
        codigo: "04304",
        nombre: "Punitaqui",
        codigo_padre: "043"
    },
    {
        codigo: "12101",
        nombre: "Punta Arenas",
        codigo_padre: "121"
    },
    {
        codigo: "10206",
        nombre: "Puqueldón",
        codigo_padre: "102"
    },
    {
        codigo: "09208",
        nombre: "Purén",
        codigo_padre: "092"
    },
    {
        codigo: "10303",
        nombre: "Purranque",
        codigo_padre: "103"
    },
    {
        codigo: "05705",
        nombre: "Putaendo",
        codigo_padre: "057"
    },
    {
        codigo: "15201",
        nombre: "Putre",
        codigo_padre: "152"
    },
    {
        codigo: "10304",
        nombre: "Puyehue",
        codigo_padre: "103"
    },
    {
        codigo: "10207",
        nombre: "Queilén",
        codigo_padre: "102"
    },
    {
        codigo: "10208",
        nombre: "Quellón",
        codigo_padre: "102"
    },
    {
        codigo: "10209",
        nombre: "Quemchi",
        codigo_padre: "102"
    },
    {
        codigo: "08308",
        nombre: "Quilaco",
        codigo_padre: "083"
    },
    {
        codigo: "13125",
        nombre: "Quilicura",
        codigo_padre: "131"
    },
    {
        codigo: "08309",
        nombre: "Quilleco",
        codigo_padre: "083"
    },
    {
        codigo: "16107",
        nombre: "Quillón",
        codigo_padre: "161"
    },
    {
        codigo: "05501",
        nombre: "Quillota",
        codigo_padre: "055"
    },
    {
        codigo: "05801",
        nombre: "Quilpué",
        codigo_padre: "058"
    },
    {
        codigo: "10210",
        nombre: "Quinchao",
        codigo_padre: "102"
    },
    {
        codigo: "06114",
        nombre: "Quinta de Tilcoco",
        codigo_padre: "061"
    },
    {
        codigo: "13126",
        nombre: "Quinta Normal",
        codigo_padre: "131"
    },
    {
        codigo: "05107",
        nombre: "Quintero",
        codigo_padre: "051"
    },
    {
        codigo: "16201",
        nombre: "Quirihue",
        codigo_padre: "162"
    },
    {
        codigo: "06101",
        nombre: "Rancagua",
        codigo_padre: "061"
    },
    {
        codigo: "16206",
        nombre: "Ránquil",
        codigo_padre: "162"
    },
    {
        codigo: "07305",
        nombre: "Rauco",
        codigo_padre: "073"
    },
    {
        codigo: "13127",
        nombre: "Recoleta",
        codigo_padre: "131"
    },
    {
        codigo: "09209",
        nombre: "Renaico",
        codigo_padre: "092"
    },
    {
        codigo: "13128",
        nombre: "Renca",
        codigo_padre: "131"
    },
    {
        codigo: "06115",
        nombre: "Rengo",
        codigo_padre: "061"
    },
    {
        codigo: "06116",
        nombre: "Requínoa",
        codigo_padre: "061"
    },
    {
        codigo: "07405",
        nombre: "Retiro",
        codigo_padre: "074"
    },
    {
        codigo: "05303",
        nombre: "Rinconada",
        codigo_padre: "053"
    },
    {
        codigo: "14204",
        nombre: "Río Bueno",
        codigo_padre: "142"
    },
    {
        codigo: "07108",
        nombre: "Río Claro",
        codigo_padre: "071"
    },
    {
        codigo: "04305",
        nombre: "Río Hurtado",
        codigo_padre: "043"
    },
    {
        codigo: "11402",
        nombre: "Río Ibáñez",
        codigo_padre: "114"
    },
    {
        codigo: "10305",
        nombre: "Río Negro",
        codigo_padre: "103"
    },
    {
        codigo: "12103",
        nombre: "Río Verde",
        codigo_padre: "121"
    },
    {
        codigo: "07306",
        nombre: "Romeral",
        codigo_padre: "073"
    },
    {
        codigo: "09116",
        nombre: "Saavedra",
        codigo_padre: "091"
    },
    {
        codigo: "07307",
        nombre: "Sagrada Familia",
        codigo_padre: "073"
    },
    {
        codigo: "04204",
        nombre: "Salamanca",
        codigo_padre: "042"
    },
    {
        codigo: "05601",
        nombre: "San Antonio",
        codigo_padre: "056"
    },
    {
        codigo: "13401",
        nombre: "San Bernardo",
        codigo_padre: "134"
    },
    {
        codigo: "16301",
        nombre: "San Carlos",
        codigo_padre: "163"
    },
    {
        codigo: "07109",
        nombre: "San Clemente",
        codigo_padre: "071"
    },
    {
        codigo: "05304",
        nombre: "San Esteban",
        codigo_padre: "053"
    },
    {
        codigo: "16304",
        nombre: "San Fabián",
        codigo_padre: "163"
    },
    {
        codigo: "05701",
        nombre: "San Felipe",
        codigo_padre: "057"
    },
    {
        codigo: "06301",
        nombre: "San Fernando",
        codigo_padre: "063"
    },
    {
        codigo: "12104",
        nombre: "San Gregorio",
        codigo_padre: "121"
    },
    {
        codigo: "16108",
        nombre: "San Ignacio",
        codigo_padre: "161"
    },
    {
        codigo: "07406",
        nombre: "San Javier",
        codigo_padre: "074"
    },
    {
        codigo: "13129",
        nombre: "San Joaquín",
        codigo_padre: "131"
    },
    {
        codigo: "13203",
        nombre: "San José de Maipo",
        codigo_padre: "132"
    },
    {
        codigo: "10306",
        nombre: "San Juan de la Costa",
        codigo_padre: "103"
    },
    {
        codigo: "13130",
        nombre: "San Miguel",
        codigo_padre: "131"
    },
    {
        codigo: "16305",
        nombre: "San Nicolás",
        codigo_padre: "163"
    },
    {
        codigo: "10307",
        nombre: "San Pablo",
        codigo_padre: "103"
    },
    {
        codigo: "13505",
        nombre: "San Pedro",
        codigo_padre: "135"
    },
    {
        codigo: "02203",
        nombre: "San Pedro de Atacama",
        codigo_padre: "022"
    },
    {
        codigo: "08108",
        nombre: "San Pedro de la Paz",
        codigo_padre: "081"
    },
    {
        codigo: "07110",
        nombre: "San Rafael",
        codigo_padre: "071"
    },
    {
        codigo: "13131",
        nombre: "San Ramón",
        codigo_padre: "131"
    },
    {
        codigo: "08310",
        nombre: "San Rosendo",
        codigo_padre: "083"
    },
    {
        codigo: "06117",
        nombre: "San Vicente",
        codigo_padre: "061"
    },
    {
        codigo: "08311",
        nombre: "Santa Bárbara",
        codigo_padre: "083"
    },
    {
        codigo: "06310",
        nombre: "Santa Cruz",
        codigo_padre: "063"
    },
    {
        codigo: "08109",
        nombre: "Santa Juana",
        codigo_padre: "081"
    },
    {
        codigo: "05706",
        nombre: "Santa María",
        codigo_padre: "057"
    },
    {
        codigo: "13101",
        nombre: "Santiago Centro",
        codigo_padre: "131"
    },
    {
        codigo: "05606",
        nombre: "Santo Domingo",
        codigo_padre: "056"
    },
    {
        codigo: "02103",
        nombre: "Sierra Gorda",
        codigo_padre: "021"
    },
    {
        codigo: "13601",
        nombre: "Talagante",
        codigo_padre: "136"
    },
    {
        codigo: "07101",
        nombre: "Talca",
        codigo_padre: "071"
    },
    {
        codigo: "08110",
        nombre: "Talcahuano",
        codigo_padre: "081"
    },
    {
        codigo: "02104",
        nombre: "Taltal",
        codigo_padre: "021"
    },
    {
        codigo: "09101",
        nombre: "Temuco",
        codigo_padre: "091"
    },
    {
        codigo: "07308",
        nombre: "Teno",
        codigo_padre: "073"
    },
    {
        codigo: "09117",
        nombre: "Teodoro Schmidt",
        codigo_padre: "091"
    },
    {
        codigo: "03103",
        nombre: "Tierra Amarilla",
        codigo_padre: "031"
    },
    {
        codigo: "13303",
        nombre: "Tiltil",
        codigo_padre: "133"
    },
    {
        codigo: "12303",
        nombre: "Timaukel",
        codigo_padre: "123"
    },
    {
        codigo: "08207",
        nombre: "Tirúa",
        codigo_padre: "082"
    },
    {
        codigo: "02301",
        nombre: "Tocopilla",
        codigo_padre: "023"
    },
    {
        codigo: "09118",
        nombre: "Toltén",
        codigo_padre: "091"
    },
    {
        codigo: "08111",
        nombre: "Tomé",
        codigo_padre: "081"
    },
    {
        codigo: "12402",
        nombre: "Torres del Paine",
        codigo_padre: "124"
    },
    {
        codigo: "11303",
        nombre: "Tortel",
        codigo_padre: "113"
    },
    {
        codigo: "09210",
        nombre: "Traiguén",
        codigo_padre: "092"
    },
    {
        codigo: "16207",
        nombre: "Treguaco",
        codigo_padre: "162"
    },
    {
        codigo: "08312",
        nombre: "Tucapel",
        codigo_padre: "083"
    },
    {
        codigo: "14101",
        nombre: "Valdivia",
        codigo_padre: "141"
    },
    {
        codigo: "03301",
        nombre: "Vallenar",
        codigo_padre: "033"
    },
    {
        codigo: "05101",
        nombre: "Valparaíso",
        codigo_padre: "051"
    },
    {
        codigo: "07309",
        nombre: "Vichuquén",
        codigo_padre: "073"
    },
    {
        codigo: "09211",
        nombre: "Victoria",
        codigo_padre: "092"
    },
    {
        codigo: "04106",
        nombre: "Vicuña",
        codigo_padre: "041"
    },
    {
        codigo: "09119",
        nombre: "Vilcún",
        codigo_padre: "091"
    },
    {
        codigo: "07407",
        nombre: "Villa Alegre",
        codigo_padre: "074"
    },
    {
        codigo: "05804",
        nombre: "Villa Alemana",
        codigo_padre: "058"
    },
    {
        codigo: "09120",
        nombre: "Villarrica",
        codigo_padre: "091"
    },
    {
        codigo: "05109",
        nombre: "Viña del Mar",
        codigo_padre: "051"
    },
    {
        codigo: "13132",
        nombre: "Vitacura",
        codigo_padre: "131"
    },
    {
        codigo: "07408",
        nombre: "Yerbas Buenas",
        codigo_padre: "074"
    },
    {
        codigo: "08313",
        nombre: "Yumbel",
        codigo_padre: "083"
    },
    {
        codigo: "16109",
        nombre: "Yungay",
        codigo_padre: "161"
    },
    {
        codigo: "05405",
        nombre: "Zapallar",
        codigo_padre: "054"
    }
]

export {
    regiones,
    provincias,
    comunas
}