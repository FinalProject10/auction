# Firebase Functions Environment Setup

## Service Account Configuration

This project uses the Firebase service account file `auction-adca9-77aeb27bd088.json` for authentication.

### Setup Instructions

1. **Service Account File Location**
   - The service account JSON file is located at: `functions/auction-adca9-77aeb27bd088.json`
   - This file contains the credentials needed for Firebase Admin SDK initialization

2. **Environment Variable (Optional)**
   - You can set the path to the service account file using an environment variable:
   ```bash
   export FIREBASE_SERVICE_ACCOUNT_PATH=./auction-adca9-77aeb27bd088.json
   ```
   - If not set, the code defaults to `./auction-adca9-77aeb27bd088.json` in the functions directory

3. **Local Development**
   - The service account file is automatically loaded when running Firebase Functions locally
   - Make sure the file exists in the `functions/` directory

4. **Firebase Cloud Functions Deployment**
   - When deployed to Firebase, the service account credentials are automatically available
   - The code will fall back to default credentials if the file cannot be loaded
   - This ensures compatibility with both local and cloud environments

### Service Account Details

- **Project ID**: `auction-adca9`
- **Client Email**: `salmen@auction-adca9.iam.gserviceaccount.com`
- **File**: `auction-adca9-77aeb27bd088.json`

### Security Notes

⚠️ **Important**: 
- Never commit service account JSON files to public repositories
- The service account file contains sensitive credentials
- Keep this file secure and only share with trusted team members
- Consider using environment variables or Firebase's default credentials in production

### Usage in Code

The Firebase Admin SDK is initialized in `functions/index.js`:

```javascript
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 
  path.join(__dirname, "auction-adca9-77aeb27bd088.json");

let adminConfig = {};

try {
  const serviceAccount = require(serviceAccountPath);
  adminConfig = {
    credential: admin.credential.cert(serviceAccount),
  };
} catch (error) {
  // Falls back to default credentials in Firebase Cloud environment
  console.log("Using default Firebase Admin credentials");
}

admin.initializeApp(adminConfig);
```

This setup ensures:
- ✅ Local development works with the service account file
- ✅ Firebase Cloud Functions deployment works with default credentials
- ✅ Flexible configuration via environment variables

