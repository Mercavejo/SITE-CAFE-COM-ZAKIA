import { Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-bg-secondary border-t border-border-color py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Café com Zakia</h4>
            <ul className="space-y-2 text-text-secondary">
              <li>
                <a
                  href="https://wa.me/5517996240418"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zakia-maroon-light transition-colors"
                >
                  📱 WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@cafecomzakia.com.br"
                  className="hover:text-zakia-maroon-light transition-colors"
                >
                  📧 contato@cafecomzakia.com.br
                </a>
              </li>
              <li>📍 Catanduva - SP</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Redes Sociais</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.youtube.com/@cafecomzakia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-secondary hover:text-zakia-maroon-light transition-colors"
                >
                  <span className="text-red-500">▶</span>
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a
                  href="https://open.spotify.com/show/5HEziKX3xOOfV7eryMZ91v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-secondary hover:text-zakia-maroon-light transition-colors"
                >
                  <span className="text-green-500">♫</span>
                  <span>Spotify</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/cafecomzakia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-text-secondary hover:text-zakia-maroon-light transition-colors"
                >
                  <span className="text-pink-500">📷</span>
                  <span>Instagram</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional */}
          <div>
            <h4 className="font-semibold mb-4">Produzido por</h4>
            <div className="mb-3">
              <div className="text-mercavejo-gold font-bold tracking-wider">MERCAVEJO</div>
              <div className="text-sm text-text-secondary">Agência de Marketing & Estúdio</div>
            </div>
            <a
              href="https://www.mercavejo.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-secondary hover:text-mercavejo-gold transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>www.mercavejo.com.br</span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border-color text-center text-text-secondary text-sm">
          <p className="mb-2">© 2025 Café com Zakia. Todos os direitos reservados.</p>
          <p>Powered by Mercavejo — Direção criativa para marcas com propósito.</p>
        </div>
      </div>
    </footer>
  );
}
