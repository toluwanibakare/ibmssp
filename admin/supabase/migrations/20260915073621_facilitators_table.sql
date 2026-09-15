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
