# How to Update Your Resume (Automatic Root Sync)

You can update your resume in **1 step** directly from the top-level repository folder without digging through `frontend/public/`.

---

## 📍 Easy Top-Level Folder

```plaintext
d:\Ujjwal\Work\Main_Projects\ujjwal-ai-portfolio\RESUME_PUT_HERE\
```

Place your latest resume PDF here, preferably named:
```plaintext
Ujjwal_Pradip_Patil_Resume.pdf
```
*(Any `.pdf` file placed in this directory will also be detected automatically).*

---

## ⚡ 1-Step Update Procedure

1. **Export your new resume** from your editor (Canva, Overleaf / LaTeX, Word, or Google Docs) as a PDF.
2. **Drop / overwrite it** directly inside:
   ```plaintext
   RESUME_PUT_HERE/Ujjwal_Pradip_Patil_Resume.pdf
   ```

### 🤖 Automatic Vite Sync
A custom Vite plugin (`syncResumePlugin` in `frontend/vite.config.ts`) monitors the `RESUME_PUT_HERE/` folder:
- **During Development (`npm run dev`)**: Automatically detects changes to the PDF in `RESUME_PUT_HERE/` and hot-copies it directly to `frontend/public/resume.pdf`.
- **During Production Build (`npm run build`)**: Automatically syncs the latest PDF from `RESUME_PUT_HERE/` before packaging the production bundle.
- **In the Web App**: The in-page `ResumeViewerModal`, hero CTA buttons, and navbar download buttons all immediately preview and download your latest file.

---

## 💡 Pro Tips

- **Hard Refresh:**
  If you recently updated the PDF while the browser tab was already open, press `Ctrl + F5` (or `Cmd + Shift + R` on Mac) to clear the browser's embedded PDF viewer cache.
- **Git Commit:**
  Commit your updated resume to version control:
  ```bash
  git add RESUME_PUT_HERE/ frontend/public/resume.pdf
  git commit -m "docs(resume): update latest resume PDF"
  git push
  ```
