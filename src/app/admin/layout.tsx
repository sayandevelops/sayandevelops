'use client';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { Briefcase, LayoutDashboard, LogOut, Loader2 } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user && pathname !== '/admin/login') {
            router.push('/admin/login');
        }
    }, [user, loading, router, pathname]);

    const handleLogout = async () => {
        await auth.signOut();
        router.push('/admin/login');
    };

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (loading || !user) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p className="ml-2">Loading session...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <nav className="hidden w-64 border-r bg-muted/40 p-4 md:flex md:flex-col">
                <h2 className="mb-8 text-2xl font-bold">Admin</h2>
                <ul className="space-y-2 flex-grow">
                    <li>
                        <Button variant={pathname === '/admin/dashboard' ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
                            <Link href="/admin/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant={pathname === '/admin/experience' ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
                            <Link href="/admin/experience"><Briefcase className="mr-2 h-4 w-4" /> Experience</Link>
                        </Button>
                    </li>
                </ul>
                <div className="">
                   <Button variant="outline" onClick={handleLogout} className="w-full justify-start">
                       <LogOut className="mr-2 h-4 w-4" /> Logout
                   </Button>
                </div>
            </nav>
            <main className="flex-1 p-4 md:p-8 overflow-auto">
                {children}
            </main>
        </div>
    );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
      <Toaster />
    </AuthProvider>
  );
}
