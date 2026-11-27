// Fichier d'agenda (.ics) d'une activité : « Ajouter à mon agenda » (téléphone, Outlook, Google…).
// Contient uniquement les séances à venir et non annulées. Aucune donnée personnelle.
import { connection } from "next/server";
import { hasLocale, type Locale } from "@/lib/i18n";
import { formatPlage, maintenantBruxelles, seances } from "@/lib/planning";
import { planningPublie } from "@/lib/planning-public";

const echapper = (s: string) => s.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
// Les lignes d'un fichier .ics ne doivent pas dépasser 75 octets : on les replie.
const plier = (l: string) => { const out: string[] = []; let reste = l; while (reste.length > 60) { out.push(reste.slice(0, 60)); reste = " " + reste.slice(60); } out.push(reste); return out.join("\r\n"); };
const dt = (date: string, heure: string) => `${date.replace(/-/g, "")}T${heure.replace(":", "")}00`;

export async function GET(requete: Request, { params }: RouteContext<"/agenda/[fichier]">) {
  await connection();
  const { fichier } = await params;
  const id = fichier.replace(/\.ics$/, "");
  if (!/^[0-9a-f-]{36}$/.test(id)) return new Response("Introuvable", { status: 404 });
  const l = new URL(requete.url).searchParams.get("lang") ?? "fr";
  const lang: Locale = hasLocale(l) ? l : "fr";
  const { activites } = await planningPublie();
  const a = activites.find((x) => x.id === id);
  if (!a) return new Response("Introuvable", { status: 404 });

  const aujourdhui = maintenantBruxelles().date;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const lieuMme = "Maison Médicale Esseghem, Rue Esseghem 24, 1090 Jette";
  const lignes = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Maison Medicale Esseghem//Planning//FR", "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    "BEGIN:VTIMEZONE", "TZID:Europe/Brussels",
    "BEGIN:DAYLIGHT", "TZOFFSETFROM:+0100", "TZOFFSETTO:+0200", "TZNAME:CEST", "DTSTART:19700329T020000", "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU", "END:DAYLIGHT",
    "BEGIN:STANDARD", "TZOFFSETFROM:+0200", "TZOFFSETTO:+0100", "TZNAME:CET", "DTSTART:19701025T030000", "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU", "END:STANDARD",
    "END:VTIMEZONE",
  ];
  for (const s of seances(a).filter((x) => !x.annulee && x.date >= aujourdhui)) {
    const lieu = a.lieu_type === "mme" ? [lieuMme, s.lieu].filter(Boolean).join(" – ") : s.lieu ?? "";
    lignes.push(
      "BEGIN:VEVENT",
      `UID:${a.id}-${s.dateOrigine}@maisonmedicaleesseghem.be`,
      `DTSTAMP:${stamp}`,
      `DTSTART;TZID=Europe/Brussels:${dt(s.date, s.heureDebut)}`,
      `DTEND;TZID=Europe/Brussels:${dt(s.date, s.heureFin ?? s.heureDebut)}`,
      plier(`SUMMARY:${echapper(a.titre[lang])}`),
      plier(`DESCRIPTION:${echapper(`${a.description[lang]} (${formatPlage(s.heureDebut, s.heureFin, lang)})`)}`),
      plier(`LOCATION:${echapper(lieu)}`),
      "END:VEVENT",
    );
  }
  lignes.push("END:VCALENDAR");
  return new Response(lignes.join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="mme-activite.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
