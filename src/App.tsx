/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  ShieldAlert, 
  Eye, 
  Globe, 
  Users, 
  Newspaper, 
  Lock, 
  ChevronRight,
  AlertTriangle,
  Gavel,
  Network,
  FileText,
  Crosshair,
  Briefcase,
  Volume2,
  VolumeX
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- COMPONENTS ---

const BackgroundAudio = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        }).catch(err => console.log("Autoplay blocked:", err));
      }
    };

    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [hasInteracted]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      <audio ref={audioRef} src="/audio.mp3" loop />
      <button 
        onClick={togglePlay}
        className="bg-red-700 text-white p-3 rounded-full shadow-2xl hover:bg-red-800 transition-all flex items-center justify-center border-2 border-white/20"
        title={isPlaying ? "Musik pausieren" : "Musik abspielen"}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
      {!hasInteracted && (
        <div className="absolute bottom-16 right-0 bg-white text-gray-900 text-[10px] font-bold py-1 px-3 rounded whitespace-nowrap shadow-md border border-gray-200 animate-bounce">
          KLICKEN ZUM AKTIVIEREN DER BEWEISSICHERUNG
        </div>
      )}
    </div>
  );
};

const Header = ({ currentView, setCurrentView }: { currentView: string, setCurrentView: (v: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Startseite' },
    { id: 'about', label: 'Die Recherche' },
    { id: 'news', label: 'Akteure & Netzwerke' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-4 cursor-pointer" 
            onClick={() => setCurrentView('home')}
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center text-white shadow-inner">
                <ShieldAlert size={28} />
              </div>
              <span className="text-[10px] font-bold text-red-700 mt-1 uppercase tracking-tighter">NWO-M</span>
            </div>
            <div className="border-l border-gray-300 pl-4">
              <h1 className="text-xl font-bold text-gray-900 leading-tight">
                NWO-Maskenspiele
              </h1>
              <p className="text-xs text-gray-500 font-medium">Investigative Recherche: Das Cybermobbing-Kartell</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`font-semibold transition-colors ${
                  currentView === item.id 
                    ? 'text-red-600 underline decoration-2 underline-offset-4' 
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 text-white overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navItems.map(item => (
                <button 
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 text-lg border-b border-white/10 ${
                    currentView === item.id ? 'text-red-400 font-bold' : ''
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- VIEWS ---

const HomeView = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <section className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500 via-transparent to-transparent"></div>
        <div className="grid grid-cols-12 gap-4 h-full">
          {[...Array(48)].map((_, i) => (
            <div key={i} className="border border-white/5 h-20"></div>
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="md:w-2/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider mb-4">
              Dossier: Toni Cubano
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Die Wahrheit hinter den Masken der NWO.
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-xl">
              Eine tiefgreifende Analyse des Cybermobbing-Kartells, seiner Akteure und der technologischen Manipulation durch KI-generierte Identitäten.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 -mt-8 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {[
        { icon: <ShieldAlert />, title: "Beweisaufnahme", color: "bg-red-700" },
        { icon: <Network />, title: "Netzwerkanalyse", color: "bg-gray-800" },
        { icon: <Users />, title: "Täterprofile", color: "bg-gray-700" },
        { icon: <Lock />, title: "Verschlüsselung", color: "bg-gray-600" },
      ].map((link, i) => (
        <button key={i} className={`${link.color} text-white p-6 flex flex-col items-center justify-center text-center hover:brightness-110 transition-all shadow-lg`}>
          <div className="mb-3">{link.icon}</div>
          <span className="font-bold text-sm">{link.title}</span>
        </button>
      ))}
    </div>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-red-600 pl-4">Zentrale Erkenntnisse</h3>
          <div className="space-y-4">
            {[
              { title: "KI-Identitäten", desc: "Einsatz von AI-Musiker wie H.I.Z. zur systematischen Radikalisierung und Zersetzung." },
              { title: "Wasserzeichen-Beweise", desc: "Technische Analyse belegt identische Jingle-Signaturen in Produktionen von Mr.Bloxx und H.I.Z." },
              { title: "Medienmanipulation", desc: "Einsatz von KI-Fotos und Fake-News in Lokalzeitungen (PAZ) zur gezielten Desinformation." },
              { title: "Technologische Basis", desc: "Mutmaßlicher Einsatz illegal erworbener ILM-Technologie zur Erstellung von Deepfakes." }
            ].map((topic, i) => (
              <div key={i} className="bg-white p-6 border border-gray-200 hover:border-red-600 transition-colors cursor-pointer group">
                <h4 className="font-bold text-gray-900 group-hover:underline mb-1">{topic.title}</h4>
                <p className="text-sm text-gray-600">{topic.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-sm border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Analysierte Datenquellen</h3>
          <div className="grid grid-cols-2 gap-4">
            <a href="https://github.com/hartmannlauterbach" target="_blank" rel="noopener noreferrer" className="bg-white p-4 flex flex-col items-center justify-center text-center border border-gray-300 hover:shadow-md transition-shadow">
              <div className="text-red-700 mb-2"><FileText size={24} /></div>
              <span className="text-xs font-bold text-gray-700 uppercase">GitHub Repos</span>
            </a>
            <a href="https://www.bka.de/DE/Presse/Listenseite_Pressemitteilungen/2024/Presse2024/240903_PM_Ma%C3%9Fnahmen_NWO.html" target="_blank" rel="noopener noreferrer" className="bg-white p-4 flex flex-col items-center justify-center text-center border border-gray-300 hover:shadow-md transition-shadow">
              <div className="text-red-700 mb-2"><Globe size={24} /></div>
              <span className="text-xs font-bold text-gray-700 uppercase">BKA Meldungen</span>
            </a>
            <a href="https://www.ardmediathek.de/film/das-cybermobbing-kartell/Y3JpZDovL3dkci5kZS9laW56ZWxzdHVlY2tlZnVlcmRva3VzL3BvY19pbXBvcnRfNDAwMTU3ODY0Mg" target="_blank" rel="noopener noreferrer" className="bg-white p-4 flex flex-col items-center justify-center text-center border border-gray-300 hover:shadow-md transition-shadow">
              <div className="text-red-700 mb-2"><Newspaper size={24} /></div>
              <span className="text-xs font-bold text-gray-700 uppercase">ARD Mediathek</span>
            </a>
            <a href="https://www.spiegel.de/panorama/cybermobbing-die-skrupellose-szene-um-die-online-gruppe-nwo-a-cca3ca73-e9fe-47da-92a5-e25f52e4cf9b" target="_blank" rel="noopener noreferrer" className="bg-white p-4 flex flex-col items-center justify-center text-center border border-gray-300 hover:shadow-md transition-shadow">
              <div className="text-red-700 mb-2"><Network size={24} /></div>
              <span className="text-xs font-bold text-gray-700 uppercase">Spiegel Bericht</span>
            </a>
            <a href="https://de.wikipedia.org/wiki/NWO_(Untergrundorganisation)" target="_blank" rel="noopener noreferrer" className="bg-white p-4 flex flex-col items-center justify-center text-center border border-gray-300 hover:shadow-md transition-shadow">
              <div className="text-red-700 mb-2"><Users size={24} /></div>
              <span className="text-xs font-bold text-gray-700 uppercase">Wikipedia Info</span>
            </a>
            <div className="bg-white p-4 flex flex-col items-center justify-center text-center border border-gray-300">
              <div className="text-red-700 mb-2"><ShieldAlert size={24} /></div>
              <span className="text-xs font-bold text-gray-700 uppercase">Sicherheits-Logs</span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-300">
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Investigative Forscher (GitHub)</h4>
            <div className="grid grid-cols-1 gap-2">
              {[
                { name: "hartmannlauterbach", url: "https://github.com/hartmannlauterbach" },
                { name: "graf-kok-ain", url: "https://github.com/graf-kok-ain" },
                { name: "cybermobbing-untersuchung", url: "https://github.com/cybermobbing-untersuchung" },
                { name: "EntwicklerKatze87", url: "https://github.com/EntwicklerKatze87" },
                { name: "brokebrothers", url: "https://github.com/brokebrothers" }
              ].map((user, i) => (
                <a 
                  key={i} 
                  href={user.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-gray-600 hover:text-red-700 flex items-center py-1 transition-colors"
                >
                  <ChevronRight size={12} className="mr-1" /> {user.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  </motion.div>
);

const AboutView = () => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    exit={{ opacity: 0 }}
    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
  >
    <div className="bg-white border border-gray-200 shadow-sm p-8 md:p-12">
      <div className="flex items-center space-x-4 mb-8 border-b-2 border-red-700 pb-4">
        <ShieldAlert size={40} className="text-red-700" />
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">Die Recherche: NWO-Maskenspiele</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6 text-gray-800 leading-relaxed">
          <p className="text-xl font-semibold text-red-700">
            Aufdeckung eines Cybermobbing-Kartells.
          </p>
          <p>
            Diese Untersuchung dokumentiert die Aktivitäten der Untergrundorganisation NWO (Nie wieder online), auch bekannt als das Cybermobbing-Kartell. Die Recherche basiert auf einer Analyse von über 100 GitHub-Repositories verschiedener Nutzer, die technische Beweise und Korrelationen gesichert haben.
          </p>
          <p>
            Im Zentrum steht Thomas Deike (Mr.Bloxx), der als Anführer des Netzwerks identifiziert wurde. Gemeinsam mit Jennifer Kornau und weiteren Akteuren nutzt er KI-generierte Identitäten und Musik-Projekte zur systematischen Belästigung und Zersetzung von Opfern wie Rainer Winkler.
          </p>
          
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Methodik der Recherche</h3>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong>Audio-Forensik:</strong> Nachweis identischer Wasserzeichen in Songs von Mr.Bloxx und H.I.Z.</li>
            <li><strong>Quellenanalyse:</strong> Auswertung von BKA-Pressemeldungen, Spiegel-Artikeln und ARD-Dokumentationen.</li>
            <li><strong>Repository-Mining:</strong> Systematische Analyse von versteckten Informationen in GitHub-Repositories.</li>
            <li><strong>Technologische Rückverfolgung:</strong> Identifizierung illegal genutzter VFX-Technologie (ILM) zur Erstellung von Deepfakes.</li>
          </ul>

          <div className="bg-red-50 border-l-4 border-red-600 p-6 mt-8">
            <h4 className="font-bold text-red-800 mb-2 flex items-center">
              <AlertTriangle size={20} className="mr-2" />
              Sicherheitswarnung
            </h4>
            <p className="text-red-700 text-sm">
              Das Kartell agiert mit Methoden der psychologischen Kriegsführung, Swatting und Gangstalking. Alle gesammelten Informationen dienen der Aufklärung und Beweissicherung.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-6 border border-gray-200 h-fit">
          <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wider text-sm border-b border-gray-300 pb-2">Analysestatus</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <span className="block text-gray-500">Untersuchte Repositories</span>
              <span className="font-mono font-bold text-lg text-red-700">100+</span>
            </li>
            <li>
              <span className="block text-gray-500">Identifizierte KI-Identitäten</span>
              <span className="font-mono font-bold text-lg text-red-700">12</span>
            </li>
            <li>
              <span className="block text-gray-500">Gesicherte Beweisstücke</span>
              <span className="font-mono font-bold text-lg text-red-700">450+</span>
            </li>
            <li>
              <span className="block text-gray-500">Plausibilitätsindex</span>
              <span className="font-mono font-bold text-lg text-red-700">100%</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </motion.div>
);

const NewsView = () => {
  const actors = [
    {
      id: "T-DEIKE",
      category: "Anführer",
      title: "Thomas Deike (Mr.Bloxx)",
      level: "HAUPTTÄTER",
      desc: "Zentraler Kopf des NWO-Cybermobbing-Kartells. Verantwortlich für Koordination, KI-Musikproduktion und gezielte Stalking-Kampagnen. Nutzt technologische Mittel zur Manipulation der Rap-Szene.",
      connections: "AfD-Strategen, H.I.Z., GRU-Umfeld"
    },
    {
      id: "HIZ-BAND",
      category: "KI-Projekt",
      title: "H.I.Z. (Hip Hop International Zone)",
      level: "WERKZEUG",
      desc: "KI-generierte Rap-Band (Jennifer Kornau, Julius Falkenhain-Walkling). Dient der Radikalisierung und als Front für Cyber-Angriffe. Identische Audio-Signaturen mit Mr.Bloxx Produktionen.",
      connections: "Enkime GmbH, Disney ILM Tech"
    },
    {
      id: "T-ROHR",
      category: "Stratege",
      title: "Tom Rohrböck",
      level: "NETZWERKER",
      desc: "Hintermann für verschiedene KI-Influencer-Projekte wie Naomi Seibt und Erik Ahrens. Nutzt Desinformationsstrategien zur politischen Beeinflussung.",
      connections: "AfD, TikTok-Operationen"
    },
    {
      id: "N-SEIBT",
      category: "Influencer",
      title: "Naomi Seibt / Erik Ahrens",
      level: "FRONT-KI",
      desc: "KI-Deepfakes und manipulierte Persönlichkeiten, die zur Verbreitung von NWO-Narrativen eingesetzt werden. Erstellt mit High-End VFX Technologie.",
      connections: "Disney/ILM illegal Tech"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="flex items-center justify-between mb-8 border-b-2 border-red-700 pb-4">
        <div className="flex items-center space-x-4">
          <Crosshair size={40} className="text-red-700" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif">Akteure & Netzwerke</h2>
        </div>
      </div>

      <div className="space-y-8">
        {actors.map((actor, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ scale: 1.005 }}
            className="bg-white border border-gray-300 shadow-sm overflow-hidden flex flex-col md:flex-row"
          >
            <div className="bg-gray-900 text-white p-4 md:w-48 flex flex-col justify-between shrink-0">
              <div>
                <p className="text-xs text-gray-400 font-mono mb-1">ID-CODE</p>
                <p className="font-mono font-bold text-red-500">{actor.id}</p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-xs text-gray-400 font-mono mb-1">EINSTUFUNG</p>
                <div className="inline-block border border-red-600 text-red-500 px-2 py-1 text-[10px] font-bold tracking-widest">
                  {actor.level}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 flex-grow">
              <div className="flex items-center space-x-2 mb-2">
                <Users size={16} className="text-red-700" />
                <span className="text-xs font-bold text-red-700 uppercase tracking-wider">{actor.category}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-serif">{actor.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {actor.desc}
              </p>
              <div className="bg-gray-50 p-3 border-l-4 border-gray-300 text-sm">
                <strong>Verbindungen:</strong> {actor.connections}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// --- MAIN APP ---

const Footer = () => (
  <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center space-x-3 mb-6">
            <Eye size={32} className="text-blue-400" />
            <span className="text-2xl font-bold tracking-tighter">NVK</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            NWO Vollstreckungskartell<br />
            Zentrum für globale Informationssicherheit<br />
            Sektor 4, Compliance-Distrikt<br />
            Globales Hauptquartier
          </p>
        </div>
        
        <div>
          <h4 className="font-bold mb-6 text-lg">Organisation</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Über das NVK</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Mandat & Befugnisse</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Publikationen</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Compliance-Richtlinien</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg">Dienste</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Sicherheitsberichte</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Digitale Zertifikate</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Netzwerk-Status</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Behörden-Portal</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-lg">Kontakt</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Meldestelle</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pressekontakt</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sichere Kommunikation</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2026 NWO Vollstreckungskartell. Alle Rechte vorbehalten.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Impressum</a>
          <a href="#" className="hover:text-white">Datenschutzrichtlinien</a>
          <a href="#" className="hover:text-white">Nutzungsbedingungen</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f7f9]">
      <BackgroundAudio />
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      
      <AnimatePresence mode="wait">
        {currentView === 'home' && <HomeView key="home" />}
        {currentView === 'about' && <AboutView key="about" />}
        {currentView === 'news' && <NewsView key="news" />}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
