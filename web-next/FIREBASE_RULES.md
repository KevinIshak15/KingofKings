# Firestore Security Rules

Deploy these rules in Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() { return request.auth != null; }

    function isAdmin() {
      return isSignedIn() &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
    }

    match /users/{userId} {
      allow read: if isSignedIn() && request.auth.uid == userId;
      allow write: if false;
    }

    match /listings/{listingId} {
      allow read: if resource.data.status == "published" || isAdmin();
      allow write: if isAdmin();
    }
  }
}

---

### Firestore composite index

For listings queries by `status` + `publishedAt`, create a composite index in Firebase Console → Firestore → Indexes:

- Collection: `listings`
- Fields: `status` (Ascending), `publishedAt` (Descending)

Note: `users` collection has `allow write: if false` — writes are done server-side via the Admin SDK in `/api/admin/setup`.
