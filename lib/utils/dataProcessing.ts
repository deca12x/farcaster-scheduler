export function processData(data: any) {
  const processedData = data.casts.map((cast: any) => ({
    text: cast.text,
    author: cast.author.display_name,
    timestamp: cast.timestamp,
  }));
  return processedData;
}
