-- Allow admin full access to members table and details tables
CREATE POLICY "admin_all_members" ON public.members
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'email') LIKE '%@ibmssp.org.ng' OR (auth.jwt() ->> 'email') = 'admin@ibmssp.org.ng')
  WITH CHECK ((auth.jwt() ->> 'email') LIKE '%@ibmssp.org.ng' OR (auth.jwt() ->> 'email') = 'admin@ibmssp.org.ng');

CREATE POLICY "admin_all_student_details" ON public.student_details
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'email') LIKE '%@ibmssp.org.ng' OR (auth.jwt() ->> 'email') = 'admin@ibmssp.org.ng')
  WITH CHECK ((auth.jwt() ->> 'email') LIKE '%@ibmssp.org.ng' OR (auth.jwt() ->> 'email') = 'admin@ibmssp.org.ng');

CREATE POLICY "admin_all_graduate_details" ON public.graduate_details
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'email') LIKE '%@ibmssp.org.ng' OR (auth.jwt() ->> 'email') = 'admin@ibmssp.org.ng')
  WITH CHECK ((auth.jwt() ->> 'email') LIKE '%@ibmssp.org.ng' OR (auth.jwt() ->> 'email') = 'admin@ibmssp.org.ng');

CREATE POLICY "admin_all_professional_details" ON public.professional_details
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'email') LIKE '%@ibmssp.org.ng' OR (auth.jwt() ->> 'email') = 'admin@ibmssp.org.ng')
  WITH CHECK ((auth.jwt() ->> 'email') LIKE '%@ibmssp.org.ng' OR (auth.jwt() ->> 'email') = 'admin@ibmssp.org.ng');

CREATE POLICY "admin_all_organization_details" ON public.organization_details
  FOR ALL
  TO authenticated
  USING ((auth.jwt() ->> 'email') LIKE '%@ibmssp.org.ng' OR (auth.jwt() ->> 'email') = 'admin@ibmssp.org.ng')
  WITH CHECK ((auth.jwt() ->> 'email') LIKE '%@ibmssp.org.ng' OR (auth.jwt() ->> 'email') = 'admin@ibmssp.org.ng');
