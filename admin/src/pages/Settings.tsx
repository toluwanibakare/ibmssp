import React, { useEffect, useState } from 'react';
import { User, Globe, Key, LogOut, UserPlus, ShieldCheck, Pencil, Trash2, X, Check, RefreshCw } from 'lucide-react';
import { useAuth, PAGE_PERMISSIONS } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { callEdgeFunction } from '@/lib/supabase';

const SUPER_ADMIN_EMAIL = 'admin@ibmssp.org.ng';
const ALL_PERMISSIONS = Object.keys(PAGE_PERMISSIONS);

const SUPABASE_INTEGRATION_SETTINGS_KEY = 'ibmssp_admin_supabase_integration_settings';
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';

const defaultIntegrationSettings = {
  webhookUrl: SUPABASE_URL ? `${SUPABASE_URL.replace(/\/$/, '')}/functions/v1/register` : '/functions/v1/register',
  requiredHeaderName: 'x-api-key',
  requiredHeaderValue: 'ibmssp_admin_secret_key_2025',
};

export default function Settings() {
  const { user, logout } = useAuth();
  const [webhookUrl, setWebhookUrl] = useState(defaultIntegrationSettings.webhookUrl);
  const [requiredHeaderName, setRequiredHeaderName] = useState(defaultIntegrationSettings.requiredHeaderName);
  const [requiredHeaderValue, setRequiredHeaderValue] = useState(defaultIntegrationSettings.requiredHeaderValue);
  const [saveMessage, setSaveMessage] = useState('');
  const [paystackMode, setPaystackMode] = useState<'test' | 'live'>('test');
  const [paystackSaveMessage, setPaystackSaveMessage] = useState('');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<'admin' | 'editor'>('editor');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [createUserLoading, setCreateUserLoading] = useState(false);
  const [createUserMessage, setCreateUserMessage] = useState('');
  const [admins, setAdmins] = useState<Array<{ id: string; name: string; email: string; role: string; permissions: string[] }>>([]);
  const [adminsLoading, setAdminsLoading] = useState(true);
  const [editingAdminId, setEditingAdminId] = useState<string | null>(null);
  const [editingRole, setEditingRole] = useState<'admin' | 'editor'>('editor');
  const [editingPermissions, setEditingPermissions] = useState<string[]>([]);
  const [adminsMessage, setAdminsMessage] = useState('');
  const [removingId, setRemovingId] = useState<string | null>(null);

  const fetchAdmins = async () => {
    setAdminsLoading(true);
    try {
      const { data: profiles, error: profErr } = await supabase.from('profiles').select('id, name, email');
      if (profErr) throw profErr;
      const { data: roles, error: rolesErr } = await supabase.from('user_roles').select('user_id, role, permissions');
      if (rolesErr) throw rolesErr;
      const roleMap = new Map((roles || []).map(r => [r.user_id, r]));
      const merged = (profiles || [])
        .filter(p => roleMap.has(p.id) || p.email === SUPER_ADMIN_EMAIL)
        .map(p => {
          const roleRow = roleMap.get(p.id);
          return {
            id: p.id,
            name: p.name,
            email: p.email,
            role: roleRow?.role || 'admin',
            permissions: roleRow?.permissions || [],
          };
        });
      setAdmins(merged);
    } catch (err: any) {
      setAdminsMessage(err.message || 'Failed to load admin users.');
    } finally {
      setAdminsLoading(false);
    }
  };

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SUPABASE_INTEGRATION_SETTINGS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<typeof defaultIntegrationSettings>;
      if (typeof parsed.webhookUrl === 'string') setWebhookUrl(parsed.webhookUrl);
      if (typeof parsed.requiredHeaderName === 'string') setRequiredHeaderName(parsed.requiredHeaderName);
      if (typeof parsed.requiredHeaderValue === 'string') setRequiredHeaderValue(parsed.requiredHeaderValue);
    } catch { }
    const fetchPaystackMode = async () => {
      const { data } = await supabase.from('app_settings').select('setting_value').eq('setting_key', 'paystack_mode').single();
      if (data && typeof data.setting_value === 'string') setPaystackMode(data.setting_value as 'test' | 'live');
    };
    fetchPaystackMode();
    fetchAdmins();
  }, []);

  const savePaystackMode = async (mode: 'test' | 'live') => {
    setPaystackMode(mode);
    await supabase.from('app_settings').upsert({ setting_key: 'paystack_mode', setting_value: `"${mode}"` });
    setPaystackSaveMessage('Paystack mode updated successfully.');
    setTimeout(() => setPaystackSaveMessage(''), 2500);
  };

  const saveIntegrationSettings = () => {
    const payload = { webhookUrl: webhookUrl.trim() || defaultIntegrationSettings.webhookUrl, requiredHeaderName: requiredHeaderName.trim() || defaultIntegrationSettings.requiredHeaderName, requiredHeaderValue: requiredHeaderValue.trim() || defaultIntegrationSettings.requiredHeaderValue };
    localStorage.setItem(SUPABASE_INTEGRATION_SETTINGS_KEY, JSON.stringify(payload));
    setWebhookUrl(payload.webhookUrl); setRequiredHeaderName(payload.requiredHeaderName); setRequiredHeaderValue(payload.requiredHeaderValue);
    setSaveMessage('Supabase registration settings saved.');
    window.setTimeout(() => setSaveMessage(''), 2500);
  };

  const resetIntegrationSettings = () => {
    setWebhookUrl(defaultIntegrationSettings.webhookUrl); setRequiredHeaderName(defaultIntegrationSettings.requiredHeaderName); setRequiredHeaderValue(defaultIntegrationSettings.requiredHeaderValue);
    localStorage.setItem(SUPABASE_INTEGRATION_SETTINGS_KEY, JSON.stringify(defaultIntegrationSettings));
    setSaveMessage('Supabase registration settings reset to defaults.');
    window.setTimeout(() => setSaveMessage(''), 2500);
  };

  const togglePermission = (perm: string) => {
    setSelectedPermissions(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]);
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail || !newUserPassword) { setCreateUserMessage('All fields are required.'); return; }
    if (selectedPermissions.length === 0) { setCreateUserMessage('Select at least one page access.'); return; }
    setCreateUserLoading(true);
    setCreateUserMessage('');
    try {
      await callEdgeFunction('create-admin-user', { name: newUserName, email: newUserEmail, password: newUserPassword, role: newUserRole, permissions: selectedPermissions });
      try {
        const credsText = `Your IBMSSP admin account has been created.\n\nEmail: ${newUserEmail}\nPassword: ${newUserPassword}\n\nPlease log in and change your password.`;
        await callEdgeFunction('send-email', { type: 'new_admin_account', to: newUserEmail, name: newUserName, subject: 'Your IBMSSP Admin Account', content: credsText });
        const adminSubject = 'New Admin User Created';
        const adminContent = `A new admin user has been created.\n\nName: ${newUserName}\nEmail: ${newUserEmail}\nRole: ${newUserRole}\nAccess: ${selectedPermissions.join(', ')}\n\nYou can manage this user from the Settings page.`;
        await callEdgeFunction('send-email', { type: 'admin_notification', to: SUPER_ADMIN_EMAIL, name: user?.name || 'Admin', subject: adminSubject, content: adminContent });
      } catch (emailErr: any) {
        console.warn('Notification email failed (user was still created):', emailErr?.message || emailErr);
      }
      setCreateUserMessage(`User ${newUserName} created successfully.`);
      setNewUserName(''); setNewUserEmail(''); setNewUserPassword(''); setSelectedPermissions([]); setShowCreateUser(false);
      fetchAdmins();
    } catch (err: any) {
      setCreateUserMessage(err.message || 'Failed to create user.');
    } finally {
      setCreateUserLoading(false);
    }
  };

  const startEditAdmin = (a: { id: string; role: string; permissions: string[] }) => {
    setEditingAdminId(a.id);
    setEditingRole(a.role === 'admin' ? 'admin' : 'editor');
    setEditingPermissions(a.permissions || []);
    setAdminsMessage('');
  };

  const cancelEditAdmin = () => {
    setEditingAdminId(null);
    setEditingPermissions([]);
    setAdminsMessage('');
  };

  const toggleEditingPermission = (perm: string) => {
    setEditingPermissions(prev => prev.includes(perm) ? prev.filter(p => p !== perm) : [...prev, perm]);
  };

  const saveEditAdmin = async (adminId: string) => {
    setAdminsMessage('');
    try {
      const { error } = await supabase.from('user_roles').update({ role: editingRole, permissions: editingPermissions }).eq('user_id', adminId);
      if (error) throw error;
      setAdminsMessage('Admin updated successfully.');
      setEditingAdminId(null);
      fetchAdmins();
      window.setTimeout(() => setAdminsMessage(''), 2500);
    } catch (err: any) {
      setAdminsMessage(err.message || 'Failed to update admin.');
    }
  };

  const removeAdmin = async (adminId: string, adminName: string) => {
    if (!window.confirm(`Remove ${adminName} from admin users? This cannot be undone.`)) return;
    setRemovingId(adminId);
    setAdminsMessage('');
    try {
      await callEdgeFunction('delete-admin-user', { user_id: adminId });
      setAdminsMessage(`${adminName} removed successfully.`);
      fetchAdmins();
      window.setTimeout(() => setAdminsMessage(''), 2500);
    } catch (err: any) {
      setAdminsMessage(err.message || 'Failed to remove admin.');
    } finally {
      setRemovingId(null);
    }
  };

  const isMessageSuccess = (msg: string) => msg.includes('successfully') || msg.includes('created');

  return (
    <div className="space-y-5">
      <div><h1 className="page-title">Settings</h1><p className="page-subtitle">Manage your IBMSSP admin account</p></div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-card rounded-xl border border-border shadow-card p-5">
            <div className="flex items-center gap-2 mb-4"><User size={15} className="text-muted-foreground" /><h2 className="text-sm font-semibold">Account Profile</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5"><label className="text-xs font-medium">Full Name</label><input defaultValue={user?.name || ''} className="input-field" readOnly /></div>
              <div className="space-y-1.5"><label className="text-xs font-medium">Email Address</label><input type="email" defaultValue={user?.email || ''} className="input-field" readOnly /></div>
            </div>
            <div className="space-y-1.5 mt-4"><label className="text-xs font-medium">Role</label><input value={user?.role || 'admin'} readOnly className="input-field bg-muted/50 text-muted-foreground cursor-not-allowed capitalize" /></div>
          </div>
          <div className="bg-card rounded-xl border border-border shadow-card p-5">
            <div className="flex items-center gap-2 mb-4"><Globe size={15} className="text-muted-foreground" /><h2 className="text-sm font-semibold">System Information</h2></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 text-sm">
              {[['Application','IBMSSP ADMIN Registry'],['Version','1.0.0'],['Environment','Production'],['Domain','admin.ibmssp.org.ng'],['Timezone','Africa/Lagos (WAT)'],['Date Format','DD MMM YYYY']].map(([k, v]) => (
                <React.Fragment key={k}><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></React.Fragment>
              ))}
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border shadow-card p-5">
            <div className="flex items-center gap-2 mb-4"><Key size={15} className="text-muted-foreground" /><h2 className="text-sm font-semibold">Supabase Registration Webhook</h2></div>
            <div className="space-y-4 text-sm">
              <div className="space-y-1.5"><label className="text-xs font-medium">Webhook URL</label><input value={webhookUrl} onChange={e => setWebhookUrl(e.target.value)} className="input-field font-mono text-xs" placeholder={`${SUPABASE_URL || 'https://your-project.supabase.co'}/functions/v1/register`} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-3">
                <div className="space-y-1.5"><label className="text-xs font-medium">Required Header Name</label><input value={requiredHeaderName} onChange={e => setRequiredHeaderName(e.target.value)} className="input-field font-mono text-xs" placeholder="x-api-key" /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium">Required Header Value</label><input value={requiredHeaderValue} onChange={e => setRequiredHeaderValue(e.target.value)} className="input-field font-mono text-xs" placeholder="your_registration_api_key" /></div>
              </div>
              <div className="space-y-1"><p className="text-xs font-medium">Header Preview:</p><div className="font-mono text-xs bg-muted/40 px-3 py-2 rounded-lg text-muted-foreground break-all">{(requiredHeaderName || 'x-api-key')}: {(requiredHeaderValue || 'your_registration_api_key')}</div></div>
              <div className="flex flex-col sm:flex-row gap-2">
                <button type="button" onClick={saveIntegrationSettings} className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors">Save Integration Settings</button>
                <button type="button" onClick={resetIntegrationSettings} className="px-3 py-2 rounded-lg border border-border bg-card text-xs font-medium hover:bg-accent/40 transition-colors">Reset Defaults</button>
              </div>
              {saveMessage && <div className="text-xs text-success bg-success/10 border border-success/20 rounded-lg px-3 py-2">{saveMessage}</div>}
              <p className="text-xs text-muted-foreground">Method: <span className="font-semibold text-foreground">POST</span> &nbsp;|&nbsp; Content-Type: <span className="font-semibold text-foreground">application/json</span></p>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border shadow-card p-5">
            <div className="flex items-center gap-2 mb-4"><Key size={15} className="text-muted-foreground" /><h2 className="text-sm font-semibold">Paystack Configuration</h2></div>
            <div className="space-y-4 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div><p className="text-sm font-medium">API Mode</p><p className="text-xs text-muted-foreground mt-1">Switch between Test and Live environments.</p></div>
                <div className="flex bg-muted/30 p-1 rounded-lg border border-border">
                  <button type="button" onClick={() => savePaystackMode('test')} className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${paystackMode === 'test' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Test Mode</button>
                  <button type="button" onClick={() => savePaystackMode('live')} className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${paystackMode === 'live' ? 'bg-success text-success-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Live Mode</button>
                </div>
              </div>
              {paystackSaveMessage && <div className="text-xs text-success bg-success/10 border border-success/20 rounded-lg px-3 py-2 mt-2">{paystackSaveMessage}</div>}
            </div>
          </div>
          <div className="bg-card rounded-xl border border-destructive/20 shadow-card p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div><h2 className="text-sm font-semibold text-destructive">Sign Out</h2><p className="text-xs text-muted-foreground mt-0.5">Sign out of the IBMSSP admin panel</p></div>
              <button onClick={logout} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive text-sm font-medium hover:bg-destructive/10 transition-colors sm:self-auto self-start"><LogOut size={13} /> Sign Out</button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="bg-card rounded-xl border border-border shadow-card p-5 sticky top-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2"><UserPlus size={15} className="text-muted-foreground" /><h2 className="text-sm font-semibold">Create User</h2></div>
              <button type="button" onClick={() => setShowCreateUser(!showCreateUser)} className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors">{showCreateUser ? 'Cancel' : 'Add User'}</button>
            </div>
            {showCreateUser && (
              <form onSubmit={createUser} className="space-y-4">
                <div className="space-y-1.5"><label className="text-xs font-medium">Full Name</label><input type="text" value={newUserName} onChange={e => setNewUserName(e.target.value)} className="input-field" placeholder="John Doe" required /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium">Email</label><input type="email" value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} className="input-field" placeholder="john@example.com" required /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium">Password</label><input type="password" value={newUserPassword} onChange={e => setNewUserPassword(e.target.value)} className="input-field" placeholder="Min 8 characters" required /></div>
                <div className="space-y-1.5"><label className="text-xs font-medium">Role</label><select value={newUserRole} onChange={e => setNewUserRole(e.target.value as 'admin' | 'editor')} className="input-field"><option value="admin">Admin</option><option value="editor">Editor</option></select></div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Page Access</label>
                  <div className="grid grid-cols-2 gap-1 max-h-48 overflow-y-auto border border-border rounded-lg p-2">
                    {ALL_PERMISSIONS.map(perm => (
                      <label key={perm} className="flex items-center gap-1 text-xs cursor-pointer hover:bg-muted/30 px-1 py-0.5 rounded">
                        <input type="checkbox" checked={selectedPermissions.includes(perm)} onChange={() => togglePermission(perm)} className="h-3 w-3 rounded" />
                        <span className="capitalize">{PAGE_PERMISSIONS[perm]}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <button type="submit" disabled={createUserLoading} className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60">{createUserLoading ? 'Creating...' : 'Create User'}</button>
                {createUserMessage && <div className={`text-xs rounded-lg px-3 py-2 ${isMessageSuccess(createUserMessage) ? 'text-success bg-success/10 border border-success/20' : 'text-destructive bg-destructive/10 border border-destructive/20'}`}>{createUserMessage}</div>}
              </form>
            )}
          </div>

          <div className="bg-card rounded-xl border border-border shadow-card p-5 mt-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2"><ShieldCheck size={15} className="text-muted-foreground" /><h2 className="text-sm font-semibold">Admin Users</h2><span className="text-xs text-muted-foreground">{admins.length}</span></div>
              <button type="button" onClick={fetchAdmins} className="p-1.5 rounded-lg border border-border text-muted-foreground hover:bg-accent/40 transition-colors" title="Refresh"><RefreshCw size={13} /></button>
            </div>

            {adminsMessage && <div className={`text-xs rounded-lg px-3 py-2 mb-3 ${isMessageSuccess(adminsMessage) ? 'text-success bg-success/10 border border-success/20' : 'text-destructive bg-destructive/10 border border-destructive/20'}`}>{adminsMessage}</div>}

            {adminsLoading ? (
              <div className="text-center py-8 text-muted-foreground text-sm">Loading admin users...</div>
            ) : admins.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">No admin users found.</div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {admins.map(a => (
                  <div key={a.id} className={`rounded-lg border border-border p-3 ${editingAdminId === a.id ? 'bg-accent/20' : 'bg-card'}`}>
                    {editingAdminId === a.id ? (
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{a.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{a.email}</p>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <button type="button" onClick={() => saveEditAdmin(a.id)} className="p-1.5 rounded-lg bg-success/10 text-success hover:bg-success/20 transition-colors" title="Save"><Check size={13} /></button>
                            <button type="button" onClick={cancelEditAdmin} className="p-1.5 rounded-lg bg-muted/40 text-muted-foreground hover:bg-muted/60 transition-colors" title="Cancel"><X size={13} /></button>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium">Role</label>
                          <select value={editingRole} onChange={e => setEditingRole(e.target.value as 'admin' | 'editor')} className="input-field mt-1"><option value="admin">Admin</option><option value="editor">Editor</option></select>
                        </div>
                        <div>
                          <label className="text-xs font-medium">Page Access</label>
                          <div className="grid grid-cols-2 gap-1 max-h-40 overflow-y-auto border border-border rounded-lg p-2 mt-1">
                            {ALL_PERMISSIONS.map(perm => (
                              <label key={perm} className="flex items-center gap-1 text-xs cursor-pointer hover:bg-muted/30 px-1 py-0.5 rounded">
                                <input type="checkbox" checked={editingPermissions.includes(perm)} onChange={() => toggleEditingPermission(perm)} className="h-3 w-3 rounded" />
                                <span className="capitalize">{PAGE_PERMISSIONS[perm]}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate flex items-center gap-1.5">{a.name} {a.email === SUPER_ADMIN_EMAIL && <span className="text-[10px] font-semibold uppercase tracking-wide text-primary bg-primary/10 px-1.5 py-0.5 rounded">Super</span>}</p>
                          <p className="text-xs text-muted-foreground truncate">{a.email}</p>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            <span className="text-[10px] font-semibold uppercase tracking-wide text-primary bg-primary/10 px-1.5 py-0.5 rounded capitalize">{a.role}</span>
                            {a.permissions.slice(0, 3).map(p => <span key={p} className="text-[10px] bg-muted/40 text-muted-foreground px-1.5 py-0.5 rounded">{PAGE_PERMISSIONS[p] || p}</span>)}
                            {a.permissions.length > 3 && <span className="text-[10px] bg-muted/40 text-muted-foreground px-1.5 py-0.5 rounded">+{a.permissions.length - 3}</span>}
                          </div>
                        </div>
                        {a.email !== SUPER_ADMIN_EMAIL && (
                          <div className="flex gap-1 shrink-0">
                            <button type="button" onClick={() => startEditAdmin(a)} className="p-1.5 rounded-lg border border-border text-muted-foreground hover:bg-accent/40 transition-colors" title="Edit"><Pencil size={13} /></button>
                            <button type="button" onClick={() => removeAdmin(a.id, a.name)} disabled={removingId === a.id} className="p-1.5 rounded-lg border border-destructive/20 text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50" title="Remove"><Trash2 size={13} /></button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}