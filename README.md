# Firebase Setup Guide

This module contains Firebase configuration and helper utilities.

## 🔧 Setup Steps
1. Create a Firebase project.
2. Enable Authentication and Firestore (or Realtime DB as needed).
3. Enable Firebase Storage for file uploads (⚠ requires billing).
4. Get Firebase config from Project Settings → General.
5. Replace the config inside `firebase.js`.

##  Structure
- `firebase.js`: Firebase initialization
- `helpers/uploadResume.js`: Upload PDF to Firebase Storage
- `docs/firebase-setup-guide.md`: Full instructions
