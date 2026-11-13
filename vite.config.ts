import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';

function copyStaticGitHubPagesPlugin(): Plugin {
  return {
    name: 'copy-static-github-pages',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

      const rootFiles = [
        'style.css',
        'script.js',
        'CNAME',
        'robots.txt',
        'sitemap.xml',
        'about.html',
        'biography.html',
        'contacts.html',
        'frozen-time.html',
        'privacy-policy.html',
        'terms-of-service.html',
      ];

      for (const file of rootFiles) {
        const srcPath = path.resolve(__dirname, file);
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, path.join(distDir, file));
        }
      }

      const albumsSrc = path.resolve(__dirname, 'albums');
      const albumsDest = path.join(distDir, 'albums');
      if (fs.existsSync(albumsSrc)) {
        fs.mkdirSync(albumsDest, { recursive: true });
        for (const entry of fs.readdirSync(albumsSrc)) {
          if (entry.endsWith('.html')) {
            fs.copyFileSync(path.join(albumsSrc, entry), path.join(albumsDest, entry));
          }
        }
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [copyStaticGitHubPagesPlugin()],
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
