// midiakit-loader.js
// Busca os dados atualizados do mídia kit (via /api/midiakit) e preenche
// automaticamente qualquer elemento HTML que tenha o atributo data-stat.
//
// Exemplo de uso no seu HTML:
//   <span data-stat="instagram.followers">--</span> seguidores no Instagram
//   <span data-stat="instagram.reach28d">--</span> de alcance (28 dias)
//   <span data-stat="tiktok.followers">--</span> seguidores no TikTok
//   <span data-stat="youtube.followers">--</span> inscritos no YouTube
//   <span data-stat="totalFollowers">--</span> seguidores no total
//
// Formata automaticamente números grandes no padrão brasileiro (ex: 9.037).

async function loadMidiaKitStats() {
  try {
    const res = await fetch("/api/midiakit");
    if (!res.ok) throw new Error("Falha ao buscar /api/midiakit");
    const stats = await res.json();

    document.querySelectorAll("[data-stat]").forEach((el) => {
      const path = el.getAttribute("data-stat").split(".");
      let value = stats;
      for (const key of path) {
        value = value?.[key];
      }
      if (value === undefined || value === null) return;

      el.textContent =
        typeof value === "number" ? value.toLocaleString("pt-BR") : value;
    });

    // Opcional: mostra quando os dados foram atualizados pela última vez
    const updatedEl = document.querySelector("[data-stat-updated]");
    if (updatedEl && stats.updatedAt) {
      const date = new Date(stats.updatedAt);
      updatedEl.textContent = date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  } catch (err) {
    console.error("Erro ao carregar estatísticas do mídia kit:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadMidiaKitStats);
