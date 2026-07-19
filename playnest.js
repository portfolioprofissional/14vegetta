// ================================
// Playnest - Atualização Automática
// ================================

async function atualizarPlaynest() {
    try {
        const response = await fetch(
            "https://app.playnest.com.br/_next/data/sP2kCgqLS_2VnhHFNirbn/14vegetta.json"
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar dados da Playnest");
        }

        const json = await response.json();
        const dados = json.pageProps.data.data;

        // Instagram
        const instagram = dados.instagram;
        const insta28 = instagram.metrics["28d"];

        // Atualiza os cards
        atualizarElemento("followers", instagram.followers);
        atualizarElemento("impressions", insta28.impressions);
        atualizarElemento("likes", insta28.likes);
        atualizarElemento("avgReach", insta28.averageReach ?? 0);
        atualizarElemento("totalReach", insta28.totalReach ?? 0);
        atualizarElemento("engagement", insta28.engagement);

        console.log("Playnest atualizada!");
        console.log("Última atualização:", dados.extractedAt);

    } catch (error) {
        console.error("Erro ao atualizar Playnest:", error);
    }
}

function atualizarElemento(id, valor) {
    const elemento = document.getElementById(id);

    if (!elemento) return;

    elemento.textContent = formatarNumero(valor);
}

function formatarNumero(numero) {

    numero = Number(numero);

    if (isNaN(numero))
        return "0";

    if (numero >= 1000000)
        return (numero / 1000000).toFixed(1).replace(".", ",") + "M";

    if (numero >= 1000)
        return (numero / 1000).toFixed(1).replace(".", ",") + "k";

    return numero.toLocaleString("pt-BR");
}

// Atualiza quando a página abrir
document.addEventListener("DOMContentLoaded", () => {

    atualizarPlaynest();

    // Atualiza novamente a cada 10 minutos
    setInterval(atualizarPlaynest, 600000);

});
