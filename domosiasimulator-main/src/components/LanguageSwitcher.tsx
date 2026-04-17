import { useI18n, type Lang } from "@/lib/i18n";

const LANGS: { value: Lang; label: string }[] = [
  { value: "fr", label: "FR" },
  { value: "en", label: "EN" },
  { value: "ar", label: "AR" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-muted/95 backdrop-blur-sm rounded-full p-1 shadow-lg">
      {LANGS.map(l => (
        <button
          key={l.value}
          onClick={() => setLang(l.value)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
            lang === l.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
