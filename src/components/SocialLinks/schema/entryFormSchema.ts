import * as yup from 'yup';
import { createEnterpriseValidator, ValidationLogger } from './enterpriseConfig';

// Inicializar servicios enterprise
const enterpriseValidator = createEnterpriseValidator({
  enableExternalValidation: false, // Habilitar en producción
  enableLogging: true,
  maxInputLength: 1000
});

const logger = ValidationLogger.getInstance();

// Lista extensa de palabras inapropiadas en español e inglés
const palabrasInapropiadas = [
  // Español - Palabras ofensivas y vulgares generales
  'puta', 'puto', 'pendejo', 'pendeja', 'cabrón', 'cabrona', 'mierda', 'joder', 'carajo', 'coño', 
  'chinga', 'chingada', 'culero', 'culera', 'verga', 'vergudo', 'verguda', 'pinche', 'cagada', 
  'cagar', 'cagón', 'cagona', 'gilipollas', 'estúpido', 'estúpida', 'idiota', 'imbécil', 'mamón', 
  'mamona', 'marica', 'maricón', 'travesti', 'zorra', 'zorro', 'huevón', 'huevona', 'pelotudo', 
  'pelotuda', 'imbécila', 'bobo', 'boba', 'gil', 'gila', 'gilazo', 'gilipolla',
  
  // Variantes con caracteres especiales
  'p3nd3j0', 'p3nd3j4', 'p3nd3j0', 'p3nd3j4', 'c4br0n', 'c4br0n4', 'm13rd4', 'j0d3r', 'c4r4j0', 
  'c0ñ0', 'ch1ng4', 'ch1ng4d4', 'cul3r0', 'cul3r4', 'v3rg4', 'v3rgud0', 'v3rgud4', 'p1nch3', 
  'c4g4d4', 'c4g4r', 'c4g0n', 'c4g0n4', 'g1l1p0ll4s', '3stúp1d0', '3stúp1d4', '1d10t4', 
  '1mbéc1l', 'm4m0n', 'm4m0n4', 'm4r1c4', 'm4r1c0n', 'tr4v3st1', 'z0rr4', 'z0rr0', 'hu3v0n', 
  'hu3v0n4', 'p3l0tud0', 'p3l0tud4', '1mbéc1l4', 'b0b0', 'b0b4', 'g1l', 'g1l4', 'g1l4z0', 'g1l1p0ll4',
  
  // Variantes con números
  'p3nd3j0', 'p3nd3j4', 'c4br0n', 'c4br0n4', 'm13rd4', 'j0d3r', 'c4r4j0', 'c0ñ0', 'ch1ng4', 
  'ch1ng4d4', 'cul3r0', 'cul3r4', 'v3rg4', 'v3rgud0', 'v3rgud4', 'p1nch3', 'c4g4d4', 'c4g4r', 
  'c4g0n', 'c4g0n4', 'g1l1p0ll4s', '3stúp1d0', '3stúp1d4', '1d10t4', '1mbéc1l', 'm4m0n', 'm4m0n4', 
  'm4r1c4', 'm4r1c0n', 'tr4v3st1', 'z0rr4', 'z0rr0', 'hu3v0n', 'hu3v0n4', 'p3l0tud0', 'p3l0tud4', 
  '1mbéc1l4', 'b0b0', 'b0b4', 'g1l', 'g1l4', 'g1l4z0', 'g1l1p0ll4',
  
  // Español - Modismos y regionalismos
  'la concha de tu madre', 'andate a la mierda', 'hijo de puta', 'malparido', 'cagapalos', 
  'cabrón de mierda', 'mamaguevo', 'hpta', 'pta', 'maldito', 'maldita', 'cornudo', 'cornuda', 
  'cojud', 'pajero', 'boludo', 'boluda', 'petardo', 'baboso', 'babosa', 'wey', 'guanaco', 
  'sucio', 'perra', 'perro', 'malnacido', 'sapo', 'putañero', 'maricueca', 'careculo', 
  'careverga', 'culia', 'me vale verga', 'qué chucha', 'qué verga', 'chucha tu madre', 
  'hueón', 'sopenco', 'cholo', 'grone', 'india', 'indio de mierda',
  
  // Español - Descripciones sexuales explícitas
  'culiar', 'culear', 'cojer', 'follar', 'pajear', 'pajazo', 'penetrar', 'metértela', 
  'mamártela', 'tragártela', 'te la meto', 'te lo meto', 'por atrás', 'por el culo', 
  'sin condón', 'sin forro',
  
  // Inglés - Palabras ofensivas generales
  'fuck', 'shit', 'bitch', 'bastard', 'asshole', 'dick', 'pussy', 'damn', 'crap', 'slut', 
  'whore', 'prick', 'cunt', 'retard', 'motherfucker', 'cock', 'fag', 'douche', 'twat', 
  'wanker', 'dickhead', 'scumbag', 'cocksucker', 'jackass', 'arsehole', 'bellend', 'bugger',
  
  // Variantes en inglés con caracteres
  'f*ck', 'sh*t', 'b*tch', 'b*stard', 'a*shole', 'd*ck', 'p*ssy', 'd*mn', 'cr*p', 'sl*t', 
  'wh*re', 'pr*ck', 'c*nt', 'ret*rd', 'motherf*cker', 'c*ck', 'f*g', 'd*uche', 'tw*t', 
  'w*nker', 'd*ckhead', 'sc*mbag', 'c*cksucker', 'j*ckass', 'arseh*le', 'bell*nd', 'b*gger',
  
  // Inglés - Slang vulgar/sexual
  'jerk off', 'jerk it', 'jack off', 'blow job', 'bj', 'titty', 'tits', 'titties', 'nipple', 
  'gangbang', 'rimjob', 'handjob', 'fucking her', 'doggystyle', 'rawdog', 'creampie', 
  'eat her out', 'muff dive', 'snatch', 'boner', 'hard-on', 'wood', 'nut', 'bust a nut', 
  'fuckboy', 'fuckgirl', 'bitchass', 'slutty', 'ho', 'hoe', 'skeet', 'bukkake', 'cum', 
  'jizz', 'nutting',
  
  // Inglés - Descripciones racistas/discriminatorias
  'nigger', 'chink', 'spic', 'kike', 'sandnigger', 'towelhead', 'wetback', 'gook', 'cracker', 
  'redskin', 'faggot', 'tranny', 'retarded',
  
  // Inglés - Frases vulgares comunes
  'go to hell', 'eat shit', 'suck my dick', 'fuck you', 'fuck off', 'screw you', 'eat a dick', 
  'kiss my ass', 'dumb fuck', 'stupid bitch', 'damn you', 'go fuck yourself', 'die bitch', 
  'rot in hell', 'burn in hell', 'you piece of shit',
  
  // Palabras adicionales importantes
  'hdp', 'hijo de', 'concha', 'conchuda', 'conchudo', 'forro', 'forra', 'forro', 'forra',
  'pajero', 'pajera', 'pajear', 'pajazo', 'pajearse', 'pajearme', 'pajearse', 'pajearme',
  'gil', 'gila', 'gilazo', 'gilipolla', 'gilipollas', 'gilipollas', 'gilipollas',
  'boludo', 'boluda', 'boludez', 'boludeces', 'boludez', 'boludeces',
  'pelotudo', 'pelotuda', 'pelotudez', 'pelotudeces', 'pelotudez', 'pelotudeces',
  'huevón', 'huevona', 'huevón', 'huevona', 'huevón', 'huevona',
  'weón', 'weona', 'weón', 'weona', 'weón', 'weona',
  'güevón', 'güevona', 'güevón', 'güevona', 'güevón', 'güevona',
  'guevón', 'guevona', 'guevón', 'guevona', 'guevón', 'guevona',
  'huevón', 'huevona', 'huevón', 'huevona', 'huevón', 'huevona',
  'weón', 'weona', 'weón', 'weona', 'weón', 'weona',
  'güevón', 'güevona', 'güevón', 'güevona', 'güevón', 'güevona',
  'guevón', 'guevona', 'guevón', 'guevona', 'guevón', 'guevona'
];

// Optimización: Convertir a Set para búsquedas más rápidas
const palabrasInapropiadasSet = new Set(palabrasInapropiadas);

// Expresiones regulares precompiladas para mejor rendimiento
const htmlInjectionRegex = /<[^>]*>|&[^;]+;/gi;
const xssKeywords = /(javascript:|<script|on\w+=|eval\(|Function\(|document\.|window\.|<svg|<img|<iframe|<object|<embed|<form|<input|<textarea|<select|<button|<link|<meta|<style|<base|<title|location\.|document\.cookie|localStorage|sessionStorage)/gi;
const sqlKeywords = /(select\s|insert\s|delete\s|update\s|drop\s|union\s|--|\/\*|xp_)/gi;
const safeCharactersRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,!¡?¿@#&()\-_:;'"%]*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/i;
const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/.+/i;
const behanceRegex = /^(https?:\/\/)?(www\.)?behance\.net\/.+/i;
const phoneRegex = /^((\+?\d{1,3})?[-\s]?\(?\d{2,4}\)?[-\s]?\d{3,4}[-\s]?\d{3,4})$/;

// 1. Protección contra evasión avanzada (Unicode, homoglifos)
const homoglyphsRegex = /[а-яА-ЯеЁ]/; // Cirílico que parece latino
const zeroWidthRegex = /[\u200B-\u200D\uFEFF]/; // Caracteres de ancho cero
const combiningCharsRegex = /[\u0300-\u036F]/; // Caracteres combinantes
const invisibleCharsRegex = /[\u0000-\u001F\u007F-\u009F]/; // Caracteres de control

// 2. Validación de dominio en emails (configurable)
const corporateEmailRegex = /@(empresa\.com|sucursal\.net)$/i;

// 3. Lógica anti-bypass mejorada
const contieneBypass = (texto: string): boolean => {
  if (!texto || typeof texto !== 'string') return false;
  
  // Normalización avanzada para detectar evasiones
  const normalizado = texto
    .normalize('NFKC') // Normalización Unicode completa
    .replace(/[^\w\s]/g, '') // Solo letras, números y espacios
    .replace(/\s+/g, ' ') // Múltiples espacios a uno
    .trim()
    .toLowerCase();
  
  // Verificar contra Set optimizado
  return Array.from(palabrasInapropiadasSet).some(palabra => 
    normalizado.includes(palabra.toLowerCase())
  );
};

// 4. Detección de caracteres sospechosos
const contieneCaracteresSospechosos = (texto: string): boolean => {
  if (!texto || typeof texto !== 'string') return false;
  
  return homoglyphsRegex.test(texto) || 
         zeroWidthRegex.test(texto) || 
         invisibleCharsRegex.test(texto) ||
         combiningCharsRegex.test(texto);
};

// 5. Prevenir DoS en validaciones complejas
const safeValidation = (text: string): boolean => {
  if (!text || typeof text !== 'string') return false;
  
  // Limitar input grande para prevenir DoS
  if (text.length > 1000) return false;
  
  return contieneContenidoInapropiado(text);
};

// Patrones de inyección SQL
const patronesSQL = [
  // Comandos SQL básicos
  'select', 'insert', 'update', 'delete', 'drop', 'create', 'alter', 'exec', 'execute',
  'union', 'where', 'from', 'table', 'database', 'schema', 'trigger', 'procedure',
  
  // Operadores SQL
  'or', 'and', 'not', 'like', 'in', 'between', 'exists', 'all', 'any', 'some',
  
  // Funciones SQL peligrosas
  'xp_cmdshell', 'sp_executesql', 'openrowset', 'opendatasource', 'xp_regread',
  'xp_regwrite', 'xp_servicecontrol', 'xp_availablemedia', 'xp_subdirs',
  
  // Patrones de inyección comunes
  '1=1', '1=0', 'true', 'false', 'null', 'waitfor', 'delay', 'time', 'sleep',
  'benchmark', 'load_file', 'into outfile', 'into dumpfile', 'information_schema',
  
  // Comentarios SQL
  '--', '/*', '*/', ';', '/*!', '*/',
  
  // Patrones de escape
  'char(', 'ascii(', 'hex(', 'unhex(', 'concat(', 'substring(', 'mid(',
  
  // Patrones de error
  'error', 'warning', 'exception', 'stack', 'trace',
  
  // Patrones de sistema
  'system', 'cmd', 'shell', 'exec', 'eval', 'script', 'javascript', 'vbscript',
  
  // Inyección de comandos del sistema
  'cmd.exe', 'powershell', 'bash', 'sh', 'python', 'perl', 'ruby', 'php', 'node',
  'whoami', 'dir', 'ls', 'cat', 'type', 'more', 'less', 'head', 'tail', 'grep',
  'find', 'search', 'net', 'ipconfig', 'ifconfig', 'ping', 'traceroute', 'nslookup',
  'netstat', 'tasklist', 'ps', 'kill', 'taskkill', 'del', 'rm', 'copy', 'cp',
  'move', 'mv', 'mkdir', 'rmdir', 'chmod', 'chown', 'attrib', 'icacls',
  
  // Patrones de evasión
  'hex(', 'unhex(', 'char(', 'ascii(', 'concat(', 'substring(', 'mid(', 'left(', 'right(',
  'replace(', 'reverse(', 'repeat(', 'space(', 'trim(', 'ltrim(', 'rtrim(',
  'upper(', 'lower(', 'ucase(', 'lcase(', 'length(', 'len(', 'count(', 'sum(',
  'avg(', 'min(', 'max(', 'round(', 'floor(', 'ceiling(', 'abs(', 'sqrt(',
  'power(', 'exp(', 'log(', 'sin(', 'cos(', 'tan(', 'asin(', 'acos(', 'atan(',
  'rand(', 'random(', 'uuid(', 'guid(', 'newid(', 'getdate(', 'now(', 'current_timestamp',
  
  // Patrones de bypass
  'bypass', 'evasion', 'filter', 'waf', 'firewall', 'ids', 'ips', 'honeypot',
  'sandbox', 'virtual', 'vm', 'container', 'docker', 'kubernetes', 'orchestration'
];

// Patrones de XSS y scripts maliciosos
const patronesXSS = [
  // Tags HTML peligrosos básicos
  '<script', '<iframe', '<object', '<embed', '<applet', '<form', '<input', '<textarea', '<select', '<button', '<link', '<meta', '<style', '<base', '<title',
  
  // Eventos JavaScript peligrosos
  'onload', 'onerror', 'onclick', 'onmouseover', 'onmouseout', 'onfocus', 'onblur', 'onchange', 'onsubmit', 'onreset', 'onselect', 'onunload', 'onabort', 'onbeforeunload', 'oncontextmenu', 'onkeydown', 'onkeypress', 'onkeyup', 'onmousedown', 'onmousemove', 'onmouseup', 'onresize', 'onscroll',
  
  // Funciones JavaScript peligrosas
  'javascript:', 'vbscript:', 'data:', 'expression(', 'url(', 'eval(', 'setTimeout(', 'setInterval(', 'Function(', 'constructor(', 'prototype', 'document.write', 'document.writeln', 'innerHTML', 'outerHTML', 'insertAdjacentHTML',
  
  // Patrones de escape básicos
  '&#x', '&#', '%3c', '%3e', '\\x3c', '\\x3e', '\\u003c', '\\u003e',
  
  // Funciones de alerta y manipulación
  'alert(', 'confirm(', 'prompt(', 'console.log', 'console.error', 'console.warn', 'window.open', 'window.location', 'document.location', 'location.href', 'location.assign', 'location.replace',
  
  // APIs peligrosas - PROTECCIÓN MEJORADA PARA COOKIES/LOCALSTORAGE
  'document.cookie', 'localStorage', 'sessionStorage', 'getItem', 'setItem', 'removeItem', 'navigator.clipboard', 'document.execCommand', 'navigator.geolocation', 'navigator.mediaDevices', 'Notification.requestPermission',
  
  // Patrones específicos para robo de datos
  'document.cookie', 'localStorage.getItem', 'sessionStorage.getItem', 'localStorage.setItem', 'sessionStorage.setItem',
  'document.cookie.split', 'document.cookie.indexOf', 'document.cookie.substring', 'document.cookie.replace',
  'localStorage.key', 'sessionStorage.key', 'localStorage.length', 'sessionStorage.length',
  'Object.keys(localStorage)', 'Object.keys(sessionStorage)', 'JSON.parse(localStorage', 'JSON.stringify(localStorage',
  
  // Evasiones comunes para cookies/localStorage
  'document["cookie"]', 'document[\'cookie\']', 'document[`cookie`]',
  'localStorage["getItem"]', 'localStorage[\'getItem\']', 'localStorage[`getItem`]',
  'sessionStorage["getItem"]', 'sessionStorage[\'getItem\']', 'sessionStorage[`getItem`]',
  'window["localStorage"]', 'window[\'localStorage\']', 'window[`localStorage`]',
  'window["sessionStorage"]', 'window[\'sessionStorage\']', 'window[`sessionStorage`]',
  'globalThis["localStorage"]', 'globalThis[\'localStorage\']', 'globalThis[`localStorage`]',
  'self["localStorage"]', 'self[\'localStorage\']', 'self[`localStorage`]',
  'top["localStorage"]', 'top[\'localStorage\']', 'top[`localStorage`]',
  'parent["localStorage"]', 'parent[\'localStorage\']', 'parent[`localStorage`]',
  'frames["localStorage"]', 'frames[\'localStorage\']', 'frames[`localStorage`]',
  
  // Evasiones con caracteres especiales
  'document\u002Ecookie', 'localStorage\u002EgetItem', 'sessionStorage\u002EgetItem',
  'document\u0020\u002Ecookie', 'localStorage\u0020\u002EgetItem', 'sessionStorage\u0020\u002EgetItem',
  'document\u0009\u002Ecookie', 'localStorage\u0009\u002EgetItem', 'sessionStorage\u0009\u002EgetItem',
  'document\u000A\u002Ecookie', 'localStorage\u000A\u002EgetItem', 'sessionStorage\u000A\u002EgetItem',
  'document\u000C\u002Ecookie', 'localStorage\u000C\u002EgetItem', 'sessionStorage\u000C\u002EgetItem',
  'document\u000D\u002Ecookie', 'localStorage\u000D\u002EgetItem', 'sessionStorage\u000D\u002EgetItem',
  
  // Evasiones con comentarios
  'document./*comment*/cookie', 'localStorage./*comment*/getItem', 'sessionStorage./*comment*/getItem',
  'document.//comment\ncookie', 'localStorage.//comment\ngetItem', 'sessionStorage.//comment\ngetItem',
  
  // Evasiones con espacios y saltos de línea
  'document . cookie', 'localStorage . getItem', 'sessionStorage . getItem',
  'document\n.cookie', 'localStorage\n.getItem', 'sessionStorage\n.getItem',
  'document\r\n.cookie', 'localStorage\r\n.getItem', 'sessionStorage\r\n.getItem',
  
  // Evasiones con concatenación
  'document["coo"+"kie"]', 'localStorage["get"+"Item"]', 'sessionStorage["get"+"Item"]',
  'document["coo"+\'kie\']', 'localStorage["get"+\'Item\']', 'sessionStorage["get"+\'Item\']',
  'document[\'coo\'+"kie"]', 'localStorage[\'get\'+"Item"]', 'sessionStorage[\'get\'+"Item"]',
  
  // Evasiones con variables
  'document[var]', 'localStorage[var]', 'sessionStorage[var]',
  'document[String.fromCharCode(99,111,111,107,105,101)]', // "cookie"
  'localStorage[String.fromCharCode(103,101,116,73,116,101,109)]', // "getItem"
  'sessionStorage[String.fromCharCode(103,101,116,73,116,101,109)]', // "getItem"
  
  // Evasiones con funciones
  'document[atob("Y29va2ll")]', 'localStorage[atob("Z2V0SXRlbQ==")]', 'sessionStorage[atob("Z2V0SXRlbQ==")]',
  'document[decodeURIComponent("%63%6F%6F%6B%69%65")]', 'localStorage[decodeURIComponent("%67%65%74%49%74%65%6D")]',
  
  // Patrones de inyección de código
  'XMLHttpRequest', 'fetch(', '$.ajax', '$.get', '$.post', '$.getJSON', '$.load', 'WebSocket', 'ws://', 'wss://', 'Worker', 'SharedWorker', 'postMessage', 'onmessage', 'onerror',
  
  // APIs modernas peligrosas
  'navigator.serviceWorker', 'RTCPeerConnection', 'WebGLRenderingContext', 'FileReader', 'crypto', 'subtle', 'indexedDB', 'caches', 'EventSource', 'SpeechRecognition', 'SpeechSynthesis',
  
  // Patrones de sistema
  'system', 'cmd', 'shell', 'exec', 'eval', 'script', 'javascript', 'vbscript', 'expression', 'url', 'data', 'vbscript',
  
  // Patrones de desbordamiento de buffer
  'buffer overflow', 'stack overflow', 'heap overflow', 'integer overflow', 'format string',
  'sprintf', 'printf', 'scanf', 'gets', 'strcpy', 'strcat', 'memcpy', 'memset',
  'malloc', 'free', 'calloc', 'realloc', 'new', 'delete', 'new[]', 'delete[]',
  
  // Patrones de inyección de archivos
  'file://', 'ftp://', 'sftp://', 'smb://', 'nfs://', 'webdav://', 'gopher://',
  'include', 'require', 'import', 'load', 'readfile', 'file_get_contents', 'fopen',
  'fread', 'fwrite', 'fgets', 'fputs', 'fscanf', 'fprintf', 'fseek', 'ftell',
  'rewind', 'feof', 'ferror', 'clearerr', 'fflush', 'fclose', 'unlink', 'rename',
  'copy', 'move', 'mkdir', 'rmdir', 'chmod', 'chown', 'touch', 'stat', 'lstat',
  'realpath', 'basename', 'dirname', 'pathinfo', 'glob', 'scandir', 'readdir',
  'opendir', 'closedir', 'rewinddir', 'telldir', 'seekdir', 'chdir', 'getcwd',
  'is_dir', 'is_file', 'is_link', 'is_readable', 'is_writable', 'is_executable',
  'file_exists', 'filemtime', 'filectime', 'fileatime', 'filesize', 'fileperms',
  'fileowner', 'filegroup', 'filetype', 'mime_content_type', 'finfo', 'finfo_open',
  'finfo_file', 'finfo_close', 'mime_content_type', 'pathinfo', 'basename', 'dirname',
  
  // Patrones de evasión de filtros
  'bypass', 'evasion', 'filter', 'waf', 'firewall', 'ids', 'ips', 'honeypot',
  'sandbox', 'virtual', 'vm', 'container', 'docker', 'kubernetes', 'orchestration',
  'encoding', 'decoding', 'base64', 'hex', 'binary', 'octal', 'decimal', 'hexadecimal',
  'urlencode', 'urldecode', 'htmlentities', 'html_entity_decode', 'addslashes', 'stripslashes',
  'addcslashes', 'stripcslashes', 'quotemeta', 'nl2br', 'br2nl', 'wordwrap', 'str_word_count',
  'str_split', 'chunk_split', 'strtok', 'str_replace', 'str_ireplace', 'substr_replace',
  'strtr', 'str_pad', 'str_repeat', 'str_shuffle', 'str_rot13', 'strrev', 'strtolower',
  'strtoupper', 'ucfirst', 'lcfirst', 'ucwords', 'trim', 'ltrim', 'rtrim', 'chop',
  'strlen', 'strpos', 'stripos', 'strrpos', 'strripos', 'strstr', 'stristr', 'strrchr',
  'strchr', 'substr', 'strcmp', 'strcasecmp', 'strncmp', 'strncasecmp', 'strnatcmp',
  'strnatcasecmp', 'similar_text', 'levenshtein', 'soundex', 'metaphone', 'crc32',
  'md5', 'sha1', 'sha256', 'sha512', 'hash', 'hash_hmac', 'hash_file', 'hash_hmac_file',
  'password_hash', 'password_verify', 'password_needs_rehash', 'password_get_info',
  'crypt', 'crypt_blowfish', 'crypt_sha256', 'crypt_sha512', 'crypt_md5', 'crypt_standard',
  'crypt_extended', 'crypt_nthash', 'crypt_apr1', 'crypt_sha1', 'crypt_sha256_salt',
  'crypt_sha512_salt', 'crypt_md5_salt', 'crypt_standard_salt', 'crypt_extended_salt',
  'crypt_nthash_salt', 'crypt_apr1_salt', 'crypt_sha1_salt', 'crypt_sha256_salt_salt',
  'crypt_sha512_salt_salt', 'crypt_md5_salt_salt', 'crypt_standard_salt_salt',
  'crypt_extended_salt_salt', 'crypt_nthash_salt_salt', 'crypt_apr1_salt_salt',
  'crypt_sha1_salt_salt', 'crypt_sha256_salt_salt_salt', 'crypt_sha512_salt_salt_salt',
  'crypt_md5_salt_salt_salt', 'crypt_standard_salt_salt_salt', 'crypt_extended_salt_salt_salt',
  'crypt_nthash_salt_salt_salt', 'crypt_apr1_salt_salt_salt', 'crypt_sha1_salt_salt_salt'
];

// Patrones mejorados para detectar robo de datos
const patronesRoboDatos = [
  // Acceso directo a cookies/localStorage
  'document.cookie', 'window.localStorage', 'window.sessionStorage',
  'localStorage.getItem', 'sessionStorage.getItem', 'localStorage.setItem', 'sessionStorage.setItem',
  'localStorage.removeItem', 'sessionStorage.removeItem', 'localStorage.clear', 'sessionStorage.clear',
  
  // Acceso indirecto
  'window["cookie"]', 'window[\'localStorage\']', 'window[`sessionStorage`]',
  'document["cookie"]', 'document[\'cookie\']', 'document[`cookie`]',
  'localStorage["getItem"]', 'localStorage[\'getItem\']', 'localStorage[`getItem`]',
  'sessionStorage["getItem"]', 'sessionStorage[\'getItem\']', 'sessionStorage[`getItem`]',
  
  // Funciones de acceso
  'getItem(', 'setItem(', 'removeItem(', 'clear(',
  
  // Codificaciones y evasiones
  'document[atob("Y29va2ll")]', // document["cookie"] en base64
  'document[String.fromCharCode(99,111,111,107,105,101)]', // "cookie" via char codes
  'localStorage[atob("Z2V0SXRlbQ==")]', // localStorage["getItem"] en base64
  'sessionStorage[atob("Z2V0SXRlbQ==")]', // sessionStorage["getItem"] en base64
  
  // Web Workers y comunicación
  'postMessage(', 'onmessage', 'BroadcastChannel', 'MessageChannel',
  
  // Envío de datos
  'fetch(', 'XMLHttpRequest', 'navigator.sendBeacon',
  
  // APIs modernas peligrosas
  'ServiceWorker', 'BroadcastChannel', 'MessageChannel', 'SharedWorker',
  
  // Serialización/deserialización
  'JSON.parse(localStorage', 'JSON.stringify(localStorage', 'JSON.parse(sessionStorage',
  'JSON.stringify(sessionStorage', 'JSON.parse(cookie', 'JSON.stringify(cookie',
  
  // Iteración sobre storage
  'Object.keys(localStorage', 'Object.values(localStorage', 'Object.entries(localStorage',
  'Object.keys(sessionStorage', 'Object.values(sessionStorage', 'Object.entries(sessionStorage',
  'Array.from(localStorage', 'Array.from(sessionStorage',
  
  // Métodos de string en cookies
  'document.cookie.split', 'document.cookie.indexOf', 'document.cookie.substring',
  'document.cookie.replace', 'document.cookie.match', 'document.cookie.search',
  'document.cookie.slice', 'document.cookie.substr', 'document.cookie.charAt',
  'document.cookie.charCodeAt', 'document.cookie.codePointAt', 'document.cookie.concat',
  'document.cookie.endsWith', 'document.cookie.includes', 'document.cookie.lastIndexOf',
  'document.cookie.localeCompare', 'document.cookie.normalize', 'document.cookie.padEnd',
  'document.cookie.padStart', 'document.cookie.repeat', 'document.cookie.startsWith',
  'document.cookie.toLocaleLowerCase', 'document.cookie.toLocaleUpperCase',
  'document.cookie.toLowerCase', 'document.cookie.toUpperCase', 'document.cookie.trim',
  'document.cookie.trimEnd', 'document.cookie.trimStart', 'document.cookie.valueOf',
  
  // Evasiones con caracteres Unicode
  'document\u002Ecookie', 'localStorage\u002EgetItem', 'sessionStorage\u002EgetItem',
  'document\u0020\u002Ecookie', 'localStorage\u0020\u002EgetItem', 'sessionStorage\u0020\u002EgetItem',
  'document\u0009\u002Ecookie', 'localStorage\u0009\u002EgetItem', 'sessionStorage\u0009\u002EgetItem',
  'document\u000A\u002Ecookie', 'localStorage\u000A\u002EgetItem', 'sessionStorage\u000A\u002EgetItem',
  'document\u000C\u002Ecookie', 'localStorage\u000C\u002EgetItem', 'sessionStorage\u000C\u002EgetItem',
  'document\u000D\u002Ecookie', 'localStorage\u000D\u002EgetItem', 'sessionStorage\u000D\u002EgetItem',
  
  // Evasiones con concatenación
  'document["coo"+"kie"]', 'localStorage["get"+"Item"]', 'sessionStorage["get"+"Item"]',
  'document["coo"+\'kie\']', 'localStorage["get"+\'Item\']', 'sessionStorage["get"+\'Item\']',
  'document[\'coo\'+"kie"]', 'localStorage[\'get\'+"Item"]', 'sessionStorage[\'get\'+"Item"]',
  
  // Evasiones con funciones de codificación
  'document[decodeURIComponent("%63%6F%6F%6B%69%65")]', // "cookie"
  'localStorage[decodeURIComponent("%67%65%74%49%74%65%6D")]', // "getItem"
  'sessionStorage[decodeURIComponent("%67%65%74%49%74%65%6D")]', // "getItem"
  
  // Acceso a través de diferentes contextos
  'self.document.cookie', 'top.document.cookie', 'parent.document.cookie',
  'frames.document.cookie', 'globalThis.document.cookie',
  'self.localStorage', 'top.localStorage', 'parent.localStorage',
  'frames.localStorage', 'globalThis.localStorage',
  'self.sessionStorage', 'top.sessionStorage', 'parent.sessionStorage',
  'frames.sessionStorage', 'globalThis.sessionStorage'
];

// Función mejorada para detectar intentos de robo de datos
const detectaRoboDatosMejorado = (texto: string): boolean => {
  if (!texto || typeof texto !== 'string') return false;
  
  const textoLower = texto.toLowerCase();
  
  // Verificar patrones directos
  const tienePatronesDirectos = patronesRoboDatos.some(patron => 
    textoLower.includes(patron.toLowerCase())
  );
  
  // Verificar intentos de serialización/deserialización
  const tieneSerializacion = /JSON\.(parse|stringify)\([^)]*(localStorage|sessionStorage|cookie)/i.test(texto);
  
  // Verificar intentos de exfiltración
  const tieneExfiltracion = /(fetch|XMLHttpRequest|navigator\.sendBeacon)\([^)]*(localStorage|sessionStorage|cookie)/i.test(texto);
  
  // Verificar intentos de comunicación entre contextos
  const tieneComunicacion = /(postMessage|BroadcastChannel|MessageChannel)\([^)]*(localStorage|sessionStorage|cookie)/i.test(texto);
  
  const resultado = tienePatronesDirectos || tieneSerializacion || tieneExfiltracion || tieneComunicacion;
  
  if (resultado) {
    logger.log('warn', 'Intento de robo de datos detectado (mejorado)', texto);
  }
  
  return resultado;
};

// Alias para compatibilidad
const detectaRoboDatos = detectaRoboDatosMejorado;

// Patrones CSRF
const csrfPatterns = [
  'csrf', 'xsrf', 'cross-site', 'cross site',
  'authenticity_token', '_token', 'anti-forgery',
  'csrf_token', 'xsrf_token', 'csrf-token', 'xsrf-token'
];

const contieneCSRF = (texto: string): boolean => {
  if (!texto || typeof texto !== 'string') return false;
  return csrfPatterns.some(patron => texto.toLowerCase().includes(patron));
};

// Memoización básica para mejorar rendimiento
const memoizedContieneInapropiado = (() => {
  const cache = new Map<string, boolean>();
  const maxCacheSize = 1000;
  
  return (texto: string): boolean => {
    if (!texto || typeof texto !== 'string') return false;
    
    // Limpiar cache si es muy grande
    if (cache.size > maxCacheSize) {
      cache.clear();
    }
    
    if (cache.has(texto)) {
      return cache.get(texto)!;
    }
    
    const resultado = contieneContenidoInapropiado(texto);
    cache.set(texto, resultado);
    return resultado;
  };
})();

// Configurar timeout para validaciones (protección contra ReDoS)
const safeRegexTest = (regex: RegExp, text: string, timeout = 100): boolean => {
  try {
    let timedOut = false;
    const timeoutId = setTimeout(() => { timedOut = true; }, timeout);
    
    const result = regex.test(text);
    clearTimeout(timeoutId);
    
    return !timedOut && result;
  } catch (e) {
    return false;
  }
};

// Función mejorada para detectar contenido inapropiado (insultos + SQL + XSS + evasión + robo de datos + CSRF)
const contieneContenidoInapropiado = (texto: string): boolean => {
  if (!texto || typeof texto !== 'string') return false;
  
  // 1. Verificación de longitud para prevenir DoS
  if (texto.length > 1000) {
    logger.log('warn', 'Input demasiado largo detectado', texto);
    return true;
  }
  
  // 2. Detección de caracteres sospechosos
  if (contieneCaracteresSospechosos(texto)) {
    logger.log('warn', 'Caracteres sospechosos detectados', texto);
    return true;
  }
  
  // 3. Detección específica de robo de cookies/localStorage
  if (detectaRoboDatosMejorado(texto)) {
    logger.log('warn', 'Intento de robo de datos detectado', texto);
    return true;
  }
  
  // 4. Detección de CSRF
  if (contieneCSRF(texto)) {
    logger.log('warn', 'Patrón CSRF detectado', texto);
    return true;
  }
  
  const textoLower = texto.toLowerCase();
  
  // 5. Detección más eficiente usando Set
  const contieneInsultos = Array.from(palabrasInapropiadasSet).some(palabra => 
    textoLower.includes(palabra.toLowerCase())
  );
  
  // 6. Verificación anti-bypass con normalización avanzada
  const contieneBypassDetectado = contieneBypass(texto);
  
  // 7. Verificaciones de seguridad tradicionales con timeout
  const contieneSQL = safeRegexTest(sqlKeywords, textoLower);
  const contieneXSS = safeRegexTest(xssKeywords, texto);
  const contieneHTML = safeRegexTest(htmlInjectionRegex, texto);
  
  const esInapropiado = contieneInsultos || contieneBypassDetectado || contieneSQL || contieneXSS || contieneHTML;
  
  if (esInapropiado) {
    logger.log('warn', 'Contenido inapropiado detectado', texto, [
      contieneInsultos ? 'insultos' : '',
      contieneBypassDetectado ? 'bypass' : '',
      contieneSQL ? 'sql' : '',
      contieneXSS ? 'xss' : '',
      contieneHTML ? 'html' : ''
    ].filter(Boolean));
  }
  
  return esInapropiado;
};

export const entryFormSchema = yup.object({
    email: yup
    .string()
    .required('El correo es obligatorio')
    .trim()
    .matches(emailRegex, 'Correo inválido')
    .max(100, 'El correo es demasiado largo')
    .test('safe-content', 'Contenido no permitido', value =>
      !contieneContenidoInapropiado(value || '')
    )
    .test('no-html', 'HTML no permitido', value =>
      !htmlInjectionRegex.test(value || '')
    )
    .test('suspicious-chars', 'Caracteres sospechosos detectados', value =>
      !contieneCaracteresSospechosos(value || '')
    )
    .test('data-theft', 'Intento de robo de datos detectado', value =>
      !detectaRoboDatos(value || '')
    ),

  age: yup
    .number()
    .typeError('La edad debe ser un número')
    .integer('Debe ser un número entero')
    .min(12, 'Debés tener al menos 12 años')
    .max(100, 'Edad no válida')
    .required('La edad es obligatoria'),

  firstName: yup
    .string()
    .required('El nombre es obligatorio')
    .trim()
    .min(2, 'El nombre es muy corto')
    .max(50, 'El nombre es muy largo')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-]+$/, 'Solo letras, espacios y guiones permitidos')
    .test('safe-content', 'Contenido no permitido', value => 
      !contieneContenidoInapropiado(value || '')
    )
    .test('no-html', 'HTML no permitido', value => 
      !htmlInjectionRegex.test(value || '')
    )
    .test('suspicious-chars', 'Caracteres sospechosos detectados', value => 
      !contieneCaracteresSospechosos(value || '')
    )
    .test('data-theft', 'Intento de robo de datos detectado', value => 
      !detectaRoboDatos(value || '')
    ),

  lastName: yup
    .string()
    .required('El apellido es obligatorio')
    .trim()
    .min(2, 'El apellido es muy corto')
    .max(50, 'El apellido es muy largo')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-]+$/, 'Solo letras, espacios y guiones permitidos')
    .test('safe-content', 'Contenido no permitido', value => 
      !contieneContenidoInapropiado(value || '')
    )
    .test('no-html', 'HTML no permitido', value => 
      !htmlInjectionRegex.test(value || '')
    )
    .test('suspicious-chars', 'Caracteres sospechosos detectados', value => 
      !contieneCaracteresSospechosos(value || '')
    )
    .test('data-theft', 'Intento de robo de datos detectado', value => 
      !detectaRoboDatos(value || '')
    ),

    phone: yup
    .string()
    .required('El número de celular es obligatorio')
    .trim()
    .matches(phoneRegex, 'Formato de celular inválido')
    .test('safe-content', 'Contenido no permitido', value =>
      !contieneContenidoInapropiado(value || '')
    )
    .test('no-html', 'HTML no permitido', value =>
      !htmlInjectionRegex.test(value || '')
    )
    .test('suspicious-chars', 'Caracteres sospechosos detectados', value =>
      !contieneCaracteresSospechosos(value || '')
    )
    .test('data-theft', 'Intento de robo de datos detectado', value =>
      !detectaRoboDatos(value || '')
    ),

  discord: yup
    .string()
    .trim()
    .max(30, 'El alias es muy largo')
    .test('safe-content', 'Contenido no permitido', value => 
      !value || !contieneContenidoInapropiado(value)
    )
    .test('no-html', 'HTML no permitido', value => 
      !value || !htmlInjectionRegex.test(value)
    )
    .test('suspicious-chars', 'Caracteres sospechosos detectados', value => 
      !value || !contieneCaracteresSospechosos(value)
    )
    .test('data-theft', 'Intento de robo de datos detectado', value => 
      !value || !detectaRoboDatosMejorado(value)
    ),

  country: yup
    .string()
    .required('El país es obligatorio')
    .trim()
    .test('safe-content', 'Contenido no permitido', value => 
      !contieneContenidoInapropiado(value || '')
    )
    .test('no-html', 'HTML no permitido', value => 
      !htmlInjectionRegex.test(value || '')
    )
    .test('suspicious-chars', 'Caracteres sospechosos detectados', value => 
      !contieneCaracteresSospechosos(value || '')
    )
    .test('data-theft', 'Intento de robo de datos detectado', value => 
      !detectaRoboDatos(value || '')
    ),

  otherCountry: yup
    .string()
    .when('country', {
      is: 'Otra',
      then: schema => schema
        .required('Especifica el país')
        .min(2, 'Nombre de país demasiado corto')
        .test('safe-content', 'Contenido no permitido', value => 
          !contieneContenidoInapropiado(value || '')
        )
        .test('no-html', 'HTML no permitido', value => 
          !htmlInjectionRegex.test(value || '')
        )
        .test('suspicious-chars', 'Caracteres sospechosos detectados', value => 
          !contieneCaracteresSospechosos(value || '')
        )
        .test('data-theft', 'Intento de robo de datos detectado', value => 
          !detectaRoboDatos(value || '')
        ),
      otherwise: schema => schema.notRequired()
    })
    .trim(),

  role: yup
    .string()
    .required('El rol es obligatorio')
    .trim()
    .min(2, 'El rol es muy corto')
    .max(50, 'El rol es muy largo')
    .test('safe-content', 'Contenido no permitido', value => 
      !contieneContenidoInapropiado(value || '')
    )
    .test('no-html', 'HTML no permitido', value => 
      !htmlInjectionRegex.test(value || '')
    )
    .test('suspicious-chars', 'Caracteres sospechosos detectados', value => 
      !contieneCaracteresSospechosos(value || '')
    )
    .test('data-theft', 'Intento de robo de datos detectado', value => 
      !detectaRoboDatos(value || '')
    ),

  stack: yup
    .string()
    .trim()
    .test('es-lista', 'Debe ingresar tecnologías separadas por comas', val => 
      !val || val.split(',').every(tech => tech.trim().length > 1)
    )
    .test('safe-content', 'Contenido no permitido', value => 
      !value || !contieneContenidoInapropiado(value)
    )
    .test('no-html', 'HTML no permitido', value => 
      !value || !htmlInjectionRegex.test(value)
    )
    .test('suspicious-chars', 'Caracteres sospechosos detectados', value => 
      !value || !contieneCaracteresSospechosos(value)
    )
    .test('data-theft', 'Intento de robo de datos detectado', value => 
      !value || !detectaRoboDatos(value)
    ),

  experience: yup
    .string()
    .trim()
    .max(50, 'La experiencia es muy larga')
    .test('safe-content', 'Contenido no permitido', value => 
      !value || !contieneContenidoInapropiado(value)
    )
    .test('no-html', 'HTML no permitido', value => 
      !value || !htmlInjectionRegex.test(value)
    )
    .test('suspicious-chars', 'Caracteres sospechosos detectados', value => 
      !value || !contieneCaracteresSospechosos(value)
    )
    .test('data-theft', 'Intento de robo de datos detectado', value => 
      !value || !detectaRoboDatos(value)
    ),

  linkedin: yup
    .string()
    .required('Tu perfil de LinkedIn es obligatorio')
    .trim()
    .matches(linkedinRegex, 'Debe ser un perfil de LinkedIn válido')
    .test('safe-content', 'Contenido no permitido', value => 
      !contieneContenidoInapropiado(value || '')
    )
    .test('no-html', 'HTML no permitido', value => 
      !htmlInjectionRegex.test(value || '')
    )
    .test('suspicious-chars', 'Caracteres sospechosos detectados', value => 
      !contieneCaracteresSospechosos(value || '')
    )
    .test('data-theft', 'Intento de robo de datos detectado', value => 
      !detectaRoboDatos(value || '')
    ),

  github: yup
    .string()
    .trim()
    .matches(githubRegex, 'Debe ser un perfil de GitHub válido')
    .notRequired()
    .test('safe-content', 'Contenido no permitido', value => 
      !value || !contieneContenidoInapropiado(value)
    )
    .test('no-html', 'HTML no permitido', value => 
      !value || !htmlInjectionRegex.test(value)
    )
    .test('suspicious-chars', 'Caracteres sospechosos detectados', value => 
      !value || !contieneCaracteresSospechosos(value)
    )
    .test('data-theft', 'Intento de robo de datos detectado', value => 
      !value || !detectaRoboDatos(value)
    ),

  behance: yup
    .string()
    .trim()
    .matches(behanceRegex, 'Debe ser un perfil de Behance válido')
    .notRequired()
    .test('safe-content', 'Contenido no permitido', value => 
      !value || !contieneContenidoInapropiado(value)
    )
    .test('no-html', 'HTML no permitido', value => 
      !value || !htmlInjectionRegex.test(value)
    )
    .test('suspicious-chars', 'Caracteres sospechosos detectados', value => 
      !value || !contieneCaracteresSospechosos(value)
    )
    .test('data-theft', 'Intento de robo de datos detectado', value => 
      !value || !detectaRoboDatos(value)
    ),

  website: yup
    .string()
    .trim()
    .url('URL de sitio inválida')
    .notRequired()
    .test('safe-content', 'Contenido no permitido', value => 
      !value || !contieneContenidoInapropiado(value)
    )
    .test('no-html', 'HTML no permitido', value => 
      !value || !htmlInjectionRegex.test(value)
    )
    .test('suspicious-chars', 'Caracteres sospechosos detectados', value => 
      !value || !contieneCaracteresSospechosos(value)
    )
    .test('data-theft', 'Intento de robo de datos detectado', value => 
      !value || !detectaRoboDatos(value)
    ),

  otherNetwork: yup
    .string()
    .trim()
    .max(100, 'La red es muy larga')
    .test('safe-content', 'Contenido no permitido', value => 
      !value || !contieneContenidoInapropiado(value)
    )
    .test('no-html', 'HTML no permitido', value => 
      !value || !htmlInjectionRegex.test(value)
    )
    .test('suspicious-chars', 'Caracteres sospechosos detectados', value => 
      !value || !contieneCaracteresSospechosos(value)
    )
    .test('data-theft', 'Intento de robo de datos detectado', value => 
      !value || !detectaRoboDatos(value)
    ),

  expectations: yup
    .string()
    .required('Las expectativas son obligatorias')
    .trim()
    .min(20, 'Contá un poco más sobre tus expectativas (mínimo 20 caracteres)')
    .max(500, 'Máximo 500 caracteres permitidos')
    .test('safe-content', 'Contenido no permitido', value => 
      !value || !contieneContenidoInapropiado(value)
    )
    .test('no-html', 'HTML no permitido', value => 
      !value || !htmlInjectionRegex.test(value)
    )
    .test('suspicious-chars', 'Caracteres sospechosos detectados', value => 
      !value || !contieneCaracteresSospechosos(value)
    )
    .test('data-theft', 'Intento de robo de datos detectado', value => 
      !value || !detectaRoboDatos(value)
    )
    .test('enterprise-validation', 'Validación enterprise falló', async value => {
      if (!value) return true;
      
      try {
        const stringValue = value as string;
        const result = await enterpriseValidator.validate(stringValue);
        if (!result.isValid) {
          logger.log('error', 'Validación enterprise falló', stringValue, [result.reason || 'Unknown error']);
        }
        return result.isValid;
      } catch (error) {
        logger.log('error', 'Error en validación enterprise', undefined);
        return true; // Fallback seguro
      }
    })
});

export type FormData = yup.InferType<typeof entryFormSchema>; 