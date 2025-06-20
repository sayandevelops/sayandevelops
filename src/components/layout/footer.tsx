
import Link from "next/link"
import { Github, Linkedin, Youtube, Heart } from "lucide-react"

const socialLinks = [
  { href: "https://github.com/sayandevelops", label: "GitHub", icon: Github },
  { href: "https://www.linkedin.com/in/sayandevelops/", label: "LinkedIn", icon: Linkedin },
  { href: "https://youtube.com/@hustlewithsayan?si=Q_WmnhAiqcxMO-g8", label: "YouTube", icon: Youtube },
]

const quickLinks = [
  { href: "/#skills", label: "Skills" },
  { href: "/#services", label: "Services" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
  { href: "/#certificates", label: "Certificates" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#contact", label: "Contact" },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/60">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">SayanDevelops</h3>
            <p className="text-sm text-muted-foreground">
              Web Developer | Programmer | Tech Enthusiast
            </p>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold mb-3">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center">
            Built with <Heart className="w-4 h-4 mx-1 text-red-500 fill-red-500" /> by Sayan Mondal.
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} SayanDevelops. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

    