import { z } from 'zod';

const palabrasInapropiadas = [

  'puta', 'puto', 'pendejo', 'pendeja', 'cabrón', 'cabrona', 'mierda', 'joder', 'carajo', 'coño',
  'chinga', 'chingada', 'culero', 'culera', 'verga', 'vergudo', 'verguda', 'pinche', 'cagada',
  'cagar', 'cagón', 'cagona', 'se la come', 'gilipollas', 'estúpido', 'estúpida', 'idiota', 'imbécil', 'mamón',
  'mamona', 'marica', 'maricón', 'travesti', 'zorra', 'zorro', 'huevón', 'huevona', 'pelotudo',
  'pelotuda', 'imbécila', 'bobo', 'boba', 'gil', 'gila', 'gilazo', 'gilipolla',

  'p3nd3j0', 'p3nd3j4', 'pvto', 'c4br0n', 's3 l4 c0m3', 'c4br0n4', 'm13rd4', 'j0d3r', 'c4r4j0',
  'c0ñ0', 'ch1ng4', 'ch1ng4d4', 'cul3r0', 'cul3r4', 'v3rg4', 'v3rgud0', 'v3rgud4', 'p1nch3',
  'c4g4d4', 'c4g4r', 'c4g0n', 'c4g0n4', 'g1l1p0ll4s', '3stúp1d0', '3stúp1d4', '1d10t4',
  '1mbéc1l', 'm4m0n', 'm4m0n4', 'm4r1c4', 'm4r1c0n', 'tr4v3st1', 'z0rr4', 'z0rr0', 'hu3v0n',
  'hu3v0n4', 'p3l0tud0', 'p3l0tud4', '1mbéc1l4', 'b0b0', 'b0b4', 'g1l', 'g1l4', 'g1l4z0', 'g1l1p0ll4',

  'la concha de tu madre', 'andate a la mierda', 'hijo de puta', 'malparido', 'cagapalos',
  'cabrón de mierda', 'mamaguevo', 'hpta', 'pta', 'maldito', 'maldita', 'cornudo', 'cornuda',
  'cojud', 'pajero', 'boludo', 'boluda', 'petardo', 'baboso', 'babosa', 'wey', 'guanaco',
  'sucio', 'perra', 'perro', 'malnacido', 'sapo', 'putañero', 'maricueca', 'careculo',
  'careverga', 'culia', 'me vale verga', 'qué chucha', 'qué verga', 'chucha tu madre',
  'hueón', 'sopenco', 'cholo', 'grone', 'indio de mierda',

  'fuck', 'shit', 'bitch', 'bastard', 'asshole', 'dick', 'pussy', 'damn', 'crap', 'slut',
  'whore', 'prick', 'cunt', 'retard', 'motherfucker', 'cock', 'fag', 'douche', 'twat',
  'wanker', 'dickhead', 'scumbag', 'cocksucker', 'jackass', 'arsehole', 'bellend', 'bugger',

  'f*ck', 'sh*t', 'b*tch', 'b*stard', 'a*shole', 'd*ck', 'p*ssy', 'd*mn', 'cr*p', 'sl*t',
  'wh*re', 'pr*ck', 'c*nt', 'ret*rd', 'motherf*cker', 'c*ck', 'f*g', 'd*uche', 'tw*t',
  'w*nker', 'd*ckhead', 'sc*mbag', 'c*cksucker', 'j*ckass', 'arseh*le', 'bell*nd', 'b*gger',

  'jerk off', 'jerk it', 'jack off', 'blow job', 'bj', 'titty', 'tits', 'titties', 'nipple',
  'gangbang', 'rimjob', 'handjob', 'fucking her', 'doggystyle', 'rawdog', 'creampie',
  'eat her out', 'muff dive', 'snatch', 'boner', 'hard-on', 'wood', 'nut', 'bust a nut',
  'fuckboy', 'fuckgirl', 'bitchass', 'slutty', 'ho', 'hoe', 'skeet', 'bukkake', 'cum',
  'jizz', 'nutting',

  'nigger', 'chink', 'spic', 'kike', 'sandnigger', 'towelhead', 'wetback', 'gook', 'cracker',
  'redskin', 'faggot', 'tranny', 'retarded',

  'go to hell', 'eat shit', 'suck my dick', 'fuck you', 'fuck off', 'screw you', 'eat a dick',
  'kiss my ass', 'dumb fuck', 'stupid bitch', 'damn you', 'go fuck yourself', 'die bitch',
  'rot in hell', 'burn in hell', 'you piece of shit',

  'hdp', 'hijo de', 'concha', 'conchuda', 'conchudo', 'forro', 'forra',
  'pajero', 'pajera', 'pajear', 'pajazo', 'pajearse', 'pajearme',
  'gil', 'gila', 'gilazo', 'gilipolla', 'gilipollas',
  'boludo', 'boluda', 'boludez', 'boludeces',
  'pelotudo', 'pelotuda', 'pelotudez', 'pelotudeces',
  'huevón', 'huevona', 'weón', 'weona', 'güevón', 'güevona', 'guevón', 'guevona'
];

const palabrasInapropiadasSet = new Set(palabrasInapropiadas);

const contieneContenidoInapropiado = (texto: string): boolean => {
  if (!texto || typeof texto !== 'string') return false;

  const normalizado = texto
    .normalize('NFKC')
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  return Array.from(palabrasInapropiadasSet).some(palabra =>
    normalizado.includes(palabra.toLowerCase())
  );
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/i;
const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/.+/i;
const behanceRegex = /^(https?:\/\/)?(www\.)?behance\.net\/.+/i;
const phoneRegex = /^((\+?\d{1,3})?[-\s]?\(?\d{2,4}\)?[-\s]?\d{3,4}[-\s]?\d{3,4})$/;

const validateInappropriateContent = (value: string | undefined) => {
  if (!value) return true;
  return !contieneContenidoInapropiado(value);
};

export const entryFormSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo es obligatorio')
    .trim()
    .regex(emailRegex, 'Correo inválido')
    .max(100, 'El correo es demasiado largo')
    .refine(validateInappropriateContent, 'Contenido no permitido'),

  age: z
    .coerce.number()
    .int('Debe ser un número entero')
    .min(18, 'Debés tener al menos 18 años')
    .max(100, 'Edad no válida'),

  firstName: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .trim()
    .min(2, 'El nombre es muy corto')
    .max(50, 'El nombre es muy largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-]+$/, 'Solo letras, espacios y guiones permitidos')
    .refine(validateInappropriateContent, 'Contenido no permitido'),

  lastName: z
    .string()
    .min(1, 'El apellido es obligatorio')
    .trim()
    .min(2, 'El apellido es muy corto')
    .max(50, 'El apellido es muy largo')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-]+$/, 'Solo letras, espacios y guiones permitidos')
    .refine(validateInappropriateContent, 'Contenido no permitido'),

  phone: z
    .string()
    .min(1, 'El número de celular es obligatorio')
    .trim()
    .regex(phoneRegex, 'Formato de celular inválido')
    .refine(validateInappropriateContent, 'Contenido no permitido'),

  discord: z
    .string()
    .trim()
    .max(30, 'El alias es muy largo')
    .optional()
    .refine((discordValue) => !discordValue || validateInappropriateContent(discordValue), 'Contenido no permitido'),

  country: z
    .string()
    .min(1, 'El país es obligatorio')
    .trim()
    .refine(validateInappropriateContent, 'Contenido no permitido'),

  otherCountry: z
    .string()
    .trim()
    .optional()
    .refine((otherCountryValue) => !otherCountryValue || validateInappropriateContent(otherCountryValue), {
      message: 'Contenido no permitido'
    }),

  role: z
    .string()
    .min(1, 'El rol es obligatorio')
    .trim()
    .min(2, 'El rol es muy corto')
    .max(50, 'El rol es muy largo')
    .refine(validateInappropriateContent, 'Contenido no permitido'),

  stack: z
    .array(
      z.object({
        value: z.string().trim().min(1),
        label: z.string().trim().min(1),
      })
    )
    .optional()
  ,

  experience: z
    .string()
    .trim()
    .max(50, 'La experiencia es muy larga')
    .optional()
    .refine((experienceValue) => !experienceValue || validateInappropriateContent(experienceValue), 'Contenido no permitido'),

  linkedin: z
    .string()
    .min(1, 'El perfil de LinkedIn es obligatorio')
    .trim()
    .regex(linkedinRegex, 'Debe ser un perfil de LinkedIn válido')
    .refine(validateInappropriateContent, 'Contenido no permitido'),

  github: z
    .string()
    .trim()
    .optional()
    .refine((githubValue) => !githubValue || githubRegex.test(githubValue), 'Debe ser un perfil de GitHub válido')
    .refine((githubValue) => !githubValue || validateInappropriateContent(githubValue), 'Contenido no permitido'),

  behance: z
    .string()
    .trim()
    .optional()
    .refine((behanceValue) => !behanceValue || behanceRegex.test(behanceValue), 'Debe ser un perfil de Behance válido')
    .refine((behanceValue) => !behanceValue || validateInappropriateContent(behanceValue), 'Contenido no permitido'),

  website: z
    .string()
    .trim()
    .optional()
    .refine((websiteValue) => !websiteValue || /^https?:\/\/.+/.test(websiteValue), 'URL de sitio inválida')
    .refine((websiteValue) => !websiteValue || validateInappropriateContent(websiteValue), 'Contenido no permitido'),

  otherNetwork: z
    .string()
    .trim()
    .max(100, 'La red es muy larga')
    .optional()
    .refine((otherNetworkValue) => !otherNetworkValue || validateInappropriateContent(otherNetworkValue), 'Contenido no permitido'),

  expectations: z
    .string()
    .min(1, 'Las expectativas son obligatorias')
    .trim()
    .min(0, 'Contá un poco más sobre tus expectativas (mínimo 20 caracteres)')
    .max(500, 'Máximo 500 caracteres permitidos')
    .refine(validateInappropriateContent, 'Contenido no permitido')
});

export type FormData = z.infer<typeof entryFormSchema>;

// Tipo para los datos de entrada del formulario
export type FormInputData = z.infer<typeof entryFormSchema>; 