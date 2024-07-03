export const MAIN_BOARD = {
    title: "Main Board",
    tags: ["Core", "Vip"],
    description: "The Main Board is the primary investment platform of major stock exchanges like BSE and NSE where established & large companies are listed. Here's what you need to know:",
    features: [
        {
            icon: "ChevronsUp",
            feature: "Higher Trading Flexibility",
            description:
                "Shares can be traded in any quantity, starting from 1 share. E.g., buy/sell 1 share of Reliance Industries Ltd.",
        },
        {
            icon: "Layers2",
            feature: "No Lot Size Adjustment",
            description:
                "Non-Applicable : Lot sizes are not typically adjusted for Main Board stocks as they are traded in single units.",
        },
        {
            icon: "ChevronsDown",
            feature: "Lower Volatility",
            description: "Typically exhibit lower volatility; prices are relatively stable compared to SME stocks.",
        },
        {
            icon: "ChevronsUp",
            feature: "Higher Liquidity",
            description:
                "Generally have higher liquidity, making it easier to buy and sell shares without significantly impacting the stock price.",
        },
        {
            icon: "UnfoldHorizontal",
            feature: "Broader Investor Base",
            description:
                "Attract a broader range of investors, including institutional investors, due to the established nature of the companies listed.",
        },
        {
            icon: "FileBadge",
            feature: "Standard Trading Platforms",
            description: "Traded on the primary segments of major stock exchanges like BSE and NSE.",
        },
    ],
};

export const SME_BOARD = {
    title: "SME Board",
    tags: ["Advanced", "Vip"],
    description: "The SME Board is a platform dedicated to small and medium enterprises (SMEs) that allows these companies to access capital markets. Here's what you need to know:",
    features: [
        {
            icon: 'ChevronsDown',
            feature: 'Lower Trading Flexibility',
            description: 'Shares are traded in lots. E.g., Timescan Logistics shares are traded in lots of 2,000.'
        },
        {
            icon: 'Layers2',
            feature: 'Lot Size Adjustment',
            description: 'Applicable: Exchanges conduct a half-yearly review of the lot size to ensure it remains appropriate.'
        },
        {
            icon: 'ChevronsUp',
            feature: 'Higher Volatility',
            description: 'Tend to be more volatile, leading to higher potential returns but also higher risks.'
        },
        {
            icon: 'ChevronsDown',
            feature: 'Lower Liquidity',
            description: 'Often have lower liquidity due to lot-size trading; liquidity improves as the company grows.'
        },
        {
            icon: 'UnfoldHorizontal',
            feature: 'Limited Investor Base',
            description: 'Primarily attract retail investors and smaller institutional investors initially, with potential to attract broader investor base as the company grows.'
        },
        {
            icon: 'Star',
            feature: 'Specialized Trading Platforms',
            description: 'Traded on specific segments like NSE Emerge and BSE SME; can only trade SME shares on the exchange where they are listed.'
        }
    ]
}