// /api/midiakit.js
// Vercel Serverless Function
// Busca a página pública do Mídia Kit no PlayNest, extrai o JSON embutido
// (__NEXT_DATA__) e devolve só os números que interessam pro portfólio.

export default async function handler(req, res) {
  const PLAYNEST_URL = "https://app.playnest.com.br/14vegetta";

  try {
    const response = await fetch(PLAYNEST_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    if (!response.ok) {
      return res
        .status(502)
        .json({ error: `PlayNest respondeu com status ${response.status}` });
    }

    const html = await response.text();

    // Extrai o conteúdo da tag <script id="__NEXT_DATA__" type="application/json">...</script>
    const match = html.match(
      /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
    );

    if (!match) {
      return res
        .status(502)
        .json({ error: "Não foi possível encontrar os dados na página do PlayNest." });
    }

    const nextData = JSON.parse(match[1]);
    const data = nextData?.props?.pageProps?.data?.data;

    if (!data) {
      return res.status(502).json({ error: "Formato de dados inesperado." });
    }

    const ig28d = data.instagram?.metrics?.["28d"] ?? {};
    const igFollowers = data.instagram?.followers ?? 0;
    const ttFollowers = data.tiktok?.followers ?? 0;
    const ytFollowers = data.youtube?.followers ?? 0;

    const stats = {
      updatedAt: data.extractedAt ?? null,
      totalFollowers: igFollowers + ttFollowers + ytFollowers,
      instagram: {
        followers: igFollowers,
        reach28d: ig28d.reach ?? 0,
        impressions28d: ig28d.impressions ?? 0,
        engagement28d: ig28d.postsEngagement ?? 0,
        likes28d: ig28d.likes ?? 0,
        posts28d: ig28d.postsCount ?? 0,
      },
      tiktok: {
        followers: ttFollowers,
      },
      youtube: {
        followers: ytFollowers,
      },
      profile: {
        name: data.user?.name ?? null,
        about: data.user?.about ?? null,
        location: data.user?.location ?? null,
        categories: data.user?.categories ?? [],
        profileImage: data.user?.profileImage ?? null,
      },
    };

    // Cache de 1h no edge da Vercel; serve versão antiga por até 1 dia
    // enquanto busca uma nova em segundo plano (evita bater no PlayNest
    // toda vez que alguém abre seu portfólio).
    res.setHeader(
      "Cache-Control",
      "s-maxage=3600, stale-while-revalidate=86400"
    );
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({
      error: "Erro ao buscar dados do mídia kit.",
      details: err.message,
    });
  }
}
