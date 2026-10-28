-- 1. Add source column to deals
ALTER TABLE deals ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'venue';

-- 2. Create deal_tips table
CREATE TABLE IF NOT EXISTS deal_tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  venue_name text NOT NULL,
  venue_city text NOT NULL,
  deal_description text NOT NULL,
  deal_days text,
  deal_time text,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- 3. RLS for deal_tips
ALTER TABLE deal_tips ENABLE ROW LEVEL SECURITY;

-- Logged-in users can insert their own tips
CREATE POLICY "Users can submit tips" ON deal_tips
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Only admin can read/update tips (via service role in API)
CREATE POLICY "Admin can read tips" ON deal_tips
  FOR SELECT USING (true);

CREATE POLICY "Admin can update tips" ON deal_tips
  FOR UPDATE USING (true);
