import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd());
  
  return {
    plugins: [
      react(),
      {
        name: 'copy-assets-plugin',
        // This plugin copies the assets folder to the dist folder after the build
        closeBundle() {
          const srcDir = resolve(__dirname, 'src/theme/assets');
          const destDir = resolve(__dirname, 'dist/assets');
          
          // Clean and recreate the target folder
          if (fs.existsSync(destDir)) {
            // Delete all existing content
            fs.rmSync(destDir, { recursive: true, force: true });
          }
          fs.mkdirSync(destDir, { recursive: true });
          
          // Copy function
          function copyDir(src:any, dest:any) {
            fs.readdirSync(src).forEach(file => {
              const srcPath = path.join(src, file);
              const destPath = path.join(dest, file);
              
              if (fs.statSync(srcPath).isDirectory()) {
                if (!fs.existsSync(destPath)){
                  fs.mkdirSync(destPath, { recursive: true });
                }
                copyDir(srcPath, destPath);
              } else {
                fs.copyFileSync(srcPath, destPath);
              }
            });
          }
          
          // Start the copy process
          copyDir(srcDir, destDir);
        }
      }
    ],
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        },
        output: {
          entryFileNames: 'theme/js/main.min.js',
          assetFileNames: (assetInfo) => {
            
            // Custom naming for CSS files
            if (assetInfo.name && assetInfo.name.endsWith('.css')) {
              return 'theme/css/main.min.css';
            }

            // Folder control based on the source path
            const imgMatch = assetInfo.name && /\.(png|jpe?g|gif|svg)$/i.test(assetInfo.name);
          
            // Preserve the path and folder structure for font and images files
            const fontMatch = assetInfo.name && /\.(woff2?|woff|eot|ttf|otf)$/i.test(assetInfo.name);
            if (fontMatch || imgMatch) {
              const sourcePath = assetInfo.originalFileNames && assetInfo.originalFileNames.toString();
              const filePath = sourcePath.split('/').slice(1).join('/').match(/([^/]+)\/(.*)/);
              if(filePath!=null) return filePath[0];
            }
            
            // For other assets
            return 'presentation/theme/assets/[name][extname]';
          }
        }
      }
    },
    server: {
      port: parseInt(env.VITE_PORT) || 3000, // Use VITE_PORT or fallback to 3000
      fs: {
        strict: false,
        allow: ['..'] // Allow access to the src directory
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@assets': resolve(__dirname, 'src/presentation/theme/assets')
      }
    }
  }
});