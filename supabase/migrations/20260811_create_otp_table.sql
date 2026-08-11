-- Create password_reset_otps table for custom OTP management
CREATE TABLE IF NOT EXISTS public.password_reset_otps (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  otp text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Allow the edge function (service role) full access
ALTER TABLE public.password_reset_otps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON public.password_reset_otps
  FOR ALL USING (true) WITH CHECK (true);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_otp_email ON public.password_reset_otps(email);
