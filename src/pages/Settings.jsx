import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Shield,
    Camera,
    CheckCircle2,
    Trash2,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { clsx } from 'clsx';
import SEO from '../components/common/SEO';
import { useAuth } from '../context/AuthContext';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from 'firebase/auth';
import { auth, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Settings = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    // Profile state
    const displayName = user?.displayName || user?.email?.split('@')[0] || '';
    const [profileName, setProfileName] = useState(displayName);
    const [profileSaving, setProfileSaving] = useState(false);
    const [profileSaved, setProfileSaved] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(user?.photoURL || null);
    const fileInputRef = useRef(null);

    // Security state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordSaving, setPasswordSaving] = useState(false);
    const [passwordMsg, setPasswordMsg] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState('');
    const [deleteError, setDeleteError] = useState('');

    const handleAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;
        try {
            if (storage) {
                const storageRef = ref(storage, `avatars/${user.uid}`);
                await uploadBytes(storageRef, file);
                const url = await getDownloadURL(storageRef);
                await updateProfile(auth.currentUser, { photoURL: url });
                setAvatarUrl(url);
            } else {
                setAvatarUrl(URL.createObjectURL(file));
            }
        } catch (err) {
            console.error('Avatar upload error:', err);
        }
    };

    const handleProfileSave = async () => {
        if (!user) return;
        setProfileSaving(true);
        try {
            await updateProfile(auth.currentUser, { displayName: profileName });
            setProfileSaved(true);
            setTimeout(() => setProfileSaved(false), 2500);
        } catch (err) {
            console.error('Profile save error:', err);
        } finally {
            setProfileSaving(false);
        }
    };

    const handlePasswordChange = async () => {
        setPasswordMsg(null);
        if (newPassword !== confirmPassword) {
            setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
            return;
        }
        if (newPassword.length < 6) {
            setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters.' });
            return;
        }
        setPasswordSaving(true);
        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, newPassword);
            setPasswordMsg({ type: 'success', text: 'Password updated successfully.' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setPasswordMsg({ type: 'error', text: 'Current password is incorrect.' });
        } finally {
            setPasswordSaving(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (!user) return;
        setDeleteError('');
        try {
            const credential = EmailAuthProvider.credential(user.email, deleteConfirm);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await deleteUser(auth.currentUser);
        } catch (err) {
            setDeleteError('Password is incorrect. Please try again.');
        }
    };

    const sidebarItems = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20">
            <SEO
                title="Settings"
                description="Manage your Hyperplott account settings, update your profile, and change your password."
                keywords="account settings, profile, password change"
                url="https://hyperplott.com/settings"
            />
            <div className="px-4">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Settings</h1>
                <p className="text-slate-500 font-medium">Manage your account and security preferences.</p>
            </div>

            <div className="flex gap-8 px-4">
                {/* Sidebar Navigation */}
                <div className="w-48 shrink-0 space-y-1">
                    {sidebarItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={clsx(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                                activeTab === item.id
                                    ? "bg-primary-purple text-white shadow-lg shadow-primary-purple/20"
                                    : "text-slate-400 hover:text-slate-700 hover:bg-slate-50"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Main Content */}
                <div className="flex-1 min-h-[500px]">
                    <AnimatePresence mode="wait">

                        {/* ── Profile Tab ── */}
                        {activeTab === 'profile' && (
                            <motion.div key="profile" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-6">
                                <Card className="p-8 border border-slate-100 shadow-sm bg-white rounded-2xl">
                                    <h2 className="text-xl font-black text-slate-900 mb-8">Your Profile</h2>

                                    {/* Avatar */}
                                    <div className="flex items-center gap-6 mb-8">
                                        <div className="relative group/avatar shrink-0">
                                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-purple to-primary overflow-hidden border-2 border-white shadow-lg flex items-center justify-center">
                                                {avatarUrl ? (
                                                    <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-2xl font-black text-white">
                                                        {(profileName || user?.email || 'U').slice(0, 2).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="absolute -bottom-2 -right-2 p-2 bg-primary-purple text-white rounded-xl shadow-lg group-hover/avatar:scale-110 transition-transform"
                                            >
                                                <Camera className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-900">{profileName || user?.email}</p>
                                            <p className="text-xs text-slate-400">{user?.email}</p>
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="mt-2 text-xs font-bold text-primary-purple hover:underline"
                                            >
                                                Change photo
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500">Display Name</label>
                                            <input
                                                value={profileName}
                                                onChange={e => setProfileName(e.target.value)}
                                                className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 ring-primary-purple/20 border border-slate-100"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500">Email Address</label>
                                            <input
                                                value={user?.email || ''}
                                                readOnly
                                                className="w-full bg-slate-100 rounded-xl px-4 py-3 text-sm font-medium outline-none text-slate-400 cursor-not-allowed border border-slate-100"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-end gap-4 mt-6 pt-6 border-t border-slate-50">
                                        {profileSaved && (
                                            <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-bold">
                                                <CheckCircle2 className="w-4 h-4" /> Saved!
                                            </span>
                                        )}
                                        <Button onClick={handleProfileSave} disabled={profileSaving} className="px-8 h-11">
                                            {profileSaving ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                        {/* ── Security Tab ── */}
                        {activeTab === 'security' && (
                            <motion.div key="security" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="space-y-6">

                                {/* Change Password */}
                                <Card className="p-8 border border-slate-100 shadow-sm bg-white rounded-2xl">
                                    <h2 className="text-xl font-black text-slate-900 mb-2">Change Password</h2>
                                    <p className="text-sm text-slate-400 mb-6">Enter your current password and choose a new one.</p>
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-500">Current Password</label>
                                            <input
                                                type="password"
                                                value={currentPassword}
                                                onChange={e => setCurrentPassword(e.target.value)}
                                                placeholder="Enter current password"
                                                className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 ring-primary-purple/20 border border-slate-100"
                                            />
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500">New Password</label>
                                                <input
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={e => setNewPassword(e.target.value)}
                                                    placeholder="At least 6 characters"
                                                    className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 ring-primary-purple/20 border border-slate-100"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={e => setConfirmPassword(e.target.value)}
                                                    placeholder="Repeat new password"
                                                    className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 ring-primary-purple/20 border border-slate-100"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {passwordMsg && (
                                        <p className={clsx("mt-4 text-sm font-bold", passwordMsg.type === 'success' ? 'text-emerald-600' : 'text-red-500')}>
                                            {passwordMsg.text}
                                        </p>
                                    )}
                                    <div className="flex justify-end mt-6 pt-6 border-t border-slate-50">
                                        <Button onClick={handlePasswordChange} disabled={passwordSaving} className="px-8 h-11">
                                            {passwordSaving ? 'Updating...' : 'Update Password'}
                                        </Button>
                                    </div>
                                </Card>

                                {/* Delete Account */}
                                <Card className="p-8 border border-red-100 shadow-sm bg-white rounded-2xl">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                                            <Trash2 className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-xl font-black text-slate-900 mb-1">Delete Account</h2>
                                            <p className="text-sm text-slate-400 mb-6">This will permanently delete your account and all your data. This cannot be undone.</p>
                                            <div className="space-y-1.5 mb-4">
                                                <label className="text-xs font-bold text-slate-500">Enter your password to confirm</label>
                                                <input
                                                    type="password"
                                                    value={deleteConfirm}
                                                    onChange={e => { setDeleteConfirm(e.target.value); setDeleteError(''); }}
                                                    placeholder="Your current password"
                                                    className="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 ring-red-200 border border-red-100"
                                                />
                                            </div>
                                            {deleteError && <p className="text-sm font-bold text-red-500 mb-4">{deleteError}</p>}
                                            <button
                                                onClick={handleDeleteAccount}
                                                disabled={!deleteConfirm}
                                                className="h-11 px-8 bg-red-600 text-white font-black text-sm rounded-xl hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                Delete My Account
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )}

                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Settings;
