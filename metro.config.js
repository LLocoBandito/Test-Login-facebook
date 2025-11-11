// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// If you need to support .cjs modules in your project, uncomment below:
// config.resolver.sourceExts.push('cjs');

module.exports = config;
