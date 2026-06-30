// Geocoded location data for Empresa Plana routes.
// Coordinates are approximate town centers (WGS84).
// Source: Catalan municipal geography (IDESCAT / OpenStreetMap).

export type LocationType =
  | "city"
  | "town"
  | "airport"
  | "station"
  | "port"
  | "resort"
  | "industrial"
  | "education"
  | "village";

export interface GeoLocation {
  id: string;
  name: string;
  comarca: string;
  region: string;
  lat: number;
  lng: number;
  type: LocationType;
}

// Helper to build a location entry concisely.
function L(
  id: string,
  name: string,
  comarca: string,
  region: string,
  lat: number,
  lng: number,
  type: LocationType = "town"
): GeoLocation {
  return { id, name, comarca, region, lat, lng, type };
}

export const LOCATIONS: GeoLocation[] = [
  // ===== Airports =====
  L("aeroport-barcelona", "Aeroport de Barcelona - El Prat de Llobregat", "Barcelonès", "Barcelona", 41.2974, 2.0833, "airport"),
  L("aeroport-reus", "Aeroport de Reus", "Baix Camp", "Tarragona", 41.1473, 1.1671, "airport"),

  // ===== Tarragonès =====
  L("tarragona", "Tarragona", "Tarragonès", "Tarragona", 41.1189, 1.2445, "city"),
  L("salou", "Salou", "Tarragonès", "Tarragona", 41.0766, 1.0131, "town"),
  L("vila-seca", "Vila-seca", "Tarragonès", "Tarragona", 41.1156, 1.1476),
  L("la-pineda", "La Pineda", "Tarragonès", "Tarragona", 41.0819, 1.1708, "resort"),
  L("portaventura", "PortAventura", "Tarragonès", "Tarragona", 41.0866, 1.1553, "resort"),
  L("portaventura-admin", "PortAventura (Administración)", "Tarragonès", "Tarragona", 41.0850, 1.1520, "resort"),
  L("cambrils", "Cambrils", "Baix Camp", "Tarragona", 41.0744, 1.0583, "town"),
  L("constantí", "Constantí", "Tarragonès", "Tarragona", 41.1481, 1.2153),
  L("el-morell", "El Morell", "Tarragonès", "Tarragona", 41.1647, 1.2189),
  L("la-pobla-de-mafumet", "La Pobla de Mafumet", "Tarragonès", "Tarragona", 41.1814, 1.2300),
  L("perafort", "Perafort", "Tarragonès", "Tarragona", 41.1836, 1.1886),
  L("la-secuita", "La Secuita", "Tarragonès", "Tarragona", 41.1817, 1.2589),
  L("el-catllar", "El Catllar", "Tarragonès", "Tarragona", 41.1208, 1.3153),
  L("la-riba", "La Riba", "Tarragonès", "Tarragona", 41.0864, 1.3589),
  L("la-nou-de-gaia", "La Nou de Gaià", "Tarragonès", "Tarragona", 41.1225, 1.3139),
  L("la-riera-de-gaia", "La Riera de Gaià", "Tarragonès", "Tarragona", 41.1089, 1.2942),
  L("vespella-de-gaia", "Vespella de Gaià", "Tarragonès", "Tarragona", 41.0939, 1.3381),
  L("torredembarra", "Torredembarra", "Tarragonès", "Tarragona", 41.1453, 1.3978, "town"),
  L("altafulla", "Altafulla", "Tarragonès", "Tarragona", 41.1378, 1.3386),
  L("estacio-del-camp", "Estació del Camp", "Tarragonès", "Tarragona", 41.1689, 1.2264, "station"),
  L("complex-educatiu-tarragona", "Complex Educatiu de Tarragona", "Tarragonès", "Tarragona", 41.1230, 1.2600, "education"),
  L("poligon-riu-clar", "Polígon Industrial de Riu Clar-Tarragona", "Tarragonès", "Tarragona", 41.1350, 1.2310, "industrial"),
  L("poligon-constantí", "Polígono Industrial de Constantí", "Tarragonès", "Tarragona", 41.1530, 1.2090, "industrial"),

  // ===== Alt Camp =====
  L("valls", "Valls", "Alt Camp", "Tarragona", 41.2864, 1.2547, "city"),
  L("alcover", "Alcover", "Alt Camp", "Tarragona", 41.2611, 1.1736),
  L("pla-de-santa-maria", "El Pla de Santa Maria", "Alt Camp", "Tarragona", 41.2972, 1.2308),
  L("cabra-del-camp", "Cabra del Camp", "Alt Camp", "Tarragona", 41.3272, 1.2511),
  L("figuerola-del-camp", "Figuerola del Camp", "Alt Camp", "Tarragona", 41.3008, 1.2150),
  L("la-maso", "La Masó", "Alt Camp", "Tarragona", 41.2761, 1.2183),
  L("el-rourell", "El Rourell", "Alt Camp", "Tarragona", 41.2603, 1.1928),
  L("nulles", "Nulles", "Alt Camp", "Tarragona", 41.2547, 1.2872),
  L("bràfim", "Bràfim", "Alt Camp", "Tarragona", 41.2631, 1.2969),
  L("alió", "Alió", "Alt Camp", "Tarragona", 41.2903, 1.3036),
  L("vilabella", "Vilabella", "Alt Camp", "Tarragona", 41.2739, 1.3253),
  L("puigdelfi", "Puigdelfi", "Alt Camp", "Tarragona", 41.2825, 1.3369),
  L("rodonyà", "Rodonyà", "Alt Camp", "Tarragona", 41.2725, 1.3492),
  L("el-milà", "El Milà", "Alt Camp", "Tarragona", 41.2853, 1.2825),
  L("el-pont-darmentera", "El Pont d'Armentera", "Alt Camp", "Tarragona", 41.3325, 1.2967),
  L("els-garidells", "Els Garidells", "Alt Camp", "Tarragona", 41.2897, 1.2914),
  L("aiguamúrcia", "Aiguamúrcia", "Alt Camp", "Tarragona", 41.3378, 1.3250),
  L("santes-creus", "Santes Creus", "Alt Camp", "Tarragona", 41.3342, 1.3067),
  L("ferran", "Ferran", "Alt Camp", "Tarragona", 41.3219, 1.2694),
  L("poligon-valls", "Polígon Industrial de Valls", "Alt Camp", "Tarragona", 41.3000, 1.2700, "industrial"),

  // ===== Baix Camp =====
  L("reus", "Reus", "Baix Camp", "Tarragona", 41.1561, 1.1069, "city"),
  L("mont-roig-del-camp", "Mont-roig del Camp", "Baix Camp", "Tarragona", 41.0500, 0.9486),
  L("les-borges-del-camp", "Les Borges del Camp", "Baix Camp", "Tarragona", 41.1247, 1.0461),
  L("riudoms", "Riudoms", "Baix Camp", "Tarragona", 41.1306, 1.0542),
  L("maspujols", "Maspujols", "Baix Camp", "Tarragona", 41.1411, 1.0714),
  L("castellvell-del-camp", "Castellvell del Camp", "Baix Camp", "Tarragona", 41.1425, 1.0875),
  L("almoster", "Almoster", "Baix Camp", "Tarragona", 41.1600, 1.0689),
  L("laleixar", "L'Aleixar", "Baix Camp", "Tarragona", 41.1858, 1.0558),
  L("alforja", "Alforja", "Baix Camp", "Tarragona", 41.2208, 1.0164),
  L("les-gunyoles", "Les Gunyoles", "Alt Camp", "Tarragona", 41.2439, 1.1706),
  L("duescanyes", "Duescanyes", "Baix Camp", "Tarragona", 41.2025, 1.0475),
  L("colldejou", "Colldejou", "Baix Camp", "Tarragona", 41.1528, 0.9539),
  L("prades", "Prades", "Baix Camp", "Tarragona", 41.2950, 0.8894),
  L("capafons", "Capafons", "Baix Camp", "Tarragona", 41.2417, 0.9481),
  L("vilaplana", "Vilaplana", "Baix Camp", "Tarragona", 41.2486, 1.0242),
  L("la-febro", "La Febró", "Baix Camp", "Tarragona", 41.2733, 0.9672),
  L("vilaverd", "Vilaverd", "Baix Camp", "Tarragona", 41.3067, 1.0911),
  L("montbrio-del-camp", "Montbrió del Camp", "Baix Camp", "Tarragona", 41.0908, 1.0056),
  L("masboquera", "Masboquera", "Baix Camp", "Tarragona", 41.0808, 0.9911),
  L("botarell", "Botarell", "Baix Camp", "Tarragona", 41.0833, 1.0208),
  L("riudoms-2", "Masriudoms", "Baix Camp", "Tarragona", 41.1086, 1.0322),
  L("salomo", "Salomó", "Baix Camp", "Tarragona", 41.1289, 1.2967),
  L("vilallonga-del-camp", "Vilallonga del Camp", "Tarragonès", "Tarragona", 41.1986, 1.2375),
  L("bonavista", "Bonavista", "Tarragonès", "Tarragona", 41.1600, 1.2014),
  L("les-roquetes", "Les Roquetes", "Tarragonès", "Tarragona", 41.1150, 1.1450),
  L("vilafortuny", "Vilafortuny", "Baix Camp", "Tarragona", 41.0619, 1.0486),
  L("masriudoms", "Masriudoms", "Baix Camp", "Tarragona", 41.1086, 1.0322),

  // ===== Baix Penedès / Garraf =====
  L("vilafranca-del-penedes", "Vilafranca del Penedès", "Alt Penedès", "Barcelona", 41.3464, 1.6979, "city"),
  L("vilanova-i-la-geltru", "Vilanova i la Geltrú", "Garraf", "Barcelona", 41.2240, 1.7257, "city"),
  L("sitges", "Sitges", "Garraf", "Barcelona", 41.2370, 1.8059, "town"),
  L("cubelles", "Cubelles", "Garraf", "Barcelona", 41.2072, 1.6758),
  L("cunit", "Cunit", "Baix Penedès", "Tarragona", 41.1942, 1.6342),
  L("canyelles", "Canyelles", "Garraf", "Barcelona", 41.2925, 1.7108),
  L("olivella", "Olivella", "Garraf", "Barcelona", 41.2764, 1.7617),
  L("sant-pere-de-ribes", "Sant Pere de Ribes", "Garraf", "Barcelona", 41.2606, 1.7336),
  L("olèrdola", "Olèrdola", "Alt Penedès", "Barcelona", 41.3306, 1.6697),

  // ===== Conca de Barberà =====
  L("montblanc", "Montblanc", "Conca de Barberà", "Tarragona", 41.3763, 1.1645, "town"),
  L("lespluga-de-francoli", "L'Espluga de Francolí", "Conca de Barberà", "Tarragona", 41.4058, 1.0950),
  L("vimbodí", "Vimbodí", "Conca de Barberà", "Tarragona", 41.4136, 1.0728),
  L("pobleda", "Poboleda", "Priorat", "Tarragona", 41.4183, 1.0947),
  L("sarral", "Sarral", "Conca de Barberà", "Tarragona", 41.4025, 1.1406),
  L("pira", "Pira", "Conca de Barberà", "Tarragona", 41.3878, 1.1575),
  L("barbera-de-la-conca", "Barberà de la Conca", "Conca de Barberà", "Tarragona", 41.4264, 1.1156),
  L("vilanova-de-prades", "Vilanova de Prades", "Conca de Barberà", "Tarragona", 41.4236, 1.0286),
  L("l-espluga", "L'Espluga de Francolí", "Conca de Barberà", "Tarragona", 41.4058, 1.0950),

  // ===== Priorat =====
  L("falset", "Falset", "Priorat", "Tarragona", 41.4578, 0.8236),
  L("cornudella-de-montsant", "Cornudella de Montsant", "Priorat", "Tarragona", 41.3675, 0.9508),
  L("la-morera-del-montsant", "La Morera del Montsant", "Priorat", "Tarragona", 41.3458, 0.9153),
  L("escaladei", "Escaladei", "Priorat", "Tarragona", 41.3539, 0.8947),
  L("la-vilella-alta", "La Vilella Alta", "Priorat", "Tarragona", 41.4153, 0.8469),
  L("la-vilella-baixa", "La Vilella Baixa", "Priorat", "Tarragona", 41.4256, 0.8472),
  L("poboleda-2", "Poboleda", "Priorat", "Tarragona", 41.4183, 1.0947),
  L("cabacés", "Cabacés", "Priorat", "Tarragona", 41.3897, 0.7700),
  L("la-bisbal-de-falset", "La Bisbal de Falset", "Priorat", "Tarragona", 41.4608, 0.7847),
  L("margalef", "Margalef", "Priorat", "Tarragona", 41.4383, 0.8208),
  L("ulldemolins", "Ulldemolins", "Priorat", "Tarragona", 41.4028, 0.8528),
  L("albarca", "Albarca", "Priorat", "Tarragona", 41.3819, 0.8928),
  L("prades-2", "Prades", "Baix Camp", "Tarragona", 41.2950, 0.8894),

  // ===== Ribera d'Ebre =====
  L("mora-debre", "Móra d'Ebre", "Ribera d'Ebre", "Tarragona", 41.0906, 0.6417, "town"),
  L("mora-la-nova", "Móra la Nova", "Ribera d'Ebre", "Tarragona", 41.0831, 0.6286, "town"),
  L("ascó", "Ascó", "Ribera d'Ebre", "Tarragona", 41.2056, 0.5694),
  L("flix", "Flix", "Ribera d'Ebre", "Tarragona", 41.2317, 0.5489),
  L("riba-roja-debre", "Riba-roja d'Ebre", "Ribera d'Ebre", "Tarragona", 41.2556, 0.4836),
  L("garcia", "Garcia", "Ribera d'Ebre", "Tarragona", 41.1814, 0.5869),
  L("tivissa", "Tivissa", "Ribera d'Ebre", "Tarragona", 41.0439, 0.6389),
  L("la-palma-debre", "La Palma d'Ebre", "Ribera d'Ebre", "Tarragona", 41.3289, 0.5700),
  L("vinebre", "Vinebre", "Ribera d'Ebre", "Tarragona", 41.1547, 0.6075),
  L("miravet", "Miravet", "Ribera d'Ebre", "Tarragona", 41.1250, 0.6106),
  L("rasquera", "Rasquera", "Ribera d'Ebre", "Tarragona", 41.0797, 0.6081),
  L("el-lligallo-del-ganguil", "El Lligallo del Gànguil", "Ribera d'Ebre", "Tarragona", 41.0989, 0.6200),
  L("el-lligallo-del-roig", "El Lligallo del Roig", "Ribera d'Ebre", "Tarragona", 41.0850, 0.6150),

  // ===== Baix Ebre / Montsià =====
  L("tortosa", "Tortosa", "Baix Ebre", "Tarragona", 40.8126, 0.5216, "city"),
  L("lametlla-de-mar", "L'Ametlla de Mar", "Baix Ebre", "Tarragona", 40.9539, 0.8019),
  L("lampolla", "L'Ampolla", "Baix Ebre", "Tarragona", 40.8975, 0.7264),
  L("laldea", "L'Aldea", "Baix Ebre", "Tarragona", 40.8756, 0.6286),
  L("camarles", "Camarles", "Baix Ebre", "Tarragona", 40.8822, 0.6631),
  L("deltebre", "Deltebre", "Baix Ebre", "Tarragona", 40.8567, 0.7244),
  L("l-hospitalet-de-linfant", "l'Hospitalet de l'Infant", "Baix Camp", "Tarragona", 40.9906, 0.9225),
  L("vandellòs", "Vandellòs", "Baix Camp", "Tarragona", 40.9847, 0.9056),
  L("miami-platja", "Miami Platja", "Baix Camp", "Tarragona", 40.9744, 0.9028, "resort"),
  L("la-torre-de-lespanyol", "La Torre de l'Espanyol", "Ribera d'Ebre", "Tarragona", 41.2475, 0.5483),
  L("maials", "Maials", "Segrià", "Lleida", 41.4839, 0.5028),

  // ===== Barcelona area =====
  L("barcelona", "Barcelona", "Barcelonès", "Barcelona", 41.3851, 2.1734, "city"),
  L("lhospitalet-de-llobregat", "L'Hospitalet de Llobregat", "Barcelonès", "Barcelona", 41.3597, 2.1003, "city"),
  L("cerdanyola-del-valles", "Cerdanyola del Vallès", "Vallès Occidental", "Barcelona", 41.4992, 2.1400),
  L("igualada", "Igualada", "Anoia", "Barcelona", 41.5814, 1.6172, "city"),
  L("monistrol-de-montserrat", "Monistrol de Montserrat", "Bages", "Barcelona", 41.6069, 1.8361),
  L("querol", "Querol", "Alt Camp", "Tarragona", 41.4189, 1.3667),
  L("bellaguarda", "Bellaguarda", "Garrigues", "Lleida", 41.4000, 0.7389),
  L("la-granadella", "La Granadella", "Garrigues", "Lleida", 41.3922, 0.6253),
];

// Index for fast lookup by id.
export const LOCATION_MAP: Record<string, GeoLocation> = LOCATIONS.reduce(
  (acc, loc) => {
    acc[loc.id] = loc;
    return acc;
  },
  {} as Record<string, GeoLocation>
);

export function getLocation(id: string): GeoLocation | undefined {
  return LOCATION_MAP[id];
}

export function searchLocations(query: string, limit = 50): GeoLocation[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return LOCATIONS.slice(0, limit);
  }
  return LOCATIONS.filter(
    (l) =>
      l.name.toLowerCase().includes(q) ||
      l.comarca.toLowerCase().includes(q) ||
      l.region.toLowerCase().includes(q)
  ).slice(0, limit);
}

export const COMARCAS = Array.from(new Set(LOCATIONS.map((l) => l.comarca))).sort();
export const REGIONS = Array.from(new Set(LOCATIONS.map((l) => l.region))).sort();
