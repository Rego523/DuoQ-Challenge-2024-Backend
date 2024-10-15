const express = require("express"); // npm init -y // npm install express
const axios = require("axios");     // npm install axios
const cors = require("cors");       // npm install cors
//require("dotenv").config({ path: __dirname + '/.env' });  / npm install dotenv

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const API_KEY = process.env.API_KEY;
//console.log(API_KEY);

// Listado de parejas de jugadores
const summoners = [
    { 
        teamName: 'Mental Buda',
        name1: 'Ndeariggyphy',
        id1: 'jTtN6rR7WfxgByb6QiU7c9nAxFAdPv0QSVoGDP4Ti9VeSXUZ4fvzs2SY9g',
        link1: 'https://www.op.gg/summoners/euw/Ndeariggyphy-2405',
        name2: 'Ragabodnerzs',
        id2: 'imylQJwUFqakpPaUz3TLtW7J299g3oEN9237gLZ-xS-HaqkUFqPkWqTwzw',
        link2: 'https://www.op.gg/summoners/euw/Ragabodnerzs-4844',
        linkduo: 'https://www.op.gg/multisearch/euw?summoners=Ndeariggyphy%232405%2CRagabodnerzs%234844'
    },
    { 
        teamName: 'Diamante en flex btw',
        name1: 'Cacahuetes',
        id1: 'ipxvnNSDhlaHbvH888_U042xudGWN_FZdy-4TYalsItcaGuI8p0duX4Bjw',
        link1: 'https://www.op.gg/summoners/euw/Derxelleo-9328',
        name2: 'Chaqueta',
        id2: 'MGjnre82gLzWiytM5obhHWD-3WkEdOqhjwSyqQcc3YyeKg3htq6KDQtlYg',
        link2: 'https://www.op.gg/summoners/euw/Chaqueta-PERI',
        linkduo: 'https://www.op.gg/multisearch/euw?summoners=Chaqueta%23PERI%2CDerxelleo%239328'
    },
    { 
        teamName: 'Team Xurxo',
        name1: '07mon',
        id1: 'kZ0eo4y_sMxD_1BzvI8JXL7T9Sy42OvfJcq1II8n9wNFiOhwGR2eWqi1ww',
        link1: 'https://www.op.gg/summoners/euw/07mon-MONO',
        name2: 'icius07',
        id2: 'EBFfa4YTk7FaY_5WmG_Z8wPFCFtM2Cq0TmTCeM5Z7m8rhZWR39Uq_OGouQ',
        link2: 'https://www.op.gg/summoners/euw/icius07-MONO',
        linkduo: 'https://www.op.gg/multisearch/euw?summoners=07mon%23MONO%2Cicius07%23MONO'
    },
    { 
        teamName: 'Team Dif',
        name1: 'The Notorius',
        id1: '3Q-9VezmszEEtjJYFbCDQOSeQ-6oo93oxNKdWJj7EOxWOCwptmfUdTCKOw',
        link1: 'https://www.op.gg/summoners/euw/The%20Notorius-Conor',
        name2: 'Vennolyesil',
        id2: 'n9jbAKUO6d_hgaRHkgOw26iFQ7KmXNXRO0IhBOnuWGqHmSpu44oYrbAVuA',
        link2: 'https://www.op.gg/summoners/euw/Vennolyesil-4185',
        linkduo: 'https://www.op.gg/multisearch/euw?summoners=The+Notorius%23Conor%2CVennolyesil%234185'
    },
    { 
        teamName: 'Team Tumbadioses',
        name1: 'Hellontacqua',
        id1: 'qkplQaOExGbNmO4gpGxWQcpJvmPVw3dBq7eRyLG4rRNkabCAT-tRLYuxkQ',
        link1: 'https://www.op.gg/summoners/euw/Hellontacqua-1512',
        name2: 'Dierilianati',
        id2: 'lheNotBjWHqPHJNyEhATr4Tjf8iLazxbPbdSc-FWVxVXmOBK9k-tkdF76A',
        link2: 'https://www.op.gg/summoners/euw/Dierilianati-6528',
        linkduo: 'https://www.op.gg/multisearch/euw?summoners=Hellontacqua%231512%2CDierilianati%236528'
    },
    { 
        teamName: 'LSI Enjoyer', 
        name1: 'Ctarlizzahky',
        id1: '0LoHdyjS3ckpxKtCXLkjD0ifaEKMgyGnCWS6dElORrWrwSidCTzSW7codg',
        link1: 'https://www.op.gg/summoners/euw/Ctarlizzahky-9107',
        name2: 'Ctarlizzahky',
        id2: '0LoHdyjS3ckpxKtCXLkjD0ifaEKMgyGnCWS6dElORrWrwSidCTzSW7codg',
        link2: 'https://www.op.gg/summoners/euw/Ctarlizzahky-9107',
        linkduo: 'https://www.op.gg/summoners/euw/Ctarlizzahky-9107'
    },
    { 
        teamName: 'Team Leo',
        name1: 'Jesleali',
        id1: '1cyGxB_m44dsu8pXl1hoO4JIKj7Gr8tiFxV1biUFHtbxSnOudTOAwc-LbA',
        link1: 'https://www.op.gg/summoners/euw/Jesleali-0125',
        name2: 'Hilmontai',
        id2: 'jHcVVnRludziZnuMTaeR7xL76Jd6gK4LSopGHU0TOMixYqPA_OAWQgy1fw',
        link2: 'https://www.op.gg/summoners/euw/Hilmontai-5321',
        linkduo: 'https://www.op.gg/multisearch/euw?summoners=Jesleali%230125%2CHilmontai%235321'
    },
    { 
        teamName: 'Commit and Push',
        name1: 'Palaterna',
        id1: 'gpsRxqxnKCsE8ZbrY9eP4quva6qmOOMhuuJ7JUaMrrypOxXPH3oL2_D2oQ',
        link1: 'https://www.op.gg/summoners/euw/Palaterna-8194',
        name2: 'Landemariana',
        id2: 'hHPiwWuTRuHef3dBeXUgHeIClh8PdbU_z73iD8Fi3BRPq5oPe8rA03TOvQ',
        link2: 'https://www.op.gg/summoners/euw/Landemariana-7143',
        linkduo: 'https://www.op.gg/multisearch/euw?summoners=Landemariana%237143%2CPalaterna%238194'
    }
    // Añade más parejas aquí
];

// Tablas de LP por Tier
const tierToLp = {
    'IRON': 0,
    'BRONZE': 400,
    'SILVER': 800,
    'GOLD': 1200,
    'PLATINUM': 1600,
    'EMERALD': 2000,
    'DIAMOND': 2400,
    'MASTER': 2800,
};

// Tablas de LP por Rank
const rankToLp = {
    'IV': 0,
    'III': 100,
    'II': 200,
    'I': 300,
};

// Función para convertir Tier y Rank a LP
function getLpFromTierRank(tier, rank, leaguePoints) {
    if (tier === 'MASTER') {
        const baseTierLp = tierToLp[tier];
        return baseTierLp + leaguePoints;
    } else if (tier === 'UNRANKED') {
        return 0;
    } else {
        const baseTierLp = tierToLp[tier];
        const baseRankLp = rankToLp[rank];
        return baseTierLp + baseRankLp + leaguePoints;
    }
}

// Función para convertir LP a Tier y Rank
function getTierRankFromLp(lp) {
    const tiers = Object.keys(tierToLp);
    let calculatedTier = '';
    let calculatedRank = '';
    let calculatedLp = 0;

    if (lp === 0) {
        return {
            tier: 'UNRANKED',
            rank: '',
            leaguePoints: 0,
        };
    }

    for (let i = tiers.length - 1; i >= 0; i--) {
        if (lp >= tierToLp[tiers[i]]) {
            calculatedTier = tiers[i];
            calculatedLp = lp - tierToLp[tiers[i]];
            break;
        }
    }

    const ranks = Object.keys(rankToLp);
    for (let i = ranks.length - 1; i >= 0; i--) {
        if (calculatedLp >= rankToLp[ranks[i]]) {
            calculatedRank = ranks[i];
            calculatedLp = calculatedLp - rankToLp[ranks[i]];
            break;
        }
    }

    return {
        tier: calculatedTier,
        rank: calculatedRank,
        leaguePoints: calculatedLp,
    };
}

// Cache en memoria para almacenar la información de los jugadores
let playerCache = [];
let playerCachePrev = [];

// Función para obtener información de un jugador desde la API de Riot
async function fetchPlayerData(id, playerName) {
    const RIOT_API_URL = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${API_KEY}`;

    try {
        const response = await axios.get(RIOT_API_URL);
        const data = response.data;

        if (data.length === 0) {
            return {
                tier: 'UNRANKED',
                rank: '',
                leaguePoints: 0,
                wins: 0,
                losses: 0,
            };
        }

        const soloQueueData = data.find(entry => entry.queueType === "RANKED_SOLO_5x5");

        if (soloQueueData) {
            return {
                tier: soloQueueData.tier,
                rank: soloQueueData.rank,
                leaguePoints: soloQueueData.leaguePoints,
                wins: soloQueueData.wins,
                losses: soloQueueData.losses,
            };
        } else {
            return {
                tier: 'UNRANKED',
                rank: '',
                leaguePoints: 0,
                wins: 0,
                losses: 0
            };
        }
    } catch (error) {
        console.error(`Error al obtener datos del jugador ${playerName}: ${error.message}`);
        return null;
    }    
}

let isCacheUpdating = false;

// Función para actualizar la caché con información de todos los jugadores
async function updatePlayerCache() {
    isCacheUpdating = true; // Indicamos que la caché está en proceso de actualización
    console.log('Actualizando la información de todos los jugadores...');
    const updatedCache = [];

    for (const summoner of summoners) {
        const playerData1 = await fetchPlayerData(summoner.id1, summoner.name1);
        const playerData2 = await fetchPlayerData(summoner.id2, summoner.name2);

        if (playerData1 && playerData2) {
            const totalLp1 = getLpFromTierRank(playerData1.tier, playerData1.rank, playerData1.leaguePoints);
            const totalLp2 = getLpFromTierRank(playerData2.tier, playerData2.rank, playerData2.leaguePoints);
            const avgLp = Math.round((totalLp1 + totalLp2) / 2);

            let { tier: avgTier, rank: avgRank, leaguePoints: avgLpRemaining } = getTierRankFromLp(avgLp);

            const winrate1 = (playerData1.wins + playerData2.wins) === 0 ? 0 : Math.floor((playerData1.wins / (playerData1.wins + playerData1.losses)) * 100);

            avgTier = avgTier === 'UNRANKED' ? `${avgTier}` : `${avgTier} ${avgRank}`;

            updatedCache.push({
                ...summoner,
                winGames: playerData1.wins,
                lostGames: playerData1.losses,
                winrate: winrate1,
                elo: avgTier,
                lps: avgLpRemaining,
                totalLps: avgLp
            });
        }
    }

    playerCache = updatedCache.sort((a, b) => b.totalLps - a.totalLps); // Ordenar por LP total
    isCacheUpdating = false; // Terminamos la actualización de la caché
}

// Ejecutar la actualización de la caché cada 5 minutos
setInterval(updatePlayerCache, 5 * 60 * 1000);

updatePlayerCache();

// Ruta principal
app.get("/players", async (req, res) => {
    // Si la caché está vacía forzar la actualización
    if (playerCache.length === 0) {
        await updatePlayerCache();
        playerCachePrev = playerCache;
    }
    if (isCacheUpdating) {
        // Responder con una copia de la cache anterior mientras se actualiza
        res.json(playerCachePrev);
    } else {
        // Enviar el cache actualizado
        playerCachePrev = playerCache;
        res.json(playerCache);
    }
});

const server = app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

// Manejo de señales de cierre para liberar el puerto
process.on('SIGINT', () => {
    console.log('Gracefully shutting down');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
process.on('SIGTERM', () => {
    console.log('Gracefully shutting down');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

module.exports = app;
