-- Create helper types and functions if they don't exist
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'editor');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Facilitators table for applications
CREATE TABLE public.facilitators (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    competence TEXT NOT NULL,
    cv_file_url TEXT,
    cv_file_name TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER facilitators_updated_at
BEFORE UPDATE ON public.facilitators
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.facilitators ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read facilitators" ON public.facilitators FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can insert facilitators" ON public.facilitators FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can update facilitators" ON public.facilitators FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can delete facilitators" ON public.facilitators FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Add permissions column to user_roles for page-level access control
ALTER TABLE public.user_roles ADD COLUMN IF NOT EXISTS permissions TEXT[] DEFAULT ARRAY[]::TEXT[];
