const packageJSON = require('./package.json');

/**
 * @type {import('electron-builder').Configuration}
 */
const electronBuilderConfig = {
  appId: 'com.danielerolli.beaver-notes',
  files: ['packages/**/dist/**'],
  extraMetadata: {
    version: packageJSON.version,
  },
  directories: {
    output: 'dist',
    buildResources: 'buildResources',
  },
  fileAssociations: [
    {
      ext: 'bea',
      name: 'Beaver Notes',
      description: 'Beaver Notes File',
      icon: 'buildResources/icon.ico',
      mimeType: 'application/x-beaver-notes',
    },
  ],
  win: {
    icon: 'buildResources/icon.ico',
    target: [
      { target: 'portable', arch: ['ia32'] },
      { target: 'nsis', arch: ['ia32'] },
    ]
  },
  nsis: {
    oneClick: true,
    installerIcon: 'buildResources/icon.ico',
    uninstallerIcon: 'buildResources/icon.ico',
    uninstallDisplayName: 'Beaver-Notes',
    license: 'LICENSE',
    allowToChangeInstallationDirectory: false,
  },
  portable: {
    artifactName: '${productName}-${version}-portable.${ext}',
  },
};

module.exports = async () => {
  const envModule = await import('./env.js');
  const loadEnv = envModule.loadEnv;

  loadEnv('private');

  const config = { ...electronBuilderConfig };
  return config;
};
