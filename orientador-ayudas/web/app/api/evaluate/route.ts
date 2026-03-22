import { NextRequest, NextResponse } from 'next/server'
import { UserProfile } from '../../../types/profile'
import { evaluarPerfil, ordenarResultados } from '../../../lib/rules/evaluate'

export async function POST(req: NextRequest) {
  try {
    const perfil = (await req.json()) as Partial<UserProfile>

    if (!perfil || Object.keys(perfil).length === 0) {
      return NextResponse.json({ error: 'Perfil vacío' }, { status: 400 })
    }

    const resultados = ordenarResultados(evaluarPerfil(perfil))

    return NextResponse.json({ resultados }, { status: 200 })
  } catch {
    return NextResponse.json({ error: 'Error al evaluar el perfil' }, { status: 500 })
  }
}
