
'use client';
import { AuthProvider, useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { Briefcase, LayoutDashboard, LogOut, Loader2, Lightbulb, Award, Star, Menu } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            {/* Desktop Sidebar */}
            <nav className="hidden w-64 border-r bg-muted/40 p-4 md:flex md:flex-col">
                <h2 className="mb-8 text-2xl font-bold">Admin Panel</h2>
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
                     <li>
                        <Button variant={pathname === '/admin/projects' ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
                            <Link href="/admin/projects"><Lightbulb className="mr-2 h-4 w-4" /> Projects</Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant={pathname === '/admin/certificates' ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
                            <Link href="/admin/certificates"><Award className="mr-2 h-4 w-4" /> Certificates</Link>
                        </Button>
                    </li>
                    <li>
                        <Button variant={pathname === '/admin/reviews' ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
                            <Link href="/admin/reviews"><Star className="mr-2 h-4 w-4" /> Reviews</Link>
                        </Button>
                    </li>
                </ul>
                <div className="">
                   <Button variant="outline" onClick={handleLogout} className="w-full justify-start">
                       <LogOut className="mr-2 h-4 w-4" /> Logout
                   </Button>
                </div>
            </nav>

            {/* Mobile Layout */}
            <div className="flex flex-col flex-1">
                <header className="flex h-16 items-center justify-between border-b px-4 md:hidden">
                    <Link href="/admin/dashboard" className="text-xl font-bold">Admin</Link>
                    <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[280px] sm:w-[320px] p-6 flex flex-col">
                            <h2 className="mb-8 text-2xl font-bold">Admin Menu</h2>
                            <nav className="flex-grow">
                                <ul className="space-y-2">
                                    <li>
                                        <Button variant={pathname === '/admin/dashboard' ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
                                            <Link href="/admin/dashboard" onClick={() => setMobileMenuOpen(false)}><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>
                                        </Button>
                                    </li>
                                    <li>
                                        <Button variant={pathname === '/admin/experience' ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
                                            <Link href="/admin/experience" onClick={() => setMobileMenuOpen(false)}><Briefcase className="mr-2 h-4 w-4" /> Experience</Link>
                                        </Button>
                                    </li>
                                    <li>
                                        <Button variant={pathname === '/admin/projects' ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
                                            <Link href="/admin/projects" onClick={() => setMobileMenuOpen(false)}><Lightbulb className="mr-2 h-4 w-4" /> Projects</Link>
                                        </Button>
                                    </li>
                                    <li>
                                        <Button variant={pathname === '/admin/certificates' ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
                                            <Link href="/admin/certificates" onClick={() => setMobileMenuOpen(false)}><Award className="mr-2 h-4 w-4" /> Certificates</Link>
                                        </Button>
                                    </li>
                                    <li>
                                        <Button variant={pathname === '/admin/reviews' ? 'secondary' : 'ghost'} className="w-full justify-start" asChild>
                                            <Link href="/admin/reviews" onClick={() => setMobileMenuOpen(false)}><Star className="mr-2 h-4 w-4" /> Reviews</Link>
                                        </Button>
                                    </li>
                                </ul>
                            </nav>
                            <Button variant="outline" onClick={handleLogout} className="w-full justify-start mt-auto">
                                <LogOut className="mr-2 h-4 w-4" /> Logout
                            </Button>
                        </SheetContent>
                    </Sheet>
                </header>
                <main className="flex-1 p-4 md:p-8 overflow-auto">
                    {children}
                </main>
            </div>
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
