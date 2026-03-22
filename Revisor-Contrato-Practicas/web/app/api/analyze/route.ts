import { NextRequest, NextResponse } from 'next/server';
import { extractTextFromPDF } from '@/lib/pdf/extract';
import { detectDocumentType } from '@/lib/analysis/detect';
import { classifyPages } from '@/lib/analysis/classify';
import type { DocumentType } from '@/types/risk';

export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const manualType = formData.get('documentType') as DocumentType | null;

    if (!file) {
      return NextResponse.json({ error: 'No se ha recibido ningún archivo.' }, { status: 400 });
    }
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'El archivo debe ser un PDF.' }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const pages = await extractTextFromPDF(buffer);

    const documentType: DocumentType =
      manualType && manualType !== 'desconocido'
        ? manualType
        : detectDocumentType(pages);

    // Documentos informativos: devolver sin análisis
    if (documentType === 'documento_informativo') {
      return NextResponse.json({ documentType, items: [] });
    }

    const items = classifyPages(
      pages,
      documentType === 'desconocido' ? 'convenio_no_laboral' : documentType
    );

    return NextResponse.json({ documentType, items });
  } catch (err) {
    console.error('Error en /api/analyze:', err);
    return NextResponse.json({ error: 'Error interno al analizar el PDF.' }, { status: 500 });
  }
}
