const form = document.getElementById("order-form");

const ownerWhatsApp = "212621924487"; // Replace with the owner's WhatsApp number.

const sanitizeValue = (value) => value.trim();
const promoLimit = 5;
const promoKey = "jadCommandePromoCount";

const buildMessage = ({
  fullName,
  whatsappNumber,
  platform,
  cartLink,
  message,
  promoCode,
}) => {
  const lines = [
    "Nouvelle commande Jad Commande",
    `Nom: ${fullName}`,
    `WhatsApp: ${whatsappNumber}`,
    `Plateforme: ${platform}`,
    `Lien du panier: ${cartLink}`,
  ];

  if (message) {
    lines.push(`Message: ${message}`);
  }

  if (promoCode) {
    lines.push(`Promo: ${promoCode}`);
  }

  return lines.join("\n");
};

const getPromoCode = () => {
  const currentCount = Number(localStorage.getItem(promoKey) || "0");

  if (currentCount >= promoLimit) {
    return null;
  }

  const nextCount = currentCount + 1;
  localStorage.setItem(promoKey, String(nextCount));
  return "PROMO50";
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const payload = {
    fullName: sanitizeValue(formData.get("fullName") || ""),
    whatsappNumber: sanitizeValue(formData.get("whatsappNumber") || ""),
    platform: sanitizeValue(formData.get("platform") || ""),
    cartLink: sanitizeValue(formData.get("cartLink") || ""),
    message: sanitizeValue(formData.get("message") || ""),
    promoCode: sanitizeValue(formData.get("promoCode") || ""),
  };

  if (!payload.promoCode) {
    payload.promoCode = getPromoCode() || "";
  }

  const message = buildMessage(payload);
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${ownerWhatsApp}?text=${encodedMessage}`;

  window.open(url, "_blank");
});
