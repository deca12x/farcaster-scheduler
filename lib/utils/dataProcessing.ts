export function processData(data: any) {
  return data.casts
    .filter((cast: any) => cast.published) // Filter for published casts
    .map((cast: any) => {
      return {
        cast_text: cast.text,
        ipfs_url: cast.hash,
        datetime: cast.timestamp,
        fid: cast.author.fid,
        cast_hash: cast.hash, // Add cast_hash for identifying existing casts
        author_display_name: cast.author.display_name,
        author_pfp_url: cast.author.pfp_url,
      };
    });
}
