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

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role::text = _role
  )
$$;

-- App settings table for configuration
CREATE TABLE IF NOT EXISTS public.app_settings (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    setting_key TEXT NOT NULL UNIQUE,
    setting_value TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER app_settings_updated_at
BEFORE UPDATE ON public.app_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read app_settings" ON public.app_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can insert app_settings" ON public.app_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can update app_settings" ON public.app_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Live chats table
CREATE TABLE IF NOT EXISTS public.live_chats (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    member_id BIGINT REFERENCES public.members(member_id) ON DELETE SET NULL,
    visitor_name TEXT NOT NULL,
    visitor_email TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'human_active', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TRIGGER live_chats_updated_at
BEFORE UPDATE ON public.live_chats
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

ALTER TABLE public.live_chats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read live_chats" ON public.live_chats FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin can insert live_chats" ON public.live_chats FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can update live_chats" ON public.live_chats FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin can delete live_chats" ON public.live_chats FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Update user_roles RLS to allow admins to read all roles and users to read their own
CREATE POLICY "Admin can read all user_roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can update own roles" ON public.user_roles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admin can insert user_roles" ON public.user_roles FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
