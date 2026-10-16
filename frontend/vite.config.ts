import fs from 'node:fs';
import path from 'node:path';
import { type Plugin, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function syncResumePlugin(): Plugin {
  const resumeDir = path.resolve(__dirname, '../RESUME_PUT_HERE');
  const targetPdf = path.resolve(__dirname, 'public/resume.pdf');

  const copyLatestResume = () => {
    try {
      if (!fs.existsSync(resumeDir)) {
        fs.mkdirSync(resumeDir, { recursive: true });
      }
      const files = fs.readdirSync(resumeDir);
      const pdfs = files.filter((f) => f.toLowerCase().endsWith('.pdf'));

      // Prefer Ujjwal_Pradip_Patil_Resume.pdf, else any resume PDF, else first PDF
      const chosen =
        pdfs.find((f) => f === 'Ujjwal_Pradip_Patil_Resume.pdf') ||
        pdfs.find((f) => f.toLowerCase().includes('resume')) ||
        pdfs[0];

      if (chosen) {
        const sourcePdf = path.join(resumeDir, chosen);
        fs.mkdirSync(path.dirname(targetPdf), { recursive: true });

        let shouldCopy = true;
        if (fs.existsSync(targetPdf)) {
          const srcStat = fs.statSync(sourcePdf);
          const tgtStat = fs.statSync(targetPdf);
          if (srcStat.size === tgtStat.size && srcStat.mtimeMs <= tgtStat.mtimeMs) {
            shouldCopy = false;
          }
        }

        if (shouldCopy) {
          fs.copyFileSync(sourcePdf, targetPdf);
          console.log(`[syncResumePlugin] Synced ${chosen} -> frontend/public/resume.pdf`);
        }
      }
    } catch (err) {
      console.warn('[syncResumePlugin] Error syncing resume PDF:', err);
    }
  };

  return {
    name: 'sync-resume-plugin',
    buildStart() {
      copyLatestResume();
    },
    configureServer(server) {
      copyLatestResume();
      server.watcher.add(resumeDir);
      server.watcher.on('all', (_event, filePath) => {
        if (filePath.includes('RESUME_PUT_HERE') && filePath.toLowerCase().endsWith('.pdf')) {
          copyLatestResume();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), syncResumePlugin()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: process.env.VITE_API_PROXY_TARGET || 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
