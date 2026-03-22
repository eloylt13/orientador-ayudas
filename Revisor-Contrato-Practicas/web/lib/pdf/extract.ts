export async function extractTextFromPDF(buffer: ArrayBuffer): Promise<string[]> {
  const { extractText, getDocumentProxy } = await import('unpdf');
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  // mergePages: false → devuelve un array con el texto de cada página
  const { text } = await extractText(pdf, { mergePages: false });
  return text as unknown as string[];
}
