import { NextResponse } from 'next/server'

let cachedToken: string | null = null
let cachedExpire: number = 0 // 时间戳，单位：毫秒
const apiKey = process.env.VITE_DOCMEE_API_KEY

export async function POST(request: Request) {
    const { uid, limit } = await request.json()

    // 检查缓存是否有效
    const now = Date.now()
    if (cachedToken && cachedExpire > now) {
        return NextResponse.json({
            code: 0,
            data: {
                token: cachedToken,
                expireTime: Math.floor((cachedExpire - now) / 1000)
            },
            cached: true
        })
    }

    const headers: HeadersInit = {
        'Api-Key': apiKey || '',
        'Content-Type': 'application/json'
    }

    try {
        const response = await fetch('https://docmee.cn/api/user/createApiToken', {
            method: 'POST',
            headers,
            body: JSON.stringify({ uid, limit })
        })

        const data = await response.json()
        // 修正：使用 data.data.token 和 data.data.expireTime
        cachedToken = data.data.token
        cachedExpire = now + (data.data.expireTime || 7200) * 1000 // 用接口返回的过期时间，默认2小时
        console.log('new token data', data)
        return NextResponse.json({
            ...data,
            cached: false
        })
    } catch (error) {
        return NextResponse.json({
            code: -1,
            message: 'Token creation failed'
        }, { status: 500 })
    }
}