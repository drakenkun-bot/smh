import { NextResponse } from "next/server"

export async function GET() {
  try {
    const coinIds = [
      "bitcoin",
      "ethereum",
      "solana",
      "dogecoin",
      "pepe",
      "binancecoin",
      "ripple",
      "cardano",
      "avalanche-2",
      "chainlink",
    ]

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(",")}&order=market_cap_desc&per_page=10&page=1&sparkline=false`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching crypto data:", error)
    return NextResponse.json({ error: "Failed to fetch crypto data" }, { status: 500 })
  }
}
