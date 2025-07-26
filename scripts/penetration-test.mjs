#!/usr/bin/env node

// Script para ejecutar pruebas de penetración (ES Module)
import { runPenetrationTests, generateSecurityReport, testSpecificField, penetrationPayloads } from '../src/components/SocialLinks/schema/penetrationTests.ts';

async function main() {
  console.log('🔍 SISTEMA DE PRUEBAS DE PENETRACIÓN');
  console.log('=====================================\n');

  // Ejecutar pruebas completas
  console.log('🚀 Ejecutando pruebas completas...');
  const results = await runPenetrationTests();
  
  // Generar reporte de seguridad
  generateSecurityReport();
  
  // Pruebas específicas por campo
  console.log('\n🎯 PRUEBAS ESPECÍFICAS POR CAMPO:');
  console.log('===================================');
  
  const fields = ['email', 'firstName', 'lastName', 'phone', 'linkedin'];
  
  for (const field of fields) {
    console.log(`\n📋 Probando campo: ${field}`);
    const fieldResults = await testSpecificField(field, penetrationPayloads.xss.slice(0, 5));
    console.log(`   ✅ Exitosos: ${fieldResults.passed}/${fieldResults.total}`);
    console.log(`   ❌ Fallidos: ${fieldResults.failed}/${fieldResults.total}`);
  }
  
  // Resumen final
  console.log('\n📊 RESUMEN FINAL:');
  console.log('==================');
  console.log(`Total de pruebas: ${results.total}`);
  console.log(`Tasa de éxito: ${((results.passed / results.total) * 100).toFixed(2)}%`);
  
  if (results.failed > 0) {
    console.log('\n⚠️ RECOMENDACIONES:');
    console.log('===================');
    console.log('- Revisar payloads que no fueron bloqueados');
    console.log('- Ajustar reglas de validación si es necesario');
    console.log('- Considerar validación externa para casos complejos');
  } else {
    console.log('\n🎉 ¡TODAS LAS PRUEBAS PASARON EXITOSAMENTE!');
    console.log('El sistema de validación está funcionando correctamente.');
  }
}

// Manejar argumentos de línea de comandos
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log('Uso: node penetration-test.mjs [opciones]');
  console.log('');
  console.log('Opciones:');
  console.log('  --help, -h     Mostrar esta ayuda');
  console.log('  --field <name>  Probar solo un campo específico');
  console.log('  --category <name> Probar solo una categoría específica');
  console.log('');
  console.log('Ejemplos:');
  console.log('  node penetration-test.mjs');
  console.log('  node penetration-test.mjs --field email');
  console.log('  node penetration-test.mjs --category xss');
  process.exit(0);
}

if (args.includes('--field')) {
  const fieldIndex = args.indexOf('--field');
  const fieldName = args[fieldIndex + 1];
  
  if (!fieldName) {
    console.error('Error: Debe especificar un nombre de campo');
    process.exit(1);
  }
  
  console.log(`🔍 Probando solo el campo: ${fieldName}`);
  testSpecificField(fieldName, penetrationPayloads.xss)
    .then(results => {
      console.log(`✅ Exitosos: ${results.passed}/${results.total}`);
      console.log(`❌ Fallidos: ${results.failed}/${results.total}`);
    })
    .catch(console.error);
} else if (args.includes('--category')) {
  const categoryIndex = args.indexOf('--category');
  const categoryName = args[categoryIndex + 1];
  
  if (!categoryName || !penetrationPayloads[categoryName]) {
    console.error('Error: Categoría no válida. Categorías disponibles:');
    console.error(Object.keys(penetrationPayloads).join(', '));
    process.exit(1);
  }
  
  console.log(`🔍 Probando solo la categoría: ${categoryName}`);
  testSpecificField('expectations', penetrationPayloads[categoryName])
    .then(results => {
      console.log(`✅ Exitosos: ${results.passed}/${results.total}`);
      console.log(`❌ Fallidos: ${results.failed}/${results.total}`);
    })
    .catch(console.error);
} else {
  // Ejecutar todas las pruebas
  main().catch(console.error);
} 