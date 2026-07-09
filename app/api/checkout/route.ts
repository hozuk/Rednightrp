import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'

const API_URL = 'https://gm-donate.net/api'
const DELIMITER = '{up}'

// Подпись по алгоритму IGS: значения параметров сортируются по ключу,
// склеиваются через "{up}" и хэшируются SHA256 вместе с секретным ключом проекта.
function getSign(params: Record<string, string>, secret: string): string {
  const sorted = Object.keys(params).sort()
  const s = sorted.map((k) => params[k].trim() + DELIMITER).join('')
  return createHash('sha256')
    .update(s + secret)
    .digest('hex')
}

export async function POST(request: Request) {
  const projectId = process.env.GMDONATE_PROJECT_ID
  const projectKey = process.env.GMDONATE_PROJECT_KEY

  if (!projectId || !projectKey) {
    return NextResponse.json(
      {
        error:
          'Оплата не настроена: добавьте переменные окружения GMDONATE_PROJECT_ID и GMDONATE_PROJECT_KEY (из панели gm-donate.net).',
      },
      { status: 503 },
    )
  }

  let body: { steamId?: string; sum?: number; items?: string[] }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Некорректный запрос.' }, { status: 400 })
  }

  const steamId = (body.steamId ?? '').trim()
  const sum = Math.round(Number(body.sum))

  // SteamID64: 17 цифр, начинается с 7656
  if (!/^7656\d{13}$/.test(steamId)) {
    return NextResponse.json(
      { error: 'Укажите корректный SteamID64 (17 цифр, начинается с 7656).' },
      { status: 400 },
    )
  }

  if (!Number.isFinite(sum) || sum < 1 || sum > 100000) {
    return NextResponse.json({ error: 'Некорректная сумма заказа.' }, { status: 400 })
  }

  const params: Record<string, string> = {
    sid: steamId,
    sum: String(sum),
    extra: JSON.stringify({ items: (body.items ?? []).slice(0, 20) }).slice(0, 255),
  }

  try {
    const res = await fetch(`${API_URL}/url/getPayment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        project: projectId,
        sign: getSign(params, projectKey),
      },
      body: new URLSearchParams(params).toString(),
    })

    const data = (await res.json()) as { ok?: boolean; data?: string; error?: string }

    if (!data.ok || !data.data) {
      return NextResponse.json(
        { error: `Ошибка gm-donate: ${data.error ?? 'неизвестная ошибка'}` },
        { status: 502 },
      )
    }

    return NextResponse.json({ url: data.data })
  } catch {
    return NextResponse.json({ error: 'Не удалось связаться с gm-donate.net. Попробуйте позже.' }, { status: 502 })
  }
}
