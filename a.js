#!/usr/bin/env node

const { instagram } = require('./src/utils/igdl');
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node a.js <Instagram URL>');
    process.exit(1);
  }
  const url = args[0];
  try {
    const data = await instagram(url);
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error:', err.message || err);
  }
}
main();
