import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, Mail, Phone, Briefcase, FileText, Clock, CheckCircle, XCircle, Download, Trash2 } from 'lucide-react';

interface Facilitator {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  competence: string;
  cv_file_url: string | null;
  cv_file_name: string | null;
  status: string;
  created_at: string;
}

export default function Facilitators() {
  const [facilitators, setFacilitators] = useState<Facilitator[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchFacilitators();
  }, []);

  const fetchFacilitators = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('facilitators')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setFacilitators(data || []);
    } catch (err) {
      console.error('Failed to fetch facilitators:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      const { error } = await supabase
        .from('facilitators')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) throw error;
      setFacilitators(facilitators.map(f => f.id === id ? { ...f, status } : f));
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const deleteFacilitator = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this facilitator application?')) return;
    try {
      const { error } = await supabase.from('facilitators').delete().eq('id', id);
      if (error) throw error;
      setFacilitators(facilitators.filter(f => f.id !== id));
    } catch (err) {
      console.error('Failed to delete:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 size={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Facilitator Applications</h1>
        <p className="text-sm text-muted-foreground">{facilitators.length} applications</p>
      </div>

      <div className="grid gap-4">
        {facilitators.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No facilitator applications yet.</div>
        ) : (
          facilitators.map((f) => (
            <div key={f.id} className="border rounded-lg p-4 bg-card">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{f.first_name} {f.last_name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      f.status === 'approved' ? 'bg-green-100 text-green-800' :
                      f.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {f.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Mail size={14} /> {f.email}</span>
                    <span className="flex items-center gap-1"><Phone size={14} /> {f.phone}</span>
                  </div>
                  <p className="text-sm"><strong>Competence:</strong> {f.competence}</p>
                  <p className="text-xs text-muted-foreground">Applied: {new Date(f.created_at).toLocaleDateString()}</p>
                  {f.cv_file_url && (
                    <a href={f.cv_file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline text-sm mt-1">
                      <FileText size={14} /> Download CV ({f.cv_file_name})
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  {f.status !== 'approved' && (
                    <button onClick={() => updateStatus(f.id, 'approved')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Approve">
                      <CheckCircle size={18} />
                    </button>
                  )}
                  {f.status !== 'rejected' && (
                    <button onClick={() => updateStatus(f.id, 'rejected')} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Reject">
                      <XCircle size={18} />
                    </button>
                  )}
                  <button onClick={() => deleteFacilitator(f.id)} className="p-2 text-destructive hover:bg-destructive/5 rounded-lg" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
