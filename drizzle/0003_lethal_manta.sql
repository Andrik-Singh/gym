ALTER TABLE "YourTableName" DROP COLUMN "workDay";

-- Add it back as integer with a default
ALTER TABLE "YourTableName" ADD COLUMN "workDay" integer NOT NULL DEFAULT 1;