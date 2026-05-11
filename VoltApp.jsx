import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════
   TRANSLATIONS
═══════════════════════════════════════════════════ */
const TR = {
  fr: {
    // Login
    tagline: "Énergie sans limites", loginSub: "Ta boisson. Ton abonnement. Ton gym.",
    connexion: "Connexion", inscription: "Inscription", loginBtn: "Se connecter →",
    signupBtn: "Créer mon compte ⚡", fitAccess: "Accès partenaire →",
    fitSpace: "🏋️ Espace partenaire fitness", adminSpace: "⚡ Accès administrateur",
    demoNote: "Demo pré-rempli — clique Se connecter",
    fitDemoNote: "Demo pré-rempli — clique Accès partenaire",
    pwdL: "Mot de passe", firstNameL: "Prénom", lastNameL: "Nom", phoneL: "Téléphone",
    cgvAccept: "J'accepte les CGV et la Politique de confidentialité de VOLT.",
    // Onboarding
    onbTitle: "Rejoins VOLT", onbGym: "Tu rejoins :", onbDesc: "Accès à tous les fitness du réseau VOLT.",
    onbBtn: "Créer mon compte ici ⚡", onbChange: "Ce n'est pas mon fitness →",
    // Home
    greeting: "Bonjour 👋", planActive: "Plan actif",
    qSub: "Réseau VOLT · même filiale", scanInstr: "Présente ce QR au scanner VOLT",
    scanAuto: "La machine lit ton code automatiquement",
    cdLabel: "Disponible dans", cdInfo: "1 boisson max toutes les 15 minutes",
    demoScan: "Simuler un scan machine (démo)",
    recLabel: "Dernières boissons", seeAll: "Voir tout →",
    nearbyStatus: "Machine en ligne · 0 m",
    today: "Aujourd'hui", streak: "Jours 🔥", renew: "Renouvellement",
    statMonth: "Ce mois", statSaved: "CHF éco.",
    // Plans
    payTitle: "Abonnement", payDesc: "Accès réseau VOLT · 1 boisson max / 15 min",
    pnDay: "Journée", ppDay: "24 heures", pfDay: "1 boisson / 15 min · 24h",
    pnMonth: "Mensuel", ppMonth: "Sans engagement",
    pnQuarter: "Trimestriel", ppQuarter: "3 mois · économise 17%",
    pnYear: "Annuel", ppYear: "12 mois · économise 26%",
    pfQR: "QR code permanent unique", pfLimit: "1 boisson max / 15 min",
    pfNetwork: "Réseau VOLT · même filiale", pfSaving: "Économise vs mensuel",
    ptopBadge: "⭐ Populaire", bestVal: "🏆 Meilleure valeur",
    rtLabel: "Renouvellement automatique", rtSub: "Annulable à tout moment",
    pmLabel: "Méthode de paiement", mnCard: "Carte bancaire",
    payBtn: "PAYER & ACTIVER ⚡", payNote: "Sans engagement · Annulation en 1 tap",
    secLabel: "Paiement sécurisé par Stripe",
    subExpired: "⚠️ Abonnement expiré — ton QR est bloqué",
    // History
    histTitle: "Historique", drinkLabel: "1 boisson prise", mcSub: "boissons ce mois",
    // Account
    accSection: "Mon compte", editProfile: "Modifier le profil",
    manSub: "Gérer l'abonnement", invoices: "Mes factures",
    notifs: "Notifications", notifsOn: "Activées",
    cgvLabel: "CGV & Confidentialité", logout: "Déconnexion", langLabel: "Langue",
    myGym: "Mon fitness",
    // Parrainage
    referralTitle: "Parrainage", referralDesc: "Partage ton lien — reçois 1 mois offert si ton filleul s'abonne.",
    referralLink: "Mon lien de parrainage", referralCopy: "Copier le lien",
    referralCopied: "Lien copié ! ✓",
    referralCount: "Filleul(s) actif(s)", referralReward: "Mois offert(s) reçus",
    referralShare: "Partager →",
    referralHow: "Comment ça marche ?",
    referralStep1: "1. Partage ton lien à un ami", referralStep2: "2. Il s'abonne via ton lien",
    referralStep3: "3. Tu reçois -1 mois offert automatiquement",
    // Dash
    gymSwLabel: "Mes établissements", fitMembers: "Membres actifs",
    fitMachLabel: "Machine VOLT", fitMgmt: "Gestion",
    fitEditProfile: "Modifier le profil du fitness",
    accessAuth: "✓ Accès autorisé", accessBlocked: "✗ Accès bloqué",
    accessCanUse: "Peut utiliser la machine", accessDenied: "QR refusé même si payé",
    paidLabel: "Payé", expiredLabel: "Expiré",
    // Admin
    adminTitle: "Vue globale", adminSub: "Toutes les données VOLT",
    revByFit: "Revenus par fitness", topClients: "Top clients",
    allClients: "Tous les clients", machineStatus: "Statut des machines",
    exportCSV: "Exporter CSV →", blockedAccess: "Accès bloqués",
    // Notifications
    notifRenew: "Abonnement renouvelé dans 3 jours",
    notifActivated: "Abonnement activé ! Ton QR est prêt.",
    notifCooldown: "Tu peux reprendre une boisson !",
    notifBlocked: "Ton accès a été suspendu par le fitness. Contacte-les.",
    // Misc
    sbPlan: "Plan actif", sbNext: "Renouvellement le",
    profOK: "Profil mis à jour ✓", payOK: "✅ Abonnement activé !",
    invSent: "Factures envoyées 📧", notifOK: "Notifications activées 🔔",
    saveBtn: "Enregistrer", cancelBtn: "Annuler",
    cgvTitle: "CGV & Confidentialité", cgvRead: "J'ai lu et compris",
    cgvText: `1. Objet — VOLT exploite des distributeurs automatiques de boissons énergisantes accessibles via abonnement.

2. Utilisation — L'abonnement est personnel et non cessible. Tout partage du QR entraîne la résiliation immédiate.

3. Accès réseau — L'abonnement donne accès à tous les établissements VOLT de la même filiale que le fitness d'inscription.

4. Limite — Maximum 1 boisson toutes les 15 minutes par abonné.

5. Paiement — Via Stripe et TWINT. En cas de non-paiement, le QR est bloqué automatiquement.

6. Suspension — Le fitness partenaire ou l'administrateur VOLT peut suspendre un accès à tout moment, même en cas d'abonnement actif, en cas de non-respect des règles.

7. Parrainage — Offre non cumulable. Le mois offert est crédité après 30 jours d'abonnement actif du filleul.

8. Données — Conformément à la LPD suisse, vous disposez d'un droit d'accès, rectification et suppression.

Contact : contact@volt-energy.ch`,
  },
  de: {
    tagline: "Energie ohne Grenzen", loginSub: "Dein Getränk. Dein Abo. Dein Gym.",
    connexion: "Anmelden", inscription: "Registrieren", loginBtn: "Anmelden →",
    signupBtn: "Konto erstellen ⚡", fitAccess: "Fitness-Zugang →",
    fitSpace: "🏋️ Fitness-Partnerbereich", adminSpace: "⚡ Admin-Zugang",
    demoNote: "Demo vorausgefüllt — klicke Anmelden",
    fitDemoNote: "Demo vorausgefüllt — klicke Fitness-Zugang",
    pwdL: "Passwort", firstNameL: "Vorname", lastNameL: "Nachname", phoneL: "Telefon",
    cgvAccept: "Ich akzeptiere die AGB und Datenschutzrichtlinie von VOLT.",
    onbTitle: "Werde VOLT-Mitglied", onbGym: "Du trittst bei :", onbDesc: "Zugang zu allen VOLT-Gyms im selben Netzwerk.",
    onbBtn: "Konto hier erstellen ⚡", onbChange: "Das ist nicht mein Gym →",
    greeting: "Guten Tag 👋", planActive: "Aktiver Plan",
    qSub: "VOLT-Netzwerk · gleiche Filiale", scanInstr: "QR dem VOLT-Scanner zeigen",
    scanAuto: "Die Maschine liest deinen Code automatisch",
    cdLabel: "Verfügbar in", cdInfo: "Max. 1 Getränk alle 15 Minuten",
    demoScan: "Maschinenscan simulieren (Demo)",
    recLabel: "Letzte Getränke", seeAll: "Alle →",
    nearbyStatus: "Automat online · 0 m",
    today: "Heute", streak: "Tage 🔥", renew: "Erneuerung",
    statMonth: "Diesen Monat", statSaved: "CHF ges.",
    payTitle: "Abo", payDesc: "VOLT-Netzwerk · max. 1 Getränk / 15 Min.",
    pnDay: "Tagespass", ppDay: "24 Stunden", pfDay: "1 Getränk / 15 Min. · 24h",
    pnMonth: "Monatlich", ppMonth: "Ohne Bindung",
    pnQuarter: "Quartal", ppQuarter: "3 Monate · 17% sparen",
    pnYear: "Jährlich", ppYear: "12 Monate · 26% sparen",
    pfQR: "Dauerhafter QR-Code", pfLimit: "Max. 1 Getränk / 15 Min.",
    pfNetwork: "VOLT-Netzwerk · gleiche Filiale", pfSaving: "Sparen vs. monatlich",
    ptopBadge: "⭐ Beliebt", bestVal: "🏆 Bestes Angebot",
    rtLabel: "Automatische Erneuerung", rtSub: "Jederzeit kündbar",
    pmLabel: "Zahlungsmethode", mnCard: "Kreditkarte",
    payBtn: "ZAHLEN & AKTIVIEREN ⚡", payNote: "Keine Bindung · Kündigung in 1 Tap",
    secLabel: "Gesicherte Zahlung via Stripe",
    subExpired: "⚠️ Abo abgelaufen — dein QR ist gesperrt",
    histTitle: "Verlauf", drinkLabel: "1 Getränk entnommen", mcSub: "Getränke diesen Monat",
    accSection: "Mein Konto", editProfile: "Profil bearbeiten",
    manSub: "Abo verwalten", invoices: "Meine Rechnungen",
    notifs: "Benachrichtigungen", notifsOn: "Aktiviert",
    cgvLabel: "AGB & Datenschutz", logout: "Abmelden", langLabel: "Sprache",
    myGym: "Mein Gym",
    referralTitle: "Empfehlung", referralDesc: "Teile deinen Link — erhalte 1 Monat gratis wenn dein Freund abonniert.",
    referralLink: "Mein Empfehlungslink", referralCopy: "Link kopieren",
    referralCopied: "Link kopiert! ✓",
    referralCount: "Aktive Empfehlungen", referralReward: "Erhaltene Gratis-Monate",
    referralShare: "Teilen →", referralHow: "Wie funktioniert es?",
    referralStep1: "1. Teile deinen Link mit einem Freund",
    referralStep2: "2. Er abonniert über deinen Link",
    referralStep3: "3. Du erhältst automatisch -1 Monat gratis",
    gymSwLabel: "Meine Standorte", fitMembers: "Aktive Mitglieder",
    fitMachLabel: "VOLT-Automat", fitMgmt: "Verwaltung",
    fitEditProfile: "Fitness-Profil bearbeiten",
    accessAuth: "✓ Zugang erlaubt", accessBlocked: "✗ Zugang gesperrt",
    accessCanUse: "Kann Automat nutzen", accessDenied: "QR abgelehnt, auch wenn bezahlt",
    paidLabel: "Bezahlt", expiredLabel: "Abgelaufen",
    adminTitle: "Globale Übersicht", adminSub: "Alle VOLT-Daten",
    revByFit: "Einnahmen pro Gym", topClients: "Top-Kunden",
    allClients: "Alle Kunden", machineStatus: "Maschinenstatus",
    exportCSV: "CSV exportieren →", blockedAccess: "Gesperrte Zugänge",
    notifRenew: "Abo erneuert in 3 Tagen",
    notifActivated: "Abo aktiviert! Dein QR ist bereit.",
    notifCooldown: "Du kannst ein Getränk nehmen!",
    notifBlocked: "Dein Zugang wurde gesperrt. Kontaktiere das Gym.",
    sbPlan: "Aktiver Plan", sbNext: "Erneuerung am",
    profOK: "Profil aktualisiert ✓", payOK: "✅ Abo aktiviert!",
    invSent: "Rechnungen per E-Mail 📧", notifOK: "Benachrichtigungen aktiviert 🔔",
    saveBtn: "Speichern", cancelBtn: "Abbrechen",
    cgvTitle: "AGB & Datenschutz", cgvRead: "Ich habe gelesen", cgvText: "AGB...",
  }
};

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const PLANS = [
  { key: "day",     chf: "3.-",   label: "pnDay",     period: "ppDay",     badge: null,         saving: null },
  { key: "month",   chf: "8.90",  label: "pnMonth",   period: "ppMonth",   badge: "ptopBadge",  saving: null },
  { key: "quarter", chf: "22.-",  label: "pnQuarter", period: "ppQuarter", badge: null,         saving: "CHF 4.70" },
  { key: "year",    chf: "79.-",  label: "pnYear",    period: "ppYear",    badge: "bestVal",    saving: "CHF 27.80" },
];

// Filiales: gyms of the same brand share access
const FILIALES = [
  { id: "volt-lausanne", name: "Fitness Park Lausanne", loc: "Av. de la Gare 14 · Lausanne", filiale: "FitnessPlus", members: 12, scansToday: 24, scansMonth: 148, revenue: 107 },
  { id: "volt-geneve",   name: "FitnessPlus Genève",   loc: "Rue de la Servette 22 · Genève", filiale: "FitnessPlus", members: 8,  scansToday: 16, scansMonth: 96,  revenue: 71  },
  { id: "volt-berne",    name: "CrossFit Berne",        loc: "Bahnhofplatz 3 · Berne",         filiale: "CrossFit",   members: 5,  scansToday: 10, scansMonth: 60,  revenue: 45  },
];

const CLIENTS_DATA = [
  { i:"AM", n:"Alexandre M.", gym:"volt-lausanne", plan:"Mensuel",      scans:12, active:true,  authorized:true  },
  { i:"SD", n:"Sophie D.",    gym:"volt-lausanne", plan:"Mensuel",      scans:18, active:true,  authorized:true  },
  { i:"MF", n:"Marc F.",      gym:"volt-geneve",   plan:"Trimestriel",  scans:9,  active:true,  authorized:true  },
  { i:"RB", n:"Réda B.",      gym:"volt-lausanne", plan:"Journée",      scans:3,  active:true,  authorized:true  },
  { i:"LK", n:"Laura K.",     gym:"volt-geneve",   plan:"Annuel",       scans:22, active:true,  authorized:true  },
  { i:"PG", n:"Pierre G.",    gym:"volt-lausanne", plan:"Mensuel",      scans:14, active:true,  authorized:true  },
  { i:"CM", n:"Claire M.",    gym:"volt-geneve",   plan:"Mensuel",      scans:7,  active:false, authorized:false },
  { i:"TF", n:"Thomas F.",    gym:"volt-lausanne", plan:"Trimestriel",  scans:11, active:true,  authorized:true  },
];

const HIST_DATA = [
  { gym:"volt-lausanne", name:"Fitness Park Lausanne", time:"Auj. 08:32" },
  { gym:"volt-lausanne", name:"Fitness Park Lausanne", time:"Hier 19:15" },
  { gym:"volt-geneve",   name:"FitnessPlus Genève",    time:"Hier 07:45" },
  { gym:"volt-lausanne", name:"Fitness Park Lausanne", time:"07 mai 12:20" },
  { gym:"volt-lausanne", name:"Fitness Park Lausanne", time:"06 mai 18:50" },
  { gym:"volt-lausanne", name:"Fitness Park Lausanne", time:"05 mai 09:10" },
  { gym:"volt-geneve",   name:"FitnessPlus Genève",    time:"04 mai 17:30" },
  { gym:"volt-lausanne", name:"Fitness Park Lausanne", time:"03 mai 08:00" },
];

/* ═══════════════════════════════════════════════════
   QR SVG — hardcoded, always renders
═══════════════════════════════════════════════════ */
const QR = (
  <svg width="160" height="160" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="160" fill="#fff" rx="6"/>
    <rect x="10" y="10" width="42" height="42" fill="#0E0E0E" rx="4"/>
    <rect x="16" y="16" width="30" height="30" fill="#fff" rx="2"/>
    <rect x="22" y="22" width="18" height="18" fill="#0E0E0E" rx="2"/>
    <rect x="108" y="10" width="42" height="42" fill="#0E0E0E" rx="4"/>
    <rect x="114" y="16" width="30" height="30" fill="#fff" rx="2"/>
    <rect x="120" y="22" width="18" height="18" fill="#0E0E0E" rx="2"/>
    <rect x="10" y="108" width="42" height="42" fill="#0E0E0E" rx="4"/>
    <rect x="16" y="114" width="30" height="30" fill="#fff" rx="2"/>
    <rect x="22" y="120" width="18" height="18" fill="#0E0E0E" rx="2"/>
    <rect x="58" y="16" width="6" height="6" fill="#0E0E0E" rx="1"/>
    <rect x="70" y="16" width="6" height="6" fill="#0E0E0E" rx="1"/>
    <rect x="82" y="16" width="6" height="6" fill="#0E0E0E" rx="1"/>
    <rect x="94" y="16" width="6" height="6" fill="#0E0E0E" rx="1"/>
    <rect x="16" y="58" width="6" height="6" fill="#0E0E0E" rx="1"/>
    <rect x="16" y="70" width="6" height="6" fill="#0E0E0E" rx="1"/>
    <rect x="16" y="82" width="6" height="6" fill="#0E0E0E" rx="1"/>
    <rect x="16" y="94" width="6" height="6" fill="#0E0E0E" rx="1"/>
    <rect x="58" y="58" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="72" y="58" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="86" y="58" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="100" y="58" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="116" y="58" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="130" y="58" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="58" y="72" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="86" y="72" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="116" y="72" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="58" y="86" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="72" y="86" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="100" y="86" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="130" y="86" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="58" y="100" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="72" y="100" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="86" y="100" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="108" y="100" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="130" y="100" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="58" y="116" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="86" y="116" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="116" y="116" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="130" y="116" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="58" y="130" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="72" y="130" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="100" y="130" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="130" y="130" width="8" height="8" fill="#0E0E0E" rx="1"/>
    <rect x="74" y="74" width="12" height="12" fill="#B8F000" rx="2"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   COLORS
═══════════════════════════════════════════════════ */
const C = { volt:"#B8F000", vdk:"#7AAA00", vlt:"#EDFFA0", ink:"#0E0E0E", ink3:"#7A7A7A", bg:"#F5F4EF", bg2:"#EDECEA", red:"#FF3B30", grn:"#2DB87A", org:"#FF9500" };

/* ═══════════════════════════════════════════════════
   MINI COMPONENTS
═══════════════════════════════════════════════════ */
function Toast({ msg }) {
  return msg ? <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", background:C.ink, color:"#fff", borderRadius:50, padding:"12px 22px", fontSize:14, fontWeight:600, zIndex:999, whiteSpace:"nowrap", boxShadow:"0 4px 20px rgba(0,0,0,.3)" }}>{msg}</div> : null;
}

function Modal({ show, title, onClose, children }) {
  if (!show) return null;
  return (
    <div onClick={e => e.target===e.currentTarget && onClose()} style={{ position:"fixed", inset:0, background:"rgba(14,14,14,.5)", zIndex:500, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
      <div style={{ background:"#fff", borderRadius:"28px 28px 0 0", width:"100%", maxWidth:430, padding:"28px 24px 40px", maxHeight:"80vh", overflowY:"auto" }}>
        <div style={{ width:36, height:4, background:"#E5E4DF", borderRadius:2, margin:"0 auto 20px" }}/>
        <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:28, marginBottom:20 }}>{title}</div>
        {children}
      </div>
    </div>
  );
}

function Inp({ label, type="text", value, onChange, placeholder, disabled }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
      <label style={{ fontSize:11, fontWeight:700, letterSpacing:".07em", textTransform:"uppercase", color:C.ink3 }}>{label}</label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} disabled={disabled}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{ background:focused?"#fff":C.bg2, border:`1.5px solid ${focused?C.ink:"transparent"}`, borderRadius:10, padding:"14px 16px", fontFamily:"'Barlow',sans-serif", fontSize:16, fontWeight:500, color:C.ink, outline:"none", width:"100%", opacity:disabled?.6:1 }}/>
    </div>
  );
}

function Btn({ children, onClick, variant="volt", disabled, small }) {
  const vs = { volt:{background:C.volt,color:C.ink}, dark:{background:C.ink,color:"#fff",fontFamily:"'Barlow',sans-serif",fontSize:16,fontWeight:700,letterSpacing:".04em"}, outline:{background:"transparent",color:C.ink,border:`1.5px solid rgba(14,14,14,.1)`,fontFamily:"'Barlow',sans-serif",fontSize:15,fontWeight:700} };
  return <button onClick={onClick} disabled={disabled} style={{ width:"100%", padding:small?"10px 16px":"16px", border:"none", borderRadius:10, fontFamily:"'Barlow Condensed',sans-serif", fontSize:small?16:22, fontWeight:900, letterSpacing:".04em", cursor:disabled?"not-allowed":"pointer", opacity:disabled?.5:1, display:"flex", alignItems:"center", justifyContent:"center", gap:8, transition:"opacity .15s", ...vs[variant] }}>{children}</button>;
}

function Row({ icon, label, right, onClick, danger, rightVolt }) {
  return (
    <div onClick={onClick} style={{ background:"#fff", display:"flex", alignItems:"center", gap:12, padding:"15px 16px", borderRadius:10, marginBottom:4, cursor:"pointer", border:"1px solid rgba(14,14,14,.06)" }}>
      <div style={{ width:36, height:36, background:danger?"#FFF0EE":C.bg2, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{icon}</div>
      <div style={{ fontSize:15, fontWeight:700, color:danger?C.red:C.ink }}>{label}</div>
      {right && <div style={{ marginLeft:"auto", fontSize:13, fontWeight:600, color:rightVolt?C.vdk:C.ink3 }}>{right}</div>}
      <div style={{ fontSize:18, color:danger?C.red:C.ink3, marginLeft:right?4:"auto" }}>›</div>
    </div>
  );
}

function HItem({ item, last, t }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 0", borderBottom:last?"none":"1px solid rgba(14,14,14,.06)" }}>
      <div style={{ width:44, height:44, background:C.vlt, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>⚡</div>
      <div>
        <div style={{ fontSize:15, fontWeight:700 }}>{t.drinkLabel}</div>
        <div style={{ fontSize:12, fontWeight:500, color:C.ink3 }}>{item.name}</div>
      </div>
      <div style={{ fontSize:12, fontWeight:600, color:C.ink3, marginLeft:"auto", flexShrink:0 }}>{item.time}</div>
    </div>
  );
}

function Kpi({ val, label, green, volt }) {
  return (
    <div style={{ background:"#fff", borderRadius:18, padding:16, border:"1px solid rgba(14,14,14,.06)" }}>
      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:30, color:green?C.vdk:volt?C.volt:C.ink, lineHeight:1 }}>{val}</div>
      <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".04em", marginTop:3 }}>{label}</div>
    </div>
  );
}

function CDRing({ secs, total }) {
  const r=25, circ=2*Math.PI*r, pct=secs/total;
  const col = secs<60?C.red:secs<180?C.org:C.volt;
  const m=Math.floor(secs/60), s=secs%60;
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
      <svg width="58" height="58" viewBox="0 0 58 58">
        <circle cx="29" cy="29" r={r} fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="4"/>
        <circle cx="29" cy="29" r={r} fill="none" stroke={col} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={circ*(1-pct)} strokeLinecap="round"
          transform="rotate(-90 29 29)" style={{ transition:"stroke-dashoffset 1s linear,stroke .3s" }}/>
      </svg>
      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:30, color:col, letterSpacing:2, lineHeight:1 }}>{m}:{String(s).padStart(2,"0")}</div>
      <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.4)", letterSpacing:".08em", textTransform:"uppercase" }}>Prochain scan</div>
    </div>
  );
}

function MiniChart() {
  const days=["Lu","Ma","Me","Je","Ve","Sa","Di"], vals=[18,22,15,28,24,32,19], max=Math.max(...vals);
  return (
    <div>
      <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:60 }}>
        {vals.map((v,i)=><div key={i} style={{ flex:1, height:`${Math.round(v/max*100)}%`, background:i===5?C.volt:C.ink, borderRadius:"4px 4px 0 0", opacity:i===5?1:.8 }}/>)}
      </div>
      <div style={{ display:"flex", gap:6, marginTop:6 }}>
        {days.map(d=><div key={d} style={{ flex:1, textAlign:"center", fontSize:10, fontWeight:600, color:C.ink3 }}>{d}</div>)}
      </div>
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <div onClick={onChange} style={{ width:44, height:26, background:on?C.grn:"#D0D0D0", borderRadius:13, position:"relative", cursor:"pointer", transition:"background .2s", flexShrink:0 }}>
      <div style={{ position:"absolute", top:3, left:on?21:3, width:20, height:20, background:"#fff", borderRadius:"50%", transition:"left .2s", boxShadow:"0 1px 3px rgba(0,0,0,.2)" }}/>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════ */
export default function VoltApp() {
  const [screen, setScreen]           = useState("login");
  const [lang, setLang]               = useState("fr");
  const [role, setRole]               = useState("client");
  const [loginType, setLoginType]     = useState("client");
  const [subTab, setSubTab]           = useState("conn");
  const [tapCount, setTapCount]       = useState(0);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [cgvChecked, setCgvChecked]   = useState(false);
  const [hasSub, setHasSub]           = useState(true);
  const [plan, setPlan]               = useState("month");
  const [method, setMethod]           = useState("card");
  const [autoRenew, setAutoRenew]     = useState(true);
  const [cdSecs, setCdSecs]           = useState(-1);
  const [conso, setConso]             = useState(12);
  const [todayCount, setTodayCount]   = useState(2);
  const [hist, setHist]               = useState(HIST_DATA);
  const [clients, setClients]         = useState(CLIENTS_DATA);
  const [gyms, setGyms]               = useState(FILIALES);
  const [activeGym, setActiveGym]     = useState(0);
  const [clientGym, setClientGym]     = useState("volt-lausanne"); // gym where client is registered
  const [user, setUser]               = useState({ name:"Alexandre Martin", email:"demo@volt.ch", phone:"+41 79 000 00 00", initials:"AM" });
  const [toast, setToast]             = useState("");
  const [notif, setNotif]             = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showProfModal, setShowProfModal] = useState(false);
  const [showCGV, setShowCGV]         = useState(false);
  const [showRef, setShowRef]         = useState(false);
  const [refCopied, setRefCopied]     = useState(false);
  const [referrals]                   = useState(2); // demo: 2 filleuls actifs
  const [freeMonths]                  = useState(2);
  // Onboarding: simulates scanning a gym QR poster
  const [onbGym, setOnbGym]           = useState(null);
  const cdRef = useRef(-1);
  cdRef.current = cdSecs;

  const t = TR[lang] || TR.fr;

  /* ── Helpers ── */
  const showToast = msg => { setToast(msg); setTimeout(()=>setToast(""), 2500); };
  const showNotif = (icon, text) => { setNotif({icon,text}); setTimeout(()=>setNotif(null), 6000); };

  /* ── Cooldown tick ── */
  useEffect(()=>{
    const id = setInterval(()=>{
      if (cdRef.current < 0) return;
      const n = Math.max(0, cdRef.current - 1);
      setCdSecs(n);
      if (n === 0) { setTimeout(()=>setCdSecs(-1), 100); showNotif("⚡", t.notifCooldown); }
    }, 1000);
    return ()=>clearInterval(id);
  }, [lang]);

  /* ── Login notif ── */
  useEffect(()=>{
    if (screen==="home") setTimeout(()=>showNotif("🔔", t.notifRenew), 2500);
  }, [screen]);

  /* ── Secret admin tap ── */
  const logoTap = () => {
    const n = tapCount+1; setTapCount(n);
    if (n>=5) { setAdminUnlocked(true); setLoginType("admin"); setTapCount(0); }
  };

  /* ── Filiale access: client can use all gyms of same filiale ── */
  const clientFiliale = FILIALES.find(g=>g.id===clientGym)?.filiale;
  const accessibleGyms = FILIALES.filter(g=>g.filiale===clientFiliale);

  /* ── Auth ── */
  const doLogin = ()=>{ setRole("client"); setHasSub(true); setScreen("home"); showToast("Bienvenue Alexandre ! ⚡"); };
  const doSignup = ()=>{
    if(!cgvChecked){showToast(lang==="fr"?"⚠️ Accepte les CGV":"⚠️ AGB akzeptieren"); return;}
    setRole("client"); setHasSub(false); setClientGym(onbGym||"volt-lausanne");
    setScreen("pay"); showToast(lang==="fr"?"Compte créé !":"Konto erstellt!");
  };
  const doFitLogin = ()=>{ setRole("fitness"); setScreen("fit"); };
  const doAdminLogin = ()=>{ setRole("admin"); setScreen("admin"); };
  const doLogout = ()=>{ setRole("client"); setCdSecs(-1); setScreen("login"); setOnbGym(null); setLoginType("client"); };

  /* ── Simulate scanning a gym's registration QR poster ── */
  const simulateScanGymQR = (gymId) => { setOnbGym(gymId); setSubTab("inscr"); setScreen("onboarding"); };

  /* ── Machine scan ── */
  const handleScan = ()=>{
    if (!hasSub) { setScreen("pay"); return; }
    if (cdSecs>0) return;
    showToast(lang==="fr"?"📲 Présente ton QR au scanner VOLT":"📲 QR dem VOLT-Scanner zeigen");
    setTimeout(()=>{
      setCdSecs(900);
      setConso(c=>c+1);
      setTodayCount(d=>d+1);
      const now = new Date();
      const gym = FILIALES.find(g=>g.id===clientGym);
      setHist(h=>[{ gym:clientGym, name:gym?.name||"Fitness VOLT", time:`Auj. ${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}` }, ...h]);
      setShowSuccess(true);
      setTimeout(()=>setShowSuccess(false), 2500);
    }, 800);
  };

  /* ── Pay ── */
  const doPay = ()=>{
    setTimeout(()=>{ setHasSub(true); setScreen("home"); showToast(t.payOK); showNotif("✅",t.notifActivated); }, 1800);
  };

  /* ── Access toggle ── */
  const toggleAccess = idx => {
    const c = clients[idx];
    setClients(cs=>cs.map((x,i)=>i===idx?{...x,authorized:!x.authorized}:x));
    showToast(c.authorized ? `✗ ${c.n} — ${lang==="fr"?"accès bloqué":"Zugang gesperrt"}` : `✓ ${c.n} — ${lang==="fr"?"accès autorisé":"Zugang erlaubt"}`);
    if (c.authorized) showNotif("🚫", `${c.n} — ${t.notifBlocked||"Accès suspendu."}`);
  };

  const gymOf = c => FILIALES.find(g=>g.id===c.gym);
  const isClient = role==="client";
  const hasCdSec = cdSecs > 0;

  /* ── Referral link ── */
  const refLink = `volt-energy.ch/join?ref=${user.initials.toLowerCase()}${Math.abs(user.name.charCodeAt(0))}`;
  const copyRef = ()=>{ setRefCopied(true); showToast(t.referralCopied); setTimeout(()=>setRefCopied(false), 3000); };

  /* ── Plan label ── */
  const planLabel = ()=>{
    const p = PLANS.find(x=>x.key===plan);
    return p ? `${t[p.label]} · CHF ${p.chf}` : "";
  };

  /* ── Renewal date ── */
  const renewDate = ()=>{
    const d = new Date(); d.setMonth(d.getMonth() + (plan==="month"?1:plan==="quarter"?3:plan==="year"?12:0));
    return d.toLocaleDateString(lang==="fr"?"fr-CH":"de-CH",{day:"numeric",month:"long",year:"numeric"});
  };

  /* ════════════════════════════════════════════════
     RENDER
  ════════════════════════════════════════════════ */
  return (
    <div style={{ fontFamily:"'Barlow',sans-serif", background:C.bg, minHeight:"100%", maxWidth:430, margin:"0 auto", position:"relative" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0;}input,button{font-family:'Barlow',sans-serif;}::-webkit-scrollbar{display:none;}`}</style>

      <Toast msg={toast}/>

      {/* Notif banner */}
      {notif && (
        <div style={{ position:"fixed", top:16, left:"50%", transform:"translateX(-50%)", background:C.ink, color:"#fff", padding:"12px 20px", display:"flex", alignItems:"center", gap:12, borderRadius:12, zIndex:990, maxWidth:390, width:"calc(100% - 40px)", boxShadow:"0 4px 20px rgba(0,0,0,.3)" }}>
          <span style={{ fontSize:20, flexShrink:0 }}>{notif.icon}</span>
          <span style={{ fontSize:13, fontWeight:700, flex:1 }}>{notif.text}</span>
          <button onClick={()=>setNotif(null)} style={{ background:"none", border:"none", color:"rgba(255,255,255,.5)", fontSize:18, cursor:"pointer", flexShrink:0 }}>✕</button>
        </div>
      )}

      {/* Success overlay */}
      {showSuccess && (
        <div style={{ position:"fixed", inset:0, background:"rgba(245,244,239,.96)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10, zIndex:998 }}>
          <div style={{ width:96, height:96, background:C.volt, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:46 }}>⚡</div>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:40 }}>
            {lang==="fr"?"Distribué !":"Ausgegeben!"}
          </div>
          <div style={{ fontSize:15, fontWeight:600, color:C.ink3 }}>
            {lang==="fr"?"Ta boisson arrive 🚀":"Dein Getränk kommt 🚀"}
          </div>
          <div style={{ marginTop:12, background:C.bg2, borderRadius:12, padding:"12px 24px", textAlign:"center" }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase" }}>
              {lang==="fr"?"Prochain scan dans":"Nächster Scan in"}
            </div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:32, color:C.ink }}>15:00</div>
          </div>
        </div>
      )}

      {/* ═══ LOGIN ═══ */}
      {screen==="login" && (
        <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh", position:"relative" }}>
          <div style={{ position:"absolute", inset:0, background:C.bg, overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-30, right:-40, fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:240, color:C.volt, opacity:.15, lineHeight:1, userSelect:"none" }}>V</div>
          </div>
          <div style={{ position:"relative", zIndex:1, padding:"40px 28px 0" }}>
            <div style={{ display:"inline-block", background:C.volt, borderRadius:8, padding:"4px 12px", marginBottom:14 }}>
              <span style={{ fontSize:11, fontWeight:800, letterSpacing:".08em", textTransform:"uppercase", color:C.ink }}>{t.tagline}</span>
            </div>
            <div onClick={logoTap} style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:80, color:C.ink, letterSpacing:1, lineHeight:.88 }}>VOLT</div>
            <div style={{ fontSize:14, fontWeight:600, color:C.ink3, marginTop:10 }}>{t.loginSub}</div>
            {tapCount>=3 && <div style={{ fontSize:11, color:C.vdk, marginTop:4 }}>{"•".repeat(tapCount)}</div>}
          </div>

          {/* DEMO: scan gym QR buttons */}
          <div style={{ position:"relative", zIndex:1, padding:"16px 28px 0" }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", marginBottom:8 }}>
              {lang==="fr"?"Rejoindre via QR poster du fitness (démo) :":"Gym-QR scannen (Demo):"}
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {FILIALES.map(g=>(
                <button key={g.id} onClick={()=>simulateScanGymQR(g.id)}
                  style={{ padding:"8px 14px", background:"#fff", border:"1.5px solid rgba(14,14,14,.1)", borderRadius:50, fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:700, color:C.ink, cursor:"pointer" }}>
                  📷 {g.name.split(" ").slice(0,2).join(" ")}
                </button>
              ))}
            </div>
          </div>

          {/* Sheet */}
          <div style={{ position:"relative", zIndex:1, marginTop:"auto", background:"#fff", borderRadius:"28px 28px 0 0", padding:"24px 24px 40px", borderTop:"1px solid rgba(14,14,14,.06)" }}>
            {/* Type tabs */}
            <div style={{ display:"flex", background:C.bg2, borderRadius:10, padding:4, gap:4, marginBottom:20 }}>
              {["client","fitness"].concat(adminUnlocked?["admin"]:[]).map(tp=>(
                <button key={tp} onClick={()=>setLoginType(tp)} style={{ flex:1, padding:"9px 4px", borderRadius:7, border:"none", background:loginType===tp?"#fff":"transparent", fontFamily:"'Barlow',sans-serif", fontSize:14, fontWeight:700, color:loginType===tp?C.ink:C.ink3, cursor:"pointer", boxShadow:loginType===tp?"0 1px 3px rgba(0,0,0,.1)":"none" }}>
                  {tp==="client"?"Client":tp==="fitness"?"Fitness":"Admin"}
                </button>
              ))}
            </div>

            {/* CLIENT */}
            {loginType==="client" && (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ display:"flex", background:C.bg2, borderRadius:8, padding:3, gap:3 }}>
                  {["conn","inscr"].map(s=>(
                    <button key={s} onClick={()=>setSubTab(s)} style={{ flex:1, padding:8, borderRadius:6, border:"none", background:subTab===s?"#fff":"transparent", fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:700, color:subTab===s?C.ink:C.ink3, cursor:"pointer", boxShadow:subTab===s?"0 1px 3px rgba(0,0,0,.1)":"none" }}>
                      {s==="conn"?t.connexion:t.inscription}
                    </button>
                  ))}
                </div>
                {subTab==="conn" ? (
                  <>
                    <Inp label="Email" type="email" value="demo@volt.ch" onChange={()=>{}} placeholder="ton@email.ch"/>
                    <Inp label={t.pwdL} type="password" value="demo1234" onChange={()=>{}} placeholder="••••••••"/>
                    <Btn onClick={doLogin} variant="dark">{t.loginBtn}</Btn>
                    <div style={{ background:C.bg2, borderRadius:10, padding:"10px 14px", fontSize:12, fontWeight:600, color:C.ink3, textAlign:"center" }}>{t.demoNote}</div>
                  </>
                ):(
                  <>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                      <Inp label={t.firstNameL} value="" onChange={()=>{}} placeholder="Alex"/>
                      <Inp label={t.lastNameL} value="" onChange={()=>{}} placeholder="Martin"/>
                    </div>
                    <Inp label="Email" type="email" value="" onChange={()=>{}} placeholder="ton@email.ch"/>
                    <Inp label={t.phoneL} type="tel" value="" onChange={()=>{}} placeholder="+41 79 000 00 00"/>
                    <Inp label={t.pwdL} type="password" value="" onChange={()=>{}} placeholder="Min. 8 caractères"/>
                    {/* CGV */}
                    <div onClick={()=>setCgvChecked(c=>!c)} style={{ display:"flex", alignItems:"flex-start", gap:12, cursor:"pointer" }}>
                      <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${cgvChecked?C.ink:"rgba(14,14,14,.1)"}`, background:cgvChecked?C.ink:C.bg2, flexShrink:0, marginTop:1, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:900 }}>{cgvChecked&&"✓"}</div>
                      <div style={{ fontSize:13, fontWeight:500, color:"#3A3A3A", lineHeight:1.5 }}>
                        {lang==="fr"?"J'accepte les ":"Ich akzeptiere die "}<span onClick={e=>{e.stopPropagation();setShowCGV(true);}} style={{ fontWeight:700, color:C.ink, cursor:"pointer" }}>{lang==="fr"?"CGV":"AGB"}</span>{lang==="fr"?" de VOLT.":" von VOLT."}
                      </div>
                    </div>
                    <Btn onClick={doSignup} variant="dark">{t.signupBtn}</Btn>
                  </>
                )}
              </div>
            )}

            {/* FITNESS */}
            {loginType==="fitness" && (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ background:C.vlt, borderRadius:10, padding:"10px 14px", fontSize:13, fontWeight:700, textAlign:"center" }}>{t.fitSpace}</div>
                <Inp label="Email" type="email" value="fitness@volt.ch" onChange={()=>{}} placeholder="fitness@volt.ch"/>
                <Inp label={t.pwdL} type="password" value="fitness123" onChange={()=>{}} placeholder="••••••••"/>
                <Btn onClick={doFitLogin} variant="dark">{t.fitAccess}</Btn>
                <div style={{ background:C.bg2, borderRadius:10, padding:"10px 14px", fontSize:12, fontWeight:600, color:C.ink3, textAlign:"center" }}>{t.fitDemoNote}</div>
              </div>
            )}

            {/* ADMIN */}
            {loginType==="admin" && (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ background:C.ink, borderRadius:10, padding:"10px 14px", fontSize:13, fontWeight:700, color:C.volt, textAlign:"center" }}>{t.adminSpace}</div>
                <Inp label="Email" type="email" value="admin@volt.ch" onChange={()=>{}} placeholder="admin@volt.ch"/>
                <Inp label={t.pwdL} type="password" value="admin2025" onChange={()=>{}} placeholder="••••••••"/>
                <Btn onClick={doAdminLogin} variant="dark">Dashboard Admin ⚡</Btn>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ ONBOARDING (after scanning gym QR poster) ═══ */}
      {screen==="onboarding" && (() => {
        const gym = FILIALES.find(g=>g.id===onbGym);
        const sameFiliale = FILIALES.filter(g=>g.filiale===gym?.filiale);
        return (
          <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh" }}>
            {/* Header */}
            <div style={{ background:C.ink, padding:"40px 24px 30px", borderRadius:"0 0 28px 28px" }}>
              <div style={{ display:"inline-block", background:C.volt, borderRadius:8, padding:"4px 12px", marginBottom:16 }}>
                <span style={{ fontSize:11, fontWeight:800, letterSpacing:".08em", textTransform:"uppercase", color:C.ink }}>{t.onbTitle}</span>
              </div>
              <div style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,.4)", marginBottom:6 }}>{t.onbGym}</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:32, color:"#fff", lineHeight:1.1 }}>{gym?.name}</div>
              <div style={{ fontSize:13, fontWeight:500, color:"rgba(255,255,255,.35)", marginTop:4 }}>{gym?.loc}</div>
            </div>

            <div style={{ padding:"24px 24px", flex:1 }}>
              {/* Filiale access info */}
              <div style={{ background:"#fff", borderRadius:18, padding:20, marginBottom:16, border:"1px solid rgba(14,14,14,.06)" }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.vdk, marginBottom:10 }}>⚡ {t.onbDesc}</div>
                {sameFiliale.map(g=>(
                  <div key={g.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0", borderBottom:"1px solid rgba(14,14,14,.06)" }}>
                    <div style={{ width:8, height:8, background:C.grn, borderRadius:"50%", flexShrink:0 }}/>
                    <div style={{ fontSize:14, fontWeight:600, color:C.ink }}>{g.name}</div>
                    <div style={{ fontSize:12, fontWeight:500, color:C.ink3, marginLeft:"auto" }}>{g.loc.split("·")[1]?.trim()}</div>
                  </div>
                ))}
              </div>

              {/* Signup form */}
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  <Inp label={t.firstNameL} value="" onChange={()=>{}} placeholder="Alex"/>
                  <Inp label={t.lastNameL} value="" onChange={()=>{}} placeholder="Martin"/>
                </div>
                <Inp label="Email" type="email" value="" onChange={()=>{}} placeholder="ton@email.ch"/>
                <Inp label={t.phoneL} type="tel" value="" onChange={()=>{}} placeholder="+41 79 000 00 00"/>
                <Inp label={t.pwdL} type="password" value="" onChange={()=>{}} placeholder="Min. 8 caractères"/>
                <div onClick={()=>setCgvChecked(c=>!c)} style={{ display:"flex", alignItems:"flex-start", gap:12, cursor:"pointer" }}>
                  <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${cgvChecked?C.ink:"rgba(14,14,14,.1)"}`, background:cgvChecked?C.ink:C.bg2, flexShrink:0, marginTop:1, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:900 }}>{cgvChecked&&"✓"}</div>
                  <div style={{ fontSize:13, fontWeight:500, color:"#3A3A3A", lineHeight:1.5 }}>
                    {lang==="fr"?"J'accepte les ":"Ich akzeptiere die "}<span onClick={e=>{e.stopPropagation();setShowCGV(true);}} style={{ fontWeight:700, color:C.ink, cursor:"pointer" }}>{lang==="fr"?"CGV":"AGB"}</span>{lang==="fr"?" de VOLT.":" von VOLT."}
                  </div>
                </div>
                <Btn onClick={doSignup} variant="dark">{t.onbBtn}</Btn>
                <button onClick={()=>{setScreen("login");setOnbGym(null);}} style={{ background:"none", border:"none", fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:600, color:C.ink3, cursor:"pointer", textAlign:"center", padding:"8px 0" }}>{t.onbChange}</button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ═══ HOME / QR ═══ */}
      {screen==="home" && (
        <div style={{ paddingBottom:90, overflowY:"auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 20px 12px" }}>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:C.ink3 }}>{t.greeting}</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:28, color:C.ink, lineHeight:1 }}>{user.name.split(" ")[0]} {user.name.split(" ")[1]?.[0]}.</div>
            </div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:30, color:C.ink, letterSpacing:1 }}>VOLT</div>
          </div>

          {/* QR CARD */}
          <div style={{ background:C.ink, borderRadius:24, padding:20, margin:"0 20px", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 60% at 80% 0%,rgba(184,240,0,.12) 0%,transparent 70%)", borderRadius:24 }}/>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16, position:"relative" }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:24, color:C.volt, letterSpacing:2 }}>VOLT</div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:".08em", textTransform:"uppercase" }}>{t.planActive}</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:16, color:"#fff" }}>{planLabel()}</div>
              </div>
            </div>

            {/* QR FRAME */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
              <div style={{ position:"relative" }}>
                <div style={{ width:192, height:192, background:"#fff", borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
                  {!hasSub ? (
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, padding:20, textAlign:"center" }}>
                      <div style={{ fontSize:40 }}>🔒</div>
                      <div style={{ fontSize:13, fontWeight:700, color:C.ink3 }}>{t.subExpired}</div>
                    </div>
                  ) : QR}
                  {hasSub && hasCdSec && (
                    <div style={{ position:"absolute", inset:0, borderRadius:16, background:"rgba(14,14,14,.92)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <CDRing secs={cdSecs} total={900}/>
                    </div>
                  )}
                </div>
                {hasSub && !hasCdSec && (
                  <div style={{ position:"absolute", bottom:-12, left:"50%", transform:"translateX(-50%)", background:C.grn, color:"#fff", fontSize:10, fontWeight:800, letterSpacing:".06em", textTransform:"uppercase", padding:"4px 12px", borderRadius:20, whiteSpace:"nowrap" }}>
                    {lang==="fr"?"✓ Prêt à scanner":"✓ Bereit"}
                  </div>
                )}
              </div>

              <div style={{ marginTop:hasCdSec?12:22, textAlign:"center" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:18, color:"#fff" }}>{user.name}</div>
                <div style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,.35)", marginTop:2 }}>{t.qSub}</div>
              </div>

              {/* Cooldown bar */}
              {hasCdSec && (
                <div style={{ width:"100%", marginTop:12, background:"rgba(255,255,255,.07)", borderRadius:10, padding:"10px 14px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:".06em", textTransform:"uppercase" }}>{t.cdLabel}</div>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:16, color:cdSecs<60?C.red:cdSecs<180?C.org:C.volt }}>
                      {Math.floor(cdSecs/60)}:{String(cdSecs%60).padStart(2,"0")}
                    </div>
                  </div>
                  <div style={{ height:4, background:"rgba(255,255,255,.1)", borderRadius:2, overflow:"hidden" }}>
                    <div style={{ height:"100%", background:cdSecs<60?C.red:cdSecs<180?C.org:C.volt, borderRadius:2, width:`${cdSecs/900*100}%`, transition:"width 1s linear" }}/>
                  </div>
                  <div style={{ fontSize:11, fontWeight:500, color:"rgba(255,255,255,.3)", marginTop:6 }}>{t.cdInfo}</div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:14, paddingTop:12, borderTop:"1px solid rgba(255,255,255,.08)", position:"relative" }}>
              {[{v:conso,l:t.statMonth},{v:`${conso*9}.-`,l:t.statSaved},{v:"∞",l:lang==="fr"?"Boissons":"Getränke"}].map((s,i)=>(
                <div key={i} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:26, color:C.volt }}>{s.v}</div>
                  <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:".06em", textTransform:"uppercase" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* SCAN INSTRUCTION */}
          <div style={{ padding:"14px 20px 0" }}>
            {hasCdSec ? (
              <div style={{ background:"#FFF8E0", border:"1.5px solid #F0C000", borderRadius:14, padding:"14px 18px", display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:24, flexShrink:0 }}>⏳</span>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:20, color:C.ink }}>
                    {t.cdLabel} {Math.floor(cdSecs/60)}:{String(cdSecs%60).padStart(2,"0")}
                  </div>
                  <div style={{ fontSize:12, fontWeight:500, color:C.ink3, marginTop:2 }}>{t.cdInfo}</div>
                </div>
              </div>
            ) : (
              <div style={{ background:C.vlt, border:`1.5px solid ${C.volt}`, borderRadius:14, padding:"14px 18px", display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:24, flexShrink:0 }}>📲</span>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:20, color:C.ink }}>{t.scanInstr}</div>
                  <div style={{ fontSize:12, fontWeight:600, color:C.vdk, marginTop:2 }}>{t.scanAuto}</div>
                </div>
              </div>
            )}
            <button onClick={handleScan} disabled={hasCdSec}
              style={{ width:"100%", marginTop:8, padding:"10px", background:"transparent", border:"1px dashed rgba(14,14,14,.15)", borderRadius:10, fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:600, color:C.ink3, cursor:hasCdSec?"not-allowed":"pointer", opacity:hasCdSec?.35:1 }}>
              🖥️ {t.demoScan}
            </button>
          </div>

          {/* STAT TILES */}
          <div style={{ display:"flex", gap:10, padding:"12px 20px 0" }}>
            {[{v:todayCount,l:t.today},{v:5,l:t.streak},{v:"17j",l:t.renew}].map((s,i)=>(
              <div key={i} style={{ flex:1, background:"#fff", borderRadius:18, padding:14, border:"1px solid rgba(14,14,14,.06)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:30, color:C.ink, lineHeight:1 }}>{s.v}</div>
                <div style={{ fontSize:11, fontWeight:700, color:C.ink3, marginTop:2 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* ACCESSIBLE GYMS */}
          <div style={{ padding:"12px 20px 0" }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", marginBottom:8 }}>
              {lang==="fr"?"Mes fitness accessibles":"Meine zugänglichen Gyms"}
            </div>
            {accessibleGyms.map(g=>(
              <div key={g.id} style={{ background:"#fff", borderRadius:12, padding:"12px 16px", marginBottom:6, border:"1px solid rgba(14,14,14,.06)", display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:8, height:8, background:C.grn, borderRadius:"50%", flexShrink:0 }}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:700 }}>{g.name}</div>
                  <div style={{ fontSize:12, fontWeight:500, color:C.ink3 }}>{g.loc}</div>
                </div>
                {g.id===clientGym && <span style={{ background:C.vlt, fontSize:10, fontWeight:800, padding:"3px 8px", borderRadius:20 }}>Principal</span>}
              </div>
            ))}
          </div>

          {/* MINI HIST */}
          <div style={{ padding:"12px 20px 0" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase" }}>{t.recLabel}</div>
              <button onClick={()=>setScreen("hist")} style={{ background:"none", border:"none", fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:700, color:C.vdk, cursor:"pointer" }}>{t.seeAll}</button>
            </div>
            <div style={{ background:"#fff", borderRadius:18, padding:"0 16px", border:"1px solid rgba(14,14,14,.06)" }}>
              {hist.slice(0,3).map((item,i)=><HItem key={i} item={item} last={i===2} t={t}/>)}
            </div>
          </div>
        </div>
      )}

      {/* ═══ PAYMENT ═══ */}
      {screen==="pay" && (
        <div style={{ paddingBottom:90, overflowY:"auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 20px 12px" }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:34, color:C.ink }}>{t.payTitle}</div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:30, color:C.ink, letterSpacing:1 }}>VOLT</div>
          </div>
          {!hasSub && <div style={{ background:"#FFF0EE", borderRadius:10, padding:"12px 20px", margin:"0 20px 14px", fontSize:13, fontWeight:700, color:C.red }}>{t.subExpired}</div>}
          <div style={{ fontSize:15, fontWeight:500, color:C.ink3, padding:"0 20px 18px" }}>{t.payDesc}</div>

          {/* 4 PLANS */}
          <div style={{ display:"flex", flexDirection:"column", gap:10, padding:"0 20px", marginBottom:14 }}>
            {PLANS.map(p=>(
              <div key={p.key} onClick={()=>setPlan(p.key)}
                style={{ background:"#fff", border:`2px solid ${plan===p.key?C.ink:"rgba(14,14,14,.06)"}`, borderRadius:18, padding:18, cursor:"pointer", position:"relative" }}>
                {p.badge && <div style={{ position:"absolute", top:-1, left:16, background:p.badge==="bestVal"?"#FFD700":C.volt, color:C.ink, fontSize:10, fontWeight:800, letterSpacing:".06em", textTransform:"uppercase", padding:"3px 10px", borderRadius:"0 0 8px 8px" }}>{t[p.badge]||p.badge}</div>}
                <div style={{ position:"absolute", top:18, right:18, width:20, height:20, borderRadius:"50%", border:`2px solid ${plan===p.key?C.ink:"rgba(14,14,14,.1)"}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {plan===p.key && <div style={{ width:10, height:10, background:C.ink, borderRadius:"50%" }}/>}
                </div>
                <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", marginBottom:4 }}>{t[p.label]}</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:46, color:C.ink, lineHeight:1 }}>
                  <span style={{ fontSize:18, fontWeight:700, fontFamily:"'Barlow',sans-serif" }}>CHF </span>{p.chf}
                </div>
                <div style={{ fontSize:13, fontWeight:500, color:C.ink3, marginBottom:10 }}>{t[p.period]}</div>
                {p.key!=="day" && (
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {[t.pfQR, t.pfLimit, t.pfNetwork].map((f,i)=><div key={i} style={{ fontSize:14, fontWeight:600, color:"#3A3A3A", display:"flex", gap:8 }}><span>⚡</span>{f}</div>)}
                    {p.saving && <div style={{ fontSize:13, fontWeight:700, color:C.vdk, marginTop:4 }}>💰 {t.pfSaving} : {p.saving}</div>}
                  </div>
                )}
                {p.key==="day" && <div style={{ fontSize:14, fontWeight:600, color:"#3A3A3A", display:"flex", gap:8 }}><span>⚡</span>{t.pfDay}</div>}
              </div>
            ))}
          </div>

          {/* Auto renew */}
          <div style={{ background:C.bg2, borderRadius:10, padding:"14px 20px", margin:"0 20px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontSize:15, fontWeight:700 }}>{t.rtLabel}</div>
              <div style={{ fontSize:12, fontWeight:500, color:C.ink3, marginTop:2 }}>{t.rtSub}</div>
            </div>
            <Toggle on={autoRenew} onChange={()=>setAutoRenew(a=>!a)}/>
          </div>

          {/* Methods */}
          <div style={{ padding:"0 20px", marginBottom:6 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", marginBottom:12 }}>{t.pmLabel}</div>
            {[{k:"card",logo:"VISA\nMC",name:t.mnCard,sub:"Visa · Mastercard · AMEX",dark:false},{k:"twint",logo:"TW",name:"TWINT",sub:lang==="fr"?"Paiement mobile suisse":"Schweizer Mobile-Zahlung",dark:true}].map(m=>(
              <div key={m.k} onClick={()=>{setMethod(m.k); if(m.k==="twint")showToast("TWINT — scanne depuis ton app 📱");}}
                style={{ background:"#fff", border:`2px solid ${method===m.k?C.ink:"rgba(14,14,14,.06)"}`, borderRadius:18, padding:"14px 18px", display:"flex", alignItems:"center", gap:14, cursor:"pointer", marginBottom:10 }}>
                <div style={{ width:52, height:34, background:m.dark?"#000":C.bg2, borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:m.dark?13:10, fontWeight:900, color:m.dark?"#fff":C.ink, whiteSpace:"pre-line", textAlign:"center" }}>{m.logo}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:15, fontWeight:700 }}>{m.name}</div>
                  <div style={{ fontSize:12, fontWeight:500, color:C.ink3 }}>{m.sub}</div>
                </div>
                <div style={{ width:18, height:18, border:`2px solid ${method===m.k?C.ink:"rgba(14,14,14,.1)"}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  {method===m.k&&<div style={{ width:10, height:10, background:C.ink, borderRadius:"50%" }}/>}
                </div>
              </div>
            ))}
          </div>

          {/* Card form */}
          {method==="card" && (
            <div style={{ background:"#fff", borderRadius:18, border:"1px solid rgba(14,14,14,.06)", padding:20, margin:"0 20px 20px", display:"flex", flexDirection:"column", gap:14 }}>
              <Inp label="Numéro de carte" value="" onChange={()=>{}} placeholder="1234 5678 9012 3456"/>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <Inp label="Expiration" value="" onChange={()=>{}} placeholder="MM/AA"/>
                <Inp label="CVV" value="" onChange={()=>{}} placeholder="123"/>
              </div>
              <Inp label="Nom sur la carte" value="" onChange={()=>{}} placeholder="Alexandre Martin"/>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, fontSize:12, fontWeight:600, color:C.ink3 }}>🔒 {t.secLabel}</div>
            </div>
          )}

          <div style={{ padding:"0 20px 8px" }}>
            <Btn onClick={doPay} variant="volt">{t.payBtn}</Btn>
            <div style={{ textAlign:"center", fontSize:12, fontWeight:500, color:C.ink3, marginTop:10 }}>{t.payNote}</div>
          </div>
        </div>
      )}

      {/* ═══ HISTORY ═══ */}
      {screen==="hist" && (
        <div style={{ paddingBottom:90, overflowY:"auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 20px 12px" }}>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:40, color:C.ink }}>{t.histTitle}</div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:30, color:C.ink, letterSpacing:1 }}>VOLT</div>
          </div>
          <div style={{ background:C.ink, borderRadius:18, padding:20, margin:"0 20px 16px" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:".06em", textTransform:"uppercase", marginBottom:6 }}>Mai 2025</div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:56, color:C.volt, lineHeight:1 }}>{conso}</div>
            <div style={{ fontSize:14, fontWeight:600, color:"rgba(255,255,255,.4)" }}>{t.mcSub}</div>
            <div style={{ height:4, background:"rgba(255,255,255,.1)", borderRadius:2, marginTop:14, overflow:"hidden" }}>
              <div style={{ height:"100%", background:C.volt, borderRadius:2, width:`${Math.min(conso/30*100,100)}%` }}/>
            </div>
          </div>
          <div style={{ padding:"0 20px" }}>
            <div style={{ fontSize:12, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", marginBottom:10 }}>Mai 2025</div>
            <div style={{ background:"#fff", borderRadius:18, padding:"0 16px", border:"1px solid rgba(14,14,14,.06)" }}>
              {hist.map((item,i)=><HItem key={i} item={item} last={i===hist.length-1} t={t}/>)}
            </div>
          </div>
        </div>
      )}

      {/* ═══ ACCOUNT ═══ */}
      {screen==="acc" && (
        <div style={{ paddingBottom:90, overflowY:"auto" }}>
          <div style={{ background:C.ink, borderRadius:"0 0 28px 28px", padding:"20px 24px 28px", marginBottom:20 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:26, color:C.volt, letterSpacing:2 }}>VOLT</div>
              <div style={{ width:52, height:52, background:C.volt, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:20, color:C.ink }}>{user.initials}</div>
            </div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:38, color:"#fff", lineHeight:1.05 }}>{user.name.split(" ")[0]}<br/>{user.name.split(" ")[1]}</div>
            <div style={{ fontSize:13, fontWeight:500, color:"rgba(255,255,255,.35)", marginTop:6 }}>{user.email} · {user.phone}</div>
          </div>

          {/* Sub banner */}
          <div style={{ background:C.volt, borderRadius:18, padding:"18px 20px", margin:"0 20px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".06em", textTransform:"uppercase", color:C.ink, opacity:.5, marginBottom:2 }}>{t.sbPlan}</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:22, color:C.ink }}>{t[PLANS.find(p=>p.key===plan)?.label]||"Mensuel"}</div>
              <div style={{ fontSize:12, fontWeight:600, color:"rgba(14,14,14,.45)", marginTop:2 }}>{t.sbNext} {renewDate()}</div>
            </div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:38, color:C.ink }}>
              {PLANS.find(p=>p.key===plan)?.chf}
            </div>
          </div>

          {/* Mon gym */}
          <div style={{ background:"#fff", borderRadius:18, padding:"16px 20px", margin:"0 20px 14px", border:"1px solid rgba(14,14,14,.06)", display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ fontSize:24 }}>🏋️</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", marginBottom:2 }}>{t.myGym}</div>
              <div style={{ fontSize:15, fontWeight:700, color:C.ink }}>{FILIALES.find(g=>g.id===clientGym)?.name}</div>
              <div style={{ fontSize:12, fontWeight:500, color:C.ink3 }}>{accessibleGyms.length} fitness accessibles (même filiale)</div>
            </div>
          </div>

          {/* PARRAINAGE CARD */}
          <div style={{ background:"linear-gradient(135deg,#E8FFC0,#EDFFA0)", borderRadius:18, padding:"18px 20px", margin:"0 20px 14px", border:"1px solid rgba(184,240,0,.3)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
              <div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:22, color:C.ink }}>🤝 {t.referralTitle}</div>
                <div style={{ fontSize:13, fontWeight:500, color:C.vdk, marginTop:4, maxWidth:220 }}>{t.referralDesc}</div>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:32, color:C.ink }}>{freeMonths}</div>
                <div style={{ fontSize:10, fontWeight:700, color:C.vdk }}>{t.referralReward}</div>
              </div>
            </div>
            {/* Stats */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:12 }}>
              <div style={{ background:"rgba(255,255,255,.7)", borderRadius:10, padding:"10px 14px" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:28, color:C.ink }}>{referrals}</div>
                <div style={{ fontSize:11, fontWeight:700, color:C.vdk }}>{t.referralCount}</div>
              </div>
              <div style={{ background:"rgba(255,255,255,.7)", borderRadius:10, padding:"10px 14px" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:28, color:C.ink }}>{freeMonths}</div>
                <div style={{ fontSize:11, fontWeight:700, color:C.vdk }}>{t.referralReward}</div>
              </div>
            </div>
            {/* Link */}
            <div style={{ background:"rgba(255,255,255,.8)", borderRadius:10, padding:"10px 14px", marginBottom:10, display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ flex:1, fontSize:13, fontWeight:600, color:C.ink, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{refLink}</div>
              <button onClick={copyRef} style={{ background:C.ink, border:"none", borderRadius:8, padding:"6px 12px", fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:700, color:refCopied?C.volt:"#fff", cursor:"pointer", flexShrink:0, transition:"color .2s" }}>
                {refCopied?t.referralCopied:t.referralCopy}
              </button>
            </div>
            {/* Steps */}
            <button onClick={()=>setShowRef(s=>!s)} style={{ background:"none", border:"none", fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:700, color:C.vdk, cursor:"pointer", textDecoration:"underline" }}>{t.referralHow}</button>
            {showRef && (
              <div style={{ marginTop:10, display:"flex", flexDirection:"column", gap:6 }}>
                {[t.referralStep1,t.referralStep2,t.referralStep3].map((s,i)=>(
                  <div key={i} style={{ fontSize:13, fontWeight:500, color:C.ink }}>{s}</div>
                ))}
              </div>
            )}
          </div>

          <div style={{ padding:"0 20px" }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", marginBottom:8 }}>{t.accSection}</div>
            <Row icon="👤" label={t.editProfile} onClick={()=>setShowProfModal(true)}/>
            <Row icon="💳" label={t.manSub} right={`${PLANS.find(p=>p.key===plan)?.chf} CHF`} onClick={()=>setScreen("pay")}/>
            <Row icon="🧾" label={t.invoices} onClick={()=>showToast(t.invSent)}/>
            <Row icon="🔔" label={t.notifs} right={t.notifsOn} rightVolt onClick={()=>showToast(t.notifOK)}/>
            <Row icon="📄" label={t.cgvLabel} onClick={()=>setShowCGV(true)}/>
            {/* LANGUE — uniquement ici */}
            <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", margin:"16px 0 8px" }}>{t.langLabel}</div>
            <div style={{ display:"flex", background:C.bg2, borderRadius:8, padding:3, gap:3 }}>
              {["fr","de"].map(l=>(
                <button key={l} onClick={()=>setLang(l)} style={{ flex:1, padding:"8px 16px", borderRadius:6, border:"none", background:lang===l?"#fff":"transparent", fontFamily:"'Barlow',sans-serif", fontSize:14, fontWeight:700, color:lang===l?C.ink:C.ink3, cursor:"pointer", boxShadow:lang===l?"0 1px 3px rgba(0,0,0,.1)":"none" }}>
                  {l==="fr"?"🇫🇷 Français":"🇩🇪 Deutsch"}
                </button>
              ))}
            </div>
            <div style={{ marginTop:16 }}><Row icon="🚪" label={t.logout} onClick={doLogout} danger/></div>
          </div>
          <div style={{ height:20 }}/>
        </div>
      )}

      {/* ═══ FITNESS DASHBOARD ═══ */}
      {screen==="fit" && (
        <div style={{ paddingBottom:20, overflowY:"auto" }}>
          <div style={{ background:C.ink, borderRadius:"0 0 24px 24px", padding:"20px 24px 22px", marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:26, color:C.volt, letterSpacing:2 }}>VOLT</div>
              <button onClick={()=>setShowProfModal(true)} style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(255,255,255,.08)", border:"none", borderRadius:50, padding:"6px 14px 6px 8px", cursor:"pointer" }}>
                <div style={{ width:30, height:30, background:C.volt, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:13, color:C.ink }}>
                  {gyms[activeGym].name.split(" ").map(w=>w[0]).slice(0,2).join("")}
                </div>
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontSize:12, fontWeight:700, color:"#fff" }}>{gyms[activeGym].name}</div>
                  <div style={{ fontSize:10, fontWeight:600, color:"rgba(255,255,255,.4)" }}>Gérant · Modifier</div>
                </div>
              </button>
            </div>
            <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,.35)", letterSpacing:".08em", textTransform:"uppercase", marginBottom:8 }}>{t.gymSwLabel}</div>
            <div style={{ display:"flex", gap:8, overflowX:"auto" }}>
              {gyms.map((g,i)=>(
                <button key={g.id} onClick={()=>setActiveGym(i)} style={{ flexShrink:0, padding:"7px 14px", background:i===activeGym?"rgba(184,240,0,.2)":"rgba(255,255,255,.08)", color:i===activeGym?C.volt:"rgba(255,255,255,.45)", borderRadius:50, border:"none", fontFamily:"'Barlow',sans-serif", fontSize:13, fontWeight:700, cursor:"pointer" }}>
                  {g.name.split(" ").slice(0,2).join(" ")}
                </button>
              ))}
            </div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:28, color:"#fff", lineHeight:1, marginTop:12 }}>{gyms[activeGym].name}</div>
            <div style={{ fontSize:13, fontWeight:500, color:"rgba(255,255,255,.35)", marginTop:2 }}>{gyms[activeGym].loc}</div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, padding:"0 20px", marginBottom:14 }}>
            <Kpi val={`CHF ${gyms[activeGym].revenue}.-`} label={lang==="fr"?"Revenus ce mois":"Einnahmen"} green/>
            <Kpi val={gyms[activeGym].members} label={lang==="fr"?"Membres actifs":"Aktive Mitglieder"}/>
            <Kpi val={gyms[activeGym].scansMonth} label={lang==="fr"?"Scans ce mois":"Scans diesen Monat"}/>
            <Kpi val={clients.filter(c=>c.gym===gyms[activeGym].id&&!c.authorized).length} label={lang==="fr"?"Accès bloqués":"Gesperrte Zugänge"}/>
          </div>

          <div style={{ background:"#fff", borderRadius:18, padding:18, margin:"0 20px 14px", border:"1px solid rgba(14,14,14,.06)" }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", marginBottom:14 }}>Scans — 7 jours</div>
            <MiniChart/>
          </div>

          {/* Machine status */}
          <div style={{ padding:"0 20px", marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", marginBottom:8 }}>{t.fitMachLabel}</div>
            <div style={{ background:"#fff", borderRadius:18, padding:20, border:"1px solid rgba(14,14,14,.06)" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:18 }}>VOLT #{activeGym+1}</div>
                  <div style={{ fontSize:12, fontWeight:500, color:C.ink3 }}>{gyms[activeGym].loc}</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                  <div style={{ width:10, height:10, background:C.grn, borderRadius:"50%", boxShadow:"0 0 0 3px rgba(45,184,122,.15)" }}/>
                  <div style={{ fontSize:10, fontWeight:700, color:C.grn }}>EN LIGNE</div>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div style={{ background:C.bg2, borderRadius:10, padding:12, textAlign:"center" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:26 }}>{gyms[activeGym].scansToday}</div>
                  <div style={{ fontSize:10, fontWeight:700, color:C.ink3 }}>{lang==="fr"?"Scans aujourd'hui":"Heute"}</div>
                </div>
                <div style={{ background:C.bg2, borderRadius:10, padding:12, textAlign:"center" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:26 }}>98%</div>
                  <div style={{ fontSize:10, fontWeight:700, color:C.ink3 }}>Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Members with access control */}
          <div style={{ padding:"0 20px", marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase" }}>{t.fitMembers}</div>
              <button onClick={()=>showToast("CSV envoyé 📧")} style={{ background:"none", border:"none", fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:700, color:C.vdk, cursor:"pointer" }}>CSV →</button>
            </div>
            {clients.filter(c=>c.gym===gyms[activeGym].id).map((m,i,arr)=>{
              const gIdx = clients.findIndex(x=>x.i===m.i);
              return (
                <div key={i} style={{ background:"#fff", borderRadius:12, padding:"12px 14px", marginBottom:6, border:`1px solid ${!m.authorized?"rgba(255,59,48,.2)":"rgba(14,14,14,.06)"}` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
                    <div style={{ width:38, height:38, borderRadius:"50%", background:C.bg2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, flexShrink:0 }}>{m.i}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:14, fontWeight:700 }}>{m.n}</div>
                      <div style={{ fontSize:12, fontWeight:500, color:C.ink3 }}>{m.plan} · {m.scans} scans</div>
                    </div>
                    <span style={{ background:m.active?"#E8FFF2":"#FFF0EE", color:m.active?C.grn:C.red, fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20, flexShrink:0 }}>
                      {m.active?t.paidLabel:t.expiredLabel}
                    </span>
                  </div>
                  {/* ACCESS TOGGLE */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:10, borderTop:"1px solid rgba(14,14,14,.06)" }}>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color:m.authorized?C.grn:C.red }}>{m.authorized?t.accessAuth:t.accessBlocked}</div>
                      <div style={{ fontSize:11, fontWeight:500, color:C.ink3 }}>{m.authorized?t.accessCanUse:t.accessDenied}</div>
                    </div>
                    <Toggle on={m.authorized} onChange={()=>toggleAccess(gIdx)}/>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ padding:"0 20px 8px" }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", marginBottom:8 }}>{t.fitMgmt}</div>
            <Row icon="🏋️" label={t.fitEditProfile} onClick={()=>setShowProfModal(true)}/>
            <Row icon="🚪" label={t.logout} onClick={doLogout} danger/>
          </div>
        </div>
      )}

      {/* ═══ ADMIN ═══ */}
      {screen==="admin" && (
        <div style={{ paddingBottom:20, overflowY:"auto" }}>
          <div style={{ background:C.ink, borderRadius:"0 0 24px 24px", padding:"20px 24px 22px", marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
              <div>
                <div style={{ display:"inline-block", background:C.volt, borderRadius:6, padding:"3px 10px", marginBottom:8 }}>
                  <span style={{ fontSize:10, fontWeight:800, letterSpacing:".08em", textTransform:"uppercase", color:C.ink }}>Admin VOLT</span>
                </div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:38, color:"#fff" }}>{t.adminTitle}</div>
                <div style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,.35)", marginTop:2 }}>{t.adminSub}</div>
              </div>
              <button onClick={doLogout} style={{ background:"rgba(255,255,255,.08)", border:"none", borderRadius:8, padding:"8px 12px", fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:700, color:"rgba(255,255,255,.5)", cursor:"pointer" }}>Quitter</button>
            </div>
          </div>

          {/* Global KPIs */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, padding:"0 20px", marginBottom:14 }}>
            <Kpi val={`CHF ${gyms.reduce((s,g)=>s+g.revenue,0)}.-`} label={lang==="fr"?"Revenus globaux":"Gesamteinnahmen"} green/>
            <Kpi val={clients.filter(c=>c.active).length} label={lang==="fr"?"Abonnés actifs":"Aktive Abos"}/>
            <Kpi val={clients.reduce((s,c)=>s+c.scans,0)} label={lang==="fr"?"Scans totaux":"Gesamtscans"}/>
            <Kpi val={clients.filter(c=>!c.authorized).length} label={t.blockedAccess}/>
          </div>

          {/* Revenue by fitness */}
          <div style={{ background:"#fff", borderRadius:18, padding:18, margin:"0 20px 14px", border:"1px solid rgba(14,14,14,.06)" }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", marginBottom:14 }}>{t.revByFit}</div>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr>{["Fitness","Filiale","Membres","CHF"].map(h=><th key={h} style={{ fontSize:10, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", padding:"8px 10px", textAlign:"left", borderBottom:"1px solid rgba(14,14,14,.06)" }}>{h}</th>)}</tr></thead>
              <tbody>
                {gyms.map(g=>(
                  <tr key={g.id}>
                    <td style={{ fontSize:13, fontWeight:700, padding:"11px 10px", borderBottom:"1px solid rgba(14,14,14,.06)" }}>{g.name.split(" ").slice(0,2).join(" ")}</td>
                    <td style={{ fontSize:12, fontWeight:500, color:C.ink3, padding:"11px 10px", borderBottom:"1px solid rgba(14,14,14,.06)" }}>{g.filiale}</td>
                    <td style={{ fontSize:13, fontWeight:600, padding:"11px 10px", borderBottom:"1px solid rgba(14,14,14,.06)" }}>{g.members}</td>
                    <td style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:18, padding:"11px 10px", borderBottom:"1px solid rgba(14,14,14,.06)" }}>{g.revenue}.-</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid rgba(14,14,14,.06)", display:"flex", justifyContent:"space-between" }}>
              <div style={{ fontSize:13, fontWeight:700, color:C.ink3 }}>TOTAL</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:22, color:C.vdk }}>CHF {gyms.reduce((s,g)=>s+g.revenue,0)}.-</div>
            </div>
          </div>

          <div style={{ background:"#fff", borderRadius:18, padding:18, margin:"0 20px 14px", border:"1px solid rgba(14,14,14,.06)" }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", marginBottom:14 }}>Scans globaux — 7 jours</div>
            <MiniChart/>
          </div>

          {/* Top clients */}
          <div style={{ padding:"0 20px", marginBottom:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase" }}>{t.topClients}</div>
              <button onClick={()=>showToast("Export CSV 📧")} style={{ background:"none", border:"none", fontFamily:"'Barlow',sans-serif", fontSize:12, fontWeight:700, color:C.vdk, cursor:"pointer" }}>{t.exportCSV}</button>
            </div>
            {[...clients].sort((a,b)=>b.scans-a.scans).slice(0,5).map((m,i)=>(
              <div key={i} style={{ background:"#fff", borderRadius:10, display:"flex", alignItems:"center", gap:12, padding:14, marginBottom:4, border:"1px solid rgba(14,14,14,.06)" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:18, color:i===0?C.volt:C.ink3, width:24, flexShrink:0 }}>#{i+1}</div>
                <div style={{ width:36, height:36, borderRadius:"50%", background:i===0?C.volt:C.bg2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, flexShrink:0 }}>{m.i}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:14, fontWeight:700 }}>{m.n}</div>
                  <div style={{ fontSize:12, fontWeight:500, color:C.ink3 }}>{FILIALES.find(g=>g.id===m.gym)?.name.split(" ").slice(0,2).join(" ")} · {m.plan}</div>
                </div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:22 }}>{m.scans}</div>
                  <div style={{ fontSize:10, fontWeight:600, color:C.ink3 }}>scans</div>
                </div>
              </div>
            ))}
          </div>

          {/* All clients with access toggle */}
          <div style={{ padding:"0 20px", marginBottom:14 }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", marginBottom:8 }}>{t.allClients} ({clients.length})</div>
            {clients.map((m,i)=>(
              <div key={i} style={{ background:"#fff", borderRadius:12, padding:"12px 14px", marginBottom:6, border:`1px solid ${!m.authorized?"rgba(255,59,48,.2)":"rgba(14,14,14,.06)"}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:C.bg2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800, flexShrink:0 }}>{m.i}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:700 }}>{m.n}</div>
                    <div style={{ fontSize:12, fontWeight:500, color:C.ink3 }}>
                      {FILIALES.find(g=>g.id===m.gym)?.name.split(" ").slice(0,2).join(" ")} · {m.plan}
                    </div>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                    <span style={{ background:m.active?"#E8FFF2":"#FFF0EE", color:m.active?C.grn:C.red, fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20 }}>{m.active?t.paidLabel:t.expiredLabel}</span>
                    {!m.authorized && <span style={{ background:"#FFF0EE", color:C.red, fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:20, border:"1px solid rgba(255,59,48,.2)" }}>⛔ Bloqué</span>}
                  </div>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:8, borderTop:"1px solid rgba(14,14,14,.06)" }}>
                  <div style={{ fontSize:12, fontWeight:700, color:m.authorized?C.grn:C.red }}>
                    {m.authorized?t.accessAuth:t.accessBlocked}
                  </div>
                  <Toggle on={m.authorized} onChange={()=>toggleAccess(i)}/>
                </div>
              </div>
            ))}
          </div>

          {/* Machine status */}
          <div style={{ padding:"0 20px 20px" }}>
            <div style={{ fontSize:11, fontWeight:700, color:C.ink3, letterSpacing:".06em", textTransform:"uppercase", marginBottom:8 }}>{t.machineStatus}</div>
            {gyms.map((g,i)=>(
              <div key={g.id} style={{ background:"#fff", borderRadius:18, padding:20, border:"1px solid rgba(14,14,14,.06)", marginBottom:10, display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:16 }}>VOLT #{i+1} — {g.name.split(" ").slice(0,2).join(" ")}</div>
                  <div style={{ fontSize:12, fontWeight:500, color:C.ink3 }}>{g.filiale} · {g.loc}</div>
                  <div style={{ fontSize:12, fontWeight:600, marginTop:4 }}>{g.scansToday} scans auj. · {g.scansMonth} ce mois</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3 }}>
                  <div style={{ width:10, height:10, background:C.grn, borderRadius:"50%" }}/>
                  <div style={{ fontSize:10, fontWeight:700, color:C.grn }}>ONLINE</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ BOTTOM NAV (client only) ═══ */}
      {isClient && screen!=="login" && screen!=="onboarding" && (
        <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"#fff", borderTop:"1px solid rgba(14,14,14,.06)", display:"flex", justifyContent:"space-around", padding:"10px 0 16px", zIndex:200 }}>
          {[
            {id:"home",icon:"⚡",label:lang==="fr"?"Mon QR":"Mein QR"},
            {id:"pay",icon:"💳",label:lang==="fr"?"Abonnement":"Abo"},
            {id:"hist",icon:"📊",label:lang==="fr"?"Historique":"Verlauf"},
            {id:"acc",icon:"👤",label:lang==="fr"?"Compte":"Konto"},
          ].map(nb=>(
            <button key={nb.id} onClick={()=>setScreen(nb.id)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, background:"none", border:"none", color:screen===nb.id?C.ink:C.ink3, fontFamily:"'Barlow',sans-serif", fontSize:10, fontWeight:600, letterSpacing:".04em", textTransform:"uppercase", cursor:"pointer", padding:"2px 14px", transition:"color .15s" }}>
              <span style={{ fontSize:22, lineHeight:1 }}>{nb.icon}</span>
              <span>{nb.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* ═══ MODALS ═══ */}
      <Modal show={showProfModal} title={role==="client"?t.editProfile:t.fitEditProfile} onClose={()=>setShowProfModal(false)}>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {role==="client" ? (
            <>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <Inp label={t.firstNameL} value={user.name.split(" ")[0]} onChange={v=>setUser(u=>({...u,name:v+" "+(u.name.split(" ")[1]||"")}))} placeholder="Alex"/>
                <Inp label={t.lastNameL} value={user.name.split(" ")[1]||""} onChange={v=>setUser(u=>({...u,name:(u.name.split(" ")[0]||"")+" "+v}))} placeholder="Martin"/>
              </div>
              <Inp label="Email" type="email" value={user.email} onChange={v=>setUser(u=>({...u,email:v}))} placeholder="ton@email.ch"/>
              <Inp label={t.phoneL} type="tel" value={user.phone} onChange={v=>setUser(u=>({...u,phone:v}))} placeholder="+41 79 000 00 00"/>
            </>
          ):(
            <>
              <Inp label={lang==="fr"?"Nom du fitness":"Name des Fitness"} value={gyms[activeGym].name} onChange={v=>setGyms(g=>g.map((x,i)=>i===activeGym?{...x,name:v}:x))} placeholder="Fitness Park Lausanne"/>
              <Inp label={lang==="fr"?"Adresse":"Adresse"} value={gyms[activeGym].loc} onChange={v=>setGyms(g=>g.map((x,i)=>i===activeGym?{...x,loc:v}:x))} placeholder="Av. de la Gare 14 · Lausanne"/>
              <Inp label="Email" type="email" value="fitness@volt.ch" onChange={()=>{}} placeholder="fitness@volt.ch"/>
              <Inp label={t.phoneL} type="tel" value="+41 21 000 00 00" onChange={()=>{}} placeholder="+41 21 000 00 00"/>
            </>
          )}
          <Btn onClick={()=>{setShowProfModal(false);showToast(t.profOK);}} variant="dark">{t.saveBtn}</Btn>
          <Btn onClick={()=>setShowProfModal(false)} variant="outline">{t.cancelBtn}</Btn>
        </div>
      </Modal>

      <Modal show={showCGV} title={t.cgvTitle} onClose={()=>setShowCGV(false)}>
        <div style={{ fontSize:13, fontWeight:500, color:"#3A3A3A", lineHeight:1.9, marginBottom:20, whiteSpace:"pre-wrap" }}>{t.cgvText}</div>
        <Btn onClick={()=>setShowCGV(false)} variant="dark">{t.cgvRead}</Btn>
      </Modal>
    </div>
  );
}
