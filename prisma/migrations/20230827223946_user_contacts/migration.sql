-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contact" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "USeremail" TEXT NOT NULL DEFAULT 'seif@gmail.com',
    CONSTRAINT "contact_USeremail_fkey" FOREIGN KEY ("USeremail") REFERENCES "user" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contact" ("email", "id", "name", "phone") SELECT "email", "id", "name", "phone" FROM "contact";
DROP TABLE "contact";
ALTER TABLE "new_contact" RENAME TO "contact";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
