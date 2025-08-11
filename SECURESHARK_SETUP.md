# SecureSharkInputs Setup Guide

## 🚀 Quick Start

1. **Import the template in your component:**
   ```tsx
   import SecureSharkForm from './components/SecureSharkForm';
   ```

2. **Use it in your app:**
   ```tsx
   function App() {
     return (
       <div>
         <SecureSharkForm />
       </div>
     );
   }
   ```

3. **Test security features:**
   - Try XSS: `<script>alert('xss')</script>`
   - Try SQL Injection: `'; DROP TABLE users; --`
   - Try Data Theft: `document.cookie`

## 📚 Documentation

- **NPM Package:** https://www.npmjs.com/package/securesharkinputs
- **GitHub:** https://github.com/AzzADesigns/SecureSharkInputs
- **Full Documentation:** See README.md in the package

## 🛡️ Features

- ✅ XSS Protection
- ✅ SQL Injection Protection  
- ✅ Data Theft Protection
- ✅ Form Blocking
- ✅ Real-time Validation
- ✅ React Hook Form Integration (included in library)

## 🎯 Customization

Modify the template at `src/components/SecureSharkForm.tsx` to match your needs.

## 🔧 Manual Installation

If templates weren't installed automatically, run:
```bash
node node_modules/securesharkinputs/scripts/install-templates.js
```
