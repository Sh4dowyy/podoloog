-- Migration to add support for public reviews
-- This adds column for storing public review author name

-- Add column for public review authors (if it doesn't exist)
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS author_name VARCHAR(255);

-- Add an index on published status for faster filtering
CREATE INDEX IF NOT EXISTS idx_reviews_published ON reviews(published);

-- Add a check constraint to ensure public reviews have name
ALTER TABLE reviews 
ADD CONSTRAINT check_public_review_info 
CHECK (
  (author_id != 'public' AND author_id NOT LIKE 'public_%') 
  OR 
  (author_name IS NOT NULL)
); 