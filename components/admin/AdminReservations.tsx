"use client";

import Image from "next/image";
import { Pencil, Printer, Trash2, X } from "lucide-react";
import { useState } from "react";
import {
  deleteInscription,
  deletePackOrder,
  deleteQuoteRequest,
  updateInscription,
  type AdminInscription,
  type AdminPackOrder,
  type AdminQuoteRequest,
  type AdminUser,
} from "@/app/admin/actions";

const priceByOffer: Record<string, number> = {
  "Pack Basique": 25000,
  "Pack Standard": 60000,
  "Pack Bon Plan": 150000,
  "Pack Premium": 250000,
  "Pack Entreprise": 650000,
};

function formatAmount(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount);
}

function formatDateTime(dateValue: string | Date) {
  const date = new Date(dateValue);
  return `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

function getInvoiceNumber(createdAt: string, reservationId: string) {
  const year = new Date(createdAt).getFullYear();
  return `FACT-${year}-${reservationId.slice(-6).toUpperCase()}`;
}

function getPaymentStatus(status: AdminUser["reservations"][number]["status"]) {
  return status === "CONFIRMED"
    ? { label: "Payé", className: "bg-emerald-100 text-emerald-800" }
    : { label: "En attente", className: "bg-amber-100 text-amber-800" };
}

function amountToWords(amount: number) {
  const units = [
    "zéro",
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
  ];
  const teens = [
    "dix",
    "onze",
    "douze",
    "treize",
    "quatorze",
    "quinze",
    "seize",
    "dix-sept",
    "dix-huit",
    "dix-neuf",
  ];
  const tens = [
    "",
    "",
    "vingt",
    "trente",
    "quarante",
    "cinquante",
    "soixante",
    "soixante-dix",
    "quatre-vingt",
    "quatre-vingt-dix",
  ];

  function convertUnderHundred(value: number): string {
    if (value < 10) return units[value];
    if (value < 20) return teens[value - 10];
    const tensPart = Math.floor(value / 10);
    const unitPart = value % 10;

    if (unitPart === 0) {
      return tens[tensPart];
    }

    if (tensPart === 7) {
      return `soixante-${units[unitPart]}`;
    }

    if (tensPart === 8) {
      return `${tens[tensPart]}-${units[unitPart]}`;
    }

    if (tensPart === 9) {
      return `quatre-vingt-${units[unitPart]}`;
    }

    return `${tens[tensPart]}-${units[unitPart]}`;
  }

  function convertNumber(value: number): string {
    if (value < 100) return convertUnderHundred(value);
    if (value < 1000) {
      const hundreds = Math.floor(value / 100);
      const rest = value % 100;
      if (rest === 0) {
        return `${units[hundreds]} cent`;
      }
      return `${units[hundreds]} cent ${convertUnderHundred(rest)}`;
    }
    if (value < 1000000) {
      const thousands = Math.floor(value / 1000);
      const rest = value % 1000;
      if (thousands === 1 && rest === 0) return "mille";
      if (thousands === 1) return `mille ${convertNumber(rest)}`;
      if (rest === 0) return `${convertNumber(thousands)} mille`;
      return `${convertNumber(thousands)} mille ${convertNumber(rest)}`;
    }
    const millions = Math.floor(value / 1000000);
    const rest = value % 1000000;
    if (millions === 1 && rest === 0) return "un million";
    if (millions === 1) return `un million ${convertNumber(rest)}`;
    if (rest === 0) return `${convertNumber(millions)} millions`;
    return `${convertNumber(millions)} millions ${convertNumber(rest)}`;
  }

  const rounded = Math.floor(amount);
  const words = convertNumber(rounded);
  return `${words.charAt(0).toUpperCase()}${words.slice(1)}`;
}

function getInvoiceAmountForLabel(label: string, explicitPrice?: number | null) {
  if (typeof explicitPrice === "number" && Number.isFinite(explicitPrice) && explicitPrice > 0) {
    return explicitPrice;
  }

  const trimmedLabel = label.trim();

  if (!trimmedLabel) {
    return 0;
  }

  const exactMatch = priceByOffer[trimmedLabel];
  if (exactMatch) {
    return exactMatch;
  }

  const normalized = trimmedLabel.toLowerCase();
  for (const [name, price] of Object.entries(priceByOffer)) {
    if (normalized.includes(name.toLowerCase())) {
      return price;
    }
  }

  return 0;
}

type InvoiceDraft = {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  itemName: string;
  object: string;
  description: string;
  amount: number;
  discount: number;
  invoiceNumber: string;
  invoiceDate: string;
};

function createDefaultInvoiceDraft({
  id,
  customerName,
  email,
  phone,
  itemName,
  itemType,
  amount,
}: {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  itemName: string;
  itemType: "inscription" | "quote" | "pack";
  amount: number;
}): InvoiceDraft {
  const year = new Date().getFullYear();
  const objectMap = {
    inscription: `Facture pour la formation ${itemName}`,
    quote: `Facture pour ${itemName}`,
    pack: `Facture pour le pack ${itemName}`,
  };

  const descriptionMap = {
    inscription: `Inscription à la formation ${itemName}. Le client bénéficie du programme, du support pédagogique, et des ressources associées selon les conditions convenues avec Izicasa Sénégal.`,
    quote: `Prestation relative à ${itemName}. Le devis couvre les services et livrables définis lors de la demande de devis et validés par le client.`,
    pack: `Commande du pack ${itemName}. Le montant correspond aux prestations incluses dans le pack sélectionné, selon la convention commerciale validée.`,
  };

  return {
    id,
    customerName,
    email,
    phone,
    itemName,
    object: objectMap[itemType],
    description: descriptionMap[itemType],
    amount,
    discount: 0,
    invoiceNumber: `FACT-${year}-${id.slice(-6).toUpperCase()}`,
    invoiceDate: new Date().toISOString().slice(0, 10),
  };
}

function getInvoiceHtml(invoice: InvoiceDraft) {
  const netAmount = Math.max(0, invoice.amount - (invoice.discount || 0));
  const formattedAmount = `${formatAmount(netAmount)} FCFA`;
  const invoiceNumber = invoice.invoiceNumber || `IZI-ACO-${invoice.id.slice(-6).toUpperCase()}`;
  const invoiceDate = invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString("fr-FR") : new Date().toLocaleDateString("fr-FR");
  const amountInWords = amountToWords(netAmount);
  const shouldShowNbNotice = /production audiovisuelle|audiovisuelle|prise d['’]image|prise de vue|vid[eé]o/i.test(`${invoice.object} ${invoice.description}`);
  const discountAmount = Number(invoice.discount || 0);

  return `
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Facture ${invoiceNumber}</title>
        <style>
          @page {
            size: A4;
            margin: 10mm;
          }

          html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
            page-break-after: avoid;
            page-break-before: avoid;
            font-family: Arial, sans-serif;
            background: #f3f6f4;
            color: #0f172a;
          }

          body {
            padding: 15px;
          }

          .page {
            width: 100%;
            max-width: 100%;
            margin: 0;
            background: #fff;
            box-sizing: border-box;
          }

          .topbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 18px;
            background: #005a43;
            color: #ffffff;
            border-radius: 8px;
            padding: 15px 18px;
            margin: 0 0 10px;
          }

          .company {
            flex: 1;
            line-height: 1.5;
            font-size: 12px;
            font-weight: 600;
          }

          .company strong {
            display: block;
            font-size: 22px;
            font-weight: 800;
            letter-spacing: 0.04em;
            margin-bottom: 4px;
          }

          .company p {
            margin: 0;
          }

          .logo-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 160px;
            min-width: 160px;
            height: 72px;
            padding: 8px;
            box-sizing: border-box;
          }

          .logo-wrap img {
            max-width: 150px;
            max-height: 60px;
            object-fit: contain;
            display: block;
          }

          .content {
            padding: 0 8px 0;
          }

          .meta-grid {
            display: grid;
            grid-template-columns: 1.15fr 0.85fr;
            gap: 12px;
            margin-bottom: 10px;
          }

          .meta-box {
            background: #f8faf8;
            border: 1px solid #dfe7e3;
            border-radius: 8px;
            padding: 10px 12px;
          }

          .meta-box .label {
            display: block;
            margin-bottom: 5px;
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #355b4d;
          }

          .meta-box p {
            margin: 4px 0;
            font-size: 12px;
            line-height: 1.5;
            color: #1f2937;
          }

          .meta-box strong {
            color: #005a43;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin: 6px 0 10px;
            table-layout: fixed;
          }

          thead th {
            background: #005a43;
            color: #ffffff;
            font-size: 11px;
            font-weight: 700;
            text-align: left;
            padding: 8px 8px;
          }

          thead th.qty {
            width: 60px;
            background: #c0ca33;
            color: #102a1c;
            text-align: center;
          }

          tbody td {
            border-bottom: 1px solid #e5e7eb;
            padding: 10px 8px;
            font-size: 11px;
            color: #1f2937;
            vertical-align: top;
          }

          .qty-cell {
            background: #f8faf9;
            text-align: center;
            font-weight: 700;
          }

          .amount-col {
            text-align: right;
            white-space: nowrap;
          }

          .summary {
            display: grid;
            grid-template-columns: 1.15fr 0.85fr;
            gap: 12px;
            margin-top: 10px;
            align-items: start;
          }

          .summary-box {
            background: #f6faf7;
            border: 1px solid #dfe7e3;
            border-radius: 8px;
            padding: 10px 12px;
            font-size: 11px;
            color: #1f2937;
          }

          .summary-box p {
            margin: 0 0 4px;
            line-height: 1.6;
          }

          .total-box {
            background: #edf9f1;
            border: 1px solid #7db18d;
            border-radius: 10px;
            padding: 10px 12px;
          }

          .total-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 6px;
            font-size: 11px;
            color: #1f2937;
            margin-bottom: 4px;
          }

          .total-row.total {
            border-top: 2px solid #005a43;
            margin-top: 8px;
            padding-top: 8px;
            font-size: 13px;
            font-weight: 800;
            color: #005a43;
          }

          .notice {
            margin-top: 10px;
            font-size: 11px;
            color: #374151;
            line-height: 1.5;
          }

          .stamp-wrap {
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
            margin-top: 10px;
            margin-bottom: 6px;
          }

          .stamp {
            width: 140px;
            max-width: 140px;
            height: auto;
            display: block;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.12));
          }

          .stamp img {
            display: block;
            width: 140px;
            height: auto;
            object-fit: contain;
          }

          .footer-bar {
            display: flex;
            width: 100%;
            height: 10px;
            margin-top: 6px;
          }

          .footer-bar .left {
            width: 20%;
            background: #c0ca33;
          }

          .footer-bar .right {
            width: 80%;
            background: #005a43;
          }

          .footer {
            padding: 10px 8px 0;
            text-align: center;
            font-size: 9px;
            line-height: 1.4;
            color: #374151;
          }
        </style>
      </head>
      <body>
        <div class="page">
          <header class="topbar">
            <div class="company">
              <strong>IZICASA SENEGAL</strong>
              <p>N° RCCM : SN.ZGR.2022.A.2022</p>
              <p>Adresse : Ziguinchor, Sénégal</p>
              <p>Téléphone : +221 339902766</p>
              <p>Email : izicasa221@gmail.com</p>
            </div>
            <div class="logo-wrap">
              <img src="/logo/izicasa-fond-transparent.png" alt="Logo IZICASA Sénégal" />
            </div>
          </header>

          <div class="content">
            <div class="meta-grid">
              <div class="meta-box">
                <span class="label">Facture</span>
                <p><strong>Facture N° :</strong> ${invoiceNumber}</p>
                <p><strong>Date :</strong> ${invoiceDate}</p>
                <p><strong>Objet :</strong> ${invoice.object}</p>
              </div>

              <div class="meta-box">
                <span class="label">Client</span>
                <p><strong>Client :</strong> ${invoice.customerName}</p>
                <p><strong>Email :</strong> ${invoice.email || "Email non renseigné"}</p>
                <p><strong>Tél :</strong> ${invoice.phone || "Téléphone non renseigné"}</p>
              </div>
            </div>

            <div class="summary-box" style="margin-bottom: 12px;">
              <p><strong>Description :</strong> ${invoice.description || "Prestations conforme à la commande et au devis validé."}</p>
            </div>

            <table>
              <thead>
                <tr>
                  <th class="qty">Qté.</th>
                  <th>Description</th>
                  <th class="amount-col">Prix.U</th>
                  <th class="amount-col">Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="qty-cell">1</td>
                  <td>${invoice.itemName}</td>
                  <td class="amount-col">${formatAmount(invoice.amount)} FCFA</td>
                  <td class="amount-col"><strong>${formattedAmount}</strong></td>
                </tr>
              </tbody>
            </table>

            <div class="summary">
              <div class="summary-box">
                <p><strong>Modalité de paiement :</strong> 100 % à la commande</p>
                <p><strong>Facturé à :</strong> ${netAmount > 0 ? `${amountInWords} FCFA` : "Sur devis"}</p>
                <p><strong>Reliquat à payer :</strong> ${netAmount > 0 ? "0 FCFA" : "À déterminer"}</p>
              </div>

              <div class="total-box">
                <div class="total-row"><span>MONTANT TOTAL HT</span><span>${formattedAmount}</span></div>
                <div class="total-row"><span>Remise / réduction</span><span>-${formatAmount(discountAmount)} FCFA</span></div>
                <div class="total-row"><span>TVA (00 %)</span><span>0 FCFA</span></div>
                <div class="total-row total"><span>MONTANT TOTAL TTC</span><span>${formattedAmount}</span></div>
              </div>
            </div>

            ${shouldShowNbNotice ? `
              <div class="notice">
                <strong>NB :</strong> le transport est aux charges du Clients. Après la prise d'image, le rendu va être envoyé dans un délai maximum de cinq jours.
              </div>
            ` : ""}

            <div class="stamp-wrap">
              <div class="stamp">
                <img src="/blogimages/cachet-izicasa.png" alt="Cachet IZICASA" />
              </div>
            </div>
          </div>

          <div class="footer-bar">
            <div class="left"></div>
            <div class="right"></div>
          </div>

          <div class="footer">
            IZICASA SENEGAL - Châteaux d'Eaux, Rue de l'université - Ziguinchor / Sénégal –<br />
            Rccm : SN.ZGR.2022.A.2022 - Email : izicasa221@gmail.com - Compte Bank : 10203712000178<br />
            Tél : + 221 773679985 / + 221 339902766 - 009734410 - Site Web : www.izicasa.sn
          </div>
        </div>
      </body>
    </html>
  `;
}

export function AdminReservations({
  users,
  inscriptions,
  quoteRequests,
  packOrders,
}: {
  users: AdminUser[];
  inscriptions: AdminInscription[];
  quoteRequests: AdminQuoteRequest[];
  packOrders: AdminPackOrder[];
}) {
  const [tab, setTab] = useState<"users" | "reservations" | "inscriptions" | "quoteRequests" | "packOrders">("users");
  const [selected, setSelected] = useState<{
    user: AdminUser;
    reservation: AdminUser["reservations"][number];
  } | null>(null);
  const [editingInscription, setEditingInscription] = useState<AdminInscription | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    formation: "",
  });

  const reservationRows = users.flatMap((user) =>
    user.reservations.map((reservation) => ({ user, reservation }))
  );

  const [invoiceEditor, setInvoiceEditor] = useState<InvoiceDraft | null>(null);

  const openInvoiceEditor = ({
    id,
    customerName,
    email,
    phone,
    itemName,
    itemType,
    amount,
  }: {
    id: string;
    customerName: string;
    email: string;
    phone: string;
    itemName: string;
    itemType: "inscription" | "quote" | "pack";
    amount: number;
  }) => {
    setInvoiceEditor(
      createDefaultInvoiceDraft({
        id,
        customerName,
        email,
        phone,
        itemName,
        itemType,
        amount,
      })
    );
  };

  const handleInvoiceDownload = (invoice: InvoiceDraft) => {
    const invoiceWindow = window.open("", "_blank", "width=1100,height=1400");
    if (!invoiceWindow) {
      return;
    }

    invoiceWindow.document.write(getInvoiceHtml(invoice));
    invoiceWindow.document.close();
    setTimeout(() => invoiceWindow.focus(), 200);
    setTimeout(() => invoiceWindow.print(), 400);
  };

  const openInvoiceWindow = (inscription: AdminInscription) => {
    const itemName = inscription.formation || "Formation non précisée";
    const amount = getInvoiceAmountForLabel(itemName, inscription.price ?? null);
    openInvoiceEditor({
      id: inscription.id,
      customerName: inscription.name,
      email: inscription.email,
      phone: inscription.phone,
      itemName,
      itemType: "inscription",
      amount,
    });
  };

  const openQuoteInvoiceWindow = (quote: AdminQuoteRequest) => {
    const itemName = quote.subject || "Demande de devis";
    const amount = getInvoiceAmountForLabel(itemName, quote.price ?? null);
    openInvoiceEditor({
      id: quote.id,
      customerName: quote.name,
      email: quote.email,
      phone: quote.phone,
      itemName,
      itemType: "quote",
      amount,
    });
  };

  const openPackInvoiceWindow = (pack: AdminPackOrder) => {
    const itemName = pack.packName || "Pack non précisé";
    const amount = getInvoiceAmountForLabel(itemName, pack.price ?? null);
    openInvoiceEditor({
      id: pack.id,
      customerName: pack.name,
      email: pack.email,
      phone: pack.phone,
      itemName,
      itemType: "pack",
      amount,
    });
  };

  const handleEditOpen = (inscription: AdminInscription) => {
    setEditingInscription(inscription);
    setFormData({
      name: inscription.name,
      email: inscription.email,
      phone: inscription.phone,
      formation: inscription.formation || "",
    });
  };

  const handleEditSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingInscription) {
      return;
    }

    await updateInscription(editingInscription.id, formData);
    setEditingInscription(null);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Voulez-vous vraiment supprimer cette inscription ?");
    if (!confirmed) {
      return;
    }

    await deleteInscription(id);
  };

  const handleDeleteQuoteRequest = async (id: string) => {
    const confirmed = window.confirm("Voulez-vous vraiment supprimer cette demande de devis ?");
    if (!confirmed) {
      return;
    }

    await deleteQuoteRequest(id);
  };

  const handleDeletePackOrder = async (id: string) => {
    const confirmed = window.confirm("Voulez-vous vraiment supprimer cette commande de pack ?");
    if (!confirmed) {
      return;
    }

    await deletePackOrder(id);
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2 rounded-xl bg-white p-1 shadow-sm ring-1 ring-slate-200">
        <button
          type="button"
          onClick={() => setTab("users")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            tab === "users" ? "bg-[#113e31] text-white shadow-sm" : "bg-gray-100 text-gray-700 hover:bg-slate-200"
          }`}
        >
          Utilisateurs
        </button>
        <button
          type="button"
          onClick={() => setTab("reservations")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            tab === "reservations" ? "bg-[#113e31] text-white shadow-sm" : "bg-gray-100 text-gray-700 hover:bg-slate-200"
          }`}
        >
          Réservations
        </button>
        <button
          type="button"
          onClick={() => setTab("inscriptions")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            tab === "inscriptions" ? "bg-[#113e31] text-white shadow-sm" : "bg-gray-100 text-gray-700 hover:bg-slate-200"
          }`}
        >
          Inscriptions Formations
        </button>
        <button
          type="button"
          onClick={() => setTab("quoteRequests")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            tab === "quoteRequests" ? "bg-[#113e31] text-white shadow-sm" : "bg-gray-100 text-gray-700 hover:bg-slate-200"
          }`}
        >
          Demandes de Devis
        </button>
        <button
          type="button"
          onClick={() => setTab("packOrders")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            tab === "packOrders" ? "bg-[#113e31] text-white shadow-sm" : "bg-gray-100 text-gray-700 hover:bg-slate-200"
          }`}
        >
          Packs Choisis
        </button>
      </div>

      {tab === "users" && (
        <section className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Nom / Email</th>
                <th className="px-4 py-3">Téléphone</th>
                <th className="px-4 py-3">Rôle</th>
                <th className="px-4 py-3">Date d&apos;inscription</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-slate-100 align-top">
                  <td className="px-4 py-4">
                    <div className="font-semibold text-slate-800">{user.name || "Sans nom"}</div>
                    <div className="text-slate-500">{user.email}</div>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{user.phone || "-"}</td>
                  <td className="px-4 py-4 text-slate-600">{user.role}</td>
                  <td className="px-4 py-4 text-slate-600">{new Date(user.createdAt).toLocaleDateString("fr-FR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {tab === "reservations" && (
        <section className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Nom du client</th>
                <th className="px-4 py-3">Formation / Service réservé</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Date de réservation</th>
              </tr>
            </thead>
            <tbody>
              {reservationRows.map(({ user, reservation }) => (
                <tr key={reservation.id} className="border-t border-slate-100 align-top">
                  <td className="px-4 py-4 font-medium text-slate-800">{user.name || user.email}</td>
                  <td className="px-4 py-4 text-slate-600">{reservation.formationTitle}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        reservation.status === "CONFIRMED"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {reservation.status === "CONFIRMED" ? "Confirmée" : "Annulée"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{new Date(reservation.createdAt).toLocaleDateString("fr-FR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {tab === "inscriptions" && (
        <section className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Téléphone</th>
                <th className="px-4 py-3">Formation</th>
                <th className="px-4 py-3">Date &amp; Heure</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inscriptions.map((inscription) => (
                <tr key={inscription.id} className="border-t border-slate-100 align-top">
                  <td className="px-4 py-4 font-medium text-slate-800">{inscription.name}</td>
                  <td className="px-4 py-4 text-slate-600">{inscription.email}</td>
                  <td className="px-4 py-4 text-slate-600">{inscription.phone}</td>
                  <td className="px-4 py-4 text-slate-600">{inscription.formation || "-"}</td>
                  <td className="px-4 py-4 text-slate-600">{formatDateTime(inscription.createdAt)}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${inscription.status === "CONFIRMED" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                      {inscription.status === "CONFIRMED" ? "Confirmé" : "En attente"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditOpen(inscription)}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#004d3d] hover:text-[#004d3d]"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Modifier
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(inscription.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2.5 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Supprimer
                      </button>
                      <button
                        type="button"
                        onClick={() => openInvoiceWindow(inscription)}
                        className="inline-flex items-center gap-1 rounded-md bg-[#004d3d] px-2.5 py-2 text-xs font-semibold text-white transition hover:bg-[#003328]"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        Facture PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {tab === "quoteRequests" && (
        <section className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Téléphone</th>
                <th className="px-4 py-3">Sujet</th>
                <th className="px-4 py-3">Message</th>
                <th className="px-4 py-3">Date &amp; Heure</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quoteRequests.map((quote) => (
                <tr key={quote.id} className="border-t border-slate-100 align-top">
                  <td className="px-4 py-4 font-medium text-slate-800">{quote.name}</td>
                  <td className="px-4 py-4 text-slate-600">{quote.email}</td>
                  <td className="px-4 py-4 text-slate-600">{quote.phone}</td>
                  <td className="px-4 py-4 text-slate-600">{quote.subject}</td>
                  <td className="px-4 py-4 text-slate-600">{quote.message}</td>
                  <td className="px-4 py-4 text-slate-600">{formatDateTime(quote.createdAt)}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleDeleteQuoteRequest(quote.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2.5 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Supprimer
                      </button>
                      <button
                        type="button"
                        onClick={() => openQuoteInvoiceWindow(quote)}
                        className="inline-flex items-center gap-1 rounded-md bg-[#004d3d] px-2.5 py-2 text-xs font-semibold text-white transition hover:bg-[#003328]"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        Facture PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {tab === "packOrders" && (
        <section className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Téléphone</th>
                <th className="px-4 py-3">Pack</th>
                <th className="px-4 py-3">Date &amp; Heure</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packOrders.map((pack) => (
                <tr key={pack.id} className="border-t border-slate-100 align-top">
                  <td className="px-4 py-4 font-medium text-slate-800">{pack.name}</td>
                  <td className="px-4 py-4 text-slate-600">{pack.email}</td>
                  <td className="px-4 py-4 text-slate-600">{pack.phone}</td>
                  <td className="px-4 py-4 text-slate-600">{pack.packName}</td>
                  <td className="px-4 py-4 text-slate-600">{formatDateTime(pack.createdAt)}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleDeletePackOrder(pack.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2.5 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Supprimer
                      </button>
                      <button
                        type="button"
                        onClick={() => openPackInvoiceWindow(pack)}
                        className="inline-flex items-center gap-1 rounded-md bg-[#004d3d] px-2.5 py-2 text-xs font-semibold text-white transition hover:bg-[#003328]"
                      >
                        <Printer className="h-3.5 w-3.5" />
                        Facture PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {invoiceEditor && (
        <InvoiceEditorModal
          draft={invoiceEditor}
          onClose={() => setInvoiceEditor(null)}
          onDownload={(invoice) => {
            setInvoiceEditor(null);
            handleInvoiceDownload(invoice);
          }}
        />
      )}

      {selected && <InvoiceDialog data={selected} onClose={() => setSelected(null)} />}

      {editingInscription && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#004d3d]">Modifier l&apos;inscription</p>
                <h3 className="mt-1 text-xl font-bold text-slate-900">{editingInscription.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingInscription(null)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100"
                aria-label="Fermer le formulaire"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Nom</span>
                  <input
                    value={formData.name}
                    onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-[#004d3d] focus:bg-white"
                    required
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700">
                  <span>Email</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-[#004d3d] focus:bg-white"
                    required
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
                  <span>Téléphone</span>
                  <input
                    value={formData.phone}
                    onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-[#004d3d] focus:bg-white"
                    required
                  />
                </label>

                <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
                  <span>Formation</span>
                  <input
                    value={formData.formation}
                    onChange={(event) => setFormData((current) => ({ ...current, formation: event.target.value }))}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-[#004d3d] focus:bg-white"
                    required
                  />
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingInscription(null)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#004d3d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003328]"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function InvoiceEditorModal({
  draft,
  onClose,
  onDownload,
}: {
  draft: InvoiceDraft;
  onClose: () => void;
  onDownload: (draft: InvoiceDraft) => void;
}) {
  const [form, setForm] = useState<InvoiceDraft>(draft);
  const netAmount = Math.max(0, Number(form.amount || 0) - Number(form.discount || 0));

  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-slate-950/60 p-4 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="invoice-editor-title">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#004d3d]">Prévisualisation & édition</p>
            <h3 id="invoice-editor-title" className="mt-1 text-xl font-bold text-slate-900">Facture</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer la facture"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-6 p-5 sm:p-6 xl:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              onDownload(form);
            }}
            className="space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
                <span>Objet de la facture</span>
                <input
                  value={form.object}
                  onChange={(event) => setForm((current) => ({ ...current, object: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-[#004d3d] focus:bg-white"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
                <span>Description détaillée des prestations</span>
                <textarea
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                  rows={5}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-[#004d3d] focus:bg-white"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Nom complet du client</span>
                <input
                  value={form.customerName}
                  onChange={(event) => setForm((current) => ({ ...current, customerName: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-[#004d3d] focus:bg-white"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Adresse email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-[#004d3d] focus:bg-white"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Téléphone</span>
                <input
                  value={form.phone}
                  onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-[#004d3d] focus:bg-white"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Intitulé du pack / service / formation</span>
                <input
                  value={form.itemName}
                  onChange={(event) => setForm((current) => ({ ...current, itemName: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-[#004d3d] focus:bg-white"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Montant total (FCFA)</span>
                <input
                  type="number"
                  min={0}
                  value={form.amount}
                  onChange={(event) => setForm((current) => ({ ...current, amount: Number(event.target.value) || 0 }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-[#004d3d] focus:bg-white"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Remise / réduction (optionnel)</span>
                <input
                  type="number"
                  min={0}
                  value={form.discount}
                  onChange={(event) => setForm((current) => ({ ...current, discount: Number(event.target.value) || 0 }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-[#004d3d] focus:bg-white"
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Numéro de facture</span>
                <input
                  value={form.invoiceNumber}
                  onChange={(event) => setForm((current) => ({ ...current, invoiceNumber: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-[#004d3d] focus:bg-white"
                  required
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span>Date de facturation</span>
                <input
                  type="date"
                  value={form.invoiceDate}
                  onChange={(event) => setForm((current) => ({ ...current, invoiceDate: event.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none transition focus:border-[#004d3d] focus:bg-white"
                  required
                />
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="rounded-xl bg-[#004d3d] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#003328]"
              >
                Valider et Télécharger le PDF
              </button>
            </div>
          </form>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#004d3d]">Aperçu</p>
                  <h4 className="mt-1 text-lg font-bold text-slate-900">{form.object}</h4>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <div className="font-semibold text-slate-800">{form.invoiceNumber}</div>
                  <div>{new Date(form.invoiceDate || new Date().toISOString().slice(0, 10)).toLocaleDateString("fr-FR")}</div>
                </div>
              </div>

              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div>
                  <span className="font-semibold text-slate-800">Client :</span> {form.customerName}
                </div>
                <div>
                  <span className="font-semibold text-slate-800">Email :</span> {form.email}
                </div>
                <div>
                  <span className="font-semibold text-slate-800">Téléphone :</span> {form.phone}
                </div>
                <div>
                  <span className="font-semibold text-slate-800">Prestation :</span> {form.itemName}
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                <span className="font-semibold text-slate-800">Description :</span>
                <p className="mt-2 whitespace-pre-line">{form.description}</p>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                <span className="text-sm text-slate-500">Montant total</span>
                <div className="text-right">
                  <div className="text-xl font-black text-[#004d3d]">{formatAmount(netAmount)} FCFA</div>
                  {Number(form.discount || 0) > 0 && (
                    <div className="text-xs text-slate-500">Réduction : -{formatAmount(Number(form.discount || 0))} FCFA</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoiceDialog({
  data,
  onClose,
}: {
  data: { user: AdminUser; reservation: AdminUser["reservations"][number] };
  onClose: () => void;
}) {
  const { user, reservation } = data;
  const amount = priceByOffer[reservation.formationTitle] ?? 0;
  const payment = getPaymentStatus(reservation.status);
  const invoiceNumber = getInvoiceNumber(reservation.createdAt, reservation.id);
  const issueDate = new Date(reservation.createdAt).toLocaleDateString("fr-FR");

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/60 p-4 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="invoice-title">
      <div className="mx-auto max-w-3xl">
        <div className="admin-dashboard mb-4 flex justify-end gap-2 print:hidden">
          <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-md bg-[#f1c40f] px-4 py-2 text-sm font-semibold text-[#004d3d]">
            <Printer className="h-4 w-4" /> Imprimer / PDF
          </button>
          <button type="button" onClick={onClose} aria-label="Fermer la facture" className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white text-slate-700">
            <X className="h-4 w-4" />
          </button>
        </div>

        <article className="invoice-print-area bg-white p-6 text-slate-900 shadow-xl sm:p-10">
          <header className="flex flex-col gap-6 border-b-2 border-[#004d3d] pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-center gap-4">
              <Image src="/logo/izicasa-fond-transparent.png" alt="Izicasa Sénégal" width={150} height={45} className="h-12 w-auto object-contain" />
              <div>
                <h1 id="invoice-title" className="text-xl font-black uppercase text-[#004d3d]">Izicasa Sénégal</h1>
                <p className="text-sm text-slate-500">Communication, formation et transformation digitale</p>
              </div>
            </div>
            <div className="text-left text-sm sm:text-right">
              <p className="font-bold text-[#004d3d]">FACTURE</p>
              <p className="mt-1 font-semibold">{invoiceNumber}</p>
              <p className="text-slate-500">Émise le {issueDate}</p>
            </div>
          </header>

          <div className="grid gap-6 border-b border-slate-200 py-6 sm:grid-cols-2">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Émetteur</h2>
              <p className="mt-2 font-semibold">Izicasa Sénégal</p>
              <p className="text-sm text-slate-600">Ziguinchor, Sénégal</p>
              <p className="text-sm text-slate-600">Contact : à renseigner</p>
              <p className="text-sm text-slate-600">NINEA / RC : à renseigner</p>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Client</h2>
              <p className="mt-2 font-semibold">{user.name}</p>
              <p className="text-sm text-slate-600">{user.email}</p>
              <p className="text-sm text-slate-600">{user.phone || "Téléphone non renseigné"}</p>
            </div>
          </div>

          <div className="py-6">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-300 text-left text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="pb-3">Prestation</th>
                  <th className="pb-3 text-center">Qté</th>
                  <th className="pb-3 text-right">Prix unitaire</th>
                  <th className="pb-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-4 font-semibold">{reservation.formationTitle}</td>
                  <td className="py-4 text-center">1</td>
                  <td className="py-4 text-right">{amount ? `${formatAmount(amount)} FCFA` : "À confirmer"}</td>
                  <td className="py-4 text-right font-semibold">{amount ? `${formatAmount(amount)} FCFA` : "À confirmer"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${payment.className}`}>{payment.label}</span>
              <p className="mt-2 text-xs text-slate-500">Paiement selon les conditions convenues avec Izicasa Sénégal.</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs uppercase tracking-wider text-slate-500">Montant total</p>
              <p className="text-2xl font-black text-[#004d3d]">{amount ? `${formatAmount(amount)} FCFA` : "À confirmer"}</p>
            </div>
          </div>

          <footer className="mt-12 flex flex-col gap-8 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-end sm:justify-between">
            <p>Merci pour votre confiance. Facture générée par l&apos;administration Izicasa Sénégal.</p>
            <div className="min-w-36 text-center"><div className="mb-8 border-b border-slate-300" /><span>Signature / cachet</span></div>
          </footer>
        </article>
      </div>
    </div>
  );
}
