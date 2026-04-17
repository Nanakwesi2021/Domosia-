import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';

interface FAQItem {
  category: string;
  questions: { q: string; a: string }[];
}

const allFaqData: Record<Language, { sectionTitle: string; sectionSubtitle: string; faqData: FAQItem[] }> = {
  fr: {
    sectionTitle: "Questions Fréquentes",
    sectionSubtitle: "Tout ce que vous devez savoir sur la gestion locative courte durée au Maroc avec DOMOSIA.",
    faqData: [
      {
        category: 'Gestion locative courte durée au Maroc',
        questions: [
          {
            q: "Qu'est-ce que la gestion locative courte durée au Maroc et comment fonctionne DOMOSIA ?",
            a: "La gestion locative courte durée consiste à exploiter un bien immobilier sur des plateformes comme Airbnb ou Booking afin de générer des revenus supérieurs à la location classique. DOMOSIA propose une gestion locative premium au Maroc, incluant stratégie tarifaire, diffusion multi-plateformes, gestion des voyageurs, ménage hôtelier et maintenance. Vous transformez votre bien en actif générateur de revenus passifs, sans intervention opérationnelle."
          },
          {
            q: "Pourquoi confier son bien à une conciergerie Airbnb plutôt que gérer seul ?",
            a: "La gestion autonome limite fortement la performance (tarification non optimisée, faible visibilité, expérience client moyenne). Une conciergerie Airbnb professionnelle comme DOMOSIA permet d'augmenter le taux d'occupation, d'améliorer les avis clients et d'optimiser le revenu global, tout en éliminant la charge opérationnelle."
          },
          {
            q: "Dans quelles villes proposez-vous la gestion locative ?",
            a: "Nous opérons sur les principaux marchés de la location courte durée au Maroc (Rabat, Casablanca, Marrakech et zones à fort potentiel), avec une approche adaptée à chaque marché local."
          },
          {
            q: "Comment suivez-vous la performance de mon bien immobilier ?",
            a: "Vous recevez un reporting mensuel complet incluant revenus, taux d'occupation, prix moyen par nuit, avis clients et dépenses. Cela permet un pilotage précis de la rentabilité locative de votre bien."
          }
        ]
      },
      {
        category: 'Rentabilité et revenus locatifs',
        questions: [
          {
            q: "La location courte durée est-elle plus rentable que la location longue durée au Maroc ?",
            a: "Dans la majorité des cas, la location courte durée au Maroc génère un rendement supérieur grâce à une tarification flexible et une forte demande touristique et business. La performance dépend de l'emplacement, du standing et de la qualité de gestion."
          },
          {
            q: "Comment est calculée la rentabilité d'un investissement locatif courte durée ?",
            a: "La rentabilité repose sur plusieurs indicateurs : revenu mensuel, taux d'occupation, prix moyen par nuit et coûts d'exploitation. DOMOSIA fournit une simulation de revenus locatifs basée sur des données réelles de marché pour estimer précisément votre potentiel."
          },
          {
            q: "Comment maximisez-vous les revenus sur Airbnb et Booking ?",
            a: "Nous utilisons des outils avancés de pricing dynamique, une optimisation SEO des annonces, des photos professionnelles et une gestion active des avis clients afin d'augmenter le taux de conversion et le revenu par nuit."
          },
          {
            q: "Quand et comment sont versés les revenus ?",
            a: "Les revenus issus de votre investissement locatif courte durée sont versés mensuellement, avec un reporting clair et transparent des performances et des coûts."
          }
        ]
      },
      {
        category: 'Positionnement premium et valorisation du bien',
        questions: [
          {
            q: "Comment positionnez-vous mon bien en haut de gamme ?",
            a: "Nous appliquons un standard premium : décoration optimisée, photos professionnelles, expérience client fluide et service proche de l'hôtellerie. Cela permet d'attirer une clientèle qualitative et d'augmenter le prix moyen par nuit."
          },
          {
            q: "La gestion courte durée permet-elle de valoriser mon bien immobilier ?",
            a: "Oui, un bien bien exploité en location saisonnière premium génère non seulement des revenus élevés, mais améliore également sa perception sur le marché, facilitant une revente à meilleur prix."
          }
        ]
      },
      {
        category: 'Sécurité et gestion des risques',
        questions: [
          {
            q: "Comment protégez-vous mon bien en location courte durée ?",
            a: "Nous mettons en place un protocole strict : sélection des voyageurs, vérification des identités, caution, inspection systématique du logement avec preuves visuelles et suivi des séjours."
          },
          {
            q: "Que se passe-t-il en cas de dégradation ou de problème avec un locataire ?",
            a: "Nous utilisons des plateformes offrant des garanties propriétaires, et nous gérons l'ensemble des réclamations, réparations et démarches pour sécuriser votre actif immobilier."
          }
        ]
      },
      {
        category: 'Cadre légal et fiscal au Maroc',
        questions: [
          {
            q: "Est-il légal de louer son bien en courte durée au Maroc ?",
            a: "Oui, la location courte durée au Maroc est encadrée par des règles spécifiques. DOMOSIA vous accompagne dans la mise en conformité administrative et réglementaire."
          },
          {
            q: "Comment gérer la fiscalité des revenus locatifs ?",
            a: "Les revenus doivent être déclarés conformément à la réglementation marocaine. Nous fournissons un rapport fiscal annuel structuré pour simplifier vos démarches."
          },
          {
            q: "Quel contrat propose DOMOSIA ?",
            a: "Nous proposons un contrat de gestion locative premium, avec des conditions transparentes, une logique de performance et un alignement sur vos objectifs de rentabilité."
          }
        ]
      }
    ]
  },
  en: {
    sectionTitle: "Frequently Asked Questions",
    sectionSubtitle: "Everything you need to know about short-term rental management in Morocco with DOMOSIA.",
    faqData: [
      {
        category: "Short-term rental management in Morocco",
        questions: [
          {
            q: "What is short-term rental management in Morocco and how does DOMOSIA work?",
            a: "Short-term rental management involves operating a property on platforms like Airbnb or Booking to generate higher income than traditional rental. DOMOSIA offers premium rental management in Morocco, including pricing strategy, multi-platform distribution, guest management, hotel-quality cleaning, and maintenance. You transform your property into a passive income generating asset, without operational intervention."
          },
          {
            q: "Why entrust your property to an Airbnb concierge rather than managing it yourself?",
            a: "Self-management strongly limits performance (non-optimized pricing, low visibility, average customer experience). A professional Airbnb concierge like DOMOSIA increases the occupancy rate, improves customer reviews and optimizes overall revenue, while eliminating operational burden."
          },
          {
            q: "In which cities do you offer rental management?",
            a: "We operate in the main short-term rental markets in Morocco (Rabat, Casablanca, Marrakech and high potential areas), with an approach adapted to each local market."
          },
          {
            q: "How do you track the performance of my real estate?",
            a: "You receive a complete monthly report including revenue, occupancy rate, average price per night, customer reviews and expenses. This allows precise steering of your property's rental profitability."
          }
        ]
      },
      {
        category: "Profitability and rental income",
        questions: [
          {
            q: "Is short-term rental more profitable than long-term rental in Morocco?",
            a: "In most cases, short-term rental in Morocco generates a higher yield thanks to flexible pricing and strong tourist and business demand. Performance depends on location, standing, and quality of management."
          },
          {
            q: "How is the profitability of a short-term rental investment calculated?",
            a: "Profitability is based on several indicators: monthly income, occupancy rate, average price per night, and operating costs. DOMOSIA provides a rental income simulation based on real market data to accurately estimate your potential."
          },
          {
            q: "How do you maximize revenue on Airbnb and Booking?",
            a: "We use advanced dynamic pricing tools, SEO optimization of listings, professional photos, and active management of customer reviews to increase the conversion rate and revenue per night."
          },
          {
            q: "When and how is income paid?",
            a: "Income from your short-term rental investment is paid monthly, with clear and transparent reporting of performance and costs."
          }
        ]
      },
      {
        category: "Premium positioning and property valuation",
        questions: [
          {
            q: "How do you position my property in the high-end?",
            a: "We apply a premium standard: optimized decoration, professional photos, seamless customer experience, and hotel-like service. This attracts a qualitative clientele and increases the average price per night."
          },
          {
            q: "Does short-term management increase the value of my real estate?",
            a: "Yes, a property well-operated in premium seasonal rental not only generates high income, but also improves its perception on the market, facilitating resale at a better price."
          }
        ]
      },
      {
        category: "Security and risk management",
        questions: [
          {
            q: "How do you protect my property in short-term rental?",
            a: "We implement a strict protocol: guest selection, identity verification, deposit, systematic inspection of the accommodation with visual proof, and stay monitoring."
          },
          {
            q: "What happens in case of damage or a problem with a tenant?",
            a: "We use platforms offering owner guarantees, and we manage all complaints, repairs, and procedures to secure your real estate asset."
          }
        ]
      },
      {
        category: "Legal and tax framework in Morocco",
        questions: [
          {
            q: "Is it legal to rent your property short-term in Morocco?",
            a: "Yes, short-term rental in Morocco is governed by specific rules. DOMOSIA supports you in administrative and regulatory compliance."
          },
          {
            q: "How to manage the taxation of rental income?",
            a: "Income must be declared in accordance with Moroccan regulations. We provide a structured annual tax report to simplify your procedures."
          },
          {
            q: "What contract does DOMOSIA offer?",
            a: "We offer a premium rental management contract, with transparent conditions, a performance logic, and alignment with your profitability goals."
          }
        ]
      }
    ]
  },
  ar: {
    sectionTitle: "الأسئلة الشائعة",
    sectionSubtitle: "كل ما تحتاج معرفته عن إدارة الإيجار قصير المدى في المغرب مع دوموسيا.",
    faqData: [
      {
        category: "إدارة الإيجار قصير المدى في المغرب",
        questions: [
          {
            q: "ما هي إدارة الإيجار قصير المدى في المغرب وكيف تعمل دوموسيا؟",
            a: "إدارة الإيجار قصير المدى تعني تشغيل العقار على منصات مثل Airbnb أو Booking لتحقيق دخل أعلى من الإيجار التقليدي. تقدم دوموسيا إدارة إيجار متميزة في المغرب، تشمل استراتيجية التسعير، التوزيع على منصات متعددة، إدارة الضيوف، تنظيف فندقي، وصيانة. أنت تحول عقارك إلى أصل يدر دخلاً سلبياً، دون تدخل تشغيلي."
          },
          {
            q: "لماذا تعهد بعقارك إلى كونسيرج Airbnb بدلاً من إدارته بنفسك؟",
            a: "الإدارة الذاتية تحد من الأداء بشكل كبير (تسعير غير محسن، ضعف في الظهور، تجربة عملاء متوسطة). كونسيرج محترف مثل دوموسيا يزيد من معدل الإشغال، يحسن تقييمات العملاء ويزيد من الإيرادات الإجمالية، مع التخلص من العبء التشغيلي."
          },
          {
            q: "في أي مدن تقدمون إدارة الإيجار؟",
            a: "نعمل في أسواق الإيجار قصير المدى الرئيسية في المغرب (الرباط، الدار البيضاء، مراكش والمناطق ذات الإمكانيات العالية)، مع نهج مكيف لكل سوق محلي."
          },
          {
            q: "كيف تتابعون أداء عقاري؟",
            a: "تتلقى تقريرًا شهريًا كاملاً يشمل الإيرادات، معدل الإشغال، متوسط السعر في الليلة، تقييمات العملاء والمصروفات. يتيح هذا توجيهًا دقيقًا لربحية عقارك."
          }
        ]
      },
      {
        category: "الربحية والدخل الإيجاري",
        questions: [
          {
            q: "هل الإيجار قصير المدى أكثر ربحية من الإيجار طويل المدى في المغرب؟",
            a: "في معظم الحالات، يحقق الإيجار قصير المدى في المغرب عائدًا أعلى بفضل التسعير المرن والطلب السياحي والتجاري القوي. يعتمد الأداء على الموقع، المستوى وجودة الإدارة."
          },
          {
            q: "كيف يتم حساب ربحية استثمار الإيجار قصير المدى؟",
            a: "تعتمد الربحية على عدة مؤشرات: الدخل الشهري، معدل الإشغال، متوسط السعر في الليلة، وتكاليف التشغيل. تقدم دوموسيا محاكاة لدخل الإيجار استنادًا إلى بيانات السوق الحقيقية لتقدير إمكانيات بدقة."
          },
          {
            q: "كيف يتم تعظيم الإيرادات على Airbnb و Booking؟",
            a: "نستخدم أدوات تسعير ديناميكي متقدمة، وتحسين ظهور الإعلانات، وصور احترافية، وإدارة نشطة لتقييمات العملاء لزيادة معدل التحويل والإيراد لكل ليلة."
          },
          {
            q: "متى وكيف يتم دفع الدخل؟",
            a: "يتم دفع الدخل من استثمار الإيجار قصير المدى الخاص بك شهريًا، مع تقارير واضحة وشفافة للأداء والتكاليف."
          }
        ]
      },
      {
        category: "التموضع المميز وتقييم العقار",
        questions: [
          {
            q: "كيف تضعون عقاري في الفئة الراقية؟",
            a: "نطبق معيارًا مميزًا: ديكور محسن، صور احترافية، تجربة عملاء سلسة، وخدمة شبيهة بالفنادق. يجذب هذا العملاء المتميزين ويزيد من متوسط السعر في الليلة."
          },
          {
            q: "هل إدارة الإيجار قصير المدى تزيد من قيمة عقاري؟",
            a: "نعم، العقار الذي يدار بشكل جيد في الإيجار الموسمي المتميز لا يحقق دخلاً عالياً فحسب، بل يحسن أيضاً من نظرة السوق إليه، مما يسهل إعادة بيعه بسعر أفضل."
          }
        ]
      },
      {
        category: "الأمن وإدارة المخاطر",
        questions: [
          {
            q: "كيف تحمون عقاري في الإيجار قصير المدى؟",
            a: "نطبق بروتوكولًا صارمًا: اختيار الضيوف، التحقق من الهوية، التأمين، التفتيش المنهجي للسكن مع أدلة مرئية، ومراقبة الإقامة."
          },
          {
            q: "ماذا يحدث في حالة حدوث ضرر أو مشكلة مع مستأجر؟",
            a: "نستخدم منصات تقدم ضمانات للملاك، وندير جميع الشكاوى، الإصلاحات والإجراءات لتأمين أصولك العقارية."
          }
        ]
      },
      {
        category: "الإطار القانوني والضريبي في المغرب",
        questions: [
          {
            q: "هل من القانوني تأجير عقارك لفترة قصيرة في المغرب؟",
            a: "نعم، يخضع الإيجار قصير المدى في المغرب لقواعد محددة. تدعمك دوموسيا في الامتثال الإداري والتنظيمي."
          },
          {
            q: "كيف يمكن إدارة ضرائب الدخل الإيجاري؟",
            a: "يجب التصريح بالدخل وفقًا للوائح المغربية. نقدم تقريرًا ضريبيًا سنويًا مهيكلًا لتبسيط إجراءاتك."
          },
          {
            q: "ما هو العقد الذي تقدمه دوموسيا؟",
            a: "نقدم عقد إدارة إيجار متميز، بشروط شفافة، منطق أداء، ومواءمة مع أهداف الربحية الخاصة بك."
          }
        ]
      }
    ]
  }
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const { lang, t } = useLanguage();

  const currentData = allFaqData[lang] || allFaqData.en;

  const faqJsonLd = useMemo(() => {
    const allQuestions = currentData.faqData.flatMap(cat => cat.questions);
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": allQuestions.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    };
  }, [currentData]);

  const toggle = (id: string) => {
    setOpenIndex(prev => prev === id ? null : id);
  };

  return (
    <section id="faq" className="section-padding bg-secondary/50 relative">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-body font-semibold tracking-[0.2em] uppercase text-gold mb-4 block">
            {t('nav.faq')}
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            {currentData.sectionTitle}
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            {currentData.sectionSubtitle}
          </p>
        </motion.div>

        <div className="space-y-10">
          {currentData.faqData.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
            >
              <h3 className="text-lg md:text-xl font-display font-bold text-gold mb-4 tracking-wide">
                {category.category}
              </h3>
              <div className="space-y-0 border border-border rounded-xl overflow-hidden bg-card">
                {category.questions.map((item, qIdx) => {
                  const id = `${catIdx}-${qIdx}`;
                  const isOpen = openIndex === id;

                  return (
                    <div
                      key={id}
                      className={`${qIdx > 0 ? 'border-t border-border' : ''}`}
                    >
                      {/* Question - always in DOM, semantic h3 */}
                      <h3 className="m-0">
                        <button
                          onClick={() => toggle(id)}
                          className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 md:py-5 text-left cursor-pointer group"
                          aria-expanded={isOpen}
                          aria-controls={`faq-answer-${id}`}
                        >
                          <span className="font-body font-semibold text-sm md:text-base text-foreground group-hover:text-gold transition-colors">
                            {item.q}
                          </span>
                          <span className="flex-shrink-0 w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center text-gold transition-all duration-300">
                            {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                          </span>
                        </button>
                      </h3>

                      {/* Answer - always in DOM for SEO, uses max-height for animation */}
                      <div
                        id={`faq-answer-${id}`}
                        role="region"
                        style={{
                          maxHeight: isOpen ? '500px' : '0px',
                          opacity: isOpen ? 1 : 0,
                          transition: 'max-height 300ms ease, opacity 300ms ease',
                          overflow: 'hidden'
                        }}
                      >
                        <div className="px-5 md:px-6 pb-4 md:pb-5 pl-5 md:pl-6">
                          <p className="font-body text-sm leading-relaxed text-muted-foreground ml-0 md:ml-1">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
